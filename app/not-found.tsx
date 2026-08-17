import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { loadThemes } from "@/lib/content";

/** docs/09-implementation-claude-code.md §50・§53: 404 */
export default function NotFound() {
  const themes = loadThemes();

  return (
    <Container size="narrow" className="py-24 text-center">
      <h1>ページが見つかりませんでした</h1>
      <p className="mt-4 text-text-secondary">
        お探しのページは移動または削除された可能性があります。URLをご確認いただくか、以下からお探しください。
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          TOPへ戻る
        </Button>
      </div>
      <div className="mt-10">
        <p className="text-sm font-medium text-text-muted">テーマから探す</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {themes.map((theme) => (
            <Link key={theme.id} href={theme.url} className="text-primary hover:underline">
              {theme.label}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
