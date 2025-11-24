import React, { useState, useEffect } from 'react';
import { InteractiveExercise } from '../types';
import MathDisplay from './MathDisplay';

interface InteractiveExerciseProps {
    exercise: InteractiveExercise;
    onComplete: () => void;
}

export default function InteractiveExerciseComponent({ exercise, onComplete }: InteractiveExerciseProps) {
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0);

    // Initialize answers array based on placeholders count
    useEffect(() => {
        const matches = exercise.content.match(/\{\{\}\}/g);
        const count = matches ? matches.length : 0;
        setUserAnswers(new Array(count).fill(''));
        setShowExplanation(false);
        setIsCorrect(false);
        setAttempts(0);
    }, [exercise]);

    const handleInputChange = (index: number, value: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[index] = value;
        setUserAnswers(newAnswers);
    };

    const checkAnswers = () => {
        setAttempts(prev => prev + 1);
        const correct = userAnswers.every((ans, i) =>
            ans.trim().toLowerCase() === exercise.correctAnswers[i].trim().toLowerCase()
        );

        if (correct) {
            setIsCorrect(true);
            setShowExplanation(true);
            onComplete();
        } else {
            setIsCorrect(false);
        }
    };

    const handleShowAnswer = () => {
        setUserAnswers(exercise.correctAnswers);
        setIsCorrect(true);
        setShowExplanation(true);
    };

    // Split content by placeholders to render inputs
    const renderContent = () => {
        const parts = exercise.content.split('{{}}');
        return (
            <div className="leading-loose text-lg">
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        <span dangerouslySetInnerHTML={{ __html: part }} />
                        {index < parts.length - 1 && (
                            <input
                                type="text"
                                value={userAnswers[index] || ''}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className={`mx-2 px-2 py-1 border-b-2 outline-none transition-colors w-32 text-center font-mono ${isCorrect
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : attempts > 0 && userAnswers[index].trim().toLowerCase() !== exercise.correctAnswers[index].trim().toLowerCase()
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-indigo-200 focus:border-indigo-500 bg-indigo-50/30'
                                    }`}
                                placeholder="..."
                                disabled={isCorrect}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800">{exercise.title}</h3>
                <p className="text-slate-600 mt-1">{exercise.description}</p>
            </div>

            <div className="p-8">
                <div className="mb-8">
                    {renderContent()}
                </div>

                {!showExplanation && (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={checkAnswers}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                Sprawdź odpowiedzi
                            </button>

                            {attempts >= 3 && (
                                <button
                                    onClick={handleShowAnswer}
                                    className="px-6 py-2 bg-amber-100 text-amber-800 border border-amber-200 rounded-lg font-medium hover:bg-amber-200 transition-colors shadow-sm"
                                >
                                    Pokaż odpowiedź
                                </button>
                            )}
                        </div>

                        {attempts > 0 && !isCorrect && (
                            <div className="text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg text-sm animate-pulse">
                                <strong>Niestety, to nie jest poprawna odpowiedź.</strong>
                                <br />
                                Spróbuj jeszcze raz. {attempts < 3 ? `(Pozostało prób do odblokowania podpowiedzi: ${3 - attempts})` : 'Możesz teraz wyświetlić poprawną odpowiedź.'}
                            </div>
                        )}
                    </div>
                )}

                {showExplanation && (
                    <div className="mt-8 animate-[fadeIn_0.5s_ease-out]">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-green-800">Świetnie! Oto wyjaśnienie:</h4>
                            </div>
                            <div className="prose prose-green max-w-none text-slate-700">
                                <div dangerouslySetInnerHTML={{ __html: exercise.explanation }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
