import fs from "node:fs";
import path from "node:path";
import { IndustryHubContentSchema, ThemeHubContentSchema, type ThemeId } from "@/lib/validation";

const HUBS_DIR = path.join(process.cwd(), "data", "hubs");

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/** docs/05-page-template.md §18-26: Theme Hubの固定Editorial Contentを読み込む */
export function loadThemeHubContent(themeId: ThemeId) {
  const filePath = path.join(HUBS_DIR, "themes", `${themeId}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const result = ThemeHubContentSchema.safeParse(readJson(filePath));
  if (!result.success) {
    throw new Error(`${filePath} のvalidationに失敗しました: ${result.error.message}`);
  }
  return result.data;
}

/** docs/05-page-template.md §28-32: Industry Hubの固定Editorial Contentを読み込む */
export function loadIndustryHubContent(industryId: string) {
  const filePath = path.join(HUBS_DIR, "industries", `${industryId}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const result = IndustryHubContentSchema.safeParse(readJson(filePath));
  if (!result.success) {
    throw new Error(`${filePath} のvalidationに失敗しました: ${result.error.message}`);
  }
  return result.data;
}
