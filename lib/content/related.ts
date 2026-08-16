import type { ArticleContent } from "./loader";

/** docs/03-content-model.md §52: 同一primaryTheme/industry/job/area/tagの一致度でスコアリングする */
function scoreArticle(target: ArticleContent, candidate: ArticleContent): number {
  const t = target.frontmatter;
  const c = candidate.frontmatter;
  let score = 0;
  if (c.primaryTheme === t.primaryTheme) score += 3;
  score += c.industries.filter((industry) => t.industries.includes(industry)).length;
  score += c.jobs.filter((job) => t.jobs.includes(job)).length;
  score += c.areas.filter((area) => t.areas.includes(area)).length;
  score += c.tags.filter((tag) => t.tags.includes(tag)).length;
  return score;
}

/**
 * docs/03-content-model.md §51: 手動指定(relatedContent)を優先表示し、
 * 不足分を分類一致度からのスコアリングで自動補完する。
 * 自分自身とpublished以外のコンテンツは対象外にする。
 */
export function findRelatedArticles(target: ArticleContent, candidates: ArticleContent[], limit = 3): ArticleContent[] {
  const manualIds = new Set(target.frontmatter.relatedContent);
  const pool = candidates.filter(
    (candidate) => candidate.frontmatter.id !== target.frontmatter.id && candidate.frontmatter.status === "published",
  );

  const manual = pool.filter((candidate) => manualIds.has(candidate.frontmatter.id));
  const scored = pool
    .filter((candidate) => !manualIds.has(candidate.frontmatter.id))
    .map((candidate) => ({ candidate, score: scoreArticle(target, candidate) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.candidate);

  return [...manual, ...scored].slice(0, limit);
}
