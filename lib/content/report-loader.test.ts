import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllReports, getPublishedReports } from "./report-loader";

const FIXTURES_DIR = path.join(process.cwd(), "test", "fixtures");

describe("getAllReports", () => {
  it("Report MDXを読み込める", () => {
    const reports = getAllReports(path.join(FIXTURES_DIR, "report-valid"));
    expect(reports).toHaveLength(1);
    expect(reports[0].frontmatter.slug).toBe("test-report");
  });

  it("実際のcontent/reportsは現時点で空でもエラーにならない", () => {
    expect(() => getAllReports()).not.toThrow();
    expect(getAllReports()).toEqual([]);
  });
});

describe("getPublishedReports", () => {
  it("publishedのReportのみ返す", () => {
    const published = getPublishedReports(path.join(FIXTURES_DIR, "report-valid"));
    expect(published).toHaveLength(1);
  });
});
