import type { ReportDownload } from "@/lib/validation";

/**
 * ページ描画から切り離してテスト可能にする。
 * Server Component（Reportページ）からも呼び出すため、"use client"を持つdownload-cta.tsxとは
 * 別ファイルに分離する（Client Componentのexportをサーバー側で直接呼ぶことはできないため）。
 */
export function shouldShowDownloadCta(download?: ReportDownload): boolean {
  return Boolean(download?.enabled && download.assetId);
}
