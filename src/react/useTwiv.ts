import { useCallback } from "react";
import {
  TwivArgs,
  TwivVariantNameArray,
  TwivVariantsObject,
  rawTwiv,
} from "../core/rawTwiv.ts";

export function useTwiv<T extends TwivVariantNameArray>(variantNames: T) {
  return useCallback(
    (
      variantStyleObject: TwivVariantsObject<T>,
      override?: TwivArgs<T>["override"],
    ) => rawTwiv(variantNames, variantStyleObject, override),
    [variantNames],
  );
}
