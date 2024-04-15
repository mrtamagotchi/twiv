import {
  TwivArgs,
  TwivVariantNameArray,
  TwivVariantsObject,
  rawTwiv,
} from "../core/rawTwiv.ts";

export function vanillaTwiv<T extends TwivVariantNameArray>(variantNames: T) {
  return (
    variantStyleObject: TwivVariantsObject<T>,
    override?: TwivArgs<T>["override"],
  ) => rawTwiv(variantNames, variantStyleObject, override);
}
