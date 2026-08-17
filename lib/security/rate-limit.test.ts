import { describe, expect, it } from "vitest";
import { isRateLimited, resetRateLimit } from "./rate-limit";

describe("isRateLimited", () => {
  it("上限回数まではfalseを返す", () => {
    const key = "test-key-1";
    resetRateLimit(key);
    const options = { windowMs: 10_000, maxRequests: 3 };
    const now = 1_000_000;

    expect(isRateLimited(key, options, now)).toBe(false);
    expect(isRateLimited(key, options, now + 1)).toBe(false);
    expect(isRateLimited(key, options, now + 2)).toBe(false);
  });

  it("上限を超えるとtrueを返す", () => {
    const key = "test-key-2";
    resetRateLimit(key);
    const options = { windowMs: 10_000, maxRequests: 2 };
    const now = 1_000_000;

    expect(isRateLimited(key, options, now)).toBe(false);
    expect(isRateLimited(key, options, now + 1)).toBe(false);
    expect(isRateLimited(key, options, now + 2)).toBe(true);
  });

  it("windowを過ぎるとリセットされる", () => {
    const key = "test-key-3";
    resetRateLimit(key);
    const options = { windowMs: 10_000, maxRequests: 1 };
    const now = 1_000_000;

    expect(isRateLimited(key, options, now)).toBe(false);
    expect(isRateLimited(key, options, now + options.windowMs + 1)).toBe(false);
  });

  it("キーが異なれば別カウントになる", () => {
    resetRateLimit("key-a");
    resetRateLimit("key-b");
    const options = { windowMs: 10_000, maxRequests: 1 };
    const now = 1_000_000;

    expect(isRateLimited("key-a", options, now)).toBe(false);
    expect(isRateLimited("key-b", options, now)).toBe(false);
  });
});
