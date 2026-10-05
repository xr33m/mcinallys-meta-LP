import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "£80 Boiler Service in Edinburgh | McInally's Plumbing & Heating",
  description:
    "Autumn boiler service for Edinburgh homeowners: £80 (normally £100) until 31 October. Family-run, fully insured, 5.0★ on Google.",
  // Paid-traffic landing page: keep it out of search so it doesn't compete with the main site.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a2332",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
