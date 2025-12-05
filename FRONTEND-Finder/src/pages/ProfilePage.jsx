import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPen, Zap, Flame, ChevronRight, Maximize2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import AuroraBackground from '../components/AuroraBackground'; // Импортируем фон

// Данные для стены (как на скрине)
const COMMENTS = [
  {
    id: 1,
    name: 'Егоров Егор',
    date: '21.01.2012',
    text: 'Да, конченО!',
    avatar: '',
    isAnon: false,
  },
  {
    id: 2,
    name: 'Анонимный вопрос',
    date: '18.01.2012',
    text: 'Шанс баар дуо?',
    avatar: null, // Нет фото
    isAnon: true, // Флаг анонима
  },
  {
    id: 3,
    name: 'Leslie Alexander',
    date: '18.01.2012',
    text: 'Amet minim mollit non deserunt?',
    avatar: '',
    isAnon: false,
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen font-sans pb-24 overflow-hidden">
      
      <AuroraBackground />

      <div className="relative z-10 flex flex-col items-center">
        
        <header className="w-full px-6 pt-12 pb-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-900">Профиль</h1>
            <button onClick={() => navigate('/profile/edit')} className="p-2 rounded-full hover:bg-white/50 transition">
                <UserPen className="w-6 h-6 text-slate-800" />
            </button>
        </header>
        <div className="px-4 mt-2 flex flex-col items-center">
            <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-purple-400 to-blue-400 shadow-xl">
                    <img 
                        src="images/sulus.jpg" 
                        alt="Avatar" 
                        className="w-full h-full rounded-full object-cover border-4 border-white"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Егоров Егор, 18</h2>
        </div>
        <div className="w-full px-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                            <Flame className="w-7 h-7 fill-white" />
                        </div>
                    </div>
                    <div className="font-bold text-sm text-slate-900">Суперлайк 0</div>
                </div>

                <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 to-red-400 flex items-center justify-center text-white shadow-lg shadow-orange-200">
                            <Zap className="w-7 h-7 fill-white" />
                        </div>
                    </div>
                    <div className="font-bold text-sm text-slate-900">Внимание 0</div>
                </div>
            </div>
        </div>

        {/* --- СТЕНА --- */}
        <div className="w-full px-4 mt-8">
            <h3 className="text-3xl font-bold text-slate-900 text-center mb-6">Стена</h3>
            
            {/* Контейнер стены с эффектом стекла */}
            <div className="bg-white/40 backdrop-blur-xl rounded-[32px] p-2 border border-white/40 shadow-sm">
                
                {COMMENTS.map((comment, index) => (
                    <div 
                        key={comment.id} 
                        className={`flex gap-3 p-4 ${index !== COMMENTS.length - 1 ? 'border-b border-white/30' : ''}`}
                    >
                        {/* Аватарка */}
                        <div className="flex-shrink-0">
                            {comment.isAnon ? (
                                // Синий круг для анонима
                                <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                            ) : (
                                // Фото для обычного юзера
                                <img 
                                    src={comment.avatar} 
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                    alt="User"
                                />
                            )}
                        </div>

                        {/* Контент */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className={`font-bold text-sm truncate ${comment.isAnon ? 'text-green-500' : 'text-slate-900'}`}>
                                    {comment.name}
                                </h4>
                                <span className="text-xs text-slate-500 font-medium">
                                    {comment.date}
                                </span>
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed">
                                {comment.text}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}