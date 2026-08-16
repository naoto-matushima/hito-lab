import Link from "next/link";
import { loadThemes } from "@/lib/content";
import { Card } from "@/components/ui";

/** docs/05-page-template.md §10: テーマから探す（Theme Masterを利用） */
export function ThemeExplorer({ id }: { id?: string } = {}) {
  const themes = loadThemes();

  return (
    <section id={id} className="my-16">
      <h2>テーマから探す</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme) => (
          <Link key={theme.id} href={theme.url}>
            <Card className="h-full transition-colors hover:border-primary">
              <p className="font-bold text-text">{theme.label}</p>
              {theme.description && <p className="mt-2 text-sm text-text-secondary">{theme.description}</p>}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
