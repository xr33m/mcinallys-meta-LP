import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  name?: string;
  phone?: string;
  postcode?: string;
  slot?: string;
  company?: string;
  turnstileToken?: string;
  assessment?: {
    boilerAge: string;
    lastService: string;
    symptoms: string[];
    score: number;
    level: string;
  } | null;
  attribution?: Record<string, string>;
  pageUrl?: string;
  eventId?: string;
};

// UK mobile or landline, tolerant of spaces, +44 and 0044.
const PHONE_RE = /^(?:(?:\+|00)44|0)\d{9,10}$/;
const POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

// Best-effort per-instance rate limit. Turnstile is the real protection.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

/** UK number to Meta's format: digits only, country code 44, no leading 0 (07449... becomes 447449...). */
function metaPhone(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0044")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = `44${digits.slice(1)}`;
  return digits;
}

/**
 * Sends the `Lead` event to Meta's Conversions API. Same `event_id` as the browser Pixel event, so Meta
 * deduplicates the pair. Never throws and never blocks the lead: any failure is only logged.
 */
async function sendMetaLead(opts: {
  eventId?: string;
  pageUrl: string;
  name: string;
  phone: string;
  postcode: string;
  fbclid?: string;
  ip: string;
  userAgent: string | null;
}) {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!token || !pixelId) return; // not configured yet

  try {
    const now = Date.now();
    const firstName = opts.name.split(/\s+/)[0].toLowerCase();
    const userData: Record<string, string> = {
      ph: sha256(metaPhone(opts.phone)),
      fn: sha256(firstName),
      zp: sha256(opts.postcode.replace(/\s+/g, "").toLowerCase()),
      country: sha256("gb"),
    };
    if (opts.ip !== "unknown") userData.client_ip_address = opts.ip;
    if (opts.userAgent) userData.client_user_agent = opts.userAgent;
    if (opts.fbclid) userData.fbc = `fb.1.${now}.${opts.fbclid}`;

    const body: Record<string, unknown> = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(now / 1000),
          event_id: opts.eventId,
          action_source: "website",
          event_source_url: opts.pageUrl,
          user_data: userData,
        },
      ],
    };
    if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) console.error(`[lead] Meta CAPI ${res.status}: ${await res.text()}`);
  } catch (err) {
    console.error("[lead] Meta CAPI failed:", err);
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  let b: Body;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot filled: pretend success so bots don't retry.
  if (b.company) return NextResponse.json({ ok: true });

  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please call us instead." }, { status: 429 });
  }

  const name = (b.name ?? "").trim();
  const phone = (b.phone ?? "").replace(/[\s()-]/g, "");
  const postcode = (b.postcode ?? "").trim().toUpperCase();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid UK phone number.";
  if (!POSTCODE_RE.test(postcode)) errors.postcode = "Please enter a valid postcode.";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  if (!(await verifyTurnstile(b.turnstileToken, ip))) {
    return NextResponse.json(
      { error: "Please complete the security check and try again." },
      { status: 400 },
    );
  }

  const a = b.assessment;
  const lead = {
    name,
    phone,
    postcode,
    inEdinburghArea: /^EH/.test(postcode),
    preferredTime: (b.slot ?? "").slice(0, 60),
    boilerAge: a?.boilerAge ?? "",
    lastService: a?.lastService ?? "",
    symptoms: a?.symptoms?.join("; ") ?? "",
    winterCheckScore: a?.score ?? null,
    winterCheckLevel: a?.level ?? "",
    ...b.attribution,
    pageUrl: (b.pageUrl ?? "").slice(0, 500),
    submittedAt: new Date().toISOString(),
  };

  // Deliver to every configured destination; a lead is only lost if ALL fail.
  const jobs: Promise<unknown>[] = [];

  const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE, LEAD_WEBHOOK_URL } = process.env;

  if (AIRTABLE_TOKEN && AIRTABLE_BASE_ID && AIRTABLE_TABLE) {
    jobs.push(
      fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            typecast: true,
            fields: {
              Name: lead.name,
              Phone: lead.phone,
              Postcode: lead.postcode,
              "In area": lead.inEdinburghArea,
              "Preferred time": lead.preferredTime,
              "Boiler age": lead.boilerAge,
              "Last service": lead.lastService,
              Symptoms: lead.symptoms,
              "Winter check score": lead.winterCheckScore ?? undefined,
              "Winter check level": lead.winterCheckLevel || undefined,
              "UTM source": b.attribution?.utm_source,
              "UTM medium": b.attribution?.utm_medium,
              "UTM campaign": b.attribution?.utm_campaign,
              "UTM content": b.attribution?.utm_content,
              "UTM term": b.attribution?.utm_term,
              fbclid: b.attribution?.fbclid,
              "Page URL": lead.pageUrl,
              Status: "New",
            },
          }),
        },
      ).then(async (r) => {
        if (!r.ok) throw new Error(`Airtable ${r.status}: ${await r.text()}`);
      }),
    );
  }

  if (LEAD_WEBHOOK_URL) {
    // Point this at Make/Zapier/GoHighLevel to trigger the instant SMS/email alert.
    jobs.push(
      fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).then((r) => {
        if (!r.ok) throw new Error(`Webhook ${r.status}`);
      }),
    );
  }

  // Meta Conversions API: runs alongside the destinations above, but is not one of them, so it can never
  // make a lead succeed or fail. It's only started for leads we actually accept.
  const sendCapi = () =>
    sendMetaLead({
      eventId: typeof b.eventId === "string" ? b.eventId.slice(0, 100) : undefined,
      pageUrl: lead.pageUrl,
      name,
      phone,
      postcode,
      fbclid: b.attribution?.fbclid,
      ip,
      userAgent: req.headers.get("user-agent"),
    });

  if (jobs.length === 0) {
    if (process.env.NODE_ENV === "production") {
      console.error("[lead] No delivery destination configured. LEAD LOST:", lead);
      return NextResponse.json(
        { error: "We couldn't send that. Please call or WhatsApp us on 07449 984820." },
        { status: 500 },
      );
    }
    console.log("[lead:dev]", lead);
    await sendCapi();
    return NextResponse.json({ ok: true });
  }

  const [results] = await Promise.all([Promise.allSettled(jobs), sendCapi()]);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] delivery failed:", r.reason));

  if (results.every((r) => r.status === "rejected")) {
    console.error("[lead] ALL deliveries failed. LEAD:", lead);
    return NextResponse.json(
      { error: "We couldn't send that. Please call or WhatsApp us on 07449 984820." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
