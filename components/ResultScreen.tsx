import React from 'react';
import { Question, UserAnswer } from '../types';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle, AlertCircle, User, GraduationCap } from 'lucide-react';

interface ResultScreenProps {
  questions: Question[];
  answers: UserAnswer[];
  onRetry: () => void;
  onHome: () => void;
  userName: string;
  userClass: string;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ questions, answers, onRetry, onHome, userName, userClass }) => {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const score = Math.round((correctCount / questions.length) * 100);
  
  let feedback = '';
  if (score === 100) feedback = 'Xuất sắc! Bạn là một chuyên gia.';
  else if (score >= 80) feedback = 'Rất tốt! Bạn nắm vững kiến thức.';
  else if (score >= 50) feedback = 'Khá tốt! Cần ôn tập thêm một chút.';
  else feedback = 'Cần cố gắng hơn! Hãy thử lại nhé.';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Score Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <User className="w-4 h-4 text-primary-200" />
                <span className="font-medium text-sm text-primary-50">{userName}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <GraduationCap className="w-4 h-4 text-primary-200" />
                <span className="font-medium text-sm text-primary-50">{userClass}</span>
              </div>
            </div>

            <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-full mb-6 ring-4 ring-white/10">
              <Trophy className="w-10 h-10 text-yellow-300" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Kết Quả Của Bạn</h2>
            <p className="text-primary-100 text-lg mb-8">{feedback}</p>
            
            <div className="text-6xl font-black tracking-tighter mb-2">
              {score}<span className="text-3xl font-normal opacity-60">/100</span>
            </div>
            <p className="text-primary-100">
              Trả lời đúng {correctCount} trên {questions.length} câu hỏi
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-white border border-slate-200 hover:border-primary-300 hover:text-primary-600 text-slate-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Làm lại bài này
          </button>
          <button
            onClick={onHome}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-500/20"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </button>
        </div>
      </div>

      {/* Detail Review */}
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-primary-500" />
        Chi tiết đáp án
      </h3>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = answers.find(a => a.questionId === question.id);
          const isCorrect = userAnswer?.isCorrect;
          const userSelectedIndex = userAnswer?.selectedOptionIndex ?? -1;

          return (
            <div key={question.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className={`p-4 border-b border-slate-100 flex justify-between items-start gap-4 ${isCorrect ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
                <div className="flex-1">
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-white border border-slate-200 text-slate-500 mb-2">
                    Câu {index + 1}
                  </span>
                  <h4 className="font-medium text-slate-800">{question.questionText}</h4>
                </div>
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                )}
              </div>
              
              <div className="p-4 space-y-2">
                {question.options.map((option, optIdx) => {
                  let optionStyle = "border-slate-100 bg-white text-slate-600";
                  let icon = null;

                  if (optIdx === question.correctAnswerIndex) {
                    optionStyle = "border-green-200 bg-green-50 text-green-800 font-medium";
                    icon = <CheckCircle className="w-4 h-4 text-green-600" />;
                  } else if (optIdx === userSelectedIndex && !isCorrect) {
                    optionStyle = "border-red-200 bg-red-50 text-red-800";
                    icon = <XCircle className="w-4 h-4 text-red-600" />;
                  }

                  return (
                    <div key={optIdx} className={`p-3 rounded-lg border flex items-center justify-between text-sm ${optionStyle}`}>
                      <span>
                        <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                        {option}
                      </span>
                      {icon}
                    </div>
                  );
                })}
              </div>
              
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-sm text-slate-600">
                <span className="font-semibold text-slate-700">Giải thích: </span>
                {question.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};