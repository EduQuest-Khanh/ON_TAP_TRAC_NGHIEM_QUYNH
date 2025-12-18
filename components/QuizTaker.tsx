import React, { useState } from 'react';
import { Question, UserAnswer } from '../types';
import { CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface QuizTakerProps {
  questions: Question[];
  topic: string;
  onFinish: (answers: UserAnswer[]) => void;
  onCancel: () => void;
}

export const QuizTaker: React.FC<QuizTakerProps> = ({ questions, topic, onFinish, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionIndex: selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswerIndex
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      onFinish(newAnswers);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-1">
            Đang làm bài: {topic}
          </h2>
          <p className="text-slate-500 text-sm">
            Câu hỏi {currentIndex + 1} / {questions.length}
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="text-slate-400 hover:text-red-500 transition-colors text-sm font-medium"
        >
          Thoát
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
          {currentQuestion.questionText}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ${
                selectedOption === idx
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-slate-100 hover:border-primary-200 hover:bg-slate-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 transition-colors ${
                selectedOption === idx
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-100 text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-600'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className={`text-lg ${selectedOption === idx ? 'text-primary-900 font-medium' : 'text-slate-700'}`}>
                {option}
              </span>
              {selectedOption === idx && (
                <CheckCircle2 className="w-6 h-6 text-primary-500 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all flex items-center gap-2 transform active:scale-[0.98]"
        >
          {currentIndex === questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
