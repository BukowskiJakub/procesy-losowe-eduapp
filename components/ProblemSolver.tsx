
import React, { useState, useEffect } from 'react';
import { Problem, TOPIC_TRANSLATIONS } from '../types';
import MathDisplay from './MathDisplay';

interface ProblemSolverProps {
  problem: Problem;
  onBack: () => void;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ problem, onBack }) => {
  const [activeStep, setActiveStep] = useState<number>(-1); // -1 means only question is visible

  // Trigger MathJax typesetting whenever the active step changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.MathJax && window.MathJax.typesetPromise) {
      // We use a small timeout to ensure the DOM has updated
      setTimeout(() => {
        window.MathJax.typesetPromise().catch((err: Error) => console.warn('MathJax typeset failed', err));
      }, 50);
    }
  }, [activeStep, problem]);

  const handleNextStep = () => {
    if (activeStep < problem.steps.length) {
      setActiveStep(prev => prev + 1);
      // Slight delay to allow rendering before scrolling
      setTimeout(() => {
        const element = document.getElementById(`step-${activeStep + 1}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
           window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const reset = () => setActiveStep(-1);

  const isComplete = activeStep === problem.steps.length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[60vh] flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <button 
          onClick={onBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-4 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Powrót do listy zadań
        </button>

        <div className="flex justify-between items-start">
          <div>
             <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-3 uppercase tracking-wide">
              {TOPIC_TRANSLATIONS[problem.topic]}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{problem.title}</h3>
            <p className="text-slate-600">{problem.description}</p>
          </div>
          <button 
            onClick={reset}
            className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50"
            title="Zacznij od nowa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        {/* Question Box */}
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-8 shadow-sm">
          <strong className="block text-indigo-900 text-xs uppercase tracking-wide mb-2 font-bold">Treść Zadania</strong>
          <p className="text-lg md:text-xl font-serif text-slate-800 leading-relaxed whitespace-pre-line">{problem.question}</p>
        </div>

        {/* Steps Container */}
        <div className="space-y-8 flex-grow">
          {problem.steps.map((step, index) => {
            if (index > activeStep) return null;
            
            return (
              <div id={`step-${index}`} key={index} className="relative pl-8 md:pl-0 animate-[fadeIn_0.4s_ease-out]">
                {/* Connector Line */}
                {index < activeStep && (
                  <div className="absolute left-4 md:left-[2rem] top-12 bottom-[-2rem] w-0.5 bg-indigo-100 md:hidden" />
                )}
                
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-200 transition-colors">
                   <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-sm">
                        {index + 1}
                      </div>
                      <h4 className="font-bold text-slate-800">{step.title}</h4>
                   </div>
                   <div className="p-5">
                      <div className="text-slate-600 mb-4 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: step.content }} />
                      {step.formula && (
                        <div className="py-2">
                           <MathDisplay formula={step.formula} />
                        </div>
                      )}
                   </div>
                </div>
              </div>
            );
          })}

          {isComplete && (
            <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm animate-[fadeIn_0.5s_ease-out]">
               <h4 className="font-bold text-green-800 mb-3 uppercase text-sm tracking-wide text-center">Odpowiedź Końcowa</h4>
               <p className="text-green-900 font-bold text-xl md:text-2xl font-serif whitespace-pre-line text-left">{problem.finalAnswer}</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons - Placed directly below content */}
        <div className="mt-8 flex justify-center">
          {!isComplete ? (
              <button
                onClick={handleNextStep}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all transform active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center"
              >
                {activeStep === -1 ? 'Rozpocznij Rozwiązywanie' : 'Pokaż Następny Krok'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
               <div className="flex items-center text-green-600 font-bold bg-green-50 px-6 py-3 rounded-full border border-green-100 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Zadanie Ukończone
               </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
