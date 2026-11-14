import { flags, promises } from "@/lib/config";
import { ChecklistItems } from "./ChecklistItems";
import { Check } from "./icons";

export function Checklist() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-24">
          <p className="kicker">The solution</p>
          <h2 className="h-display mt-2 text-5xl sm:text-6xl">12 checks on every service.</h2>
          <p className="mt-4 max-w-md text-navy/70">
            {flags.showGasSafe ? `Carried out by a Gas Safe registered engineer (${flags.gasSafeNumber}). ` : ""}
            You see exactly what is checked, and you get a written record of it.
          </p>

          <div className="mt-6 border-2 border-navy bg-brand p-4 shadow-hard">
            <p className="font-display text-xl font-extrabold uppercase">Our promise</p>
            <ul className="mt-2 space-y-1.5">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm font-semibold">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ChecklistItems />
      </div>
    </section>
  );
}
