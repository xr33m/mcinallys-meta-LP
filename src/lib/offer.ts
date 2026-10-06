import { offer } from "./config";

/** Server-side: is the autumn offer still running? (Pages are re-rendered periodically, see `revalidate`.) */
export const offerIsLive = () => Date.now() < new Date(offer.endsISO).getTime();

/** The price to display right now. After the offer ends we fall back to the standard price. */
export const currentPrice = (live: boolean) => (live ? offer.price : offer.wasPrice);
