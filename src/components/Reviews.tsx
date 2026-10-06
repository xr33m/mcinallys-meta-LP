import { reviews, site, trustBadges } from "@/lib/config";
import { BadgeMark } from "./BadgeMark";
import { Star } from "./icons";

const SHOWN = 5;

function Stars() {
  return (
    <span className="flex text-brand-dark" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" />
      ))}
    </span>
  );
}

export function Reviews() {
  const [lead, ...rest] = reviews;
  const list = rest.slice(0, SHOWN - 1);
  if (!lead) return null;

  return (
    <section className="bg-paper px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="kicker flex items-center gap-2">
          Real reviews on
          <BadgeMark badgeKey="google" name="Google" className="h-5" textClassName="font-display text-sm font-bold uppercase tracking-[0.18em]" />
        </p>
        <h2 className="h-display mt-2 max-w-3xl text-5xl sm:text-6xl">
          {site.googleReviewCount} Edinburgh customers. {site.googleRating} stars.
        </h2>
        <p className="mt-3 max-w-xl text-navy/70">
          Prompt, tidy, fairly priced. This is what people say after Ryan and the team have been in
          their home.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <figure className="border-2 border-navy bg-navy p-6 text-white shadow-hard lg:col-span-1 lg:self-start">
            <div className="flex items-center justify-between gap-3">
              <span className="flex text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5" />
                ))}
              </span>
              {lead.tag && (
                <span className="bg-brand px-2 py-0.5 font-display text-sm font-bold uppercase tracking-wider text-navy">
                  {lead.tag}
                </span>
              )}
            </div>
            <blockquote className="mt-4 text-[1.05rem] leading-relaxed">{lead.text}</blockquote>
            <figcaption className="mt-5 border-t border-white/20 pt-3">
              <p className="font-display text-xl font-bold uppercase tracking-wide">{lead.name}</p>
              {lead.badge && <p className="text-xs uppercase tracking-wider text-white/60">{lead.badge}</p>}
            </figcaption>
          </figure>

          <div className="gap-5 sm:columns-2 lg:col-span-2 [&>figure]:mb-5 [&>figure]:break-inside-avoid">
            {list.map((r) => (
              <figure key={r.name} className="border-2 border-navy bg-white p-5">
                <Stars />
                <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-navy/90">
                  {r.text.length > 400 ? r.text.slice(0, 400).replace(/\s+\S*$/, "") + "…" : r.text}
                </blockquote>
                <figcaption className="mt-4 font-display text-lg font-bold uppercase tracking-wide">
                  {r.name}
                </figcaption>
                {r.reply && (
                  <p className="mt-3 border-l-4 border-brand pl-3 text-sm text-navy/70">
                    <b className="text-navy">Reply from McInally&rsquo;s:</b>{" "}
                    {r.reply.length > 150 ? r.reply.slice(0, 150).replace(/\s+\S*$/, "") + "…" : r.reply}
                  </p>
                )}
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-white shadow-hard hover:bg-brand"
          >
            Read all {site.googleReviewCount} reviews on Google
          </a>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm font-bold uppercase tracking-[0.15em] text-navy/70">Also find us on</span>
            {trustBadges
              .filter((d) => ["checkatrade", "trustatrader", "yell"].includes(d.key))
              .map((d) => {
                const cls = "flex min-h-10 items-center border-2 border-navy bg-white px-3 py-1";
                const mark = (
                  <BadgeMark
                    badgeKey={d.key}
                    name={d.name}
                    className={d.rowClass ?? "h-6"}
                    textClassName="font-display text-lg font-bold uppercase tracking-wide"
                  />
                );
                return d.url ? (
                  <a key={d.key} href={d.url} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-brand/30`}>
                    {mark}
                  </a>
                ) : (
                  <span key={d.key} className={cls}>{mark}</span>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
