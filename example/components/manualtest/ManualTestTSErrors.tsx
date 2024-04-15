// @ts-nocheck remove this when testing until a better solution is created
import React, { ReactNode } from "react";
import { useTwiv } from "../../../src/react/useTwiv";

interface ManualTestTSErrorsProps {
  children: ReactNode;
  variant?: "regular" | "accent" | "shy" | "proud" | "inherited";
  size?: "small" | "medium" | "large";
  color?: "green" | "blue" | "red" | "orange" | "pink";
  className?: string;
}

function ManualTestTSErrors({
  children,
  variant,
  size = "medium",
  color,
  className,
}: ManualTestTSErrorsProps) {
  const twiv = useTwiv([variant, size, color]);

  return (
    <>
      <div className={twiv({ banana: "FAIL" })} />
      <div className={twiv({ "ALL: regular": "FAIL" })} />
      <div className={twiv({ "ALL: banana accent": "FAIL" })} />
      <div
        className={twiv({
          "ALL: accent banana": "should fail, but unfortunately not fail atm",
        })}
      />
      <div className={twiv({ "ALL: small accent": "NOT FAIL" })} />
      <div className={twiv({ "ALL: regular green small": "NOT FAIL" })} />
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
    </>
  );
}
