import { describe, expect, it } from "vitest";
import { buildResearchMethodRows } from "./research-method";
import type { Research } from "@/lib/validation";

const EMPTY_RESEARCH: Research = { types: [] };

describe("buildResearchMethodRows", () => {
  it("何も入力されていない場合は空配列を返す", () => {
    expect(buildResearchMethodRows(EMPTY_RESEARCH)).toEqual([]);
  });

  it("入力済みの項目のみ行として返す（09 §37の建設Article相当のデータ）", () => {
    const research: Research = {
      types: ["statistical-analysis"],
      targetPopulation: "建設業従事者",
      methodology: "公的統計の分析",
    };
    const rows = buildResearchMethodRows(research);
    expect(rows.map((row) => row.label)).toEqual(["調査方法", "調査対象", "調査手法の詳細"]);
  });

  it("period指定時はyearより優先する", () => {
    const research: Research = {
      types: [],
      year: 2025,
      period: { start: "2026-05-01", end: "2026-06-30" },
    };
    const rows = buildResearchMethodRows(research);
    expect(rows).toEqual([{ label: "調査期間", value: "2026-05-01 〜 2026-06-30" }]);
  });

  it("periodが無くyearのみの場合は調査年を表示する", () => {
    const research: Research = { types: [], year: 2026 };
    expect(buildResearchMethodRows(research)).toEqual([{ label: "調査年", value: "2026年" }]);
  });
});
