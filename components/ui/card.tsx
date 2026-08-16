import type { HTMLAttributes, ReactNode } from "react";

/** docs/06-brand-ui.md §28-29・§34: Shadowより Border を優先し、カードを浮かせない */
export type CardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`rounded-lg border border-border bg-surface p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
