import { offer, site } from "@/lib/config";
import { Phone, WhatsApp } from "./icons";

export function FinalCta() {
  return (
    <section className="stripes bg-navy px-4 py-14 text-center text-white">
      <h2 className="h-display mx-auto max-w-3xl text-5xl sm:text-7xl">
        £{offer.price} until {offer.endsLabel}. <span className="text-brand">Then it&rsquo;s £{offer.wasPrice}.</span>
      </h2>
      <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
        <a href="#book" className="btn-yellow sm:flex-[2]">Book my £{offer.price} service</a>
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
