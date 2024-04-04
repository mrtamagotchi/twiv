<div align="center">
    <br />
    <a href="https://github.com/mrtamagotchi/twiv">
        <img src="./assets/logo-small.jpg" alt="twiv" height="400px" />
    </a>
</div>

# Twiv

Tailwind inline variants. A styling util (with type inference) that keeps your styles close to the markup. Like CVA without steriods.

```tsx
// React example with as many concepts crammed in as possible
import { useTwiv } from "twiv";

interface PillProps {
  label: string;
  variant?: "success" | "failure";
  size: "small" | "large";
  className?: string;
}

function Pill({ label, variant, size = "small", className }: PillProps) {
  // useTwiw wraps and returns rawTwiv that checks the
  // state variables, reconciles any conflicts with twMerge
  // and returns the correct classes.
  const twiv = useTwiv([variant, size]);

  return (
    // twiv() is used in the className prop and will only allow
    // states that match the values from the passed variables
    <div
      className={twiv(
        {
          // Classes in BASE will always be applied...
          BASE: `
            text-white
            rounded
            border border-white
            bg-blue
          `,
          // ...unless overwritten in a state
          success: "bg-green",
          failure: "bg-red",
          banana: "bg-yellow", // This will throw a TS error since "banana" is not a defined state value
          small: "px-0.5 py-1",
          large: "px-1 py-2"
          // (if two active states have conflicting classes, the class in the last state will be picked)
        },
        // twiv() also accepts an override as the second parameter
        className
      )}
    >
      {label}
    </div>
  );
}
```

## What is Twiv?

Twiv is a small util function that makes it easier to manage Tailwind classes based on typed component props.

## Why Twiv?

> **TL;DR:**
> Use this lib if you want some of the power of `CVA`, while still keeping styling simple and close to the markup.

Tailwind has many long-term benefits, but two of its nicest day-to-day features is the colocation of styles and markup, and that you don't need to name your elements. However, this simple model breaks as soon as we want to work with variants.

The most common ways to solve this is by using [`clsx`](https://github.com/lukeed/clsx), [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) or [`class-variance-authority`](https://cva.style/docs). These come with their own set of drawbacks:

- `class-variance-authority` is a really powerful alternative, but its recommended usage forces you to define your styles outside of the markup, and come up with names for each element. Sometimes `CVA`'s power can also lead us to add more complexity to a component than necessary. It's a great library for those really complex cases though.
- `clsx` and `tailwind-merge` can do inline variants really well, but checking against many state values can get messy, and sometimes we find ourselves writing more checks than class names. They're great libraries for the simpler cases though.

Twiv aims to be somewhere inbetween complex and simple, as that's where the complexity of most components should be.

## Will Twiv work with my framework of choice?

Yes! Currently, there is a vanilla implementation and a React hook, but Twiv exposes a function called `rawTwiv` that can be used to write bindings for any other framework. Please submit a PR if you give it a go!
