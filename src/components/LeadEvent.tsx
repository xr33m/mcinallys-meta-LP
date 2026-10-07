"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Fires the Meta `Lead` event once on the thank-you page. If the Pixel isn't loaded yet it waits for it
 * (the Pixel only loads after consent), and does nothing at all if the visitor rejected cookies.
 */
export function LeadEvent() {
  useEffect(() => {
    const fire = () => {
      try {
        if (window.sessionStorage.getItem("lead_fired")) return;
        window.sessionStorage.setItem("lead_fired", "1");
      } catch {
        /* still fire once per page view */
      }
      track("Lead");
    };
    if (window.fbq) {
      fire();
      return;
    }
    window.addEventListener("pixel-ready", fire, { once: true });
    return () => window.removeEventListener("pixel-ready", fire);
  }, []);
  return null;
}
