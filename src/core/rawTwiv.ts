import { twMerge } from "tailwind-merge";

type TailwindClass = string | undefined;

export type TwivVariantName = string | "BASE";
export type TwivVariantsObject<T extends (TwivVariantName | undefined)[]> = {
  [K in Exclude<T[number], undefined>]?: TailwindClass;
} & { BASE?: TailwindClass };

export interface TwivArgs<T extends (TwivVariantName | undefined)[]> {
  variantNames: T[number][];
  variantStyleObject: TwivVariantsObject<T>;
  override?: TailwindClass;
}

export function rawTwiv<T extends (TwivVariantName | undefined)[]>(
  variantNames: T,
  variantStyleObject: TwivVariantsObject<T>,
  override?: TwivArgs<T>["override"],
): TailwindClass {
  const validVariantNames = variantNames.filter((variant) => Boolean(variant));

  const variantStyles = validVariantNames.map(
    (variant) => variantStyleObject[variant as keyof TwivVariantsObject<T>],
  );

  return twMerge([variantStyleObject.BASE, ...variantStyles, override]);
}
