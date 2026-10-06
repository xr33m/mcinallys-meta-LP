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
import { StickyBar } from "@/components/StickyBar";
import { TrustBar } from "@/components/TrustBar";
import { WinterCheck } from "@/components/WinterCheck";

export default function Home() {
  return (
    <LeadProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Reviews />
        <Checklist />
        <WinterCheck />
        <Comparison />
        <Ryan />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
    </LeadProvider>
  );
}
