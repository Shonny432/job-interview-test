import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is TypeScript?",
    options: [
      "A superset of JavaScript with static typing that compiles to JS",
      "A separate language with its own runtime that browsers execute directly",
      "A library for checking types while JavaScript code runs",
    ],
    answer: 0,
    explanation:
      "Any valid JS is almost always valid TS. Types are checked at compile time and then erased: plain JavaScript runs at runtime, and there are no type checks there. That's why external data (APIs, forms) is still validated at runtime — e.g. with Zod.",
    sources: ["ts-ts-for-js", "ts-handbook"],
  },
  {
    question: "Does TypeScript check types while the program is running?",
    options: [
      "No: types are erased at compile time; plain JS runs at runtime",
      "Yes: the compiler inserts checks before every function call",
      "Yes, but only for classes and interfaces with the `strict` modifier",
    ],
    answer: 0,
    explanation:
      "TypeScript is a development-time tool. If an API returns `null` instead of an object, types won't save you. For runtime checks, use `typeof`/`instanceof` and schema libraries (Zod, Valibot), from which you can also infer TS types.",
    sources: ["ts-ts-for-js"],
  },
  {
    question: "How does `unknown` differ from `any`?",
    options: [
      "You can't do anything with `unknown` without narrowing, while `any` disables checks",
      "`unknown` can be assigned to any variable, while `any` only to `object`",
      "They're synonyms; `unknown` is just a newer name for `any`",
    ],
    answer: 0,
    explanation:
      "`any` turns typing off and \"infects\" everything it touches. `unknown` is the safe counterpart: the value can be anything, but you can use it only after a check (`typeof x === 'string'`). For data from `JSON.parse` and `catch (e)`, `unknown` is the right choice.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "What does the `never` type mean?",
    options: [
      "The type of a value that can't exist: the function never returns control",
      "The same as `void`: the function returns nothing and finishes normally",
      "The same as `null`: the value is absent, but the variable exists",
    ],
    answer: 0,
    explanation:
      "`never` is the empty type. It's returned by functions that always throw or loop forever. It also appears when a union is fully narrowed — exhaustive `switch` checks are built on this. `void` means the function finishes but its result isn't used.",
    sources: ["ts-functions", "ts-narrowing"],
  },
  {
    question: "What type does TypeScript infer for `let x = 5;`?",
    options: ["`number`", "`5` (a literal type)", "`any` (no annotation)"],
    answer: 0,
    explanation:
      "Type inference: for `let`, the literal widens to `number` because the variable can be reassigned. For `const x = 5`, the type is the literal `5`. Explicit annotations are needed where inference is impossible or imprecise — e.g. in function parameters.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "What's the difference between `interface` and `type` for describing an object?",
    options: [
      "Both work; `interface` can be extended by merging, while `type` can express unions and more",
      "`interface` works only with classes, while `type` works only with primitive types",
      "`type` is deprecated and not recommended in new projects at all",
    ],
    answer: 0,
    explanation:
      "For objects they're almost interchangeable. Differences: interfaces with the same name merge (declaration merging) and are extended with `extends`. Type aliases describe unions, tuples, primitives, conditional and mapped types. Many teams use `interface` for objects and `type` for everything else.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "How do you declare an optional object property?",
    options: [
      "`{ name?: string }`",
      "`{ name: optional string }`",
      "`{ ?name: string }`",
    ],
    answer: 0,
    explanation:
      "A `?` after the name makes the property optional: its type is `string | undefined`, and the key itself may be missing. With the `exactOptionalPropertyTypes` flag, explicitly assigning `undefined` is distinguished from a missing key.",
    sources: ["ts-objects"],
  },
  {
    question: "What does the `readonly` modifier do in `{ readonly id: number }`?",
    options: [
      "Forbids reassigning the property at the type level; nothing changes at runtime",
      "Makes the object deeply immutable via `Object.freeze` at runtime",
      "Makes the property private and inaccessible outside the class",
    ],
    answer: 0,
    explanation:
      "`readonly` is just a compiler check: `obj.id = 2` causes an error. It's shallow — nested objects can be changed. At runtime the object is ordinary. For arrays there's `readonly string[]` / `ReadonlyArray<string>`, and deep freezing is done with `as const` or `Object.freeze`.",
    sources: ["ts-objects"],
  },
  {
    question: "What does the type `string | number` mean?",
    options: [
      "The value can be a string or a number (a union)",
      "The value is both a string and a number at once (an intersection)",
      "A string that contains only digits",
    ],
    answer: 0,
    explanation:
      "A union type allows any of its members. Until the type is narrowed, only operations common to all members are available. An intersection is written with `&` and requires matching all types at once (`A & B`).",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "What does the intersection `type Admin = User & { role: 'admin' }` give you?",
    options: [
      "A type with all the properties of `User` plus `role: 'admin'`",
      "A type with only the properties common to `User` and the object with `role`",
      "A type that can be either `User` or `{ role: 'admin' }`",
    ],
    answer: 0,
    explanation:
      "An intersection combines requirements: the value must satisfy both types. It's a way to compose types, similar to `interface Admin extends User`. Conflicting properties produce `never` for that property.",
    sources: ["ts-objects"],
  },
  {
    question: "What is the literal type `'left' | 'right'`?",
    options: [
      "A type that allows only the strings `'left'` or `'right'`",
      "Any string that starts with `left` or `right`",
      "An enum with the numeric values 0 and 1",
    ],
    answer: 0,
    explanation:
      "Literal types narrow a value down to specific constants. A union of literals is a common alternative to enums: `type Direction = 'left' | 'right'`. The compiler catches the typo `'lft'`, and the IDE suggests the options.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "How do you type a function that takes a string and returns a number?",
    options: [
      "`(s: string) => number`",
      "`(string) => number`",
      "`function(s): string -> number`",
    ],
    answer: 0,
    explanation:
      "In a function type, parameter names are required: `(s: string) => number`. `(string) => number` means a parameter named `string` of type `any`. A function declaration: `function len(s: string): number { ... }`.",
    sources: ["ts-functions"],
  },
  {
    question: "How do you declare an optional function parameter?",
    options: [
      "`function greet(name?: string)`",
      "`function greet(optional name: string)`",
      "`function greet(name: string = ?)`",
    ],
    answer: 0,
    explanation:
      "`?` makes the parameter optional; its type is `string | undefined`. The alternative is a default value: `greet(name = 'Guest')`, in which case the type is inferred as `string`. Optional parameters must come after required ones.",
    sources: ["ts-functions"],
  },
  {
    question: "What is a tuple in TypeScript?",
    options: [
      "A fixed-length array with a known type for each element",
      "An array of any length where all elements have the same type",
      "An immutable object with numeric keys instead of property names",
    ],
    answer: 0,
    explanation:
      "`type Point = [number, number]` — exactly two numbers. Tuples are handy for returning several values, as in `useState`: `[value, setter]`. Elements can be named (`[x: number, y: number]`) and made optional (`[string, number?]`).",
    sources: ["ts-objects"],
  },
  {
    question: "How do you type an array of strings?",
    options: ["`string[]` or `Array<string>`", "`[string]` or `Array[string]`", "`array of string` or `string()`"],
    answer: 0,
    explanation:
      "`string[]` and `Array<string>` are equivalent. `[string]` is a one-element tuple. For read-only arrays use `readonly string[]`.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "What is a generic?",
    options: [
      "A type parameter that lets you write code for different types while keeping the link between them",
      "The `any` type, used to temporarily turn off checks in functions",
      "A base class that all other types and interfaces inherit from",
    ],
    answer: 0,
    explanation:
      "`function first<T>(arr: T[]): T | undefined` — the result type is linked to the input array's type: `first([1, 2])` returns `number | undefined`. With `any`, that link is lost. Generics are used in `Array<T>`, `Promise<T>`, `useState<T>`.",
    sources: ["ts-generics"],
  },
  {
    question: "What does the utility type `Partial<User>` do?",
    options: [
      "Makes all properties of `User` optional",
      "Keeps only some properties, specified by the second parameter",
      "Makes all properties of `User` read-only",
    ],
    answer: 0,
    explanation:
      "`Partial<T>` adds `?` to every property — handy for update objects: `update(id, patch: Partial<User>)`. Selecting a subset is `Pick`, read-only is `Readonly`, all required is `Required`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "How do `Pick<User, 'id' | 'name'>` and `Omit<User, 'password'>` differ?",
    options: [
      "`Pick` keeps the listed properties, `Omit` keeps everything except them",
      "`Pick` makes properties required, `Omit` makes them optional",
      "They're synonyms with a different argument order",
    ],
    answer: 0,
    explanation:
      "Both create a new type from an existing one. `Pick` is an allowlist of keys, `Omit` a denylist. For example, `Omit<User, 'password'>` is a type for an API response without secret fields.",
    sources: ["ts-utility-types"],
  },
  {
    question: "What does `Record<string, number>` describe?",
    options: [
      "An object whose keys are strings and values are numbers",
      "An array of `[string, number]` pairs sorted by key",
      "A `Map` collection from the JavaScript standard library",
    ],
    answer: 0,
    explanation:
      "`Record<K, V>` is an object with keys `K` and values `V`. With union keys it requires all of them: `Record<'en' | 'uk', string>`. It isn't a `Map`: `Map` is a separate data structure with `get`/`set` methods.",
    sources: ["ts-utility-types"],
  },
  {
    question: "What does `keyof { id: number; name: string }` return?",
    options: ["`'id' | 'name'`", "`number | string`", "`['id', 'name']`"],
    answer: 0,
    explanation:
      "`keyof` returns a union of a type's keys. Value types are obtained via indexed access: `T['id']` or `T[keyof T]`. `keyof` doesn't exist at runtime — use `Object.keys` for an array of keys.",
    sources: ["ts-keyof"],
  },
  {
    question: "What does `typeof` do in a type position: `type Config = typeof config`?",
    options: [
      "Takes the type of the `config` variable inferred by the compiler",
      "Returns the string `'object'`, as in JavaScript",
      "Checks the type of `config` at runtime",
    ],
    answer: 0,
    explanation:
      "In expressions, `typeof` is the JS operator that returns a string. In a type position, it's a TypeScript operator that extracts a value's type. Handy for avoiding duplication: `const routes = {...} as const; type Routes = typeof routes`.",
    sources: ["ts-typeof"],
  },
  {
    question: "What's the right way to type a React component's props?",
    options: [
      "`function Button({ label }: { label: string })` or via `type Props`",
      "`function Button(props: any)` — React types props by itself",
      "`function Button<label: string>()` — props are passed as a generic",
    ],
    answer: 0,
    explanation:
      "Props are a plain object, typed with an interface or a type alias. `React.FC` isn't required. For `children` use `React.ReactNode`; to extend native attributes, use `React.ComponentProps<'button'>`.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "What is the type of the event in `onChange` for an `<input>` in React?",
    options: [
      "`React.ChangeEvent<HTMLInputElement>`",
      "`Event` — the native DOM event",
      "`InputEvent<string>` from the standard library",
    ],
    answer: 0,
    explanation:
      "React uses its own synthetic events: `ChangeEvent`, `MouseEvent<HTMLButtonElement>`, `FormEvent<HTMLFormElement>` and so on. The generic specifies the element, so `e.target.value` is typed. If the handler is inline, the type is inferred automatically.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "How do you specify the state type if the initial value is `null`: `useState(null)`?",
    options: [
      "`useState<User | null>(null)`",
      "`useState(null as User)`",
      "No need to specify it; TS infers `User`",
    ],
    answer: 0,
    explanation:
      "Without a generic, the type is inferred as `null`, and you won't be able to assign a user later. An explicit generic describes all possible states. The cast `null as User` lies to the compiler: the code will then assume a user always exists.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "What does the type assertion `value as string` do?",
    options: [
      "Tells the compiler to treat the value as a string, with no runtime check",
      "Converts the value to a string, like `String(value)`",
      "Checks at runtime that the value is a string and throws otherwise",
    ],
    answer: 0,
    explanation:
      "`as` is a hint to the compiler, not a conversion: if it's actually a number, the error shows up later. Use it when you know more than the compiler (e.g. the element type from `querySelector`), and prefer narrowing via checks.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "What does the `!` operator do in `user!.name`?",
    options: [
      "Asserts the value isn't `null`/`undefined`, with no runtime check",
      "Logical negation of `user`, like the `!` operator in JavaScript",
      "Makes the property access safe, like optional chaining `?.`",
    ],
    answer: 0,
    explanation:
      "A non-null assertion removes `null | undefined` from the type. If the value is `null` after all, you get a runtime error. Safer options are an explicit check or `user?.name` (optional chaining, returns `undefined`).",
    sources: ["ts-everyday-types"],
  },
  {
    question: "What does the `strict` flag in `tsconfig.json` enable?",
    options: [
      "A set of strict checks: `strictNullChecks`, `noImplicitAny` and others",
      "`'use strict'` mode in the compiled JavaScript and nothing else",
      "A ban on using `any` and `as` in any form",
    ],
    answer: 0,
    explanation:
      "`strict: true` enables a family of flags: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `useUnknownInCatchVariables` and others. New projects should start with strict. It doesn't forbid explicit `any` — there are linter rules for that.",
    sources: ["ts-strict", "ts-tsconfig"],
  },
  {
    question: "What does `strictNullChecks` give you?",
    options: [
      "`null` and `undefined` become separate types that must be handled explicitly",
      "It forbids `null` in code entirely, allowing only `undefined`",
      "It automatically replaces `null` with `undefined` when compiling to JS",
    ],
    answer: 0,
    explanation:
      "Without the flag, `null` can be assigned to anything, and \"cannot read property of null\" errors aren't caught. With it, `string` doesn't include `null`: you write `string | null` and check the value before use. It's one of the most useful flags.",
    sources: ["ts-strict", "ts-everyday-types"],
  },
  {
    question: "How do you narrow `string | number` to `string` inside a condition?",
    options: [
      "`if (typeof value === 'string') { ... }`",
      "`if (value is string) { ... }`",
      "`if (value instanceof String) { ... }`",
    ],
    answer: 0,
    explanation:
      "TypeScript analyzes control flow: after a `typeof` check, the type inside the branch is narrowed to `string`, and in `else` to `number`. `instanceof String` checks for a wrapper object, not a primitive. The `x is T` syntax is used in the signature of type guard functions.",
    sources: ["ts-narrowing"],
  },
  {
    question: "How does `enum Color { Red, Green }` differ from `type Color = 'red' | 'green'`?",
    options: [
      "An `enum` creates an object at runtime; a literal union exists only in types",
      "A literal union creates an object at runtime; an `enum` is only a type",
      "No difference: the compiler generates the same JavaScript for both",
    ],
    answer: 0,
    explanation:
      "A regular `enum` compiles to a JS object (a numeric one with reverse mapping). A string union adds nothing to the bundle and is compatible with JSON and APIs. Many teams prefer unions or an `as const` object. Also, enums are incompatible with `erasableSyntaxOnly` mode.",
    sources: ["ts-enums"],
  },
  {
    question: "What does `as const` do in `const roles = ['admin', 'user'] as const`?",
    options: [
      "Makes the array a readonly tuple with the literal types `'admin'` and `'user'`",
      "Freezes the array at runtime via `Object.freeze` during compilation",
      "Turns the array into an `enum` with string values",
    ],
    answer: 0,
    explanation:
      "Without `as const`, the type is `string[]`. With it, it's `readonly ['admin', 'user']`, and you can derive a union: `type Role = typeof roles[number]` → `'admin' | 'user'`. The object isn't frozen at runtime.",
    sources: ["ts-everyday-types", "ts-typeof"],
  },
  {
    question: "What is structural typing in TypeScript?",
    options: [
      "Type compatibility is determined by shape (the set of properties), not by name",
      "Types are compatible only if they're declared with the same name",
      "Typing where every object must inherit from a class",
    ],
    answer: 0,
    explanation:
      "If an object has all the properties a type requires, it fits — even if its type has a different name (duck typing). That's why `Point2D` and `Vector2D` with the same fields are interchangeable. Nominal behavior can be emulated with branded types.",
    sources: ["ts-type-compatibility"],
  },
  {
    question: "What is a `.d.ts` file?",
    options: [
      "A declaration file: it describes the types of existing JS code without implementation",
      "Compiled TypeScript for debugging in the browser via source maps",
      "A file with type tests run by `tsc --test`",
    ],
    answer: 0,
    explanation:
      "Declarations let you use JS libraries with types. They're written by hand, generated by the compiler (`declaration: true`) or installed from DefinitelyTyped. A `.d.ts` file contains no executable code.",
    sources: ["ts-dts"],
  },
  {
    question: "Why install packages like `@types/lodash`?",
    options: [
      "To get types for a library written in JS without built-in declarations",
      "To install the TypeScript version of a library instead of its JS version",
      "To enable runtime type checking for calls to that library",
    ],
    answer: 0,
    explanation:
      "`@types/*` packages are published from the DefinitelyTyped repository and contain only `.d.ts` files. Many modern libraries ship their own types — then `@types` isn't needed. They're usually installed as devDependencies.",
    sources: ["ts-dts"],
  },
  {
    question: "What does `tsc` compile a TypeScript file into?",
    options: [
      "JavaScript without type annotations (and optionally `.d.ts` and source maps)",
      "Machine code for the chosen platform, like the Go compiler",
      "A WebAssembly module loaded by the browser",
    ],
    answer: 0,
    explanation:
      "The compiler checks types and outputs JS for the specified `target`. In modern projects, building is often done by esbuild, SWC or Babel (which only strip types), and `tsc --noEmit` is run separately for checking.",
    sources: ["ts-tsconfig", "ts-ts-for-js"],
  },
  {
    question: "What is the type of `e` in `catch (e)` with `strict` enabled?",
    options: ["`unknown`", "`Error` (the built-in class)", "`any` (as without strict)"],
    answer: 0,
    explanation:
      "With the `useUnknownInCatchVariables` flag (part of strict), `e` is `unknown`, since anything can be thrown, not just an `Error`. Check before use: `if (e instanceof Error) console.log(e.message)`.",
    sources: ["ts-strict", "ts-narrowing"],
  },
  {
    question: "What does the return type `void` mean?",
    options: [
      "The function returns nothing useful; the result isn't used",
      "The function always returns `null` instead of a value",
      "The function never finishes or throws an error",
    ],
    answer: 0,
    explanation:
      "`void` is used for functions without a `return` value. Caveat: the callback type `() => void` allows passing a function that returns something (the result is ignored) — that's why `arr.forEach(x => list.push(x))` compiles. A function that never finishes has the type `never`.",
    sources: ["ts-functions"],
  },
  {
    question: "How do you describe an object with arbitrary string keys and number values using an index signature?",
    options: [
      "`{ [key: string]: number }`",
      "`{ key: string => number }`",
      "`{ *: number }`",
    ],
    answer: 0,
    explanation:
      "An index signature describes a \"dictionary\". The equivalent is `Record<string, number>`. With the `noUncheckedIndexedAccess` flag, `obj[key]` returns `number | undefined`, which better reflects reality.",
    sources: ["ts-objects"],
  },
  {
    question: "How do you extend an interface?",
    options: [
      "`interface Admin extends User { role: string }`",
      "`interface Admin implements User { role: string }`",
      "`interface Admin = User + { role: string }`",
    ],
    answer: 0,
    explanation:
      "An interface is extended with `extends` (from several at once: `extends A, B`). `implements` is used by classes to guarantee they match an interface. For type aliases, the counterpart is an intersection `User & { role: string }`.",
    sources: ["ts-objects"],
  },
  {
    question: "What does `implements` do in a class?",
    options: [
      "Checks that the class matches the interface; it doesn't inherit anything",
      "Inherits the interface's method and property implementations into the class",
      "Creates an instance of the interface accessible via `this`",
    ],
    answer: 0,
    explanation:
      "`class Cat implements Animal` — the compiler checks that the class has all the members of `Animal`. You have to write the implementation yourself, unlike `extends` for classes. Interfaces don't exist at runtime.",
    sources: ["ts-classes"],
  },
  {
    question: "How does `private` in TypeScript differ from `#field` in JavaScript?",
    options: [
      "`private` is only a compiler check, `#field` is privacy at runtime",
      "No difference: `#field` is just compiled into the `private` modifier",
      "`#field` works only in TypeScript and isn't supported by JS engines",
    ],
    answer: 0,
    explanation:
      "After compilation, a `private` field is an ordinary property that can be read via `obj['field']`. `#field` private fields are supported by the JS engine and can't be accessed from outside the class at all. The `public`, `protected` and `private` modifiers are TypeScript tools.",
    sources: ["ts-classes"],
  },
  {
    question: "How do you type an async function that returns a user?",
    options: [
      "`async function getUser(): Promise<User>`",
      "`async function getUser(): User`",
      "`async function getUser(): Async<User>`",
    ],
    answer: 0,
    explanation:
      "An async function always returns a promise, so the result type is `Promise<User>`. The annotation `User` causes an error. You can extract the promise's value type with `Awaited<ReturnType<typeof getUser>>`.",
    sources: ["ts-functions", "ts-utility-types"],
  },
  {
    question: "What does TypeScript do with `const el = document.getElementById('app')`?",
    options: [
      "Infers `HTMLElement | null` and requires a `null` check",
      "Infers `HTMLDivElement` automatically from the page markup",
      "Infers `any`, because DOM APIs aren't typed in TypeScript",
    ],
    answer: 0,
    explanation:
      "The element may not exist, so the type includes `null`. For a specific type, use `querySelector<HTMLInputElement>('#email')` or an `instanceof HTMLInputElement` check. DOM types are part of the standard library (`lib: ['dom']`).",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "What is a union with a common discriminant field?",
    code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };`,
    options: [
      "A discriminated union: TS narrows the type by `kind` in `switch`/`if`",
      "An error: a union can't use identical property names",
      "An intersection of two objects with a `kind` property",
    ],
    answer: 0,
    explanation:
      "The check `if (shape.kind === 'circle')` narrows the type, and `shape.radius` is available inside. It's the main way to model states: `{ status: 'loading' } | { status: 'success'; data } | { status: 'error'; error }`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "How do you get the return type of the `createStore` function?",
    options: [
      "`ReturnType<typeof createStore>`",
      "`typeof createStore()` with a function call",
      "`ResultOf<createStore>` from the standard library",
    ],
    answer: 0,
    explanation:
      "`ReturnType` takes a function type, so `typeof` is needed. Similarly, `Parameters<typeof fn>` gives a tuple of parameters. This way types are derived from the implementation instead of being duplicated.",
    sources: ["ts-utility-types", "ts-typeof"],
  },
  {
    question: "What happens when you pass an object literal with an extra property?",
    code: `type User = { name: string };
