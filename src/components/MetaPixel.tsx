"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const KEY = "mcinallys_consent";

type Choice = "granted" | "denied";

interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
}

export function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(c: Choice) {
  try {
    window.localStorage.setItem(KEY, c);
  } catch {
    /* private mode: the choice just won't persist */
  }
}

/** Standard Meta Pixel loader. Only ever called after the visitor accepts. */
function loadPixel(id: string) {
  if (window.fbq) return;
  const fbq = function () {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.from(arguments as unknown as ArrayLike<unknown>);
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as unknown as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  (window as unknown as { _fbq?: Fbq })._fbq = fbq;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", id);
  fbq("track", "PageView");
  window.dispatchEvent(new Event("pixel-ready"));
}

/**
 * Cookie consent banner + Meta Pixel. Renders nothing and loads nothing until NEXT_PUBLIC_META_PIXEL_ID is set,
 * and the Pixel never loads until the visitor presses Accept (UK PECR / GDPR).
 */
export function MetaPixel() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!PIXEL_ID) return;
    const c = readChoice();
    if (c === "granted") loadPixel(PIXEL_ID);
    else if (c === null) setShow(true);
  }, []);

  if (!PIXEL_ID || !show) return null;

  const choose = (c: Choice) => {
    saveChoice(c);
    setShow(false);
    if (c === "granted") loadPixel(PIXEL_ID);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-[70] border-t-2 border-navy bg-white p-3 shadow-[0_-4px_0_0_rgba(26,35,50,0.15)] sm:p-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-navy/80">
          We&rsquo;d like to use a cookie from Meta (Facebook) to measure whether our adverts work. It&rsquo;s optional,
          and the page works the same either way.{" "}
          <Link href="/privacy" className="font-bold underline">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="btn flex-1 border-2 border-navy bg-white px-4 py-2 text-sm text-navy sm:flex-none"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="btn flex-1 border-2 border-navy bg-brand px-4 py-2 text-sm text-navy sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/** Lets a visitor change their mind (used on the privacy page). */
export function CookieSettingsButton() {
  if (!PIXEL_ID) return null;
  return (
    <button
      type="button"
      className="font-bold text-teal underline"
      onClick={() => {
        try {
          window.localStorage.removeItem(KEY);
        } catch {
          /* ignore */
        }
        window.location.reload();
      }}
    >
      Change my cookie choice
    </button>
  );
}
