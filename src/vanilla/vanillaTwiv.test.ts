import { test, expect, describe } from "vitest";
import { vanillaTwiv } from "./vanillaTwiv.ts";

type TVariant = "primary" | "secondary";
type TSize = "small" | "large";
type TColor = "white" | "black";

function setupTwiv({
  variant,
  size,
  color,
}: {
  variant?: TVariant;
  size?: TSize;
  color?: TColor;
}) {
  const twiv = vanillaTwiv([variant, size, color]);

  // TODO: dont use any mmmkay??
  return (state: any, override?: any) => twiv(state, override);
}

describe("vanillaTwiv", () => {
  test("Applies classes", () => {
    const twiv = setupTwiv({
      variant: "primary",
      size: "small",
    });

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
    const twiv = setupTwiv({
      variant: "primary",
    });

    expect(
      twiv({
        BASE: "text-white",
        primary: "text-primary",
      }),
    ).toEqual("text-primary");
  });

  test("Override overwrites base and variants", () => {
    const twiv = setupTwiv({
      variant: "primary",
      size: "small",
    });

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

  test("'ALL:' opcode applies if all states match", () => {
    const twiv = setupTwiv({
      variant: "primary",
      size: "small",
    });

    expect(
      twiv({
        BASE: "text-white",
        primary: "text-primary",
        small: "text-small",
        "ALL: primary small": "text-all",
      }),
    ).toEqual("text-all");
  });

  test("'ALL:' opcode does not apply if only one state matches", () => {
    const twiv = setupTwiv({
      variant: "primary",
      size: "small",
    });

    expect(
      twiv({
        BASE: "text-white",
        primary: "text-primary",
        small: "text-small",
        large: "text-large",
        "ALL: primary large": "text-all",
      }),
    ).toEqual("text-small");
  });

  test("'ANY:' opcode does apply if one state matches", () => {
    const twiv = setupTwiv({
      variant: "primary",
      size: "small",
    });

    expect(
      twiv({
        BASE: "text-white",
        primary: "text-primary",
        small: "text-small",
        "ANY: primary black": "text-any",
      }),
    ).toEqual("text-any");
  });

  test("'ANY:' opcode does apply if two states match", () => {
    const twiv = setupTwiv({
      variant: "primary",
      size: "small",
    });

    expect(
      twiv({
        BASE: "text-white",
        primary: "text-primary",
        small: "text-small",
        "ANY: primary small black": "text-any",
      }),
    ).toEqual("text-any");
  });

  test("'ANY:' opcode does not apply if no state matches", () => {
    const twiv = setupTwiv({
      variant: "primary",
      size: "small",
      color: "white",
    });

    expect(
      twiv({
        BASE: "text-white",
        primary: "text-primary",
        small: "text-small",
        "ANY: secondary black": "text-any",
      }),
    ).toEqual("text-small");
  });
});
