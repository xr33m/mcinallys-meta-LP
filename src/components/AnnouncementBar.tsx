"use client";

import { useSyncExternalStore } from "react";
import { capacity, offer } from "@/lib/config";

// Re-render every 30s; the server snapshot is null so SSR and hydration match (no countdown until mounted).
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const snapshot = () => Math.floor(Date.now() / 30_000);

function remaining() {
  const ms = new Date(offer.endsISO).getTime() - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
}

/** Sticky top bar. The countdown runs to the REAL offer deadline; it never resets. */
export function AnnouncementBar({ live, price }: { live: boolean; price: number }) {
  const tick = useSyncExternalStore(subscribe, snapshot, () => null);
  if (!live) return null;

  const countdown = tick === null ? null : remaining();
  if (tick !== null && countdown === null) return null;
  const slots = capacity.slotsLeft && capacity.slotsLeft > 0 ? capacity.slotsLeft : null;

  return (
    <div className="sticky top-0 z-50 border-b-2 border-navy bg-brand text-navy">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 px-3 py-1.5 font-display text-[0.95rem] font-bold uppercase leading-tight tracking-wide sm:text-lg">
        <span>
          £{price}
          <span className="sm:hidden"> offer</span>
          <span className="hidden sm:inline"> till {offer.endsLabel}</span>
        </span>
        {slots && (
          <>
            <span aria-hidden>·</span>
            <span>
              Only {slots} slots left<span className="hidden sm:inline"> {capacity.period}</span>
            </span>
          </>
        )}
        {countdown && (
          <>
            <span aria-hidden>·</span>
            <span className="bg-navy px-2 text-brand tabular-nums">
              <span className="hidden sm:inline">Ends in </span>
              {countdown}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
