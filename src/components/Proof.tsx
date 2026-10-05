import Image from "next/image";
import { engineerPhoto, reviews, site } from "@/lib/config";
import { Star } from "./icons";

export function Proof() {
  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="flex items-center justify-center gap-1 text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6" />
            ))}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            {site.googleRating} on Google from {site.googleReviewCount} Edinburgh customers
          </h2>
        </div>

        {reviews.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <figure key={r.name + r.area} className="rounded-2xl border border-slate-200 p-5">
                <p className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </p>
                <blockquote className="mt-2 text-sm text-slate-700">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-3 text-sm font-bold">
                  {r.name} <span className="font-normal text-slate-500">· {r.area}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-xl border-2 border-teal px-6 font-bold text-teal hover:bg-teal-tint"
          >
            Read our reviews on Google
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl bg-teal-tint p-6 sm:flex-row sm:p-8">
          {engineerPhoto ? (
            <Image
              src={engineerPhoto}
              alt={`${site.owner}, owner of ${site.brand}`}
              width={160}
              height={160}
              className="h-32 w-32 shrink-0 rounded-full object-cover sm:h-40 sm:w-40"
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-navy text-3xl font-black text-brand">
              R
            </div>
          )}
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-wider text-teal">Meet your engineer</p>
            <h3 className="mt-1 text-xl font-extrabold">{site.owner} and the McInally&rsquo;s team</h3>
            <p className="mt-2 text-slate-700">
              McInally&rsquo;s is a family-run Edinburgh plumbing and heating business. With over 5 years of
              hands-on experience, {site.owner} delivers reliable, honest work, on time and at a fair price.
              When you book, you deal with {site.owner} directly. No call centre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
