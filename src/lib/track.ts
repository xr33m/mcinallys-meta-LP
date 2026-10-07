declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a Meta Pixel event if the Pixel is loaded (a no-op otherwise: no Pixel ID set, or the visitor rejected cookies).
 * The Pixel and its consent gate live in components/MetaPixel.tsx.
 */
export function track(event: string, params?: Record<string, unknown>) {
  try {
    window.fbq?.("track", event, params);
    window.dataLayer?.push({ event, ...params });
  } catch {
    /* tracking must never break the page */
  }
}
