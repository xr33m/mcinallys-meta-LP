import { site } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-navy px-4 py-8 text-center text-sm text-slate-400">
      <p className="font-semibold text-slate-200">{site.brand}</p>
      <p className="mt-1">Covering {site.coverage}</p>
      <p className="mt-1">
        <a href={site.phoneHref} className="underline">{site.phoneDisplay}</a> ·{" "}
        <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
      </p>
      <p className="mt-3 text-xs">
        Offer applies to standard gas boiler services within our coverage area while slots last.{" "}
        <a href="/privacy" className="underline">Privacy policy</a>
      </p>
    </footer>
  );
}
