import { site } from "@/lib/config";
import { Phone } from "./icons";

export function Header() {
  return (
    <header className="bg-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-col leading-none">
          <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-teal-bright sm:text-3xl">
            McInally
          </span>
          <span className="mt-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-bright/80 sm:text-xs">
            Plumbing · Heating
          </span>
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-bright/80 sm:text-xs">
            Bathrooms · Kitchens
          </span>
        </div>
        <a
          href={site.phoneHref}
          className="flex min-h-10 items-center gap-2 border-2 border-white/40 px-3 font-display text-lg font-bold tracking-wide text-white hover:bg-white/10"
        >
          <Phone className="h-4 w-4" />
          {site.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
