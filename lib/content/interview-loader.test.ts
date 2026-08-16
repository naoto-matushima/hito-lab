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

  it("実際のcontent/interviewsは現時点で空でもエラーにならない", () => {
    expect(() => getAllInterviews()).not.toThrow();
    expect(getAllInterviews()).toEqual([]);
  });
});

describe("getPublishedInterviews", () => {
  it("publishedのInterviewのみ返す", () => {
    const published = getPublishedInterviews(path.join(FIXTURES_DIR, "interview-valid"));
    expect(published).toHaveLength(1);
  });
});
