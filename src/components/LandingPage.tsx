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
import { WhatCanGoWrong } from "@/components/WhatCanGoWrong";
import { StickyBar } from "@/components/StickyBar";
import { TrustBar } from "@/components/TrustBar";
import { WinterCheck } from "@/components/WinterCheck";
import { currentPrice, offerIsLive } from "@/lib/offer";

/**
 * The whole landing page (one page for every ad).
 * Section order walks a cold visitor up the awareness ladder: hook -> hidden problem -> warning signs ->
 * the fix (what a service checks) -> check yours -> proof -> why now -> book.
 */
export function LandingPage() {
  const live = offerIsLive();
  const price = currentPrice(live);
  return (
    <LeadProvider>
      <AnnouncementBar live={live} price={price} />
      <Header />
      <main>
        <Hero live={live} />
        <TrustBar />
        <WhatCanGoWrong price={price} />
        <Signs price={price} />
        <Checklist price={price} />
        <WinterCheck price={price} />
        <Reviews />
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
