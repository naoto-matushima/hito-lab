"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui";

/** docs/09-implementation-claude-code.md §48: 二重送信防止。pending中はボタンを無効化する */
export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="primary" disabled={pending} aria-busy={pending}>
      {pending ? "送信中…" : children}
    </Button>
  );
}
