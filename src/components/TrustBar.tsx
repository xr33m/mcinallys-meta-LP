import { trustBadges } from "@/lib/config";
import { BadgeMark } from "./BadgeMark";

const COLS: Record<number, string> = { 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5" };

/** White strip so the official logos show in their own colours. */
export function TrustBar() {
  const badges = trustBadges.filter((b) => b.show !== false);
  const odd = badges.length % 2 === 1;

  return (
    <section className="border-y-2 border-navy bg-white">
      <div className={`mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line ${COLS[badges.length] ?? "sm:grid-cols-5"}`}>
        {badges.map((b, i) => {
          const inner = (
            <>
              <BadgeMark badgeKey={b.key} name={b.name} className={b.logoClass} />
              {b.caption && (
                <span className="text-xs font-semibold uppercase tracking-wide text-navy/70">{b.caption}</span>
              )}
            </>
          );
          const cls = `flex min-h-[84px] flex-col items-center justify-center gap-1.5 bg-white px-3 py-3 text-center ${
            odd && i === badges.length - 1 ? "col-span-2 sm:col-span-1" : ""
          }`;
          return b.url ? (
            <a key={b.key} href={b.url} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-paper`}>
              {inner}
            </a>
          ) : (
            <div key={b.key} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
