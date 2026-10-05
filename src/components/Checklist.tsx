import { checklist, flags, offer } from "@/lib/config";
import { Check } from "./icons";

export function Checklist() {
  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
          What your £{offer.price} service includes
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-600">
          {flags.showGasSafe ? "A 12-point Gas Safe check" : "A 12-point check"}, so you know exactly what you&rsquo;re paying for.
        </p>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {checklist.map((c, i) => (
            <li key={c.title} className="flex gap-3 rounded-xl border border-slate-200 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold">
                  <span className="mr-1.5 text-teal">{i + 1}.</span>
                  {c.title}
                </p>
                <p className="mt-0.5 text-sm text-slate-600">{c.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 text-center">
          <a
            href="#book"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-brand px-8 text-lg font-extrabold text-navy hover:bg-brand-dark sm:w-auto"
          >
            Book my £{offer.price} service
          </a>
        </div>
      </div>
    </section>
  );
}
