import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion'; // Важно для анимации удаления
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import BottomNav from '../components/BottomNav';
import SwipeCard from '../components/SwipeCard';

// Данные (заглушка)
const MOCK_USERS = [
  {
    id: 1,
    name: 'Sulus',
    age: 18,
    distance: 9,
    photo: "/images/sulus.jpg",
    bio: 'Если ты здесь, то наверняка, как и я, веришь, что настоящее знакомство — это не просто свайп...',
    tags: ['Схожи интересы', 'Музыка', 'Арт', 'Путешествия', 'Кофе', 'Спорт']
  },
  {
    id: 2,
    name: 'Алина',
    age: 21,
    distance: 3,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000',
    bio: 'Люблю гулять по ночному городу и пить латте.',
    tags: ['Танцы', 'Кино', 'Книги', 'Фотография']
  }
];

export default function FinderPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [activeAction, setActiveAction] = useState(null); // 'left' или 'right'

  // Функция удаления карточки
  const removeCard = (id, direction) => {
    setActiveAction(direction); // Запускаем анимацию улета
    setTimeout(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setActiveAction(null); // Сбрасываем действие
    }, 200); // Ждем пока анимация начнется
  };

  const handleSwipe = (direction) => {
    if (users.length > 0) {
        removeCard(users[0].id, direction);
    }
  };

  return (
    <div className="relative h-screen bg-white flex flex-col font-sans overflow-hidden">
      
      {/* Фон (Пятна) */}
      <div className="absolute top-[-10%] right-[-20%] w-[500px] h-[500px] bg-fuchsia-300 rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute top-[20%] left-[-20%] w-[400px] h-[400px] bg-sky-200 rounded-full blur-[80px] opacity-70 pointer-events-none" />

      <Header />

      {/* ЗОНА КАРТОЧЕК */}
      <div className="flex-1 relative w-full max-w-md mx-auto px-2 mt-4">
        <AnimatePresence>
          {users.map((user, index) => {
            if (index === 0) {
              return (
                <SwipeCard 
                  key={user.id} 
                  user={user} 
                  onSwipe={handleSwipe}
                  activeAction={activeAction}
                />
              );
            }
            return null;
          })}
        </AnimatePresence>
        
        {/* Если карточки кончились */}
        {users.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                Больше никого нет :(
            </div>
        )}
      </div>

      {/* Кнопки действий: передаем им функции управления */}
      {/* Важно: В ActionButtons нужно добавить onClick пропсы */}
      <ActionButtons 
        onDislike={() => handleSwipe('left')} 
        onLike={() => handleSwipe('right')}
      />

      <BottomNav />
    </div>
  );
}