import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  error?: string;
};

export function Checkbox({ label, error, id, className = "", ...props }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-start gap-2 text-sm text-text-secondary">
        <input id={id} type="checkbox" className={`mt-0.5 h-4 w-4 accent-primary ${className}`} {...props} />
        <span>{label}</span>
      </label>
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
