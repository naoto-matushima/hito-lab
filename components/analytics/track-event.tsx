"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/gtag";

/**
 * docs/07-conversion-lead.md §54: Thank Youページ表示＝送信成功が確定した時点で1回だけ発火する。
 * Server Actionのredirect()で到達するためclient再送信の心配がない。
 */
export function TrackEvent({ name, params }: { name: string; params?: Record<string, string | number | undefined> }) {
  useEffect(() => {
    trackEvent(name, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return null;
}
