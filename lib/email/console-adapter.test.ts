import { describe, expect, it, vi } from "vitest";
import { consoleEmailAdapter } from "./console-adapter";

describe("consoleEmailAdapter", () => {
  it("メールアドレスをマスクしてログ出力し、実送信はしない（個人情報の全文をログへ出力しない）", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await consoleEmailAdapter.send({ to: "taro@example.com", subject: "テスト", text: "本文" });

    expect(logSpy).toHaveBeenCalledTimes(1);
    const loggedText = logSpy.mock.calls[0].join(" ");
    expect(loggedText).not.toContain("taro@example.com");
    expect(loggedText).toContain("t***o@example.com");

    logSpy.mockRestore();
  });
});
