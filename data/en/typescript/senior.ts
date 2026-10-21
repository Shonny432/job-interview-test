import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "With `strictFunctionTypes`, can you assign `(x: Dog) => void` to a variable of type `(x: Animal) => void`?",
    options: [
      "No: function parameters are checked contravariantly",
      "Yes: function parameters are checked covariantly",
      "Yes, but only if `Dog` is a class rather than an interface",
    ],
    answer: 0,
    explanation:
      "The variable promises to accept any `Animal`, but the function can only handle `Dog` — a call with `Cat` would break. So subtyping by parameter goes the opposite way: `(x: Animal) => void` can be assigned where `(x: Dog) => void` is expected, but not vice versa.",
    sources: ["ts-type-compatibility", "ts-strict"],
  },
  {
    question: "Why doesn't `strictFunctionTypes` apply to a method declared as `handle(x: Dog): void`?",
    options: [
      "Method-syntax parameters are checked bivariantly for compatibility",
      "Class and interface methods aren't checked for compatibility at all",
      "The flag applies only to arrow functions declared in classes",
    ],
    answer: 0,
    explanation:
      "Method bivariance was kept so that many built-in types (e.g. `Array<T>`) stay compatible. If you declare a function property `handle: (x: Dog) => void` instead, the check is strict. That's why property syntax is often preferred for callbacks in interfaces.",
    sources: ["ts-type-compatibility", "ts-tsconfig"],
  },
  {
    question: "What is `ToArray<string | number>` if `type ToArray<T> = T extends any ? T[] : never`?",
    options: ["`string[] | number[]`", "`(string | number)[]`", "`never`"],
    answer: 0,
    explanation:
      "A conditional type over a \"naked\" type parameter distributes over a union: the condition is applied to each member separately. This is a distributive conditional type — `Exclude` and `Extract` are built on it.",
    sources: ["ts-conditional"],
  },
  {
    question: "How do you turn off a conditional type's distribution over a union?",
    options: [
      "Wrap both sides in a tuple: `[T] extends [U] ? X : Y`",
      "Add the `distributive: false` option to `compilerOptions`",
      "Use `infer U` instead of `extends` in the check",
    ],
    answer: 0,
    explanation:
      "Distribution happens only when the checked type is a \"naked\" parameter. The tuple `[T]` makes it composite, so the union is checked as a whole: `[string | number] extends [string]` → false. There's no compiler setting for this.",
    sources: ["ts-conditional"],
  },
  {
    question: "Why does `type IsNever<T> = T extends never ? true : false` give `never` for `IsNever<never>`?",
    options: [
      "`never` is an empty union, and distributing over it yields an empty result",
      "It's a compiler bug, so `never` can't be checked at all",
      "`never` is always assignable to the literal `false` in conditional types",
    ],
    answer: 0,
    explanation:
      "A distributive conditional type applies to each union member, and `never` has no members — the result is `never`. The correct check is `[T] extends [never] ? true : false`.",
    sources: ["ts-conditional"],
  },
  {
    question: "How do you implement `DeepPartial<T>`?",
    code: `type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;`,
    options: [
      "With a recursive mapped type that adds `?` at every level",
      "With the built-in utility `Partial<T, 'deep'>` from lib.d.ts",
      "You can't: recursive type aliases are forbidden in TypeScript",
    ],
    answer: 0,
    explanation:
      "Type aliases can reference themselves. A real implementation should handle arrays, functions and `Date` separately so they aren't \"broken down\" into properties. Deep recursion has an instantiation limit, so huge types slow down the compiler.",
    sources: ["ts-mapped", "ts-conditional"],
  },
  {
    question: "Why are branded types needed?",
    code: `type UserId = string & { readonly __brand: 'UserId' };`,
    options: [
      "To distinguish structurally identical types, e.g. `UserId` and `OrderId`",
      "To add a `__brand` property to all strings at runtime",
      "To speed up the compiler's comparison of string types",
    ],
    answer: 0,
    explanation:
      "Structural typing considers all strings compatible, so `deleteUser(orderId)` compiles. A brand is a fake property that exists only in types; the value is created by a constructor function with a check (`toUserId(s): UserId`). This emulates nominal typing.",
    sources: ["ts-type-compatibility"],
  },
  {
    question: "How do you keep only the function-valued properties of a type?",
    code: `type Methods<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};`,
    options: [
      "Remapping a key to `never` drops the property from the result",
      "`as never` makes the property's value type `never`",
      "This code causes a compile error",
    ],
    answer: 0,
    explanation:
      "If the expression after `as` evaluates to `never`, the key is dropped. It's the standard technique for filtering keys by value type. Without `as`, you'd first compute the union of keys and then apply `Pick`.",
    sources: ["ts-mapped"],
  },
  {
    question: "What does `Split<'a/b/c'>` return?",
    code: `type Split<S extends string> =
  S extends \`\${infer Head}/\${infer Rest}\`
    ? [Head, ...Split<Rest>]
    : [S];`,
    options: ["`['a', 'b', 'c']`", "`string[]` (a general type)", "`['a/b/c']` (no parsing)"],
    answer: 0,
    explanation:
      "`infer` inside a template literal parses the string: `Head` captures the part before the first `/`, `Rest` the remainder. Recursion and variadic tuples assemble the result. This is how route params like `/users/:id` are typed.",
    sources: ["ts-template-literal", "ts-conditional"],
  },
  {
    question: "What are variadic tuple types?",
    code: `type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B];`,
    options: [
      "Tuples where spreading generic tuples preserves exact element types",
      "Tuples without a length limit, equivalent to `any[]` in TS",
      "Tuples whose elements the compiler lets you reorder",
    ],
    answer: 0,
    explanation:
      "`Concat<[1, 2], ['a']>` → `[1, 2, 'a']`. This lets you precisely type `concat`, `curry`, `Promise.all` and wrapper functions with prefix arguments.",
    sources: ["ts-objects", "ts-generics"],
  },
  {
    question: "What does the `const` modifier on a type parameter (TS 5.0) give you?",
    code: `function routes<const T extends readonly string[]>(r: T) { return r; }
const r = routes(['home', 'about']);`,
    options: [
      "Literal inference, like `as const`: `r` is `readonly ['home', 'about']`",
      "A ban on modifying the argument inside the function at runtime",
      "`T` can't be overridden by an explicit argument when calling",
    ],
    answer: 0,
    explanation:
      "Without `const`, `string[]` would be inferred, and the caller would have to write `as const`. The modifier affects only type inference, not runtime. The `readonly string[]` constraint is needed so an array literal fits as a readonly tuple.",
    sources: ["ts-5-0"],
  },
  {
    question: "What is the `NoInfer<T>` utility (TS 5.4) for?",
    code: `function pick<C extends string>(colors: C[], fallback: NoInfer<C>) {}
pick(['red', 'blue'], 'green');`,
    options: [
      "It prevents inferring `C` from this argument — so there's an error",
      "It disables type inference for the whole function and its arguments",
      "It makes the `fallback` parameter optional with a default value",
    ],
    answer: 0,
    explanation:
      "Without `NoInfer`, TS would infer `C` as `'red' | 'blue' | 'green'` from both arguments, and there'd be no error. `NoInfer` says: \"take `C` from elsewhere and only check this argument\".",
    sources: ["ts-5-4"],
  },
  {
    question: "What does `infer N extends number` do in a conditional type?",
    code: `type ToNum<S> = S extends \`\${infer N extends number}\` ? N : never;
type X = ToNum<'42'>;`,
    options: [
      "Infers `N` with a constraint — `X` becomes the literal type `42`",
      "Converts the string `'42'` to a number at runtime via `Number()`",
      "Causes a compile error: `infer` doesn't support `extends`",
    ],
    answer: 0,
    explanation:
      "A constraint on `infer` (TS 4.7+) not only checks compatibility but also lets you infer a literal numeric type from a string. Previously this required nested conditional types.",
    sources: ["ts-conditional", "ts-template-literal"],
  },
  {
    question: "In what order should function overloads be written?",
    options: [
      "From more specific to more general — TS picks the first match from the top",
      "From general to specific — TS picks the last match",
      "Order doesn't matter: TS picks the most precise signature itself",
    ],
    answer: 0,
    explanation:
      "If a general overload `(x: any)` comes first, it \"captures\" every call and the specific signatures become useless. Another tip: don't write overloads that differ only in the last parameter — use an optional parameter instead.",
    sources: ["ts-functions", "ts-dts-dos-donts"],
  },
  {
    question: "How do you add a `user` field to the Express library's `Request` type?",
    code: `declare module 'express-serve-static-core' {
  interface Request { user?: User }
}`,
    options: [
      "Module augmentation via `declare module` and merging",
      "Edit the declarations directly in `node_modules/@types/express`",
      "Create your own `Request` type and override the import via `paths`",
    ],
    answer: 0,
    explanation:
      "Augmentation lets you extend a third-party module's types without forking it: the interfaces merge. The file must be a module (contain `import`/`export`) and be part of the project. Edits in `node_modules` are lost on reinstall.",
    sources: ["ts-declaration-merging"],
  },
  {
    question: "What does the `verbatimModuleSyntax` flag require?",
    options: [
      "Explicitly marking type imports with `import type`",
      "Using only CommonJS modules with `require`",
      "Writing `.js` extensions in all relative imports",
    ],
    answer: 0,
    explanation:
      "The rule is simple: everything without the `type` modifier stays in the output JS, everything with `type` is erased. This makes the result predictable for any transpiler and replaces the deprecated `importsNotUsedAsValues` and `preserveValueImports`.",
    sources: ["ts-tsconfig", "ts-modules"],
  },
  {
    question: "What does the `erasableSyntaxOnly` flag (TS 5.8) forbid?",
    options: [
      "Syntax that requires code generation: `enum`, `namespace`",
      "Any type annotations in `.ts` files except JSDoc",
      "Using `any`, `unknown` and `as` assertions",
    ],
    answer: 0,
    explanation:
      "Node.js can run TypeScript by simply erasing types (type stripping). Constructs that require code generation don't work that way. The flag reports them in advance so the code runs without a separate compile step.",
    sources: ["ts-5-8"],
  },
  {
    question: "What are Project References (`references`, `composite`) for?",
    options: [
      "Splitting a repository into incrementally built projects",
      "Using types from npm packages without installing `@types`",
      "Linking to documentation from TSDoc comments",
    ],
    answer: 0,
    explanation:
      "Each subproject compiles separately and emits `.d.ts`, and dependent projects use the declarations rather than the sources. This speeds up type checking and enforces boundaries between monorepo packages.",
    sources: ["ts-project-references"],
  },
  {
    question: "What's the risk of enabling `skipLibCheck: true`?",
    options: [
      "Errors inside `.d.ts` files, including your own, go unnoticed",
      "Types from `node_modules` stop being used entirely",
      "Compilation becomes noticeably slower",
    ],
    answer: 0,
    explanation:
      "The flag skips checking declaration files — builds are faster and don't break because of conflicts between `@types`. But errors in declarations (including your own `.d.ts`) remain unnoticed. It doesn't prevent using library types.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "How do you find the cause of slow type checking in a large project?",
    options: [
      "`tsc --extendedDiagnostics` and `--generateTrace`",
      "Remove files from the project one by one until it gets faster",
      "Turn off `strict` — checks will become fast",
    ],
    answer: 0,
    explanation:
      "Diagnostics show the time of each phase and the number of instantiations, and a trace (analyzed with `@typescript/analyze-trace` or in the browser) shows which types are the most expensive. Common culprits: huge unions, deep recursion, complex intersections, missing return type annotations on exports.",
    sources: ["ts-performance-wiki"],
  },
  {
    question: "Can you pass a `readonly string[]` to a function that accepts `string[]`?",
    options: [
      "No: the function could modify the array",
      "Yes: `readonly` is only a hint; compatibility isn't checked",
      "Yes, but only with strict mode turned off",
    ],
    answer: 0,
    explanation:
      "The reverse direction (`string[]` → `readonly string[]`) is allowed. So parameters that the function doesn't modify are better declared as `readonly T[]` — then it can be called with both mutable and readonly arrays.",
    sources: ["ts-objects", "ts-type-compatibility"],
  },
  {
    question: "What does a `this` return type give you in a class method?",
    code: `class Query {
  where(c: string): this { /* ... */ return this; }
}
class UserQuery extends Query { active(): this { return this; } }
new UserQuery().where('x').active();`,
    options: [
      "Polymorphic `this`: a method chain keeps the subclass type",
      "The method always returns the base class type `Query`",
      "It's an error: `this` can't be used as a type",
    ],
    answer: 0,
    explanation:
      "If `where` returned `Query`, `.active()` wouldn't be available after it. Polymorphic `this` is handy for fluent APIs and builders. There's also `this is T` in type guard methods.",
    sources: ["ts-classes"],
  },
  {
    question: "What are the `in` and `out` variance annotations on type parameters (TS 4.7) for?",
    code: `interface Producer<out T> { get(): T }
interface Consumer<in T> { set(v: T): void }`,
    options: [
      "They explicitly set covariance/contravariance, speeding up and sharpening checks",
      "They define which parameters can be read and written at runtime",
      "It's syntax for input and output parameters, as in C# methods",
    ],
    answer: 0,
    explanation:
      "TS usually computes variance itself, but for complex recursive types this is expensive and sometimes imprecise. The annotation is checked by the compiler and used in comparisons. It's rarely needed — in libraries with complex types.",
    sources: ["ts-generics", "ts-type-compatibility"],
  },
  {
    question: "Why can the template type `` `${A}-${B}-${C}` `` over three large unions cause an error?",
    options: [
      "The resulting union is too large, and the compiler has a limit",
      "Template types don't support more than two substitutions",
      "Union types can't be substituted into template literals at all",
    ],
    answer: 0,
    explanation:
      "A template with unions distributes over every combination: 100 × 100 × 100 = 1,000,000 members. TypeScript limits union size (around 100,000) and reports \"Expression produces a union type that is too complex\". The fix is a more general type (`` `${string}-${string}` ``) or validation via a function.",
    sources: ["ts-template-literal", "ts-performance-wiki"],
  },
  {
    question: "How does the `UnionToIntersection` trick work?",
    code: `type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void
    ? I : never;`,
    options: [
      "Inferring from a contravariant parameter position combines candidates into an intersection",
      "The compiler just replaces `|` with `&` via a special rule for this name",
      "It doesn't work — an intersection can't be derived from a union",
    ],
    answer: 0,
    explanation:
      "First the union is distributed into a union of functions `(x: A) => void | (x: B) => void`. Then, when inferring `I` from the (contravariant) parameter position, multiple candidates are combined into an intersection: `A & B`. It's a textbook example of type-level programming.",
    sources: ["ts-conditional", "type-challenges"],
  },
  {
    question: "Why is `Record<Status, string>` more useful than `{ [k: string]: string }` for a dictionary keyed by status?",
    options: [
      "The compiler requires a key for every status",
      "An index signature doesn't support string values",
      "`Record` compiles to a `Map` and runs faster",
    ],
    answer: 0,
    explanation:
      "Add a new member to the `Status` union, and every `Record<Status, ...>` stops compiling until you add a translation, an icon and so on. An index signature accepts any string and doesn't guarantee completeness.",
    sources: ["ts-utility-types", "ts-objects"],
  },
  {
    question: "What changed about type predicate inference in TS 5.5?",
    code: `const nums = [1, null, 2].filter(x => x !== null);`,
    options: [
      "TS infers the predicate `x is number`, so `nums` is `number[]`",
      "`filter` now always returns `never[]` for mixed arrays",
      "Type predicates were removed in favor of assertion functions",
    ],
    answer: 0,
    explanation:
      "Previously `nums` was `(number | null)[]`, and you had to write `(x): x is number => x !== null`. Now the compiler infers a predicate for simple functions if returning `true` really narrows the type.",
    sources: ["ts-narrowing"],
  },
  {
    question: "What are `using` declarations (TS 5.2) for?",
    code: `{
  using file = openFile('log.txt');
  // ...
} // file[Symbol.dispose]() is called automatically`,
    options: [
      "Automatically calling `Symbol.dispose` when leaving the block",
      "Importing modules inside a block of code, like `import` in Python",
      "A replacement for `const` for deeply immutable objects",
    ],
    answer: 0,
    explanation:
      "It implements the ECMAScript Explicit Resource Management proposal: the resource is released even if an exception is thrown — like `try/finally`, but shorter. For async resources there's `await using` and `Symbol.asyncDispose`. Handy for connections, files, locks and subscriptions in tests.",
    sources: ["ts-handbook"],
  },
  {
    question: "What does `(typeof users)[number]` return if `users: User[]`?",
    options: ["`User`", "`number`", "`User[]`"],
    answer: 0,
    explanation:
      "Indexed access by `number` returns the array element type or a union of tuple element types. A popular combo: `const roles = [...] as const; type Role = (typeof roles)[number]`.",
    sources: ["ts-indexed-access"],
  },
  {
    question: "What does the mapped type `{ [K in keyof T]: Box<T[K]> }` produce if `T` is the tuple `[string, number]`?",
    options: [
      "The tuple `[Box<string>, Box<number>]`",
      "An object with properties `0`, `1`, `length` and methods",
      "An error: mapped types don't work with tuples",
    ],
    answer: 0,
    explanation:
      "A mapped type over `keyof T`, where `T` is a tuple or array type parameter, maps the elements and preserves tuple-ness, length and modifiers. This lets you type, for example, `Promise.all` via `{ [K in keyof T]: Awaited<T[K]> }`.",
    sources: ["ts-mapped"],
  },
  {
    question: "How do you get the element type of a `Set<T>` or `Map<K, V>` from a value?",
    code: `const ids = new Set(['a', 'b']);
type Id = typeof ids extends Set<infer T> ? T : never;`,
    options: [
      "With a conditional type using `infer` on the pattern `Set<infer T>`",
      "With indexed access `(typeof ids)[number]`",
      "With the `ElementType<typeof ids>` utility from the standard library",
    ],
    answer: 0,
    explanation:
      "`Set` has no numeric index signature, so `[number]` doesn't work. A conditional type with `infer` extracts the parameter of any generic: `Map<infer K, infer V>`, `Promise<infer R>`. There's no built-in `ElementType` utility. Here `Id` is `string`.",
    sources: ["ts-conditional", "ts-indexed-access"],
  },
  {
    question: "What is the `declare` keyword for?",
    code: `declare const __APP_VERSION__: string;`,
    options: [
      "Describing something that exists at runtime without generating code",
      "Declaring a variable that the compiler will create",
      "Making a variable global at runtime",
    ],
    answer: 0,
    explanation:
      "Ambient declarations tell the compiler about things defined elsewhere: globals injected by the bundler, scripts from a CDN, modules without types (`declare module 'legacy-lib'`). `declare` doesn't produce any JS code.",
    sources: ["ts-dts"],
  },
  {
    question: "How do you check a type in tests so that you get an error if there's NO compile error?",
    options: [
      "`// @ts-expect-error` above the line being checked",
      "`// @ts-ignore` above the line being checked",
      "`// @ts-nocheck` at the top of the test file",
    ],
    answer: 0,
    explanation:
      "`@ts-expect-error` suppresses an error and itself becomes an error if there's nothing to suppress — so a type test \"fails\" when a type becomes too wide. `@ts-ignore` is always silent and hides problems. For assertions there's `expectTypeOf` in Vitest, `tsd`, and `@ts-expect-error` in type-challenges.",
    sources: ["ts-handbook", "type-challenges"],
  },
  {
    question: "When is the double assertion `x as unknown as T` justified?",
    options: [
      "Almost never: only for a deliberate workaround backed by a check",
      "Always, whenever the compiler complains about incompatible types",
      "It's the standard, safe way to cast JSON to a type",
    ],
    answer: 0,
    explanation:
      "A plain `as` is forbidden between unrelated types; via `unknown` you can assert anything — and be wrong. If you can't avoid it (e.g. in a low-level utility), hide it inside a function with a runtime check and tests. For JSON, validate with a schema.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Why should you avoid the `Function` type for callbacks?",
    options: [
      "It accepts any function, and calls aren't checked",
      "It forbids passing arrow functions and methods",
      "It's deprecated and causes a compile error in strict mode",
    ],
    answer: 0,
    explanation:
      "`Function` describes any function, and calling it is unsafe. Prefer a precise signature `(value: string) => void`, and for \"any function\" use `(...args: never[]) => unknown` or `(...args: any[]) => any`. Likewise, `Object` and `{}` are better replaced with `object` or `unknown`.",
    sources: ["ts-dts-dos-donts", "ts-functions"],
  },
  {
    question: "Why can't you write `a.x` for `a: { x: string } | { y: number }`?",
    options: [
      "Only common union properties are accessible; narrow the type via `'x' in a`",
      "Properties of union types are always read-only",
      "You have to cast `a` to `any` first — that's by design",
    ],
    answer: 0,
    explanation:
      "The compiler doesn't know which member `a` is, and the second has no `x`. After `if ('x' in a)` the type is narrowed. Alternatives are a common discriminant (`kind`) or an explicit `x?: undefined` in the second member.",
    sources: ["ts-narrowing"],
  },
  {
    question: "What does the `exactOptionalPropertyTypes` flag change?",
    options: [
      "`{ a?: string }` no longer accepts an explicit `a: undefined`",
      "It makes all optional properties required",
      "It forbids optional properties in interfaces",
    ],
    answer: 0,
    explanation:
      "Without the flag, `a?: string` is equivalent to `a?: string | undefined`. With it, \"no key\" and \"key present with value `undefined`\" are distinguished, which matters for `Object.keys`, `in` and spread. If `undefined` is needed explicitly, write `a?: string | undefined`.",
    sources: ["ts-tsconfig", "ts-objects"],
  },
  {
    question: "What does `keyof (A | B)` return if `A = { id; name }` and `B = { id; price }`?",
    options: ["`'id'`", "`'id' | 'name' | 'price'`", "`never`"],
    answer: 0,
    explanation:
      "A union value can be any of its members, so only common keys are safe to access. `keyof (A & B)` gives the union of all keys. To distribute `keyof` over union members, use a conditional type: `T extends any ? keyof T : never`.",
    sources: ["ts-keyof"],
  },
  {
    question: "How do you enable type checking in JS files without migrating to TS?",
    options: [
      "`// @ts-check` and types via JSDoc",
      "Rename the file to `.jsx` or `.mjs`",
      "It's impossible without the `.ts` file extension",
    ],
    answer: 0,
    explanation:
      "TypeScript understands JSDoc: `/** @param {string} name */`, `@type`, `@typedef`, and type imports via `@import`. Many JS libraries are typed this way, and it enables gradual migration. Checking works in the editor and via `tsc --noEmit`.",
    sources: ["ts-migrating", "ts-tsconfig"],
  },
  {
    question: "How do you type a parameter that accepts an abstract class constructor?",
    options: [
      "`abstract new (...args: any[]) => T`",
      "`typeof T`",
      "`Constructor<T>` from the standard library",
    ],
    answer: 0,
    explanation:
      "Abstract construct signatures (TS 4.2) let you accept both abstract and regular classes — e.g. in mixin functions. `new (...args) => T` won't accept an abstract class. There's no built-in `Constructor<T>`; people usually declare it themselves.",
    sources: ["ts-classes"],
  },
  {
    question: "Is the narrowing of a `let` variable preserved inside a callback?",
    code: `function f(x: string | number) {
  if (typeof x === 'string') {
    setTimeout(() => x.toUpperCase());
  }
}`,
    options: [
      "Yes, since TS 5.4, if the variable isn't reassigned afterwards",
      "No, never: narrowing is always reset in closures",
      "Yes, but only for `const` variables in any version",
    ],
    answer: 0,
    explanation:
      "Previously, inside a callback TS assumed `x` might be reassigned and reset the narrowing to `string | number`. Since 5.4, the compiler understands the value is stable after the last assignment and keeps the narrowing. For `const` it already worked before.",
    sources: ["ts-5-4", "ts-narrowing"],
  },
  {
    question: "What is a homomorphic mapped type, and what does it preserve?",
    options: [
      "A `{ [K in keyof T]: ... }` type that preserves `T`'s modifiers",
      "A type that maps identical values of different objects",
      "A type in which all properties have the same value type",
    ],
    answer: 0,
    explanation:
      "When a mapped type iterates over `keyof T` directly, TS carries over the property modifiers of `T`. That's why `Partial<Readonly<T>>` stays readonly. When iterating over an arbitrary union of keys (`K in 'a' | 'b'`), modifiers aren't preserved.",
    sources: ["ts-mapped"],
  },
  {
    question: "How do you type a `Promise.all`-like function over a tuple of promises?",
    options: [
      "A generic tuple `[...T]` and a mapped type with `Awaited<T[K]>`",
      "An array `Promise<any>[]` and a result `Promise<any[]>`",
      "One generic `T` for all promises and `Promise<T>`",
    ],
    answer: 0,
    explanation:
      "`[...T]` hints to infer a tuple rather than an array, and the homomorphic mapped type unwraps each element: `all([fetchUser(), fetchPosts()])` → `Promise<[User, Post[]]>`. Versions with `any` or a single `T` lose positional types.",
    sources: ["ts-mapped", "ts-generics"],
  },
  {
    question: "Why is it recommended to annotate return types of exported functions in a library?",
    options: [
      "It speeds up checking and pins down the public contract",
      "Without an annotation TypeScript can't infer the result type",
      "It's required by the ECMAScript modules specification",
    ],
    answer: 0,
    explanation:
      "Inferring a complex type has to be repeated wherever the function is used, and declarations get bulky. An explicit type keeps the contract stable: implementation changes don't \"leak\" into the API. With `isolatedDeclarations` (TS 5.5), annotations on exports become mandatory.",
    sources: ["ts-performance-wiki", "ts-dts"],
  },
  {
    question: "Why is `isolatedDeclarations` (TS 5.5) useful for monorepos?",
    options: [
      "It allows generating `.d.ts` per file and in parallel",
      "It forbids importing types between monorepo packages",
      "It isolates each package in a separate Node.js process during builds",
    ],
    answer: 0,
    explanation:
      "The flag requires exported APIs to be explicitly annotated — then declarations can be produced by looking at a single file. This lets third-party tools (oxc, swc) generate `.d.ts` in parallel without waiting for a full check of dependencies.",
    sources: ["ts-tsconfig", "ts-project-references"],
  },
  {
    question: "How does `T extends object` differ from `T extends {}` as a generic constraint?",
    options: [
      "`object` — non-primitives, `{}` — everything except null/undefined",
      "It's the same constraint written with different syntax",
      "`{}` allows only empty objects without properties",
    ],
    answer: 0,
    explanation:
      "`{}` means \"any value with properties\", and strings and numbers have properties, so `T extends {}` accepts `'abc'` and `42`. To allow only objects (including arrays and functions), use `object`. For \"anything except null/undefined\", `{}` is exactly what you need.",
    sources: ["ts-everyday-types", "ts-generics"],
  },
  {
    question: "Why is extending an interface faster for the compiler than an intersection?",
    options: [
      "Interface relationships are cached, while intersections are recomputed",
      "Intersections are checked at runtime, while interfaces aren't",
      "Interfaces compile to classes that the engine caches",
    ],
    answer: 0,
    explanation:
      "The compiler caches the result of comparing interfaces by name, while an intersection `A & B & C` has to be normalized and compared structurally every time. In hot paths with large types this is noticeable. The TypeScript performance wiki says so explicitly.",
    sources: ["ts-performance-wiki"],
  },
  {
    question: "How do you type a reducer so that `payload` depends on the action's `type`?",
    options: [
      "Describe the actions as a union discriminated by the `type` field",
      "Make `payload: any` and check it in every `case`",
      "Create one `Action` interface with all fields optional",
    ],
    answer: 0,
    explanation:
      "`type Action = { type: 'add'; payload: Todo } | { type: 'remove'; payload: { id: string } }` — in `case 'add'` TS knows `payload` is a `Todo`. With `never` in `default` you get an exhaustiveness check. Redux Toolkit generates such types automatically from `createSlice`.",
    sources: ["ts-narrowing", "redux-typescript"],
  },
  {
    question: "What does `T[keyof T]` return for `T = { a: string; b: number }`?",
    options: ["`string | number`", "`'a' | 'b'`", "`{ a: string } | { b: number }`"],
    answer: 0,
    explanation:
      "Indexed access by a union of keys gives a union of value types. It's often used to get the union of a constant object's values: `typeof obj[keyof typeof obj]`.",
    sources: ["ts-indexed-access", "ts-keyof"],
  },
  {
    question: "What is `declare module '*.svg'` used for?",
    code: `declare module '*.svg' {
  const src: string;
  export default src;
}`,
    options: [
      "To describe the import type of assets handled by the bundler",
      "To load all of the project's SVG files at runtime as one bundle",
      "To forbid importing SVG files in the project's TypeScript code",
    ],
    answer: 0,
    explanation:
      "Wildcard module declarations describe what importing bundler-handled files returns (images, CSS Modules, `?raw`). Frameworks usually ship such declarations themselves (`next-env.d.ts`, `vite/client`).",
    sources: ["ts-dts", "ts-modules"],
  },
];

export default questions;
