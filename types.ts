export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number; // 0-3
  explanation: string;
}

export interface QuizConfig {
  topic: string; 
  sourceText: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionCount: number;
  userName: string; // Tên người dùng
  userClass: string; // Lớp của người dùng
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface QuizHistory {
  id: string;
  userName: string;
  userClass: string;
  topic: string;
  score: number;
  totalQuestions: number;
  date: string;
}

export type AppView = 'welcome' | 'generating' | 'taking' | 'results';