const u: User = { name: 'Ann', age: 30 };`,
    options: [
      "An error: literals are subject to excess property checks",
      "It's fine: extra properties are always allowed",
      "The `age` property is silently removed during compilation",
    ],
    answer: 0,
    explanation:
      "The excess property check applies only to fresh object literals — it's protection against typos. If you first put the object into a variable and then assign it, there's no error (structural compatibility). The compiler doesn't remove anything.",
    sources: ["ts-objects", "ts-type-compatibility"],
  },
  {
    question: "What is `tsconfig.json`?",
    options: [
      "A file with compiler settings and the list of project files",
      "A file listing npm dependencies for TypeScript",
      "A file with types for all of the project's modules",
    ],
    answer: 0,
    explanation:
      "In `compilerOptions` you set `target`, `module`, `strict`, `paths` and so on, while `include`/`exclude` define which files belong to the project. Dependencies are described by `package.json`, and types by `.d.ts` files. Configs can be inherited via `extends`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "How do you gradually migrate a JS project to TypeScript?",
    options: [
      "Enable `allowJs`, rename files one by one and tighten the checks",
      "Rewrite the whole project in TS at once, otherwise it won't build",
      "Add `// @ts-nocheck` to every file forever",
    ],
    answer: 0,
    explanation:
      "`allowJs` lets you mix JS and TS, while `checkJs` and JSDoc give you types without renaming. Start with leaf modules and utilities, then tighten the `strict` flags. A full rewrite is risky and halts development.",
    sources: ["ts-migrating"],
  },
  {
    question: "How does `Required<T>` differ from `Partial<T>`?",
    options: [
      "`Required` makes all properties required, `Partial` makes them optional",
      "`Required` removes the `readonly` modifier, while `Partial` adds it",
      "They're synonyms: both make an object's properties required",
    ],
    answer: 0,
    explanation:
      "They're opposites: `Required` removes the `?` modifier, `Partial` adds it. `readonly` is handled by `Readonly<T>`. All these utilities are mapped types that you can write yourself.",
    sources: ["ts-utility-types"],
  },
  {
    question: "How do you specify that a function accepts any number of numbers?",
    options: [
      "`function sum(...nums: number[])`",
      "`function sum(nums...: number)`",
      "`function sum(*nums: number)`",
    ],
    answer: 0,
    explanation:
      "A rest parameter collects the arguments into an array; its type is an array or a tuple. Call it as `sum(1, 2, 3)` or `sum(...arr)`.",
    sources: ["ts-functions"],
  },
];

export default questions;
