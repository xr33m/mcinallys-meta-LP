"use client";

import { useSyncExternalStore } from "react";
import { offer } from "@/lib/config";

const noopSubscribe = () => () => {};
// Days are computed on the client only (null on the server) to avoid hydration mismatches.
const daysLeftNow = () =>
  Math.max(0, Math.ceil((new Date(offer.endsISO).getTime() - Date.now()) / 86_400_000));

export function AnnouncementBar() {
  const daysLeft = useSyncExternalStore(noopSubscribe, daysLeftNow, () => null);

  if (daysLeft === 0) return null;

  return (
    <div className="bg-brand px-4 py-2 text-center text-sm font-semibold text-navy">
      🍂 Edinburgh Autumn Offer: £{offer.price} Boiler Service (normally £
      {offer.wasPrice}) · Ends {offer.endsLabel}
      {daysLeft !== null && daysLeft <= 14 && (
        <span className="ml-1 hidden sm:inline">
          ({daysLeft} {daysLeft === 1 ? "day" : "days"} left)
        </span>
      )}
    </div>
  );
}
