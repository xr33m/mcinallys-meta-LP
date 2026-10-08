/**
 * Single source of truth for everything the business may want to edit.
 * Items marked CONFIRM are placeholders that need a real answer before launch.
 */

export type Review = {
  name: string;
  text: string;
  /** Reply from the business, shown under the review. */
  reply?: string;
  /** e.g. "Local Guide · 235 reviews" */
  badge?: string;
  /** Short label shown on the card, e.g. "Boiler service". */
  tag?: string;
};

export const site = {
  brand: "McInally's Plumbing & Heating",
  legalName: "McInally's Plumbing and Heating LTD",
  // Companies House number (NOT the Gas Safe number)
  companyNumber: "SC894828",
  owner: "Ryan",
  phoneDisplay: "07449 984820",
  phoneHref: "tel:+447449984820",
  whatsappPhotoHref:
    "https://wa.me/447449984820?text=" +
    encodeURIComponent("Hi, I've booked the boiler service. Here's a photo of my boiler:"),
  whatsappHref:
    "https://wa.me/447449984820?text=" +
    encodeURIComponent("Hi, I'd like to book the boiler service."),
  email: "ryan@mcinallys.co.uk",
  googleReviewsUrl: "https://g.page/r/CdaGFUfY18-TEBM/review",
  checkatradeUrl:
    "https://www.checkatrade.com/trades/mcinallyplumbingandheating",
  googleRating: "5.0",
  googleReviewCount: 86,
  coverage: "Edinburgh and up to 15 miles around",
} as const;

export const offer = {
  price: 80,
  wasPrice: 100, // Confirmed as the genuine normal price
  endsISO: "2026-10-31T23:59:59+00:00",
  endsLabel: "31 October",
  // Confirmed: Ryan can call back within 2 hours. Shown on the form and thank-you page.
  callbackWindow: "within 2 hours (8am–6pm, Mon–Fri)",
} as const;

/**
 * Capacity cue shown in the sticky top bar. It MUST be true and kept up to date: UK consumer law treats
 * made-up scarcity as an unfair practice. Set to null to hide it. (Later we can drive this from Airtable bookings.)
 */
export const capacity = {
  slotsLeft: 12 as number | null,
  period: "this month",
};

export const flags = {
  // Gas Safe registration confirmed by the business owner.
  showGasSafe: true,
  gasSafeNumber: "980504",
} as const;

/** Verbatim Google reviews (owner-approved). Order = priority; the page shows the first 6. */
export const reviews: Review[] = [
  {
    name: "Heather Gunn",
    tag: "Boiler service",
    text: "Once again McInally's came to our aid, this time for a long over due boiler service. Max and Robbie arrived and undertook the work swiftly and competently. They kept us informed of arrival time and were with us as promised. Ryan has a great team, he answers messages and calls and responds quickly. We cannot compliment him and his team highly enough on their work ethic, value and ability to make their customers happy. Thanks again for coming to our rescue.",
  },
  {
    name: "Mike Reese",
    badge: "Local Guide · 235 reviews",
    text: "Excellent service from McInally Plumbing and Heating! They responded quickly, arrived on time, and completed the job to a very high standard. The plumber was friendly, professional, and explained everything clearly. The work was neat, the pricing was fair, and everything was left clean and tidy. I would highly recommend McInally Plumbing and Heating to anyone in Edinburgh looking for a reliable and trustworthy plumber. I'll definitely use them again in the future!",
  },
  {
    name: "Ellie Brown",
    text: "Had a leak in the bathroom, got in touch with Ryan through the contact form on his website. He called me less than 2 hours later, and came and fixed it that day. Came when he said he would, did a great job, and the price was reasonable. Can’t really ask for more! Would recommend.",
  },
  {
    name: "Adam Archer",
    text: "Ryan came round the same day we contacted him and had our leak sorted within 30 minutes. Great service for a great price. Will definitely use again for future plumbing needs.",
  },
  {
    name: "Stacey Laing",
    text: "Couldn’t be happier with my experience! Quick hassle free & really lovely lads who went over and above to help. Was getting my kitchen fitted and needed a plumber to fit new sink asap. Once in my home turned out the lad that came to my job with plumber was gas engineer who was able to do my cooker at the same time. They then organised an electrician for the following day to do my cooker and lights. Ryan is so professional and easy to work with, nothing is a problem, exactly what you want and need when having work done in your home. Blown away with the service thank you again guys.",
    reply: "Thank you Stacey, I hope you’re enjoying the new kitchen",
  },
  {
    name: "Kerry",
    text: "I can highly recommend Ryan and his team of plumbers. We had a long running, complex problem in our flats which it seemed other professionals were unable to get to the bottom of, the problem was identified and resolved in a morning once they were brought on to the job. Professional, skilled, effective and helpful.",
    reply: "Thanks Kerry, really appreciate you taking the time to leave this review. It was great to finally get to the bottom of the ongoing issue and have the problem identified and resolved for you. Thanks for trusting Ryan and the team with the job, and we’re glad we could help!",
  },
  {
    name: "Colin Nesbit",
    text: "I am extremely impressed by Ryan’s Plumbing Services. Prompt, efficient, pleasant, clean & tidy workers, great value and super straightforward to deal with. Ryan was able to help me out with an emergency leak as a new customer at very short notice. I cannot fault his service or company in any way whatsoever and I would highly recommend him to anyone reading this. Superb!",
  },
  {
    name: "X. G.",
    text: "Ryan came today with one of his colleagues and did various plumbing jobs for us (tap and washing machine installation, leak investigation). They arrived promptly and did the job really fast and efficiently. They were polite and professionals. I would highly recommend! Very reasonable prices too.",
  },
  {
    name: "Ross Moncur",
    text: "Completed a bathroom install and kitchen tap and sink with complete professionalism and quality of work. Lovely guy willing to do whatever you need..also, came on a minute's notice and stayed late to complete the job. I would highly recommend him for your household plumbing needs.",
  },
  {
    name: "Hans Baird",
    text: "Ryan has been exceptional. He arrived very promptly and was able to quickly identify the problem and fix it. When the insurer sent over a lost adjuster, they even commented on the quality of his work. …",
  },
];

