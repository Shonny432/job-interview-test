import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Po co dokumenty HTML zaczynają się od `<!DOCTYPE html>`?",
    options: [
      "Aby załadować wbudowany domyślny arkusz stylów przeglądarki",
      "Aby włączyć tryb standardów zamiast trybu quirks",
      "Aby zadeklarować kodowanie dokumentu i język strony",
    ],
    answer: 1,
    explanation:
      "DOCTYPE nie jest ani znacznikiem, ani odnośnikiem do zasobu. Informuje przeglądarkę, że strona jest zgodna ze współczesnymi standardami, i włącza tryb standardów. Bez niego przeglądarka przechodzi w tryb quirks i emuluje błędy starych przeglądarek (np. inny model pudełkowy). Kodowanie ustawia `<meta charset=\"utf-8\">`, a nie DOCTYPE.",
    sources: ["mdn-doctype", "mdn-quirks", "wd-html-document"],
  },
  {
    question: "Który zestaw zawiera wyłącznie semantyczne elementy HTML5?",
    options: [
      "`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`",
      "`<div>`, `<span>`, `<section>`, `<b>`, `<i>`",
      "`<header>`, `<div>`, `<i>`, `<footer>`, `<span>`",
    ],
    answer: 0,
    explanation:
      "Elementy semantyczne opisują znaczenie treści: nagłówek, nawigację, główną treść, samodzielny artykuł, stopkę. `<div>` i `<span>` to neutralne kontenery bez znaczenia, a `<b>` i `<i>` są prezentacyjne (wyróżnienie bez podkreślenia ważności). Semantyka pomaga czytnikom ekranu, wyszukiwarkom i czytelności kodu.",
    sources: ["mdn-semantics", "wd-html-semantic"],
  },
  {
    question: "Ile widocznych elementów `<main>` może mieć strona i do czego on służy?",
    options: [
      "Dowolnie wiele — po jednym w każdej sekcji strony",
      "Jeden — zawiera główną, unikalną treść strony",
      "Żadnego — element jest przestarzały i zastąpiony przez `<section>`",
    ],
    answer: 1,
    explanation:
      "`<main>` oznacza główną treść dokumentu, unikalną dla danej strony (bez nagłówka, menu i stopki). Widoczny może być tylko jeden (pozostałe wymagają atrybutu `hidden`). To punkt orientacyjny (landmark) dla czytników ekranu: użytkownik może od razu przeskoczyć do treści. `<section>` to sekcja tematyczna, a nie zamiennik `<main>`.",
    sources: ["mdn-html-elements", "mdn-landmarks", "wd-html-semantic"],
  },
  {
    question: "Czym domyślnie różni się `<div>` od `<span>`?",
    options: [
      "`<div>` jest elementem liniowym, a `<span>` blokowym",
      "Niczym: to synonimy, różni je tylko nazwa znacznika",
      "`<div>` jest elementem blokowym, a `<span>` liniowym",
    ],
    answer: 2,
    explanation:
      "`<div>` ma domyślnie `display: block`: rozciąga się na całą szerokość rodzica i zaczyna się od nowej linii. `<span>` ma `display: inline`: płynie w tekście i jest tak szeroki jak jego zawartość. Żaden z nich nie niesie semantyki — oba są kontenerami do grupowania i stylowania.",
    sources: ["mdn-display", "mdn-html-elements"],
  },
  {
    question: "Ustawiasz `width: 200px; height: 50px` na `<span>` bez innych stylów. Co się stanie?",
    options: [
      "Szerokość i wysokość zostaną zignorowane, bo `<span>` jest elementem liniowym",
      "Element będzie miał dokładnie 200×50 pikseli, jak każdy blok",
      "Zadziała tylko szerokość; przeglądarka zignoruje wysokość",
    ],
    answer: 0,
    explanation:
      "`width` i `height` nie działają na elementy liniowe — ich rozmiar wynika z treści. Pionowy `margin` również nie odpycha sąsiadów. Aby nadać elementowi rozmiar, potrzebny jest `display: inline-block`, `block` albo musi on być elementem flex/grid.",
    sources: ["mdn-display", "mdn-box-model"],
  },
  {
    question: "Czym `display: inline-block` różni się od `inline`?",
    options: [
      "`inline-block` zawsze zaczyna się od nowej linii i rozciąga na całą szerokość rodzica",
      "`inline-block` pozostaje w linii tekstu, ale przyjmuje szerokość, wysokość i pionowe odstępy",
      "`inline-block` też ignoruje `width` i `height`, ale nigdy nie przechodzi do nowej linii",
    ],
    answer: 1,
    explanation:
      "`inline-block` to hybryda: na zewnątrz zachowuje się jak element liniowy (stoi w jednej linii z sąsiadami i respektuje `vertical-align`), a wewnątrz jak blok (działają `width`, `height`, `padding` i pionowy `margin`). Od nowej linii zaczyna się `block`, a nie `inline-block`.",
    sources: ["mdn-display"],
  },
  {
    question: "Jak w JavaScript odczytać wartość atrybutu `data-user-id=\"42\"`?",
    options: [
      "`element.dataUserId`",
      "`element.data.userId`",
      "`element.dataset.userId`",
    ],
    answer: 2,
    explanation:
      "Wszystkie atrybuty `data-*` są dostępne przez `element.dataset`, a nazwy kebab-case zamieniają się na camelCase: `data-user-id` → `dataset.userId`. Wartość jest zawsze stringiem. Można też użyć `getAttribute('data-user-id')`. W CSS odwołujemy się do nich selektorem `[data-user-id]` i funkcją `attr()`.",
    sources: ["mdn-data-attributes"],
  },
  {
    question: "Jaka jest główna różnica między atrybutami `id` i `class`?",
    options: [
      "`id` musi być unikalne na stronie i ma wyższą specyficzność w CSS; `class` może się powtarzać",
      "`class` musi być unikalna na stronie, a `id` można powtarzać dowolnie często",
      "`id` używa się tylko w JavaScript, a `class` tylko do stylowania CSS",
    ],
    answer: 0,
    explanation:
      "Wartość `id` musi być unikalna w dokumencie: odwołują się do niej kotwice (`#section`), `label for` i atrybuty ARIA. Klasy są wielokrotnie używane na wielu elementach, a jeden element może mieć ich kilka. Selektor `id` waży (1,0,0), a klasa (0,1,0), dlatego do stylowania zwykle wybiera się klasy.",
    sources: ["mdn-specificity", "mdn-selectors"],
  },
  {
    question: "Po co dodawać `rel=\"noopener noreferrer\"` do linku z `target=\"_blank\"`?",
    options: [
      "Aby przeglądarka wcześniej załadowała stronę i szybciej otworzyła nową kartę",
      "Aby otwarta karta nie dostała `window.opener` ani adresu strony źródłowej",
      "Aby roboty wyszukiwarek nie podążały za linkiem i nie przekazywały mu rankingu",
    ],
    answer: 1,
    explanation:
      "Bez `noopener` nowa karta może przez `window.opener` podmienić oryginalną stronę (reverse tabnabbing). `noreferrer` dodatkowo pomija nagłówek Referer. Nowoczesne przeglądarki domyślnie stosują `noopener` dla `_blank`, ale atrybut nadal pisze się jawnie. Na indeksowanie wpływa `nofollow`, a nie te wartości.",
    sources: ["mdn-a"],
  },
  {
    question: "Jaki jest domyślny `type` przycisku `<button>` wewnątrz `<form>`?",
    options: ["`button`", "`reset`", "`submit`"],
    answer: 2,
    explanation:
      "Domyślnie przycisk w formularzu ma `type=\"submit\"` i wysyła formularz. To częste źródło błędów: przycisk „Pokaż hasło” nagle wysyła formularz. Przyciski, które nie mają wysyłać formularza, potrzebują jawnego `type=\"button\"`.",
    sources: ["mdn-button"],
  },
  {
    question: "Po co łączyć `<label>` z `<input>` przez `for` i `id`?",
    options: [
      "Kliknięcie etykiety ustawia fokus na polu, a czytniki ekranu odczytują etykietę razem z polem",
      "Bez tego powiązania przeglądarka nie wyśle danych pola",
      "Jest to potrzebne tylko do wbudowanej walidacji z atrybutem `required`",
    ],
    answer: 0,
    explanation:
      "Powiązany `label` powiększa klikalny obszar (szczególnie ważne dla checkboxów) i nadaje polu dostępną nazwę dla technologii wspomagających. Nie wpływa na wysyłanie ani walidację. Alternatywą jest umieszczenie `input` wewnątrz `label`.",
    sources: ["mdn-forms", "mdn-a11y"],
  },
  {
    question: "Jaki `alt` powinien mieć obrazek czysto dekoracyjny (np. ozdobny separator)?",
    options: [
      "`alt=\"obrazek\"`",
      "Pusty `alt=\"\"`",
      "Atrybut `alt` można całkowicie pominąć",
    ],
    answer: 1,
    explanation:
      "Pusty `alt=\"\"` mówi czytnikom ekranu, że obrazek jest dekoracyjny i należy go pominąć. Gdy `alt` brakuje, czytnik może odczytać nazwę pliku. Tekst w stylu „obrazek” jest bezużyteczny: `alt` ma przekazywać znaczenie obrazka, a nie fakt jego istnienia.",
    sources: ["mdn-img", "wd-html-images", "mdn-a11y"],
  },
  {
    question: "Co robi `box-sizing: border-box`?",
    options: [
      "Rysuje dodatkową ramkę wokół elementu, na zewnątrz jego `margin`",
      "Usuwa `padding` i `border` elementu, zostawiając tylko treść",
      "Wlicza `padding` i `border` do podanych `width` i `height`",
    ],
    answer: 2,
    explanation:
      "Przy `content-box` (domyślnie) `width` określa tylko szerokość treści, a `padding` i `border` dodają się do niej: `width: 200px` + `padding: 20px` = 240px. Przy `border-box` całkowita szerokość wynosi dokładnie 200px, a treść się zwęża. Dlatego wiele resetów CSS ustawia `border-box` dla wszystkich elementów. `margin` nigdy nie wlicza się do rozmiaru.",
    sources: ["mdn-box-sizing", "mdn-box-model", "wd-css-box-model"],
  },
  {
    question: "Czym `padding` różni się od `margin`?",
    options: [
      "`padding` to odstęp zewnętrzny (przezroczysty), `margin` — wewnętrzny (wypełniony tłem)",
      "`padding` to odstęp wewnętrzny (wypełniony tłem), `margin` — zewnętrzny (zawsze przezroczysty)",
      "Niczym: to zamienne właściwości o różnych nazwach",
    ],
    answer: 1,
    explanation:
      "Kolejność w modelu pudełkowym: content → padding → border → margin. `padding` leży wewnątrz ramki i jest wypełniony tłem elementu; `margin` jest na zewnątrz i przezroczysty. Ponadto pionowe marginesy sąsiednich bloków mogą się zapadać, a padding nigdy; `margin` może być ujemny, a `padding` nie.",
    sources: ["mdn-box-model", "wd-css-box-model"],
  },
  {
    question: "Dwa bloki stoją jeden pod drugim. Górny ma `margin-bottom: 20px`, dolny `margin-top: 30px`. Jaki jest odstęp między nimi?",
    options: ["50px", "30px", "20px"],
    answer: 1,
    explanation:
      "To zapadanie się marginesów (margin collapsing): z dwóch sąsiednich pionowych marginesów w normalnym przepływie wygrywa większy — 30px. Marginesy poziome się nie zapadają, a w kontenerach flex i grid zapadania nie ma wcale.",
    sources: ["mdn-margin-collapse"],
  },
  {
    question: "Oba selektory ustawiają `color` temu samemu linkowi. Który wygra: `#nav a` czy `.menu .item a.link`?",
    options: [
      "`.menu .item a.link` — ma więcej selektorów, więc jest bardziej specyficzny",
      "Ten, który jest później w pliku CSS: kolejność wygrywa ze specyficznością",
      "`#nav a` — jeden identyfikator przeważa dowolną liczbę klas",
    ],
    answer: 2,
    explanation:
      "Specyficzność porównuje się kolumnami (identyfikatory, klasy/atrybuty/pseudoklasy, typy): `#nav a` = (1,0,1), `.menu .item a.link` = (0,3,1). Najważniejsza jest pierwsza kolumna, więc wygrywa identyfikator. Kolejność w kodzie decyduje tylko przy równej specyficzności.",
    sources: ["mdn-specificity", "wd-css-specificity"],
  },
  {
    question: "Która z tych właściwości jest domyślnie dziedziczona przez elementy potomne?",
    options: ["`border`", "`color`", "`padding`"],
    answer: 1,
    explanation:
      "Dziedziczone są głównie właściwości tekstowe: `color`, `font-*`, `line-height`, `text-align`, `visibility`. Właściwości modelu pudełkowego (`border`, `padding`, `margin`, `width`) i tła nie są dziedziczone. Dziedziczenie można wymusić wartością `inherit`.",
    sources: ["mdn-inheritance", "mdn-cascade"],
  },
  {
    question: "Czym `display: none` różni się od `visibility: hidden`?",
    options: [
      "`display: none` usuwa element z układu; `visibility: hidden` ukrywa go, ale zachowuje jego miejsce",
      "`visibility: hidden` usuwa element z DOM, a `display: none` tylko czyni go przezroczystym",
      "Niczym: oba ukrywają element i tak samo zwalniają jego miejsce w układzie",
    ],
    answer: 0,
    explanation:
      "Przy `display: none` element nie jest renderowany i nie zajmuje miejsca — sąsiedzi się przesuwają. Przy `visibility: hidden` jest niewidoczny, ale jego miejsce zostaje. `opacity: 0` także zachowuje miejsce, a element pozostaje klikalny. Żadna z tych opcji nie usuwa elementu z DOM, a czytniki ekranu ignorują tylko dwie pierwsze.",
    sources: ["mdn-display", "mdn-a11y"],
  },
  {
    question: "Jak zachowuje się element z `position: relative; top: 10px`?",
    options: [
      "Stoi 10px od górnej krawędzi okna i nie przesuwa się przy przewijaniu",
      "Wypada z przepływu, przesuwa się o 10px, a sąsiedzi zajmują jego miejsce",
      "Przesuwa się o 10px w dół od swojego normalnego miejsca, ale to miejsce w przepływie zostaje zachowane",
    ],
    answer: 2,
    explanation:
      "`relative` wizualnie przesuwa element względem miejsca, w którym byłby w normalnym przepływie, ale jego miejsce nie jest zwalniane — sąsiedzi się nie ruszają. `relative` często ustawia się też rodzicowi, aby stał się punktem odniesienia dla dzieci pozycjonowanych absolutnie. Pozycjonowanie względem okna to `fixed`.",
    sources: ["mdn-position", "csstricks-position"],
  },
  {
    question: "Względem czego pozycjonowany jest element z `position: absolute`?",
    options: [
      "Względem najbliższego przodka, którego `position` nie jest `static`",
      "Zawsze względem `<body>`, niezależnie od stylów przodków",
      "Względem własnego normalnego miejsca w przepływie, jak `relative`",
    ],
    answer: 0,
    explanation:
      "Element absolutny wypada z przepływu i liczy `top/left/...` od swojego bloku zawierającego — najbliższego pozycjonowanego przodka (`relative`, `absolute`, `fixed`, `sticky`). Jeśli takiego nie ma, używa początkowego bloku zawierającego. Dlatego, aby przypiąć przycisk zamykania do rogu karty, karta dostaje `position: relative`.",
    sources: ["mdn-position", "mdn-containing-block"],
  },
  {
    question: "Jak działa `position: sticky; top: 0`?",
    options: [
      "Element jest zawsze przypięty do góry okna jak `fixed`, niezależnie od rodzica",
      "Element jest w przepływie, dopóki przewijanie nie dojdzie do `top: 0`, potem „przykleja się” — w granicach rodzica",
      "Element przykleja się do góry rodzica i nigdy się nie przewija, nawet gdy rodzic znika z ekranu",
    ],
    answer: 1,
    explanation:
      "`sticky` to hybryda `relative` i `fixed`: przed progiem jest w przepływie, po nim — przypięty, aż skończy się kontener rodzica. Częste powody, dla których sticky „nie działa”: nie ustawiono `top`, przodek ma `overflow: hidden/auto` albo rodzic nie jest wyższy od samego elementu.",
    sources: ["mdn-position", "csstricks-position"],
  },
  {
    question: "Do jakich elementów stosuje się `z-index`?",
    options: [
      "Do dowolnego elementu, w tym `position: static` poza flex i grid",
      "Tylko do elementów z `display: block` i jawnie podaną wysokością",
      "Do elementów pozycjonowanych oraz elementów flex i grid",
    ],
    answer: 2,
    explanation:
      "`z-index` steruje kolejnością nakładania i działa na elementy pozycjonowane oraz dzieci kontenerów flex/grid. Na zwykłym bloku `static` poza flex/grid jest ignorowany. Pamiętaj o kontekstach nakładania (stacking context): `z-index: 9999` nie pomoże, jeśli rodzic jest w „niższym” kontekście.",
    sources: ["mdn-z-index", "wd-css-z-index", "mdn-stacking-context"],
  },
  {
    question: "Czym `rem` różni się od `em`?",
    options: [
      "`rem` jest względny wobec `font-size` elementu `<html>`, `em` — wobec `font-size` bieżącego elementu",
      "`rem` to piksele skorygowane o gęstość Retina, `em` to zwykłe piksele CSS",
      "`em` jest względny wobec szerokości okna przeglądarki, `rem` — wobec szerokości rodzica",
    ],
    answer: 0,
    explanation:
      "`rem` (root em) zawsze opiera się na `font-size` elementu `<html>` (zwykle 16px), więc rozmiary są przewidywalne. `em` zależy od kontekstu i kumuluje się przy zagnieżdżaniu: `font-size: 1.2em` wewnątrz `1.2em` daje 1,44 bazowego rozmiaru. Jednostki względne wobec okna to `vw`/`vh`.",
    sources: ["mdn-units", "wd-css-sizing"],
  },
  {
    question: "Ile wynosi `50vw`?",
    options: [
      "50% szerokości elementu rodzica",
      "50% szerokości viewportu",
      "50 pikseli na każdym ekranie",
    ],
    answer: 1,
    explanation:
      "`vw` to 1% szerokości viewportu, `vh` — 1% jego wysokości. Procenty (`%`) zależą od rodzica. Uwaga: `100vw` obejmuje szerokość pionowego paska przewijania i może wywołać przewijanie poziome, a na urządzeniach mobilnych `100vh` nie uwzględnia chowającego się paska przeglądarki — do tego służy `dvh`.",
    sources: ["mdn-units", "mdn-length"],
  },
  {
    question: "Jak zwykle pisze się media queries w podejściu mobile-first?",
    options: [
      "Z `max-width`: style bazowe dla desktopu, potem uproszczenia dla mobile",
      "Z `orientation: portrait` dla wszystkich przypadków",
      "Z `min-width`: style bazowe dla mobile, dodatki dla większych ekranów",
    ],
    answer: 2,
    explanation:
      "W mobile-first bazowy CSS jest pisany dla małych ekranów, a `@media (min-width: ...)` dodaje style wraz ze wzrostem ekranu. Urządzenia mobilne dostają najmniej nadpisań, a style łatwiej rozbudowywać. Użycie `max-width` to desktop-first. Breakpointy Tailwinda działają na tej samej zasadzie.",
    sources: ["mdn-media-queries", "wd-media-queries", "mdn-responsive-design"],
  },
  {
    question: "Po co jest `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`?",
    options: [
      "Aby przeglądarki mobilne używały prawdziwej szerokości ekranu zamiast emulować desktop o szerokości ~980px",
      "Aby zablokować użytkownikom powiększanie strony gestami na telefonie",
      "Aby przeglądarka ładowała lekkie mobilne wersje stylów i obrazków",
    ],
    answer: 0,
    explanation:
      "Bez tego znacznika przeglądarki mobilne renderują stronę jak na szerokim ekranie i ją pomniejszają — mobilne media queries nie działają, a tekst jest malutki. Wyłączanie powiększania (`user-scalable=no`) szkodzi dostępności. Znacznik nie wpływa na szybkość ładowania.",
    sources: ["mdn-viewport-meta", "mdn-responsive-design"],
  },
  {
    question: "Wzdłuż której osi `justify-content` wyrównuje elementy w kontenerze flex?",
    options: [
      "Zawsze poziomo, niezależnie od kierunku",
      "Wzdłuż osi głównej, którą wyznacza `flex-direction`",
      "Wzdłuż osi poprzecznej, prostopadłej do `flex-direction`",
    ],
    answer: 1,
    explanation:
      "`justify-content` działa na osi głównej, `align-items` — na poprzecznej. Przy `flex-direction: row` oś główna jest pozioma; przy `column` — pionowa i wtedy `justify-content` wyrównuje w pionie. Dlatego „zawsze poziomo” jest błędne.",
    sources: ["mdn-flexbox", "css-tricks-flexbox", "wd-css-flexbox"],
  },
  {
    question: "Kontener ma `display: flex; flex-direction: column; justify-content: center`. Jak wyrównane są jego dzieci?",
    options: [
      "Wyśrodkowane poziomo, jak w zwykłym wierszu",
      "Wyśrodkowane pionowo (jeśli kontener ma wolną wysokość)",
      "W ogóle nie: `justify-content` nie działa z `flex-direction: column`",
    ],
    answer: 1,
    explanation:
      "Przy `flex-direction: column` oś główna staje się pionowa, więc `justify-content: center` centruje elementy w pionie. Wyrównaniem poziomym steruje w tym przypadku `align-items`. Efekt widać tylko wtedy, gdy kontener jest wyższy od zawartości.",
    sources: ["mdn-flexbox", "css-tricks-flexbox"],
  },
  {
    question: "Co robi `flex-wrap: wrap`?",
    options: [
      "Pozwala elementom przenosić się do nowej linii, gdy się nie mieszczą",
      "Zmniejsza elementy, aby wszystkie zmieściły się w jednej linii",
      "Opakowuje każdy element flex w dodatkowy blok",
    ],
    answer: 0,
    explanation:
      "Domyślnie `flex-wrap: nowrap` — wszystkie elementy ustawiają się w jednej linii i kurczą się (jeśli pozwala na to `flex-shrink`) albo wychodzą poza kontener. Przy `wrap` elementy przechodzą do nowych linii. Wyrównanie tych linii ustawia `align-content`.",
    sources: ["mdn-flexbox", "css-tricks-flexbox", "flexbox-froggy"],
  },
  {
    question: "Jak najprościej równomiernie rozstawić elementy flex bez dodatkowego odstępu po ostatnim?",
    options: [
      "`margin-right` na każdym elemencie",
      "`gap` na kontenerze flex",
      "`padding` na kontenerze flex",
    ],
    answer: 1,
    explanation:
      "`gap` dodaje odstęp tylko między elementami — bez nadmiaru przy krawędziach. Obsługują go zarówno flex, jak i grid. `margin` na elementach zostawia zbędny odstęp po ostatnim (trzeba by go usuwać przez `:last-child`), a `padding` kontenera to odstęp od krawędzi, a nie między elementami.",
    sources: ["mdn-gap", "css-tricks-flexbox"],
  },
  {
    question: "Które podejście poprawnie centruje blok poziomo i pionowo wewnątrz rodzica?",
    options: [
      "Na rodzicu: `text-align: center; vertical-align: middle; line-height: 100%`",
      "Na rodzicu: `display: flex; justify-content: center; align-items: center`",
      "Na dziecku: `margin: auto` bez żadnych stylów rodzica",
    ],
    answer: 1,
    explanation:
      "Flexbox z `justify-content` i `align-items: center` to najpopularniejszy sposób (alternatywa w Grid: `display: grid; place-items: center`). `text-align` centruje tylko treść liniową, a `vertical-align` nie działa na bloki. `margin: auto` na zwykłym bloku centruje tylko poziomo (i tylko przy ustawionej szerokości); pionowo działa wewnątrz flex/grid.",
    sources: ["css-tricks-centering", "mdn-flexbox"],
  },
  {
    question: "Co definiuje `grid-template-columns: repeat(3, 1fr)`?",
    options: [
      "Trzy kolumny o szerokości 1 piksela, reszta miejsca pusta",
      "Trzy wiersze o równej wysokości rozciągnięte na kontener",
      "Trzy kolumny, które równo dzielą dostępne miejsce",
    ],
    answer: 2,
    explanation:
      "`repeat(3, 1fr)` to to samo co `1fr 1fr 1fr`. Jednostka `fr` to część wolnego miejsca kontenera grid. Wiersze definiuje `grid-template-rows`. Uwaga: `1fr` domyślnie oznacza `minmax(auto, 1fr)`, więc długa treść może rozciągnąć kolumnę.",
    sources: ["mdn-grid", "css-tricks-grid", "wd-css-grid"],
  },
  {
    question: "Jak sprawić, by element grid zajmował całą szerokość siatki niezależnie od liczby kolumn?",
    options: [
      "`grid-column: 1 / -1`",
      "`width: 100%`",
      "`grid-column: span all`",
    ],
    answer: 0,
    explanation:
      "Ujemne numery linii liczą się od końca; `-1` to ostatnia linia jawnej siatki, więc `1 / -1` rozciąga się od pierwszej do ostatniej linii. `width: 100%` wypełnia tylko własną komórkę elementu. W CSS Grid nie ma składni `span all`.",
    sources: ["mdn-grid", "css-tricks-grid", "grid-garden"],
  },
  {
    question: "Czym pseudoklasa różni się od pseudoelementu?",
    options: [
      "Pseudoklasy używają `::`, a pseudoelementy `:`; poza tym są takie same",
      "Pseudoelementy to klasy, które JavaScript dodaje do elementu w czasie działania",
      "Pseudoklasa to stan elementu (`:hover`), pseudoelement — wirtualna część (`::before`)",
    ],
    answer: 2,
    explanation:
      "Pseudoklasa wybiera istniejący element w określonym stanie lub pozycji. Pseudoelement tworzy lub wskazuje część elementu, która nie jest osobnym węzłem DOM. Według CSS3 pseudoelementy zapisuje się dwoma dwukropkami (`::before`), a pseudoklasy jednym; pojedynczy dwukropek przy starszych pseudoelementach nadal działa ze względu na kompatybilność.",
    sources: ["mdn-pseudo-classes", "mdn-pseudo-elements"],
  },
  {
    question: "Jak bez JavaScript pokolorować na czerwono ostatni element listy o dowolnej długości?",
    options: ["`li:last-child { color: red; }`", "`li:nth-child(10) { color: red; }`", "`li::last { color: red; }`"],
    answer: 0,
    explanation:
      "`:last-child` pasuje do elementu, który jest ostatnim dzieckiem rodzica. Są też `:last-of-type` (ostatni element swojego typu) i `:nth-last-child()`. `nth-child(10)` zadziała tylko przy dokładnie 10 elementach, a pseudoelementu `::last` nie ma.",
    sources: ["mdn-pseudo-classes", "mdn-selectors"],
  },
  {
    question: "Dlaczego `::before` z samymi `width`, `height` i `background` się nie pokazuje?",
    options: [
      "Pseudoelementy nie obsługują `background` ani wymiarów",
      "Brakuje właściwości `content` — bez niej pseudoelement nie powstaje",
      "`::before` działa tylko na linkach i przyciskach",
    ],
    answer: 1,
    explanation:
      "`::before` i `::after` są generowane tylko przy ustawionym `content` — nawet pustym: `content: \"\"`. Domyślnie są też liniowe, więc do wymiarów potrzebny jest `display: block` lub `inline-block` (albo pozycjonowanie). Nie działają na elementach zastępowanych, takich jak `<img>` i `<input>`.",
    sources: ["mdn-pseudo-elements"],
  },
  {
    question: "Jak poprawnie zadeklarować i użyć zmiennej CSS?",
    options: [
      "`$main: red; color: var($main);`",
      "`@main: red; color: get(@main);`",
      "`--main: red; color: var(--main);`",
    ],
    answer: 2,
    explanation:
      "Właściwości niestandardowe CSS deklaruje się z dwoma myślnikami i odczytuje przez `var()`, opcjonalnie z wartością zapasową: `var(--main, black)`. `$var` to składnia Sass, a `@var` — Less; są rozwiązywane podczas budowania. Zmienne CSS żyją w przeglądarce: dziedziczą się, biorą udział w kaskadzie i mogą się zmieniać w media queries lub przez JS.",
    sources: ["mdn-custom-properties", "wd-css-custom-properties"],
  },
  {
    question: "Co oznaczają dwie ostatnie cyfry w kolorze `#3366ff80`?",
    options: [
      "Jasność koloru",
      "Przezroczystość (kanał alfa): `80` szesnastkowo ≈ 50%",
      "To błąd: kolor hex może mieć tylko 6 znaków",
    ],
    answer: 1,
    explanation:
      "Zapis hex obsługuje 3, 4, 6 i 8 znaków. `#RRGGBBAA` dodaje kanał alfa: `80` = 128 z 255 ≈ 50% nieprzezroczystości. Ten sam kolor można zapisać jako `rgb(51 102 255 / 50%)`. Inne formaty to `hsl()`, `oklch()`, nazwane kolory i `currentColor`.",
    sources: ["mdn-color"],
  },
  {
    question: "Kiedy lepiej użyć `<img>` zamiast `background-image`?",
    options: [
      "Gdy obrazek jest częścią treści (zdjęcie produktu, ilustracja) i potrzebuje `alt`",
      "Gdy obrazek jest dekoracyjny: wzór tła, tekstura lub ornament",
      "Tylko gdy obrazek jest w SVG; pozostałe formaty idą w tło",
    ],
    answer: 0,
    explanation:
      "`<img>` to treść: ma `alt` dla dostępności, jest indeksowany przez wyszukiwarki, obsługuje `srcset` i `loading=\"lazy\"` oraz drukuje się. `background-image` pasuje do dekoracji: tła, wzorów i ornamentów bez znaczenia. Format pliku nie wpływa na wybór.",
    sources: ["mdn-img", "wd-html-images"],
  },
  {
    question: "Po co poziomy nagłówków `<h1>`–`<h6>`, skoro rozmiar można ustawić w CSS?",
    options: [
      "Tylko dla kompatybilności ze starymi przeglądarkami bez obsługi CSS",
      "To po prostu sześć gotowych rozmiarów czcionki wygodnych w layoucie",
      "Określają hierarchię dokumentu dla czytników ekranu i wyszukiwarek",
    ],
    answer: 2,
    explanation:
      "Poziom nagłówka to semantyka, a nie rozmiar. Użytkownicy czytników ekranu często nawigują po stronie właśnie po nagłówkach. Dlatego nie pomija się poziomów dla wyglądu: rozmiar ustawia się w CSS, a poziom wybiera według struktury.",
    sources: ["mdn-semantics", "wd-html-semantic", "mdn-a11y"],
  },
  {
    question: "Kiedy używać `<a>`, a kiedy `<button>`?",
    options: [
      "Bez różnicy: stylizuje się je tak samo i zachowują się tak samo",
      "`<a href>` do przejścia pod adres URL, `<button>` do akcji na stronie",
      "`<button>` tylko w formularzach; linki dla wszystkich innych klikalnych elementów",
    ],
    answer: 1,
    explanation:
      "Linki i przyciski zachowują się inaczej i mają inną semantykę dla czytników ekranu: link można otworzyć w nowej karcie i skopiować, aktywuje się Enterem; przycisk aktywuje się Enterem i Spacją. `<div onclick>` zamiast przycisku psuje dostępność z klawiatury. Przyciski poza formularzami są w porządku z `type=\"button\"`.",
    sources: ["mdn-button", "mdn-a", "mdn-a11y"],
  },
  {
    question: "Do czego służy lista `<dl>`?",
    options: [
      "Do par termin–opis (`<dt>` i `<dd>`), np. w słowniczku",
      "Do rozwijanej listy wyboru w formularzu — alternatywa dla `<select>`",
      "To przestarzały znacznik listy numerowanej, zastąpiony przez `<ol>`",
    ],
    answer: 0,
    explanation:
      "`<dl>` (description list) zawiera pary `<dt>` (termin) i `<dd>` (opis). `<ul>` to lista nieuporządkowana, w której kolejność nie ma znaczenia, `<ol>` — uporządkowana. Rozwijana lista w formularzu to `<select>` z `<option>`.",
    sources: ["mdn-lists", "mdn-html-elements"],
  },
  {
    question: "Formularz jest wysyłany metodą `GET`. Gdzie trafiają dane pól?",
    options: [
      "Do ciała żądania HTTP, jak przy wysyłaniu plików",
      "Do ciasteczek przeglądarki, skąd odczytuje je serwer",
      "Do query stringa w URL (`?name=value&...`)",
    ],
    answer: 2,
    explanation:
      "Przy `method=\"get\"` dane są kodowane w query stringu, więc widać je w pasku adresu i zapisują się w historii i logach — nie nadaje się to do haseł. `POST` wysyła dane w ciele żądania. Bez JavaScriptu formularz jest wysyłany według atrybutów `action` (URL) i `method` elementu `<form>`.",
    sources: ["mdn-forms", "wd-forms"],
  },
  {
    question: "Co daje `<input type=\"email\">` w porównaniu z `type=\"text\"`?",
    options: [
      "Automatycznie sprawdza, czy skrzynka pocztowa naprawdę istnieje",
      "Wbudowaną walidację formatu e-maila i odpowiednią klawiaturę na telefonie",
      "Szyfruje wpisany adres przed wysłaniem",
    ],
    answer: 1,
    explanation:
      "Przeglądarka sprawdza składnię adresu (obecność `@` itd.) przy wysyłaniu i pokazuje na telefonie klawiaturę z `@`. Nie sprawdza, czy skrzynka istnieje, a szyfrowanie zapewnia HTTPS. Wbudowaną walidację uzupełniają `required`, `pattern`, `minlength`, ale walidacja po stronie serwera jest nadal obowiązkowa.",
    sources: ["mdn-input", "mdn-form-validation"],
  },
  {
    question: "Co robi atrybut `required` na polu formularza?",
    options: [
      "Przeglądarka nie wyśle formularza, dopóki pole jest puste",
      "Pole staje się tylko do odczytu do momentu wysłania formularza",
      "Wartość pola jest automatycznie walidowana na serwerze",
    ],
    answer: 0,
    explanation:
      "`required` włącza wbudowaną walidację po stronie klienta: przy pustym polu `submit` jest blokowany, a pole pasuje do `:invalid`. Tylko do odczytu to `readonly`. Walidacja na kliencie to jedynie wygoda: łatwo ją obejść, więc serwer musi sam sprawdzać dane.",
    sources: ["mdn-form-validation", "wd-forms"],
  },
  {
    question: "Na czym polega podejście utility-first w Tailwind CSS?",
    options: [
      "Style pisze się w osobnych plikach SCSS według BEM z mixinami",
      "Style składa się w markupie z małych jednozadaniowych klas (`flex`, `p-4`)",
      "Tailwind generuje gotowe komponenty: przyciski, karty, okna modalne",
    ],
    answer: 1,
    explanation:
      "Utility-first oznacza stylowanie atomowymi klasami, z których każda robi jedną rzecz. Tailwind nie jest biblioteką komponentów (w przeciwieństwie do Bootstrapa): nie ma gotowych przycisków. Do wynikowego CSS trafiają tylko klasy znalezione w kodzie źródłowym, więc paczka pozostaje mała.",
    sources: ["tw-utility-first"],
  },
  {
    question: "Co oznacza klasa `md:flex` w Tailwind?",
    options: [
      "`display: flex` działa tylko na ekranach mniejszych niż breakpoint `md`",
      "`display: flex` działa na ekranach od breakpointu `md` wzwyż",
      "Element dostaje średni rozmiar flex",
    ],
    answer: 1,
    explanation:
      "Breakpointy Tailwinda są mobile-first: `md:` zamienia się w `@media (width >= 48rem)`, więc styl działa od `md` w górę. Bez prefiksu styl działa na wszystkich rozmiarach. Aby zastosować styl tylko poniżej breakpointu, używa się `max-md:`.",
    sources: ["tw-responsive"],
  },
  {
    question: "Ile wynosi `p-4` w Tailwind przy domyślnej konfiguracji?",
    options: ["`padding: 4px`", "`padding: 4rem`", "`padding: 1rem`"],
    answer: 2,
    explanation:
      "Skala odstępów Tailwinda opiera się na jednostce 0,25rem: `p-4` = 4 × 0,25rem = 1rem. W v4 jest to realizowane zmienną `--spacing`: `calc(var(--spacing) * 4)`. Dowolna wartość wygląda tak: `p-[4px]`.",
    sources: ["tw-utility-first", "tw-theme"],
  },
  {
    question: "Jak w Tailwind zmienić tło przycisku po najechaniu kursorem?",
    options: [
      "`bg-blue-500 hover:bg-blue-600`",
      "`bg-blue-500 :hover-bg-blue-600`",
      "`bg-blue-500 on-hover:bg-blue-600`",
    ],
    answer: 0,
    explanation:
      "Stany w Tailwind ustawia się prefiksami wariantów: `hover:`, `focus:`, `focus-visible:`, `active:`, `disabled:` itd. Prefiksy można łączyć: `md:hover:bg-blue-600`. W Tailwind nie ma składni `:hover-` ani `on-hover:`.",
    sources: ["tw-states"],
  },
  {
    question: "Jak domyślnie działa wariant `dark:` w Tailwind v4?",
    options: [
      "Tylko gdy `<html>` ma klasę `dark` dodaną przez skrypt",
      "Na podstawie ustawienia systemowego — przez media query `prefers-color-scheme`",
      "Automatycznie wieczorem, według lokalnego zegara użytkownika",
    ],
    answer: 1,
    explanation:
      "Domyślnie `dark:` opiera się na `prefers-color-scheme`. Dla ręcznego przełącznika motywu wariant nadpisuje się przez `@custom-variant dark (&:where(.dark, .dark *));` — wtedy motyw zależy od klasy `dark` na przodku. Tailwind nie bierze pod uwagę pory dnia.",
    sources: ["tw-dark-mode"],
  },
];

export default questions;
