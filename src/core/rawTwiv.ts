import { twMerge } from "tailwind-merge";

type TailwindClass = string | undefined;

const TWIV_OPCODES = ["ALL:", "ANY:"] as const;
type TwivOpcode = (typeof TWIV_OPCODES)[number];

export type TwivVariantName = string | "BASE";
type ValidVariantName<T extends (TwivVariantName | undefined)[]> = Exclude<
  T[number],
  undefined
>;
type TwivStateTree<T extends (TwivVariantName | undefined)[]> = {
  [K in ValidVariantName<T>]: boolean;
};

// FIXME: only allow valid variant names at some point
//        (tried to make it work forever, but no matter how i
//        cut it, the type becomes too complex for TS to handle)
//        ValidVariantName ensures that at least one valid variant
//        is present, while TwivVariantName allows for an infinite
//        amount of variants.
//        solutions i tried that failed:
//            - creating a recursive type
//            - using a counter to limit the amounts of iterations
//            - explicitly typing out X amount of keywords in a string
//        the common issue with all of these solutions is either issues
//        with circular types, or that too many variant props with too
//        many variant names quickly get to over 100_000 variations,
//        making TS completely collapse.
type TwivOpcodeKey<T extends (TwivVariantName | undefined)[]> =
  `${TwivOpcode} ${ValidVariantName<T>} ${TwivVariantName}`;

export type TwivVariantsObject<T extends (TwivVariantName | undefined)[]> = {
  [K in ValidVariantName<T> | TwivOpcodeKey<T>]?: TailwindClass;
} & { BASE?: TailwindClass };

export interface TwivArgs<T extends (TwivVariantName | undefined)[]> {
  activeVariants: T;
  variantStyleObject: TwivVariantsObject<T>;
  override?: TailwindClass;
}

function hasOpcode(string: String) {
  return TWIV_OPCODES.some((code) => string.startsWith(code));
}

function evaluateOpcodeString<T extends TwivVariantName[]>(
  inputString: String,
  baseStateTree: TwivStateTree<T>,
): boolean {
  const [opcode, ...states] = inputString.split(" ");

  switch (opcode as TwivOpcode) {
    case "ALL:": {
      return states.every(
        // TODO: maybe not type assert the state here
        (state) => baseStateTree[state as keyof TwivStateTree<T>] === true,
      );
    }

    case "ANY:": {
      return states.some(
        // TODO: maybe not type assert the state here
        (state) => baseStateTree[state as keyof TwivStateTree<T>] === true,
      );
    }

    default: {
      return false;
    }
  }
}

export function rawTwiv<T extends (TwivVariantName | undefined)[]>(
  activeVariants: TwivArgs<T>["activeVariants"],
  variantStyleObject: TwivArgs<T>["variantStyleObject"],
  override?: TwivArgs<T>["override"],
): TailwindClass {
  const opcodeVariantStyleNames = Object.keys(variantStyleObject).filter(
    (name) => hasOpcode(name),
  );

  const baseStateTree = activeVariants.reduce((acc, name) => {
    if (typeof name !== "undefined") {
      return { ...acc, [name]: true };
    } else {
      return acc;
    }
    // TODO: maybe not type assert the state here
  }, {} as TwivStateTree<T>);

  const compoundStateTree = opcodeVariantStyleNames.reduce(
    (acc, name) => ({
      ...acc,
      [name]: evaluateOpcodeString(name, baseStateTree),
    }),
    // TODO: maybe not type assert the state here
    {} as TwivStateTree<T>,
  );

  const stateTree = {
    ...baseStateTree,
    ...compoundStateTree,
  };

  const variantStyles = Object.keys(stateTree).map((variantName) => {
    // TODO: maybe not type assert the state here
    if (stateTree[variantName as keyof TwivStateTree<T>]) {
      return variantStyleObject[
        // TODO: maybe not type assert the state here
        variantName as keyof TwivVariantsObject<T>
      ] as TailwindClass;
    } else {
      return undefined;
    }
  });

  return twMerge([variantStyleObject.BASE, ...variantStyles, override]);
}