/** Drop a real photo into /public and set the path, e.g. "/ryan.jpg". */
/**
 * Trust badges. Drop the OFFICIAL logo files into /public/logos using the `key` as the file name
 * (gas-safe, google, checkatrade, trustatrader, yell; .svg, .png, .webp or .jpg). The site detects them
 * automatically and swaps the text label for the logo, so there is nothing to edit here.
 */
export const trustBadges: {
  key: string;
  name: string;
  caption?: string;
  url?: string;
  show?: boolean;
  /** Logo height in the trust bar / in the "Also find us on" row (Tailwind classes), tuned per logo shape. */
  logoClass?: string;
  rowClass?: string;
}[] = [
  { key: "gas-safe", name: "Gas Safe", caption: `Reg. ${flags.gasSafeNumber}`, url: "https://www.gassaferegister.co.uk/", show: flags.showGasSafe, logoClass: "h-12" },
  { key: "google", name: "Google", caption: `${site.googleRating} ★ · ${site.googleReviewCount} Google reviews`, url: site.googleReviewsUrl, logoClass: "h-9" },
  { key: "checkatrade", name: "Checkatrade", caption: "Approved tradesperson", url: site.checkatradeUrl, logoClass: "h-6 sm:h-7", rowClass: "h-5" },
  { key: "trustatrader", name: "TrustATrader", logoClass: "h-12", rowClass: "h-9" },
  { key: "yell", name: "Yell", logoClass: "h-8", rowClass: "h-6" },
];

/** CONFIRM with Ryan: areas he's happy to name. */
export const areas = [
  "Leith", "Morningside", "Portobello", "Corstorphine", "Stockbridge", "Marchmont",
  "Newington", "Gorgie", "Murrayfield", "Colinton", "Musselburgh", "Dalkeith",
];

/** CONFIRM with Ryan: only promises he will honour. Shown near the checklist. */
export const promises = [
  "Fixed price, parts or repairs quoted separately",
  "No obligation on any repair quote",
  "No payment taken online or upfront",
  "12-month workmanship guarantee",
];

export const engineerPhoto: string | null = null;

/** CONFIRM with Ryan: these are the typical points of a gas boiler service. */
export const checklist: { title: string; detail: string }[] = [
  { title: "Visual inspection", detail: "Boiler casing, pipework and flue checked for damage, leaks or corrosion." },
  { title: "Gas pressure & burner", detail: "Gas supply pressure and burner flame checked and cleaned." },
  { title: "Flue gas analysis", detail: "Combustion readings taken to confirm the boiler is burning safely." },
  { title: "Flue & ventilation", detail: "Flue terminal and room ventilation checked as clear and secure." },
  { title: "Heat exchanger", detail: "Inspected for blockages and build-up that cut efficiency." },
  { title: "Seals & gaskets", detail: "Checked for wear, so there are no leaks or fumes escaping." },
  { title: "Safety devices", detail: "Overheat and flame-failure safety devices tested." },
  { title: "System pressure", detail: "Pressure gauge and expansion vessel checked." },
  { title: "Condensate pipe", detail: "Trap and pipe checked and cleared so the boiler can't lock out in the cold." },
  { title: "Ignition & fan", detail: "Ignition electrodes, fan and pump checked for correct operation." },
  { title: "Controls & thermostat", detail: "Programmer, thermostat and radiator valves checked as responding." },
  { title: "Report & advice", detail: "A written service record, plus an honest quote if anything needs fixing." },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What happens if you find a problem?",
    a: "We explain exactly what we found and give you a fair, no-pressure quote. You decide whether to go ahead. There's no obligation and no hard sell.",
  },
  {
    q: "Which boilers does the service cover?",
    a: "Gas boilers: combi, system and regular. Not sure what you have? Tell us the make and age when we call and we'll confirm.",
  },
  {
    q: "Where do you cover?",
    a: `${site.coverage}. Pop your postcode in the form and we'll confirm.`,
  },
  {
    q: "How long does it take?",
    a: "Usually around an hour. Please make sure the boiler is accessible and someone aged 18+ is home.",
  },
  {
    q: "How soon can you come?",
    a: `We'll call you ${offer.callbackWindow} to agree a day and time that suits you. Autumn slots fill quickly, so the sooner you ask the better.`,
  },
  {
    q: "Is the work guaranteed?",
    a: "Yes. All McInally's work comes with a 12-month workmanship guarantee, and we're fully insured.",
  },
];
