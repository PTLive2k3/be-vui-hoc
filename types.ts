
export enum SubjectType {
  MATH = 'MATH',
  VIETNAMESE = 'VIETNAMESE'
}

export interface Quiz {
  question: string;
  illustration?: string; // Optional: Emoji or Image URL to display centrally
  options: string[];
  correctAnswer: number;
  speakText?: string;
  audioUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Brief description or theory
  contentAudioUrl?: string;
  quizzes: Quiz[]; // List of exercises
}

export interface Topic {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: SubjectType;
  title: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Progress {
  [lessonId: string]: {
    score: number;
    completed: boolean;
    timestamp: number;
  };
}

export interface UserProgress {
  userId: string;
  progress: Progress;
}

export type ViewState = 'HOME' | 'SUBJECT' | 'LESSON' | 'PROFILE' | 'STATS' | 'HANOI_GAME';

export interface TutorialStep {
  targetId: string; // The HTML ID of the element to highlight
  message: string; // Visual text
  position: 'top' | 'bottom' | 'left' | 'right';
  audio?: string;
  audioUrl?: string; // Optional: URL to an audio file to play when this step is shown
}
