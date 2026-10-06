# McInally's £80 Autumn Boiler Service: landing page

Next.js 14 (App Router) + Tailwind v3, built for Meta Ads traffic and deployed on Vercel.

## Edit content
(Sticky bar slot count = `capacity.slotsLeft`; it must be true and kept updated, set to `null` to hide it. After `offer.endsISO` passes, the page automatically switches to the standard price within ~15 minutes.)
Everything editable lives in `src/lib/config.ts` (prices, dates, phone, reviews, checklist, FAQs, photo).
Items marked `CONFIRM` need a real answer before launch.

## Trust logos
Add the official logo files to `public/logos/` named `gas-safe`, `google`, `checkatrade`, `trustatrader`, `yell` (`.svg`, `.png`, `.webp` or `.jpg`).
The site detects them and swaps the text label for the logo automatically (trust bar + the "Also find us on" row under the reviews).
Download them from each member dashboard / brand-assets page; use them unaltered and follow each brand's usage rules (Gas Safe's
include showing the registration number, which the page does). Redeploy after adding files.

## Run
    npm install
    npm run dev

## Preview (bolt.new / StackBlitz)
Import the repo from GitHub; Bolt runs `npm install` then `npm run dev`. The stack is chosen to run in a browser-based Node
(Next 14.2 + React 18 + Tailwind 3, no native dependencies, fonts from npm). With no env vars set, form submissions are logged to the
console and succeed, so the whole flow can be previewed without a CRM.

## Lead delivery
`POST /api/lead` validates, checks the honeypot and Turnstile (if keys are set), then sends to every configured destination
(a webhook and/or Airtable directly). In production with no destination configured, the API returns an error rather than
silently dropping a lead.

### Environment variables (set in Vercel)
- `LEAD_WEBHOOK_URL`: the Make webhook for the scenario "7. McInally's Lead → Instant Alert". **This is the only variable needed to
  go live.** Make emails the owner instantly and (once Make's Airtable token can see the CRM base) saves the lead to Airtable.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile CAPTCHA (optional until set up).
- `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE`: optional direct-to-Airtable path. Don't combine with the Make Airtable
  step or each lead is saved twice.

### Airtable
Base: "McInally's Plumbing & Heating CRM", table `Leads` (base ID `appO5TYh8bHyt07ky`). Used by Make (and optionally the direct path above).
Fields (exact names):
Name, Phone, Postcode, In area (checkbox), Preferred time, Boiler age, Last service, Symptoms, Winter check score (number),
Winter check level, UTM source, UTM medium, UTM campaign, UTM content, UTM term, fbclid, Page URL, Status.

## Not built yet (next phases)
Meta Pixel + Conversions API (fire on `/thank-you`), consent banner, customer SMS/email confirmation, A/B testing.
