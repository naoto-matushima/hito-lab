# 人手不足研究所

建設・介護・物流・製造・宿泊など、人手不足の影響を受ける企業に向けた調査・実践メディア。

## 設計書

`docs/` が設計の唯一の正。実装が設計書と矛盾する場合は設計書を優先する。未確定・不整合な論点は着手前に必ず [11-open-issues.md](docs/11-open-issues.md) を確認すること。

| ファイル | 内容 |
| --- | --- |
| [00-basic-design.md](docs/00-basic-design.md) | 上位設計。ブランド・ターゲット・全体方針 |
| [01-information-architecture.md](docs/01-information-architecture.md) | 分類（テーマ×業界×職種×地域×形式） |
| [02-sitemap-url.md](docs/02-sitemap-url.md) | URL・パンくず・index方針 |
| [03-content-model.md](docs/03-content-model.md) | frontmatter・マスターデータ・validation |
| [04-seo-aio.md](docs/04-seo-aio.md) | SEO/AIO方針・構造化データ |
| [05-page-template.md](docs/05-page-template.md) | 各ページの構成と情報の優先順位 |
| [06-brand-ui.md](docs/06-brand-ui.md) | カラー・タイポグラフィ・コンポーネント |
| [07-conversion-lead.md](docs/07-conversion-lead.md) | CV・フォーム・Lead |
| [08-technical-architecture.md](docs/08-technical-architecture.md) | 技術構成 |
| [09-implementation-claude-code.md](docs/09-implementation-claude-code.md) | 実装順序とフェーズごとの完了条件 |
| [10-launch-interview-plan.md](docs/10-launch-interview-plan.md) | 初期公開と取材開始 |
| [11-open-issues.md](docs/11-open-issues.md) | **未確定・不整合の一覧。着手前に必ず確認する** |
| [12-media-strategy.md](docs/12-media-strategy.md) | 競合・差別化・チャネル・運用体制 |

Claude Code向けの実装ルール・検証コマンドは [CLAUDE.md](CLAUDE.md) を参照。

## セットアップ

現時点ではPhase 0（Repository / 設計書準備）が完了した段階で、Next.jsアプリケーションはまだ存在しない（Phase 1以降で導入）。

```
cp .env.example .env
```

## 実装の進め方

- 実装は `docs/09-implementation-claude-code.md` のPhase 0〜9に沿って段階的に進める
- 各フェーズの着手は `/phase <番号>`
- 大きな変更はプランモードで計画を出してから実装する
