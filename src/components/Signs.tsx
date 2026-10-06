import { BoilerIllustration } from "./BoilerIllustration";

const signs = [
  { t: "Strange noises", d: "Banging, whistling or gurgling when the heating comes on." },
  { t: "Error codes or lock-outs", d: "Flashing lights, error codes, or it keeps needing a reset." },
  { t: "Pressure that keeps dropping", d: "You find yourself topping up the pressure gauge." },
  { t: "Drips or damp", d: "Water around the boiler, or damp patches on nearby walls or ceilings." },
  { t: "Black marks or soot", d: "Scorch or soot marks around the boiler can mean it isn't burning cleanly." },
  { t: "Slow or uneven heating", d: "Radiators cold at the top or bottom, or the house takes ages to warm up." },
];

export function Signs({ price }: { price: number }) {
  return (
    <section className="bg-paper px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Know the signs</p>
        <h2 className="h-display mt-2 max-w-3xl text-5xl sm:text-6xl">6 signs your boiler needs a look</h2>
        <p className="mt-3 max-w-xl text-navy/70">
          Most boiler problems give a warning first. These are the things to look out for. Spot one or more, and a service is the
          cheapest way to find out why.
        </p>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="border-2 border-navy bg-white p-4 shadow-hard sm:p-6 lg:sticky lg:top-24">
            <BoilerIllustration pins className="mx-auto w-full max-w-[190px] sm:max-w-[280px]" />
          </div>

          <div>
            <ol className="divide-y-2 divide-line border-y-2 border-navy bg-white/60">
              {signs.map((s, i) => (
                <li key={s.t} className="flex gap-4 px-3 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-brand font-display text-xl font-extrabold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl font-bold uppercase leading-tight tracking-wide">{s.t}</p>
                    <p className="mt-0.5 text-sm text-navy/70">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#book" className="btn-yellow sm:flex-1">Book my £{price} service</a>
              <a href="#check" className="btn bg-white shadow-hard hover:bg-brand/30 sm:flex-1">Take the 30-second check</a>
            </div>
            <p className="mt-2 text-xs text-navy/70">
              These are things to look out for, not a diagnosis. Only a Gas Safe registered engineer should work on a gas boiler.
            </p>

            <div className="mt-6 border-2 border-navy border-l-8 border-l-red-600 bg-white p-4">
              <p className="font-display text-lg font-extrabold uppercase tracking-wide">Smell gas? Don&rsquo;t wait for a booking.</p>
              <p className="mt-1 text-sm text-navy/80">
                Open windows, don&rsquo;t use switches or flames, leave the property and call the National Gas Emergency Service on{" "}
                <a href="tel:0800111999" className="font-bold underline">0800 111 999</a> (free, 24 hours). Headaches, dizziness or
                nausea around a boiler can also be a sign of carbon monoxide: get fresh air and seek help straight away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
