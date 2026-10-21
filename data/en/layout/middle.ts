import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is the specificity of the selector `nav#main .item:hover > a::before`?",
    options: [
      "(1, 1, 3) — an ID, a class, and `:hover` doesn't count at all",
      "(1, 2, 3) — an ID, class + pseudo-class, two types + pseudo-element",
      "(0, 3, 3) — an ID inside a compound selector weighs like a class",
    ],
    answer: 1,
    explanation:
      "Count by column: IDs — `#main` (1); classes, attributes and pseudo-classes — `.item` and `:hover` (2); types and pseudo-elements — `nav`, `a`, `::before` (3). Combinators (`>`, space) add no specificity. A pseudo-class weighs like a class, and a pseudo-element like a type selector.",
    sources: ["mdn-specificity", "wd-css-specificity"],
  },
  {
    question: "How do you override a third-party library's `!important` rule without touching its code?",
    options: [
      "Write your own rule without `!important` but with a more specific selector",
      "Write your own rule also with `!important` and a more specific selector",
      "You can't: `!important` always beats any other rule",
    ],
    answer: 1,
    explanation:
      "A normal rule never beats `!important`, however specific it is. Among several `!important` declarations, specificity and order apply again. Other options: an inline style with `!important`, or cascade layers — for `!important` the layer order is reversed. The best path is avoiding `!important` in your own code.",
    sources: ["mdn-cascade", "mdn-specificity", "mdn-cascade-layers"],
  },
  {
    question: "What does the shorthand `flex: 1` expand to?",
    options: [
      "`flex-grow: 1; flex-shrink: 1; flex-basis: 0%`",
      "`flex-grow: 1; flex-shrink: 0; flex-basis: auto`",
      "`flex-grow: 1; flex-shrink: 1; flex-basis: auto`",
    ],
    answer: 0,
    explanation:
      "`flex: 1` = `1 1 0%`: the base size is zero, so all space is split strictly in proportion to `flex-grow` — columns end up equal regardless of content. `flex: auto` = `1 1 auto` — only the free space beyond content size is shared. `flex: none` = `0 0 auto`.",
    sources: ["mdn-flex", "css-tricks-flexbox"],
  },
  {
    question: "How does `flex-basis` differ from `width` on a flex item in a row (`flex-direction: row`)?",
    options: [
      "No difference: `flex-basis` is a synonym for `width`, the browser just takes the last one",
      "`width` always beats `flex-basis` and overrides it when both are set on an item",
      "`flex-basis` is the initial main-axis size; if it isn't `auto`, it takes precedence over `width`",
    ],
    answer: 2,
    explanation:
      "`flex-basis` sets the item's initial size along the main axis, from which `grow` and `shrink` are computed. With `flex-basis: auto`, `width` is used (or `height` in a column). With `flex-direction: column`, `flex-basis` applies to height rather than width — that's the key difference from `width`.",
    sources: ["mdn-flex", "mdn-flexbox"],
  },
  {
    question: "Inside a flex item, long text with `text-overflow: ellipsis` doesn't truncate and stretches the column instead. How do you fix it?",
    options: [
      "Give the flex item `min-width: 0` (or `overflow: hidden`)",
      "Give the flex item `flex-shrink: 0` so it doesn't shrink",
      "Change the container from `display: flex` to `display: inline-flex`",
    ],
    answer: 0,
    explanation:
      "Flex items have `min-width: auto` by default — they won't shrink below their minimum content. A long word or a `white-space: nowrap` line stretches the item. `min-width: 0` allows shrinking, and then `ellipsis` kicks in. `flex-shrink: 0` would only make it worse.",
    sources: ["mdn-flexbox", "css-tricks-flexbox"],
  },
  {
    question: "How does `repeat(auto-fill, minmax(200px, 1fr))` differ from `repeat(auto-fit, minmax(200px, 1fr))`?",
    options: [
      "`auto-fit` doesn't support `minmax()`, so this declaration simply won't work",
      "`auto-fill` keeps empty columns, while `auto-fit` collapses them and stretches the items",
      "No difference: they are synonyms kept for backward compatibility",
    ],
    answer: 1,
    explanation:
      "Both create as many columns as fit. The difference shows when there are fewer items than slots: `auto-fill` keeps the empty tracks, while `auto-fit` collapses them to zero and `1fr` stretches the existing items. For cards that should fill the row, `auto-fit` is the usual choice.",
    sources: ["mdn-repeat", "mdn-minmax", "css-tricks-grid"],
  },
  {
    question: "How do you define a \"header on top, sidebar and content in the middle, footer at the bottom\" layout in Grid with named areas?",
    options: [
      "With `grid-area-names: header sidebar main footer` on the container",
      "With `grid-template-areas` on the container and `grid-area` on the children",
      "With named `grid-template-columns` and `grid-column: name` on the children",
    ],
    answer: 1,
    explanation:
      "`grid-template-areas` describes the layout as string \"pictures\": `\"header header\" \"sidebar main\" \"footer footer\"`, and items attach via `grid-area: header`. A dot `.` marks an empty cell. It's great for responsiveness: a media query only changes the template. There is no `grid-area-names` property.",
    sources: ["mdn-grid-template-areas", "css-tricks-grid", "wd-css-grid"],
  },
  {
    question: "What is an implicit grid?",
    options: [
      "Tracks the browser creates automatically for items that don't fit the explicit grid",
      "A grid created with `display: inline-grid` instead of `display: grid`",
      "A grid without `gap`, where cells sit tightly against each other",
    ],
    answer: 0,
    explanation:
      "The explicit grid is defined by `grid-template-*`. If there are more items than cells, the browser adds implicit tracks sized by `grid-auto-rows` / `grid-auto-columns`, with auto-placement direction set by `grid-auto-flow`. By default implicit rows are `auto`-sized.",
    sources: ["mdn-grid", "css-tricks-grid"],
  },
  {
    question: "What does `place-items: center` do on a grid container?",
    options: [
      "Centers the grid container itself inside its parent on both axes",
      "Moves the whole set of grid tracks to the container's center, like `place-content`",
      "Shorthand for `align-items` + `justify-items`: centers items within their cells",
    ],
    answer: 2,
    explanation:
      "`place-items` = `align-items` + `justify-items`, i.e. aligning each item within its own cell. Aligning the whole grid (tracks) within the container is `place-content` (`align-content` + `justify-content`). The container itself is centered by its parent's styles.",
    sources: ["mdn-grid", "css-tricks-centering", "css-tricks-grid"],
  },
  {
    question: "When is Grid more appropriate, and when Flexbox?",
    options: [
      "Grid for two-dimensional layouts, Flexbox for one-dimensional ones (a row or a column)",
      "Flexbox is obsolete: Grid fully replaces it and is faster",
      "Grid only for tabular data, Flexbox for everything else",
    ],
    answer: 0,
    explanation:
      "Flexbox arranges items along a single axis and suits \"content defines size\": menus, toolbars, alignment within a component. Grid controls both axes at once and suits \"layout defines size\": page layouts, galleries. Both are current and often used together.",
    sources: ["mdn-grid", "mdn-flexbox", "css-tricks-grid"],
  },
  {
    question: "What does `font-size: clamp(1rem, 2.5vw, 2rem)` resolve to on a 1000px-wide screen (1rem = 16px)?",
    options: ["16px — the minimum is always used", "25px", "32px — the maximum is always used"],
    answer: 1,
    explanation:
      "`clamp(MIN, VAL, MAX)` returns VAL bounded below by MIN and above by MAX. 2.5vw at 1000px = 25px, which is between 16px and 32px, so the result is 25px. At 400px it would be 10px → clamped to 16px; at 2000px → 50px → clamped to 32px. This gives fluid typography without media queries.",
    sources: ["mdn-clamp"],
  },
  {
    question: "Why use logical properties like `margin-inline-start` instead of `margin-left`?",
    options: [
      "They adapt automatically to the writing direction (RTL, vertical text)",
      "They render faster than physical properties thanks to GPU acceleration",
      "It's legacy syntax kept for compatibility with old Internet Explorer",
    ],
    answer: 0,
    explanation:
      "Logical properties follow the text direction: `inline` is the line axis, `block` is the block axis, `start/end` are the beginning and end. In Arabic (RTL), `margin-inline-start` ends up on the right without extra styles. Shorthands exist too: `padding-inline`, `inset-block`, `inline-size`. They don't affect performance.",
    sources: ["mdn-logical-properties"],
  },
  {
    question: "How does `transition` differ from `animation`?",
    options: [
      "`transition` can animate only colors and opacity, `animation` can animate any property",
      "`animation` can't be paused or repeated, while `transition` can",
      "`transition` is a change between two states, `animation` is a `@keyframes` sequence",
    ],
    answer: 2,
    explanation:
      "A transition needs a trigger — a value change (`:hover`, class change) — and knows only the start and end. An animation is described with keyframes; it can start immediately, repeat (`animation-iteration-count`), run in reverse and pause (`animation-play-state`).",
    sources: ["mdn-transitions", "mdn-animations"],
  },
  {
    question: "Which properties are best to animate for smooth 60 FPS?",
    options: [
      "`transform` and `opacity`",
      "`width`, `height` and `top/left`",
      "`margin` and `padding`",
    ],
    answer: 0,
    explanation:
      "`transform` and `opacity` are usually handled at the compositing stage and don't trigger layout or paint. Animating `width`, `top` or `margin` forces the browser to recalculate layout every frame, causing jank. That's why you move things with `translate`, not `left`.",
    sources: ["webdev-animations", "webdev-rendering"],
  },
  {
    question: "Why is `transform: translate()` often better than changing `left` on a `position: absolute` element for movement animations?",
    options: [
      "`translate` doesn't change layout, while `left` recalculates layout every frame",
      "`left` can't be animated with `transition` or `@keyframes` at all",
      "`translate` supports percentages, while `left` supports only absolute pixels",
    ],
    answer: 0,
    explanation:
      "Moving via `transform` doesn't affect flow or trigger reflow, so the animation is smoother. `left` can be animated, but it's more expensive. Both support percentages, but they're computed differently: `translate` uses the element's own size (hence the `translate(-50%, -50%)` centering trick), `left` uses the containing block.",
    sources: ["webdev-animations", "mdn-transform"],
  },
  {
    question: "How should `will-change` be used?",
    options: [
      "Set `will-change: transform` on every element globally to speed things up",
      "Sparingly — on elements about to animate, removing it afterwards",
      "Use it instead of `transition`; it's the modern replacement",
    ],
    answer: 1,
    explanation:
      "`will-change` hints the browser to prepare a layer in advance. Used broadly, it eats memory (each layer is a separate texture) and can slow the page down. It's a last resort for a specific performance problem, not a replacement for `transition`.",
    sources: ["mdn-will-change", "webdev-animations"],
  },
  {
    question: "What is Critical CSS?",
    options: [
      "Styles with `!important` for critically important UI elements",
      "Above-the-fold styles inlined in `<head>`; the rest loads later",
      "Styles the browser must download again every time, without caching",
    ],
    answer: 1,
    explanation:
      "External CSS blocks rendering: the browser won't paint until the styles download. Inlining the above-the-fold styles in the HTML and loading the rest asynchronously makes the first paint (FCP/LCP) happen sooner. The downside is duplicated styles and a more complex build.",
    sources: ["webdev-critical-css", "webdev-render-blocking"],
  },
  {
    question: "What does the CLS (Cumulative Layout Shift) metric measure?",
    options: [
      "The time until the largest element appears on the screen",
      "The delay in the page's response to a click or key press",
      "Unexpected layout shifts during the page's lifetime",
    ],
    answer: 2,
    explanation:
      "CLS measures visual stability: how much content \"jumps\". A good value is under 0.1. Time to the largest element is LCP, responsiveness is INP. The main causes of shifts are images without dimensions, banners and ads without reserved space, and web fonts.",
    sources: ["webdev-cls", "webdev-vitals"],
  },
  {
    question: "Which technique best prevents layout shifts caused by loading images?",
    options: [
      "Set `width` and `height` (or `aspect-ratio`) to reserve the space",
      "Add `loading=\"lazy\"` to every image so they load later",
      "Load images only after the `load` event via JavaScript",
    ],
    answer: 0,
    explanation:
      "Knowing the proportions, the browser reserves space before the file loads, so content doesn't jump. Modern browsers compute `aspect-ratio` from the `width`/`height` attributes automatically. Lazy loading without dimensions makes shifts worse, and loading via JS hurts LCP.",
    sources: ["webdev-cls", "mdn-aspect-ratio", "mdn-img"],
  },
  {
    question: "What does `font-display: swap` do in `@font-face`?",
    options: [
      "Hides the text until the web font loads, to avoid flickering",
      "Shows text in a fallback font immediately and swaps in the web font once loaded",
      "Prevents the font from loading on slow connections and in data-saver mode",
    ],
    answer: 1,
    explanation:
      "`swap` removes \"invisible text\" (FOIT): users see content in a fallback font right away, then the font changes (FOUT). This can cause a small layout shift, reduced by tuning fallback metrics (`size-adjust`). The `optional` value lets the browser skip the font entirely on a slow network.",
    sources: ["mdn-font-display", "webdev-font-best-practices"],
  },
  {
    question: "What are the `srcset` and `sizes` attributes on `<img>` for?",
    options: [
      "To show several images in turn, like a slider without JS",
      "To define fallback images in case the main one fails to load",
      "So the browser picks a file of the right size for the screen and pixel density",
    ],
    answer: 2,
    explanation:
      "`srcset` lists file variants (`img-400.jpg 400w, img-800.jpg 800w`), and `sizes` hints how wide the image will be in the layout (`(max-width: 600px) 100vw, 50vw`). The browser downloads the smallest sufficient file. To change cropping or format, use `<picture>`.",
    sources: ["mdn-responsive-images", "mdn-img"],
  },
  {
    question: "When do you need `<picture>` rather than just `<img srcset>`?",
    options: [
      "When you need to switch formats (AVIF/WebP with a fallback) or cropping",
      "Always: `<img>` alone doesn't support responsiveness or `srcset`",
      "Only for SVG images, which have no raster dimensions",
    ],
    answer: 0,
    explanation:
      "`<picture>` with multiple `<source>` elements enables art direction (different cropping on mobile via `media`) and format selection (`type=\"image/avif\"`), while the inner `<img>` is the fallback and carries `alt`. For a simple resolution switch, `srcset`/`sizes` on `<img>` is enough.",
    sources: ["mdn-picture", "mdn-responsive-images", "webdev-image-formats"],
  },
  {
    question: "What does `loading=\"lazy\"` on `<img>` do, and when should you NOT use it?",
    options: [
      "Compresses the image on the fly in the browser; avoid it on transparent PNGs",
      "Defers loading until the image nears the viewport; avoid it on the LCP image",
      "Loads the image in a background thread; avoid it on mobile devices",
    ],
    answer: 1,
    explanation:
      "Native lazy loading saves bandwidth for below-the-fold images. But for a hero image it's harmful: the browser starts loading later and LCP suffers. For an important image, use `fetchpriority=\"high\"` instead. The attribute has nothing to do with compression or formats.",
    sources: ["mdn-lazy-loading", "webdev-lcp"],
  },
  {
    question: "What does `object-fit: cover` do on an `<img>` with set `width` and `height`?",
    options: [
      "Stretches the image exactly to the box size, distorting its proportions",
      "Keeps proportions and fills the whole box, cropping the excess",
      "Fits the whole image while keeping proportions, leaving empty bars",
    ],
    answer: 1,
    explanation:
      "`cover` fills the entire area, keeps the proportions and crops what sticks out (the focal point is set with `object-position`). Fitting the whole image with bars is `contain`. Distorting proportions is the default behavior (`fill`).",
    sources: ["mdn-object-fit"],
  },
  {
    question: "What is the specificity of `:where(.card, #hero) p`?",
    options: [
      "(1, 0, 1) — the most specific argument of `:where()` is used",
      "(0, 1, 1) — the first argument is used",
      "(0, 0, 1) — `:where()` always contributes zero specificity",
    ],
    answer: 2,
    explanation:
      "`:where()` zeroes out the specificity of its arguments, leaving only `p` — (0,0,1). That's handy for base styles in libraries: they are easy to override. Its sibling `:is()` takes the specificity of its most specific argument — `:is(.card, #hero) p` would be (1,0,1).",
    sources: ["mdn-is-where", "mdn-specificity"],
  },
  {
    question: "What does the selector `.card:has(img)` match?",
    options: [
      "Cards that contain at least one `<img>` image",
      "All `<img>` elements located inside `.card`",
      "Cards that have an HTML attribute named `img`",
    ],
    answer: 0,
    explanation:
      "`:has()` is the \"parent selector\": it matches an element if something inside it (or next to it, with `+` and `~` combinators) matches the argument. The card itself is styled, not the image. Examples: `form:has(:invalid)`, `label:has(+ input:checked)`. Attributes are selected with `[attr]`.",
    sources: ["mdn-has"],
  },
  {
    question: "How do CSS variables (`--x`) fundamentally differ from Sass variables (`$x`)?",
    options: [
      "No difference: Sass just compiles `$x` into `--x`, and they work the same afterwards",
      "CSS variables are supported only in Chromium, so Sass is more reliable",
      "`--x` lives in the browser and changes at runtime, while `$x` is substituted at build time",
    ],
    answer: 2,
    explanation:
      "A Sass variable is a compile-time value; it doesn't exist in the output CSS. A custom property takes part in the cascade: it can be overridden per component, in `@media`, on `:hover`, in a dark theme, or from JavaScript via `style.setProperty`. They're usually combined: Sass for build logic, CSS variables for themes and dynamics.",
    sources: ["mdn-custom-properties", "sass-docs"],
  },
  {
    question: "What is a stacking context, and why might `z-index: 9999` \"not work\"?",
    options: [
      "A group within which `z-index` values compare; a child can't rise above its parent's siblings",
      "It's a browser limitation: `z-index` values above 999 are simply ignored",
      "It's the order of elements in the HTML markup, which `z-index` can't change",
    ],
    answer: 0,
    explanation:
      "An element with `position` + `z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate` and so on creates its own stacking context. Everything inside it is painted as a single unit relative to its siblings. If a parent with `z-index: 1` is below a sibling with `z-index: 2`, a child with `9999` still ends up below that sibling.",
    sources: ["mdn-stacking-context", "mdn-z-index"],
  },
  {
    question: "`position: sticky` isn't working even though `top: 0` is set. What's the most likely cause?",
    options: [
      "The element has no `z-index`, so it stays under the content",
      "One of the ancestors has `overflow: hidden`, `auto` or `scroll`",
      "`sticky` doesn't work inside semantic elements like `<header>`",
    ],
    answer: 1,
    explanation:
      "A sticky element sticks to its nearest scrolling ancestor. If an ancestor's `overflow` isn't `visible`, sticky is measured against it, and that ancestor may not scroll at all — visually nothing happens. Another cause: the parent is no taller than the element, so there's nowhere to stick. To clip without creating a scroll container, use `overflow: clip`.",
    sources: ["mdn-position", "mdn-overflow"],
  },
  {
    question: "What is a block formatting context (BFC), and how do you create one?",
    options: [
      "A group of consecutive sibling elements with the same `display: block`",
      "An isolated layout region: contains floats, prevents margin collapse; `display: flow-root`",
      "Any semantic container such as `<section>` or `<article>`",
    ],
    answer: 1,
    explanation:
      "A BFC is an isolated layout region: it contains its floats (doesn't collapse in height) and prevents children's margins from collapsing with the parent's. It's created by `display: flow-root` (the modern way), `overflow` other than `visible`, flex/grid items, `position: absolute`, etc. It used to be the clearfix technique.",
    sources: ["mdn-bfc", "mdn-margin-collapse"],
  },
  {
    question: "What's new about the `@media (width >= 768px)` syntax?",
    options: [
      "It's the range syntax from Media Queries Level 4, equivalent to `min-width`",
      "It's Sass syntax: browsers don't understand it without compilation",
      "It's a container query: it looks at the parent's width, not the window",
    ],
    answer: 0,
    explanation:
      "Range syntax allows comparisons: `(width >= 768px)`, `(400px <= width < 1000px)`. It's shorter and avoids `min/max` confusion at the boundaries. All modern browsers support it, and Tailwind v4 generates breakpoints in this form. Container queries are written with `@container`.",
    sources: ["mdn-media-queries", "wd-media-queries"],
  },
  {
    question: "What are `@container` container queries for?",
    options: [
      "To make a component's styles depend on its container's size, not the window",
      "To limit the page's maximum width and center it",
      "It's the new name for `@media`, which is now deprecated",
    ],
    answer: 0,
    explanation:
      "Media queries look at the viewport, but a component may sit in a narrow sidebar or a wide column. Container queries let a card adapt to its actual space: the parent gets `container-type: inline-size`, and styles use `@container (width > 400px) { ... }`. `@media` is not deprecated.",
    sources: ["mdn-container-queries"],
  },
  {
    question: "Why can `height: 100vh` be taller than the visible area on mobile, and how do you fix it?",
    options: [
      "Because of page zoom; fixed with `zoom: 1` on `body`",
      "`vh` ignores the address bar; the `dvh`, `svh`, `lvh` units help",
      "`vh` ignores screen DPI; fixed by switching to `100vw`",
    ],
    answer: 1,
    explanation:
      "Mobile browsers compute `100vh` from the maximum height (with the toolbar hidden), so the bottom of the block hides under the address bar. The new units: `svh` — smallest viewport height, `lvh` — largest, `dvh` — dynamic, changing along with the toolbar.",
    sources: ["mdn-length", "mdn-units"],
  },
  {
    question: "What does the `currentColor` value mean?",
    options: [
      "The color the user picked in the system settings",
      "The value of the current element's `color` property",
      "The background color of the parent element",
    ],
    answer: 1,
    explanation:
      "`currentColor` substitutes the computed `color` value. It's handy for SVG icons (`fill: currentColor`), borders and shadows that should match the text color: change `color` on `:hover`, and the icon recolors along with the text.",
    sources: ["mdn-color"],
  },
  {
    question: "How do the `initial`, `inherit` and `unset` values differ?",
    options: [
      "They're synonyms: all three reset the property to the browser default",
      "`initial` comes from browser styles, `inherit` from `:root`, `unset` removes the property",
      "`initial` is the spec value, `inherit` comes from the parent, `unset` is one of the two depending on the property",
    ],
    answer: 2,
    explanation:
      "`initial` takes the value from the CSS specification (for `display` that's `inline`, not the browser's `block` for `div`). Browser-style values are restored by `revert`. `inherit` takes the parent's computed value. `unset` acts as the \"natural\" value: inherited properties inherit, others reset to `initial`.",
    sources: ["mdn-css-values", "mdn-inheritance"],
  },
  {
    question: "In BEM, how do you correctly name the title class inside a `card` block in its \"accent\" variant?",
    options: ["`card-title card-title_accent`", "`card__title card__title--accent`", "`card__title__accent`"],
    answer: 1,
    explanation:
      "BEM: block (`card`), element with two underscores (`card__title`), modifier with two dashes (`card__title--accent`). The modifier goes together with the base class so base styles aren't duplicated. A flat class structure gives low, uniform specificity and a predictable cascade.",
    sources: ["css-tricks-bem", "smashing-bem"],
  },
  {
    question: "How do CSS Modules solve class-name collisions?",
    options: [
      "They forbid using identical class names across the project at build time",
      "They generate unique class names, making styles local to the file",
      "They wrap every component in a Shadow DOM, isolating its styles",
    ],
    answer: 1,
    explanation:
      "The `.title` class from `Card.module.css` becomes something like `Card_title__x7a2b`, and the component imports a mapping object. Collisions disappear without naming conventions. Global styles use `:global`. Shadow DOM is a Web Components mechanism; CSS Modules don't use it.",
    sources: ["css-modules", "next-css"],
  },
  {
    question: "Why is `:focus-visible` better than `:focus` for styling the focus outline?",
    options: [
      "It shows the outline during keyboard navigation and usually hides it on mouse clicks",
      "It works only on touch devices that have no mouse pointer",
      "It's a legacy variant of `:focus` kept for old browsers",
    ],
    answer: 0,
    explanation:
      "Designers used to ask to remove the \"ugly\" ring after a click, and `outline: none` broke keyboard accessibility. `:focus-visible` uses a browser heuristic: during keyboard navigation the outline is visible, on a mouse click on a button it usually isn't. Never remove focus indication entirely.",
    sources: ["mdn-focus-visible", "mdn-a11y"],
  },
  {
    question: "What does `tabindex=\"-1\"` do?",
    options: [
      "Makes the element first in the Tab order, before all others",
      "Allows focus only programmatically (`el.focus()`), not via Tab",
      "Completely forbids focusing the element — via Tab and from JavaScript",
    ],
    answer: 1,
    explanation:
      "`tabindex=\"0\"` adds an element to the natural tab order, while `-1` makes it focusable only via JS (e.g. a modal heading or a container when following an anchor). Positive values change the tab order and are considered an anti-pattern. To remove an element from interaction entirely, use the `inert` attribute.",
    sources: ["mdn-tabindex", "mdn-inert"],
  },
  {
    question: "When is `aria-label` justified?",
    options: [
      "Always, on every element: it helps search engines understand the page",
      "When an interactive element has no visible text, like an icon button",
      "Instead of `alt` on images — it's the more modern way",
    ],
    answer: 1,
    explanation:
      "`aria-label` sets an element's accessible name when there's no visible label: `<button aria-label=\"Close\">✕</button>`. The first rule of ARIA is not to use it when a native option exists: `alt` for images, `<label>` for fields. `aria-label` doesn't affect SEO, and an unnecessary one can override clear visible text.",
    sources: ["mdn-aria", "wai-aria-apg"],
  },
  {
    question: "How do you apply an arbitrary value in Tailwind that isn't in the theme?",
    options: [
      "`w-(347px)`",
      "`w-[347px]`",
      "`w-347px`",
    ],
    answer: 1,
    explanation:
      "Square brackets set an arbitrary value: `w-[347px]`, `bg-[#1da1f2]`, `grid-cols-[1fr_2fr]` (spaces become underscores). In v4, parentheses are shorthand for a CSS variable: `w-(--sidebar-width)` = `width: var(--sidebar-width)`. If a value repeats often, move it into the theme.",
    sources: ["tw-custom-styles", "tw-utility-first"],
  },
  {
    question: "Why can't you build a Tailwind class name like `` `bg-${color}-500` ``?",
    options: [
      "Tailwind forbids template strings in `className` and fails the build",
      "The scanner looks for complete class names in code; a class built at runtime won't reach the CSS",
      "It only works in development mode, because JIT is disabled in production",
    ],
    answer: 1,
    explanation:
      "Tailwind doesn't run your code; it statically scans files for class-like tokens. The string `bg-${color}-500` doesn't contain a complete name, so `bg-red-500` isn't generated. The right way is mapping to full names: `{ red: \"bg-red-500\", blue: \"bg-blue-500\" }[color]`.",
    sources: ["tw-detecting-classes"],
  },
  {
    question: "How do you add a custom `brand` color in Tailwind v4 so that `bg-brand`, `text-brand`, etc. work?",
    options: [
      "Declare `--color-brand` inside `@theme` in CSS",
      "Create a `.bg-brand` class in a separate CSS file",
      "Pass the color via a `data-brand` attribute on `<html>`",
    ],
    answer: 0,
    explanation:
      "In v4 configuration moved into CSS: variables in `@theme { --color-brand: oklch(...); }` create both the utilities (`bg-brand`, `border-brand`) and a regular CSS variable `var(--color-brand)`. The old `tailwind.config.js` is supported via `@config` but isn't needed by default.",
    sources: ["tw-theme", "tw-v4"],
  },
  {
    question: "What are `group` and `peer` for in Tailwind?",
    options: [
      "For combining several utilities into one reusable class, like `@apply`",
      "For styling based on a parent's state (`group-hover:`) or a sibling's (`peer-checked:`)",
      "For grouping several media queries under one breakpoint",
    ],
    answer: 1,
    explanation:
      "Put `group` on the parent and write `group-hover:text-white` on a descendant — the style applies when the parent is hovered. `peer` works for following siblings: `<input class=\"peer\">` + `<p class=\"peer-invalid:visible\">`. Combining classes into one is `@apply`.",
    sources: ["tw-states"],
  },
  {
    question: "A React component merges external classes: `className={\"p-2 \" + props.className}`, and receives `p-4`. What padding results?",
    options: [
      "Always `p-4`: the class listed later in the `class` attribute wins",
      "It depends on rule order in the CSS, not in `class` — that's why `tailwind-merge` exists",
      "Always `p-2`: the class listed first in the `class` attribute wins",
    ],
    answer: 1,
    explanation:
      "Class order in the `class` attribute doesn't affect the cascade: with equal specificity, the rule that comes later in the CSS file wins. So the outcome of `p-2 p-4` is unpredictable from the component's point of view. `tailwind-merge` (often via a `cn()` helper) removes conflicting classes and keeps the last one.",
    sources: ["tw-merge", "mdn-cascade"],
  },
  {
    question: "What is Tailwind's `@apply` directive for, and why shouldn't you overuse it?",
    options: [
      "It loads Tailwind plugins; without it utilities in markup don't work",
      "It applies utilities only in production builds and ignores them in dev",
      "It inlines utilities into your own class; overuse grows the CSS and defeats the approach",
    ],
    answer: 2,
    explanation:
      "`.btn { @apply px-4 py-2 rounded; }` is handy for styling third-party HTML or base elements. But rewriting a whole project with `@apply` gives you plain CSS with an extra abstraction layer and a bigger bundle. In Tailwind, reuse is usually solved with (React) components, not classes.",
    sources: ["tw-functions-directives", "tw-custom-styles"],
  },
  {
    question: "How do you accommodate users for whom animations cause discomfort?",
    options: [
      "Use `prefers-reduced-motion: reduce` to simplify or disable animations",
      "Keep every animation shorter than one second so it doesn't bother anyone",
      "Animate only `opacity`, because it never causes discomfort",
    ],
    answer: 0,
    explanation:
      "Users can enable \"reduce motion\" in their OS (vestibular disorders, migraines). `@media (prefers-reduced-motion: reduce)` lets you replace parallax and large movements with gentle transitions. Tailwind has `motion-reduce:` and `motion-safe:` variants for this.",
    sources: ["mdn-prefers-reduced-motion", "wcag-quickref"],
  },
  {
    question: "How do you build a two-column layout with a fixed-width sidebar and content filling the rest?",
    options: [
      "`display: grid; grid-template-columns: 250px 1fr`",
      "`display: grid; grid-template-columns: 250px 100%;`",
      "`display: flex` and `width: 50%;` on both columns",
    ],
    answer: 0,
    explanation:
      "`250px 1fr` — the first column is fixed, the second takes all the remaining space. `100%` in the second column would overflow the container by 250px. The Flexbox equivalent: `flex: 0 0 250px` for the sidebar, `flex: 1` for the content (and possibly `min-width: 0`).",
    sources: ["mdn-grid", "mdn-flex"],
  },
  {
    question: "Which image format usually gives the best compression for photos in modern browsers?",
    options: [
      "BMP, because it stores pixels without quality loss",
      "AVIF or WebP, with a JPEG fallback if needed",
      "PNG-24, because it's lossless and supports alpha",
    ],
    answer: 1,
    explanation:
      "AVIF and WebP weigh noticeably less than JPEG at the same quality. Lossless PNG is for graphics with transparency and sharp edges, but it's huge for photos. BMP isn't compressed at all. SVG is better for icons and logos. Fallbacks are done with `<picture>` or automatically by a CDN/optimizer (e.g. `next/image`).",
    sources: ["webdev-image-formats", "mdn-picture"],
  },
  {
    question: "How do you properly include print-only styles?",
    options: [
      "A `media=\"print\"` attribute on `<link>` or an `@media print` block",
      "Call `window.print()` — it will load the print styles",
      "Specify the style type: `<style type=\"print\">`",
    ],
    answer: 0,
    explanation:
      "`media=\"print\"` and `@media print` apply styles only when printing: hide navigation and ads, remove backgrounds, show link URLs via `a::after { content: \" (\" attr(href) \")\" }`, control page breaks with `break-inside: avoid`. `window.print()` only opens the print dialog.",
    sources: ["mdn-print", "mdn-media-queries"],
  },
];

export default questions;
