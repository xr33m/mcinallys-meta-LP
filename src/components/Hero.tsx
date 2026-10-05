import { flags, offer, site } from "@/lib/config";
import { Check, Clock, Home, Shield, Star } from "./icons";

export function Hero() {
  return (
    <>
      <section className="bg-gradient-to-b from-navy via-navy to-teal-dark px-4 pb-10 pt-8 text-white sm:pb-14 sm:pt-12">
        <div className="mx-auto max-w-5xl">
          <p className="inline-block rounded border border-teal-bright/60 bg-teal-bright/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-bright">
            Edinburgh&rsquo;s trusted local plumber
          </p>
          <h1 className="mt-4 max-w-2xl text-[2rem] font-extrabold leading-tight sm:text-5xl">
            Edinburgh Boiler Service,{" "}
            <span className="text-teal-bright">£{offer.price} this autumn</span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-200 sm:text-lg">
            A proper boiler service from a family-run Edinburgh firm. Book before{" "}
            {offer.endsLabel} and save £{offer.wasPrice - offer.price}.
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-baseline gap-2 rounded-xl bg-white px-4 py-2 text-navy">
              <span className="text-4xl font-black">£{offer.price}</span>
              <span className="text-lg font-semibold text-slate-400 line-through">£{offer.wasPrice}</span>
            </div>
            <p className="text-sm font-semibold text-brand">
              Save £{offer.wasPrice - offer.price}
              <br />
              <span className="font-normal text-slate-300">until {offer.endsLabel}</span>
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              id="hero-cta"
              href="#book"
              className="flex min-h-14 items-center justify-center rounded-xl bg-brand px-8 text-lg font-extrabold text-navy shadow-lg hover:bg-brand-dark"
            >
              Book my £{offer.price} service
            </a>
            <a
              href="#check"
              className="flex min-h-14 items-center justify-center rounded-xl border-2 border-white/60 px-6 text-base font-bold hover:bg-white/10"
            >
              Take the 30-second winter check
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-200">
            {["No obligation", "Fully insured", "12-month workmanship guarantee"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-teal-bright" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-teal-dark px-4 py-4 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <span className="flex text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </span>
            <span className="font-bold">{site.googleRating}</span>
            <span className="text-teal-tint">· {site.googleReviewCount} Google reviews</span>
          </a>
          {flags.showGasSafe && (
            <span className="flex items-center gap-1.5 font-semibold">
              <Shield /> Gas Safe registered{flags.gasSafeNumber && ` (${flags.gasSafeNumber})`}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-semibold">
            <Shield /> Checkatrade approved
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Clock /> 5+ years experience
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Home /> Family run
          </span>
        </div>
      </section>
    </>
  );
}
