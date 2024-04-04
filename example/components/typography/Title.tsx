import React, { ReactNode } from "react";
import { useTwiv } from "twiv";

interface TitleProps {
  children: ReactNode;
  variant?: "regular" | "accent" | "shy" | "proud" | "inherited";
  size?: "small" | "medium" | "large" | "x-large";
  className?: string;
}

export function Title({
  children,
  variant = "regular",
  size = "medium",
  className,
}: TitleProps) {
  const twiv = useTwiv([variant, size]);

  return (
    <p
      className={twiv(
        {
          BASE: "font-display font-bold",
          regular: "text-slate-900",
          proud: "text-slate-950",
          shy: "text-slate-700",
          accent: "text-blue-800",
          inherited: "text-current",
          small: "text-xl",
          medium: "text-4xl",
          large: "text-5xl",
          "x-large": "text-6xl",
        },
        className,
      )}
    >
      {children}
    </p>
  );
}
