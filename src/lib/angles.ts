/**
 * Ad-angle landing pages. Each ad points at its own address (e.g. /safety) so the first thing a visitor reads
 * matches the ad they just clicked. The offer, form, proof and prices stay identical on every page.
 * Keep every claim here true and consistent with the checklist and promises in config.ts.
 */
export type Angle = {
  slug: string;
  /** First line of the hero headline (the price line always follows it). */
  headline: string;
  /** Replaces the hero paragraph. */
  sub: string;
  /** Tab title when the offer is live / not live. */
  metaTitle: string;
};

export const angles: Angle[] = [
  {
    slug: "safety",
    headline: "Carbon monoxide has no smell.",
    sub: "A Gas Safe engineer checks your boiler, flue and ventilation and runs a flue gas analysis, so you know it is burning safely. If we find anything, you get an honest quote, not a hard sell.",
    metaTitle: "Boiler safety check in Edinburgh | McInally's Plumbing & Heating",
  },
  {
    slug: "winter",
    headline: "Don't find out in January.",
    sub: "Get your boiler serviced before the cold weather arrives, by a family-run Edinburgh firm. Fixed price. If we find anything, you get an honest quote, not a hard sell.",
    metaTitle: "Boiler service before winter in Edinburgh | McInally's Plumbing & Heating",
  },
  {
    slug: "mum",
    headline: "When was your mum's boiler last checked?",
    sub: "Book a boiler service for a parent or relative in Edinburgh. We call you to agree a time that suits them, and only quote for repairs if something needs fixing.",
    metaTitle: "Book a boiler service for a parent in Edinburgh | McInally's Plumbing & Heating",
  },
];

export const angleBySlug = (slug: string) => angles.find((a) => a.slug === slug);
