import { site } from "@/lib/config";
import { Phone } from "./icons";

export function Header() {
  return (
    <header className="bg-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="bg-brand px-3 py-1 font-display text-2xl font-extrabold italic leading-none tracking-tight text-navy">
            MCINALLY
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/70 sm:block">
            Plumbing · Heating
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
