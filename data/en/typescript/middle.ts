import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is a user-defined type guard?",
    code: `function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null && "id" in x;
}`,
    options: [
      "A function with the return type `x is T` that narrows the argument when `true`",
      "A decorator that checks the argument type at runtime on every call",
      "Type assertion syntax equivalent to writing `x as User` in code",
    ],
    answer: 0,
    explanation:
      "After `if (isUser(data))`, `data` has type `User` inside the branch. The developer is responsible for the check being correct: the compiler trusts the predicate. Since TS 5.5, simple predicates are inferred automatically, e.g. for `arr.filter(x => x !== null)`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "How do you guarantee that a `switch` handled every member of a union?",
    code: `function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.size ** 2;
    default: { const _exhaustive: never = s; return _exhaustive; }
  }
}`,
    options: [
      "Assign the value in `default` to a variable of type `never`",
      "Add a `// @ts-exhaustive` comment before the `switch`",
      "Enable the `strictSwitch` flag in `compilerOptions`",
    ],
    answer: 0,
    explanation:
      "If you add a new shape to `Shape` and forget a `case`, a non-empty type remains in `default`, and assigning it to `never` causes a compile error. The `noImplicitReturns` flag and the ESLint rule `switch-exhaustiveness-check` also help.",
    sources: ["ts-narrowing"],
  },
  {
    question: "What does `<T extends { id: string }>` mean in a generic?",
    options: [
      "A constraint: `T` must have at least an `id: string` property",
      "`T` inherits a class with an `id` field, as with `class extends`",
      "`T` can be exactly `{ id: string }` and nothing else",
    ],
    answer: 0,
    explanation:
      "A constraint lets you safely access `item.id` inside the function while keeping the full type `T` in the result. You can pass any object with a suitable `id` and other fields. Classes and inheritance have nothing to do with it.",
    sources: ["ts-generics"],
  },
  {
    question: "How do you type `getProp(obj, key)` so the result depends on the key?",
    options: [
      "`function getProp<T, K extends keyof T>(obj: T, key: K): T[K]`",
      "`function getProp(obj: object, key: string): unknown`",
      "`function getProp<T>(obj: T, key: keyof any): T`",
    ],
    answer: 0,
    explanation:
      "`K extends keyof T` allows only existing keys, and the indexed access `T[K]` gives the exact value type: `getProp(user, 'age')` → `number`. The `any` version loses typing, and `string` lets typos through.",
    sources: ["ts-keyof", "ts-indexed-access", "ts-generics"],
  },
  {
    question: "What is a mapped type?",
    code: `type Flags<T> = { [K in keyof T]: boolean };`,
    options: [
      "A type that creates new properties by iterating over another type's keys",
      "A type for the `Map` object from the JavaScript standard library",
      "A type that maps object values at runtime",
    ],
    answer: 0,
    explanation:
      "`[K in keyof T]` iterates over the keys. You can change the value type, add or remove modifiers (`readonly`, `?`, `-?`) and rename keys with `as`. `Partial`, `Readonly` and `Record` are built on mapped types.",
    sources: ["ts-mapped"],
  },
  {
    question: "What does the conditional type `T extends string ? 'text' : 'other'` do?",
    options: [
      "Picks one of the types depending on whether `T` is assignable to `string`",
      "Checks at runtime whether the value is a string and throws an error",
      "Declares that `T` inherits from the built-in `String` class",
    ],
    answer: 0,
    explanation:
      "Conditional types are a type-level \"ternary\". Together with `infer`, they let you extract parts of types. Applied to a union, they distribute over each member (distributive conditional types).",
    sources: ["ts-conditional"],
  },
  {
    question: "What does `infer` do in `type ElementType<T> = T extends (infer U)[] ? U : never`?",
    options: [
      "Declares a type variable `U` that TS infers from matching the pattern",
      "Asks the compiler for the array element type at runtime",
      "Makes `U` an optional generic parameter defaulting to `unknown`",
    ],
    answer: 0,
    explanation:
      "`infer` is used only in the `extends` part of a conditional type: TS matches `T` against the pattern and \"captures\" the needed part. `ElementType<string[]>` → `string`. That's how `ReturnType`, `Parameters` and `Awaited` work.",
    sources: ["ts-conditional"],
  },
  {
    question: "What does `Awaited<Promise<Promise<number>>>` return?",
    options: ["`number`", "`Promise<number>`", "`Promise<Promise<number>>`"],
    answer: 0,
    explanation:
      "`Awaited` recursively unwraps promises and thenables, mirroring the behavior of `await`. Handy for an async function's result type: `Awaited<ReturnType<typeof fetchUser>>`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "How does `Exclude<T, U>` differ from `Omit<T, K>`?",
    options: [
      "`Exclude` removes members from a union, `Omit` removes properties from an object type",
      "`Exclude` removes properties from an object, `Omit` removes union members",
      "They're synonyms with a different order of type parameters",
    ],
    answer: 0,
    explanation:
      "`Exclude<'a' | 'b' | 'c', 'a'>` → `'b' | 'c'`. `Omit<User, 'password'>` → an object without the field. Paired utilities: `Extract` (keep matching union members) and `Pick` (keep properties). `NonNullable<T>` removes `null` and `undefined`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "How do function overloads work in TypeScript?",
    code: `function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number) { /* ... */ }`,
    options: [
      "Several call signatures and one hidden implementation",
      "Each signature gets its own function implementation, as in Java",
      "The last signature overrides all previous ones, which are ignored",
    ],
    answer: 0,
    explanation:
      "Calling code sees only the overload signatures, and TS picks the first matching one from top to bottom. The implementation must be compatible with all of them. Overloads can often be replaced with a union parameter or a generic with a conditional type.",
    sources: ["ts-functions"],
  },
  {
    question: "What is declaration merging?",
    options: [
      "Combining same-named declarations, e.g. two `interface Window`s, into one",
      "Automatically merging two npm type packages into one on install",
      "Combining a `type` alias and an `interface` with the same name",
    ],
    answer: 0,
    explanation:
      "Interfaces, namespaces and some other declarations with the same name merge. That's how global types are extended: `interface Window { analytics: Analytics }` in `declare global`. `type` aliases don't merge — redeclaring one is an error.",
    sources: ["ts-declaration-merging"],
  },
  {
    question: "What is an abstract class for?",
    options: [
      "A base class with shared code and abstract methods, not instantiable with `new`",
      "A class without methods, used only as a type for checks",
      "A class whose methods and properties are all static",
    ],
    answer: 0,
    explanation:
      "`abstract class Repo { abstract find(id): T; log() {...} }` — subclasses must implement `find` and get `log` ready-made. Unlike an interface, an abstract class exists at runtime and can contain code and state.",
    sources: ["ts-classes"],
  },
  {
    question: "How does `protected` differ from `private` in TypeScript classes?",
    options: [
      "`protected` is accessible in subclasses, `private` only in the class itself",
      "`protected` is readable from outside, while `private` isn't",
      "They're synonyms; `protected` is the old name",
    ],
    answer: 0,
    explanation:
      "`public` (the default) is accessible everywhere, `protected` in the class and its subclasses, `private` only in the declaring class. All three are compiler checks; for real runtime privacy there's `#field`.",
    sources: ["ts-classes"],
  },
  {
    question: "What does the `satisfies` operator do?",
    code: `const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>;`,
    options: [
      "Checks conformance to the type but keeps the more precise inferred type",
      "Casts the value to the given type without checking, like `as`",
      "Widens the value's type to the given one, losing literal details",
    ],
    answer: 0,
    explanation:
      "With the annotation `: Record<...>`, `palette.green` would become `string | number[]`. With `satisfies`, the shape is checked, but `palette.green` stays `string`, so you can call `.toUpperCase()`. Unlike `as`, nothing is asserted without a check.",
    sources: ["ts-4-9"],
  },
  {
    question: "What are template literal types?",
    code: `type Event = 'click' | 'focus';
type Handler = \`on\${Capitalize<Event>}\`;`,
    options: [
      "String types built from a template: here `'onClick' | 'onFocus'`",
      "Templates for generating code at compile time",
      "A string type checked against a regular expression",
    ],
    answer: 0,
    explanation:
      "Template literals work at the type level and distribute over unions. There are built-in transformations: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`. They're used to type event keys, CSS variables and routes.",
    sources: ["ts-template-literal"],
  },
  {
    question: "Why is an `as const` object often used instead of an `enum`?",
    code: `const Status = { Active: 'active', Banned: 'banned' } as const;
type Status = typeof Status[keyof typeof Status];`,
    options: [
      "It's a plain JS object, and the value type is a union of strings",
      "`as const` runs dozens of times faster at runtime than an enum",
      "Enums were removed in TypeScript 5 and no longer compile",
    ],
    answer: 0,
    explanation:
      "The object is standard JS: it can be iterated and is compatible with erasable syntax mode (Node.js type stripping). The type is a string union that also accepts literals from an API. Numeric enums, by contrast, accept any number and create a reverse mapping. Enums weren't removed.",
    sources: ["ts-enums", "ts-5-8"],
  },
  {
    question: "How does `const enum` differ from a regular `enum`?",
    options: [
      "Values are inlined at compile time; there's no object at runtime",
      "`const enum` values can't be used in `switch` or comparisons",
      "A `const enum` can contain only string values",
    ],
    answer: 0,
    explanation:
      "`const enum` saves bundle size but doesn't play well with `isolatedModules` and transpilers that process files individually (Babel, esbuild, SWC): they'd need to know values from another file. That's why libraries and modern builds avoid it.",
    sources: ["ts-enums", "ts-tsconfig"],
  },
  {
    question: "How do namespaces (`namespace`) differ from ES modules?",
    options: [
      "Namespaces are a legacy way of organizing code; modules are used now",
      "Namespaces are a new ECMAScript standard replacing `import`/`export`",
      "They're synonyms: the compiler converts one into the other",
    ],
    answer: 0,
    explanation:
      "Namespaces predate ES modules and create objects at runtime. Code is now organized into files with `import`/`export`, while `declare namespace` is sometimes used in declarations to describe global libraries. Namespaces aren't compatible with `erasableSyntaxOnly`.",
    sources: ["ts-namespaces-modules", "ts-modules"],
  },
  {
    question: "What is an assertion function?",
    code: `function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== 'string') throw new Error('Not a string');
}`,
    options: [
      "A function after whose successful call TS treats the argument's type as narrowed",
      "A function that returns `true` or `false` to check a type",
      "A function that works only in tests",
    ],
    answer: 0,
    explanation:
      "After `assertIsString(value)`, `value` is a `string` for the rest of the code, with no `if`. If the check fails, the function throws. Unlike a type guard (`x is T`), you don't need to wrap the result in a condition.",
    sources: ["ts-narrowing"],
  },
  {
    question: "How do you get a native button's props to extend them in your component?",
    options: [
      "`React.ComponentProps<'button'>`",
      "`HTMLButtonElement` — the button's props type",
      "`React.ButtonProps` from the `@types/react` package",
    ],
    answer: 0,
    explanation:
      "`type Props = React.ComponentProps<'button'> & { variant: 'primary' | 'ghost' }` — the component accepts all native attributes (`onClick`, `disabled`, `aria-*`). `HTMLButtonElement` is the DOM node type, not props. `ComponentProps<typeof MyComp>` extracts the props of any component.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "How do you type Redux Toolkit hooks in a TypeScript app?",
    options: [
      "Infer `RootState` and `AppDispatch` from the store and create `useAppSelector`/`useAppDispatch`",
      "Type every `useSelector` call as `any`",
      "Describe the whole state interface by hand and update it on every change",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>` and `type AppDispatch = typeof store.dispatch`. Then `export const useAppSelector = useSelector.withTypes<RootState>()`. Types are inferred from the reducers; no manual description is needed.",
    sources: ["redux-typescript"],
  },
  {
    question: "How do you type a generic list component?",
    code: `function List<T>({ items, render }: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) { /* ... */ }`,
    options: [
      "Declare a type parameter on the component function — TS infers `T` from `items`",
      "Generics aren't supported in React components because of JSX syntax",
      "Use `React.FC<T>`, where `T` is the list item type",
    ],
    answer: 0,
    explanation:
      "`<List items={users} render={u => u.name} />` — `T` is inferred as `User`, and `u` in `render` is typed. In `.tsx` files, arrow functions use `<T,>` so the parser doesn't mistake it for JSX. `React.FC` doesn't pass generics through.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "What does `Extract<'a' | 'b' | 1 | 2, string>` produce?",
    options: ["`'a' | 'b'`", "`1 | 2`", "`never`"],
    answer: 0,
    explanation:
      "`Extract<T, U>` keeps the union members assignable to `U` — here, the string literals. The opposite `Exclude` would keep `1 | 2`. Both utilities are distributive conditional types.",
    sources: ["ts-utility-types", "ts-conditional"],
  },
  {
    question: "What does `NonNullable<string | null | undefined>` return?",
    options: ["`string`", "`string | undefined`", "`never`"],
    answer: 0,
    explanation:
      "`NonNullable<T>` excludes `null` and `undefined` from a union. It's currently implemented as `T & {}`. Handy for values after a check or in `filter` results.",
    sources: ["ts-utility-types"],
  },
  {
    question: "How do `object`, `{}` and `Record<string, unknown>` differ as types?",
    options: [
      "`{}` — anything non-null, `object` — non-primitive, `Record` — a dictionary",
      "They're three synonyms for \"any object\" in TypeScript",
      "`{}` means only an empty object without a single property",
    ],
    answer: 0,
    explanation:
      "`{}` accepts strings and numbers too — everything except `null` and `undefined`, which often surprises people. `object` excludes primitives. `Record<string, unknown>` is an object with arbitrary string keys whose values you can access. For \"any value\", `unknown` is better.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "How does TypeScript handle the `in` operator when narrowing?",
    code: `type Fish = { swim(): void };
type Bird = { fly(): void };
function move(a: Fish | Bird) {
  if ('swim' in a) a.swim(); else a.fly();
}`,
    options: [
      "It narrows the union to the members that have a `swim` property",
      "The `in` operator doesn't affect types",
      "It checks that `a` is an array containing the string `'swim'`",
    ],
    answer: 0,
    explanation:
      "TS supports narrowing via `typeof`, `instanceof`, `in`, equality checks, truthiness and discriminants. In `else`, `Bird` remains. For network data, such checks are part of runtime validation.",
    sources: ["ts-narrowing"],
  },
  {
    question: "What do `-readonly` and `-?` do in a mapped type?",
    code: `type Mutable<T> = { -readonly [K in keyof T]-?: T[K] };`,
    options: [
      "Remove the `readonly` and `?` modifiers from all properties",
      "Add the `readonly` and `?` modifiers to all properties",
      "Delete the properties marked `readonly` from the type",
    ],
    answer: 0,
    explanation:
      "The `-` prefix removes a modifier, `+` (the default) adds it. That's how `Required<T>` is implemented (`-?`). There's no built-in `Mutable`, but it's often written following this pattern.",
    sources: ["ts-mapped"],
  },
  {
    question: "How do you rename keys in a mapped type?",
    code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`,
    options: [
      "With `as` after `in`, using a template literal",
      "It's impossible — keys in a mapped type always stay the same",
      "With a `rename()` function from the standard type library",
    ],
    answer: 0,
    explanation:
      "Key remapping (TS 4.1+): `Getters<{ name: string }>` → `{ getName: () => string }`. If the expression after `as` produces `never`, the key is dropped — that's how properties are filtered by value type. `string & K` is needed because keys can be symbols or numbers.",
    sources: ["ts-mapped", "ts-template-literal"],
  },
  {
    question: "Why does `Object.keys(user)` return `string[]` rather than `(keyof User)[]`?",
    options: [
      "At runtime the object may have other keys too",
      "It's a known TypeScript bug that will be fixed in the next version",
      "Because object keys are always strings, even numeric ones",
    ],
    answer: 0,
    explanation:
      "An object of type `User` may contain extra properties (the type describes a minimum), so promising `(keyof User)[]` would be unsafe. If you're sure, use a type assertion or a typed wrapper. It's a deliberate decision by the TypeScript team.",
    sources: ["ts-type-compatibility", "ts-keyof"],
  },
  {
    question: "What does the `noUncheckedIndexedAccess` flag give you?",
    options: [
      "Index access gets a type with `| undefined`",
      "It forbids index signatures in object types entirely",
      "It disables out-of-bounds checks for tuples and arrays",
    ],
    answer: 0,
    explanation:
      "Without the flag, `const x = arr[10]` is typed as `T`, even though it's `undefined` at runtime. With the flag, the compiler makes you check the value. The flag isn't part of `strict`, but it's often recommended.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "How does `unknown[]` differ from `any[]` in a function parameter?",
    options: [
      "With `unknown[]` elements must be narrowed, with `any[]` they don't",
      "`unknown[]` accepts only arrays of objects, not primitives",
      "No difference: both disable checks for the elements",
    ],
    answer: 0,
    explanation:
      "Both accept any array, but inside a function with `unknown` you can't call an element's method without a check. If the function doesn't work with the elements (e.g. counts the length), `unknown[]` is the safe choice. Even better is a generic `T[]` if the type matters for the result.",
    sources: ["ts-everyday-types", "ts-generics"],
  },
  {
    question: "What are decorators in TypeScript 5?",
    options: [
      "Functions applied to classes and their members via `@`",
      "Special comments for generating TSDoc documentation",
      "Syntax for declaring React components as classes",
    ],
    answer: 0,
    explanation:
      "TS 5.0 supports standard (stage 3) decorators without a flag. The legacy \"experimental\" decorators (`experimentalDecorators`) with a different API are used in Angular, NestJS and TypeORM. Uses: logging, DI, validation, metadata.",
    sources: ["ts-5-0", "ts-decorators"],
  },
  {
    question: "What does `import type { User } from './types'` do?",
    options: [
      "Imports only the type; the import is erased during compilation",
      "Imports the value and its type at once, like a regular `import`",
      "Imports the type at runtime for `instanceof` checks",
    ],
    answer: 0,
    explanation:
      "An explicit type-only import helps transpilers that process files individually: they know for sure the import can be erased. With the `verbatimModuleSyntax` flag, this is mandatory for types. It also avoids unwanted side effects from loading the module.",
    sources: ["ts-modules", "ts-tsconfig"],
  },
  {
    question: "Why is `interface` preferable to an intersection for extending large object types?",
    options: [
      "`extends` catches property conflicts and is faster for the compiler",
      "Intersections don't support nested objects and arrays",
      "Interfaces exist at runtime, while intersections don't",
    ],
    answer: 0,
    explanation:
      "With `interface B extends A`, a property conflict is an error at the declaration, while an intersection silently produces `never`. The compiler caches interface relationships, so it's faster in large codebases — as the TS performance wiki recommends.",
    sources: ["ts-performance-wiki", "ts-objects"],
  },
  {
    question: "What does `Parameters<(a: string, b?: number) => void>` return?",
    options: ["`[a: string, b?: number]`", "`string | number`", "`{ a: string; b?: number }`"],
    answer: 0,
    explanation:
      "`Parameters` returns a tuple of parameters, preserving optionality and names. Handy for wrappers: `function logged(...args: Parameters<typeof fn>)`. For constructors there's `ConstructorParameters`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "How do you specify the type of `this` for a handler function?",
    code: `function handler(this: HTMLButtonElement, e: MouseEvent) {
  this.disabled = true;
}`,
    options: [
      "A leading `this` \"parameter\" sets the context type and is erased on compile",
      "It's a regular first parameter that must be passed when calling",
      "This syntax is forbidden in TypeScript strict mode",
    ],
    answer: 0,
    explanation:
      "The `this` pseudo-parameter describes which context the function must be called with; it isn't an argument. The compiler checks calls and uses of `this` inside. In arrow functions, `this` is lexical and can't be specified this way.",
    sources: ["ts-functions"],
  },
  {
    question: "What's the best way to type an API response whose structure differs by status?",
    options: [
      "A union discriminated by `ok`: success with `data` or an error",
      "One shared type with all fields made optional",
      "The `any` type, because the response structure isn't known in advance",
    ],
    answer: 0,
    explanation:
      "A union makes impossible states unrepresentable: with `ok: true`, `data` is guaranteed and `error` isn't available. A type with optional fields allows meaningless combinations and requires checks everywhere.",
    sources: ["ts-narrowing"],
  },
  {
    question: "What does the `ReadonlyArray<T>` utility (or `readonly T[]`) do?",
    options: [
      "Removes mutating methods (`push`, `sort`) from the type",
      "Freezes the array at runtime via `Object.freeze`",
      "Makes all array elements deeply immutable",
    ],
    answer: 0,
    explanation:
      "A `readonly T[]` parameter guarantees the caller that the function won't modify their array. It accepts regular arrays too. The type doesn't prevent changing nested objects — it's shallow protection.",
    sources: ["ts-objects"],
  },
  {
    question: "What is `unique symbol`?",
    options: [
      "The type of a specific symbol declared via `const s = Symbol()`",
      "Any value of type `symbol`, including `Symbol.for()`",
      "A symbol that can't be used as an object key",
    ],
    answer: 0,
    explanation:
      "Each `const` with `Symbol()` gets its own `unique symbol` subtype, so TS distinguishes such keys. This is used for \"hidden\" properties and type branding. A plain `symbol` describes any symbol.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "How do you extend the type of the global `Window` object from a module?",
    code: `export {};
declare global {
  interface Window { dataLayer: unknown[] }
}`,
    options: [
      "With `declare global` and merging into the `Window` interface",
      "With `window.dataLayer = []` — the type is inferred automatically",
      "With `type Window = Window & { dataLayer: unknown[] }`",
    ],
    answer: 0,
    explanation:
      "In a module file (with `import`/`export`), global declarations go inside `declare global`. The `Window` interface merges with your extension. Redeclaring `type Window` causes a duplicate identifier error.",
    sources: ["ts-declaration-merging", "ts-dts"],
  },
  {
    question: "How do you type the result of `JSON.parse` safely?",
    options: [
      "Treat the result as `unknown` and validate it with a schema (Zod)",
      "Just write `JSON.parse(text) as User` — that's enough",
      "Leave it as `any`: TypeScript will check the structure later itself",
    ],
    answer: 0,
    explanation:
      "`JSON.parse` returns `any`, but external data may not match expectations. A schema (`z.object({...})`) validates data at runtime, and `z.infer<typeof schema>` gives a TS type without duplication. `as User` only hides the problem.",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "How does `type A = B` differ from `interface A extends B {}` in IDE tooltips?",
    options: [
      "The interface is shown by name, the alias gets expanded",
      "Type aliases aren't shown in IDE tooltips at all",
      "No difference: the IDE shows them the same way",
    ],
    answer: 0,
    explanation:
      "Complex intersections and mapped types are often expanded into long structures in tooltips, while an interface is shown by name. This affects the readability of errors. To \"flatten\" intersections, people write a `Prettify<T>` helper.",
    sources: ["ts-objects", "ts-performance-wiki"],
  },
  {
    question: "What does `paths` in `tsconfig.json` give you?",
    options: [
      "Import path aliases, e.g. `@/*` → `./src/*`",
      "The list of files and folders to compile",
      "Output paths for the compiled `.js` files",
    ],
    answer: 0,
    explanation:
      "`paths` lets you write `import { Button } from '@/components/button'` instead of long relative paths. It's a resolution setting for the compiler — the bundler must understand the same aliases (Next.js and Vite read them from tsconfig). The file list is set by `include`, output by `outDir`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "How does `moduleResolution: 'bundler'` differ from `'node16'`/`'nodenext'`?",
    options: [
      "`bundler` works like bundlers do, `nodenext` follows Node.js rules",
      "`bundler` works only with Webpack 4 and older",
      "They're synonyms for different TS versions",
    ],
    answer: 0,
    explanation:
      "In Node.js ESM you must write extensions in relative imports and account for `exports`/`type`. Bundlers (Vite, Next.js, esbuild) are forgiving about this, and `bundler` mode mirrors their behavior. For code run by Node.js without a build step, choose `nodenext`.",
    sources: ["ts-tsconfig", "ts-modules"],
  },
  {
    question: "What does the `isolatedModules` flag do?",
    options: [
      "Forbids code that can't be transpiled file by file",
      "Compiles each module in a separate process",
      "Isolates each file's global variables from one another",
    ],
    answer: 0,
    explanation:
      "Babel, SWC and esbuild compile files independently and don't see types from other modules. `isolatedModules` warns about code they can't handle correctly: re-exporting a type without `export type`, accessing a `const enum` from another file, and so on.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "What does `keyof typeof obj` do?",
    code: `const routes = { home: '/', about: '/about' };
type RouteName = keyof typeof routes;`,
    options: [
      "Gets the union of the `routes` value's keys: `'home' | 'about'`",
      "Gets the union of the values: `'/' | '/about'`",
      "Causes an error: `keyof` can't be applied to `typeof`",
    ],
    answer: 0,
    explanation:
      "`typeof routes` gives the object's type, and `keyof` its keys. For a union of values you need indexed access: `typeof routes[keyof typeof routes]`, and `as const` to make the values literals.",
    sources: ["ts-keyof", "ts-typeof"],
  },
  {
    question: "When does TS widen a literal type to a general one?",
    options: [
      "In mutable positions: `let`, object properties",
      "Never: literal types are always preserved as is",
      "Only with the `noImplicitAny` flag enabled in tsconfig",
    ],
    answer: 0,
    explanation:
      "`const a = 'x'` → `'x'`, but `let b = 'x'` → `string`, and `{ dir: 'left' }` → `{ dir: string }`. Because of this, the object can't be passed to a function expecting `'left' | 'right'`. Fixes: `as const`, an annotation or `satisfies`.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "How do you make a generic parameter optional with a default value?",
    options: [
      "`type Box<T = string> = { value: T }`",
      "`type Box<T?> = { value: T }`",
      "`type Box<T | string> = { value: T }`",
    ],
    answer: 0,
    explanation:
      "Type parameters can have defaults: `Box` without an argument is `Box<string>`. They can be combined with constraints: `<T extends object = {}>`. That's how, for example, `useState<S = undefined>` and `EventEmitter<T = any>` work.",
    sources: ["ts-generics"],
  },
  {
    question: "How do you type a factory function that returns the same type it received?",
    options: [
      "`function clone<T>(value: T): T`",
      "`function clone(value: any): any`",
      "`function clone(value: object): object`",
    ],
    answer: 0,
    explanation:
      "A generic preserves the link between input and output: `clone(user)` returns a `User`. With `any` and `object`, the calling code loses type information and has to cast.",
    sources: ["ts-generics"],
  },
  {
    question: "What is contextual typing?",
    options: [
      "Inferring a function's parameter types from where it's used",
      "Typing that depends on the environment (browser or Node.js)",
      "Specifying a type via a JSDoc comment",
    ],
    answer: 0,
    explanation:
      "In `button.addEventListener('click', e => ...)`, the type of `e` (`MouseEvent`) is inferred from the `addEventListener` signature. `map` callbacks, JSX handlers and `useState` setters work the same way. If you move the function into a separate variable, the context is lost — you'll have to annotate it.",
    sources: ["ts-functions", "ts-everyday-types"],
  },
];

export default questions;
