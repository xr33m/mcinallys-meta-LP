import type { Metadata } from "next";
import { offer, site } from "@/lib/config";
import { Check, Phone, WhatsApp } from "@/components/icons";
import { LeadEvent } from "@/components/LeadEvent";

export const metadata: Metadata = {
  title: "Request received | McInally's Plumbing & Heating",
  robots: { index: false, follow: false },
};

const prep = [
  "Make sure the boiler is easy to get to (clear any boxes from the cupboard or area around it).",
  "Someone aged 18 or over needs to be home during the visit.",
  "If you can, have a note of the boiler's make and age. Or just send us a photo of its label (below).",
];

export default function ThankYou() {
  return (
    <main className="stripes flex flex-1 items-center justify-center bg-navy px-4 py-12">
      <LeadEvent />
      <div className="w-full max-w-lg border-2 border-navy bg-white p-6 shadow-hard-y sm:p-8">
        <span className="flex h-14 w-14 items-center justify-center border-2 border-navy bg-brand text-navy">
          <Check className="h-7 w-7" />
        </span>
        <h1 className="h-display mt-4 text-5xl">Request received</h1>
        <p className="mt-3 text-navy/80">
          Thanks, we&rsquo;ve got your request for the boiler service. {site.owner} will call you{" "}
          <b>{offer.callbackWindow}</b> to agree a day and time. Keep your phone nearby: the call may come from{" "}
          {site.phoneDisplay}.
        </p>

        <div className="mt-6 border-2 border-navy bg-teal-tint p-4">
          <p className="font-display text-xl font-extrabold uppercase">Before the visit</p>
          <ul className="mt-2 space-y-2">
            {prep.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm font-medium">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-dark" /> {p}
              </li>
            ))}
          </ul>
        </div>

        <a href={site.whatsappPhotoHref} className="btn mt-5 w-full bg-brand shadow-hard hover:bg-brand-dark">
          <WhatsApp className="h-5 w-5" /> WhatsApp a photo of your boiler
        </a>
        <p className="mt-2 text-center text-xs text-navy/70">
          Saves a wasted trip. We&rsquo;ll know exactly what we&rsquo;re working on before we arrive.
        </p>

        <p className="mt-6 text-sm text-navy/70">Need us sooner? Reach us directly:</p>
        <a href={site.phoneHref} className="btn mt-2 w-full bg-navy text-white">
          <Phone className="h-5 w-5" /> Call {site.phoneDisplay}
        </a>
      </div>
    </main>
  );
}
