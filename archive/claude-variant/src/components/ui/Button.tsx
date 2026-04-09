"use client";

import clsx from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  href,
  className,
  children,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase rounded-none transition-all duration-200";

  const variants = {
    primary:
      "bg-[var(--color-button-bg)] text-[var(--color-button-text)] hover:opacity-85",
    secondary:
      "bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] border border-[var(--color-button-secondary-border)] hover:opacity-75",
  };

  const cls = clsx(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
