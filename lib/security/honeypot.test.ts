import { describe, expect, it } from "vitest";
import { isHoneypotTriggered } from "./honeypot";

describe("isHoneypotTriggered", () => {
  it("空文字・null・undefinedはtriggerしない", () => {
    expect(isHoneypotTriggered("")).toBe(false);
    expect(isHoneypotTriggered(null)).toBe(false);
    expect(isHoneypotTriggered(undefined)).toBe(false);
  });

  it("空白のみもtriggerしない", () => {
    expect(isHoneypotTriggered("   ")).toBe(false);
  });

  it("値が入っているとtriggerする（bot対策）", () => {
    expect(isHoneypotTriggered("03-1234-5678")).toBe(true);
  });
});
