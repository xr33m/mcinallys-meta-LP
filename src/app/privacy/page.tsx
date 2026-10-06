import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy policy | McInally's Plumbing & Heating",
  robots: { index: false, follow: false },
};

// CONFIRM: draft wording. Have it reviewed before launch and align it with the main site's policy.
export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 text-slate-700">
      <h1 className="h-display text-5xl text-navy">Privacy policy</h1>
      <p className="mt-4">
        {site.brand} (&ldquo;we&rdquo;) is the controller of the personal information you give us on this page.
      </p>
      <h2 className="mt-6 font-display text-2xl font-bold uppercase text-navy">What we collect</h2>
      <p className="mt-1">
        Your name, phone number, postcode, preferred visit time and any answers you give in the winter check. We
        also record which advert or link brought you here so we can see what is working.
      </p>
      <h2 className="mt-6 font-display text-2xl font-bold uppercase text-navy">How we use it</h2>
      <p className="mt-1">
        To contact you about your boiler service request, arrange and carry out the visit, and keep a record of the
        work. We don&rsquo;t sell your details.
      </p>
      <h2 className="mt-6 font-display text-2xl font-bold uppercase text-navy">Who sees it</h2>
      <p className="mt-1">
        Our team, and the tools we use to store and message enquiries (for example our CRM, hosting and SMS/email
        providers), who process it on our behalf.
      </p>
      <h2 className="mt-6 font-display text-2xl font-bold uppercase text-navy">Your rights</h2>
      <p className="mt-1">
        You can ask to see, correct or delete your information at any time by emailing{" "}
        <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p className="mt-8">
        <Link href="/" className="font-bold text-teal underline">← Back to the offer</Link>
      </p>
    </main>
  );
}
