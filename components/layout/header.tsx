import Link from "next/link";
import { loadThemes } from "@/lib/content";
import { Container } from "@/components/ui";

/** docs/05-page-template.md §69, docs/06-brand-ui.md §58-61 */
const NAV_LINKS = [
  { label: "業界から探す", href: "/industries/construction/" },
  { label: "レポート", href: "/reports/" },
  { label: "インタビュー", href: "/interviews/" },
  { label: "人手不足研究所について", href: "/about/" },
];

export function Header() {
  const themes = loadThemes();

  return (
    <header className="relative border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" className="font-brand text-lg font-bold text-text">
          人手不足研究所
        </Link>

        <nav aria-label="グローバルナビゲーション" className="hidden items-center gap-6 md:flex">
          <ThemeDropdown themes={themes} />
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="font-medium text-text hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* モバイルメニュー: JSを使わずnative <details> でトグルを実現する */}
        <details className="md:hidden">
          <summary className="cursor-pointer list-none font-medium text-text" aria-label="メニューを開く">
            メニュー
          </summary>
          <nav
            aria-label="グローバルナビゲーション（モバイル）"
            className="absolute inset-x-0 top-full z-10 flex flex-col gap-1 border-b border-border bg-background px-5 py-4"
          >
            <ThemeDropdown themes={themes} />
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="py-2 font-medium text-text hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}

function ThemeDropdown({ themes }: { themes: ReturnType<typeof loadThemes> }) {
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none font-medium text-text hover:text-primary">テーマから探す</summary>
      <div className="absolute left-0 top-full z-10 mt-2 flex min-w-48 flex-col gap-1 rounded-md border border-border bg-surface p-2 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
        {themes.map((theme) => (
          <Link key={theme.id} href={theme.url} className="rounded-sm px-3 py-2 text-sm text-text hover:bg-primary-pale">
            {theme.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
