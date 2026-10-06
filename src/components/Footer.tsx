import Link from "next/link";
import { flags, site } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t-4 border-brand bg-navy-deep px-4 py-8 text-sm text-white/60">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xl font-bold uppercase tracking-wide text-white">{site.brand}</p>
        <p className="mt-1">
          {site.legalName} · Registered in Scotland no. {site.companyNumber}
          {flags.showGasSafe && ` · Gas Safe registered ${flags.gasSafeNumber}`}
        </p>
        <p className="mt-1">
          Covering {site.coverage} ·{" "}
          <a href={site.phoneHref} className="underline">{site.phoneDisplay}</a> ·{" "}
          <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
        </p>
        <p className="mt-4 text-xs">
          Offer applies to standard gas boiler services within our coverage area while slots last.{" "}
          <Link href="/privacy" className="underline">Privacy policy</Link>
        </p>
      </div>
    </footer>
  );
}
