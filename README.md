---
title: Design Specification
version: v0.1.1
summary:  Design Specification for UI/UX practices
license: Apache-2.0 / CC-2.5 SA
---

# Conventions

- Naming Conventions
- Naming Components
- Reference to System UI

## Naming Convention

We recommend using camel case, pascal case or snake case for your theme tokens. Other word separators may not work as expected.

```js
// recommended
tokenName
token_name
token-name

// avoid
token.name
token$name
token*name
```

## Naming Components

  - **Extensions**: Use `.jsx` extension for React components. eslint: [`react/jsx-filename-extension`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
  - **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.jsx`.
  - **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

```jsx
    // bad
    import reservationCard from './ReservationCard';

    // good
    import ReservationCard from './ReservationCard';

    // bad
    const ReservationItem = <ReservationCard />;

    // good
    const reservationItem = <ReservationCard />;
 ```

- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:

```jsx
    // bad
    import Footer from './Footer/Footer';

    // bad
    import Footer from './Footer/index';

    // good
    import Footer from './Footer';
```


## Class vs `React.createClass` vs stateless

  - If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass`. eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

```jsx
    // bad
    const Listing = React.createClass({
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    });

    // good
    class Listing extends React.Component {
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    }
```

> And if you don’t have state or refs, prefer normal functions (not arrow functions) over classes:

```jsx
    // bad
    class Listing extends React.Component {
      render() {
        return <div>{this.props.hello}</div>;
      }
    }

    // bad (relying on function name inference is discouraged)
    const Listing = ({ hello }) => (
      <div>{hello}</div>
    );

    // good
    function Listing({ hello }) {
      return <div>{hello}</div>;
    }
```

## TypeScript

These guidelines are adapted from the TypeScript core's contributor coding guidelines.

* [Names](#names)
* [Exports](#exports)
* [Components](#components)
* [Types](#types)
* [`null` and `undefined`](#null-and-undefined)
* [General Assumptions](#general-assumptions)
* [Flags](#flags)
* [Comments](#comments)
* [Strings](#strings)
* [When to use `any`](#when-to-use-any)
* [Diagnostic Messages](#diagnostic-messages)
* [General Constructs](#general-constructs)
* [Style](#style)


## Names

1.  Use PascalCase for type names.
2.  Do not use "I" as a prefix for interface names.
3.  Use PascalCase for enum values.
4.  Use camelCase for function names.
5.  Use camelCase for property names and local variables.
6.  Do not use "\_" as a prefix for private properties.
7.  Use whole words in names when possible.
8.  Use `isXXXing` or `hasXXXXed` for variables representing states of things (e.g. `isLoading`, `hasCompletedOnboarding`).
9.  Give folders/files/components/functions unique names.

## Exports

1.  Only use named exports. The only exceptions are a tool requires default exports (e.g `React.lazy()`, Gatsby and Next.js `pages`, `typography.js`)

## Components

1.  1 file per logical component (e.g. parser, scanner, emitter, checker).
2.  If not kept in a separate folder, files with ".generated.\*" suffix are auto-generated, do not hand-edit them.
3.  Tests should be kept in the same directory with ".test.\*" suffix
4.  Filename should match the component name. Interfaces for React components should be called `<ComponentName>Props` and `<ComponentName>State`. The only exception is when writing a render prop. In this situation, you, the author, should call the interface for your component's props `<ComponentName>Config` and then the render prop interface `<ComponentName>Props` so it is easy for everyone else to use.

## Types

1.  Do not export types/functions unless you need to share it across multiple components.
2.  Do not introduce new types/values to the global namespace.
3.  Shared types should be defined in 'types.ts'.
4.  Within a file, type definitions should come first (after the imports).

## `null` and `undefined`

1.  Use **undefined**. Do not use `null`. EVER. If null is used (like in legacy Redux code), it should be kept isolated from other code with selectors.

## General Assumptions

1.  Consider objects like Nodes, Symbols, etc. as immutable outside the component that created them. Do not change them.
2.  Consider arrays as immutable by default after creation.

## Flags

1.  More than 2 related Boolean properties on a type should be turned into a flag.

## Comments

1.  Use JSDoc style comments for functions, interfaces, enums, and classes.
2.  **Document crazy stuff.** Always add `@see <url>` and the current date when referencing external resources, blog posts, tweets, snippets, gists, issues etc.
3.  Make note conditions upon which hacks and smelly code can be removed.

## Strings

1.  Use single quotes for strings. Double quotes around JSX string props.
2.  All strings visible to the user need to be localized (make an entry in diagnosticMessages.json).

## When to use `any`

1.  If something takes you longer than 10 minutes to type or you feel the need to read through TS Advanced Types docs, you should take a step back and ask for help, or use `any`.
2.  Custom typings of 3rd-party modules should be added to a `.d.ts` file in a `typings` directory. Document the date and version of the module you are typing at the top of the file.
3.  Consider rewriting tiny modules in typescript if types are too hard to think through.

## Diagnostic Messages

1.  Use a period at the end of a sentence.
2.  Use indefinite articles for indefinite entities.
3.  Definite entities should be named (this is for a variable name, type name, etc..).
4.  When stating a rule, the subject should be in the singular (e.g. "An external module cannot..." instead of "External modules cannot...").
5.  Use present tense.
6.  Use active voice.

## General Constructs

For a variety of reasons, we avoid certain constructs, and use some of our own. Among them:

1.  Do not use `for..in` statements; instead, use `ts.forEach`, `ts.forEachKey` and `ts.forEachValue`. Be aware of their slightly different semantics.
2.  Try to use `ts.forEach`, `ts.map`, and `ts.filter` instead of loops when it is not strongly inconvenient.

## Style

0.  Use prettier and tslint/eslint.
1.  Use arrow functions over anonymous function expressions.
1.  Only surround arrow function parameters when necessary. <br />For example, `(x) => x + x` is wrong but the following are correct:
    1.  `x => x + x`
    2.  `(x,y) => x + y`
    3.  `<T>(x: T, y: T) => x === y`
1.  Always surround loop and conditional bodies with curly braces. Statements on the same line are allowed to omit braces.
1.  Open curly braces always go on the same line as whatever necessitates them.
1.  Parenthesized constructs should have no surrounding whitespace. <br />A single space follows commas, colons, and semicolons in those constructs. For example:
    1.  `for (var i = 0, n = str.length; i < 10; i++) { }`
    2.  `if (x < 10) { }`
    3.  `function f(x: number, y: string): void { }`
1.  Use a single declaration per variable statement <br />(i.e. use `var x = 1; var y = 2;` over `var x = 1, y = 2;`).
1.  Use 2 spaces per indentation.


## Reference Specification

### System UI

> [System UI Theme Specification](https://system-ui.com]


The theme object is intended to be a general purpose format for storing design system style values, scales, and/or design tokens.
The object itself is not coupled to any particular library's implementation and can be used
in places where sharing common style values in multiple parts of a code base is desirable.

#### Scale Objects

Many CSS style properties accept open-ended values like lengths, colors, and font names.
In order to create a consistent styling system, the theme object is centered around the idea of scales,
such as a typographic (font-size) scale, a spacing scale for margin and padding, and a color object.
These scales can be defined in multiple ways depending on needs, but tend to use arrays for ordinal values like font sizes,
or plain objects for named values like colors, with the option of nesting objects for more complex systems.

```js
// example fontSizes scale as an array
fontSizes: [
  12, 14, 16, 20, 24, 32
]
```

```js
// example colors object
colors: {
  blue: '#07c',
  green: '#0fa',
}
```

```js
// example nested colors object
colors: {
  blue: '#07c',
  blues: [
    '#004170',
    '#006fbe',
    '#2d8fd5',
    '#5aa7de',
  ]
}
```

#### Scale Aliases

For typically ordinal values like font sizes that are stored in arrays, it can be helpful to create aliases by adding named properties to the object.

```js
// example fontSizes aliases
fontSizes: [
  12, 14, 16, 20, 24, 32
]
// aliases
fontSizes.body = fontSizes[2]
fontSizes.display = fontSizes[5]
```

#### Excluded Values

Some CSS properties accept only a small, finite number of valid CSS values and should *not* be included as a scale object.
For example, the `text-align` property accepts the following values:
`left`, `right`, `center`, `justify`, `justify-all`, `start`, `end`, or `match-parent`.
Other properties that are intentionally excluded from this specification include: `float`, `clear`, `display`, `overflow`, `position`, `vertical-align`, `align-items`, `justify-content`, and `flex-direction`.

### Keys

The keys in the theme object should typically correspond with the CSS properties they are used for, and follow a plural naming convention.
For example, the CSS property `font-size` is expected to use values from the `fontSizes` scale, and the `color` property uses values from the `colors` scale.

Some keys can be used for multiple CSS properties, where the data type is the same.
The `color` object is intended to be used with any property that accepts a CSS color value, such as `background-color` or `border-color`.


#### Space

The `space` key is a specially-named scale intended for use with margin, padding, and other layout-related CSS properties.
A space scale can be defined as either a plain object or an array, but by convention an array is preferred.
This is an intentional constraint that makes it difficult to add *"one-off"* or *"in-between"* sizes that could lead to unwanted and rippling affects to layout.

> Note: other names under consideration include *spacing*, *spaces*, and *lengths*.

When defining space scales as an array, it is conventional to use the value `0` as the first value so that `space[0] === 0`.

```js
// example space scale
space: [
  0, 4, 8, 16, 32, 64
]
```

```js
// example space scale object
space: {
  small: 4,
  medium: 8,
  large: 16,
}
```

```js
// example space scale with aliases
space: [
  0, 4, 8, 16, 32
]
space.small = space[1]
space.medium = space[2]
space.large = space[3]
```

### Breakpoints

Breakpoints are CSS lengths intended for use in media queries.
Commonly, the breakpoints scale is used to create mobile-first responsive media queries based on array values.

#### Media Queries

For convenience and for use with other styling approaches, a `mediaQueries` scale derived from the `breakpoints` scale can be added to the theme object.

```js
breakpoints: [ '40em', '52em', '64em' ]

mediaQueries: {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`,
}
```

### Key Reference

The following is a list of theme object keys and their corresponding CSS properties.
This list may be non-exhaustive.

Theme Key         | CSS Properties
------------------|--------------
`space`           | `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`, `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, `grid-gap`, `grid-column-gap`, `grid-row-gap`
`fontSizes`       | `font-size`
`colors`          | `color`, `background-color`, `border-color`
`fonts`           | `font-family`
`fontWeights`     | `font-weight`
`lineHeights`     | `line-height`
`letterSpacings`  | `letter-spacing`
`sizes`           | `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`
`borders`         | `border`, `border-top`, `border-right`, `border-bottom`, `border-left`
`borderWidths`    | `border-width`
`borderStyles`    | `border-style`
`radii`           | `border-radius`
`shadows`         | `box-shadow`, `text-shadow`
`zIndices`        | `z-index`
`transitions`     | `transition`

### Prior Art

Prior art includes, but is not limited to the following. Please open an issue or pull request to help ensure this list is inclusive.

- [Theo](https://github.com/salesforce-ux/theo)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Lona](https://github.com/airbnb/Lona)
- [Universal Design Tokens](https://github.com/universal-design-tokens/udt)
- [Styled System](https://styled-system.com)
