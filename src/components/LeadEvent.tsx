"use client";

import { useEffect } from "react";

/**
 * Fires the Meta `Lead` event once on the thank-you page. If the Pixel isn't loaded yet it waits for it
 * (the Pixel only loads after consent), and does nothing at all if the visitor rejected cookies.
 * The event carries the same `eventID` the form sent to /api/lead, so Meta can deduplicate this browser event
 * against the server-side Conversions API event.
 */
export function LeadEvent() {
  useEffect(() => {
    const fire = () => {
      let eventID: string | null = null;
      try {
        if (window.sessionStorage.getItem("lead_fired")) return;
        window.sessionStorage.setItem("lead_fired", "1");
        eventID = window.sessionStorage.getItem("lead_event_id");
      } catch {
        /* still fire once per page view */
      }
      try {
        window.fbq?.("track", "Lead", {}, eventID ? { eventID } : undefined);
      } catch {
        /* tracking must never break the page */
      }
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
