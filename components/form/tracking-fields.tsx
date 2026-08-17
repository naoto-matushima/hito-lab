"use client";

import { useEffect, useState } from "react";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/**
 * docs/07-conversion-lead.md §47: utm_* / landingPageを保存する。
 * 簡易実装：フォームが表示された時点のURLから取得する（複数ページをまたぐアトリビューションは対象外）。
 */
export function TrackingFields() {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // window.location はSSR側では存在しないため、hydrationミスマッチを避けて
    // マウント後にのみ読み取る（このeffectはReact stateではなくブラウザURLという
    // 外部システムから値を取り込む処理のため、setState-in-effectの例外として許容する）。
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, string> = { landingPage: window.location.pathname };
    for (const key of UTM_PARAMS) {
      const value = params.get(key);
      if (value) next[key] = value;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(next);
  }, []);

  return (
    <>
      {Object.entries(values).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
    </>
  );
}
