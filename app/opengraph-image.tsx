import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/site";

/**
 * docs/08-technical-architecture.md §66: Phase 1では固定Eyecatchでもよい。
 * docs/06-brand-ui.md: ストックフォト依存を避け、データ・タイポグラフィで表現する方針に合わせ、
 * コード生成の固定OGP画像を1種用意する（ページ種別ごとの動的生成は将来対応）。
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGLINE = "人が減っても、強くなる会社へ。";

async function loadNotoSansJP(text: string) {
  const params = new URLSearchParams({ family: "Noto Sans JP:wght@700", text });
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${params.toString()}`)).text();
  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) {
    throw new Error("Google FontsのCSSからフォントURLを取得できませんでした");
  }
  const fontResponse = await fetch(match[1]);
  return fontResponse.arrayBuffer();
}

export default async function OpengraphImage() {
  const fontData = await loadNotoSansJP(`${SITE_NAME}${TAGLINE}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf9f6",
        }}
      >
        <div style={{ display: "flex", width: 8, height: 120, backgroundColor: "#547c73", marginBottom: 40 }} />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#292d2b" }}>{SITE_NAME}</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, fontWeight: 700, color: "#547c73" }}>
          {TAGLINE}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Noto Sans JP", data: fontData, weight: 700 }] },
  );
}
