import type { Metadata } from "next";
import { offer, site } from "@/lib/config";
import { Check, Phone, WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Request received | McInally's Plumbing & Heating",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex flex-1 items-center justify-center bg-teal-tint px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-200">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white">
          <Check className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold">You&rsquo;re booked in the queue</h1>
        <p className="mt-2 text-slate-600">
          Thanks, we&rsquo;ve got your request for the £{offer.price} Autumn Boiler Service. {site.owner} will call you{" "}
          {offer.callbackWindow} to agree a day and time.
        </p>
        <p className="mt-4 text-sm text-slate-500">Need us sooner? Reach us directly:</p>
        <div className="mt-3 flex flex-col gap-2.5">
          <a href={site.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal font-bold text-white">
            <Phone /> Call {site.phoneDisplay}
          </a>
          <a href={site.whatsappHref} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-teal font-bold text-teal">
            <WhatsApp /> WhatsApp us
          </a>
        </div>
      </div>
    </main>
  );
}
