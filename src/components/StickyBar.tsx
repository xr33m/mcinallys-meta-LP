"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { Phone, WhatsApp } from "./icons";

/** Mobile-only CTA: appears once the hero CTA scrolls away, hides while the form is in view. */
export function StickyBar({ price }: { price: number }) {
  const [heroGone, setHeroGone] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const form = document.getElementById("book");
    if (!hero || !form) return;
    // Only treat the hero as "gone" once it has scrolled off the TOP.
    const h = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const f = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 });
    h.observe(hero);
    f.observe(form);
    return () => {
      h.disconnect();
      f.disconnect();
    };
  }, []);

  const show = heroGone && !formVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t-2 border-navy bg-white px-3 pt-2 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <div className="flex gap-2">
        <a
          href="#book"
          tabIndex={show ? 0 : -1}
          className="flex min-h-12 flex-1 items-center justify-center border-2 border-navy bg-brand font-display text-xl font-extrabold uppercase tracking-wide text-navy"
        >
          Book £{price} service
        </a>
        <a
          href={site.whatsappHref}
          tabIndex={show ? 0 : -1}
          aria-label="WhatsApp us"
          className="flex min-h-12 w-12 items-center justify-center border-2 border-navy bg-white text-navy"
        >
          <WhatsApp />
        </a>
        <a
          href={site.phoneHref}
          tabIndex={show ? 0 : -1}
          aria-label="Call us"
          className="flex min-h-12 w-12 items-center justify-center border-2 border-navy bg-navy text-white"
        >
          <Phone />
        </a>
      </div>
    </div>
  );
}
