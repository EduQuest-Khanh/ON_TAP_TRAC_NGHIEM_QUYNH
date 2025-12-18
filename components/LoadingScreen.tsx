import React from 'react';
import { Loader2, FileSearch } from 'lucide-react';

interface LoadingScreenProps {
  topic: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ topic }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative z-10 bg-white p-4 rounded-full shadow-md">
           <FileSearch className="w-12 h-12 text-primary-600 animate-bounce" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-2">Đang phân tích tài liệu...</h2>
      <p className="text-slate-500 max-w-md">
        Hệ thống AI đang đọc hiểu nội dung bạn cung cấp và tạo bộ câu hỏi trắc nghiệm cho chủ đề <span className="font-semibold text-primary-600">"{topic}"</span>.
      </p>
      
      <div className="mt-8 flex gap-2 justify-center">
        <span className="w-2 h-2 bg-primary-400 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
        <span className="w-2 h-2 bg-primary-500 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
        <span className="w-2 h-2 bg-primary-600 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
      </div>
    </div>
  );
};