export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * docs/08-technical-architecture.md §52-56: CVイベント送信。
 * NEXT_PUBLIC_GA_MEASUREMENT_ID未設定時は何もしない
 * （lib/email/のconsoleEmailAdapterと同じ「未設定でも壊れない」パターン）。
 */
export function trackEvent(eventName: string, params: Record<string, string | number | undefined> = {}): void {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackPageView(path: string): void {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", { page_path: path });
}
