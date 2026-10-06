import { checklist, flags, offer } from "@/lib/config";

export function Checklist() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="kicker">What you get</p>
            <h2 className="h-display mt-2 text-5xl sm:text-6xl">
              12 checks. One fixed price: £{offer.price}.
            </h2>
            <p className="mt-4 max-w-md text-navy/70">
              {flags.showGasSafe
                ? `Carried out by a Gas Safe registered engineer (${flags.gasSafeNumber}). `
                : ""}
              You see exactly what you&rsquo;re paying for, and you get a written record of what was checked.
            </p>
            <div className="mt-6 border-2 border-navy bg-brand p-4 shadow-hard">
              <p className="font-display text-xl font-extrabold uppercase">If we find a problem</p>
              <p className="mt-1 text-sm font-medium">
                We explain it plainly and give you a fair quote. You decide. No pressure, no obligation.
              </p>
            </div>
          </div>

          <ol className="divide-y-2 divide-line border-y-2 border-navy">
            {checklist.map((c, i) => (
              <li key={c.title} className="flex gap-4 py-3.5">
                <span className="w-10 shrink-0 font-display text-4xl font-extrabold leading-none text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xl font-bold uppercase leading-tight tracking-wide">{c.title}</p>
                  <p className="mt-0.5 text-sm text-navy/70">{c.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
