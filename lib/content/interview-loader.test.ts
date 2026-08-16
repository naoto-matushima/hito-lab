import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllInterviews, getPublishedInterviews } from "./interview-loader";

const FIXTURES_DIR = path.join(process.cwd(), "test", "fixtures");

describe("getAllInterviews", () => {
  it("Interview MDXを読み込める", () => {
    const interviews = getAllInterviews(path.join(FIXTURES_DIR, "interview-valid"));
    expect(interviews).toHaveLength(1);
    expect(interviews[0].frontmatter.slug).toBe("test-interview");
  });

  it("実際のcontent/interviewsを読み込める（Phase 5テストフィクスチャ含む）", () => {
    expect(() => getAllInterviews()).not.toThrow();
  });
});

describe("getPublishedInterviews", () => {
  it("publishedのInterviewのみ返す", () => {
    const published = getPublishedInterviews(path.join(FIXTURES_DIR, "interview-valid"));
    expect(published).toHaveLength(1);
  });

  it("実際のcontent/interviewsではdraftのテストフィクスチャが除外される", () => {
    const published = getPublishedInterviews();
    expect(published.every((interview) => interview.frontmatter.status === "published")).toBe(true);
  });
});
