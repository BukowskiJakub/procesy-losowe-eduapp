
import React, { useState } from 'react';
import { Category, Topic, TOPIC_TRANSLATIONS, DIFFICULTY_TRANSLATIONS, DIFFICULTY_COLORS } from './types';
import { PROBLEMS_DATA, THEORY_DATA } from './data';
import ProblemSolver from './components/ProblemSolver';
import MathDisplay from './components/MathDisplay';
import CourseView from './components/CourseView';

import MathWrapper from './components/MathWrapper';
import FormulaCheatSheet from './components/FormulaCheatSheet';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.PRACTICE);
  const [activeTopic, setActiveTopic] = useState<Topic | 'ALL'>('ALL');
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);

  // Filter and Sort by Order
  const filteredProblems = (activeTopic === 'ALL'
    ? PROBLEMS_DATA
    : PROBLEMS_DATA.filter(p => p.topic === activeTopic)
  ).sort((a, b) => a.order - b.order);

  const filteredTheory = activeTopic === 'ALL'
    ? THEORY_DATA
    : THEORY_DATA.filter(t => t.topic === activeTopic);

  const handleProblemSelect = (id: string) => {
    setSelectedProblemId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedProblemId(null);
  };

  const activeProblem = PROBLEMS_DATA.find(p => p.id === selectedProblemId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div
              className="cursor-pointer"
              onClick={() => {
                setActiveCategory(Category.PRACTICE);
                setSelectedProblemId(null);
              }}
            >
              <h1 className="text-2xl font-bold tracking-tight">Procesy Losowe</h1>
              <p className="text-indigo-200 text-sm">Zmienne i Wektory Losowe - Ćwiczenia</p>
            </div>

            <div className="flex bg-indigo-800/50 p-1 rounded-lg">
              <button
                onClick={() => {
                  setActiveCategory(Category.PRACTICE);
                  setSelectedProblemId(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === Category.PRACTICE ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:bg-indigo-700'}`}
              >
                Zadania
              </button>
              <button
                onClick={() => {
                  setActiveCategory(Category.THEORY);
                  setSelectedProblemId(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === Category.THEORY ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:bg-indigo-700'}`}
              >
                Teoria
              </button>
              <button
                onClick={() => {
                  setActiveCategory(Category.COURSE);
                  setSelectedProblemId(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === Category.COURSE ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:bg-indigo-700'}`}
              >
                Kurs
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters - Only show if no problem is selected */}
      {!selectedProblemId && (
        <div className="bg-white border-b border-slate-200 mb-8 sticky top-[76px] z-40 shadow-sm">
          <div className="container mx-auto px-4 py-3 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              <button
                onClick={() => setActiveTopic('ALL')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTopic === 'ALL' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Wszystkie
              </button>
              <button
                onClick={() => setActiveTopic(Topic.SINGLE_RV)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTopic === Topic.SINGLE_RV ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
              >
                {TOPIC_TRANSLATIONS[Topic.SINGLE_RV]}
              </button>
              <button
                onClick={() => setActiveTopic(Topic.JOINT_RV)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTopic === Topic.JOINT_RV ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
              >
                {TOPIC_TRANSLATIONS[Topic.JOINT_RV]}
              </button>
              <button
                onClick={() => setActiveTopic(Topic.VECTORS)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTopic === Topic.VECTORS ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
              >
                {TOPIC_TRANSLATIONS[Topic.VECTORS]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">

        {activeCategory === Category.PRACTICE && (
          <div className="max-w-4xl mx-auto">
            {selectedProblemId && activeProblem ? (
              // Single Problem View
              <ProblemSolver problem={activeProblem} onBack={handleBackToList} />
            ) : (
              // Problem List View
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Baza Zadań</h2>
                  <span className="text-sm text-slate-500">Znaleziono: {filteredProblems.length}</span>
                </div>

                {filteredProblems.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">Brak zadań w tej kategorii.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredProblems.map(problem => (
                      <div
                        key={problem.id}
                        onClick={() => handleProblemSelect(problem.id)}
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:bg-indigo-600 transition-colors" />

                        <div className="flex justify-between items-start mb-3">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <span className="inline-block px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-semibold group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors uppercase tracking-wide">
                                {TOPIC_TRANSLATIONS[problem.topic]}
                              </span>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide border ${DIFFICULTY_COLORS[problem.difficulty]}`}>
                                {DIFFICULTY_TRANSLATIONS[problem.difficulty]}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                              {problem.title}
                            </h3>
                          </div>

                          <div className="bg-slate-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">{problem.description}</p>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                          <span>Zadanie #{problem.order}</span>
                          <span>{problem.steps.length} etapów rozwiązania</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeCategory === Category.THEORY && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Materiały Teoretyczne</h2>

            <div className="grid gap-6">
              {filteredTheory.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{TOPIC_TRANSLATIONS[item.topic]}</span>
                  </div>
                  <div className="p-6 text-slate-700 leading-relaxed">
                    <MathWrapper>
                      {item.content}
                    </MathWrapper>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {
          activeCategory === Category.COURSE && (
            <CourseView onBack={() => setActiveCategory(Category.PRACTICE)} />
          )
        }

        <FormulaCheatSheet />
      </main >
    </div >
  );
}

export default App;
