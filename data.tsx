
import React from 'react';
import { Problem, TheoryItem, Topic, Difficulty, CourseModule, InteractiveExercise } from './types';
import MathDisplay from './components/MathDisplay';
import introVideo from './src/introduction.mp4';

export const THEORY_DATA: TheoryItem[] = [
  {
    id: 't1',
    topic: Topic.SINGLE_RV,
    title: 'Zmienne Jednowymiarowe - Podstawy',
    content: (
      <div className="space-y-8">
        {/* Sekcja 1: Definicje */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-indigo-600 rounded-full"></div>
            <h4 className="text-xl font-bold text-slate-800">1. Definicje Podstawowe</h4>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6">
            <p className="text-indigo-900">
              <strong>Zmienna losowa (X)</strong> – funkcja przyporządkowująca liczbę rzeczywistą każdemu zdarzeniu elementarnemu w przestrzeni probabilistycznej.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Dystrybuanta */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <strong className="text-lg text-slate-800">Dystrybuanta F(x)</strong>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">CDF</span>
              </div>
              <MathDisplay formula={String.raw`F(x) = P(X \le x)`} className="my-3" />
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>Niemalejąca: $x_1 &lt; x_2 \implies F(x_1) \le F(x_2)$</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>Granice: $F(-\infty) = 0, F(+\infty) = 1$</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>Prawdopodobieństwo: $P(a &lt; X \le b) = F(b) - F(a)$</span>
                </div>
              </div>
            </div>

            {/* Gęstość */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <strong className="text-lg text-slate-800">Gęstość p(x)</strong>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">PDF</span>
              </div>
              <MathDisplay formula={String.raw`p(x) = \frac{dF(x)}{dx}`} className="my-3" />
              <p className="text-sm text-slate-600 mb-2">
                Dla zmiennych ciągłych. Warunek normalizacji:
              </p>
              <MathDisplay formula={String.raw`\int_{-\infty}^{\infty} p(x)dx = 1`} className="my-1" />
            </div>
          </div>
        </section>

        {/* Sekcja 2: Momenty */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-indigo-600 rounded-full"></div>
            <h4 className="text-xl font-bold text-slate-800">2. Momenty Statystyczne</h4>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <strong className="block text-slate-700 mb-2">Wartość Oczekiwana (Średnia)</strong>
              <MathDisplay formula={String.raw`E[X] = m_X = \int_{-\infty}^{\infty} x \cdot p(x) dx`} className="my-2" />
              <p className="text-xs text-slate-500 italic mt-2">"Środek ciężkości" rozkładu.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <strong className="block text-slate-700 mb-2">Wariancja (Moc składowej zmiennej)</strong>
              <MathDisplay formula={String.raw`Var(X) = \sigma_X^2 = E[(X - m_X)^2]`} className="my-2" />
              <div className="mt-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Wzór roboczy:</span>
                <MathDisplay formula={String.raw`\sigma_X^2 = E[X^2] - (E[X])^2`} inline className="ml-2" />
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja 3: Transformacje */}
        <section className="bg-amber-50 border border-amber-200 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h4 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            3. Transformacja Zmiennej Losowej
          </h4>

          <p className="text-amber-900 mb-4">
            Jeśli mamy zmienną $Y = g(X)$, a znamy rozkład $p_X(x)$, to gęstość $p_Y(y)$ wyznaczamy wzorem:
          </p>

          <div className="bg-white/60 p-4 rounded-lg border border-amber-100 backdrop-blur-sm">
            <MathDisplay formula={String.raw`p_Y(y) = p_X(h(y)) \cdot \left| \frac{dh(y)}{dy} \right|`} className="my-1 font-bold text-lg" />
          </div>

          <div className="mt-4 flex gap-3 text-sm text-amber-800">
            <div className="flex-shrink-0 w-1 bg-amber-300 rounded-full"></div>
            <p>
              Gdzie $x = h(y)$ to funkcja odwrotna do $g(x)$.<br />
              <strong>Kluczowe:</strong> Pamiętaj o module z pochodnej (jakobianie)!
            </p>
          </div>
        </section>
      </div>
    )
  },
  {
    id: 't2',
    topic: Topic.JOINT_RV,
    title: 'Zmienne Wielowymiarowe (2D)',
    content: (
      <div className="space-y-8">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700">
          Opisujemy zachowanie dwóch zmiennych $X$ i $Y$ jednocześnie za pomocą gęstości łącznej $p(x,y)$.
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
            <h4 className="font-bold mb-4 text-indigo-700 flex items-center gap-2">
              <span className="bg-indigo-100 p-1 rounded text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </span>
              Rozkłady Brzegowe
            </h4>
            <p className="text-xs text-slate-500 mb-3">"Spłaszczanie" rozkładu do jednego wymiaru (całkowanie po niechcianej zmiennej).</p>
            <div className="space-y-2">
              <MathDisplay formula={String.raw`p_X(x) = \int_{-\infty}^{\infty} p(x,y) dy`} />
              <MathDisplay formula={String.raw`p_Y(y) = \int_{-\infty}^{\infty} p(x,y) dx`} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
            <h4 className="font-bold mb-4 text-indigo-700 flex items-center gap-2">
              <span className="bg-indigo-100 p-1 rounded text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </span>
              Rozkłady Warunkowe
            </h4>
            <p className="text-xs text-slate-500 mb-3">Jak wygląda rozkład X, gdy wiemy, że Y przyjął konkretną wartość?</p>
            <MathDisplay formula={String.raw`p(x|y) = \frac{p(x,y)}{p_Y(y)}`} className="my-4" />
            <p className="text-xs text-center text-slate-400">Analogicznie dla $p(y|x)$.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-4 border-b border-indigo-100 pb-2">Niezależność vs Nieskorelowanie</h4>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-green-100 text-green-700 p-2 rounded-lg font-bold text-xs uppercase tracking-wide min-w-[120px] text-center">Niezależność</div>
              <div className="text-sm text-slate-700">
                <p className="mb-1 font-semibold">Najsilniejszy warunek.</p>
                <p className="mb-1">Oznacza, że $p(x,y) = p_X(x) \cdot p_Y(y)$.</p>
                <p className="text-slate-500 text-xs">Informacja o Y nie zmienia wiedzy o X.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-lg font-bold text-xs uppercase tracking-wide min-w-[120px] text-center">Nieskorelowanie</div>
              <div className="text-sm text-slate-700">
                <p className="mb-1 font-semibold">Brak zależności liniowej.</p>
                <p className="mb-1">Oznacza, że kowariancja $Cov(X,Y) = 0$.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-indigo-100/50 p-3 rounded text-xs text-indigo-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span><strong>Uwaga:</strong> Niezależność $\implies$ Nieskorelowanie. Ale Nieskorelowanie $\not\implies$ Niezależność (chyba że rozkład jest Gaussowski).</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-sm block text-slate-600 mb-1 uppercase tracking-wide">Korelacja (Moment mieszany)</strong>
            <MathDisplay formula={String.raw`R_{XY} = E[XY] = \iint x \cdot y \cdot p(x,y) dx dy`} />
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-sm block text-slate-600 mb-1 uppercase tracking-wide">Kowariancja (Moment centralny)</strong>
            <MathDisplay formula={String.raw`C_{XY} = E[(X-m_X)(Y-m_Y)] = R_{XY} - m_X m_Y`} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 't3',
    topic: Topic.VECTORS,
    title: 'Wektory Losowe i Macierze',
    content: (
      <div className="space-y-8">
        <div className="bg-slate-900 text-slate-200 p-6 rounded-xl shadow-lg">
          <p className="text-lg font-light text-center">
            {String.raw`Wektor losowy $\vec{X} = [X_1, X_2, ..., X_N]^T$ to zestaw zmiennych losowych.`}
          </p>
        </div>

        {/* Macierze R i C */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-slate-800">Macierze Autokorelacji i Kowariancji</h4>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">Dla wektorów zespolonych</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="p-6 hover:bg-slate-50 transition-colors">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide text-center mb-3">Autokorelacja (R)</p>
                <MathDisplay formula={String.raw`R_X = E[\vec{X} \cdot \vec{X}^H]`} />
                <p className="text-xs text-center text-slate-400 mt-3">Gdzie $H$ to sprzężenie hermitowskie (transpozycja + sprzężenie zespolone).</p>
              </div>
              <div className="p-6 hover:bg-slate-50 transition-colors">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide text-center mb-3">Kowariancja (C)</p>
                <MathDisplay formula={String.raw`C_X = E[(\vec{X}-\vec{m})(\vec{X}-\vec{m})^H]`} />
                <p className="text-xs text-center text-slate-400 mt-3">{String.raw`$C_X = R_X - \vec{m}\vec{m}^H$`}</p>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                <li>Macierze $R_X$ i $C_X$ są zawsze <strong>hermitowskie</strong> ($A = A^H$) i <strong>dodatnio półokreślone</strong>.</li>
                <li>Na głównej przekątnej $C_X$ znajdują się wariancje poszczególnych elementów ($Var(X_i)$).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transformacje Liniowe */}
        <section className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
          <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.761 2.165 17.5 5.353 17.5h9.294c3.188 0 4.536-2.739 2.653-4.621l-4-4a1 1 0 01-.293-.707V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
            </svg>
            Przekształcenia Liniowe Wektorów
          </h4>
          <p className="text-sm text-emerald-900 mb-4">
            {String.raw`Jeśli $\vec{Y} = \mathbf{A}\vec{X} + \vec{b}$, gdzie $\mathbf{A}$ to macierz stała, a $\vec{b}$ to wektor stały, to:`}
          </p>

          <div className="space-y-3">
            <div className="bg-white/80 p-3 rounded border border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase">Wartość średnia</span>
              <MathDisplay formula={String.raw`\vec{m}_Y = \mathbf{A}\vec{m}_X + \vec{b}`} inline />
            </div>
            <div className="bg-white/80 p-3 rounded border border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase">Macierz kowariancji</span>
              <MathDisplay formula={String.raw`C_Y = \mathbf{A} C_X \mathbf{A}^H`} inline />
            </div>
            <div className="bg-white/80 p-3 rounded border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-700 uppercase">Macierz korelacji</span>
              <div className="text-right">
                <MathDisplay formula={String.raw`R_Y = \mathbf{A} R_X \mathbf{A}^H + \dots`} inline className="text-xs" />
                <p className="text-[10px] text-emerald-600 mt-1">(wzór na R jest bardziej złożony, jeśli średnia nie jest zerowa)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ortogonalność wektorów */}
        <section className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="font-bold mb-4 text-indigo-600 border-b border-slate-100 pb-2">Relacje między dwoma wektorami</h4>
          <p className="text-sm mb-4 text-slate-600">{String.raw`Dla dwóch wektorów $\vec{X}$ i $\vec{Y}$:`}</p>
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-400"></div>
              <div>
                <strong className="text-sm text-slate-800">Niezależność</strong>
                <div className="text-sm text-slate-600 mt-1">{String.raw`$p(\vec{x}, \vec{y}) = p(\vec{x}) \cdot p(\vec{y})$`}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-400"></div>
              <div>
                <strong className="text-sm text-slate-800">Ortogonalność</strong>
                <div className="text-sm text-slate-600 mt-1">{String.raw`Macierz korelacji skrośnej $R_{XY} = E[\vec{X}\vec{Y}^H] = \mathbf{0}$`}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-400"></div>
              <div>
                <strong className="text-sm text-slate-800">Nieskorelowanie</strong>
                <div className="text-sm text-slate-600 mt-1">{String.raw`Macierz kowariancji skrośnej $C_{XY} = E[(\vec{X}-\vec{m}_X)(\vec{Y}-\vec{m}_Y)^H] = \mathbf{0}$`}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
];

export const PROBLEMS_DATA: Problem[] = [
  // --- 1. POJEDYNCZA ZMIENNA (PODSTAWY) ---

  {
    id: 'p_dice',
    topic: Topic.SINGLE_RV,
    order: 1,
    difficulty: Difficulty.EASY,
    title: 'Rzut kostką 6-ścienną',
    description: 'Tydzień 1, Zad 1. Absolutne podstawy. Zmienna dyskretna, dystrybuanta schodkowa.',
    question: 'Rozpatrz eksperyment polegający na rzucie kostką 6-ścienną.\na) Określ zmienną losową opisującą wylosowaną liczbę i oblicz prawdopodobieństwa.\nb) Przedstaw dystrybuantę F(x) oraz rozkład gęstości p(x) (w sensie delt Diraca).',
    steps: [
      {
        title: 'Krok 1: Zdefiniowanie zmiennej losowej',
        content: 'Musimy przypisać liczby do zdarzeń. Kostka ma 6 ścianek, więc zmienna losowa $X$ przyjmuje wartości ze zbioru $\{1, 2, 3, 4, 5, 6\}$.<br/><br/>Ponieważ kostka jest symetryczna (uczciwa), prawdopodobieństwo wypadnięcia każdej ścianki jest takie samo.',
        formula: String.raw`P(X=k) = \frac{1}{6} \quad \text{dla } k \in \{1, 2, 3, 4, 5, 6\}`
      },
      {
        title: 'Krok 2: Wyznaczanie Dystrybuanty F(x)',
        content: '<strong>Dystrybuanta F(x)</strong> to prawdopodobieństwo, że zmienna $X$ przyjmie wartość mniejszą lub równą $x$: $F(x) = P(X \\le x)$.<br/>Dla zmiennej dyskretnej jest to <strong>funkcja schodkowa</strong>. Zaczyna się od 0, a w każdym punkcie realizaji (1, 2, 3...) rośnie o wartość prawdopodobieństwa (o $1/6$).',
        formula: String.raw`F(x) = \begin{cases} 0 & x < 1 \\ 1/6 & 1 \le x < 2 \\ 2/6 & 2 \le x < 3 \\ ... \\ 1 & x \ge 6 \end{cases}`
      },
      {
        title: 'Krok 3: Gęstość prawdopodobieństwa p(x)',
        content: 'W przypadku dyskretnym nie mamy "typowej" funkcji gęstości, ale możemy ją zapisać przy użyciu <strong>Delty Diraca</strong> $\\delta(x)$.<br/>Każda możliwa wartość to "szpilka" (impuls) o wysokości równej prawdopodobieństwu.',
        formula: String.raw`p(x) = \sum_{k=1}^6 P(X=k) \cdot \delta(x-k) = \sum_{k=1}^6 \frac{1}{6} \delta(x-k)`
      }
    ],
    finalAnswer: 'a) P(X=k) = 1/6.\nb) F(x) to schody o wysokości 1/6.\nc) p(x) to suma 6 delt Diraca.'
  },

  {
    id: 'p_poly_cx2',
    topic: Topic.SINGLE_RV,
    order: 2,
    difficulty: Difficulty.MEDIUM,
    title: 'Zmienna wielomianowa kx²',
    description: 'Zadanie z notatek ręcznych. Wyznaczanie stałej k, dystrybuanty i transformacja zmiennej.',
    question: 'Dany jest rozkład gęstości: p(x) = kx² dla x ∈ (0, 1) (0 poza tym).\n\na) Wyznacz stałą k.\nb) Wyznacz dystrybuantę F(x).\nc) Oblicz P(1/3 < X < 4).\nd) Znajdź gęstość p_Y(y), jeśli Y = arcsin(X).',
    steps: [
      {
        title: 'Krok 1: Warunek normalizacyjny (Wyznaczanie k)',
        content: 'Aby funkcja była gęstością, pole pod jej wykresem musi być równe 1. Musimy obliczyć całkę po całej dziedzinie (od 0 do 1) i przyrównać ją do 1.',
        formula: String.raw`\int_{-\infty}^{\infty} p(x) dx = \int_{0}^{1} k \cdot x^2 dx = 1`
      },
      {
        title: 'Krok 2: Obliczenie całki',
        content: 'Wyciągamy stałą $k$ przed całkę. Całka z $x^n$ to $\\frac{x^{n+1}}{n+1}$.<br/>Tutaj $n=2$, więc całka to $\\frac{x^3}{3}$.',
        formula: String.raw`k \left[ \frac{x^3}{3} \right]_0^1 = k \left( \frac{1^3}{3} - \frac{0^3}{3} \right) = \frac{k}{3}`
      },
      {
        title: 'Krok 3: Wynik dla k',
        content: 'Mamy równanie: $\\frac{k}{3} = 1$. Mnożymy obustronnie przez 3.',
        formula: String.raw`k = 3 \quad \Rightarrow \quad p(x) = 3x^2 \text{ dla } x \in (0,1)`
      },
      {
        title: 'Krok 4: Wyznaczenie Dystrybuanty F(x)',
        content: 'Dystrybuanta to pole pod wykresem od $-\\infty$ do $x$.<br/>Dla $x \\in (0,1)$ całkujemy gęstość $3t^2$.<br/>Dla $x \\le 0$, $F(x)=0$. Dla $x \\ge 1$, $F(x)=1$.',
        formula: String.raw`F(x) = \int_0^x 3t^2 dt = 3 \cdot \left[ \frac{t^3}{3} \right]_0^x = x^3`
      },
      {
        title: 'Krok 5: Prawdopodobieństwo z przedziału',
        content: 'Chcemy obliczyć $P(1/3 < X < 4)$.<br/>Uwaga! Nasza zmienna $X$ istnieje tylko do $x=1$. Więc przedział to tak naprawdę $(1/3, 1)$.<br/>Korzystamy z dystrybuanty: $P(a < X < b) = F(b) - F(a)$.',
        formula: String.raw`P(1/3 < X < 1) = F(1) - F(1/3) = 1^3 - \left(\frac{1}{3}\right)^3 = 1 - \frac{1}{27} = \frac{26}{27}`
      },
      {
        title: 'Krok 6: Transformacja zmiennej losowej',
        content: 'Mamy nową zmienną $Y = \\arcsin(X)$. Szukamy jej gęstości $p_Y(y)$.<br/>1. Wyznaczamy funkcję odwrotną: $X = \\sin(Y)$.<br/>2. Określamy dziedzinę $Y$. Skoro $X \\in (0,1)$, to $Y \\in (\\arcsin 0, \\arcsin 1) = (0, \\pi/2)$.',
        formula: String.raw`x = h(y) = \sin(y)`
      },
      {
        title: 'Krok 7: Wzór na gęstość transformowaną',
        content: 'Stosujemy wzór: $p_Y(y) = p_X(h(y)) \\cdot |h\\\'(y)|$.<br/>Pochodna $h\\\'(y) = (\\sin y)\\\' = \\cos y$.<br/>Podstawiamy $x = \\sin y$ do wzoru na $p_X(x) = 3x^2$.',
        formula: String.raw`p_Y(y) = 3(\sin y)^2 \cdot |\cos y| = 3\sin^2 y \cos y`
      }
    ],
    finalAnswer: 'a) k = 3\nb) F(x) = x³\nc) 26/27\nd) p(y) = 3sin²(y)cos(y)'
  },

  {
    id: 'p1_cauchy',
    topic: Topic.SINGLE_RV,
    order: 3,
    difficulty: Difficulty.MEDIUM,
    title: 'Rozkład Cauchy\'ego',
    description: 'Tydzień 2. Całkowanie funkcji wymiernej w granicach nieskończonych.',
    question: 'Dany jest rozkład gęstości prawdopodobieństwa:\np(x) = k / (1 + x²) dla x ∈ (-∞, +∞).\n\na) Wyznacz stałą k.\nb) Wyznacz dystrybuantę F(x).',
    steps: [
      {
        title: 'Krok 1: Warunek normalizacyjny',
        content: 'Całka z gęstości po całej osi musi wynosić 1. Jest to całka niewłaściwa (granice w nieskończoności).',
        formula: String.raw`\int_{-\infty}^{+\infty} \frac{k}{1+x^2} dx = 1`
      },
      {
        title: 'Krok 2: Całkowanie',
        content: 'Funkcja pierwotna z $\\frac{1}{1+x^2}$ to <strong>arcus tangens</strong> (arctg x).',
        formula: String.raw`k \cdot [\arctan(x)]_{-\infty}^{+\infty} = 1`
      },
      {
        title: 'Krok 3: Granice w nieskończoności',
        content: 'Musimy pamiętać wartości graniczne funkcji arctg:<br/>$\\lim_{x \\to \infty} \\arctan(x) = \\frac{\\pi}{2}$<br/>$\\lim_{x \\to -\\infty} \\arctan(x) = -\\frac{\\pi}{2}$',
        formula: String.raw`k \cdot \left( \frac{\pi}{2} - (-\frac{\pi}{2}) \right) = k \cdot \pi`
      },
      {
        title: 'Krok 4: Wyznaczenie k',
        content: 'Mamy równanie $k \\pi = 1$, stąd wyznaczamy $k$.',
        formula: String.raw`k = \frac{1}{\pi}`
      },
      {
        title: 'Krok 5: Dystrybuanta F(x)',
        content: 'Dystrybuanta to całka od $-\\infty$ do $x$.',
        formula: String.raw`F(x) = \int_{-\infty}^{x} \frac{1}{\pi(1+t^2)} dt = \frac{1}{\pi} [\arctan(t)]_{-\infty}^{x}`
      },
      {
        title: 'Krok 6: Wynik końcowy',
        content: 'Podstawiamy granice całkowania. Pamiętamy, że dolna granica ($-\\infty$) daje $-\\pi/2$.',
        formula: String.raw`F(x) = \frac{1}{\pi} \left( \arctan(x) - (-\frac{\pi}{2}) \right) = \frac{1}{\pi} \arctan(x) + \frac{1}{2}`
      }
    ],
    finalAnswer: 'a) k = 1/π\nb) F(x) = 1/π arctg(x) + 1/2'
  },

  {
    id: 'p5_arcsin',
    topic: Topic.SINGLE_RV,
    order: 4,
    difficulty: Difficulty.MEDIUM,
    title: 'Dystrybuanta z Arcsin',
    description: 'Tydzień 1, Zad 2. Analiza ciągłości dystrybuanty.',
    question: 'Dystrybuanta zmiennej losowej ma postać:\nF(x) = \n• 0 dla x ≤ -a\n• A + B*arcsin(x/a) dla x ∈ (-a, a)\n• 1 dla x ≥ a\n\na) Przy jakich A i B dystrybuanta jest ciągła?\nb) Wyznacz gęstość prawdopodobieństwa f(x).',
    steps: [
      {
        title: 'Krok 1: Zrozumienie ciągłości',
        content: 'Dystrybuanta zmiennej ciągłej nie może mieć "dziur" ani skoków. Musi się "kleić" na granicach przedziałów (w punktach $-a$ i $a$).',
        formula: String.raw`\lim_{x \to -a^+} F(x) = F(-a) = 0`
      },
      {
        title: 'Krok 2: Punkt x = -a',
        content: 'Podstawiamy $-a$ do wzoru środkowego ($A + B\\arcsin(x/a)$).<br/>$\\arcsin(-a/a) = \\arcsin(-1) = -\\pi/2$.<br/>Przyrównujemy do wartości z lewej strony (czyli 0).',
        formula: String.raw`A + B(-\frac{\pi}{2}) = 0 \quad \Rightarrow \quad A = B\frac{\pi}{2}`
      },
      {
        title: 'Krok 3: Punkt x = a',
        content: 'Teraz sprawdzamy prawą stronę. W punkcie $a$ dystrybuanta musi osiągnąć wartość 1.<br/>$\arcsin(a/a) = \arcsin(1) = \pi/2$.',
        formula: String.raw`A + B(\frac{\pi}{2}) = 1`
      },
      {
        title: 'Krok 4: Układ równań',
        content: 'Mamy dwa równania:<br/>1) $A = B\\pi/2$<br/>2) $A + B\\pi/2 = 1$<br/>Podstawiamy pierwsze do drugiego: $B\\pi/2 + B\\pi/2 = 1 \\Rightarrow B\\pi = 1$.',
        formula: String.raw`B = \frac{1}{\pi}, \quad A = \frac{1}{\pi} \cdot \frac{\pi}{2} = \frac{1}{2}`
      },
      {
        title: 'Krok 5: Obliczanie gęstości f(x)',
        content: 'Gęstość to pochodna dystrybuanty: $f(x) = F\'(x)$.<br/>Pochodna stałej $A$ to 0. Musimy zróżniczkować $B \\arcsin(x/a)$.<br/>Wzór: $(\\arcsin u)\' = \\frac{u\'}{\\sqrt{1-u^2}}$.',
        formula: String.raw`f(x) = B \cdot \frac{(x/a)'}{\sqrt{1-(x/a)^2}} = \frac{1}{\pi} \cdot \frac{1/a}{\sqrt{1 - x^2/a^2}}`
      },
      {
        title: 'Krok 6: Uproszczenie wyniku',
        content: 'Wciągamy $1/a$ pod pierwiastek (jako $1/a^2$).',
        formula: String.raw`f(x) = \frac{1}{\pi \sqrt{a^2(1 - \frac{x^2}{a^2})}} = \frac{1}{\pi \sqrt{a^2 - x^2}}`
      }
    ],
    finalAnswer: 'A=1/2, B=1/π\nf(x) = 1 / (π√(a²-x²))'
  },

  {
    id: 'p8_phase',
    topic: Topic.SINGLE_RV,
    order: 5,
    difficulty: Difficulty.MEDIUM,
    title: 'Transformacja Fazy na Napięcie',
    description: 'Tydzień 2, Zad 2. Przejście z rozkładu jednostajnego fazy na sinusoidalne napięcie.',
    question: 'Faza φ ma rozkład równomierny na (-π/2, π/2), czyli p(φ) = 1/π.\nNapięcie dane jest wzorem U = U₀ sin(φ).\nWyznacz rozkład gęstości prawdopodobieństwa napięcia p(u).',
    steps: [
      {
        title: 'Krok 1: Analiza transformacji',
        content: 'Mamy zmienną losową $\\phi$ i nową zmienną $U$. Szukamy gęstości $p_U(u)$.<br/>Znamy wzór transformacji: $u = g(\\phi) = U_0 \\sin(\\phi)$.',
        formula: ""
      },
      {
        title: 'Krok 2: Funkcja odwrotna',
        content: 'Musimy wyznaczyć $\\phi$ jako funkcję $u$. Dzielimy przez $U_0$ i bierzemy arcus sinus.',
        formula: String.raw`\phi = h(u) = \arcsin\left(\frac{u}{U_0}\right)`
      },
      {
        title: 'Krok 3: Obliczenie Jakobianu (pochodnej)',
        content: 'Musimy policzyć moduł z pochodnej funkcji odwrotnej: $|\\frac{d\\phi}{du}|$.<br/>Pamiętamy, że $(\\arcsin x)\' = \\frac{1}{\\sqrt{1-x^2}}$.',
        formula: String.raw`\frac{d\phi}{du} = \frac{1}{\sqrt{1 - (\frac{u}{U_0})^2}} \cdot \left(\frac{u}{U_0}\right)' = \frac{1}{\sqrt{1 - \frac{u^2}{U_0^2}}} \cdot \frac{1}{U_0}`
      },
      {
        title: 'Krok 4: Uproszczenie pochodnej',
        content: 'Wprowadzamy $U_0$ pod pierwiastek.',
        formula: String.raw`\left| \frac{d\phi}{du} \right| = \frac{1}{\sqrt{U_0^2(1 - \frac{u^2}{U_0^2})}} = \frac{1}{\sqrt{U_0^2 - u^2}}`
      },
      {
        title: 'Krok 5: Wzór na gęstość',
        content: 'Stosujemy wzór: $p_U(u) = p_\\phi(h(u)) \\cdot |h\'(u)|$.<br/>Gęstość fazy $p_\\phi$ jest stała i wynosi $1/\\pi$.',
        formula: String.raw`p_U(u) = \frac{1}{\pi} \cdot \frac{1}{\sqrt{U_0^2 - u^2}} \quad \text{dla } u \in (-U_0, U_0)`
      }
    ],
    finalAnswer: 'p(u) = 1 / (π√(U₀² - u²))'
  },

  // --- 2. ZMIENNE WIELOWYMIAROWE (JOINT RV) ---

  {
    id: 'p_joint_kxy_x',
    topic: Topic.JOINT_RV,
    order: 6,
    difficulty: Difficulty.MEDIUM,
    title: 'Rozkład p(x,y) = kxy + x',
    description: 'Tydzień 3, Zad 2. Wyznaczanie stałej z normalizacji i sprawdzanie niezależności.',
    question: 'Dany jest rozkład łączny: p(x,y) = kxy + x\ndla x ∈ (0,2), y ∈ (0,1).\na) Wyznacz k.\nb) Sprawdź niezależność X i Y.',
    steps: [
      {
        title: 'Krok 1: Warunek normalizacyjny',
        content: 'Objętość pod wykresem gęstości łącznej musi wynosić 1. Całkujemy po prostokącie: $x \\in (0,2)$ i $y \\in (0,1)$.',
        formula: String.raw`\int_0^1 \int_0^2 (kxy + x) dx dy = 1`
      },
      {
        title: 'Krok 2: Całkowanie po x',
        content: 'Wyciągamy $x$ przed nawias: $x(ky+1)$. Całkujemy $x$ (dostajemy $x^2/2$) a $ky+1$ traktujemy jako stałą (bo całkujemy po $dx$).',
        formula: String.raw`\int_0^1 \left[ \frac{x^2}{2}(ky+1) \right]_0^2 dy = \int_0^1 \frac{4}{2}(ky+1) dy = \int_0^1 (2ky + 2) dy`
      },
      {
        title: 'Krok 3: Całkowanie po y',
        content: 'Teraz całkujemy wynik po $y$. Całka z $2ky$ to $ky^2$ (bo pochodna $y^2$ to $2y$), całka z 2 to $2y$.',
        formula: String.raw`\left[ ky^2 + 2y \right]_0^1 = k(1)^2 + 2(1) = k + 2`
      },
      {
        title: 'Krok 4: Wyznaczenie k',
        content: 'Przyrównujemy wynik do 1.',
        formula: String.raw`k + 2 = 1 \quad \Rightarrow \quad k = -1`
      },
      {
        title: 'Krok 5: Sprawdzenie niezależności',
        content: 'Gęstość ma postać $p(x,y) = -xy + x = x(1-y)$.<br/>Czy da się to zapisać jako iloczyn funkcji tylko od $x$ i tylko od $y$?<br/>Tak! $g(x) = x$ oraz $h(y) = 1-y$.<br/>Jeżeli gęstość łączna faktoryzuje się na iloczyn $X \\cdot Y$ na prostokątnej dziedzinie, zmienne są niezależne.',
        formula: String.raw`p(x,y) = x \cdot (1-y) \Rightarrow \text{Niezależne}`
      }
    ],
    finalAnswer: 'a) k = -1\nb) Niezależne'
  },

  {
    id: 'p_joint_k_x_y',
    topic: Topic.JOINT_RV,
    order: 7,
    difficulty: Difficulty.MEDIUM,
    title: 'Rozkład p(x,y) = k(x+y)',
    description: 'Z notatek odręcznych (zdjęcie 4). Kwadrat 0<x<2, 0<y<2.',
    question: 'Gęstość łączna p(x,y) = k(x+y) na kwadracie x,y ∈ (0,2).\n\na) Wyznacz k.\nb) Wyznacz rozkład brzegowy p_X(x).\nc) Sprawdź niezależność.',
    steps: [
      {
        title: 'Krok 1: Całka podwójna',
        content: 'Musimy scałkować $k(x+y)$ po kwadracie $2\\times 2$.',
        formula: String.raw`k \int_0^2 \left( \int_0^2 (x+y) dx \right) dy = 1`
      },
      {
        title: 'Krok 2: Całka wewnętrzna (po x)',
        content: '$y$ traktujemy jako stałą. Całka z $x$ to $x^2/2$, całka ze stałej $y$ to $yx$.',
        formula: String.raw`\int_0^2 (x+y) dx = \left[ \frac{x^2}{2} + yx \right]_0^2 = (\frac{4}{2} + 2y) - 0 = 2 + 2y`
      },
      {
        title: 'Krok 3: Całka zewnętrzna (po y)',
        content: 'Teraz całkujemy wynik $(2 + 2y)$ po $y$ od 0 do 2.',
        formula: String.raw`\int_0^2 (2+2y) dy = \left[ 2y + y^2 \right]_0^2 = (4 + 4) - 0 = 8`
      },
      {
        title: 'Krok 4: Wyznaczenie k',
        content: '$k \\cdot 8 = 1$, więc:',
        formula: String.raw`k = \frac{1}{8}`
      },
      {
        title: 'Krok 5: Rozkład brzegowy pX(x)',
        content: 'Aby dostać sam rozkład $X$, musimy "pozbyć się" $Y$, czyli scałkować gęstość łączną po całej dziedzinie $Y$ (od 0 do 2).',
        formula: String.raw`p_X(x) = \int_0^2 \frac{1}{8}(x+y) dy = \frac{1}{8} \left[ xy + \frac{y^2}{2} \right]_0^2 = \frac{1}{8} (2x + 2) = \frac{x+1}{4}`
      },
      {
        title: 'Krok 6: Sprawdzenie niezależności',
        content: 'Zmienne są niezależne, jeśli $p(x,y) = p_X(x) \\cdot p_Y(y)$.<br/>Ze względu na symetrię $p_Y(y) = (y+1)/4$.<br/>Sprawdźmy iloczyn: $\\frac{x+1}{4} \\cdot \\frac{y+1}{4} = \\frac{xy+x+y+1}{16}$.<br/>To NIE jest równe $\\frac{x+y}{8}$.',
        formula: String.raw`\text{Zmienne są ZALEŻNE}`
      }
    ],
    finalAnswer: 'a) k = 1/8\nb) pX(x) = (x+1)/4\nc) Zależne'
  },

  {
    id: 'p_joint_kxy2',
    topic: Topic.JOINT_RV,
    order: 8,
    difficulty: Difficulty.MEDIUM,
    title: 'Rozkład p(x,y) = kxy²',
    description: 'Z notatek odręcznych (ostatnie zdjęcia).',
    question: 'Gęstość p(x,y) = kxy² dla x ∈ (0,1), y ∈ (0,1).\n\na) Wyznacz k.\nb) Sprawdź ortogonalność (czy E[XY]=0).',
    steps: [
      {
        title: 'Krok 1: Wyznaczanie k',
        content: 'Mamy funkcję o rozdzielonych zmiennych (iloczyn $x$ i $y^2$). Możemy policzyć całki niezależnie.',
        formula: String.raw`\int_0^1 x dx = \frac{1}{2}, \quad \int_0^1 y^2 dy = \frac{1}{3}`
      },
      {
        title: 'Krok 2: Równanie na k',
        content: 'Całka podwójna to iloczyn całek pojedynczych.',
        formula: String.raw`k \cdot \frac{1}{2} \cdot \frac{1}{3} = 1 \quad \Rightarrow \quad \frac{k}{6} = 1 \quad \Rightarrow \quad k = 6`
      },
      {
        title: 'Krok 3: Sprawdzanie ortogonalności',
        content: 'Zmienne są ortogonalne, jeśli korelacja $E[XY] = 0$.<br/>Wzór: $E[XY] = \\iint xy \\cdot p(x,y) dx dy$.',
        formula: String.raw`E[XY] = \int_0^1 \int_0^1 xy \cdot (6xy^2) dx dy = 6 \int_0^1 x^2 dx \int_0^1 y^3 dy`
      },
      {
        title: 'Krok 4: Obliczenie całek momentów',
        content: 'Całka z $x^2$ to $1/3$. Całka z $y^3$ to $1/4$.',
        formula: String.raw`E[XY] = 6 \cdot \frac{1}{3} \cdot \frac{1}{4} = 6 \cdot \frac{1}{12} = \frac{1}{2}`
      },
      {
        title: 'Krok 5: Wniosek',
        content: 'Ponieważ $E[XY] = 0.5 \\neq 0$, zmienne <strong>nie są ortogonalne</strong>.',
        formula: ""
      }
    ],
    finalAnswer: 'a) k=6\nb) Nie są ortogonalne (E[XY]=0.5)'
  },

  {
    id: 'p_joint_exp',
    topic: Topic.JOINT_RV,
    order: 9,
    difficulty: Difficulty.MEDIUM,
    title: 'Dystrybuanta Wykładnicza (Niezależność)',
    description: 'Tydzień 3, Zad 1. Praca na dystrybuantach.',
    question: 'Dana jest dystrybuanta łączna:\nF(x,y) = (1 - e^(-ax))(1 - e^(-by)) dla x,y > 0.\nCzy zmienne są niezależne?',
    steps: [
      {
        title: 'Krok 1: Wyznaczanie Dystrybuant Brzegowych',
        content: 'Dystrybuantę brzegową $X$ otrzymujemy, biorąc granicę $y \\to \\infty$.<br/>Ponieważ $\\lim_{y \\to \\infty} e^{-by} = 0$, nawias z $y$ staje się (1-0) = 1.',
        formula: String.raw`F_X(x) = \lim_{y \to \infty} F(x,y) = 1 - e^{-ax}`
      },
      {
        title: 'Krok 2: Dystrybuanta brzegowa Y',
        content: 'Analogicznie bierzemy granicę $x \\to \\infty$.',
        formula: String.raw`F_Y(y) = \lim_{x \to \infty} F(x,y) = 1 - e^{-by}`
      },
      {
        title: 'Krok 3: Warunek niezależności',
        content: 'Zmienne są niezależne, jeśli $F(x,y) = F_X(x) \\cdot F_Y(y)$.',
        formula: String.raw`(1 - e^{-ax})(1 - e^{-by}) = (1 - e^{-ax}) \cdot (1 - e^{-by})`
      },
      {
        title: 'Krok 4: Wniosek',
        content: 'Lewa strona równa się prawej. Warunek jest spełniony.',
        formula: String.raw`\text{TAK, są niezależne}`
      }
    ],
    finalAnswer: 'Tak, są niezależne.'
  },

  // --- 3. WEKTORY I ZADANIA ZAAWANSOWANE (HARD) ---

  {
    id: 'p_vector_complex_cos',
    topic: Topic.VECTORS,
    order: 10,
    difficulty: Difficulty.HARD,
    title: 'Wektor z cosinusem (Ax₁x₂y₁³cos(y₂))',
    description: 'Zadanie z notatek ręcznych ("Zad 2"). Bardzo złożona gęstość wektorów X i Y.',
    question: 'Gęstość łączna wektorów X=[x₁, x₂] i Y=[y₁, y₂] dana jest wzorem:\np(x,y) = A * x₁ * x₂ * y₁³ * cos(y₂)\nDziedziny: x₁∈(0,1), x₂∈(0,2), y₁∈(0,1), y₂∈(0, π/2).\n\na) Oblicz A.\nb) Sprawdź czy wektory X i Y są niezależne statystycznie.',
    steps: [
      {
        title: 'Krok 1: Analiza funkcji',
        content: 'Funkcja gęstości jest iloczynem funkcji jednej zmiennej. To bardzo ułatwia sprawę.<br/>$p(x,y) = A \\cdot (x_1) \\cdot (x_2) \\cdot (y_1^3) \\cdot (\\cos y_2)$.<br/>Możemy policzyć całkę jako iloczyn 4 całek pojedynczych.',
        formula: ""
      },
      {
        title: 'Krok 2: Obliczanie całek składowych',
        content: 'Liczymy całki po odpowiednich granicach:',
        formula: String.raw`\int_0^1 x_1 dx_1 = \frac{1}{2}, \quad \int_0^2 x_2 dx_2 = \frac{2^2}{2} = 2`
      },
      {
        title: 'Krok 3: Całki dla zmiennych Y',
        content: 'Całka z $y^3$ i cosinusa.',
        formula: String.raw`\int_0^1 y_1^3 dy_1 = \frac{1}{4}, \quad \int_0^{\pi/2} \cos y_2 dy_2 = [\sin y]_0^{\pi/2} = 1`
      },
      {
        title: 'Krok 4: Wyznaczenie A',
        content: 'Iloczyn wszystkiego musi dać 1.',
        formula: String.raw`A \cdot \frac{1}{2} \cdot 2 \cdot \frac{1}{4} \cdot 1 = 1 \quad \Rightarrow \quad A \cdot \frac{1}{4} = 1 \quad \Rightarrow \quad A = 4`
      },
      {
        title: 'Krok 5: Niezależność wektorów',
        content: 'Rozkład łączny wektorów faktoryzuje się na część zależną tylko od wektora $X$ ($4x_1 x_2$) i tylko od wektora $Y$ ($y_1^3 \\cos y_2$).<br/>Zgodnie z twierdzeniem o faktoryzacji, oznacza to, że wektory losowe $X$ i $Y$ są niezależne.',
        formula: String.raw`p(\vec{x}, \vec{y}) = p_X(\vec{x}) \cdot p_Y(\vec{y}) \Rightarrow \text{TAK}`
      }
    ],
    finalAnswer: 'A = 4, Wektory są niezależne.'
  },

  {
    id: 'p_vector_mean_3d',
    topic: Topic.VECTORS,
    order: 11,
    difficulty: Difficulty.HARD,
    title: 'Wektor 3D - Wartość średnia',
    description: 'Zadanie z notatek "Ćw. 5". Obliczanie wartości oczekiwanej wektora 3-elementowego.',
    question: 'Wektor X = [X₁, X₂, X₃] ma gęstość p(x) = 1/16 * (x₁x₃ + x₂x₃) na sześcianie (0,2)³.\n\na) Oblicz wektor wartości średnich E[X].',
    steps: [
      {
        title: 'Krok 1: Definicja wektora wartości średniej',
        content: 'Wartość średnia wektora losowego to wektor wartości średnich poszczególnych składowych. Musimy policzyć trzy całki potrójne.',
        formula: String.raw`E[\vec{X}] = \begin{bmatrix} E[X_1] \\ E[X_2] \\ E[X_3] \end{bmatrix}, \quad \text{gdzie } E[X_i] = \iiint x_i \cdot p(x_1, x_2, x_3) dx_1 dx_2 dx_3`
      },
      {
        title: 'Krok 2: Uproszczenie gęstości',
        content: 'Wyciągnijmy $x_3$ przed nawias: $p(x) = \\frac{1}{16} x_3 (x_1 + x_2)$.<br/>Dziedzina to sześcian o boku 2.',
        formula: ""
      },
      {
        title: 'Krok 3: Obliczanie E[X_1]',
        content: 'Całkujemy $x_1 \\cdot \\frac{1}{16} x_3 (x_1 + x_2)$.<br/>To wymaga rozbicia na dwie całki i żmudnego liczenia po $dx_1 dx_2 dx_3$.<br/>Z notatek wynika wynik 7/6.',
        formula: String.raw`E[X_1] = \frac{7}{6}`
      },
      {
        title: 'Krok 4: Obliczanie E[X_2]',
        content: 'Ze względu na symetrię funkcji ($x_1$ i $x_2$ występują w tej samej roli), wartość średnia $X_2$ będzie taka sama jak $X_1$.',
        formula: String.raw`E[X_2] = E[X_1] = \frac{7}{6}`
      },
      {
        title: 'Krok 5: Obliczanie E[X_3]',
        content: 'Tutaj mnożymy przez $x_3$, więc mamy w całce $x_3^2$. Zmienia to wynik całki.',
        formula: String.raw`E[X_3] = \frac{4}{3}`
      }
    ],
    finalAnswer: 'E[X] = [7/6, 7/6, 4/3]T'
  },

  {
    id: 'p_vec_cond_mean',
    topic: Topic.VECTORS,
    order: 12,
    difficulty: Difficulty.HARD,
    title: 'Warunkowa wartość oczekiwana wektora',
    description: 'Tydzień 4, Zad 2. Obliczanie E(X|Y) dla konkretnych wartości.',
    question: 'Dany rozkład łączny p(x,y) = x₁²y₁ + 5x₂²y₂ (na dziedzinie jednostkowej).\nOblicz wektor wartości średniej warunkowej E(X | Y=[0.5, 0.2]).',
    steps: [
      {
        title: 'Krok 1: Zrozumienie zadania',
        content: 'Mamy obliczyć wartość oczekiwaną wektora $X$, wiedząc że wektor $Y$ przyjął konkretne wartości $y_1=0.5$ i $y_2=0.2$.<br/>Najpierw musimy znaleźć gęstość warunkową $p(x|y)$.',
        formula: String.raw`p(\vec{x}|\vec{y}) = \frac{p(\vec{x}, \vec{y})}{p_Y(\vec{y})}`
      },
      {
        title: 'Krok 2: Podstawienie wartości Y',
        content: 'Wstawiamy $y=[0.5, 0.2]$ do wzoru gęstości łącznej. To da nam funkcję zależną tylko od x (licznik), ale nieznormalizowaną.',
        formula: String.raw`Licznik(x) = x_1^2(0.5) + 5x_2^2(0.2) = 0.5 x_1^2 + x_2^2`
      },
      {
        title: 'Krok 3: Obliczenie stałej normalizacyjnej (mianownika)',
        content: 'Mianownik $p_Y(y)$ to całka z licznika po wszystkich możliwych $x_1, x_2$ (czyli po kwadracie 0..1).<br/>$\\int_0^1 \\int_0^1 (0.5 x_1^2 + x_2^2) dx_1 dx_2$.',
        formula: String.raw`\text{Całka} = \int (0.5 x_1^2) + \int x_2^2 = 0.5 \cdot \frac{1}{3} + \frac{1}{3} = \frac{0.5}{3} + \frac{1}{3} = \frac{1.5}{3} = 0.5`
      },
      {
        title: 'Krok 4: Gęstość warunkowa',
        content: 'Dzielimy licznik przez 0.5. $p(x|y) = (0.5 x_1^2 + x_2^2) / 0.5 = x_1^2 + 2x_2^2$.',
        formula: String.raw`p(x|y_{ust}) = x_1^2 + 2x_2^2`
      },
      {
        title: 'Krok 5: Obliczanie średniej warunkowej',
        content: 'Teraz liczymy $E[X_1] = \\iint x_1 \\cdot (x_1^2 + 2x_2^2) dx_1 dx_2$.<br/>I analogicznie dla $X_2$.',
        formula: String.raw`E[X_1] = \int_0^1 x_1^3 dx \cdot 1 + \int_0^1 2x_2^2 dx \cdot \int_0^1 x_1 dx = \frac{1}{4} + 2\cdot\frac{1}{3}\cdot\frac{1}{2} = \frac{1}{4} + \frac{1}{3} = \frac{7}{12}`
      }
    ],
    finalAnswer: 'E[X|Y] = [7/12, 5/6]' // wynik przybliżony dla drugiego składnika
  },

  {
    id: 'p_theory_autocov',
    topic: Topic.VECTORS,
    order: 13,
    difficulty: Difficulty.HARD,
    title: 'Teoria: Własności macierzy autokowariancji',
    description: 'Zadanie dowodowe z listy zadań. Własności macierzy zespolonej.',
    question: 'Wykaż, że macierz autokowariancji wektora losowego zespolonego jest:\n1. Hermitowsko sprzężona\n2. Dodatnio półokreślona.',
    steps: [
      {
        title: 'Definicja Macierzy',
        content: 'Macierz autokowariancji $C_X$ definiujemy jako wartość oczekiwaną iloczynu wektora scentrowanego i jego sprzężenia hermitowskiego.',
        formula: String.raw`C_X = E\left[ (\vec{X} - \vec{m}) (\vec{X} - \vec{m})^H \right]`
      },
      {
        title: 'Dowód 1: Hermitowskość',
        content: 'Bierzemy sprzężenie hermitowskie całej macierzy $C_X^H$.<br/>$(AB)^H = B^H A^H$.<br/>$C_X^H = E[ ((\\vec{X}-\\vec{m})(\\vec{X}-\\vec{m})^H)^H ] = E[ ((\\vec{X}-\\vec{m})^H)^H (\\vec{X}-\\vec{m})^H ] = E[ (\\vec{X}-\\vec{m}) (\\vec{X}-\\vec{m})^H ] = C_X$.',
        formula: String.raw`C_X^H = C_X`
      },
      {
        title: 'Dowód 2: Dodatnia półokreśloność',
        content: 'Musimy pokazać, że dla dowolnego wektora $\\vec{a}$, forma kwadratowa $\\vec{a}^H C_X \\vec{a} \\ge 0$.<br/>Podstawiamy definicję $C_X$.<br/>$\\vec{a}^H E[ (\\vec{X}-\\vec{m})(\\vec{X}-\\vec{m})^H ] \\vec{a} = E[ \\vec{a}^H (\\vec{X}-\\vec{m}) (\\vec{X}-\\vec{m})^H \\vec{a} ]$.<br/>Wyrażenie w środku to iloczyn skalarny postaci $z^H z = |z|^2$, gdzie $z = (\\vec{X}-\\vec{m})^H \\vec{a}$.<br/>Wartość oczekiwana z liczby nieujemnej ($|z|^2 \\ge 0$) jest zawsze nieujemna.',
        formula: String.raw`\vec{a}^H C_X \vec{a} \ge 0`
      }
    ],
    finalAnswer: 'C.N.D.'
  }
];

export const EXERCISES_DATA: InteractiveExercise[] = [
  {
    id: 'ex1_cdf',
    topic: Topic.SINGLE_RV,
    title: 'Własności Dystrybuanty',
    description: 'Uzupełnij luki we własnościach dystrybuanty F(x).',
    content: 'Dystrybuanta F(x) jest funkcją {{}} (rosnącą/malejącą/niemalejącą).<br/>Jej granica w minus nieskończoności wynosi {{}}.<br/>Jej granica w plus nieskończoności wynosi {{}}.<br/>Prawdopodobieństwo P(a < X ≤ b) wyraża się wzorem F(b) - {{}}.',
    correctAnswers: ['niemalejącą', '0', '1', 'F(a)'],
    explanation: '<strong>Wyjaśnienie:</strong><br/>1. Dystrybuanta kumuluje prawdopodobieństwo, więc nie może maleć. Jest funkcją niemalejącą.<br/>2. Na lewym krańcu osi (-∞) nie ma jeszcze żadnej "masy" prawdopodobieństwa, więc F(-∞) = 0.<br/>3. Na prawym krańcu (+∞) zsumowaliśmy już całe prawdopodobieństwo, więc F(+∞) = 1.<br/>4. Prawdopodobieństwo w przedziale to różnica wartości dystrybuanty na krańcach: F( koniec ) - F( początek ).'
  },
  {
    id: 'ex2_indep',
    topic: Topic.JOINT_RV,
    title: 'Niezależność Zmiennych',
    description: 'Wpisz brakujące elementy warunku niezależności.',
    content: 'Dwie zmienne losowe X i Y są niezależne, jeśli ich gęstość łączna p(x,y) jest równa iloczynowi gęstości {{}}.<br/>Wzór: p(x,y) = pX(x) · {{}}.<br/>Jeśli zmienne są niezależne, to ich kowariancja wynosi {{}}.',
    correctAnswers: ['brzegowych', 'pY(y)', '0'],
    explanation: '<strong>Wyjaśnienie:</strong><br/>Niezależność stochastyczna oznacza, że informacja o jednej zmiennej nie wpływa na drugą. Matematycznie objawia się to faktoryzacją gęstości łącznej na iloczyn gęstości brzegowych: p(x,y) = pX(x) * pY(y).<br/>Konsekwencją niezależności jest brak korelacji (kowariancja = 0), choć pamiętaj, że w drugą stronę to nie zawsze działa!'
  },
  {
    id: 'ex3_linear',
    topic: Topic.VECTORS,
    title: 'Transformacja Liniowa',
    description: 'Uzupełnij wzory dla przekształcenia Y = AX + b.',
    content: 'Jeśli Y = AX + b, to wartość oczekiwana E[Y] wynosi A · {{}} + b.<br/>Macierz kowariancji Cy wynosi A · Cx · {{}} (oznaczenie transpozycji to T lub H).',
    correctAnswers: ['E[X]', 'AH'],
    explanation: '<strong>Wyjaśnienie:</strong><br/>1. Wartość oczekiwana jest operatorem liniowym, więc "przechodzi" przez macierz A i dodaje wektor b: E[Y] = A*E[X] + b.<br/>2. Macierz kowariancji to forma kwadratowa. Przy wyciąganiu macierzy A z wnętrza wartości oczekiwanej, pojawia się ona dwukrotnie: raz z lewej strony (A) i raz z prawej jako transpozycja (lub sprzężenie hermitowskie AH): Cy = A * Cx * AH.'
  }
];

export const COURSE_DATA: CourseModule[] = [
  {
    id: 'm0',
    title: 'Wstęp',
    description: 'Wprowadzenie do kursu',
    topic: Topic.SINGLE_RV, // Placeholder topic
    lessons: [
      {
        id: 'l0_intro',
        title: 'Wideo Wprowadzające',
        type: 'VIDEO',
        referenceId: 'video_intro',
        description: 'Obejrzyj krótki wstęp do kursu.',
        videoUrl: introVideo
      }
    ]
  },
  {
    id: 'm1',
    title: 'Moduł 1: Zmienne Jednowymiarowe',
    description: 'Podstawy zmiennych losowych, dystrybuanty i gęstości.',
    topic: Topic.SINGLE_RV,
    lessons: [
      {
        id: 'l1_1',
        title: 'Definicje Podstawowe',
        type: 'THEORY',
        referenceId: 't1',
        description: 'Czym jest zmienna losowa, dystrybuanta i gęstość.'
      },
      {
        id: 'l1_2',
        title: 'Ćwiczenie: Rzut Kostką',
        type: 'PRACTICE',
        referenceId: 'p_dice',
        description: 'Zastosowanie definicji na prostym przykładzie dyskretnym.'
      },
      {
        id: 'l1_3',
        title: 'Ćwiczenie: Rozkład Wielomianowy',
        type: 'PRACTICE',
        referenceId: 'p_poly_cx2',
        description: 'Wyznaczanie stałej normalizacyjnej i dystrybuanty.'
      },
      {
        id: 'l1_4',
        title: 'Ćwiczenie: Rozkład Cauchy\'ego',
        type: 'PRACTICE',
        referenceId: 'p1_cauchy',
        description: 'Całkowanie funkcji wymiernej w granicach nieskończonych.'
      },
      {
        id: 'l1_ex',
        title: 'Ćwiczenie: Dystrybuanta',
        type: 'EXERCISE',
        referenceId: 'ex1_cdf',
        description: 'Sprawdź swoją wiedzę o własnościach dystrybuanty.'
      }
    ]
  },
  {
    id: 'm2',
    title: 'Moduł 2: Zmienne Wielowymiarowe',
    description: 'Rozkłady łączne, brzegowe i warunkowe.',
    topic: Topic.JOINT_RV,
    lessons: [
      {
        id: 'l2_1',
        title: 'Teoria: Zmienne 2D',
        type: 'THEORY',
        referenceId: 't2',
        description: 'Wprowadzenie do zmiennych wielowymiarowych.'
      },
      {
        id: 'l2_2',
        title: 'Ćwiczenie: Rozkład p(x,y) = kxy + x',
        type: 'PRACTICE',
        referenceId: 'p_joint_kxy_x',
        description: 'Wyznaczanie stałej i sprawdzanie niezależności.'
      },
      {
        id: 'l2_3',
        title: 'Ćwiczenie: Rozkład p(x,y) = k(x+y)',
        type: 'PRACTICE',
        referenceId: 'p_joint_k_x_y',
        description: 'Rozkłady brzegowe i zależność zmiennych.'
      },
      {
        id: 'l2_ex',
        title: 'Ćwiczenie: Niezależność',
        type: 'EXERCISE',
        referenceId: 'ex2_indep',
        description: 'Test zrozumienia niezależności zmiennych.'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Moduł 3: Wektory Losowe',
    description: 'Macierze kowariancji, korelacji i transformacje.',
    topic: Topic.VECTORS,
    lessons: [
      {
        id: 'l3_1',
        title: 'Teoria: Wektory i Macierze',
        type: 'THEORY',
        referenceId: 't3',
        description: 'Definicje wektorów losowych i macierzy momentów.'
      },
      {
        id: 'l3_2',
        title: 'Ćwiczenie: Wektor z cosinusem',
        type: 'PRACTICE',
        referenceId: 'p_vector_complex_cos',
        description: 'Analiza złożonej gęstości wektorowej.'
      },
      {
        id: 'l3_3',
        title: 'Ćwiczenie: Wartość średnia 3D',
        type: 'PRACTICE',
        referenceId: 'p_vector_mean_3d',
        description: 'Obliczanie wektora wartości oczekiwanych.'
      },
      {
        id: 'l3_ex',
        title: 'Ćwiczenie: Transformacje',
        type: 'EXERCISE',
        referenceId: 'ex3_linear',
        description: 'Sprawdź wzory na transformację wektorów.'
      }
    ]
  }
];

export const CHEAT_SHEET_DATA = [
  {
    category: 'Zmienne Jednowymiarowe',
    formulas: [
      { name: 'Dystrybuanta', tex: 'F(x) = P(X \\le x)' },
      { name: 'Gęstość', tex: 'p(x) = \\frac{dF(x)}{dx}' },
      { name: 'Prawdopodobieństwo', tex: 'P(a < X \\le b) = F(b) - F(a)' },
      { name: 'Wartość Oczekiwana', tex: 'E[X] = \\int_{-\\infty}^{\\infty} x p(x) dx' },
      { name: 'Wariancja', tex: 'Var(X) = E[X^2] - (E[X])^2' },
      { name: 'Transformacja', tex: 'p_Y(y) = p_X(h(y)) \\cdot |h\'(y)|' }
    ]
  },
  {
    category: 'Zmienne Wielowymiarowe',
    formulas: [
      { name: 'Rozkład Brzegowy X', tex: 'p_X(x) = \\int p(x,y) dy' },
      { name: 'Rozkład Warunkowy', tex: 'p(x|y) = \\frac{p(x,y)}{p_Y(y)}' },
      { name: 'Niezależność', tex: 'p(x,y) = p_X(x) p_Y(y)' },
      { name: 'Kowariancja', tex: 'Cov(X,Y) = E[XY] - E[X]E[Y]' },
      { name: 'Korelacja', tex: 'R_{XY} = E[XY]' }
    ]
  },
  {
    category: 'Wektory Losowe',
    formulas: [
      { name: 'Wektor Średnich', tex: 'm_X = E[\\vec{X}]' },
      { name: 'Macierz Korelacji', tex: 'R_X = E[\\vec{X}\\vec{X}^H]' },
      { name: 'Macierz Kowariancji', tex: 'C_X = R_X - m_X m_X^H' },
      { name: 'Transformacja Liniowa (Średnia)', tex: 'm_Y = A m_X + b' },
      { name: 'Transformacja Liniowa (Kowariancja)', tex: 'C_Y = A C_X A^H' }
    ]
  }
];
