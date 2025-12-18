import React, { useState, useEffect } from 'react';
import { AppView, Question, QuizConfig, UserAnswer, QuizHistory } from './types';
import { generateQuiz } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { QuizTaker } from './components/QuizTaker';
import { ResultScreen } from './components/ResultScreen';

const STORAGE_KEY = 'quiz_genius_history';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentConfig, setCurrentConfig] = useState<QuizConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<QuizHistory[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleStartQuiz = async (config: QuizConfig) => {
    setCurrentConfig(config);
    setView('generating');
    setError(null);
    try {
      const generatedQuestions = await generateQuiz(config);
      setQuestions(generatedQuestions);
      setView('taking');
    } catch (err) {
      console.error(err);
      setError("Không thể tạo bài kiểm tra. Vui lòng thử lại hoặc kiểm tra kết nối mạng.");
      setView('welcome');
    }
  };

  const handleFinishQuiz = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    
    // Calculate score and save to history
    if (currentConfig) {
      const correctCount = answers.filter(a => a.isCorrect).length;
      const score = Math.round((correctCount / questions.length) * 100);
      
      const newRecord: QuizHistory = {
        id: Date.now().toString(),
        userName: currentConfig.userName,
        userClass: currentConfig.userClass,
        topic: currentConfig.topic,
        score: score,
        totalQuestions: questions.length,
        date: new Date().toLocaleDateString('vi-VN', { 
          year: 'numeric', month: '2-digit', day: '2-digit', 
          hour: '2-digit', minute: '2-digit' 
        })
      };

      const updatedHistory = [newRecord, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    }

    setView('results');
  };

  const handleRetry = () => {
    setUserAnswers([]);
    setView('taking');
  };

  const handleHome = () => {
    setQuestions([]);
    setUserAnswers([]);
    setCurrentConfig(null);
    setView('welcome');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleHome}>
               <div className="w-8 h-8 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                 Q
               </div>
               <span className="font-bold text-xl tracking-tight text-slate-800">QuizGenius AI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-primary-600 transition-colors">Về chúng tôi</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Hướng dẫn</a>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-xs font-semibold uppercase tracking-wide">
                Phiên bản Pro
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-12">
        {error && (
          <div className="max-w-md mx-auto mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-red-500" />
             {error}
          </div>
        )}

        {view === 'welcome' && (
          <WelcomeScreen onStart={handleStartQuiz} history={history} />
        )}

        {view === 'generating' && currentConfig && (
          <LoadingScreen topic={currentConfig.topic} />
        )}

        {view === 'taking' && currentConfig && (
          <QuizTaker 
            questions={questions} 
            topic={currentConfig.topic}
            onFinish={handleFinishQuiz}
            onCancel={handleHome}
          />
        )}

        {view === 'results' && currentConfig && (
          <ResultScreen 
            questions={questions}
            answers={userAnswers}
            onRetry={handleRetry}
            onHome={handleHome}
            userName={currentConfig.userName}
            userClass={currentConfig.userClass}
          />
        )}
      </main>
      
      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200 mt-auto bg-white">
        <p>© 2024 QuizGenius AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;