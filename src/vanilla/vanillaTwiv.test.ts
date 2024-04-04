import { test, expect, describe } from "vitest";
import { vanillaTwiv } from "./vanillaTwiv.ts";

type TVariant = "primary" | "secondary";
type TSize = "small" | "large";

const variant: TVariant = "primary";
const size: TSize = "small";
const twiv = vanillaTwiv([variant, size]);

describe("vanillaTwiv", () => {
  test("Applies classes", () => {
    expect(
      twiv(
        {
          BASE: "twiv-base",
          primary: "twiv-primary",
          small: "twiv-small",
        },
        "twiv-override",
      ),
    ).toEqual("twiv-base twiv-primary twiv-small twiv-override");
  });

  test("Variants overwrite base", () => {
    expect(
      twiv({
        BASE: "text-white",
        primary: "text-primary",
      }),
    ).toEqual("text-primary");
  });

  test("Override overwrites base and variants", () => {
    expect(
      twiv(
        {
          BASE: "text-white",
          primary: "text-primary",
        },
        "text-override",
      ),
    ).toEqual("text-override");
  });
});
