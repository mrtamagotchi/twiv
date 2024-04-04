import { useCallback } from "react";
import {
  TwivArgs,
  TwivVariantName,
  TwivVariantsObject,
  rawTwiv,
} from "../core/rawTwiv.ts";

export function useTwiv<T extends (TwivVariantName | undefined)[]>(
  variantNames: T,
) {
  return useCallback(
    (
      variantStyleObject: TwivVariantsObject<T>,
      override?: TwivArgs<T>["override"],
    ) => rawTwiv(variantNames, variantStyleObject, override),
    [variantNames],
  );
}
