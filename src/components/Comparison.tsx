import { offer } from "@/lib/config";
import { Check, X } from "./icons";

const rows: [string, string][] = [
  ["You pick a day that suits you", "It fails on the coldest day, when everyone else's does too"],
  ["Small faults caught early, while they're cheap", "Small faults grow into big ones"],
  [`Fixed £${offer.price}, no surprises`, "An urgent callout, priced by the hour"],
  ["Honest quote if anything needs doing", "No heating or hot water while you wait for a slot"],
];

export function Comparison() {
  return (
    <section className="bg-navy px-4 py-14 text-white sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand">Why now</p>
        <h2 className="h-display mt-2 text-5xl sm:text-6xl">Service it in October. Not in January.</h2>

        <div className="mt-8 border-2 border-white/80">
          <div className="grid grid-cols-2 border-b-2 border-white/80 font-display text-lg font-extrabold uppercase tracking-wide sm:text-2xl">
            <div className="bg-brand px-4 py-3 text-navy">Service now · £{offer.price}</div>
            <div className="px-4 py-3 text-white/70">Wait for it to break</div>
          </div>
          {rows.map(([a, b], i) => (
            <div key={a} className={`grid grid-cols-2 ${i > 0 ? "border-t border-white/25" : ""}`}>
              <p className="flex gap-2.5 bg-white px-4 py-4 text-sm font-semibold text-navy sm:text-base">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {a}
              </p>
              <p className="flex gap-2.5 px-4 py-4 text-sm text-white/70 sm:text-base">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-white/40" /> {b}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/50">
          A service can&rsquo;t guarantee a boiler will never break down, but it&rsquo;s the best way to catch problems early.
        </p>
      </div>
    </section>
  );
}
