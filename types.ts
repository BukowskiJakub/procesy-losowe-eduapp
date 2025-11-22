
import React from 'react';

export enum Category {
  THEORY = 'THEORY',
  PRACTICE = 'PRACTICE',
  COURSE = 'COURSE'
}

export enum Topic {
  SINGLE_RV = 'SINGLE_RV', // Zmienne Losowe Jednowymiarowe
  JOINT_RV = 'JOINT_RV',   // Zmienne Losowe Wielowymiarowe (2D)
  VECTORS = 'VECTORS'      // Wektory Losowe i Macierze
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export const TOPIC_TRANSLATIONS: Record<Topic, string> = {
  [Topic.SINGLE_RV]: 'Zmienne Jednowymiarowe',
  [Topic.JOINT_RV]: 'Zmienne Wielowymiarowe',
  [Topic.VECTORS]: 'Wektory Losowe'
};

export const DIFFICULTY_TRANSLATIONS: Record<Difficulty, string> = {
  [Difficulty.EASY]: 'Łatwy',
  [Difficulty.MEDIUM]: 'Średni',
  [Difficulty.HARD]: 'Trudny'
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  [Difficulty.EASY]: 'bg-green-100 text-green-700 border-green-200',
  [Difficulty.MEDIUM]: 'bg-orange-100 text-orange-700 border-orange-200',
  [Difficulty.HARD]: 'bg-red-100 text-red-700 border-red-200'
};

export interface ProblemStep {
  title: string;
  content: string; // Can contain basic HTML/Math symbols
  formula?: string;
}

export interface Problem {
  id: string;
  topic: Topic;
  title: string;
  description: string;
  question: string;
  difficulty: Difficulty;
  order: number;
  steps: ProblemStep[];
  finalAnswer: string;
}

export interface TheoryItem {
  id: string;
  topic: Topic;
  title: string;
  content: React.ReactNode;
}

export interface InteractiveExercise {
  id: string;
  topic: Topic;
  title: string;
  description: string;
  content: string; // Text with {{}} placeholders
  correctAnswers: string[]; // Ordered list of correct answers for placeholders
  explanation: string; // Detailed explanation shown after completion
}

export interface CourseLesson {
  id: string;
  title: string;
  type: 'THEORY' | 'PRACTICE' | 'VIDEO' | 'EXERCISE';
  referenceId: string; // ID of the TheoryItem, Problem, or InteractiveExercise
  description?: string;
  videoUrl?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  topic: Topic;
  lessons: CourseLesson[];
}
