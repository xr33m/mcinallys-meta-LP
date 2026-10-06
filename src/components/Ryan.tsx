import Image from "next/image";
import { areas, engineerPhoto, site } from "@/lib/config";

export function Ryan() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {engineerPhoto ? (
          <Image
            src={engineerPhoto}
            alt={`${site.owner}, owner of ${site.brand}`}
            width={640}
            height={720}
            className="w-full border-2 border-navy object-cover shadow-hard-y"
          />
        ) : (
          <div className="border-2 border-navy bg-brand p-6 shadow-hard">
            <p className="font-display text-7xl font-extrabold uppercase leading-[0.9]">5+</p>
            <p className="font-display text-2xl font-bold uppercase">years hands-on</p>
            <hr className="my-4 border-navy/30" />
            <p className="font-display text-3xl font-extrabold uppercase leading-none">Family run</p>
            <p className="mt-1 text-sm font-semibold">You deal with {site.owner} directly. No call centre.</p>
          </div>
        )}

        <div>
          <p className="kicker">Your engineer</p>
          <h2 className="h-display mt-2 text-5xl sm:text-6xl">
            Meet {site.owner} and the McInally&rsquo;s team
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy/80">
            McInally&rsquo;s is a family-run plumbing and heating business serving Edinburgh. With over 5 years
            of hands-on experience, {site.owner} delivers reliable, honest work, on time and at a fair price.
          </p>
          <p className="mt-3 max-w-xl text-navy/70">
            We cover {site.coverage}. Gas work is carried out by Gas Safe registered engineers.
          </p>
          <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.15em] text-navy/70">Areas we cover include</p>
          <ul className="mt-2 flex max-w-xl flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a} className="border-2 border-navy bg-white px-2.5 py-0.5 text-sm font-semibold">{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
