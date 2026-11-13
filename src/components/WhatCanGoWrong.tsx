const risks = [
  {
    n: "01",
    t: "Carbon monoxide",
    d: "It has no smell, colour or taste. A faulty or badly ventilated boiler can produce it, and the only way to confirm yours is burning safely is to take combustion readings. Fit an audible CO alarm as well.",
  },
  {
    n: "02",
    t: "No heating when it's freezing",
    d: "A blocked condensate pipe can freeze and lock a modern boiler out in cold weather. A fault in January means no heating and no hot water until someone can get to you.",
  },
  {
    n: "03",
    t: "Small faults that grow",
    d: "Worn seals, a dirty burner and build-up in the heat exchanger rarely make a noise at first. They cut efficiency and wear out parts, and a small fix can turn into a big one.",
  },
  {
    n: "04",
    t: "Warranty and paperwork",
    d: "Many manufacturers ask for a yearly service to keep a warranty valid. A written service record is what you show if you ever need to prove it. Check your boiler's paperwork.",
  },
];

/** Step 1 of the page's story: reveal the hidden problem to someone who feels no pain yet. */
export function WhatCanGoWrong({ price }: { price: number }) {
  return (
    <section className="bg-navy px-4 py-14 text-white sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand">The hidden problem</p>
        <h2 className="h-display mt-2 max-w-3xl text-5xl sm:text-6xl">
          A boiler can run fine and still be going wrong.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          Warm radiators and hot water tell you the boiler is running. They don&rsquo;t tell you how safely or how well. Here is what
          a service is there to catch.
        </p>

        <ul className="mt-9 grid gap-px border-2 border-white/80 bg-white/25 sm:grid-cols-2">
          {risks.map((r) => (
            <li key={r.n} className="bg-navy p-5 sm:p-7">
              <p className="font-display text-4xl font-extrabold leading-none text-brand">{r.n}</p>
              <p className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-wide">{r.t}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/80">{r.d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-extrabold uppercase tracking-wide sm:flex-1">
            The only way to know is to look inside it.
          </p>
          <a href="#signs" className="btn border-white/70 text-white hover:bg-white/10 sm:w-auto">
            See the warning signs
          </a>
          <a href="#book" className="btn-yellow sm:w-auto">
            Book my £{price} service
          </a>
        </div>
      </div>
    </section>
  );
}
