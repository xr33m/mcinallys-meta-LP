import { flags, offer, site } from "@/lib/config";
import { currentPrice } from "@/lib/offer";
import { BookingForm } from "./BookingForm";
import { Check, Star } from "./icons";

export function Hero({ live }: { live: boolean }) {
  const price = currentPrice(live);
  const saving = offer.wasPrice - offer.price;
  return (
    <section className="stripes bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14 lg:pb-16 lg:pt-14">
        <div>
          <p className="font-display text-base font-bold uppercase tracking-[0.12em] text-brand sm:text-lg sm:tracking-[0.18em]">
            Edinburgh homeowners
            {flags.showGasSafe && <span className="text-white/60"> · Gas Safe registered</span>}
          </p>
          <h1 className="h-display mt-3 text-[3.2rem] sm:text-7xl lg:text-8xl">
            Boiler service.
            <br />
            {live ? (
              <>
                <span className="text-brand">£{offer.price}</span> till {offer.endsLabel}.
              </>
            ) : (
              <>
                Fixed price <span className="text-brand">£{price}</span>.
              </>
            )}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
            A proper annual service from a family-run Edinburgh firm, done before the cold weather
            arrives. Fixed price. If we find anything, you get an honest quote, not a hard sell.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-6">
            <div className="inline-flex items-stretch border-2 border-dashed border-brand bg-brand/10">
              <div className="flex items-baseline gap-2 px-4 py-2">
                <span className="font-display text-6xl font-extrabold leading-none text-brand">£{price}</span>
                {live && (
                  <span className="font-display text-2xl font-semibold text-white/60 line-through">
                    £{offer.wasPrice}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center border-l-2 border-dashed border-brand px-3 font-display text-sm font-bold uppercase leading-tight tracking-wider">
                {live ? (
                  <>
                    Save £{saving}
                    <span className="font-semibold text-white/70">Ends {offer.endsLabel}</span>
                  </>
                ) : (
                  <>
                    Fixed price
                    <span className="font-semibold text-white/70">Full service</span>
                  </>
                )}
              </div>
            </div>

            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm"
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

          <a id="hero-cta" href="#book" className="btn-yellow mt-6 w-full lg:hidden">
            Book my £{price} service
          </a>

          <ul className="mt-6 space-y-2 text-base">
            {[
              "Fully insured, with a 12-month workmanship guarantee",
              "No payment now and no obligation",
              `We call you ${offer.callbackWindow}`,
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {t}
              </li>
            ))}
          </ul>

        </div>

        <BookingForm price={price} />
      </div>
    </section>
  );
}
