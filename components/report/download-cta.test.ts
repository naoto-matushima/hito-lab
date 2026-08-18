import { describe, expect, it } from "vitest";
import { shouldShowDownloadCta } from "./download-cta-visibility";

describe("shouldShowDownloadCta", () => {
  it("downloadが未設定の場合はfalse（09 AC: PDF未連携でもページ成立）", () => {
    expect(shouldShowDownloadCta(undefined)).toBe(false);
  });

  it("enabled:falseの場合はfalse", () => {
    expect(shouldShowDownloadCta({ enabled: false })).toBe(false);
  });

  it("enabled:trueでもassetId未指定ならfalse", () => {
    expect(shouldShowDownloadCta({ enabled: true })).toBe(false);
  });

  it("enabled:trueかつassetIdありならtrue", () => {
    expect(shouldShowDownloadCta({ enabled: true, assetId: "asset_report_001" })).toBe(true);
  });
});
