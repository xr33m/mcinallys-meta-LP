declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a Meta Pixel event if the Pixel is installed (a no-op until then).
 * The Pixel and its consent gate are added in the tracking phase.
 */
export function track(event: string, params?: Record<string, unknown>) {
  try {
    window.fbq?.("track", event, params);
    window.dataLayer?.push({ event, ...params });
  } catch {
    /* tracking must never break the page */
  }
}
