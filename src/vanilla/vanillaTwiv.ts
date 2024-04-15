import {
  TwivArgs,
  TwivVariantName,
  TwivVariantsObject,
  rawTwiv,
} from "../core/rawTwiv.ts";

export function vanillaTwiv<T extends (TwivVariantName | undefined)[]>(
  variantNames: T,
) {
  return (
    variantStyleObject: TwivVariantsObject<T>,
    override?: TwivArgs<T>["override"],
  ) => rawTwiv(variantNames, variantStyleObject, override);
}
