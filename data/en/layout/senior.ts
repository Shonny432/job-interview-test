import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "How do `@layer` cascade layers affect style priority?",
    options: [
      "Layers are sorted by the specificity of their strongest selector",
      "Layer order beats specificity: the later layer wins",
      "Layers affect only `!important`; normal rules are untouched",
    ],
    answer: 1,
    explanation:
      "The cascade compares layers first and only then specificity within a layer. So `.btn` in the `components` layer beats `#app .btn` in an earlier `base` layer. Unlayered styles are stronger than any layer. For `!important` the order is reversed: important declarations in an earlier layer win. Tailwind v4 builds its styles on the `theme`, `base`, `components` and `utilities` layers.",
    sources: ["mdn-cascade-layers", "mdn-cascade"],
  },
  {
    question: "How do normal (non-`!important`) layered and unlayered styles rank against each other?",
    options: [
      "Unlayered styles are stronger than any layer",
      "Unlayered styles are weaker than any layer",
      "Unlayered styles count as a separate layer at their declaration position",
    ],
    answer: 0,
    explanation:
      "Unlayered styles implicitly go into a \"last\" layer and beat all named layers. That lets you wrap third-party CSS in `@layer vendor` and easily override it with your own styles. With `!important` the logic flips: important layered styles beat important unlayered ones.",
    sources: ["mdn-cascade-layers"],
  },
  {
    question: "What does `@scope (.card) to (.card__content) { img { ... } }` do?",
    options: [
      "Styles `img` inside `.card`, but not inside `.card__content`",
      "Styles `img` only inside a `.card__content` nested in `.card`",
      "Creates a Shadow DOM for `.card` and isolates its styles from the page",
    ],
    answer: 0,
    explanation:
      "`@scope` defines a scope root and an optional \"lower boundary\" (donut scope): styles apply inside `.card` but don't reach into `.card__content` and its descendants. In addition, with equal specificity the rule with the closer root wins (scoping proximity). `@scope` doesn't create a Shadow DOM.",
    sources: ["mdn-scope"],
  },
  {
    question: "What problem does `subgrid` solve?",
    options: [
      "It lets a grid have more than 12 columns without nested containers",
      "It gives a nested grid its parent's tracks, aligning parts across cards",
      "It automatically creates a responsive grid without media queries or `minmax()`",
    ],
    answer: 1,
    explanation:
      "With `grid-template-rows: subgrid` a child grid inherits the parent's lines. The classic example is a row of cards whose titles, text and buttons should line up even when one card's title wraps to two lines. Without subgrid, each card aligns independently.",
    sources: ["mdn-subgrid", "css-tricks-grid"],
  },
  {
    question: "Which stages does the browser go through to update a frame after a style change?",
    options: [
      "Paint → Layout → Style → Composite",
      "Style → Layout → Paint → Composite",
      "Layout → Composite → Style → Paint",
    ],
    answer: 1,
    explanation:
      "The rendering pipeline: style recalculation (Style) → geometry (Layout/Reflow) → painting layer pixels (Paint) → layer composition (Composite). Changing `width` runs everything from Layout, changing `color` from Paint, while `transform` and `opacity` can get away with Composite alone.",
    sources: ["webdev-rendering", "webdev-animations"],
  },
  {
    question: "What is layout thrashing (forced synchronous layout)?",
    code: `for (const el of items) {
  el.style.width = box.offsetWidth + "px";
}`,
    options: [
      "Repeated layout recalculation caused by interleaving reads and writes in a loop",
      "When a CSS animation of `width` recalculates layout every frame",
      "A browser error caused by an overly deep DOM tree on the page",
    ],
    answer: 0,
    explanation:
      "Reading `offsetWidth` after writing a style forces the browser to recalculate layout synchronously to return an up-to-date value. In a loop this happens on every iteration. The fix is to read all values first, then write (batch reads/writes), or move the read out of the loop. Libraries like fastdom help too.",
    sources: ["webdev-layout-thrashing", "webdev-rendering"],
  },
  {
    question: "What does `contain: layout paint` (or `contain: content`) give you?",
    options: [
      "A promise that contents don't affect outside layout and paint, narrowing recalculation",
      "It forbids the element from changing size after its first paint",
      "It only clips the content like `overflow: hidden`, but without a scrollbar",
    ],
    answer: 0,
    explanation:
      "CSS Containment isolates a subtree: changes inside don't force layout and paint of the rest of the page. Useful for widgets, feeds and complex components. Side effect: `paint` clips content to the bounds and creates a containing block and a stacking context, so don't apply it thoughtlessly.",
    sources: ["mdn-contain"],
  },
  {
    question: "How does `content-visibility: auto` speed up long pages?",
    options: [
      "It lazy-loads images and iframes inside the element, like `loading=lazy`",
      "It skips layout and paint of off-screen elements until they're needed",
      "It removes invisible elements from the DOM and restores them on scroll",
    ],
    answer: 1,
    explanation:
      "The browser doesn't render sections outside the viewport, saving time on the first paint. To keep the scrollbar from jumping, set an expected size via `contain-intrinsic-size: auto 500px`. The DOM stays intact: find-in-page and accessibility keep working, unlike virtualization.",
    sources: ["mdn-content-visibility", "webdev-content-visibility"],
  },
  {
    question: "Why don't `::before` and `::after` work on `<img>` and `<input>`?",
    options: [
      "These elements are `display: inline` by default, and pseudo-elements need a block",
      "They are replaced or void elements — there's no content to insert into",
      "It's a known Chromium bug; in Firefox the pseudo-elements work on them",
    ],
    answer: 1,
    explanation:
      "`::before`/`::after` are inserted inside the element, before and after its content. The content of `<img>`, `<video>`, `<iframe>` is replaced by an external resource, while `<input>` and `<br>` are void elements. The workaround is to wrap the element in a container and attach the pseudo-element to it. `display` is irrelevant: pseudo-elements work on an `inline` `<span>`.",
    sources: ["mdn-replaced-elements", "mdn-pseudo-elements"],
  },
  {
    question: "What is `float` still appropriate for in modern layouts?",
    options: [
      "For main column layouts: it's more reliable than Grid in old browsers",
      "For wrapping text around an image or a pull quote inside an article",
      "Nothing: `float` is deprecated and removed from the specification",
    ],
    answer: 1,
    explanation:
      "Page layouts have long been built with Flexbox and Grid, but text wrapping — `float`'s original purpose — has no replacement. Combined with `shape-outside`, text can even wrap along an image's shape. The property is neither deprecated nor removed.",
    sources: ["mdn-float", "mdn-bfc"],
  },
  {
    question: "Why is `em` often recommended over `px` for media query breakpoints?",
    options: [
      "`em` in media queries respects the user-set font size",
      "`px` in media queries works incorrectly in Safari on iOS",
      "`em` in media queries is relative to the parent element's width",
    ],
    answer: 0,
    explanation:
      "In media queries, `em` and `rem` are based on the browser's initial font size (usually 16px), not on page styles. If a user enlarges the base font, the layout switches to the \"narrow\" version sooner — text won't be cramped. With `px` that doesn't happen. Tailwind v4 defines breakpoints in `rem` for the same reason.",
    sources: ["mdn-media-queries", "mdn-units"],
  },
  {
    question: "What happens to a `position: fixed` element if an ancestor has `transform: translateZ(0)`?",
    options: [
      "Nothing: `fixed` is always positioned relative to the browser window",
      "It becomes positioned relative to that ancestor",
      "The element stops rendering while the ancestor has a `transform`",
    ],
    answer: 1,
    explanation:
      "An ancestor with `transform`, `filter`, `perspective`, `contain: paint` or `will-change: transform` becomes the containing block for `fixed` descendants. A modal inside an animated container suddenly \"sticks\" to the container instead of the window. That's why modals and toasts are rendered through a portal at `body` level.",
    sources: ["mdn-containing-block", "mdn-position"],
  },
  {
    question: "How does `overflow: clip` differ from `overflow: hidden`?",
    options: [
      "`clip` clips without creating a scroll container and doesn't break `sticky`",
      "`clip` clips only horizontally, while `hidden` clips on both axes",
      "They're synonyms: `clip` is just a new spelling of the same value",
    ],
    answer: 0,
    explanation:
      "`overflow: hidden` makes the element a scroll container (it can be scrolled programmatically), so sticky descendants start sticking to it. `clip` simply clips painting, forbids any scrolling and doesn't create a BFC. Axes can be controlled separately (`overflow-x: clip`), and a clip margin can be set with `overflow-clip-margin`.",
    sources: ["mdn-overflow", "mdn-position"],
  },
  {
    question: "How should Sass modules be included now that `@import` is deprecated?",
    options: [
      "With `@require`, which replaced `@import` in Dart Sass 2",
      "With namespaced `@use` and `@forward` for re-exporting",
      "Only with plain CSS `@import url()`, since Sass modules were removed",
    ],
    answer: 1,
    explanation:
      "`@use 'tokens'` loads a module once and namespaces it (`tokens.$primary`) without polluting the global scope. `@forward` re-exports a module's members to build a style library's public API. Sass `@import` is deprecated and will be removed in Dart Sass 3.0. There's no `@require` directive.",
    sources: ["sass-use", "sass-import-deprecation"],
  },
  {
    question: "How does Dart Sass differ from Node Sass?",
    options: [
      "Node Sass (LibSass) is deprecated; Dart Sass is the primary implementation",
      "Dart Sass works only in Flutter projects and requires the Dart SDK",
      "Node Sass is faster and supports more syntax, including `@use`",
    ],
    answer: 0,
    explanation:
      "LibSass and Node Sass are deprecated and don't support `@use` or the module system. Dart Sass is the reference implementation, published on npm as `sass` (and `sass-embedded`). Migration means removing `node-sass`, installing `sass`, and gradually moving from `@import` to `@use` and from `/` division to `math.div`.",
    sources: ["sass-docs", "sass-import-deprecation"],
  },
  {
    question: "What problems does runtime CSS-in-JS (styled-components, Emotion) have with SSR and React Server Components?",
    options: [
      "None: they're fully compatible with Server Components and streaming",
      "Styles are created at runtime: they must be collected during SSR, and RSC has no context",
      "They can't define media queries and pseudo-classes during SSR",
    ],
    answer: 1,
    explanation:
      "Runtime CSS-in-JS computes styles during render and injects them into the document: on the server the styles must be collected and inlined into HTML (otherwise you get a flash), and on the client you pay the runtime cost. They rely on React Context, which Server Components lack, so such components must be client components. Alternatives: CSS Modules, Tailwind, zero-runtime solutions (vanilla-extract, Linaria, Panda).",
    sources: ["next-css", "react-server-components"],
  },
  {
    question: "Which techniques reduce the weight and performance impact of a custom web font?",
    options: [
      "Convert the font into a PNG sprite and draw the letters as backgrounds",
      "Load all weights at once so the browser caches them in advance",
      "WOFF2, subsetting, `preload` of the main weight and `font-display`",
    ],
    answer: 2,
    explanation:
      "WOFF2 compresses best. Subsetting removes unused glyphs (e.g. keeping only Latin and Cyrillic), and `unicode-range` lets the browser download only the subsets it needs. `preload` speeds up the main weight, `font-display` removes invisible text. A variable font replaces several weight files with one. In Next.js, `next/font` handles much of this.",
    sources: ["webdev-font-best-practices", "mdn-font-display", "next-fonts"],
  },
  {
    question: "How does asset bundling strategy change when moving from HTTP/1.1 to HTTP/2+?",
    options: [
      "Nothing changes: the protocol has no effect on frontend builds",
      "With HTTP/2 you should concatenate absolutely every file into one bundle",
      "Multiplexing makes requests cheaper, so smaller chunks pay off",
    ],
    answer: 2,
    explanation:
      "With HTTP/1.1 browsers keep ~6 connections per domain, so we concatenated files, used sprites and domain sharding. HTTP/2 and HTTP/3 multiplex requests over one connection, making those hacks less necessary or even harmful: one huge bundle invalidates the whole cache on any change. Dropping bundling entirely is still rare — compression and import chains still matter.",
    sources: ["webdev-render-blocking", "mdn-cache-control"],
  },
  {
    question: "What is a performance budget?",
    options: [
      "The team's budget for CDN, hosting and paid monitoring tools",
      "Agreed limits on metrics (JS weight, LCP) that are checked in CI",
      "The maximum number of animations and videos allowed on a page",
    ],
    answer: 1,
    explanation:
      "A performance budget fixes thresholds — e.g. \"homepage JS ≤ 170 KB gzipped\" or \"LCP ≤ 2.5 s on 4G\" — checked automatically (Lighthouse CI, size-limit, bundlesize). Regressions are caught before release, and decisions about new libraries take their cost into account.",
    sources: ["webdev-performance-budgets", "webdev-vitals"],
  },
  {
    question: "How does lab data (Lighthouse) differ from field data (CrUX, RUM)?",
    options: [
      "Lab is a controlled measurement; field data comes from real users",
      "Lab data is more accurate and matches field data when configured correctly",
      "Field data is collected only for mobile devices on 4G",
    ],
    answer: 0,
    explanation:
      "Lab data is reproducible and handy for debugging but doesn't reflect the real variety of devices, networks and scenarios. Field data (Chrome UX Report, your own RUM via `web-vitals`) shows what users actually experience, and Google assesses Core Web Vitals from it. INP can't even be measured in the lab without real interactions.",
    sources: ["webdev-lab-field", "webdev-vitals"],
  },
  {
    question: "Which three metrics make up Core Web Vitals today?",
    options: [
      "FCP, TTI and TBT",
      "LCP, INP and CLS",
      "LCP, FID and CLS",
    ],
    answer: 1,
    explanation:
      "LCP — loading speed of the main content (good ≤ 2.5 s), INP — responsiveness to interactions (≤ 200 ms), CLS — visual stability (≤ 0.1). INP replaced FID in March 2024 because FID only measured the delay of the first interaction. FCP and TBT are useful but supporting metrics.",
    sources: ["webdev-vitals", "webdev-inp"],
  },
  {
    question: "How do you build a horizontal gallery with slides that \"snap\" into place without JavaScript?",
    options: [
      "`scroll-snap-type: x mandatory` on the track, `scroll-snap-align` on slides",
      "`position: sticky` and `left: 0` on every slide inside the track",
      "`@keyframes` with an infinite `translateX` animation on the track",
    ],
    answer: 0,
    explanation:
      "CSS Scroll Snap: a container with `overflow-x: auto` and `scroll-snap-type: x mandatory`, slides with `scroll-snap-align`. The browser settles the scroll on the nearest slide and supports touch, wheel and keyboard. `scroll-padding` accounts for fixed elements. JS is only needed for prev/next buttons and indicators.",
    sources: ["mdn-scroll-snap"],
  },
  {
    question: "What does `@property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }` enable?",
    options: [
      "Declaring a typed variable that the browser can animate",
      "Creating a constant that can't be overridden in the cascade",
      "Attaching a JavaScript handler called when the property changes",
    ],
    answer: 0,
    explanation:
      "A regular CSS variable is just a string, so it jumps during animation. A property registered with `@property` (part of Houdini) has a type and therefore animates smoothly: that's how rotating conic gradients and animating individual color channels are done. You can also disable inheritance and set an initial value.",
    sources: ["mdn-property-rule", "mdn-custom-properties"],
  },
  {
    question: "How do you style the inside of a Web Component when Shadow DOM isolates its styles?",
    options: [
      "With global selectors plus `!important` — they pierce the shadow root",
      "Through CSS variables (they inherit across the boundary) and `::part()`",
      "You can't: Shadow DOM completely forbids any outside styling",
    ],
    answer: 1,
    explanation:
      "Outside selectors don't reach into a shadow root, even with `!important`. But inherited properties (`color`, `font`) and custom properties cross the boundary — theming is built on them. The component author can expose parts via `part=\"label\"`, which are styled from outside with `my-el::part(label)`. Slotted content (light DOM) is styled with regular CSS.",
    sources: ["mdn-shadow-dom", "mdn-web-components"],
  },
  {
    question: "How do `min-content`, `max-content` and `fit-content` differ as width values?",
    options: [
      "They're synonyms for `0`, `100%` and `auto`, added for readability",
      "Minimum by the longest word, width without wrapping, and capped `max-content`",
      "They're values for Grid tracks only and don't work on regular blocks",
    ],
    answer: 1,
    explanation:
      "These are intrinsic sizes that depend on content. `width: fit-content` is handy for fluid badges and buttons that shouldn't stretch to full width. In Grid they're used in track definitions: `grid-template-columns: max-content 1fr`.",
    sources: ["mdn-intrinsic-size", "mdn-grid"],
  },
  {
    question: "What creates a new stacking context even without `position` and `z-index`?",
    options: [
      "`opacity` below 1, `transform`, `filter`, `isolation: isolate`",
      "Any element with `display: block` or `display: flex`",
      "Non-zero `margin` or `padding`, and also `border`",
    ],
    answer: 0,
    explanation:
      "A stacking context is created by: the root element, positioned elements with `z-index`, flex/grid items with `z-index`, `opacity < 1`, `transform`, `filter`, `perspective`, `mix-blend-mode`, `isolation: isolate`, `contain: paint`, and `will-change` with such properties. `isolation: isolate` is the \"cleanest\" way to create one without side effects.",
    sources: ["mdn-stacking-context"],
  },
  {
    question: "What conditions make the vertical margins of a parent and its first child collapse?",
    options: [
      "Only if the parent has `display: flex` or `grid`",
      "Only if both margins are negative or zero",
      "If no `border`, `padding` or text separates them and there's no BFC",
    ],
    answer: 2,
    explanation:
      "The first child's `margin-top` \"falls through\" outside the parent if nothing separates them. Collapsing is prevented by `padding` or `border` on the parent, `display: flow-root`, or a flex/grid container — margins inside those never collapse. With negative values, the result is the largest positive plus the most negative.",
    sources: ["mdn-margin-collapse", "mdn-bfc"],
  },
  {
    question: "Why can a long word or a wide table \"blow out\" a `1fr` grid column?",
    options: [
      "`1fr` means `minmax(auto, 1fr)`: the track can't be narrower than min-content",
      "`fr` is computed from the browser window's width, not the container's",
      "It's an engine bug that's already fixed in the latest browsers",
    ],
    answer: 0,
    explanation:
      "For `fr` tracks the default minimum is `auto`, i.e. no smaller than the minimum content. A wide item grows the track, and the columns stop being equal. The fix is `minmax(0, 1fr)` in the track definition or `min-width: 0` / `overflow: hidden` on the item.",
    sources: ["mdn-minmax", "mdn-grid"],
  },
  {
    question: "Why is `oklch()` more convenient than `hsl()` for design systems?",
    options: [
      "It renders colors more accurately on old sRGB monitors than `hsl()`",
      "It's perceptually uniform: equal L looks equally light across hues",
      "It's more compact, written in hexadecimal form with alpha",
    ],
    answer: 1,
    explanation:
      "In HSL, yellow and blue with the same \"lightness\" look completely different, so palettes must be tuned by hand. OKLCH is based on a perception model, so shade scales are generated predictably, which simplifies contrast. Tailwind v4's default palette is defined in OKLCH.",
    sources: ["mdn-color", "tw-v4"],
  },
  {
    question: "What is `color-mix(in oklch, var(--brand) 80%, white)` for?",
    options: [
      "Mixing colors in CSS — a light brand tint without hardcoding",
      "Automatically picking a contrasting text color on the brand background",
      "Smoothly animating between two colors over 80% of the duration",
    ],
    answer: 0,
    explanation:
      "`color-mix()` blends colors in a given color space at a given ratio. It lets you derive hover states, translucent variants (`color-mix(in srgb, red, transparent 50%)`) and tints from a single brand variable. Tailwind v4 uses it to implement opacity modifiers like `bg-brand/50`.",
    sources: ["mdn-color-mix"],
  },
  {
    question: "What does native CSS nesting (`&`) give you?",
    code: `.card {
  padding: 1rem;
  &:hover { background: #eee; }
  .title { font-weight: 600; }
}`,
    options: [
      "Nothing: without Sass or PostCSS this code is invalid in the browser",
      "Browsers understand nesting natively; `&` refers to the parent selector",
      "Nested rules apply only to direct children of `.card`",
    ],
    answer: 1,
    explanation:
      "CSS Nesting is supported by all modern browsers. Differences from Sass: nested selectors behave as if wrapped in `:is()`, which affects specificity, and you can't concatenate strings like `&__title` — that's a preprocessor-only feature.",
    sources: ["mdn-nesting"],
  },
  {
    question: "What is CSS Anchor Positioning used for?",
    options: [
      "Tethering a tooltip or popover to another element without JS calculations",
      "Smoothly scrolling the page to a `#section` anchor when a link is clicked",
      "Pinning an element to the bottom of the screen over content, like `sticky`",
    ],
    answer: 0,
    explanation:
      "An anchor is declared with `anchor-name: --btn`, and the positioned element references it via `position-anchor` and the `anchor()` function (or `position-area`). Fallbacks exist for lack of space (`position-try-fallbacks`). This used to require libraries like Floating UI. Browser support isn't complete everywhere yet — check it before use.",
    sources: ["mdn-anchor-positioning"],
  },
  {
    question: "What is the View Transitions API?",
    options: [
      "An API for lazy-loading page fragments as you scroll",
      "An API for animating transitions between DOM states or pages",
      "An API for smoothly switching between dark and light themes",
    ],
    answer: 1,
    explanation:
      "`document.startViewTransition(() => updateDOM())` captures the old state, applies the changes and animates the transition via `::view-transition-old/new` pseudo-elements, styled with regular CSS. MPAs get cross-document transitions via `@view-transition`. React 19.2 added a `<ViewTransition>` component.",
    sources: ["mdn-view-transitions"],
  },
  {
    question: "What is the minimum required for an accessible modal dialog?",
    options: [
      "`z-index: 9999`, a dimmed backdrop and a close button are enough",
      "Focus moved inside and trapped, Esc, focus restored, inert background",
      "`aria-hidden=\"true\"` on the modal itself plus `role=\"alert\"`",
    ],
    answer: 1,
    explanation:
      "Keyboard and screen reader users must get into the modal, not \"fall out\" of it with Tab, close it and return where they were. A native `<dialog>` with `showModal()` does most of this: the background becomes inert, Esc closes it, focus moves. You also need a label via `aria-labelledby`. `aria-hidden` on the modal would hide it from screen readers instead.",
    sources: ["wai-dialog-pattern", "mdn-dialog", "mdn-inert"],
  },
  {
    question: "What does the `inert` attribute do?",
    options: [
      "Disables CSS animations and transitions inside the element and its descendants",
      "Makes a subtree non-interactive and hidden from assistive technologies",
      "Prevents the browser from repainting the element until it's removed",
    ],
    answer: 1,
    explanation:
      "`inert` is the native way to \"switch off\" part of a page: for example, the main content while a drawer is open. Previously you had to manually set `tabindex=\"-1\"` on every focusable element plus `aria-hidden`. A modal `<dialog>` makes the rest of the document inert automatically.",
    sources: ["mdn-inert"],
  },
  {
    question: "What minimum text contrast does WCAG level AA require for normal text?",
    options: ["3:1 for any text", "4.5:1 for normal text", "7:1 for any text"],
    answer: 1,
    explanation:
      "AA: 4.5:1 for normal text and 3:1 for large text (from 24px, or ~18.7px bold), as well as for UI components and meaningful graphics. 7:1 is the AAA requirement. Level AA is the standard target and a legal requirement in many countries (EN 301 549 in the EU, ADA in the US in practice).",
    sources: ["wcag-quickref", "mdn-a11y"],
  },
  {
    question: "How do WCAG conformance levels A, AA and AAA differ?",
    options: [
      "They're versions of the standard: A — WCAG 1.0, AA — 2.0, AAA — 2.2",
      "Strictness levels: A — minimum, AA — the usual target, AAA — maximum",
      "Target platforms: A — mobile, AA — desktop, AAA — print",
    ],
    answer: 1,
    explanation:
      "Each WCAG success criterion has a level. A covers basics (alt text, keyboard operation), AA adds contrast, visible focus and consistent navigation, AAA adds strict requirements such as 7:1 contrast and sign language for video. Versions of the standard are 2.0, 2.1 and 2.2.",
    sources: ["wcag-quickref", "wd-a11y"],
  },
  {
    question: "When are ARIA attributes needed, and when is it better to do without them?",
    options: [
      "ARIA is needed on every element, or screen readers won't read it",
      "If a native element exists, use it; ARIA is for custom widgets",
      "ARIA replaces elements, so `<div role=\"button\">` is better than `<button>`",
    ],
    answer: 1,
    explanation:
      "ARIA only changes how an element is described to assistive technologies; it adds no behavior: `<div role=\"button\">` doesn't get focus or Enter/Space activation. Incorrect ARIA is worse than none. For tabs, comboboxes and trees, which have no native equivalents, follow the APG patterns.",
    sources: ["mdn-aria", "wai-aria-apg"],
  },
  {
    question: "What does `text-wrap: balance` do on a heading?",
    options: [
      "Justifies the text by stretching the spaces",
      "Distributes words so the lines are roughly equal in length",
      "Prevents wrapping and truncates the text with an ellipsis",
    ],
    answer: 1,
    explanation:
      "`balance` chooses line breaks so a multi-line heading's lines are close in length — no orphaned last word. The algorithm is expensive, so browsers apply it only to short blocks (a few lines). For paragraphs there's `text-wrap: pretty`, which avoids a single word on the last line. Justification is `text-align: justify`.",
    sources: ["mdn-text-wrap"],
  },
  {
    question: "What are HTML landmarks, and why do they matter?",
    options: [
      "Regions (`header`, `nav`, `main`…) for quick screen reader navigation",
      "Markers for search crawlers that boost the site's ranking",
      "`<a name>` anchors for navigating sections of a long page",
    ],
    answer: 0,
    explanation:
      "Semantic elements implicitly get landmark roles (`banner`, `navigation`, `main`, `complementary`, `contentinfo`). Screen reader users open a list of landmarks and jump to the one they need. If a page has several `nav` elements, give them distinct names via `aria-label`. A typical SPA problem is a missing `main` or several visible ones.",
    sources: ["mdn-landmarks", "mdn-semantics"],
  },
  {
    question: "Which accessibility problem is typical for SPAs when the \"page\" changes on the client?",
    options: [
      "Screen readers aren't told about the navigation: focus and title don't change",
      "SPAs can't be made accessible at all because of client-side routing",
      "Screen readers can't read content rendered by JavaScript",
    ],
    answer: 0,
    explanation:
      "On a full reload the browser announces the new page itself. SPAs don't get that, so you need to update `document.title`, move focus to the heading or `main`, or announce the change via a live region. The Next.js App Router does part of this (route announcer). Screen readers read JS-rendered content just fine.",
    sources: ["mdn-a11y", "next-linking"],
  },
  {
    question: "How does Tailwind v4 fundamentally differ from v3?",
    options: [
      "v4 removed utilities and kept only ready-made components",
      "CSS-first config via `@theme`, a new engine, automatic source detection",
      "v4 works only with React and requires a separate Babel plugin",
    ],
    answer: 1,
    explanation:
      "Tailwind v4 is a rewrite: it's included with a single `@import \"tailwindcss\"`, tokens are defined in CSS via `@theme` and exposed as CSS variables, and you no longer list paths in `content` — sources are detected automatically. Builds are much faster, and styles use `@layer`, `@property` and `color-mix()`. Modern browsers are required.",
    sources: ["tw-v4", "tw-upgrade", "tw-theme"],
  },
  {
    question: "How do you make Tailwind v4's dark mode follow a `.dark` class instead of the system setting?",
    options: [
      "Set `darkMode: 'class'` inside `@theme`",
      "Override the variant: `@custom-variant dark (&:where(.dark, .dark *));`",
      "Add a `dark-mode` class to `<body>` — Tailwind detects it automatically",
    ],
    answer: 1,
    explanation:
      "In v4, variants are defined in CSS with `@custom-variant`. That way `dark:` can be bound to a class or an attribute (`[data-theme=dark]`). `darkMode: 'class'` is a v3 `tailwind.config.js` option and doesn't work inside `@theme`. `:where()` keeps specificity from increasing.",
    sources: ["tw-dark-mode", "tw-upgrade"],
  },
  {
    question: "You're designing the CSS architecture of a multilingual site including Arabic (RTL) and Japanese. What should you plan for?",
    options: [
      "A separate copy of all styles for each language and writing direction",
      "Logical properties, `lang`/`dir` attributes, flexible containers for text",
      "Fixed widths on buttons and blocks so translations can't break the layout",
    ],
    answer: 1,
    explanation:
      "Logical properties (`margin-inline-start`, `inset-inline-end`) mirror the layout automatically for RTL with `dir=\"rtl\"`. `lang` is needed for correct fonts, hyphenation and quotes, and `:lang()` for language-specific styles. Text length varies across languages, so fixed widths break. CJK needs its own fonts and line-breaking rules (`word-break`, `line-break`).",
    sources: ["mdn-logical-properties", "next-i18n"],
  },
  {
    question: "Which approach to fluid typography best respects the user's font scaling?",
    options: [
      "`font-size: 3vw` with no limits — the font grows with the window",
      "`clamp(1rem, 0.8rem + 1vw, 1.5rem)` — smooth growth within bounds",
      "A fixed pixel `font-size` at each breakpoint",
    ],
    answer: 1,
    explanation:
      "Pure `vw` ignores the user's font size setting and barely changes on zoom — a WCAG problem (resize text up to 200%). Mixing `rem + vw` inside `clamp()` gives smooth scaling while still responding to user settings. Pixel steps work but jump between breakpoints.",
    sources: ["mdn-clamp", "wcag-quickref"],
  },
  {
    question: "A 10,000-row table lags when scrolling. Which solution is most effective?",
    options: [
      "Add `will-change: transform` to every table row",
      "Virtualization: render only the visible rows plus a small buffer",
      "Replace `<table>` with a `<div>` grid using CSS Grid and `gap`",
    ],
    answer: 1,
    explanation:
      "The main problem is thousands of DOM nodes: memory, layout and styles. Virtualization (TanStack Virtual, react-window) keeps dozens of rows in the DOM and swaps them while scrolling. `will-change` on thousands of elements eats memory. Changing the markup doesn't reduce node count. Simpler alternatives are pagination or `content-visibility`.",
    sources: ["webdev-virtualize-lists", "tanstack-virtual", "webdev-content-visibility"],
  },
  {
    question: "A gallery with 50 YouTube videos loads very slowly. What should you do first?",
    options: [
      "Embed all `<iframe>`s with `autoplay=0` so videos don't start",
      "Show preview images and insert the `<iframe>` only on click",
      "Preload all videos in advance with `<link rel=\"preload\">`",
    ],
    answer: 1,
    explanation:
      "Each YouTube iframe pulls hundreds of kilobytes of JS and many requests. The facade pattern (e.g. lite-youtube-embed) shows a static thumbnail and swaps in the player only on interaction. `loading=\"lazy\"` on iframes also helps. `autoplay=0` doesn't reduce the embed's weight.",
    sources: ["mdn-iframe", "mdn-lazy-loading"],
  },
  {
    question: "How does `preload` differ from `prefetch` in `<link rel>`?",
    options: [
      "`preload` is urgent for the current page, `prefetch` is in advance for the next one",
      "They're synonyms: both load a resource with high priority",
      "`prefetch` executes the script immediately, while `preload` defers it",
    ],
    answer: 0,
    explanation:
      "`preload` says \"this resource is definitely needed now, start early\" — e.g. a font or an LCP image discovered late. `prefetch` is a hint for the future, loaded during idle time. An unnecessary `preload` steals bandwidth from critical resources. There's also `preconnect` to set up a connection to a domain early.",
    sources: ["mdn-link-preload", "webdev-font-best-practices"],
  },
  {
    question: "How does `defer` differ from `async` on `<script>`?",
    options: [
      "`defer` runs in order after HTML parsing, `async` runs as soon as it loads",
      "`async` blocks HTML parsing until it runs, while `defer` doesn't",
      "`defer` works only for inline scripts, `async` only for external ones",
    ],
    answer: 0,
    explanation:
      "A regular script stops the parser. `defer` downloads in parallel and executes in order before `DOMContentLoaded` — good for dependent application scripts. `async` executes as soon as it's downloaded — for independent scripts like analytics. Modules (`type=\"module\"`) behave like `defer` by default. Neither attribute affects inline scripts.",
    sources: ["mdn-script"],
  },
  {
    question: "A designer insists on fully custom styles for every control in a complex form. What's a sensible approach?",
    options: [
      "Replace all native controls with `<div>`s and click handlers",
      "Style the native controls (`appearance: none`, `accent-color`)",
      "Refuse the designer: native form elements can't be styled",
    ],
    answer: 1,
    explanation:
      "Native controls give you accessibility, keyboard support, autofill and mobile pickers for free. Most of their appearance can be changed via `appearance: none`, `accent-color`, pseudo-elements and `:checked` / `:focus-visible`. Hand-made `<div>` widgets require full ARIA pattern implementations — expensive and risky. Discuss the trade-offs with the designer.",
    sources: ["mdn-forms", "wai-aria-apg"],
  },
];

export default questions;
