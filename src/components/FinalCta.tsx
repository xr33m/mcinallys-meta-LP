import { flags, offer, site } from "@/lib/config";
import { currentPrice } from "@/lib/offer";
import { Check, Phone, WhatsApp } from "./icons";

/** Disrupt -> Intrigue -> Click. This is the ONLY place the price appears on the page. */
export function FinalCta({ live }: { live: boolean }) {
  const price = currentPrice(live);
  return (
    <section className="stripes bg-navy px-4 py-14 text-center text-white sm:py-20">
      <h2 className="h-display mx-auto max-w-3xl text-5xl sm:text-7xl">
        Don&rsquo;t find out on <span className="text-brand">the coldest night.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
        One visit. 12 checks. You&rsquo;ll know exactly what is going on inside your boiler.
      </p>

      <div className="mx-auto mt-8 max-w-xl border-2 border-dashed border-brand bg-brand/10 p-5 text-left sm:p-7">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-7xl font-extrabold leading-none text-brand">£{price}</span>
          {live && <span className="font-display text-3xl font-semibold text-white/60 line-through">£{offer.wasPrice}</span>}
          <span className="font-display text-xl font-bold uppercase tracking-wider text-white/80">Fixed price</span>
        </div>
        <ul className="mt-4 space-y-2 text-base">
          {[
            `Full 12-point service by a Gas Safe engineer (${flags.gasSafeNumber})`,
            "A written service record",
            "Repairs quoted separately, only if needed",
            "No payment now. No obligation",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
        <a href="#book" className="btn-yellow sm:flex-[2]">Book my boiler service</a>
        <a href={site.phoneHref} className="btn border-white/70 text-white hover:bg-white/10 sm:flex-1">
          <Phone className="h-5 w-5" /> Call
        </a>
        <a href={site.whatsappHref} className="btn border-white/70 text-white hover:bg-white/10 sm:flex-1">
          <WhatsApp className="h-5 w-5" /> WhatsApp
        </a>
      </div>
    </section>
  );
}
