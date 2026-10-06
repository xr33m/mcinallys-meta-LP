"use client";

import { useState } from "react";
import { checklist } from "@/lib/config";

const PREVIEW = 4;

/** All 12 checks on desktop; on mobile the first 4 with a "See all" toggle, to keep the page short. */
export function ChecklistItems() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ol className="divide-y-2 divide-line border-y-2 border-navy">
        {checklist.map((c, i) => (
          <li key={c.title} className={`gap-4 py-3.5 ${i >= PREVIEW && !open ? "hidden md:flex" : "flex"}`}>
            <span className="w-10 shrink-0 font-display text-4xl font-extrabold leading-none text-teal">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-display text-xl font-bold uppercase leading-tight tracking-wide">{c.title}</p>
              <p className="mt-0.5 text-sm text-navy/70">{c.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="btn mt-4 w-full bg-white shadow-hard hover:bg-brand/30 md:hidden"
      >
        {open ? "Show fewer checks" : `See all ${checklist.length} checks`}
      </button>
    </div>
  );
}
