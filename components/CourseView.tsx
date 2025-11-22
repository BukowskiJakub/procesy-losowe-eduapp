import React, { useState, useEffect } from 'react';
import { CourseModule, CourseLesson, Topic, TOPIC_TRANSLATIONS } from '../types';
import { COURSE_DATA, THEORY_DATA, PROBLEMS_DATA, EXERCISES_DATA } from '../data';
import MathWrapper from './MathWrapper';
import ProblemSolver from './ProblemSolver';
import InteractiveExerciseComponent from './InteractiveExercise';

interface CourseViewProps {
    onBack: () => void;
}

export default function CourseView({ onBack }: CourseViewProps) {
    const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
    const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('course_progress');
        if (saved) {
            try {
                setCompletedLessons(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse course progress', e);
            }
        }
    }, []);

    const markLessonComplete = (lessonId: string) => {
        if (!completedLessons.includes(lessonId)) {
            const newCompleted = [...completedLessons, lessonId];
            setCompletedLessons(newCompleted);
            localStorage.setItem('course_progress', JSON.stringify(newCompleted));
        }
    };

    const activeModule = COURSE_DATA.find(m => m.id === activeModuleId);
    const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId);

    // Helper to find next lesson
    const getNextLesson = () => {
        if (!activeModule || !activeLesson) return null;
        const currentIndex = activeModule.lessons.findIndex(l => l.id === activeLessonId);
        if (currentIndex < activeModule.lessons.length - 1) {
            return activeModule.lessons[currentIndex + 1];
        }
        return null;
    };

    const getPrevLesson = () => {
        if (!activeModule || !activeLesson) return null;
        const currentIndex = activeModule.lessons.findIndex(l => l.id === activeLessonId);
        if (currentIndex > 0) {
            return activeModule.lessons[currentIndex - 1];
        }
        return null;
    };

    const handleLessonSelect = (moduleId: string, lessonId: string) => {
        setActiveModuleId(moduleId);
        setActiveLessonId(lessonId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Render Module List (Home)
    if (!activeModuleId || !activeLessonId) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Kurs Procesy Losowe</h2>
                    <p className="text-slate-600">Kompleksowa ścieżka edukacyjna od teorii do praktyki.</p>
                </div>

                <div className="grid gap-6">
                    {COURSE_DATA.map((module) => (
                        <div key={module.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-indigo-600 px-6 py-4 text-white">
                                <h3 className="text-xl font-bold">{module.title}</h3>
                                <p className="text-indigo-100 text-sm">{module.description}</p>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {module.lessons.map((lesson, index) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => handleLessonSelect(module.id, lesson.id)}
                                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-mono text-sm transition-colors ${completedLessons.includes(lesson.id)
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                                                    }`}>
                                                    {completedLessons.includes(lesson.id) ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </span>
                                                <div>
                                                    <span className="font-medium text-slate-700 group-hover:text-indigo-700 transition-colors block">
                                                        {lesson.title}
                                                    </span>
                                                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                                                        {lesson.type === 'PRACTICE' ? 'Praktyka' : lesson.type === 'EXERCISE' ? 'Ćwiczenie' : 'Teoria'}
                                                    </span>
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Render Active Lesson
    const nextLesson = getNextLesson();
    const prevLesson = getPrevLesson();

    const renderContent = () => {
        if (!activeLesson) return null;

        if (activeLesson.type === 'THEORY') {
            const theoryItem = THEORY_DATA.find(t => t.id === activeLesson.referenceId);
            if (!theoryItem) return <div>Błąd: Nie znaleziono materiału teoretycznego.</div>;

            return (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <MathWrapper>
                        {theoryItem.content}
                    </MathWrapper>
                </div>
            );
        }

        if (activeLesson.type === 'PRACTICE') {
            const problem = PROBLEMS_DATA.find(p => p.id === activeLesson.referenceId);
            if (!problem) return <div>Błąd: Nie znaleziono zadania.</div>;

            return (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <ProblemSolver problem={problem} />
                </div>
            );
        }

        if (activeLesson.type === 'VIDEO') {
            return (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                        <video
                            src={activeLesson.videoUrl}
                            controls
                            className="w-full h-full"
                        >
                            Twój przeglądarka nie obsługuje odtwarzacza wideo.
                        </video>
                    </div>
                </div>
            );
        }

        if (activeLesson.type === 'EXERCISE') {
            const exercise = EXERCISES_DATA.find(e => e.id === activeLesson.referenceId);
            if (!exercise) return <div>Błąd: Nie znaleziono ćwiczenia.</div>;

            return (
                <InteractiveExerciseComponent
                    exercise={exercise}
                    onComplete={() => markLessonComplete(activeLesson.id)}
                />
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-5xl">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => { setActiveModuleId(null); setActiveLessonId(null); }}
                    className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Powrót do listy modułów
                </button>

                <div className="text-sm text-slate-500">
                    Moduł: <span className="font-semibold text-slate-800">{activeModule?.title}</span>
                </div>
            </div>

            {/* Lesson Title */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{activeLesson?.title}</h2>
                {activeLesson?.description && <p className="text-slate-600 mt-1">{activeLesson.description}</p>}
            </div>

            {/* Content */}
            <div className="mb-8 min-h-[400px]">
                {renderContent()}
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                <button
                    onClick={() => prevLesson && setActiveLessonId(prevLesson.id)}
                    disabled={!prevLesson}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${prevLesson
                        ? 'text-indigo-600 hover:bg-indigo-50'
                        : 'text-slate-300 cursor-not-allowed'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Poprzednia lekcja
                </button>

                <button
                    onClick={() => {
                        if (activeLesson) {
                            markLessonComplete(activeLesson.id);
                        }
                        if (nextLesson) {
                            setActiveLessonId(nextLesson.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                            setActiveModuleId(null);
                            setActiveLessonId(null);
                        }
                    }}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-all"
                >
                    {nextLesson ? (
                        <>
                            Następna lekcja
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </>
                    ) : (
                        <>
                            Zakończ moduł
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
