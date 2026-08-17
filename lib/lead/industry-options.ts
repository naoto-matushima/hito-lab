import { loadIndustries } from "@/lib/content";

/**
 * docs/07-conversion-lead.md §8: フォームの業界選択肢はIndustry Masterから生成する。
 * cross-industryはコンテンツ分類専用の値のため、企業が自社の業界として選ぶ選択肢からは除外する。
 */
export function getFormIndustryOptions(): { id: string; label: string }[] {
  return loadIndustries()
    .filter((industry) => industry.id !== "cross-industry")
    .map((industry) => ({ id: industry.id, label: industry.label }));
}
