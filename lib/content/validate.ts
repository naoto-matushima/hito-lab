import type { ArticleContent } from "./loader";
import type { Masters } from "./masters";

export interface ValidationIssue {
  file: string;
  message: string;
}

/** docs/03-content-model.md §6: slugは記事間で一意 */
export function findDuplicateSlugs(articles: ArticleContent[]): ValidationIssue[] {
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

/** docs/03-content-model.md §63: taxonomy validation。存在しないIDをビルド時に検出する */
export function validateTaxonomyReferences(articles: ArticleContent[], masters: Masters): ValidationIssue[] {
  const industryIds = new Set(masters.industries.map((entry) => entry.id));
  const jobIds = new Set(masters.jobs.map((entry) => entry.id));
  const areaIds = new Set(masters.areas.map((entry) => entry.id));
  const tagIds = new Set(masters.tags.map((entry) => entry.id));
  const personIds = new Set(masters.people.map((entry) => entry.id));
  const sourceIds = new Set(masters.sources.map((entry) => entry.id));
  const ctaIds = new Set(masters.ctas.map((entry) => entry.id));

  return articles.flatMap((article) => {
    const fm = article.frontmatter;
    const file = article.filePath;
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
