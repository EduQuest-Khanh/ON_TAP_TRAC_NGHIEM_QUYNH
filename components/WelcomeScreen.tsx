import React, { useState } from 'react';
import { QuizConfig, QuizHistory } from '../types';
import { Play, BrainCircuit, User, History, GraduationCap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (config: QuizConfig) => void;
  history: QuizHistory[];
}

// ============================================================================
// CẤU HÌNH BÀI KIỂM TRA
// ============================================================================

const TOPIC_NAME = "Thế giới số & Thông tin";
const QUESTION_COUNT = 10;
const DIFFICULTY = "Medium"; 

// Chúng ta sử dụng bộ câu hỏi cố định trong service, nên sourceText ở đây 
// chỉ mang tính chất mô tả hoặc để trống.
const SOURCE_TEXT = "Chủ đề: Thế giới số, thiết bị thông minh và đánh giá chất lượng thông tin.";

// ============================================================================

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, history }) => {
  const [userName, setUserName] = useState('');
  const [userClass, setUserClass] = useState('');

  const handleStart = () => {
    if (!userName.trim() || !userClass.trim()) return;
    onStart({
      topic: TOPIC_NAME,
      sourceText: SOURCE_TEXT,
      difficulty: DIFFICULTY,
      questionCount: QUESTION_COUNT,
      userName: userName.trim(),
      userClass: userClass.trim()
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center min-h-[80vh]">
      {/* Intro Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-6 bg-white rounded-3xl shadow-xl mb-8 border border-slate-100 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <BrainCircuit className="w-16 h-16 text-primary-600 relative z-10" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          QuizGenius <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">AI</span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
          Hệ thống kiểm tra trắc nghiệm thông minh. <br/>
          Sẵn sàng để thử thách kiến thức của bạn về <span className="font-semibold text-slate-700">{TOPIC_NAME}</span>?
        </p>
      </div>

      {/* Input & Action Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-12">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Thông tin thí sinh</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Họ và tên</label>
            <div className="relative">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
              />
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Lớp</label>
            <div className="relative">
              <input
                type="text"
                value={userClass}
                onChange={(e) => setUserClass(e.target.value)}
                placeholder="Ví dụ: 12A1"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
              <GraduationCap className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!userName.trim() || !userClass.trim()}
          className="group relative w-full py-4 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          <div className="relative flex items-center justify-center gap-3">
            <Play className="w-5 h-5 fill-current" />
            BẮT ĐẦU LÀM BÀI
          </div>
        </button>

        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
          <div>
            <span className="font-bold text-slate-700 block text-base">{QUESTION_COUNT}</span>
            Câu hỏi
          </div>
          <div>
            <span className="font-bold text-slate-700 block text-base">15p</span>
            Thời gian
          </div>
          <div>
            <span className="font-bold text-slate-700 block text-base">{DIFFICULTY}</span>
            Độ khó
          </div>
        </div>
      </div>

      {/* History Table */}
      {history.length > 0 && (
        <div className="w-full max-w-3xl animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4 px-2">
            <History className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-bold text-slate-700">Lịch sử bài làm gần đây</h3>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Thí sinh</th>
                    <th className="px-6 py-3">Lớp</th>
                    <th className="px-6 py-3">Điểm số</th>
                    <th className="px-6 py-3">Kết quả</th>
                    <th className="px-6 py-3 text-right">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.slice(0, 5).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{item.userName}</td>
                      <td className="px-6 py-4 text-slate-600">{item.userClass}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.score >= 80 ? 'bg-green-100 text-green-800' :
                          item.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {Math.round((item.score / 100) * item.totalQuestions)}/{item.totalQuestions} câu đúng
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 text-xs">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};