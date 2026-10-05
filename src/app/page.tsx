import { AnnouncementBar } from "@/components/AnnouncementBar";
import { BookingForm } from "@/components/BookingForm";
import { Checklist } from "@/components/Checklist";
import { Comparison } from "@/components/Comparison";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadProvider } from "@/components/LeadProvider";
import { Proof } from "@/components/Proof";
import { StickyBar } from "@/components/StickyBar";
import { WinterCheck } from "@/components/WinterCheck";

export default function Home() {
  return (
    <LeadProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <WinterCheck />
        <Checklist />
        <Comparison />
        <Proof />
        <BookingForm />
        <Faq />
      </main>
      <Footer />
      <StickyBar />
    </LeadProvider>
  );
}
