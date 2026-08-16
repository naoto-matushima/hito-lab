import Link from "next/link";
import { loadThemes } from "@/lib/content";
import { Container } from "@/components/ui";

/**
 * docs/05-page-template.md §72。
 * 「運営者情報」のリンク先は11-open-issues.md C-8をユーザーに確認し、
 * 独立ページを作らず /about/ 内に含める方針とした。
 */
const SITE_LINKS = [
  { label: "人手不足研究所について", href: "/about/" },
  { label: "業界から探す", href: "/industries/construction/" },
  { label: "レポート", href: "/reports/" },
  { label: "インタビュー", href: "/interviews/" },
  { label: "お問い合わせ", href: "/contact/" },
  { label: "運営者情報", href: "/about/" },
  { label: "Privacy Policy", href: "/privacy/" },
];

export function Footer() {
  const themes = loadThemes();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface-subtle">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:justify-between">
        <div>
          <p className="font-brand text-lg font-bold text-text">人手不足研究所</p>
          <p className="mt-2 max-w-xs text-sm text-text-secondary">
            建設・介護・物流・製造・宿泊など、人手不足の影響を受ける企業に向けた調査・実践メディア。
          </p>
        </div>

        <nav aria-label="テーマ" className="flex flex-col gap-2">
          <p className="text-sm font-medium text-text-muted">テーマ</p>
          {themes.map((theme) => (
            <Link key={theme.id} href={theme.url} className="text-sm text-text-secondary hover:text-primary">
              {theme.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="サイト情報" className="flex flex-col gap-2">
          {SITE_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm text-text-secondary hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>

      <div className="border-t border-border py-4">
        <Container>
          <p className="text-xs text-text-muted">&copy; {year} 人手不足研究所</p>
        </Container>
      </div>
    </footer>
  );
}
