import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import BottomNav from '../components/BottomNav';
import SwipeCard from '../components/SwipeCard';
import FilterModal from '../components/FilterModal';



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
  const [activeAction, setActiveAction] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const removeCard = (id, direction) => {
    setActiveAction(direction);
    setTimeout(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setActiveAction(null);
    }, 200);
  };

  const handleSwipe = (direction) => {
    if (users.length > 0) {
        removeCard(users[0].id, direction);
    }
  };

  return (
    <div className="relative h-screen bg-white font-sans overflow-hidden">
      
      {/* --- СЛОЙ 1: ФОН (z-index: 0) --- */}
      {/* Мы поместили пятна в отдельный контейнер, который лежит "на дне" */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-20%] w-[500px] h-[500px] bg-fuchsia-300 rounded-full blur-[100px] opacity-60" />
          <div className="absolute top-[20%] left-[-20%] w-[400px] h-[400px] bg-sky-200 rounded-full blur-[80px] opacity-70" />
      </div>

      {/* --- СЛОЙ 2: КОНТЕНТ (z-index: 10) --- */}
      {/* Весь интерфейс лежит в этом блоке, который явно выше фона */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Хедер */}
        <Header onOpenFilters={() => {
            console.log("Клик прошел!"); 
            setIsFilterOpen(true);
        }} />

        {/* Зона карточек */}
        <div className="flex-1 w-full max-w-md mx-auto relative flex items-center justify-center">
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
          
          {users.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  Больше никого нет :(
              </div>
          )}
        </div>

        {/* Кнопки лайков */}
        <ActionButtons 
          onDislike={() => handleSwipe('left')} 
          onLike={() => handleSwipe('right')}
        />

        {/* Нижнее меню */}
        <BottomNav />
      </div>

      {/* Модальное окно (оно само по себе имеет высокий z-index) */}
      <FilterModal 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
      />

    </div>
  );
}