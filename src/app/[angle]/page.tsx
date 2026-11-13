import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { angleBySlug, angles } from "@/lib/angles";
import { offer } from "@/lib/config";
import { offerIsLive } from "@/lib/offer";

// Same refresh rule as the home page, so every ad page flips to the standard price when the offer ends.
export const revalidate = 900;
// Only the slugs in src/lib/angles.ts exist; anything else is a 404.
export const dynamicParams = false;

export const generateStaticParams = () => angles.map((a) => ({ angle: a.slug }));

export function generateMetadata({ params }: { params: { angle: string } }): Metadata {
  const a = angleBySlug(params.angle);
  if (!a) return {};
  const live = offerIsLive();
  return {
    title: a.metaTitle,
    description: live
      ? `£${offer.price} (normally £${offer.wasPrice}) until ${offer.endsLabel}. Gas Safe registered, family-run, 5.0★ on Google.`
      : `£${offer.wasPrice} fixed-price boiler service in Edinburgh. Gas Safe registered, family-run, 5.0★ on Google.`,
  };
}

export default function AnglePage({ params }: { params: { angle: string } }) {
  const a = angleBySlug(params.angle);
  if (!a) notFound();
  return <LandingPage angle={a} />;
}
