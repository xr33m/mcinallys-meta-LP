import { flags, offer, site } from "@/lib/config";
import { BookingForm } from "./BookingForm";
import { Check, Phone, Star } from "./icons";

/** Disrupt (headline) -> Intrigue (paragraph + what you get) -> Click (button). No price here: it is revealed at the final CTA. */
export function Hero() {
  return (
    <section className="stripes bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14 lg:pb-16 lg:pt-14">
        <div>
          <p className="font-display text-base font-bold uppercase tracking-[0.12em] text-brand sm:text-lg sm:tracking-[0.18em]">
            Edinburgh homeowners
            {flags.showGasSafe && <span className="text-white/60"> · Gas Safe registered</span>}
          </p>
          <h1 className="h-display mt-3 text-[2.9rem] sm:text-7xl lg:text-8xl">
            Working fine?
            <br />
            <span className="text-brand">It still needs servicing.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
            Warm radiators don&rsquo;t tell you if your boiler is burning safely or wearing out inside. A Gas Safe engineer checks
            what you can&rsquo;t see.
          </p>

          <ul className="mt-5 space-y-2.5 text-base sm:text-lg">
            {[
              `12-point check by a Gas Safe engineer (${flags.gasSafeNumber})`,
              "A written service record for your peace of mind and warranty",
              "An honest quote only if something needs fixing. No hard sell",
              `No payment now. We call you ${offer.callbackWindow}`,
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <Check className="mt-1 h-5 w-5 shrink-0 text-brand" /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:hidden">
            <a id="hero-cta" href="#book" className="btn-yellow flex-1">
              Book my boiler service
            </a>
            <a href={site.phoneHref} className="btn-outline-light flex-1">
              <Phone className="h-5 w-5" /> Call {site.owner} now
            </a>
          </div>

          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm"
          >
            <span className="flex text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5" />
              ))}
            </span>
            <span>
              <b className="text-base">{site.googleRating}</b> · {site.googleReviewCount} Google reviews
            </span>
          </a>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
