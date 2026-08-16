import {
  findDuplicateSlugs,
  getAllArticles,
  getAllInterviews,
  getAllReports,
  loadIndustries,
  loadMasters,
  loadThemeHubContent,
  loadIndustryHubContent,
  validateHubSources,
  validateInterviewReferences,
  validateTaxonomyReferences,
} from "@/lib/content";
import { ThemeIdSchema } from "@/lib/validation";

function main() {
  console.log("人手不足研究所: content/ と data/ の検証を開始します。\n");

  const masters = loadMasters();
  console.log(
    `Masterデータ読み込み完了: theme=${masters.themes.length} industry=${masters.industries.length} job=${masters.jobs.length} area=${masters.areas.length} tag=${masters.tags.length} people=${masters.people.length} company=${masters.companies.length} source=${masters.sources.length} cta=${masters.ctas.length}`,
  );

  const articles = getAllArticles();
  const reports = getAllReports();
  const interviews = getAllInterviews();
  console.log(`Content読み込み完了: article=${articles.length} report=${reports.length} interview=${interviews.length}`);

  const themeHubs = ThemeIdSchema.options
    .map((themeId) => loadThemeHubContent(themeId))
    .filter((hub): hub is NonNullable<typeof hub> => Boolean(hub));
  const industryHubs = loadIndustries()
    .filter((industry) => industry.status === "active" && industry.id !== "cross-industry")
    .map((industry) => loadIndustryHubContent(industry.id))
    .filter((hub): hub is NonNullable<typeof hub> => Boolean(hub));
  console.log(`Hub Content読み込み完了: theme hub=${themeHubs.length} industry hub=${industryHubs.length}\n`);

  const issues = [
    ...findDuplicateSlugs(articles),
    ...findDuplicateSlugs(reports),
    ...findDuplicateSlugs(interviews),
    ...validateTaxonomyReferences(articles, masters),
    ...validateTaxonomyReferences(reports, masters),
    ...validateTaxonomyReferences(interviews, masters),
    ...validateInterviewReferences(interviews, masters),
    ...validateHubSources(themeHubs, masters, (hub) => `data/hubs/themes/${(hub as { themeId: string }).themeId}.json`),
    ...validateHubSources(
      industryHubs,
      masters,
      (hub) => `data/hubs/industries/${(hub as { industryId: string }).industryId}.json`,
    ),
  ];

  if (issues.length > 0) {
    console.error(`validation失敗: ${issues.length}件のエラーがあります\n`);
    for (const issue of issues) {
      console.error(`  - [${issue.file}] ${issue.message}`);
    }
    process.exit(1);
  }

  console.log("validation成功: エラーはありません。");
}

try {
  main();
} catch (error) {
  console.error("validation中に例外が発生しました:\n");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
