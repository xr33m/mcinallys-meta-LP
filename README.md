# McInally's £80 Autumn Boiler Service: landing page

Next.js (App Router) + Tailwind v4, built for Meta Ads traffic and deployed on Vercel.

## Edit content
Everything editable lives in `src/lib/config.ts` (prices, dates, phone, reviews, checklist, FAQs, photo).
Items marked `CONFIRM` need a real answer before launch.

## Run
    npm install
    npm run dev

## Preview (Bolt / StackBlitz)
Import the repo; `npm install` then `npm run dev` (uses `next dev --webpack`). With no env vars set, form submissions are logged
to the console and succeed, so the whole flow can be previewed without a CRM.

## Lead delivery
`POST /api/lead` validates, checks the honeypot and Turnstile (if keys are set), then sends to every configured
destination (Airtable and/or `LEAD_WEBHOOK_URL`). See `.env.example`. In production with no destination
configured, the API returns an error rather than silently dropping a lead.

### Airtable
Base: "McInally's Plumbing & Heating CRM", table `Leads` (base ID `appO5TYh8bHyt07ky`). Set `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE=Leads`
and an `AIRTABLE_TOKEN` (personal access token with `data.records:write` on that base) in Vercel env vars.
Fields (exact names):
Name, Phone, Postcode, In area (checkbox), Preferred time, Boiler age, Last service, Symptoms, Winter check score (number),
Winter check level, UTM source, UTM medium, UTM campaign, UTM content, UTM term, fbclid, Page URL, Status.

## Not built yet (next phases)
Meta Pixel + Conversions API (fire on `/thank-you`), consent banner, customer SMS/email confirmation, A/B testing.
