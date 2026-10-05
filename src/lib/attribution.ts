const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

const STORE = "mc_attribution";

/** Capture UTM/click params on first landing and keep them for the session. */
export function captureAttribution(): Record<string, string> {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    if (Object.keys(found).length) {
      sessionStorage.setItem(STORE, JSON.stringify(found));
      return found;
    }
    return JSON.parse(sessionStorage.getItem(STORE) ?? "{}");
  } catch {
    return {};
  }
}
