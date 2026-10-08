"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { offer, site } from "@/lib/config";
import { captureAttribution } from "@/lib/attribution";
import { useLead } from "./LeadProvider";
import { Phone, WhatsApp } from "./icons";

const SLOTS = ["Weekday daytime", "Any weekday, you pick"];
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Errors = Partial<Record<"name" | "phone" | "postcode" | "form", string>>;

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

export function BookingForm({ price }: { price: number }) {
  const router = useRouter();
  const { assessment } = useLead();
  const attribution = useRef<Record<string, string>>({});
  const [slot, setSlot] = useState(SLOTS[SLOTS.length - 1]);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    attribution.current = captureAttribution();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      postcode: String(fd.get("postcode") ?? "").trim(),
      slot,
      company: String(fd.get("company") ?? ""), // honeypot
      turnstileToken: String(fd.get("cf-turnstile-response") ?? ""),
      assessment,
      attribution: attribution.current,
      pageUrl: window.location.href,
    };

    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong. Please call or WhatsApp us." });
        window.turnstile?.reset();
        setBusy(false);
        return;
      }
      router.push("/thank-you");
    } catch {
      setErrors({ form: "Connection problem. Please try again or call us." });
      setBusy(false);
    }
  }

  const field =
    "mt-1.5 block min-h-12 w-full border-2 border-navy bg-white px-3 text-base outline-none focus:border-teal focus:ring-2 focus:ring-teal";
  const err = (k: keyof Errors) =>
    errors[k] ? <p className="mt-1 text-sm font-semibold text-red-700">{errors[k]}</p> : null;
  const label = "block font-display text-base font-bold uppercase tracking-wider";

  return (
    <div id="book" className="scroll-mt-4">
      {SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      )}
      <div className="border-2 border-navy bg-white text-navy shadow-hard-y">
        <div className="border-b-2 border-navy bg-brand px-5 py-3">
          <h2 className="h-display text-3xl">Book your £{price} service</h2>
          <p className="mt-1 text-sm font-semibold">Takes 30 seconds. We call you {offer.callbackWindow}.</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="p-5">
          {assessment && (
            <p className="mb-4 border-l-4 border-teal bg-teal-tint px-3 py-2 text-sm font-medium text-teal-dark">
              Your winter-check answers will be sent with this request.
            </p>
          )}

          <label className={label}>
            Your name
            <input name="name" autoComplete="name" required className={`${field} font-sans normal-case tracking-normal`} placeholder="e.g. Sarah Campbell" />
            {err("name")}
          </label>

          <label className={`${label} mt-4`}>
            Mobile number
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className={`${field} font-sans normal-case tracking-normal`}
              placeholder="07xxx xxxxxx"
            />
            {err("phone")}
          </label>

          <label className={`${label} mt-4`}>
            Postcode
            <input
              name="postcode"
              autoComplete="postal-code"
              autoCapitalize="characters"
              required
              className={`${field} font-sans normal-case tracking-normal`}
              placeholder="e.g. EH10 4AB"
            />
            {err("postcode")}
          </label>

          <fieldset className="mt-4">
            <legend className={label}>Best time for the visit</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {SLOTS.map((s) => (
                <button
                  type="button"
                  key={s}
                  aria-pressed={slot === s}
                  onClick={() => setSlot(s)}
                  className={`min-h-12 border-2 border-navy px-2 text-sm font-bold transition ${
                    slot === s ? "bg-navy text-white" : "bg-white hover:bg-brand/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          {/* honeypot: hidden from people, tempting to bots */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {SITE_KEY && <div className="cf-turnstile mt-4" data-sitekey={SITE_KEY} data-theme="light" />}

          {errors.form && (
            <p role="alert" className="mt-4 border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
              {errors.form}
            </p>
          )}

          <button type="submit" disabled={busy} className="btn-yellow mt-5 w-full disabled:opacity-60">
            {busy ? "Sending…" : `Book my £${price} service`}
          </button>
          <p className="mt-3 text-center text-xs text-navy/70">
            No payment now. No obligation. We only use your details to arrange your service, see our{" "}
            <Link href="/privacy" className="underline">privacy policy</Link>.
          </p>
        </form>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <a
          href={site.phoneHref}
          className="flex min-h-12 items-center justify-center gap-2 border-2 border-white/60 font-display text-lg font-bold uppercase tracking-wide text-white hover:bg-white/10"
        >
          <Phone className="h-5 w-5" /> Call us
        </a>
        <a
          href={site.whatsappHref}
          className="flex min-h-12 items-center justify-center gap-2 border-2 border-white/60 font-display text-lg font-bold uppercase tracking-wide text-white hover:bg-white/10"
        >
          <WhatsApp className="h-5 w-5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
