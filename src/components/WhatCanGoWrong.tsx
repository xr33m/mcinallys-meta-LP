import { Check, X } from "./icons";

const issues = [
  "Carbon monoxide: no smell, no colour, no warning",
  "A frozen condensate pipe can lock it out on the coldest night",
  "Worn seals and build-up quietly cut efficiency, then fail",
  "Some warranties ask for a yearly service. Check yours",
];

const benefits = [
  "Combustion readings confirm it is burning safely",
  "Small faults caught while they are small",
  "A written record for your warranty and your peace of mind",
  "An honest quote, only if something needs doing",
];

/** PAS: Problem (headline) -> Agitate (what can go wrong) -> Solution (what a service gives you). */
export function WhatCanGoWrong() {
  return (
    <section className="bg-navy px-4 py-14 text-white sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand">The hidden problem</p>
        <h2 className="h-display mt-2 max-w-3xl text-5xl sm:text-6xl">You can&rsquo;t see inside your boiler.</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          It can run fine for years and still be going wrong. Here&rsquo;s the difference a yearly service makes.
        </p>

        <div className="mt-8 grid border-2 border-white/80 sm:grid-cols-2">
          <div className="bg-white/5 p-5 sm:p-7">
            <p className="font-display text-2xl font-extrabold uppercase tracking-wide text-white/90 sm:text-3xl">Left alone</p>
            <ul className="mt-4 space-y-3.5">
              {issues.map((t) => (
                <li key={t} className="flex gap-2.5 text-[0.95rem] leading-snug text-white/85 sm:text-base">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-white/80 bg-white p-5 text-navy sm:border-l-2 sm:border-t-0 sm:p-7">
            <p className="font-display text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">Serviced</p>
            <ul className="mt-4 space-y-3.5">
              {benefits.map((t) => (
                <li key={t} className="flex gap-2.5 text-[0.95rem] font-semibold leading-snug sm:text-base">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-extrabold uppercase tracking-wide sm:flex-1">
            The only way to know is to look inside it.
          </p>
          <a href="#signs" className="btn border-white/70 text-white hover:bg-white/10 sm:w-auto">
            See the warning signs
          </a>
          <a href="#book" className="btn-yellow sm:w-auto">
            Book my boiler service
          </a>
        </div>
      </div>
    </section>
  );
}
