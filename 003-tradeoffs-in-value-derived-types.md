---
title: Tradeoffs in value-derived types in TypeScript
soure: <https://gist.github.com/jamiebuilds/ba682c98b282c217fc1c13c1c61cfd90>
---

# Tradeoffs in value-derived types in TypeScript

Many of the more "advanced" typescript features can be used for creating
"value-derived" types.

At its simplest form:

```ts
let vehicle = { name: "Van", wheels: 4 }

type Vehicle = typeof vehicle
// type Vehicle = { name: string, wheels: number }
```

[[Playground Link]](https://www.typescriptlang.org/play?#code/DYUwLgBAbiAWCWBjUEC8EDeEB2BDAtiAFwQBEAartqQDQQDusIIwAziQCwQC+AUL2ACeABxARycJCnRDRAewBm0SchC8A9OoiyxEhKrSYcBYhFZgATvGwBzOo2ZsS2AK74ARiAs8gA)

And in a more complex form, as seen in [this tweet](https://twitter.com/wesbos/status/1376943663922741255):

```tsx
let vehicles = [
  { name: "Van", wheels: 4 },
  { name: "Car", wheels: 4 },
  { name: "Motorcycle", wheels: 2 },
] as const

type Vehicle = { 
  [Prop in keyof typeof vehicles[number]]: typeof vehicles[number][Prop]
}
// type Vehicle = {
//   readonly name: "Van" | "Car" | "Motorcycle"
//   readonly wheels: 2 | 4
// }
```

[[Playground Link]](https://www.typescriptlang.org/play?#code/DYUwLgBAbiAWCWBjUBnCBeCBtAUBCA3hAHYCGAtiAFwQBEAaqcbQDQQDusIIwKNALBAC+LPIRIVqdAMKkATqw5cefCIJFiiZSjVoBZAPZgDcxAE9kIRZ268aAJmGiAuhFJpEB4ijA4cYMwAHEAh6OCRQDHExLAAFOQNAiHhiCABrEDMDADMIAOCc6HDLFCxiAFdyACMQOWdnGnyQQpgEErLKmrq4hMDnHCEcAHohvKCQsLbIzAJh0fw5EFIAEy9gMwkdOkZmCAAfGXlafbpDY1MLUFoAbjn8CEWVtY2bFQcT-juhIA)

This can be used to great effect in maintaining types and values at the same
time. It can also be used within libraries to allow the user to provide their
own types via the data they pass in, making the library's types far more
convenient.

However, it does come with some tradeoffs that you can evaluate case-by-case to
know if you should be deriving your types from values or declaring the types
manually. None of these are _unique_ to value-derived types, but they have a
tendency to come up more often.

## Accidental Widening

Types derived from values can easily widen as you change the data, and create
types you weren't planning on:

```tsx
let MotorcycleName = "Motorcycle"

let vehicles = [
  ...
  { name: MotorcycleName, wheels: 2 },
] as const

type Vehicle = {...}
// type Vehicle = {
//   readonly name: string
//   ...
// }
```

[[Playground Link]](https://www.typescriptlang.org/play?ssl=15&ssc=5&pln=1&pc=1#code/DYUwLgBAsg9mMCcDGBPJoByBDAtiCAvBAESzzJqjEBQ1okAbiABYCW6IAzoRANrUQIAbwgA7XCABcJAGpZRxADQQA7sxAhgnaQBYIAX0UDhYidOIBhLAiWr1m7RD2HjI8XmllEqDtjzK1DS1pACYDIwBdCCxuJBhRTjBaMBQAB3wZFnZQHhFjXgAFBBhUiFZRCABrEBQYADMIFPT6iCY2Dk5eUQBXHAAjEAQIiOkmkBa27K4u3oGhwuLUiOp9agB6Nca0jKyOXPXNwQQQLAATeOAUUw8IRIRygHMDwQhjs4urwIdQiAAfJ2e+iAA)

Here someone wanted to be able to reference the name `"Motorcycle"` via a shared
variable, but because they didn't use `as const` typescript "widened" the type
of `Vehicle["name"]` to `string`.

## Accidental Narrowing

What if someday we want to add a boat to our data:

```tsx
let vehicles = [
  ...
  { name: "Boat" },
] as const
```

Boats don't have wheels silly! Why _wouldn't_ we just omit that data?

You might think your type now looks like this:

```tsx
type Vehicle = {
  readonly name: "Van" | "Car" | "Motorcycle" | "Boat";
  readonly wheels: 2 | 4 | void
}
```

But actually, it's this:

```tsx
type Vehicle = {
  readonly name: "Van" | "Car" | "Motorcycle" | "Boat";
}
```

[[Playground Link]](https://www.typescriptlang.org/play?#code/DYUwLgBAbiAWCWBjUBnCBeCBtAUBCA3hAHYCGAtiAFwQBEAaqcbQDQQDusIIwKNALBAC+LPIRIVqdAMKkATqw5cefCIJFiiZSjVoBZAPZgDcxAE9kIRZ268aAJmGj8WyboBCB0mFrCcAXQhSNEQDYhQwHBwwMwAHEAh6OCRQDHExLAAFOQNYiHhiCABrEDMDADMIGPiK6GTLFCxiAFdyACMQOX9-GmqQWpgEBqbWjq6snNj-HCEcAHo5qriEpKHUzAJ5xfw5EFIAEzDgMwkdOkZmCAAfGXlfG-0jE3NLe7pPb1ot4SA)

By derived our types from values, we're opening ourselves up fully to
TypeScript's inference, which can sometimes produce surprising results.

Being declarative about your data structures can lead to more predictable
results:

```tsx
interface Vehicle {
  name: string
  wheels: number
}

let vehicles: Vehicle[] = [
  ...
  { name: "Boat" }, // ERROR! Missing property `wheels`
]
```

## Presuming Exhaustiveness

If you take a look at the generated type `Vehicle` each of its properties seem
to be enumerating every possible "Vehicle", but really they are just
representing the current dataset.

```tsx
type Vehicle = {
  readonly name: "Van" | "Car" | "Motorcycle"
  readonly wheels: 2 | 4
}
```

Just seeing a type like this might lead you to assume the type is more
exhaustive than it really is:

```tsx
if (vehicle.name === "Car") {
  console.log("Look out, a car!")
} else if (vehicle.name === "Van") {
  console.log("Look out, a van!")
} else {
  console.log("Look out, a motorcycle!")
}
```

Here we're making the mistake of assuming that if we don't have a car or a van,
we _must_ have a motorcycle. But that may change later on.

The problem with assuming is if our current dataset isn't exhaustive. Maybe later on
we add a bus:

```tsx
let vehicles = [
  ...
  { name: "Bus", wheels: 4 },
] as const
```

Suddenly our code's logic is silently working incorrectly:

```tsx
if (vehicle.name === "Car") {
  console.log("Look out, a car!")
} else if (vehicle.name === "Van") {
  console.log("Look out, a van!")
} else {
  console.log("Look out, a motorcycle!") // Oh no! But it might be a boat!
}
```

## Conclusion

Deriving types from values is an extremely powerful feature of TypeScript which
has helped it deal with the complexities of typing a highly dynamic language.

But you can likely go without it while using TypeScript to great effect for a
very long time. It should be applied selectively with the tradeoffs in mind.

In conclusion, please don't use any of this as a hard and fast rule to blanket
ban value-derived types in your codebase. Use this to be more considerate in the
types you are writing and how they will affect your codebase over time.

> Edit: Also see this thread on why value-derived types are sometimes your best option: https://twitter.com/SeaRyanC/status/1376990128317468672
