import { flags, site } from "@/lib/config";

export function TrustBar() {
  const items = [
    flags.showGasSafe && { big: "Gas Safe", small: `Reg. ${flags.gasSafeNumber}` },
    { big: "5.0 ★", small: `${site.googleReviewCount} Google reviews` },
    { big: "Checkatrade", small: "+ TrustATrader + Yell" },
    { big: "12 months", small: "Workmanship guarantee" },
    { big: "Fully insured", small: "Family run · 5+ years" },
  ].filter(Boolean) as { big: string; small: string }[];

  return (
    <section className="border-y-2 border-navy bg-brand">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((it, i) => (
          <div
            key={it.big}
            className={`px-4 py-3 ${i > 0 ? "lg:border-l-2" : ""} ${i % 2 === 1 ? "border-l-2 sm:border-l-0" : ""} border-navy/30 ${i > 0 ? "lg:border-navy" : ""}`}
          >
            <p className="font-display text-2xl font-extrabold uppercase leading-none">{it.big}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-navy/70">{it.small}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
