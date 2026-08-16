import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/** docs/06-brand-ui.md §30-32 */
export type ButtonVariant = "primary" | "secondary";

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-md px-5 py-3 font-medium text-base transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-transparent text-primary border border-primary hover:bg-primary-pale",
};

type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className"
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if (props.href) {
    const { href, ...anchorProps } = props as LinkButtonProps;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
