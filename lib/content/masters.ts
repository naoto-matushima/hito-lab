import fs from "node:fs";
import path from "node:path";
import type { z } from "zod";
import {
  AreaMasterFileSchema,
  CompanySchema,
  CtaSchema,
  IndustryMasterFileSchema,
  JobMasterFileSchema,
  PersonSchema,
  SourceSchema,
  TagMasterFileSchema,
  ThemeMasterFileSchema,
} from "@/lib/validation";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function parseWithContext<T>(schema: z.ZodType<T>, data: unknown, filePath: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`${filePath} のvalidationに失敗しました: ${result.error.message}`);
  }
  return result.data;
}

function readTaxonomyFile<T>(fileName: string, schema: z.ZodType<T>): T {
  const filePath = path.join(DATA_DIR, "taxonomies", fileName);
  return parseWithContext(schema, readJson(filePath), filePath);
}

function readEntityDir<T>(dirName: string, schema: z.ZodType<T>): T[] {
  const dir = path.join(DATA_DIR, dirName);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(dir, file);
      return parseWithContext(schema, readJson(filePath), filePath);
    });
}

export function loadThemes() {
  return readTaxonomyFile("themes.json", ThemeMasterFileSchema);
}
export function loadIndustries() {
  return readTaxonomyFile("industries.json", IndustryMasterFileSchema);
}
export function loadJobs() {
  return readTaxonomyFile("jobs.json", JobMasterFileSchema);
}
export function loadAreas() {
  return readTaxonomyFile("areas.json", AreaMasterFileSchema);
}
export function loadTags() {
  return readTaxonomyFile("tags.json", TagMasterFileSchema);
}
export function loadPeople() {
  return readEntityDir("people", PersonSchema);
}
export function loadCompanies() {
  return readEntityDir("companies", CompanySchema);
}
export function loadSources() {
  return readEntityDir("sources", SourceSchema);
}
export function loadCtas() {
  return readEntityDir("ctas", CtaSchema);
}

export function loadMasters() {
  return {
    themes: loadThemes(),
    industries: loadIndustries(),
    jobs: loadJobs(),
    areas: loadAreas(),
    tags: loadTags(),
    people: loadPeople(),
    companies: loadCompanies(),
    sources: loadSources(),
    ctas: loadCtas(),
  };
}
export type Masters = ReturnType<typeof loadMasters>;
