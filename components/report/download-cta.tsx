"use client";

import { Button } from "@/components/ui";
import { trackEvent } from "@/lib/analytics/gtag";
import type { ReportDownload } from "@/lib/validation";
import { shouldShowDownloadCta } from "./download-cta-visibility";

/**
 * docs/05-page-template.md §45: Download CTA。
 * download.enabledがtrueかつAsset(assetId)が指定されている場合のみ表示する。
 * 11-open-issues.md B-3（PDF配布方式）は未決のためPhase 6で実配布を実装するまで、
 * ここではCTAの有無のみを制御する（実ダウンロード導線はPhase 6）。
 */
export type DownloadCtaProps = {
  download?: ReportDownload;
  variant?: "primary" | "secondary";
  label?: string;
};

export function DownloadCta({ download, variant = "primary", label = "レポートを無料でダウンロード" }: DownloadCtaProps) {
  if (!shouldShowDownloadCta(download)) return null;

  return (
    <div className="my-8 rounded-lg border border-primary bg-primary-pale p-6 text-center">
      <Button href="#download-form" variant={variant} onClick={() => trackEvent("report_cta_click")}>
        {label}
      </Button>
    </div>
  );
}
