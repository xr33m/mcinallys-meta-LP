import type { Metadata } from "next";
import { offer, site } from "@/lib/config";
import { Check, Phone, WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Request received | McInally's Plumbing & Heating",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="stripes flex flex-1 items-center justify-center bg-navy px-4 py-12">
      <div className="w-full max-w-md border-2 border-navy bg-white p-7 text-center shadow-hard-y">
        <span className="mx-auto flex h-14 w-14 items-center justify-center bg-brand text-navy border-2 border-navy">
          <Check className="h-7 w-7" />
        </span>
        <h1 className="h-display mt-4 text-4xl">Request received</h1>
        <p className="mt-2 text-navy/70">
          Thanks, we&rsquo;ve got your request for the £{offer.price} Autumn Boiler Service. {site.owner} will call you{" "}
          {offer.callbackWindow} to agree a day and time.
        </p>
        <p className="mt-4 text-sm text-navy/60">Need us sooner? Reach us directly:</p>
        <div className="mt-3 flex flex-col gap-2.5">
          <a href={site.phoneHref} className="btn bg-navy text-white">
            <Phone /> Call {site.phoneDisplay}
          </a>
          <a href={site.whatsappHref} className="btn bg-white">
            <WhatsApp /> WhatsApp us
          </a>
        </div>
      </div>
    </main>
  );
}
