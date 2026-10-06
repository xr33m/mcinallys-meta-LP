import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Checklist } from "@/components/Checklist";
import { Comparison } from "@/components/Comparison";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadProvider } from "@/components/LeadProvider";
import { Reviews } from "@/components/Reviews";
import { Ryan } from "@/components/Ryan";
import { Signs } from "@/components/Signs";
import { StickyBar } from "@/components/StickyBar";
import { TrustBar } from "@/components/TrustBar";
import { WinterCheck } from "@/components/WinterCheck";
import { offer } from "@/lib/config";
import { currentPrice, offerIsLive } from "@/lib/offer";

// Re-render at most every 15 minutes so the page switches to the standard price once the offer ends.
export const revalidate = 900;

export function generateMetadata(): Metadata {
  const live = offerIsLive();
  return {
    title: live
      ? `£${offer.price} Boiler Service in Edinburgh | McInally's Plumbing & Heating`
      : "Boiler Service in Edinburgh | McInally's Plumbing & Heating",
    description: live
      ? `Autumn boiler service for Edinburgh homeowners: £${offer.price} (normally £${offer.wasPrice}) until ${offer.endsLabel}. Gas Safe registered, family-run, 5.0★ on Google.`
      : "Boiler service for Edinburgh homeowners. Gas Safe registered, family-run, 5.0★ on Google.",
  };
}

export default function Home() {
  const live = offerIsLive();
  const price = currentPrice(live);
  return (
    <LeadProvider>
      <AnnouncementBar live={live} price={price} />
      <Header />
      <main>
        <Hero live={live} />
        <TrustBar />
        <Reviews />
        <Checklist price={price} />
        <Signs price={price} />
        <WinterCheck price={price} />
        <Comparison price={price} />
        <Ryan />
        <Faq />
        <FinalCta live={live} />
      </main>
      <Footer />
      <StickyBar price={price} />
    </LeadProvider>
  );
}
