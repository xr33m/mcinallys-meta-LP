/**
 * Single source of truth for everything the business may want to edit.
 * Items marked CONFIRM are placeholders that need a real answer before launch.
 */

export type Review = {
  name: string;
  area: string;
  text: string;
};

export const site = {
  brand: "McInally's Plumbing & Heating",
  owner: "Ryan",
  phoneDisplay: "07449 984820",
  phoneHref: "tel:+447449984820",
  whatsappHref:
    "https://wa.me/447449984820?text=" +
    encodeURIComponent("Hi, I'd like to book the £80 Autumn Boiler Service."),
  email: "ryan@mcinallys.co.uk",
  googleReviewsUrl: "https://g.page/r/CdaGFUfY18-TEBM/review",
  checkatradeUrl:
    "https://www.checkatrade.com/trades/mcinallyplumbingandheating",
  googleRating: "5.0",
  googleReviewCount: 76,
  coverage: "Edinburgh and up to 15 miles around",
} as const;

export const offer = {
  price: 80,
  wasPrice: 100, // CONFIRM: must be a genuine recent standard price (CMA/ASA rules)
  endsISO: "2026-10-31T23:59:59+00:00",
  endsLabel: "31 October",
  // CONFIRM: a real promise Ryan can keep. Shown on the form and thank-you page.
  callbackWindow: "within 2 hours (8am–6pm, Mon–Sat)",
} as const;

export const flags = {
  // CONFIRM: only switch on once the Gas Safe registration number is verified.
  // The site's own hero does not currently mention Gas Safe.
  showGasSafe: false,
  gasSafeNumber: "",
} as const;

/** Paste real Google reviews here (verbatim, with permission). Empty = fallback card. */
export const reviews: Review[] = [];

/** Drop a real photo into /public and set the path, e.g. "/ryan.jpg". */
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
    q: "Which boilers does the £80 service cover?",
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
