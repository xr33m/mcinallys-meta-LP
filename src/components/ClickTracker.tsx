"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Counts taps on call / WhatsApp links as Meta "Contact" events (once the Pixel is installed). */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("Contact", { method: "call" });
      else if (href.includes("wa.me")) track("Contact", { method: "whatsapp" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
