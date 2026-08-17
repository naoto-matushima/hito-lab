import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/** docs/08-technical-architecture.md §74: 高さ44-48px以上、Border Gray、Focus Sage、Error Semantic Error */
const FIELD_BASE_CLASSES =
  "w-full rounded-md border bg-surface px-3 text-base text-text focus-visible:outline-2 focus-visible:outline-primary";

function fieldBorderClass(hasError?: boolean) {
  return hasError ? "border-error" : "border-border focus:border-primary";
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean };

export function Input({ hasError, className = "", ...props }: InputProps) {
  return <input className={`h-12 ${FIELD_BASE_CLASSES} ${fieldBorderClass(hasError)} ${className}`} {...props} />;
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean };

export function Select({ hasError, className = "", children, ...props }: SelectProps) {
  return (
    <select className={`h-12 ${FIELD_BASE_CLASSES} ${fieldBorderClass(hasError)} ${className}`} {...props}>
      {children}
    </select>
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean };

export function Textarea({ hasError, className = "", ...props }: TextareaProps) {
  return (
    <textarea className={`py-2 ${FIELD_BASE_CLASSES} ${fieldBorderClass(hasError)} ${className}`} {...props} />
  );
}
