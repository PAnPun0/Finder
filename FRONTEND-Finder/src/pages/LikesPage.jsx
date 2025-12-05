import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import BottomNav from '../components/BottomNav';
const MOCK_USERS = Array(6).fill({
  id: 1,
  name: 'Sulus',
  age: 18,
  distance: 9,
  photo: '/images/sulus.jpg', 
});

export default function LikesPage() {
  const [activeTab, setActiveTab] = useState('likesMe');

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-slate-900">Лайки</h1>
        
      </header>
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between gap-4">
            <TabButton 
                label="Я нравлюсь" 
                isActive={activeTab === 'likesMe'} 
                onClick={() => setActiveTab('likesMe')}
            />
            <TabButton 
                label="Мне нравятся" 
                isActive={activeTab === 'iLike'} 
                onClick={() => setActiveTab('iLike')}
            />
        </div>
      </div>

      <div className="px-3 grid grid-cols-2 gap-3">
        {MOCK_USERS.map((user, index) => (
           <LikeCard key={index} user={user} isBlurred={activeTab === 'likesMe'} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

// 1. Кнопка вкладки
const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 text-sm font-semibold rounded-2xl border transition-all duration-200 ${
      isActive 
        ? 'border-blue-500 text-blue-500 bg-white shadow-sm' 
        : 'border-transparent text-slate-500 hover:bg-slate-50'
    }`}
  >
    {label}
  </button>
);

// 2. Карточка лайка
const LikeCard = ({ user, isBlurred }) => (
  <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-slate-200 shadow-sm">
      
      {/* Фотография */}
      <img 
        src={user.photo} 
        alt={user.name} 
        className={`w-full h-full object-cover transition-all duration-500 ${
            // Если вкладка "Я нравлюсь" - размываем фото (как на дизайне)
            isBlurred ? 'blur-sm scale-110' : '' 
        }`}
      />

      {/* Затемнение снизу для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

      {/* Текст (Имя, возраст, расстояние) */}
      <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold leading-tight">
             {user.name}, {user.age}
          </h3>
          <p className="text-xs font-medium opacity-80 mt-1">
             {user.distance} km away
          </p>
      </div>
  </div>
);