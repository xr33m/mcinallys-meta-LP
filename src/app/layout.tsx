import type { Metadata, Viewport } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { ClickTracker } from "@/components/ClickTracker";

export const metadata: Metadata = {
  title: "Boiler Service in Edinburgh | McInally's Plumbing & Heating",
  description: "Boiler service for Edinburgh homeowners. Gas Safe registered, family-run, 5.0★ on Google.",
  // Paid-traffic landing page: keep it out of search so it doesn't compete with the main site.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a2332",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#book"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:bg-brand focus:px-3 focus:py-2 focus:font-bold"
        >
          Skip to the booking form
        </a>
        {children}
        <ClickTracker />
      </body>
    </html>
  );
}
