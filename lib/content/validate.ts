import type { Masters } from "./masters";
import type { IndustryHubContent, ThemeHubContent } from "@/lib/validation";

export interface ValidationIssue {
  file: string;
  message: string;
}

type SlugContent = { frontmatter: { slug: string }; filePath: string };

/** docs/03-content-model.md §6: slugは記事間で一意 */
export function findDuplicateSlugs(articles: SlugContent[]): ValidationIssue[] {
  const seenBySlug = new Map<string, string>();
  const issues: ValidationIssue[] = [];
  for (const article of articles) {
    const { slug } = article.frontmatter;
    const existing = seenBySlug.get(slug);
    if (existing) {
      issues.push({
        file: article.filePath,
        message: `slug "${slug}" が ${existing} と重複しています`,
      });
    } else {
      seenBySlug.set(slug, article.filePath);
    }
  }
  return issues;
}

function checkIdsExist(ids: string[], validIds: Set<string>, fieldName: string, file: string): ValidationIssue[] {
  return ids
    .filter((id) => !validIds.has(id))
    .map((id) => ({ file, message: `${fieldName} "${id}" はMasterに存在しません` }));
}

/** Article/Report/Interview共通のtaxonomy参照フィールド */
type TaxonomyReferencingContent = {
  frontmatter: {
    industries: string[];
    jobs: string[];
    areas: string[];
    tags: string[];
    authors: string[];
    editors: string[];
    reviewers: string[];
    sources: string[];
    cta: string[];
  };
  filePath: string;
};

/**
 * docs/03-content-model.md §63: taxonomy validation。存在しないIDをビルド時に検出する。
 * Article/Report/Interviewはいずれも共通のtaxonomy参照フィールドを持つため、この関数で共用する。
 */
export function validateTaxonomyReferences<T extends TaxonomyReferencingContent>(
  contents: T[],
  masters: Masters,
): ValidationIssue[] {
  const industryIds = new Set(masters.industries.map((entry) => entry.id));
  const jobIds = new Set(masters.jobs.map((entry) => entry.id));
  const areaIds = new Set(masters.areas.map((entry) => entry.id));
  const tagIds = new Set(masters.tags.map((entry) => entry.id));
  const personIds = new Set(masters.people.map((entry) => entry.id));
  const sourceIds = new Set(masters.sources.map((entry) => entry.id));
  const ctaIds = new Set(masters.ctas.map((entry) => entry.id));

  return contents.flatMap((content) => {
    const fm = content.frontmatter;
    const file = content.filePath;
    return [
      ...checkIdsExist(fm.industries, industryIds, "industries", file),
      ...checkIdsExist(fm.jobs, jobIds, "jobs", file),
      ...checkIdsExist(fm.areas, areaIds, "areas", file),
      ...checkIdsExist(fm.tags, tagIds, "tags", file),
      ...checkIdsExist(fm.authors, personIds, "authors", file),
      ...checkIdsExist(fm.editors, personIds, "editors", file),
      ...checkIdsExist(fm.reviewers, personIds, "reviewers", file),
      ...checkIdsExist(fm.sources, sourceIds, "sources", file),
      ...checkIdsExist(fm.cta, ctaIds, "cta", file),
    ];
  });
}

type InterviewLikeContent = {
  frontmatter: { interview: { interviewees: string[]; companies: string[] } };
  filePath: string;
};

/** docs/03-content-model.md §43-45: Interview固有のPerson/Company参照を検証する */
export function validateInterviewReferences<T extends InterviewLikeContent>(
  interviews: T[],
  masters: Pick<Masters, "people" | "companies">,
): ValidationIssue[] {
  const personIds = new Set(masters.people.map((entry) => entry.id));
  const companyIds = new Set(masters.companies.map((entry) => entry.id));

  return interviews.flatMap((interview) => {
    const file = interview.filePath;
    return [
      ...checkIdsExist(interview.frontmatter.interview.interviewees, personIds, "interview.interviewees", file),
      ...checkIdsExist(interview.frontmatter.interview.companies, companyIds, "interview.companies", file),
    ];
  });
}

/** Hub Content（Theme Hub/Industry Hub）のsources参照がSource Masterに存在するか検証する */
export function validateHubSources(
  hubs: (ThemeHubContent | IndustryHubContent)[],
  masters: Pick<Masters, "sources">,
  fileFor: (hub: ThemeHubContent | IndustryHubContent) => string,
): ValidationIssue[] {
  const sourceIds = new Set(masters.sources.map((entry) => entry.id));
  return hubs.flatMap((hub) => checkIdsExist(hub.sources, sourceIds, "sources", fileFor(hub)));
}
