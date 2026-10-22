import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Jaka jest specyficzność selektora `nav#main .item:hover > a::before`?",
    options: [
      "(1, 1, 3) — identyfikator, klasa, a `:hover` w ogóle się nie liczy",
      "(1, 2, 3) — identyfikator, klasa + pseudoklasa, dwa typy + pseudoelement",
      "(0, 3, 3) — identyfikator wewnątrz złożonego selektora waży jak klasa",
    ],
    answer: 1,
    explanation:
      "Liczymy kolumnami: identyfikatory — `#main` (1); klasy, atrybuty i pseudoklasy — `.item` i `:hover` (2); typy i pseudoelementy — `nav`, `a`, `::before` (3). Kombinatory (`>`, spacja) nie dodają specyficzności. Pseudoklasa waży jak klasa, a pseudoelement jak selektor typu.",
    sources: ["mdn-specificity", "wd-css-specificity"],
  },
  {
    question: "Jak nadpisać regułę z `!important` z zewnętrznej biblioteki, nie ruszając jej kodu?",
    options: [
      "Napisać własną regułę bez `!important`, ale z bardziej specyficznym selektorem",
      "Napisać własną regułę także z `!important` i bardziej specyficznym selektorem",
      "Nie da się: `!important` zawsze wygrywa z każdą inną regułą",
    ],
    answer: 1,
    explanation:
      "Zwykła reguła nigdy nie wygra z `!important`, niezależnie od specyficzności. Między kilkoma deklaracjami `!important` znowu działają specyficzność i kolejność. Inne opcje: styl inline z `!important` albo warstwy kaskadowe — dla `!important` kolejność warstw jest odwrócona. Najlepiej po prostu unikać `!important` we własnym kodzie.",
    sources: ["mdn-cascade", "mdn-specificity", "mdn-cascade-layers"],
  },
  {
    question: "Do czego rozwija się skrót `flex: 1`?",
    options: [
      "`flex-grow: 1; flex-shrink: 1; flex-basis: 0%`",
      "`flex-grow: 1; flex-shrink: 0; flex-basis: auto`",
      "`flex-grow: 1; flex-shrink: 1; flex-basis: auto`",
    ],
    answer: 0,
    explanation:
      "`flex: 1` = `1 1 0%`: rozmiar bazowy jest zerowy, więc całe miejsce dzieli się ściśle proporcjonalnie do `flex-grow` — kolumny są równe niezależnie od treści. `flex: auto` = `1 1 auto` — dzielona jest tylko wolna przestrzeń ponad rozmiar treści. `flex: none` = `0 0 auto`.",
    sources: ["mdn-flex", "css-tricks-flexbox"],
  },
  {
    question: "Czym `flex-basis` różni się od `width` na elemencie flex w wierszu (`flex-direction: row`)?",
    options: [
      "Niczym: `flex-basis` to synonim `width`, przeglądarka bierze ostatni",
      "`width` zawsze wygrywa z `flex-basis` i nadpisuje go, gdy oba są ustawione",
      "`flex-basis` to początkowy rozmiar na osi głównej; jeśli nie jest `auto`, ma pierwszeństwo przed `width`",
    ],
    answer: 2,
    explanation:
      "`flex-basis` ustala początkowy rozmiar elementu wzdłuż osi głównej, od którego liczy się `grow` i `shrink`. Przy `flex-basis: auto` używane jest `width` (lub `height` w kolumnie). Przy `flex-direction: column` `flex-basis` dotyczy wysokości, a nie szerokości — to kluczowa różnica wobec `width`.",
    sources: ["mdn-flex", "mdn-flexbox"],
  },
  {
    question: "Wewnątrz elementu flex długi tekst z `text-overflow: ellipsis` się nie ucina, tylko rozciąga kolumnę. Jak to naprawić?",
    options: [
      "Dać elementowi flex `min-width: 0` (lub `overflow: hidden`)",
      "Dać elementowi flex `flex-shrink: 0`, żeby się nie kurczył",
      "Zmienić kontener z `display: flex` na `display: inline-flex`",
    ],
    answer: 0,
    explanation:
      "Elementy flex mają domyślnie `min-width: auto` — nie skurczą się poniżej minimalnej treści. Długie słowo lub linia z `white-space: nowrap` rozciąga element. `min-width: 0` pozwala na kurczenie się i wtedy działa `ellipsis`. `flex-shrink: 0` tylko by pogorszył sytuację.",
    sources: ["mdn-flexbox", "css-tricks-flexbox"],
  },
  {
    question: "Czym `repeat(auto-fill, minmax(200px, 1fr))` różni się od `repeat(auto-fit, minmax(200px, 1fr))`?",
    options: [
      "`auto-fit` nie obsługuje `minmax()`, więc ta deklaracja po prostu nie zadziała",
      "`auto-fill` zostawia puste kolumny, a `auto-fit` je zwija i rozciąga elementy",
      "Niczym: to synonimy zachowane dla wstecznej kompatybilności",
    ],
    answer: 1,
    explanation:
      "Oba tworzą tyle kolumn, ile się zmieści. Różnica widać, gdy elementów jest mniej niż miejsc: `auto-fill` zostawia puste ścieżki, a `auto-fit` zwija je do zera i `1fr` rozciąga istniejące elementy. Dla kart, które mają wypełnić wiersz, zwykle wybiera się `auto-fit`.",
    sources: ["mdn-repeat", "mdn-minmax", "css-tricks-grid"],
  },
  {
    question: "Jak w Grid z nazwanymi obszarami zdefiniować układ „nagłówek na górze, sidebar i treść pośrodku, stopka na dole”?",
    options: [
      "Przez `grid-area-names: header sidebar main footer` na kontenerze",
      "Przez `grid-template-areas` na kontenerze i `grid-area` na dzieciach",
      "Przez nazwane `grid-template-columns` i `grid-column: name` na dzieciach",
    ],
    answer: 1,
    explanation:
      "`grid-template-areas` opisuje układ jako „obrazki” ze stringów: `\"header header\" \"sidebar main\" \"footer footer\"`, a elementy podpinają się przez `grid-area: header`. Kropka `.` oznacza pustą komórkę. To świetne do responsywności: media query zmienia tylko szablon. Właściwości `grid-area-names` nie ma.",
    sources: ["mdn-grid-template-areas", "css-tricks-grid", "wd-css-grid"],
  },
  {
    question: "Czym jest siatka niejawna (implicit grid)?",
    options: [
      "Ścieżki tworzone automatycznie przez przeglądarkę dla elementów, które nie mieszczą się w siatce jawnej",
      "Siatka utworzona przez `display: inline-grid` zamiast `display: grid`",
      "Siatka bez `gap`, w której komórki przylegają do siebie",
    ],
    answer: 0,
    explanation:
      "Siatkę jawną definiuje `grid-template-*`. Jeśli elementów jest więcej niż komórek, przeglądarka dodaje niejawne ścieżki o rozmiarze z `grid-auto-rows` / `grid-auto-columns`, a kierunek automatycznego rozmieszczania ustala `grid-auto-flow`. Domyślnie niejawne wiersze mają rozmiar `auto`.",
    sources: ["mdn-grid", "css-tricks-grid"],
  },
  {
    question: "Co robi `place-items: center` na kontenerze grid?",
    options: [
      "Centruje sam kontener grid wewnątrz rodzica w obu osiach",
      "Przesuwa cały zestaw ścieżek siatki na środek kontenera, jak `place-content`",
      "Skrót dla `align-items` + `justify-items`: centruje elementy w ich komórkach",
    ],
    answer: 2,
    explanation:
      "`place-items` = `align-items` + `justify-items`, czyli wyrównanie każdego elementu w jego własnej komórce. Wyrównanie całej siatki (ścieżek) w kontenerze to `place-content` (`align-content` + `justify-content`). Sam kontener centrują style rodzica.",
    sources: ["mdn-grid", "css-tricks-centering", "css-tricks-grid"],
  },
  {
    question: "Kiedy lepiej pasuje Grid, a kiedy Flexbox?",
    options: [
      "Grid do układów dwuwymiarowych, Flexbox do jednowymiarowych (wiersz lub kolumna)",
      "Flexbox jest przestarzały: Grid całkowicie go zastępuje i jest szybszy",
      "Grid tylko do danych tabelarycznych, Flexbox do wszystkiego innego",
    ],
    answer: 0,
    explanation:
      "Flexbox rozmieszcza elementy wzdłuż jednej osi i pasuje do „treść wyznacza rozmiar”: menu, paski narzędzi, wyrównanie w komponencie. Grid kontroluje obie osie naraz i pasuje do „układ wyznacza rozmiar”: layouty stron, galerie. Oba są aktualne i często używane razem.",
    sources: ["mdn-grid", "mdn-flexbox", "css-tricks-grid"],
  },
  {
    question: "Ile wyniesie `font-size: clamp(1rem, 2.5vw, 2rem)` na ekranie o szerokości 1000px (1rem = 16px)?",
    options: ["16px — zawsze używane jest minimum", "25px", "32px — zawsze używane jest maksimum"],
    answer: 1,
    explanation:
      "`clamp(MIN, VAL, MAX)` zwraca VAL ograniczone od dołu przez MIN i od góry przez MAX. 2.5vw przy 1000px = 25px, co mieści się między 16px a 32px, więc wynik to 25px. Przy 400px byłoby 10px → ograniczone do 16px; przy 2000px → 50px → ograniczone do 32px. To płynna typografia bez media queries.",
    sources: ["mdn-clamp"],
  },
  {
    question: "Po co używać właściwości logicznych typu `margin-inline-start` zamiast `margin-left`?",
    options: [
      "Automatycznie dostosowują się do kierunku pisma (RTL, tekst pionowy)",
      "Renderują się szybciej niż właściwości fizyczne dzięki akceleracji GPU",
      "To przestarzała składnia zachowana dla kompatybilności ze starym Internet Explorerem",
    ],
    answer: 0,
    explanation:
      "Właściwości logiczne podążają za kierunkiem tekstu: `inline` to oś linii, `block` — oś bloków, `start/end` — początek i koniec. W języku arabskim (RTL) `margin-inline-start` znajdzie się po prawej bez dodatkowych stylów. Są też skróty: `padding-inline`, `inset-block`, `inline-size`. Nie wpływają na wydajność.",
    sources: ["mdn-logical-properties"],
  },
  {
    question: "Czym `transition` różni się od `animation`?",
    options: [
      "`transition` animuje tylko kolory i przezroczystość, `animation` — dowolne właściwości",
      "`animation` nie da się zatrzymać ani powtórzyć, a `transition` tak",
      "`transition` to zmiana między dwoma stanami, `animation` — sekwencja `@keyframes`",
    ],
    answer: 2,
    explanation:
      "Przejście (transition) potrzebuje wyzwalacza — zmiany wartości (`:hover`, zmiana klasy) — i zna tylko początek i koniec. Animację opisuje się klatkami kluczowymi; może startować od razu, powtarzać się (`animation-iteration-count`), biec w odwrotnym kierunku i pauzować (`animation-play-state`).",
    sources: ["mdn-transitions", "mdn-animations"],
  },
  {
    question: "Które właściwości najlepiej animować, aby uzyskać płynne 60 FPS?",
    options: [
      "`transform` i `opacity`",
      "`width`, `height` i `top/left`",
      "`margin` i `padding`",
    ],
    answer: 0,
    explanation:
      "`transform` i `opacity` są zwykle obsługiwane na etapie kompozycji i nie wywołują layoutu ani malowania. Animowanie `width`, `top` czy `margin` zmusza przeglądarkę do przeliczania układu w każdej klatce, co powoduje przycięcia. Dlatego przesuwa się przez `translate`, a nie `left`.",
    sources: ["webdev-animations", "webdev-rendering"],
  },
  {
    question: "Dlaczego `transform: translate()` jest często lepszy niż zmiana `left` na elemencie z `position: absolute` w animacjach ruchu?",
    options: [
      "`translate` nie zmienia układu, a `left` przelicza layout w każdej klatce",
      "`left` w ogóle nie da się animować przez `transition` ani `@keyframes`",
      "`translate` obsługuje procenty, a `left` tylko bezwzględne piksele",
    ],
    answer: 0,
    explanation:
      "Przesunięcie przez `transform` nie wpływa na przepływ i nie wywołuje reflow, więc animacja jest płynniejsza. `left` da się animować, ale jest to droższe. Oba obsługują procenty, ale liczone inaczej: `translate` od własnego rozmiaru elementu (stąd trik centrowania `translate(-50%, -50%)`), `left` — od bloku zawierającego.",
    sources: ["webdev-animations", "mdn-transform"],
  },
  {
    question: "Jak należy używać `will-change`?",
    options: [
      "Ustawić `will-change: transform` globalnie na wszystkich elementach dla przyspieszenia",
      "Oszczędnie — na elementach, które zaraz będą animowane, i usuwać po wszystkim",
      "Używać zamiast `transition`, bo to jego nowoczesny zamiennik",
    ],
    answer: 1,
    explanation:
      "`will-change` podpowiada przeglądarce, by zawczasu przygotowała warstwę. Używane szeroko zjada pamięć (każda warstwa to osobna tekstura) i może spowolnić stronę. To ostateczność przy konkretnym problemie z wydajnością, a nie zamiennik `transition`.",
    sources: ["mdn-will-change", "webdev-animations"],
  },
  {
    question: "Czym jest Critical CSS?",
    options: [
      "Style z `!important` dla krytycznie ważnych elementów interfejsu",
      "Style pierwszego ekranu wstawione inline w `<head>`; reszta ładuje się później",
      "Style, które przeglądarka musi pobierać za każdym razem, bez cache",
    ],
    answer: 1,
    explanation:
      "Zewnętrzny CSS blokuje renderowanie: przeglądarka nie maluje, dopóki style się nie pobiorą. Wstawienie stylów pierwszego ekranu w HTML i asynchroniczne ładowanie reszty przyspiesza pierwsze malowanie (FCP/LCP). Minusem jest duplikacja stylów i bardziej złożony build.",
    sources: ["webdev-critical-css", "webdev-render-blocking"],
  },
  {
    question: "Co mierzy metryka CLS (Cumulative Layout Shift)?",
    options: [
      "Czas do pojawienia się największego elementu na ekranie",
      "Opóźnienie reakcji strony na kliknięcie lub naciśnięcie klawisza",
      "Nieoczekiwane przesunięcia układu w trakcie życia strony",
    ],
    answer: 2,
    explanation:
      "CLS mierzy stabilność wizualną: jak bardzo treść „skacze”. Dobra wartość to poniżej 0,1. Czas do największego elementu to LCP, responsywność — INP. Główne przyczyny przesunięć to obrazki bez wymiarów, banery i reklamy bez zarezerwowanego miejsca oraz fonty webowe.",
    sources: ["webdev-cls", "webdev-vitals"],
  },
  {
    question: "Która technika najlepiej zapobiega przesunięciom układu przy ładowaniu obrazków?",
    options: [
      "Ustawić `width` i `height` (lub `aspect-ratio`), aby zarezerwować miejsce",
      "Dodać `loading=\"lazy\"` do wszystkich obrazków, żeby ładowały się później",
      "Ładować obrazki dopiero po zdarzeniu `load` przez JavaScript",
    ],
    answer: 0,
    explanation:
      "Znając proporcje, przeglądarka rezerwuje miejsce, zanim plik się załaduje, więc treść nie skacze. Nowoczesne przeglądarki same wyliczają `aspect-ratio` z atrybutów `width`/`height`. Lazy loading bez wymiarów nasila przesunięcia, a ładowanie przez JS szkodzi LCP.",
    sources: ["webdev-cls", "mdn-aspect-ratio", "mdn-img"],
  },
  {
    question: "Co robi `font-display: swap` w `@font-face`?",
    options: [
      "Ukrywa tekst, dopóki font webowy się nie załaduje, aby uniknąć migotania",
      "Od razu pokazuje tekst fontem zapasowym i podmienia go na font webowy po załadowaniu",
      "Blokuje ładowanie fontu na wolnych łączach i w trybie oszczędzania danych",
    ],
    answer: 1,
    explanation:
      "`swap` usuwa „niewidzialny tekst” (FOIT): użytkownik od razu widzi treść fontem zapasowym, potem font się zmienia (FOUT). Może to dać małe przesunięcie układu, które zmniejsza się, dopasowując metryki fontu zapasowego (`size-adjust`). Wartość `optional` pozwala przeglądarce całkiem pominąć font przy wolnej sieci.",
    sources: ["mdn-font-display", "webdev-font-best-practices"],
  },
  {
    question: "Do czego służą atrybuty `srcset` i `sizes` na `<img>`?",
    options: [
      "Do pokazywania kilku obrazków po kolei, jak slider bez JS",
      "Do określenia zapasowych obrazków na wypadek, gdyby główny się nie załadował",
      "Aby przeglądarka wybrała plik o rozmiarze dopasowanym do ekranu i gęstości pikseli",
    ],
    answer: 2,
    explanation:
      "`srcset` wymienia warianty plików (`img-400.jpg 400w, img-800.jpg 800w`), a `sizes` podpowiada, jak szeroki będzie obrazek w układzie (`(max-width: 600px) 100vw, 50vw`). Przeglądarka pobiera najmniejszy wystarczający plik. Do zmiany kadrowania lub formatu służy `<picture>`.",
    sources: ["mdn-responsive-images", "mdn-img"],
  },
  {
    question: "Kiedy potrzebny jest `<picture>`, a nie samo `<img srcset>`?",
    options: [
      "Gdy trzeba przełączać formaty (AVIF/WebP z fallbackiem) lub kadrowanie",
      "Zawsze: sam `<img>` nie obsługuje responsywności ani `srcset`",
      "Tylko dla obrazków SVG, które nie mają rastrowych wymiarów",
    ],
    answer: 0,
    explanation:
      "`<picture>` z wieloma `<source>` pozwala na art direction (inne kadrowanie na mobile przez `media`) i wybór formatu (`type=\"image/avif\"`), a wewnętrzny `<img>` jest fallbackiem i niesie `alt`. Do prostego przełączania rozdzielczości wystarczy `srcset`/`sizes` na `<img>`.",
    sources: ["mdn-picture", "mdn-responsive-images", "webdev-image-formats"],
  },
  {
    question: "Co robi `loading=\"lazy\"` na `<img>` i kiedy NIE należy go używać?",
    options: [
      "Kompresuje obrazek w locie w przeglądarce; unikać na przezroczystych PNG",
      "Odracza ładowanie, aż obrazek zbliży się do viewportu; unikać na obrazku LCP",
      "Ładuje obrazek w wątku w tle; unikać na urządzeniach mobilnych",
    ],
    answer: 1,
    explanation:
      "Natywny lazy loading oszczędza transfer dla obrazków poniżej pierwszego ekranu. Ale dla obrazka hero szkodzi: przeglądarka później zaczyna ładowanie i cierpi LCP. Dla ważnego obrazka używa się raczej `fetchpriority=\"high\"`. Atrybut nie ma nic wspólnego z kompresją ani formatami.",
    sources: ["mdn-lazy-loading", "webdev-lcp"],
  },
  {
    question: "Co robi `object-fit: cover` na `<img>` z ustawionymi `width` i `height`?",
    options: [
      "Rozciąga obrazek dokładnie do rozmiaru pudełka, zniekształcając proporcje",
      "Zachowuje proporcje i wypełnia całe pudełko, przycinając nadmiar",
      "Mieści cały obrazek z zachowaniem proporcji, zostawiając puste pasy",
    ],
    answer: 1,
    explanation:
      "`cover` wypełnia cały obszar, zachowuje proporcje i przycina to, co wystaje (punkt ogniskowy ustawia `object-position`). Zmieszczenie całego obrazka z pasami to `contain`. Zniekształcenie proporcji to zachowanie domyślne (`fill`).",
    sources: ["mdn-object-fit"],
  },
  {
    question: "Jaka jest specyficzność `:where(.card, #hero) p`?",
    options: [
      "(1, 0, 1) — używany jest najbardziej specyficzny argument `:where()`",
      "(0, 1, 1) — używany jest pierwszy argument",
      "(0, 0, 1) — `:where()` zawsze daje zerową specyficzność",
    ],
    answer: 2,
    explanation:
      "`:where()` zeruje specyficzność argumentów, zostaje tylko `p` — (0,0,1). To wygodne dla stylów bazowych w bibliotekach: łatwo je nadpisać. Jego krewny `:is()` przyjmuje specyficzność najbardziej specyficznego argumentu — `:is(.card, #hero) p` dałoby (1,0,1).",
    sources: ["mdn-is-where", "mdn-specificity"],
  },
  {
    question: "Do czego pasuje selektor `.card:has(img)`?",
    options: [
      "Do kart, które zawierają co najmniej jeden obrazek `<img>`",
      "Do wszystkich elementów `<img>` znajdujących się wewnątrz `.card`",
      "Do kart, które mają atrybut HTML o nazwie `img`",
    ],
    answer: 0,
    explanation:
      "`:has()` to „selektor rodzica”: pasuje do elementu, jeśli coś wewnątrz niego (lub obok, z kombinatorami `+` i `~`) pasuje do argumentu. Stylowana jest sama karta, a nie obrazek. Przykłady: `form:has(:invalid)`, `label:has(+ input:checked)`. Atrybuty wybiera się przez `[attr]`.",
    sources: ["mdn-has"],
  },
  {
    question: "Czym zasadniczo różnią się zmienne CSS (`--x`) od zmiennych Sass (`$x`)?",
    options: [
      "Niczym: Sass po prostu kompiluje `$x` do `--x` i potem działają tak samo",
      "Zmienne CSS są obsługiwane tylko w Chromium, więc Sass jest pewniejszy",
      "`--x` żyje w przeglądarce i zmienia się w czasie działania, a `$x` jest podstawiane podczas budowania",
    ],
    answer: 2,
    explanation:
      "Zmienna Sass to wartość z czasu kompilacji; w wynikowym CSS jej nie ma. Właściwość niestandardowa bierze udział w kaskadzie: można ją nadpisać w komponencie, w `@media`, na `:hover`, w ciemnym motywie lub z JavaScriptu przez `style.setProperty`. Zwykle łączy się oba: Sass do logiki builda, zmienne CSS do motywów i dynamiki.",
    sources: ["mdn-custom-properties", "sass-docs"],
  },
  {
    question: "Czym jest kontekst nakładania (stacking context) i dlaczego `z-index: 9999` może „nie działać”?",
    options: [
      "To grupa, w której porównuje się wartości `z-index`; dziecko nie wzniesie się ponad rodzeństwo rodzica",
      "To ograniczenie przeglądarek: wartości `z-index` powyżej 999 są ignorowane",
      "To kolejność elementów w markupie HTML, której `z-index` nie może zmienić",
    ],
    answer: 0,
    explanation:
      "Element z `position` + `z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate` itd. tworzy własny kontekst nakładania. Wszystko w środku jest malowane jako jedna całość względem rodzeństwa. Jeśli rodzic z `z-index: 1` jest pod rodzeństwem z `z-index: 2`, dziecko z `9999` i tak będzie pod tym rodzeństwem.",
    sources: ["mdn-stacking-context", "mdn-z-index"],
  },
  {
    question: "`position: sticky` nie działa, choć ustawiono `top: 0`. Jaka jest najbardziej prawdopodobna przyczyna?",
    options: [
      "Element nie ma `z-index`, więc zostaje pod treścią",
      "Któryś z przodków ma `overflow: hidden`, `auto` lub `scroll`",
      "`sticky` nie działa w elementach semantycznych typu `<header>`",
    ],
    answer: 1,
    explanation:
      "Element sticky przykleja się do najbliższego przewijającego się przodka. Jeśli `overflow` przodka nie jest `visible`, sticky liczy się względem niego, a ten przodek może w ogóle się nie przewijać — wizualnie nic się nie dzieje. Inna przyczyna: rodzic nie jest wyższy od elementu, więc nie ma gdzie się przyklejać. Aby przycinać bez tworzenia kontenera przewijania, użyj `overflow: clip`.",
    sources: ["mdn-position", "mdn-overflow"],
  },
  {
    question: "Czym jest blokowy kontekst formatowania (BFC) i jak go utworzyć?",
    options: [
      "To grupa kolejnych elementów rodzeństwa z tym samym `display: block`",
      "Izolowany obszar układu: zawiera floaty, zapobiega zapadaniu marginesów; `display: flow-root`",
      "Dowolny semantyczny kontener, np. `<section>` lub `<article>`",
    ],
    answer: 1,
    explanation:
      "BFC to izolowany obszar układu: zawiera swoje floaty (nie zapada się na wysokość) i nie pozwala marginesom dzieci zapadać się z marginesami rodzica. Tworzą go `display: flow-root` (nowoczesny sposób), `overflow` inne niż `visible`, elementy flex/grid, `position: absolute` itd. Dawniej była to technika clearfix.",
    sources: ["mdn-bfc", "mdn-margin-collapse"],
  },
  {
    question: "Co nowego jest w składni `@media (width >= 768px)`?",
    options: [
      "To składnia zakresów z Media Queries Level 4, odpowiednik `min-width`",
      "To składnia Sass: przeglądarki nie rozumieją jej bez kompilacji",
      "To container query: patrzy na szerokość rodzica, a nie okna",
    ],
    answer: 0,
    explanation:
      "Składnia zakresów pozwala na porównania: `(width >= 768px)`, `(400px <= width < 1000px)`. Jest krótsza i unika pomyłek z `min/max` na granicach. Obsługują ją wszystkie nowoczesne przeglądarki, a Tailwind v4 generuje breakpointy właśnie w tej formie. Container queries zapisuje się przez `@container`.",
    sources: ["mdn-media-queries", "wd-media-queries"],
  },
  {
    question: "Do czego służą zapytania kontenerowe `@container`?",
    options: [
      "Aby style komponentu zależały od rozmiaru jego kontenera, a nie okna",
      "Aby ograniczyć maksymalną szerokość strony i ją wycentrować",
      "To nowa nazwa `@media`, który jest teraz przestarzały",
    ],
    answer: 0,
    explanation:
      "Media queries patrzą na viewport, a komponent może stać w wąskim sidebarze albo szerokiej kolumnie. Zapytania kontenerowe pozwalają karcie dostosować się do faktycznie dostępnego miejsca: rodzic dostaje `container-type: inline-size`, a style używają `@container (width > 400px) { ... }`. `@media` nie jest przestarzały.",
    sources: ["mdn-container-queries"],
  },
  {
    question: "Dlaczego `height: 100vh` na telefonie może być wyższe niż widoczny obszar i jak to naprawić?",
    options: [
      "Z powodu powiększenia strony; naprawia to `zoom: 1` na `body`",
      "`vh` nie uwzględnia paska adresu; pomagają jednostki `dvh`, `svh`, `lvh`",
      "`vh` nie uwzględnia DPI ekranu; naprawia to przejście na `100vw`",
    ],
    answer: 1,
    explanation:
      "Przeglądarki mobilne liczą `100vh` od maksymalnej wysokości (przy schowanym pasku), więc dół bloku chowa się pod paskiem adresu. Nowe jednostki: `svh` — najmniejsza wysokość viewportu, `lvh` — największa, `dvh` — dynamiczna, zmieniająca się razem z paskiem.",
    sources: ["mdn-length", "mdn-units"],
  },
  {
    question: "Co oznacza wartość `currentColor`?",
    options: [
      "Kolor wybrany przez użytkownika w ustawieniach systemu",
      "Wartość właściwości `color` bieżącego elementu",
      "Kolor tła elementu rodzica",
    ],
    answer: 1,
    explanation:
      "`currentColor` podstawia obliczoną wartość `color`. Jest wygodne dla ikon SVG (`fill: currentColor`), ramek i cieni, które mają mieć kolor tekstu: zmieniasz `color` na `:hover`, a ikona przemalowuje się razem z tekstem.",
    sources: ["mdn-color"],
  },
  {
    question: "Czym różnią się wartości `initial`, `inherit` i `unset`?",
    options: [
      "To synonimy: wszystkie trzy przywracają właściwość do domyślnej wartości przeglądarki",
      "`initial` pochodzi ze stylów przeglądarki, `inherit` z `:root`, `unset` usuwa właściwość",
      "`initial` to wartość ze specyfikacji, `inherit` — od rodzica, `unset` — jedna z dwóch zależnie od właściwości",
    ],
    answer: 2,
    explanation:
      "`initial` bierze wartość ze specyfikacji CSS (dla `display` to `inline`, a nie przeglądarkowe `block` dla `div`). Wartości ze stylów przeglądarki przywraca `revert`. `inherit` bierze obliczoną wartość rodzica. `unset` działa jak wartość „naturalna”: właściwości dziedziczone dziedziczą, pozostałe wracają do `initial`.",
    sources: ["mdn-css-values", "mdn-inheritance"],
  },
  {
    question: "Jak w BEM poprawnie nazwać klasę tytułu wewnątrz bloku `card` w wariancie „akcent”?",
    options: ["`card-title card-title_accent`", "`card__title card__title--accent`", "`card__title__accent`"],
    answer: 1,
    explanation:
      "BEM: blok (`card`), element z dwoma podkreślnikami (`card__title`), modyfikator z dwoma myślnikami (`card__title--accent`). Modyfikator idzie razem z klasą bazową, żeby nie duplikować stylów bazowych. Płaska struktura klas daje niską, jednolitą specyficzność i przewidywalną kaskadę.",
    sources: ["css-tricks-bem", "smashing-bem"],
  },
  {
    question: "Jak CSS Modules rozwiązują konflikty nazw klas?",
    options: [
      "Zabraniają podczas budowania używania tych samych nazw klas w projekcie",
      "Generują unikalne nazwy klas, przez co style są lokalne dla pliku",
      "Opakowują każdy komponent w Shadow DOM, izolując jego style",
    ],
    answer: 1,
    explanation:
      "Klasa `.title` z `Card.module.css` zamienia się w coś w rodzaju `Card_title__x7a2b`, a komponent importuje obiekt z mapowaniem. Konflikty znikają bez konwencji nazewnictwa. Style globalne oznacza się przez `:global`. Shadow DOM to mechanizm Web Components; CSS Modules go nie używają.",
    sources: ["css-modules", "next-css"],
  },
  {
    question: "Dlaczego `:focus-visible` jest lepszy niż `:focus` do stylowania obrysu fokusu?",
    options: [
      "Pokazuje obrys przy nawigacji klawiaturą i zwykle ukrywa go przy kliknięciu myszą",
      "Działa tylko na urządzeniach dotykowych bez wskaźnika myszy",
      "To przestarzała wersja `:focus` zachowana dla starych przeglądarek",
    ],
    answer: 0,
    explanation:
      "Projektanci prosili kiedyś o usunięcie „brzydkiej” ramki po kliknięciu, a `outline: none` psuło dostępność z klawiatury. `:focus-visible` używa heurystyki przeglądarki: przy nawigacji klawiaturą obrys jest widoczny, przy kliknięciu myszą przycisku zwykle nie. Nigdy nie usuwaj wskaźnika fokusu całkowicie.",
    sources: ["mdn-focus-visible", "mdn-a11y"],
  },
  {
    question: "Co robi `tabindex=\"-1\"`?",
    options: [
      "Ustawia element jako pierwszy w kolejności Tab, przed wszystkimi innymi",
      "Pozwala ustawić fokus tylko programowo (`el.focus()`), a nie przez Tab",
      "Całkowicie blokuje fokus na elemencie — przez Tab i z JavaScriptu",
    ],
    answer: 1,
    explanation:
      "`tabindex=\"0\"` dodaje element do naturalnej kolejności tabulacji, a `-1` sprawia, że fokus można ustawić tylko przez JS (np. nagłówek modala lub kontener przy przejściu do kotwicy). Wartości dodatnie zmieniają kolejność tabulacji i są uważane za antywzorzec. Aby całkowicie wyłączyć element z interakcji, używa się atrybutu `inert`.",
    sources: ["mdn-tabindex", "mdn-inert"],
  },
  {
    question: "Kiedy `aria-label` jest uzasadniony?",
    options: [
      "Zawsze, na każdym elemencie: pomaga wyszukiwarkom zrozumieć stronę",
      "Gdy element interaktywny nie ma widocznego tekstu, np. przycisk z ikoną",
      "Zamiast `alt` na obrazkach — to nowocześniejszy sposób",
    ],
    answer: 1,
    explanation:
      "`aria-label` nadaje elementowi dostępną nazwę, gdy nie ma widocznej etykiety: `<button aria-label=\"Close\">✕</button>`. Pierwsza zasada ARIA: nie używać jej, gdy istnieje natywna opcja: `alt` dla obrazków, `<label>` dla pól. `aria-label` nie wpływa na SEO, a zbędny może nadpisać czytelny widoczny tekst.",
    sources: ["mdn-aria", "wai-aria-apg"],
  },
  {
    question: "Jak w Tailwind zastosować dowolną wartość, której nie ma w motywie?",
    options: [
      "`w-(347px)`",
      "`w-[347px]`",
      "`w-347px`",
    ],
    answer: 1,
    explanation:
      "Nawiasy kwadratowe ustawiają dowolną wartość: `w-[347px]`, `bg-[#1da1f2]`, `grid-cols-[1fr_2fr]` (spacje zastępuje się podkreślnikami). W v4 nawiasy okrągłe to skrót dla zmiennej CSS: `w-(--sidebar-width)` = `width: var(--sidebar-width)`. Jeśli wartość często się powtarza, przenieś ją do motywu.",
    sources: ["tw-custom-styles", "tw-utility-first"],
  },
  {
    question: "Dlaczego nie można składać nazwy klasy Tailwind w stylu `` `bg-${color}-500` ``?",
    options: [
      "Tailwind zabrania template stringów w `className` i przerywa build",
      "Skaner szuka w kodzie pełnych nazw klas; klasa złożona w czasie działania nie trafi do CSS",
      "Działa to tylko w trybie deweloperskim, bo w produkcji JIT jest wyłączony",
    ],
    answer: 1,
    explanation:
      "Tailwind nie uruchamia twojego kodu; statycznie skanuje pliki w poszukiwaniu tokenów przypominających klasy. String `bg-${color}-500` nie zawiera pełnej nazwy, więc `bg-red-500` nie zostanie wygenerowany. Prawidłowo jest mapować na pełne nazwy: `{ red: \"bg-red-500\", blue: \"bg-blue-500\" }[color]`.",
    sources: ["tw-detecting-classes"],
  },
  {
    question: "Jak w Tailwind v4 dodać własny kolor `brand`, aby działały `bg-brand`, `text-brand` itd.?",
    options: [
      "Zadeklarować `--color-brand` wewnątrz `@theme` w CSS",
      "Utworzyć klasę `.bg-brand` w osobnym pliku CSS",
      "Przekazać kolor przez atrybut `data-brand` na `<html>`",
    ],
    answer: 0,
    explanation:
      "W v4 konfiguracja przeniosła się do CSS: zmienne w `@theme { --color-brand: oklch(...); }` tworzą zarówno utility (`bg-brand`, `border-brand`), jak i zwykłą zmienną CSS `var(--color-brand)`. Stary `tailwind.config.js` jest obsługiwany przez `@config`, ale domyślnie nie jest potrzebny.",
    sources: ["tw-theme", "tw-v4"],
  },
  {
    question: "Do czego służą `group` i `peer` w Tailwind?",
    options: [
      "Do łączenia kilku utility w jedną klasę wielokrotnego użytku, jak `@apply`",
      "Do stylowania na podstawie stanu rodzica (`group-hover:`) lub rodzeństwa (`peer-checked:`)",
      "Do grupowania kilku media queries pod jednym breakpointem",
    ],
    answer: 1,
    explanation:
      "Na rodzicu ustawia się `group`, a na potomku pisze `group-hover:text-white` — styl zadziała po najechaniu na rodzica. `peer` działa dla kolejnego rodzeństwa: `<input class=\"peer\">` + `<p class=\"peer-invalid:visible\">`. Łączenie klas w jedną to `@apply`.",
    sources: ["tw-states"],
  },
  {
    question: "Komponent React łączy zewnętrzne klasy: `className={\"p-2 \" + props.className}` i dostaje `p-4`. Jaki będzie padding?",
    options: [
      "Zawsze `p-4`: wygrywa klasa zapisana później w atrybucie `class`",
      "Zależy od kolejności reguł w CSS, a nie w `class` — dlatego istnieje `tailwind-merge`",
      "Zawsze `p-2`: wygrywa klasa zapisana jako pierwsza w atrybucie `class`",
    ],
    answer: 1,
    explanation:
      "Kolejność klas w atrybucie `class` nie wpływa na kaskadę: przy równej specyficzności wygrywa reguła, która jest później w pliku CSS. Dlatego wynik `p-2 p-4` jest nieprzewidywalny z punktu widzenia komponentu. `tailwind-merge` (często przez helper `cn()`) usuwa konfliktujące klasy i zostawia ostatnią.",
    sources: ["tw-merge", "mdn-cascade"],
  },
  {
    question: "Do czego służy dyrektywa `@apply` w Tailwind i dlaczego nie należy jej nadużywać?",
    options: [
      "Ładuje pluginy Tailwinda; bez niej utility w markupie nie działają",
      "Stosuje utility tylko w buildzie produkcyjnym i ignoruje je w dev",
      "Wstawia utility do własnej klasy; nadużywana powiększa CSS i niweczy podejście",
    ],
    answer: 2,
    explanation:
      "`.btn { @apply px-4 py-2 rounded; }` jest wygodne do stylowania zewnętrznego HTML lub elementów bazowych. Ale przepisanie całego projektu na `@apply` daje zwykły CSS z dodatkową warstwą abstrakcji i większą paczką. W Tailwind ponowne użycie zwykle rozwiązuje się komponentami (React), a nie klasami.",
    sources: ["tw-functions-directives", "tw-custom-styles"],
  },
  {
    question: "Jak uwzględnić użytkowników, którym animacje sprawiają dyskomfort?",
    options: [
      "Użyć `prefers-reduced-motion: reduce`, aby uprościć lub wyłączyć animacje",
      "Utrzymywać każdą animację krótszą niż sekunda, żeby nikomu nie przeszkadzała",
      "Animować tylko `opacity`, bo nigdy nie powoduje dyskomfortu",
    ],
    answer: 0,
    explanation:
      "Użytkownicy mogą włączyć w systemie „ograniczenie ruchu” (zaburzenia błędnika, migreny). `@media (prefers-reduced-motion: reduce)` pozwala zastąpić paralaksę i duże ruchy łagodnymi przejściami. Tailwind ma do tego warianty `motion-reduce:` i `motion-safe:`.",
    sources: ["mdn-prefers-reduced-motion", "wcag-quickref"],
  },
  {
    question: "Jak zbudować układ dwukolumnowy z sidebarem o stałej szerokości i treścią wypełniającą resztę?",
    options: [
      "`display: grid; grid-template-columns: 250px 1fr`",
      "`display: grid; grid-template-columns: 250px 100%;`",
      "`display: flex` i `width: 50%;` na obu kolumnach",
    ],
    answer: 0,
    explanation:
      "`250px 1fr` — pierwsza kolumna jest stała, druga zajmuje całą pozostałą przestrzeń. `100%` w drugiej kolumnie wyszłoby poza kontener o 250px. Odpowiednik we Flexbox: `flex: 0 0 250px` dla sidebara, `flex: 1` dla treści (i ewentualnie `min-width: 0`).",
    sources: ["mdn-grid", "mdn-flex"],
  },
  {
    question: "Który format obrazów zwykle daje najlepszą kompresję zdjęć w nowoczesnych przeglądarkach?",
    options: [
      "BMP, bo przechowuje piksele bez utraty jakości",
      "AVIF lub WebP, w razie potrzeby z fallbackiem do JPEG",
      "PNG-24, bo jest bezstratny i obsługuje kanał alfa",
    ],
    answer: 1,
    explanation:
      "AVIF i WebP ważą wyraźnie mniej niż JPEG przy tej samej jakości. Bezstratny PNG jest dla grafiki z przezroczystością i ostrymi krawędziami, ale dla zdjęć jest ogromny. BMP w ogóle nie jest kompresowany. Do ikon i logo lepsze jest SVG. Fallbacki robi się przez `<picture>` lub automatycznie przez CDN/optymalizator (np. `next/image`).",
    sources: ["webdev-image-formats", "mdn-picture"],
  },
  {
    question: "Jak poprawnie dołączyć style tylko do druku?",
    options: [
      "Atrybut `media=\"print\"` na `<link>` lub blok `@media print`",
      "Wywołać `window.print()` — załaduje style do druku",
      "Podać typ stylu: `<style type=\"print\">`",
    ],
    answer: 0,
    explanation:
      "`media=\"print\"` i `@media print` stosują style tylko przy drukowaniu: ukryj nawigację i reklamy, usuń tła, pokaż adresy linków przez `a::after { content: \" (\" attr(href) \")\" }`, steruj podziałem stron przez `break-inside: avoid`. `window.print()` tylko otwiera okno drukowania.",
    sources: ["mdn-print", "mdn-media-queries"],
  },
];

export default questions;
