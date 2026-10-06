import type { Metadata, Viewport } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "£80 Boiler Service in Edinburgh | McInally's Plumbing & Heating",
  description:
    "Autumn boiler service for Edinburgh homeowners: £80 (normally £100) until 31 October. Gas Safe registered, family-run, 5.0★ on Google.",
  // Paid-traffic landing page: keep it out of search so it doesn't compete with the main site.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a2332",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col font-sans antialiased">{children}</body>
    </html>
  );
}
