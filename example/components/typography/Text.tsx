import React, { ReactNode } from "react";
import { useTwiv } from "twiv";

interface TextProps {
  children: ReactNode;
  variant?: "regular" | "accent" | "shy" | "proud" | "inherited";
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Text({
  children,
  variant = "regular",
  size = "medium",
  className,
}: TextProps) {
  const twiv = useTwiv([variant, size]);

  return (
    <p
      className={twiv(
        {
          BASE: "font-sans",
          regular: "text-slate-900",
          proud: "text-slate-950",
          shy: "text-slate-700",
          accent: "text-blue-800",
          inherited: "text-current",
          small: "text-sm",
          medium: "text-base",
          large: "text-lg",
        },
        className,
      )}
    >
      {children}
    </p>
  );
}
