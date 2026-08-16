import type { HTMLAttributes, ReactNode } from "react";

/** docs/06-brand-ui.md §22: 本文720px程度・ページ全体1200px程度 */
export type ContainerSize = "default" | "narrow";

const WIDTH_CLASSES: Record<ContainerSize, string> = {
  default: "max-w-[1200px]",
  narrow: "max-w-[720px]",
};

export type ContainerProps = {
  children: ReactNode;
  size?: ContainerSize;
} & HTMLAttributes<HTMLDivElement>;

export function Container({ children, size = "default", className = "", ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 md:px-8 ${WIDTH_CLASSES[size]} ${className}`} {...props}>
      {children}
    </div>
  );
}
