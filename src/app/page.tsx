import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { offer } from "@/lib/config";
import { offerIsLive } from "@/lib/offer";

// Re-render at most every 15 minutes so the page switches to the standard price once the offer ends.
export const revalidate = 900;

export function generateMetadata(): Metadata {
  const live = offerIsLive();
  return {
    title: live
      ? `£${offer.price} Boiler Service in Edinburgh | McInally's Plumbing & Heating`
      : `Boiler Service in Edinburgh, £${offer.wasPrice} Fixed Price | McInally's Plumbing & Heating`,
    description: live
      ? `Boiler service for Edinburgh homeowners: £${offer.price} (normally £${offer.wasPrice}) until ${offer.endsLabel}. Gas Safe registered, family-run, 5.0★ on Google.`
      : `Boiler service for Edinburgh homeowners: £${offer.wasPrice} fixed price, 12 checks and a written record. Gas Safe registered, family-run, 5.0★ on Google.`,
  };
}

export default function Home() {
  return <LandingPage />;
}
