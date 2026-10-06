import { faqs } from "@/lib/config";

export function Faq() {
  return (
    <section className="bg-paper px-4 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="kicker">Questions</p>
          <h2 className="h-display mt-2 text-5xl sm:text-6xl">Before you book</h2>
        </div>
        <div className="border-t-2 border-navy">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b-2 border-navy">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-xl font-bold uppercase tracking-wide">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-navy font-sans text-lg leading-none group-open:bg-brand">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="pb-4 pr-10 text-navy/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
