import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Camera, MessageCircleHeart, Loader2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function BlindDatePage() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  // Функция запуска "поиска"
  const startRandomChat = () => {
    setIsSearching(true);
    
    // Имитируем поиск собеседника (2 секунды), потом кидаем в чат
    setTimeout(() => {
      setIsSearching(false);
      // Переходим в чат со специальным ID 'anon'
      navigate('/chats/anon');
    }, 2000);
  };

  return (
    <div className="relative h-screen bg-white font-sans overflow-hidden">
      
      {/* 1. ТОТ ЖЕ ФОН (Aurora) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-400 rounded-full blur-[130px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[600px] bg-blue-600 rounded-full blur-[140px] opacity-60" />
          <div className="absolute top-[30%] right-[-20%] w-[500px] h-[500px] bg-sky-300 rounded-full blur-[120px] opacity-50" />
      </div>

      {/* 2. КОНТЕНТ */}
      <div className="relative z-10 flex flex-col h-full pb-20">
        
        {/* Шапка */}
        <header className="px-6 pt-12 pb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Слепое свидание</h1>
          <button className="p-2 rounded-full hover:bg-black/5 transition">
             <SlidersHorizontal className="w-6 h-6 text-slate-800" />
          </button>
        </header>

        {/* Карточки */}
        <div className="flex-1 px-4 flex flex-col gap-4">
            
            {/* Карточка Видеочат (Неактивная / Заглушка) */}
            <div className="bg-white rounded-[32px] p-6 h-48 relative overflow-hidden shadow-sm border border-white/50 cursor-pointer hover:shadow-md transition">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Видео чат</h3>
                <p className="text-xs text-slate-500 max-w-[60%]">
                    Привычная видео чат рулетка, но с возможностью дальнейшего мэтча
                </p>
                {/* Иконка камеры справа внизу */}
                <div className="absolute bottom-[-10px] right-[-10px] text-blue-500 opacity-90 rotate-[-10deg]">
                    <Camera size={120} strokeWidth={1.5} />
                </div>
            </div>

            {/* Карточка Чат (Активная) */}
            <button 
                onClick={startRandomChat}
                disabled={isSearching}
                className="bg-white rounded-[32px] p-6 h-48 relative overflow-hidden shadow-sm border border-white/50 text-left hover:shadow-md transition active:scale-95"
            >
                {isSearching ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm z-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                        <span className="text-sm font-semibold text-blue-600">Ищем собеседника...</span>
                    </div>
                ) : null}

                <h3 className="text-lg font-bold text-slate-800 mb-2">Чат</h3>
                <p className="text-xs text-slate-500 max-w-[60%]">
                    Чат рулетка
                </p>
                
                {/* Иконка сообщения справа внизу */}
                <div className="absolute bottom-[-10px] right-[-10px] text-blue-500 opacity-90 rotate-[10deg]">
                    <MessageCircleHeart size={120} strokeWidth={1.5} />
                </div>
            </button>

        </div>

        <BottomNav />
      </div>
    </div>
  );
}