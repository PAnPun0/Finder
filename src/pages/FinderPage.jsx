import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import BottomNav from '../components/BottomNav';
import SwipeCard from '../components/SwipeCard';
import FilterModal from '../components/FilterModal';
import { api } from '../api';


// const MOCK_USERS = [
//   {
//     id: 1,
//     name: 'Sulus',
//     age: 18,
//     distance: 9,
//     photo: "/images/sulus.jpg",
//     bio: 'Если ты здесь, то наверняка, как и я, веришь, что настоящее знакомство — это не просто свайп...',
//     tags: ['Схожи интересы', 'Музыка', 'Арт', 'Путешествия', 'Кофе', 'Спорт']
//   },
//   {
//     id: 2,
//     name: 'Алина',
//     age: 21,
//     distance: 3,
//     photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000',
//     bio: 'Люблю гулять по ночному городу и пить латте.',
//     tags: ['Танцы', 'Кино', 'Книги', 'Фотография']
//   }
// ];

export default function FinderPage() {
  const [users, setUsers] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  //const [users, setUsers] = useState(MOCK_USERS);
  const [activeAction, setActiveAction] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getFeed({ limit: 10 });
        setUsers(response.data); 
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  

  const removeCard = (id, direction) => {
    setActiveAction(direction);
    setTimeout(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setActiveAction(null);
    }, 200);
  };

   // Функция лайка теперь тоже делает запрос
  const handleSwipe = async (direction) => {
    if (users.length > 0) {
      const currentUser = users[0];
      
      // Сначала визуально убираем карту (чтобы не было задержки)
      removeCard(currentUser.id, direction);

      // А потом тихо отправляем на сервер
      try {
        if (direction === 'right') {
          await api.likeUser(currentUser.id);
        } else {
          await api.dislikeUser(currentUser.id);
        }
      } catch (e) {
        console.error("Не удалось отправить лайк", e);
      }
    }
  };

  if (isLoading) return <div className="p-10 text-center">Загрузка...</div>;


  return (
    <div className="relative h-screen bg-white font-sans overflow-hidden">
      
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
          
          {/* 1. Яркое розовое пятно (Справа сверху) */}
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-400 rounded-full blur-[130px] opacity-60" />

          {/* 2. Глубокое синее пятно (Слева снизу) - делает угол темнее */}
          <div className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[600px] bg-blue-600 rounded-full blur-[140px] opacity-60" />

          {/* 3. Светло-голубое/Бирюзовое пятно (Посередине справа) - добавляет свечения */}
          <div className="absolute top-[30%] right-[-20%] w-[500px] h-[500px] bg-sky-300 rounded-full blur-[120px] opacity-50" />

          {/* 4. Мягкое фиолетовое пятно (Слева сверху) - связывает цвета */}
          <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-300 rounded-full blur-[120px] opacity-40" />

      </div>

     
      <div className="relative z-10 flex flex-col h-full pb-20">
        
        
        <Header onOpenFilters={() => {
            setIsFilterOpen(true);
        }} />

        <div className="flex-1 w-full max-w-md mx-auto relative  items-center justify-center">
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
                  Больше никого нет
              </div>
          )}
        </div>
        <ActionButtons 
          onDislike={() => handleSwipe('left')} 
          onLike={() => handleSwipe('right')}
        />

       
        <BottomNav />
      </div>

      
      <FilterModal 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
      />

    </div>
  );
}