import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Jak warstwy kaskadowe `@layer` wpływają na priorytet stylów?",
    options: [
      "Warstwy są sortowane według specyficzności ich najsilniejszego selektora",
      "Kolejność warstw wygrywa ze specyficznością: wygrywa późniejsza warstwa",
      "Warstwy wpływają tylko na `!important`; zwykłe reguły pozostają bez zmian",
    ],
    answer: 1,
    explanation:
      "Kaskada najpierw porównuje warstwy, a dopiero potem specyficzność w obrębie warstwy. Dlatego `.btn` w warstwie `components` wygrywa z `#app .btn` we wcześniejszej warstwie `base`. Style poza warstwami są silniejsze od każdej warstwy. Dla `!important` kolejność jest odwrócona: ważne deklaracje we wcześniejszej warstwie wygrywają. Tailwind v4 buduje swoje style na warstwach `theme`, `base`, `components` i `utilities`.",
    sources: ["mdn-cascade-layers", "mdn-cascade"],
  },
  {
    question: "Jak zwykłe (bez `!important`) style w warstwach i poza warstwami mają się do siebie?",
    options: [
      "Style poza warstwami są silniejsze od każdej warstwy",
      "Style poza warstwami są słabsze od każdej warstwy",
      "Style poza warstwami liczą się jako osobna warstwa w miejscu deklaracji",
    ],
    answer: 0,
    explanation:
      "Style poza warstwami niejawnie trafiają do „ostatniej” warstwy i wygrywają ze wszystkimi nazwanymi warstwami. Dzięki temu można opakować zewnętrzny CSS w `@layer vendor` i łatwo nadpisać go własnymi stylami. Z `!important` logika się odwraca: ważne style w warstwach wygrywają z ważnymi stylami poza warstwami.",
    sources: ["mdn-cascade-layers"],
  },
  {
    question: "Co robi `@scope (.card) to (.card__content) { img { ... } }`?",
    options: [
      "Styluje `img` wewnątrz `.card`, ale nie wewnątrz `.card__content`",
      "Styluje `img` tylko wewnątrz `.card__content` zagnieżdżonego w `.card`",
      "Tworzy Shadow DOM dla `.card` i izoluje jego style od strony",
    ],
    answer: 0,
    explanation:
      "`@scope` definiuje korzeń zakresu i opcjonalną „dolną granicę” (donut scope): style działają wewnątrz `.card`, ale nie sięgają do `.card__content` i jego potomków. Dodatkowo przy równej specyficzności wygrywa reguła z bliższym korzeniem (scoping proximity). `@scope` nie tworzy Shadow DOM.",
    sources: ["mdn-scope"],
  },
  {
    question: "Jaki problem rozwiązuje `subgrid`?",
    options: [
      "Pozwala siatce mieć więcej niż 12 kolumn bez zagnieżdżonych kontenerów",
      "Daje zagnieżdżonej siatce ścieżki rodzica, wyrównując części między kartami",
      "Automatycznie tworzy responsywną siatkę bez media queries i `minmax()`",
    ],
    answer: 1,
    explanation:
      "Z `grid-template-rows: subgrid` siatka potomna dziedziczy linie rodzica. Klasyczny przykład to rząd kart, których tytuły, teksty i przyciski mają być wyrównane, nawet gdy tytuł jednej karty zawija się do dwóch linii. Bez subgrid każda karta wyrównuje się niezależnie.",
    sources: ["mdn-subgrid", "css-tricks-grid"],
  },
  {
    question: "Przez jakie etapy przechodzi przeglądarka, aby zaktualizować klatkę po zmianie stylu?",
    options: [
      "Paint → Layout → Style → Composite",
      "Style → Layout → Paint → Composite",
      "Layout → Composite → Style → Paint",
    ],
    answer: 1,
    explanation:
      "Potok renderowania: przeliczenie stylów (Style) → geometria (Layout/Reflow) → malowanie pikseli warstw (Paint) → kompozycja warstw (Composite). Zmiana `width` uruchamia wszystko od Layout, zmiana `color` — od Paint, a `transform` i `opacity` mogą obejść się samym Composite.",
    sources: ["webdev-rendering", "webdev-animations"],
  },
  {
    question: "Czym jest layout thrashing (wymuszony synchroniczny layout)?",
    code: `for (const el of items) {
  el.style.width = box.offsetWidth + "px";
}`,
    options: [
      "Wielokrotne przeliczanie layoutu wywołane przeplataniem odczytów i zapisów w pętli",
      "Gdy animacja CSS `width` przelicza layout w każdej klatce",
      "Błąd przeglądarki wywołany zbyt głębokim drzewem DOM na stronie",
    ],
    answer: 0,
    explanation:
      "Odczyt `offsetWidth` po zapisie stylu zmusza przeglądarkę do synchronicznego przeliczenia layoutu, aby zwrócić aktualną wartość. W pętli dzieje się to w każdej iteracji. Rozwiązanie: najpierw odczytać wszystkie wartości, potem zapisywać (grupowanie odczytów/zapisów), albo wynieść odczyt poza pętlę. Pomagają też biblioteki typu fastdom.",
    sources: ["webdev-layout-thrashing", "webdev-rendering"],
  },
  {
    question: "Co daje `contain: layout paint` (lub `contain: content`)?",
    options: [
      "Obietnicę, że zawartość nie wpływa na zewnętrzny layout i malowanie, co zawęża przeliczenia",
      "Zakaz zmiany rozmiaru elementu po pierwszym malowaniu",
      "Tylko przycina zawartość jak `overflow: hidden`, ale bez paska przewijania",
    ],
    answer: 0,
    explanation:
      "CSS Containment izoluje poddrzewo: zmiany w środku nie wymuszają layoutu i malowania reszty strony. Przydatne w widżetach, feedach i złożonych komponentach. Efekt uboczny: `paint` przycina zawartość do granic i tworzy blok zawierający oraz kontekst nakładania, więc nie stosuj go bezmyślnie.",
    sources: ["mdn-contain"],
  },
  {
    question: "Jak `content-visibility: auto` przyspiesza długie strony?",
    options: [
      "Leniwie ładuje obrazki i iframe'y wewnątrz elementu, jak `loading=lazy`",
      "Pomija layout i malowanie elementów poza ekranem, dopóki nie są potrzebne",
      "Usuwa niewidoczne elementy z DOM i przywraca je przy przewijaniu",
    ],
    answer: 1,
    explanation:
      "Przeglądarka nie renderuje sekcji poza viewportem, oszczędzając czas przy pierwszym malowaniu. Aby pasek przewijania nie skakał, podaje się oczekiwany rozmiar przez `contain-intrinsic-size: auto 500px`. DOM pozostaje nietknięty: wyszukiwanie na stronie i dostępność działają, w przeciwieństwie do wirtualizacji.",
    sources: ["mdn-content-visibility", "webdev-content-visibility"],
  },
  {
    question: "Dlaczego `::before` i `::after` nie działają na `<img>` i `<input>`?",
    options: [
      "Te elementy mają domyślnie `display: inline`, a pseudoelementy potrzebują bloku",
      "To elementy zastępowane lub puste — nie ma treści, do której można wstawić",
      "To znany błąd Chromium; w Firefoksie pseudoelementy na nich działają",
    ],
    answer: 1,
    explanation:
      "`::before`/`::after` są wstawiane wewnątrz elementu, przed i po jego treści. Treść `<img>`, `<video>`, `<iframe>` jest zastępowana zewnętrznym zasobem, a `<input>` i `<br>` to elementy puste. Obejście: opakować element w kontener i dołączyć pseudoelement do niego. `display` nie ma znaczenia: pseudoelementy działają na `<span>` z `inline`.",
    sources: ["mdn-replaced-elements", "mdn-pseudo-elements"],
  },
  {
    question: "Do czego `float` nadal się nadaje we współczesnych układach?",
    options: [
      "Do głównych układów kolumnowych: jest pewniejszy niż Grid w starych przeglądarkach",
      "Do opływania tekstem obrazka lub cytatu wewnątrz artykułu",
      "Do niczego: `float` jest przestarzały i usunięty ze specyfikacji",
    ],
    answer: 1,
    explanation:
      "Layouty stron od dawna buduje się na Flexbox i Grid, ale opływanie tekstem — pierwotne przeznaczenie `float` — nie ma zamiennika. W połączeniu z `shape-outside` tekst może nawet opływać obrazek wzdłuż jego kształtu. Właściwość nie jest ani przestarzała, ani usunięta.",
    sources: ["mdn-float", "mdn-bfc"],
  },
  {
    question: "Dlaczego dla breakpointów w media queries często zaleca się `em` zamiast `px`?",
    options: [
      "`em` w media queries uwzględnia rozmiar czcionki ustawiony przez użytkownika",
      "`px` w media queries działa niepoprawnie w Safari na iOS",
      "`em` w media queries jest liczony od szerokości elementu rodzica",
    ],
    answer: 0,
    explanation:
      "W media queries `em` i `rem` opierają się na początkowym rozmiarze czcionki przeglądarki (zwykle 16px), a nie na stylach strony. Jeśli użytkownik powiększy bazową czcionkę, układ wcześniej przełączy się na „wąską” wersję — tekst nie będzie ściśnięty. Z `px` tak się nie stanie. Tailwind v4 definiuje breakpointy w `rem` z tego samego powodu.",
    sources: ["mdn-media-queries", "mdn-units"],
  },
  {
    question: "Co stanie się z elementem `position: fixed`, jeśli przodek ma `transform: translateZ(0)`?",
    options: [
      "Nic: `fixed` jest zawsze pozycjonowany względem okna przeglądarki",
      "Zacznie być pozycjonowany względem tego przodka",
      "Element przestanie się renderować, dopóki przodek ma `transform`",
    ],
    answer: 1,
    explanation:
      "Przodek z `transform`, `filter`, `perspective`, `contain: paint` lub `will-change: transform` staje się blokiem zawierającym dla potomków `fixed`. Modal wewnątrz animowanego kontenera nagle „przykleja się” do kontenera zamiast do okna. Dlatego modale i toasty renderuje się przez portal na poziomie `body`.",
    sources: ["mdn-containing-block", "mdn-position"],
  },
  {
    question: "Czym `overflow: clip` różni się od `overflow: hidden`?",
    options: [
      "`clip` przycina bez tworzenia kontenera przewijania i nie psuje `sticky`",
      "`clip` przycina tylko poziomo, a `hidden` w obu osiach",
      "To synonimy: `clip` to po prostu nowy zapis tej samej wartości",
    ],
    answer: 0,
    explanation:
      "`overflow: hidden` czyni element kontenerem przewijania (można go przewijać programowo), więc potomkowie sticky zaczynają przyklejać się do niego. `clip` po prostu przycina malowanie, zabrania jakiegokolwiek przewijania i nie tworzy BFC. Osie można ustawiać osobno (`overflow-x: clip`), a margines przycięcia — przez `overflow-clip-margin`.",
    sources: ["mdn-overflow", "mdn-position"],
  },
  {
    question: "Jak dołączać moduły Sass teraz, gdy `@import` jest przestarzały?",
    options: [
      "Przez `@require`, które zastąpiło `@import` w Dart Sass 2",
      "Przez `@use` z przestrzenią nazw i `@forward` do reeksportu",
      "Tylko zwykłym CSS-owym `@import url()`, bo moduły Sass usunięto",
    ],
    answer: 1,
    explanation:
      "`@use 'tokens'` ładuje moduł raz i nadaje mu przestrzeń nazw (`tokens.$primary`) bez zaśmiecania zakresu globalnego. `@forward` reeksportuje elementy modułu, tworząc publiczne API biblioteki stylów. Sassowy `@import` jest przestarzały i zostanie usunięty w Dart Sass 3.0. Dyrektywy `@require` nie ma.",
    sources: ["sass-use", "sass-import-deprecation"],
  },
  {
    question: "Czym Dart Sass różni się od Node Sass?",
    options: [
      "Node Sass (LibSass) jest przestarzały; Dart Sass to główna implementacja",
      "Dart Sass działa tylko w projektach Flutter i wymaga Dart SDK",
      "Node Sass jest szybszy i obsługuje więcej składni, w tym `@use`",
    ],
    answer: 0,
    explanation:
      "LibSass i Node Sass są przestarzałe i nie obsługują `@use` ani systemu modułów. Dart Sass to implementacja referencyjna, publikowana w npm jako `sass` (oraz `sass-embedded`). Migracja polega na usunięciu `node-sass`, instalacji `sass` i stopniowym przejściu z `@import` na `@use` oraz z dzielenia `/` na `math.div`.",
    sources: ["sass-docs", "sass-import-deprecation"],
  },
  {
    question: "Jakie problemy ma runtime CSS-in-JS (styled-components, Emotion) z SSR i React Server Components?",
    options: [
      "Żadnych: są w pełni kompatybilne z Server Components i streamingiem",
      "Style tworzone są w czasie działania: trzeba je zebrać przy SSR, a RSC nie mają kontekstu",
      "Nie potrafią definiować media queries i pseudoklas podczas SSR",
    ],
    answer: 1,
    explanation:
      "Runtime CSS-in-JS oblicza style podczas renderowania i wstrzykuje je do dokumentu: na serwerze style trzeba zebrać i wstawić do HTML (inaczej pojawia się mignięcie), a na kliencie płaci się kosztem runtime'u. Opierają się na React Context, którego Server Components nie mają, więc takie komponenty muszą być klienckie. Alternatywy: CSS Modules, Tailwind, rozwiązania zero-runtime (vanilla-extract, Linaria, Panda).",
    sources: ["next-css", "react-server-components"],
  },
  {
    question: "Które techniki zmniejszają wagę i wpływ na wydajność własnego fontu webowego?",
    options: [
      "Zamienić font na sprite PNG i rysować litery jako tła",
      "Załadować wszystkie grubości naraz, żeby przeglądarka zawczasu je zcache'owała",
      "WOFF2, subsetting, `preload` głównej grubości i `font-display`",
    ],
    answer: 2,
    explanation:
      "WOFF2 kompresuje najlepiej. Subsetting usuwa nieużywane glify (np. zostawia tylko łacinkę i cyrylicę), a `unicode-range` pozwala przeglądarce pobrać tylko potrzebne podzbiory. `preload` przyspiesza główną grubość, `font-display` usuwa niewidoczny tekst. Font zmienny (variable font) zastępuje kilka plików grubości jednym. W Next.js dużą część tego załatwia `next/font`.",
    sources: ["webdev-font-best-practices", "mdn-font-display", "next-fonts"],
  },
  {
    question: "Jak zmienia się strategia łączenia zasobów przy przejściu z HTTP/1.1 na HTTP/2+?",
    options: [
      "Nic się nie zmienia: protokół nie wpływa na buildy frontendu",
      "Przy HTTP/2 trzeba łączyć absolutnie wszystkie pliki w jedną paczkę",
      "Multipleksowanie czyni żądania tańszymi, więc mniejsze chunki się opłacają",
    ],
    answer: 2,
    explanation:
      "Przy HTTP/1.1 przeglądarki trzymają ~6 połączeń na domenę, więc łączyliśmy pliki, używaliśmy sprite'ów i shardingu domen. HTTP/2 i HTTP/3 multipleksują żądania w jednym połączeniu, przez co te hacki są mniej potrzebne, a nawet szkodliwe: jedna ogromna paczka unieważnia cały cache przy każdej zmianie. Całkowita rezygnacja z bundlingu wciąż jest rzadka — kompresja i łańcuchy importów nadal mają znaczenie.",
    sources: ["webdev-render-blocking", "mdn-cache-control"],
  },
  {
    question: "Czym jest budżet wydajności (performance budget)?",
    options: [
      "Budżet zespołu na CDN, hosting i płatne narzędzia monitoringu",
      "Uzgodnione limity metryk (waga JS, LCP), sprawdzane w CI",
      "Maksymalna liczba animacji i filmów dozwolona na stronie",
    ],
    answer: 1,
    explanation:
      "Budżet wydajności ustala progi — np. „JS strony głównej ≤ 170 KB po gzip” lub „LCP ≤ 2,5 s na 4G” — sprawdzane automatycznie (Lighthouse CI, size-limit, bundlesize). Regresje wychwytuje się przed wydaniem, a decyzje o nowych bibliotekach uwzględniają ich koszt.",
    sources: ["webdev-performance-budgets", "webdev-vitals"],
  },
  {
    question: "Czym dane laboratoryjne (Lighthouse) różnią się od danych terenowych (CrUX, RUM)?",
    options: [
      "Laboratorium to kontrolowany pomiar; dane terenowe pochodzą od prawdziwych użytkowników",
      "Dane laboratoryjne są dokładniejsze i przy poprawnej konfiguracji pokrywają się z terenowymi",
      "Dane terenowe zbiera się tylko dla urządzeń mobilnych na 4G",
    ],
    answer: 0,
    explanation:
      "Dane laboratoryjne są powtarzalne i wygodne do debugowania, ale nie oddają prawdziwej różnorodności urządzeń, sieci i scenariuszy. Dane terenowe (Chrome UX Report, własny RUM przez `web-vitals`) pokazują, czego naprawdę doświadczają użytkownicy, i na ich podstawie Google ocenia Core Web Vitals. INP w ogóle nie da się zmierzyć w laboratorium bez prawdziwych interakcji.",
    sources: ["webdev-lab-field", "webdev-vitals"],
  },
  {
    question: "Jakie trzy metryki tworzą dziś Core Web Vitals?",
    options: [
      "FCP, TTI i TBT",
      "LCP, INP i CLS",
      "LCP, FID i CLS",
    ],
    answer: 1,
    explanation:
      "LCP — szybkość ładowania głównej treści (dobrze ≤ 2,5 s), INP — responsywność na interakcje (≤ 200 ms), CLS — stabilność wizualna (≤ 0,1). INP zastąpił FID w marcu 2024, bo FID mierzył tylko opóźnienie pierwszej interakcji. FCP i TBT są przydatne, ale pomocnicze.",
    sources: ["webdev-vitals", "webdev-inp"],
  },
  {
    question: "Jak zbudować poziomą galerię ze slajdami, które „zatrzaskują się” na miejscu bez JavaScriptu?",
    options: [
      "`scroll-snap-type: x mandatory` na torze, `scroll-snap-align` na slajdach",
      "`position: sticky` i `left: 0` na każdym slajdzie wewnątrz toru",
      "`@keyframes` z nieskończoną animacją `translateX` na torze",
    ],
    answer: 0,
    explanation:
      "CSS Scroll Snap: kontener z `overflow-x: auto` i `scroll-snap-type: x mandatory`, slajdy z `scroll-snap-align`. Przeglądarka dosuwa przewijanie do najbliższego slajdu i obsługuje dotyk, kółko i klawiaturę. `scroll-padding` uwzględnia elementy przypięte. JS potrzebny jest tylko do przycisków poprzedni/następny i wskaźników.",
    sources: ["mdn-scroll-snap"],
  },
  {
    question: "Co umożliwia `@property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }`?",
    options: [
      "Zadeklarowanie typowanej zmiennej, którą przeglądarka potrafi animować",
      "Utworzenie stałej, której nie można nadpisać w kaskadzie",
      "Podpięcie handlera JavaScript wywoływanego przy zmianie właściwości",
    ],
    answer: 0,
    explanation:
      "Zwykła zmienna CSS to po prostu string, więc w animacji przeskakuje. Właściwość zarejestrowana przez `@property` (część Houdini) ma typ, a więc animuje się płynnie: tak robi się obracające się gradienty stożkowe i animację pojedynczych kanałów koloru. Można też wyłączyć dziedziczenie i ustawić wartość początkową.",
    sources: ["mdn-property-rule", "mdn-custom-properties"],
  },
  {
    question: "Jak ostylować wnętrze Web Componentu, gdy Shadow DOM izoluje jego style?",
    options: [
      "Selektorami globalnymi z `!important` — przebijają shadow root",
      "Przez zmienne CSS (dziedziczą się przez granicę) i `::part()`",
      "Nie da się: Shadow DOM całkowicie zabrania stylowania z zewnątrz",
    ],
    answer: 1,
    explanation:
      "Zewnętrzne selektory nie sięgają do shadow root, nawet z `!important`. Ale właściwości dziedziczone (`color`, `font`) i właściwości niestandardowe przechodzą przez granicę — na nich buduje się motywy. Autor komponentu może wystawić części przez `part=\"label\"`, stylowane z zewnątrz przez `my-el::part(label)`. Treść w slotach (light DOM) styluje się zwykłym CSS.",
    sources: ["mdn-shadow-dom", "mdn-web-components"],
  },
  {
    question: "Czym różnią się `min-content`, `max-content` i `fit-content` jako wartości szerokości?",
    options: [
      "To synonimy `0`, `100%` i `auto`, dodane dla czytelności",
      "Minimum według najdłuższego słowa, szerokość bez zawijania i ograniczone `max-content`",
      "To wartości tylko dla ścieżek Grid i nie działają na zwykłych blokach",
    ],
    answer: 1,
    explanation:
      "To rozmiary wewnętrzne (intrinsic), zależne od treści. `width: fit-content` jest wygodne dla płynnych odznak i przycisków, które nie powinny rozciągać się na całą szerokość. W Grid używa się ich w definicjach ścieżek: `grid-template-columns: max-content 1fr`.",
    sources: ["mdn-intrinsic-size", "mdn-grid"],
  },
  {
    question: "Co tworzy nowy kontekst nakładania nawet bez `position` i `z-index`?",
    options: [
      "`opacity` poniżej 1, `transform`, `filter`, `isolation: isolate`",
      "Każdy element z `display: block` lub `display: flex`",
      "Niezerowy `margin` lub `padding`, a także `border`",
    ],
    answer: 0,
    explanation:
      "Kontekst nakładania tworzą: element główny, elementy pozycjonowane z `z-index`, elementy flex/grid z `z-index`, `opacity < 1`, `transform`, `filter`, `perspective`, `mix-blend-mode`, `isolation: isolate`, `contain: paint` i `will-change` z takimi właściwościami. `isolation: isolate` to „najczystszy” sposób utworzenia go bez efektów ubocznych.",
    sources: ["mdn-stacking-context"],
  },
  {
    question: "W jakich warunkach pionowe marginesy rodzica i jego pierwszego dziecka się zapadają?",
    options: [
      "Tylko jeśli rodzic ma `display: flex` lub `grid`",
      "Tylko jeśli oba marginesy są ujemne lub zerowe",
      "Jeśli nie rozdziela ich `border`, `padding` ani tekst i nie ma BFC",
    ],
    answer: 2,
    explanation:
      "`margin-top` pierwszego dziecka „wypada” na zewnątrz rodzica, jeśli nic ich nie rozdziela. Zapadaniu zapobiega `padding` lub `border` na rodzicu, `display: flow-root` albo kontener flex/grid — w nich marginesy nigdy się nie zapadają. Przy wartościach ujemnych wynik to największa dodatnia plus najbardziej ujemna.",
    sources: ["mdn-margin-collapse", "mdn-bfc"],
  },
  {
    question: "Dlaczego długie słowo lub szeroka tabela może „rozsadzić” kolumnę grid `1fr`?",
    options: [
      "`1fr` oznacza `minmax(auto, 1fr)`: ścieżka nie może być węższa niż min-content",
      "`fr` jest liczony od szerokości okna przeglądarki, a nie kontenera",
      "To błąd silnika, już naprawiony w najnowszych przeglądarkach",
    ],
    answer: 0,
    explanation:
      "Dla ścieżek `fr` domyślnym minimum jest `auto`, czyli nie mniej niż minimalna treść. Szeroki element powiększa ścieżkę i kolumny przestają być równe. Rozwiązanie: `minmax(0, 1fr)` w definicji ścieżki lub `min-width: 0` / `overflow: hidden` na elemencie.",
    sources: ["mdn-minmax", "mdn-grid"],
  },
  {
    question: "Dlaczego `oklch()` jest wygodniejszy od `hsl()` w systemach projektowych?",
    options: [
      "Wyświetla kolory dokładniej na starych monitorach sRGB niż `hsl()`",
      "Jest percepcyjnie równomierny: równe L wygląda równie jasno w różnych odcieniach",
      "Jest bardziej zwarty, zapisywany szesnastkowo z kanałem alfa",
    ],
    answer: 1,
    explanation:
      "W HSL żółty i niebieski o tej samej „jasności” wyglądają zupełnie inaczej, więc palety trzeba stroić ręcznie. OKLCH opiera się na modelu percepcji, więc skale odcieni generują się przewidywalnie, co upraszcza kontrast. Domyślna paleta Tailwind v4 jest zdefiniowana w OKLCH.",
    sources: ["mdn-color", "tw-v4"],
  },
  {
    question: "Do czego służy `color-mix(in oklch, var(--brand) 80%, white)`?",
    options: [
      "Do mieszania kolorów w CSS — jasny odcień koloru marki bez hardkodowania",
      "Do automatycznego doboru kontrastowego koloru tekstu na tle marki",
      "Do płynnej animacji między dwoma kolorami przez 80% czasu trwania",
    ],
    answer: 0,
    explanation:
      "`color-mix()` miesza kolory w podanej przestrzeni barw w podanej proporcji. Pozwala wyprowadzić stany hover, półprzezroczyste warianty (`color-mix(in srgb, red, transparent 50%)`) i odcienie z jednej zmiennej marki. Tailwind v4 używa go do modyfikatorów przezroczystości typu `bg-brand/50`.",
    sources: ["mdn-color-mix"],
  },
  {
    question: "Co daje natywne zagnieżdżanie CSS (`&`)?",
    code: `.card {
  padding: 1rem;
  &:hover { background: #eee; }
  .title { font-weight: 600; }
}`,
    options: [
      "Nic: bez Sass lub PostCSS ten kod jest w przeglądarce niepoprawny",
      "Przeglądarki natywnie rozumieją zagnieżdżanie; `&` odnosi się do selektora rodzica",
      "Zagnieżdżone reguły dotyczą tylko bezpośrednich dzieci `.card`",
    ],
    answer: 1,
    explanation:
      "CSS Nesting obsługują wszystkie nowoczesne przeglądarki. Różnice wobec Sass: zagnieżdżone selektory działają tak, jakby były opakowane w `:is()`, co wpływa na specyficzność, i nie można sklejać stringów typu `&__title` — to możliwość tylko preprocesorów.",
    sources: ["mdn-nesting"],
  },
  {
    question: "Do czego służy CSS Anchor Positioning?",
    options: [
      "Do przywiązania tooltipa lub popovera do innego elementu bez obliczeń w JS",
      "Do płynnego przewijania strony do kotwicy `#section` po kliknięciu linku",
      "Do przypięcia elementu do dołu ekranu nad treścią, jak `sticky`",
    ],
    answer: 0,
    explanation:
      "Kotwicę deklaruje się przez `anchor-name: --btn`, a pozycjonowany element odwołuje się do niej przez `position-anchor` i funkcję `anchor()` (lub `position-area`). Są wartości zapasowe na brak miejsca (`position-try-fallbacks`). Wcześniej wymagało to bibliotek typu Floating UI. Obsługa w przeglądarkach nie jest jeszcze wszędzie pełna — sprawdź ją przed użyciem.",
    sources: ["mdn-anchor-positioning"],
  },
  {
    question: "Czym jest View Transitions API?",
    options: [
      "API do leniwego ładowania fragmentów strony podczas przewijania",
      "API do animowania przejść między stanami DOM lub stronami",
      "API do płynnego przełączania między ciemnym i jasnym motywem",
    ],
    answer: 1,
    explanation:
      "`document.startViewTransition(() => updateDOM())` zapamiętuje stary stan, stosuje zmiany i animuje przejście przez pseudoelementy `::view-transition-old/new`, stylowane zwykłym CSS. Aplikacje wielostronicowe (MPA) dostają przejścia między dokumentami przez `@view-transition`. React 19.2 dodał komponent `<ViewTransition>`.",
    sources: ["mdn-view-transitions"],
  },
  {
    question: "Jakie jest minimum dla dostępnego okna modalnego?",
    options: [
      "Wystarczy `z-index: 9999`, przyciemnione tło i przycisk zamykania",
      "Fokus przeniesiony do środka i uwięziony, Esc, przywrócenie fokusu, nieaktywne tło",
      "`aria-hidden=\"true\"` na samym modalu plus `role=\"alert\"`",
    ],
    answer: 1,
    explanation:
      "Użytkownicy klawiatury i czytników ekranu muszą dostać się do modala, nie „wypadać” z niego Tabem, zamknąć go i wrócić tam, gdzie byli. Natywny `<dialog>` z `showModal()` robi większość: tło staje się nieaktywne, Esc zamyka, fokus się przenosi. Potrzebna jest też etykieta przez `aria-labelledby`. `aria-hidden` na modalu ukryłby go przed czytnikami ekranu.",
    sources: ["wai-dialog-pattern", "mdn-dialog", "mdn-inert"],
  },
  {
    question: "Co robi atrybut `inert`?",
    options: [
      "Wyłącza animacje i przejścia CSS wewnątrz elementu i jego potomków",
      "Czyni poddrzewo nieinteraktywnym i ukrytym przed technologiami wspomagającymi",
      "Zabrania przeglądarce przemalowywać element, dopóki nie zostanie usunięty",
    ],
    answer: 1,
    explanation:
      "`inert` to natywny sposób „wyłączenia” części strony: np. głównej treści, gdy otwarty jest panel boczny. Wcześniej trzeba było ręcznie ustawiać `tabindex=\"-1\"` na każdym fokusowalnym elemencie plus `aria-hidden`. Modalny `<dialog>` automatycznie czyni resztę dokumentu nieaktywną.",
    sources: ["mdn-inert"],
  },
  {
    question: "Jakiego minimalnego kontrastu tekstu wymaga WCAG na poziomie AA dla zwykłego tekstu?",
    options: ["3:1 dla każdego tekstu", "4.5:1 dla zwykłego tekstu", "7:1 dla każdego tekstu"],
    answer: 1,
    explanation:
      "AA: 4,5:1 dla zwykłego tekstu i 3:1 dla dużego (od 24px lub ~18,7px pogrubionego), a także dla komponentów interfejsu i znaczącej grafiki. 7:1 to wymóg AAA. Poziom AA to standardowy cel i w wielu krajach wymóg prawny (EN 301 549 w UE, w praktyce ADA w USA).",
    sources: ["wcag-quickref", "mdn-a11y"],
  },
  {
    question: "Czym różnią się poziomy zgodności WCAG A, AA i AAA?",
    options: [
      "To wersje standardu: A — WCAG 1.0, AA — 2.0, AAA — 2.2",
      "Poziomy rygoru: A — minimum, AA — zwykły cel, AAA — maksimum",
      "Platformy docelowe: A — mobile, AA — desktop, AAA — druk",
    ],
    answer: 1,
    explanation:
      "Każde kryterium sukcesu WCAG ma poziom. A obejmuje podstawy (tekst alternatywny, obsługa klawiaturą), AA dodaje kontrast, widoczny fokus i spójną nawigację, AAA — surowe wymagania, takie jak kontrast 7:1 i język migowy dla wideo. Wersje standardu to 2.0, 2.1 i 2.2.",
    sources: ["wcag-quickref", "wd-a11y"],
  },
  {
    question: "Kiedy atrybuty ARIA są potrzebne, a kiedy lepiej się bez nich obejść?",
    options: [
      "ARIA jest potrzebne na każdym elemencie, inaczej czytniki ekranu go nie odczytają",
      "Jeśli istnieje element natywny, użyj go; ARIA jest dla niestandardowych widżetów",
      "ARIA zastępuje elementy, więc `<div role=\"button\">` jest lepszy niż `<button>`",
    ],
    answer: 1,
    explanation:
      "ARIA zmienia tylko sposób opisu elementu dla technologii wspomagających; nie dodaje zachowania: `<div role=\"button\">` nie dostaje fokusu ani aktywacji Enterem/Spacją. Błędne ARIA jest gorsze niż jego brak. Dla zakładek, comboboxów i drzew, które nie mają natywnych odpowiedników, stosuj wzorce APG.",
    sources: ["mdn-aria", "wai-aria-apg"],
  },
  {
    question: "Co robi `text-wrap: balance` na nagłówku?",
    options: [
      "Justuje tekst, rozciągając odstępy",
      "Rozkłada słowa tak, by linie miały zbliżoną długość",
      "Blokuje zawijanie i ucina tekst wielokropkiem",
    ],
    answer: 1,
    explanation:
      "`balance` dobiera podziały linii tak, aby linie wielowierszowego nagłówka miały zbliżoną długość — bez osamotnionego ostatniego słowa. Algorytm jest kosztowny, więc przeglądarki stosują go tylko do krótkich bloków (kilka linii). Dla akapitów jest `text-wrap: pretty`, które unika pojedynczego słowa w ostatniej linii. Justowanie to `text-align: justify`.",
    sources: ["mdn-text-wrap"],
  },
  {
    question: "Czym są landmarki HTML i dlaczego są ważne?",
    options: [
      "Regiony (`header`, `nav`, `main`…) do szybkiej nawigacji czytnikiem ekranu",
      "Znaczniki dla robotów wyszukiwarek, które podnoszą pozycję strony",
      "Kotwice `<a name>` do nawigacji po sekcjach długiej strony",
    ],
    answer: 0,
    explanation:
      "Elementy semantyczne niejawnie dostają role landmarków (`banner`, `navigation`, `main`, `complementary`, `contentinfo`). Użytkownicy czytników ekranu otwierają listę landmarków i przeskakują do potrzebnego. Jeśli strona ma kilka `nav`, nadaj im różne nazwy przez `aria-label`. Typowy problem SPA to brak `main` lub kilka widocznych.",
    sources: ["mdn-landmarks", "mdn-semantics"],
  },
  {
    question: "Jaki problem z dostępnością jest typowy dla SPA, gdy „strona” zmienia się na kliencie?",
    options: [
      "Czytniki ekranu nie są informowane o nawigacji: fokus i tytuł się nie zmieniają",
      "SPA w ogóle nie da się uczynić dostępnymi z powodu routingu po stronie klienta",
      "Czytniki ekranu nie potrafią odczytać treści renderowanej przez JavaScript",
    ],
    answer: 0,
    explanation:
      "Przy pełnym przeładowaniu przeglądarka sama ogłasza nową stronę. SPA tego nie dostają, więc trzeba aktualizować `document.title`, przenosić fokus na nagłówek lub `main` albo ogłaszać zmianę przez live region. Next.js App Router robi część z tego (route announcer). Czytniki ekranu bez problemu czytają treść renderowaną przez JS.",
    sources: ["mdn-a11y", "next-linking"],
  },
  {
    question: "Czym Tailwind v4 zasadniczo różni się od v3?",
    options: [
      "v4 usunął utility i zostawił tylko gotowe komponenty",
      "Konfiguracja CSS-first przez `@theme`, nowy silnik, automatyczne wykrywanie źródeł",
      "v4 działa tylko z Reactem i wymaga osobnego pluginu Babel",
    ],
    answer: 1,
    explanation:
      "Tailwind v4 to przepisanie od nowa: dołącza się go jednym `@import \"tailwindcss\"`, tokeny definiuje się w CSS przez `@theme` i są wystawiane jako zmienne CSS, a ścieżek w `content` nie trzeba już podawać — źródła są wykrywane automatycznie. Buildy są znacznie szybsze, a style używają `@layer`, `@property` i `color-mix()`. Wymagane są nowoczesne przeglądarki.",
    sources: ["tw-v4", "tw-upgrade", "tw-theme"],
  },
  {
    question: "Jak sprawić, by tryb ciemny w Tailwind v4 zależał od klasy `.dark`, a nie od ustawienia systemowego?",
    options: [
      "Ustawić `darkMode: 'class'` wewnątrz `@theme`",
      "Nadpisać wariant: `@custom-variant dark (&:where(.dark, .dark *));`",
      "Dodać klasę `dark-mode` do `<body>` — Tailwind wykryje ją automatycznie",
    ],
    answer: 1,
    explanation:
      "W v4 warianty definiuje się w CSS przez `@custom-variant`. Tak można powiązać `dark:` z klasą lub atrybutem (`[data-theme=dark]`). `darkMode: 'class'` to opcja `tailwind.config.js` z v3 i nie działa wewnątrz `@theme`. `:where()` sprawia, że specyficzność nie rośnie.",
    sources: ["tw-dark-mode", "tw-upgrade"],
  },
  {
    question: "Projektujesz architekturę CSS wielojęzycznej strony, w tym po arabsku (RTL) i japońsku. Co trzeba przewidzieć?",
    options: [
      "Osobną kopię wszystkich stylów dla każdego języka i kierunku pisma",
      "Właściwości logiczne, atrybuty `lang`/`dir`, elastyczne kontenery na tekst",
      "Stałe szerokości przycisków i bloków, żeby tłumaczenia nie zepsuły układu",
    ],
    answer: 1,
    explanation:
      "Właściwości logiczne (`margin-inline-start`, `inset-inline-end`) automatycznie odbijają układ dla RTL przy `dir=\"rtl\"`. `lang` jest potrzebny do poprawnych fontów, dzielenia wyrazów i cudzysłowów, a `:lang()` — do stylów specyficznych dla języka. Długość tekstu różni się między językami, więc stałe szerokości się psują. CJK potrzebuje własnych fontów i reguł łamania linii (`word-break`, `line-break`).",
    sources: ["mdn-logical-properties", "next-i18n"],
  },
  {
    question: "Które podejście do płynnej typografii najlepiej szanuje skalowanie czcionki przez użytkownika?",
    options: [
      "`font-size: 3vw` bez ograniczeń — czcionka rośnie razem z oknem",
      "`clamp(1rem, 0.8rem + 1vw, 1.5rem)` — płynny wzrost w granicach",
      "Stały pikselowy `font-size` na każdym breakpoincie",
    ],
    answer: 1,
    explanation:
      "Czyste `vw` ignoruje ustawienie rozmiaru czcionki użytkownika i prawie nie zmienia się przy powiększeniu — to problem WCAG (powiększenie tekstu do 200%). Połączenie `rem + vw` wewnątrz `clamp()` daje płynne skalowanie, które nadal reaguje na ustawienia użytkownika. Kroki pikselowe działają, ale skaczą między breakpointami.",
    sources: ["mdn-clamp", "wcag-quickref"],
  },
  {
    question: "Tabela z 10 000 wierszy przycina się przy przewijaniu. Które rozwiązanie jest najskuteczniejsze?",
    options: [
      "Dodać `will-change: transform` do każdego wiersza tabeli",
      "Wirtualizacja: renderować tylko widoczne wiersze plus mały bufor",
      "Zastąpić `<table>` siatką `<div>` z CSS Grid i `gap`",
    ],
    answer: 1,
    explanation:
      "Główny problem to tysiące węzłów DOM: pamięć, layout i style. Wirtualizacja (TanStack Virtual, react-window) trzyma w DOM dziesiątki wierszy i podmienia je podczas przewijania. `will-change` na tysiącach elementów zjada pamięć. Zmiana markupu nie zmniejsza liczby węzłów. Prostsze alternatywy to paginacja lub `content-visibility`.",
    sources: ["webdev-virtualize-lists", "tanstack-virtual", "webdev-content-visibility"],
  },
  {
    question: "Galeria z 50 filmami z YouTube ładuje się bardzo wolno. Co zrobić najpierw?",
    options: [
      "Osadzić wszystkie `<iframe>` z `autoplay=0`, żeby filmy się nie uruchamiały",
      "Pokazywać obrazki podglądu i wstawiać `<iframe>` dopiero po kliknięciu",
      "Wcześniej załadować wszystkie filmy przez `<link rel=\"preload\">`",
    ],
    answer: 1,
    explanation:
      "Każdy iframe YouTube ciągnie setki kilobajtów JS i wiele żądań. Wzorzec fasady (np. lite-youtube-embed) pokazuje statyczną miniaturę i podmienia ją na odtwarzacz dopiero przy interakcji. Pomaga też `loading=\"lazy\"` na iframe'ach. `autoplay=0` nie zmniejsza wagi osadzenia.",
    sources: ["mdn-iframe", "mdn-lazy-loading"],
  },
  {
    question: "Czym `preload` różni się od `prefetch` w `<link rel>`?",
    options: [
      "`preload` jest pilny dla bieżącej strony, `prefetch` — zawczasu dla następnej",
      "To synonimy: oba ładują zasób z wysokim priorytetem",
      "`prefetch` od razu wykonuje skrypt, a `preload` go odracza",
    ],
    answer: 0,
    explanation:
      "`preload` mówi „ten zasób jest na pewno potrzebny teraz, zacznij wcześnie” — np. font lub obrazek LCP wykrywany późno. `prefetch` to podpowiedź na przyszłość, ładowana w czasie bezczynności. Zbędny `preload` zabiera przepustowość krytycznym zasobom. Jest też `preconnect`, aby wcześniej nawiązać połączenie z domeną.",
    sources: ["mdn-link-preload", "webdev-font-best-practices"],
  },
  {
    question: "Czym `defer` różni się od `async` na `<script>`?",
    options: [
      "`defer` wykonuje się po kolei po parsowaniu HTML, `async` — od razu po załadowaniu",
      "`async` blokuje parsowanie HTML aż do wykonania, a `defer` nie",
      "`defer` działa tylko dla skryptów inline, `async` — tylko dla zewnętrznych",
    ],
    answer: 0,
    explanation:
      "Zwykły skrypt zatrzymuje parser. `defer` pobiera się równolegle i wykonuje po kolei przed `DOMContentLoaded` — dobre dla zależnych skryptów aplikacji. `async` wykonuje się od razu po pobraniu — dla niezależnych skryptów jak analityka. Moduły (`type=\"module\"`) domyślnie zachowują się jak `defer`. Żaden z atrybutów nie wpływa na skrypty inline.",
    sources: ["mdn-script"],
  },
  {
    question: "Projektant nalega na całkowicie własne style każdej kontrolki w złożonym formularzu. Jakie podejście jest rozsądne?",
    options: [
      "Zastąpić wszystkie natywne kontrolki elementami `<div>` z obsługą kliknięć",
      "Stylować natywne kontrolki (`appearance: none`, `accent-color`)",
      "Odmówić projektantowi: natywnych elementów formularza nie da się stylować",
    ],
    answer: 1,
    explanation:
      "Natywne kontrolki dają za darmo dostępność, obsługę klawiatury, autouzupełnianie i mobilne pickery. Większość ich wyglądu można zmienić przez `appearance: none`, `accent-color`, pseudoelementy oraz `:checked` / `:focus-visible`. Ręcznie robione widżety z `<div>` wymagają pełnej implementacji wzorców ARIA — drogo i ryzykownie. Omów kompromisy z projektantem.",
    sources: ["mdn-forms", "wai-aria-apg"],
  },
];

export default questions;
