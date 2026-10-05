import { faqs } from "@/lib/config";
import { Chevron } from "./icons";

export function Faq() {
  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Common questions</h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {faqs.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-3 font-bold">
                {f.q}
                <Chevron className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
