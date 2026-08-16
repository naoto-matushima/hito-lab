import { getAllArticles, findDuplicateSlugs, loadMasters, validateTaxonomyReferences } from "@/lib/content";

function main() {
  console.log("人手不足研究所: content/ と data/ の検証を開始します。\n");

  const masters = loadMasters();
  console.log(
    `Masterデータ読み込み完了: theme=${masters.themes.length} industry=${masters.industries.length} job=${masters.jobs.length} area=${masters.areas.length} tag=${masters.tags.length} people=${masters.people.length} company=${masters.companies.length} source=${masters.sources.length} cta=${masters.ctas.length}`,
  );

  const articles = getAllArticles();
  console.log(`Article読み込み完了: ${articles.length}件\n`);

  const issues = [...findDuplicateSlugs(articles), ...validateTaxonomyReferences(articles, masters)];

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
