import { offer } from "@/lib/config";
import { Check, X } from "./icons";

const planned = [
  "You choose a day that suits you",
  "Small faults caught early",
  "Fixed £" + offer.price + " price, no surprises",
  "Honest quote if anything needs fixing",
];
const breakdown = [
  "Boilers tend to fail when demand is highest: the first cold snap",
  "No heating or hot water until it's fixed",
  "Waiting for an available engineer",
  "Faults that could have been spotted cheaply months earlier",
];

export function Comparison() {
  return (
    <section className="bg-slate-50 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
          Plan it now, or deal with it in January
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-teal bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-wider text-teal">Planned autumn service</p>
            <p className="mt-1 text-3xl font-black">£{offer.price}</p>
            <ul className="mt-4 space-y-2.5">
              {planned.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Waiting until it breaks</p>
            <p className="mt-1 text-3xl font-black text-slate-400">Unplanned</p>
            <ul className="mt-4 space-y-2.5">
              {breakdown.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-slate-600">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          A service can&rsquo;t guarantee your boiler will never break down, but it&rsquo;s the best way to catch problems early.
        </p>
      </div>
    </section>
  );
}
