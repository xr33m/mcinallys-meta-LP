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
import type { Angle } from "@/lib/angles";
import { currentPrice, offerIsLive } from "@/lib/offer";

/** The whole landing page. `angle` swaps only the hero headline and paragraph to match the ad. */
export function LandingPage({ angle }: { angle?: Angle }) {
  const live = offerIsLive();
  const price = currentPrice(live);
  return (
    <LeadProvider>
      <AnnouncementBar live={live} price={price} />
      <Header />
      <main>
        <Hero live={live} angle={angle} />
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
