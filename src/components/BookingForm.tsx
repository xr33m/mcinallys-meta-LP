"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { offer, site } from "@/lib/config";
import { captureAttribution } from "@/lib/attribution";
import { useLead } from "./LeadProvider";
import { Phone, WhatsApp } from "./icons";

const SLOTS = ["Weekday daytime", "Weekday evening", "Saturday", "Any, you pick"];
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Errors = Partial<Record<"name" | "phone" | "postcode" | "form", string>>;

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

export function BookingForm() {
  const router = useRouter();
  const { assessment } = useLead();
  const attribution = useRef<Record<string, string>>({});
  const [slot, setSlot] = useState(SLOTS[3]);
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
    "mt-1.5 block min-h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-base outline-none focus:border-teal";
  const err = (k: keyof Errors) =>
    errors[k] ? <p className="mt-1 text-sm font-medium text-red-600">{errors[k]}</p> : null;

  return (
    <section id="book" className="bg-navy px-4 py-12 sm:py-16">
      {SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      )}
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-2xl font-extrabold text-white sm:text-3xl">
          Book your £{offer.price} Autumn Boiler Service
        </h2>
        <p className="mt-2 text-center text-slate-300">
          Takes 30 seconds. We&rsquo;ll call you {offer.callbackWindow} to agree a day that suits.
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-6 rounded-2xl bg-white p-5 text-navy shadow-xl sm:p-7"
        >
          {assessment && (
            <p className="mb-4 rounded-lg bg-teal-tint px-3 py-2 text-sm text-teal-dark">
              ✓ Your winter-check answers will be sent with this request.
            </p>
          )}

          <label className="block text-sm font-bold">
            Your name
            <input name="name" autoComplete="name" required className={field} placeholder="e.g. Sarah Campbell" />
            {err("name")}
          </label>

          <label className="mt-4 block text-sm font-bold">
            Mobile number
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className={field}
              placeholder="07xxx xxxxxx"
            />
            {err("phone")}
          </label>

          <label className="mt-4 block text-sm font-bold">
            Postcode
            <input
              name="postcode"
              autoComplete="postal-code"
              autoCapitalize="characters"
              required
              className={field}
              placeholder="e.g. EH10 4AB"
            />
            {err("postcode")}
          </label>

          <fieldset className="mt-4">
            <legend className="text-sm font-bold">Best time for the visit</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {SLOTS.map((s) => (
                <button
                  type="button"
                  key={s}
                  aria-pressed={slot === s}
                  onClick={() => setSlot(s)}
                  className={`min-h-12 rounded-xl border-2 px-2 text-sm font-semibold transition ${
                    slot === s ? "border-teal bg-teal text-white" : "border-slate-200 hover:border-teal"
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
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {errors.form}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-5 min-h-14 w-full rounded-xl bg-brand px-6 text-lg font-extrabold text-navy transition hover:bg-brand-dark disabled:opacity-60"
          >
            {busy ? "Sending…" : `Book my £${offer.price} service`}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            No payment now. No obligation. We only use your details to arrange your service, see our{" "}
            <a href="/privacy" className="underline">privacy policy</a>.
          </p>
        </form>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-white/30 font-bold text-white hover:bg-white/10"
          >
            <Phone /> Call {site.phoneDisplay}
          </a>
          <a
            href={site.whatsappHref}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-white/30 font-bold text-white hover:bg-white/10"
          >
            <WhatsApp /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
