import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Why do HTML documents start with `<!DOCTYPE html>`?",
    options: [
      "To load the browser's built-in default stylesheet",
      "To enable standards rendering mode instead of quirks mode",
      "To declare the document encoding and the page language",
    ],
    answer: 1,
    explanation:
      "DOCTYPE is neither a tag nor a resource link. It tells the browser the page follows modern standards and switches on standards mode. Without it the browser falls back to quirks mode and emulates old browser bugs (for example, a different box model). The encoding is set by `<meta charset=\"utf-8\">`, not by DOCTYPE.",
    sources: ["mdn-doctype", "mdn-quirks", "wd-html-document"],
  },
  {
    question: "Which set contains only HTML5 semantic elements?",
    options: [
      "`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`",
      "`<div>`, `<span>`, `<section>`, `<b>`, `<i>`",
      "`<header>`, `<div>`, `<i>`, `<footer>`, `<span>`",
    ],
    answer: 0,
    explanation:
      "Semantic elements describe the meaning of content: header, navigation, main content, a standalone article, footer. `<div>` and `<span>` are neutral containers with no meaning, while `<b>` and `<i>` are presentational (highlighting without importance). Semantics helps screen readers, search engines and code readability.",
    sources: ["mdn-semantics", "wd-html-semantic"],
  },
  {
    question: "How many visible `<main>` elements can a page have, and what is it for?",
    options: [
      "Any number — one in each section of the page",
      "One — it holds the main unique content of the page",
      "None — the element is deprecated and replaced by `<section>`",
    ],
    answer: 1,
    explanation:
      "`<main>` marks the main content of the document that is unique to the page (without header, menu and footer). Only one may be visible (others need the `hidden` attribute). It is a landmark for screen readers: users can jump straight to the content. `<section>` is a thematic section, not a replacement for `<main>`.",
    sources: ["mdn-html-elements", "mdn-landmarks", "wd-html-semantic"],
  },
  {
    question: "How does `<div>` differ from `<span>` by default?",
    options: [
      "`<div>` is an inline element, `<span>` is a block element",
      "No difference: they are synonyms, only the tag name differs",
      "`<div>` is a block element, `<span>` is an inline element",
    ],
    answer: 2,
    explanation:
      "`<div>` has `display: block` by default: it stretches to the full width of its parent and starts on a new line. `<span>` has `display: inline`: it flows within text and is as wide as its content. Neither carries semantics — both are containers for grouping and styling.",
    sources: ["mdn-display", "mdn-html-elements"],
  },
  {
    question: "You set `width: 200px; height: 50px` on a `<span>` with no other styles. What happens?",
    options: [
      "Width and height are ignored because `<span>` is an inline element",
      "The element becomes exactly 200×50 pixels, like any block",
      "Only the width applies; the browser ignores the height",
    ],
    answer: 0,
    explanation:
      "`width` and `height` don't apply to inline elements — their size is determined by content. Vertical `margin` doesn't push neighbors either. To size the element, it needs `display: inline-block`, `block`, or must be a flex/grid item.",
    sources: ["mdn-display", "mdn-box-model"],
  },
  {
    question: "How does `display: inline-block` differ from `inline`?",
    options: [
      "`inline-block` always starts on a new line and stretches to the parent's full width",
      "`inline-block` stays in the line of text but accepts width, height and vertical spacing",
      "`inline-block` also ignores `width` and `height` but never wraps to a new line",
    ],
    answer: 1,
    explanation:
      "`inline-block` is a hybrid: on the outside it behaves like an inline element (sits on the same line as its neighbors and respects `vertical-align`), and on the inside like a block (`width`, `height`, `padding` and vertical `margin` work). It's `block` that starts on a new line, not `inline-block`.",
    sources: ["mdn-display"],
  },
  {
    question: "How do you read the value of the `data-user-id=\"42\"` attribute in JavaScript?",
    options: [
      "`element.dataUserId`",
      "`element.data.userId`",
      "`element.dataset.userId`",
    ],
    answer: 2,
    explanation:
      "All `data-*` attributes are available through `element.dataset`, with kebab-case names converted to camelCase: `data-user-id` → `dataset.userId`. The value is always a string. You can also use `getAttribute('data-user-id')`. In CSS they are accessed via the `[data-user-id]` selector and the `attr()` function.",
    sources: ["mdn-data-attributes"],
  },
  {
    question: "What is the main difference between the `id` and `class` attributes?",
    options: [
      "`id` must be unique on the page and has higher CSS specificity; `class` can repeat",
      "`class` must be unique on the page, while `id` can be repeated as often as you like",
      "`id` is used only in JavaScript, while `class` is used only for CSS styling",
    ],
    answer: 0,
    explanation:
      "An `id` value must be unique in the document: anchors (`#section`), `label for` and ARIA attributes reference it. Classes are reused across many elements, and one element can have several. An `id` selector weighs (1,0,0) versus (0,1,0) for a class, which is why classes are usually preferred for styling.",
    sources: ["mdn-specificity", "mdn-selectors"],
  },
  {
    question: "Why add `rel=\"noopener noreferrer\"` to a link with `target=\"_blank\"`?",
    options: [
      "So the browser preloads the page and opens the new tab faster",
      "So the opened tab doesn't get `window.opener` and the source page's address",
      "So search crawlers don't follow the link or pass ranking to it",
    ],
    answer: 1,
    explanation:
      "Without `noopener`, the new tab can use `window.opener` to replace the original page (reverse tabnabbing). `noreferrer` additionally omits the Referer header. Modern browsers already apply `noopener` to `_blank` by default, but the attribute is still written explicitly. Indexing is affected by `nofollow`, not these values.",
    sources: ["mdn-a"],
  },
  {
    question: "What is the default `type` of a `<button>` inside a `<form>`?",
    options: ["`button`", "`reset`", "`submit`"],
    answer: 2,
    explanation:
      "By default a button inside a form has `type=\"submit\"` and submits the form. It's a common source of bugs: a \"Show password\" button suddenly submits the form. Buttons that shouldn't submit need an explicit `type=\"button\"`.",
    sources: ["mdn-button"],
  },
  {
    question: "Why link a `<label>` to an `<input>` with `for` and `id`?",
    options: [
      "Clicking the label focuses the field, and screen readers announce the label with it",
      "Without this link, the browser won't include the field's data on submit",
      "It is needed only for built-in validation with the `required` attribute",
    ],
    answer: 0,
    explanation:
      "A linked `label` enlarges the clickable area (especially important for checkboxes) and gives the field an accessible name for assistive technologies. It doesn't affect submission or validation. The alternative is to wrap the `input` inside the `label`.",
    sources: ["mdn-forms", "mdn-a11y"],
  },
  {
    question: "What `alt` should a purely decorative image (e.g. a divider ornament) have?",
    options: [
      "`alt=\"image\"`",
      "An empty `alt=\"\"`",
      "The `alt` attribute can be omitted entirely",
    ],
    answer: 1,
    explanation:
      "An empty `alt=\"\"` tells screen readers the image is decorative and should be skipped. If `alt` is missing, a screen reader may read out the file name. Text like \"image\" is useless: `alt` should convey the image's meaning, not the fact that it exists.",
    sources: ["mdn-img", "wd-html-images", "mdn-a11y"],
  },
  {
    question: "What does `box-sizing: border-box` do?",
    options: [
      "Draws an extra border around the element outside its `margin`",
      "Removes the element's `padding` and `border`, leaving only content",
      "Includes `padding` and `border` in the specified `width` and `height`",
    ],
    answer: 2,
    explanation:
      "With `content-box` (the default), `width` sets only the content width, and `padding` and `border` are added on top: `width: 200px` + `padding: 20px` = 240px. With `border-box`, the total width is exactly 200px and the content shrinks. That's why many CSS resets apply `border-box` to every element. `margin` is never part of the size.",
    sources: ["mdn-box-sizing", "mdn-box-model", "wd-css-box-model"],
  },
  {
    question: "How does `padding` differ from `margin`?",
    options: [
      "`padding` is outer spacing (transparent), `margin` is inner spacing (painted with background)",
      "`padding` is inner spacing (painted with background), `margin` is outer spacing (always transparent)",
      "No difference: they are interchangeable properties with different names",
    ],
    answer: 1,
    explanation:
      "The box model order is content → padding → border → margin. `padding` sits inside the border and is painted with the element's background; `margin` is outside and transparent. Also, vertical margins of adjacent blocks can collapse while padding never does, and `margin` can be negative while `padding` cannot.",
    sources: ["mdn-box-model", "wd-css-box-model"],
  },
  {
    question: "Two blocks are stacked. The top one has `margin-bottom: 20px`, the bottom one `margin-top: 30px`. What is the gap between them?",
    options: ["50px", "30px", "20px"],
    answer: 1,
    explanation:
      "This is margin collapsing: of two adjacent vertical margins in normal flow, the larger one wins — 30px. Horizontal margins don't collapse, and there is no collapsing inside flex and grid containers at all.",
    sources: ["mdn-margin-collapse"],
  },
  {
    question: "Both selectors set `color` on the same link. Which wins: `#nav a` or `.menu .item a.link`?",
    options: [
      "`.menu .item a.link` — it has more selectors, so it is more specific",
      "Whichever comes later in the CSS file: order beats specificity",
      "`#nav a` — a single ID outweighs any number of classes",
    ],
    answer: 2,
    explanation:
      "Specificity is compared column by column (IDs, classes/attributes/pseudo-classes, types): `#nav a` = (1,0,1), `.menu .item a.link` = (0,3,1). The first column matters most, so the ID wins. Source order only decides when specificity is equal.",
    sources: ["mdn-specificity", "wd-css-specificity"],
  },
  {
    question: "Which of these properties is inherited by child elements by default?",
    options: ["`border`", "`color`", "`padding`"],
    answer: 1,
    explanation:
      "Mostly text properties are inherited: `color`, `font-*`, `line-height`, `text-align`, `visibility`. Box model properties (`border`, `padding`, `margin`, `width`) and backgrounds are not. You can force inheritance with the `inherit` value.",
    sources: ["mdn-inheritance", "mdn-cascade"],
  },
  {
    question: "How does `display: none` differ from `visibility: hidden`?",
    options: [
      "`display: none` removes the element from layout; `visibility: hidden` hides it but keeps its space",
      "`visibility: hidden` removes the element from the DOM, while `display: none` only makes it transparent",
      "No difference: both hide the element and free up its space in the layout the same way",
    ],
    answer: 0,
    explanation:
      "With `display: none` the element isn't rendered and takes no space — neighbors shift. With `visibility: hidden` it's invisible but its space remains. `opacity: 0` also keeps the space, and the element stays clickable. None of these remove the element from the DOM, and screen readers ignore only the first two.",
    sources: ["mdn-display", "mdn-a11y"],
  },
  {
    question: "How does an element with `position: relative; top: 10px` behave?",
    options: [
      "It sits 10px from the top of the window and doesn't move when scrolling",
      "It leaves the flow, shifts by 10px, and neighbors take its place",
      "It shifts 10px down from its normal spot, but that spot in the flow is preserved",
    ],
    answer: 2,
    explanation:
      "`relative` visually shifts the element relative to where it would be in normal flow, but its space isn't released — neighbors don't move. `relative` is also often set on a parent to make it the reference point for absolutely positioned children. Positioning relative to the window is `fixed`.",
    sources: ["mdn-position", "csstricks-position"],
  },
  {
    question: "What is an element with `position: absolute` positioned relative to?",
    options: [
      "The nearest ancestor whose `position` is not `static`",
      "Always `<body>`, regardless of ancestor styles",
      "Its own normal place in the flow, like `relative`",
    ],
    answer: 0,
    explanation:
      "An absolute element leaves the flow and measures `top/left/...` from its containing block — the nearest positioned ancestor (`relative`, `absolute`, `fixed`, `sticky`). If there is none, it uses the initial containing block. That's why, to pin a close button to a card's corner, the card gets `position: relative`.",
    sources: ["mdn-position", "mdn-containing-block"],
  },
  {
    question: "How does `position: sticky; top: 0` work?",
    options: [
      "The element is always pinned to the top of the window like `fixed`, regardless of its parent",
      "The element stays in flow until scrolling reaches `top: 0`, then \"sticks\" — within its parent",
      "The element sticks to the top of its parent and never scrolls, even when the parent leaves the screen",
    ],
    answer: 1,
    explanation:
      "`sticky` is a hybrid of `relative` and `fixed`: before the threshold it's in flow, after it — pinned until its parent container ends. Common reasons sticky \"doesn't work\": no `top` is set, an ancestor has `overflow: hidden/auto`, or the parent is no taller than the element itself.",
    sources: ["mdn-position", "csstricks-position"],
  },
  {
    question: "Which elements does `z-index` apply to?",
    options: [
      "Any element, including `position: static` outside flex and grid",
      "Only elements with `display: block` and an explicit height",
      "Positioned elements, as well as flex and grid items",
    ],
    answer: 2,
    explanation:
      "`z-index` controls stacking order and applies to positioned elements and to children of flex/grid containers. On a regular `static` block outside flex/grid it is ignored. Remember stacking contexts: `z-index: 9999` won't help if the parent sits in a \"lower\" context.",
    sources: ["mdn-z-index", "wd-css-z-index", "mdn-stacking-context"],
  },
  {
    question: "How does `rem` differ from `em`?",
    options: [
      "`rem` is relative to `<html>`'s `font-size`, `em` to the current element's `font-size`",
      "`rem` is pixels adjusted for Retina density, `em` is ordinary CSS pixels",
      "`em` is relative to the browser window width, `rem` to the parent element's width",
    ],
    answer: 0,
    explanation:
      "`rem` (root em) is always based on the `font-size` of `<html>` (usually 16px), so sizes are predictable. `em` depends on context and compounds when nested: `font-size: 1.2em` inside `1.2em` gives 1.44 of the base. Window-relative units are `vw`/`vh`.",
    sources: ["mdn-units", "wd-css-sizing"],
  },
  {
    question: "What is `50vw` equal to?",
    options: [
      "50% of the parent element's width",
      "50% of the viewport width",
      "50 pixels on any screen",
    ],
    answer: 1,
    explanation:
      "`vw` is 1% of the viewport width, `vh` is 1% of its height. Percentages (`%`) depend on the parent. Caveat: `100vw` includes the vertical scrollbar width and may cause horizontal scrolling, and on mobile `100vh` ignores the collapsing browser toolbar — that's what `dvh` is for.",
    sources: ["mdn-units", "mdn-length"],
  },
  {
    question: "How are media queries usually written with a mobile-first approach?",
    options: [
      "With `max-width`: base styles for desktop, then simplifications for mobile",
      "With `orientation: portrait` for all cases",
      "With `min-width`: base styles for mobile, additions for larger screens",
    ],
    answer: 2,
    explanation:
      "In mobile-first, the base CSS targets small screens, and `@media (min-width: ...)` adds styles as the screen grows. Mobile devices get the fewest overrides and styles are easier to build up. Using `max-width` is desktop-first. Tailwind breakpoints follow the same principle.",
    sources: ["mdn-media-queries", "wd-media-queries", "mdn-responsive-design"],
  },
  {
    question: "Why do you need `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`?",
    options: [
      "So mobile browsers use the real screen width instead of emulating a ~980px desktop",
      "To prevent users from zooming the page with gestures on mobile",
      "So the browser loads lightweight mobile versions of styles and images",
    ],
    answer: 0,
    explanation:
      "Without this tag, mobile browsers render the page as if on a wide screen and scale it down — mobile media queries don't fire and text is tiny. Disabling zoom (`user-scalable=no`) is bad for accessibility. The tag doesn't affect loading speed.",
    sources: ["mdn-viewport-meta", "mdn-responsive-design"],
  },
  {
    question: "Along which axis does `justify-content` align items in a flex container?",
    options: [
      "Always horizontally, regardless of direction",
      "Along the main axis, which is set by `flex-direction`",
      "Along the cross axis, perpendicular to `flex-direction`",
    ],
    answer: 1,
    explanation:
      "`justify-content` works on the main axis, `align-items` on the cross axis. With `flex-direction: row` the main axis is horizontal; with `column` it's vertical, and `justify-content` aligns vertically. So \"always horizontally\" is wrong.",
    sources: ["mdn-flexbox", "css-tricks-flexbox", "wd-css-flexbox"],
  },
  {
    question: "A container has `display: flex; flex-direction: column; justify-content: center`. How are its children aligned?",
    options: [
      "Centered horizontally, just like in a regular row",
      "Centered vertically (if the container has free height)",
      "Not at all: `justify-content` doesn't work with `flex-direction: column`",
    ],
    answer: 1,
    explanation:
      "With `flex-direction: column` the main axis becomes vertical, so `justify-content: center` centers items vertically. Horizontal alignment is controlled by `align-items` in this case. The effect is visible only if the container is taller than its content.",
    sources: ["mdn-flexbox", "css-tricks-flexbox"],
  },
  {
    question: "What does `flex-wrap: wrap` do?",
    options: [
      "Allows items to wrap onto a new line when they don't fit",
      "Shrinks the items so they all fit on a single line",
      "Wraps each flex item in an extra wrapper block",
    ],
    answer: 0,
    explanation:
      "By default `flex-wrap: nowrap` — all items line up on one line and shrink (if `flex-shrink` allows) or overflow the container. With `wrap`, items move onto new lines. The alignment of those lines is set by `align-content`.",
    sources: ["mdn-flexbox", "css-tricks-flexbox", "flexbox-froggy"],
  },
  {
    question: "What's the simplest way to space flex items evenly without adding space after the last one?",
    options: [
      "`margin-right` on every item",
      "`gap` on the flex container",
      "`padding` on the flex container",
    ],
    answer: 1,
    explanation:
      "`gap` adds space only between items — nothing extra at the edges. Both flex and grid support it. `margin` on items leaves an extra gap after the last one (you'd have to remove it with `:last-child`), and container `padding` is spacing from the edges, not between items.",
    sources: ["mdn-gap", "css-tricks-flexbox"],
  },
  {
    question: "Which approach correctly centers a block horizontally and vertically inside its parent?",
    options: [
      "On the parent: `text-align: center; vertical-align: middle; line-height: 100%`",
      "On the parent: `display: flex; justify-content: center; align-items: center`",
      "On the child: `margin: auto` without any parent styles",
    ],
    answer: 1,
    explanation:
      "Flexbox with `justify-content` and `align-items: center` is the most common approach (Grid alternative: `display: grid; place-items: center`). `text-align` centers only inline content, and `vertical-align` doesn't work for blocks. `margin: auto` on a regular block centers only horizontally (and only with a set width); vertically it works inside flex/grid.",
    sources: ["css-tricks-centering", "mdn-flexbox"],
  },
  {
    question: "What does `grid-template-columns: repeat(3, 1fr)` define?",
    options: [
      "Three 1-pixel-wide columns, with the rest of the space empty",
      "Three rows of equal height stretched across the container",
      "Three columns that share the available space equally",
    ],
    answer: 2,
    explanation:
      "`repeat(3, 1fr)` is the same as `1fr 1fr 1fr`. The `fr` unit is a fraction of the grid container's free space. Rows are defined with `grid-template-rows`. Caveat: `1fr` means `minmax(auto, 1fr)` by default, so long content can stretch a column.",
    sources: ["mdn-grid", "css-tricks-grid", "wd-css-grid"],
  },
  {
    question: "How do you make a grid item span the full width of the grid regardless of the number of columns?",
    options: [
      "`grid-column: 1 / -1`",
      "`width: 100%`",
      "`grid-column: span all`",
    ],
    answer: 0,
    explanation:
      "Negative line numbers count from the end; `-1` is the last line of the explicit grid, so `1 / -1` spans from the first line to the last. `width: 100%` only fills the item's own cell. CSS Grid has no `span all` syntax.",
    sources: ["mdn-grid", "css-tricks-grid", "grid-garden"],
  },
  {
    question: "How does a pseudo-class differ from a pseudo-element?",
    options: [
      "Pseudo-classes use `::` and pseudo-elements use `:`; otherwise they're the same",
      "Pseudo-elements are classes that JavaScript adds to an element at runtime",
      "A pseudo-class is an element's state (`:hover`), a pseudo-element is a virtual part (`::before`)",
    ],
    answer: 2,
    explanation:
      "A pseudo-class selects an existing element in a particular state or position. A pseudo-element creates or targets a part of an element that isn't a separate DOM node. Per CSS3, pseudo-elements use two colons (`::before`) and pseudo-classes one; a single colon on legacy pseudo-elements is still supported for compatibility.",
    sources: ["mdn-pseudo-classes", "mdn-pseudo-elements"],
  },
  {
    question: "How do you make the last item of a list of any length red without JavaScript?",
    options: ["`li:last-child { color: red; }`", "`li:nth-child(10) { color: red; }`", "`li::last { color: red; }`"],
    answer: 0,
    explanation:
      "`:last-child` matches an element that is the last child of its parent. There are also `:last-of-type` (last element of its type) and `:nth-last-child()`. `nth-child(10)` only works with exactly 10 items, and there is no `::last` pseudo-element.",
    sources: ["mdn-pseudo-classes", "mdn-selectors"],
  },
  {
    question: "Why doesn't a `::before` with only `width`, `height` and `background` show up?",
    options: [
      "Pseudo-elements don't support `background` or sizing",
      "The `content` property is missing — without it the pseudo-element isn't created",
      "`::before` only works on links and buttons",
    ],
    answer: 1,
    explanation:
      "`::before` and `::after` are generated only when `content` is set — even empty: `content: \"\"`. They are also inline by default, so sizing needs `display: block` or `inline-block` (or positioning). They don't work on replaced elements like `<img>` and `<input>`.",
    sources: ["mdn-pseudo-elements"],
  },
  {
    question: "How do you correctly declare and use a CSS variable?",
    options: [
      "`$main: red; color: var($main);`",
      "`@main: red; color: get(@main);`",
      "`--main: red; color: var(--main);`",
    ],
    answer: 2,
    explanation:
      "CSS custom properties are declared with two dashes and read with `var()`, optionally with a fallback: `var(--main, black)`. `$var` is Sass syntax and `@var` is Less; those are resolved at build time. CSS variables live in the browser: they inherit, take part in the cascade and can change in media queries or via JS.",
    sources: ["mdn-custom-properties", "wd-css-custom-properties"],
  },
  {
    question: "What do the last two digits in the color `#3366ff80` mean?",
    options: [
      "The color's brightness",
      "Transparency (alpha channel): `80` in hex ≈ 50%",
      "It's an error: a hex color can only have 6 characters",
    ],
    answer: 1,
    explanation:
      "Hex notation supports 3, 4, 6 and 8 characters. `#RRGGBBAA` adds an alpha channel: `80` = 128 of 255 ≈ 50% opacity. The same color can be written as `rgb(51 102 255 / 50%)`. Other formats include `hsl()`, `oklch()`, named colors and `currentColor`.",
    sources: ["mdn-color"],
  },
  {
    question: "When is it better to use `<img>` rather than `background-image`?",
    options: [
      "When the image is part of the content (product photo, illustration) and needs `alt`",
      "When the image is decorative: a background pattern, texture or ornament",
      "Only when the image is an SVG; other formats go in the background",
    ],
    answer: 0,
    explanation:
      "`<img>` is content: it has `alt` for accessibility, gets indexed by search engines, supports `srcset` and `loading=\"lazy\"`, and prints. `background-image` suits decoration: backgrounds, patterns and ornaments that carry no meaning. The file format doesn't affect the choice.",
    sources: ["mdn-img", "wd-html-images"],
  },
  {
    question: "Why have heading levels `<h1>`–`<h6>` if size can be set with CSS?",
    options: [
      "Only for compatibility with old browsers that lack CSS support",
      "They're just six font-size presets that are handy for layout",
      "They define the document hierarchy for screen readers and search engines",
    ],
    answer: 2,
    explanation:
      "A heading level is semantics, not size. Screen reader users often navigate a page by headings. So don't skip levels for looks: set the size with CSS and choose the level based on structure.",
    sources: ["mdn-semantics", "wd-html-semantic", "mdn-a11y"],
  },
  {
    question: "When should you use `<a>` and when `<button>`?",
    options: [
      "It doesn't matter: they're styled the same way and behave the same too",
      "`<a href>` to navigate to a URL, `<button>` for an action on the page",
      "`<button>` only inside forms; links for every other clickable element",
    ],
    answer: 1,
    explanation:
      "Links and buttons behave differently and have different semantics for screen readers: a link can be opened in a new tab and copied, and it activates with Enter; a button activates with Enter and Space. A `<div onclick>` instead of a button breaks keyboard accessibility. Buttons are fine outside forms with `type=\"button\"`.",
    sources: ["mdn-button", "mdn-a", "mdn-a11y"],
  },
  {
    question: "What is the `<dl>` list for?",
    options: [
      "For term–description pairs (`<dt>` and `<dd>`), such as a glossary",
      "For a dropdown selection list in a form — an alternative to `<select>`",
      "It's an obsolete ordered-list tag that `<ol>` replaced",
    ],
    answer: 0,
    explanation:
      "`<dl>` (description list) contains `<dt>` (term) and `<dd>` (description) pairs. `<ul>` is an unordered list where order doesn't matter, `<ol>` is an ordered one. A dropdown in a form is `<select>` with `<option>`.",
    sources: ["mdn-lists", "mdn-html-elements"],
  },
  {
    question: "A form is submitted with the `GET` method. Where does the field data go?",
    options: [
      "Into the HTTP request body, as with file uploads",
      "Into browser cookies, where the server reads them",
      "Into the URL query string (`?name=value&...`)",
    ],
    answer: 2,
    explanation:
      "With `method=\"get\"` the data is encoded into the query string, so it's visible in the address bar and saved in history and logs — not suitable for passwords. `POST` sends data in the request body. Without JavaScript, a form is submitted via the `action` (URL) and `method` attributes of `<form>`.",
    sources: ["mdn-forms", "wd-forms"],
  },
  {
    question: "What does `<input type=\"email\">` give you compared with `type=\"text\"`?",
    options: [
      "It automatically checks that the mailbox actually exists",
      "Built-in email format validation and a suitable keyboard on mobile",
      "It encrypts the entered address before sending",
    ],
    answer: 1,
    explanation:
      "The browser checks the address syntax (presence of `@`, etc.) on submit and shows a keyboard with `@` on mobile. It doesn't check whether the mailbox exists, and encryption is provided by HTTPS. Built-in validation is complemented by `required`, `pattern`, `minlength`, but server-side validation is still mandatory.",
    sources: ["mdn-input", "mdn-form-validation"],
  },
  {
    question: "What does the `required` attribute do on a form field?",
    options: [
      "The browser won't submit the form while the field is empty",
      "The field becomes read-only until the form is submitted",
      "The field value is automatically validated on the server",
    ],
    answer: 0,
    explanation:
      "`required` enables built-in client-side validation: with an empty field, `submit` is blocked and the field matches `:invalid`. Read-only is `readonly`. Client-side validation is just a convenience: it's easy to bypass, so the server must validate data itself.",
    sources: ["mdn-form-validation", "wd-forms"],
  },
  {
    question: "What is the utility-first approach in Tailwind CSS about?",
    options: [
      "Styles are written in separate SCSS files following BEM with mixins",
      "Styles are composed in markup from small single-purpose classes (`flex`, `p-4`)",
      "Tailwind generates ready-made components: buttons, cards, modals",
    ],
    answer: 1,
    explanation:
      "Utility-first means styling with atomic classes, each doing one thing. Tailwind isn't a component library (unlike Bootstrap): it has no ready-made buttons. Only classes found in your source code end up in the final CSS, so the bundle stays small.",
    sources: ["tw-utility-first"],
  },
  {
    question: "What does the `md:flex` class mean in Tailwind?",
    options: [
      "`display: flex` applies only on screens smaller than the `md` breakpoint",
      "`display: flex` applies on screens from the `md` breakpoint and wider",
      "The element gets a medium flex size",
    ],
    answer: 1,
    explanation:
      "Tailwind breakpoints are mobile-first: `md:` becomes `@media (width >= 48rem)`, so the style applies from `md` upward. Without a prefix the style applies at all sizes. To apply a style only below a breakpoint, use `max-md:`.",
    sources: ["tw-responsive"],
  },
  {
    question: "What does `p-4` equal in Tailwind with the default configuration?",
    options: ["`padding: 4px`", "`padding: 4rem`", "`padding: 1rem`"],
    answer: 2,
    explanation:
      "Tailwind's spacing scale is based on a 0.25rem unit: `p-4` = 4 × 0.25rem = 1rem. In v4 this is implemented with the `--spacing` variable: `calc(var(--spacing) * 4)`. An arbitrary value looks like `p-[4px]`.",
    sources: ["tw-utility-first", "tw-theme"],
  },
  {
    question: "How do you change a button's background on hover in Tailwind?",
    options: [
      "`bg-blue-500 hover:bg-blue-600`",
      "`bg-blue-500 :hover-bg-blue-600`",
      "`bg-blue-500 on-hover:bg-blue-600`",
    ],
    answer: 0,
    explanation:
      "States in Tailwind are set with variant prefixes: `hover:`, `focus:`, `focus-visible:`, `active:`, `disabled:` and so on. Prefixes can be combined: `md:hover:bg-blue-600`. Tailwind has no `:hover-` or `on-hover:` syntax.",
    sources: ["tw-states"],
  },
  {
    question: "How does the `dark:` variant work by default in Tailwind v4?",
    options: [
      "Only when `<html>` has a `dark` class added by a script",
      "Based on the system setting — via the `prefers-color-scheme` media query",
      "Automatically in the evening, based on the user's local clock",
    ],
    answer: 1,
    explanation:
      "By default `dark:` relies on `prefers-color-scheme`. For a manual theme toggle, the variant is overridden with `@custom-variant dark (&:where(.dark, .dark *));` — then the theme depends on a `dark` class on an ancestor. Tailwind doesn't consider the time of day.",
    sources: ["tw-dark-mode"],
  },
];

export default questions;
