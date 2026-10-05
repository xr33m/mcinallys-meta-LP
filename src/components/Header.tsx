import { site } from "@/lib/config";
import { Phone } from "./icons";

export function Header() {
  return (
    <header className="bg-navy">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="bg-brand px-2.5 py-1 text-lg font-black italic leading-none tracking-tight text-navy">
            MCINALLY
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-widest text-slate-300 sm:block">
            Plumbing · Heating
          </span>
        </div>
        <a
          href={site.phoneHref}
          className="flex min-h-10 items-center gap-2 rounded-lg border border-white/30 px-3 text-sm font-bold text-white hover:bg-white/10"
        >
          <Phone className="h-4 w-4" />
          <span>{site.phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}
