import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import BottomNav from '../components/BottomNav';

// Временные данные для списка чатов
const MOCK_CHATS = [
  {
    id: 1,
    name: 'lol',
    lastMessage: 'Amet minim mollit non deserunt ullamco est sit ...',
    time: '19:11',
    unread: 1,
    avatar: '',
    isOnline: true,
  },
  {
    id: 2,
    name: 'Wilson',
    lastMessage: 'Привет! Как дела?',
    time: '18:30',
    unread: 0,
    avatar: '',
    isOnline: false,
  },
  {
    id: 3,  
    name: 'nigga',
    lastMessage: 'Отправила фото',
    time: 'Вчера',
    unread: 2,
    avatar: '',
    isOnline: true,
  },
];

export default function ChatsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      
      {/* Шапка */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-slate-900">Finder</h1>
        <button className="p-2 rounded-full hover:bg-slate-50">
           <Search className="w-6 h-6 text-slate-800" />
        </button>
      </header>

      {/* Список чатов */}
      <div className="px-4">
        {MOCK_CHATS.map((chat) => (
          <button
            key={chat.id}
            onClick={() => navigate(`/chats/${chat.id}`)} // Переход внутрь чата
            className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors border-b border-slate-50 last:border-0"
          >
            {/* Аватарка */}
            <div className="relative">
               <img 
                 src={chat.avatar} 
                 alt={chat.name} 
                 className="w-14 h-14 rounded-full object-cover"
               />
               {/* Зеленая точка онлайн */}
               {chat.isOnline && (
                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
               )}
            </div>

            {/* Текст */}
            <div className="flex-1 text-left overflow-hidden">
               <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{chat.name}</h3>
                  <span className="text-xs text-slate-400 font-medium">{chat.time}</span>
               </div>
               <div className="flex justify-between items-center gap-2">
                  <p className="text-slate-500 text-sm truncate pr-2">
                    {chat.lastMessage}
                  </p>
                  {/* Бейдж непрочитанных */}
                  {chat.unread > 0 && (
                    <div className="min-w-[20px] h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold px-1.5">
                       {chat.unread}
                    </div>
                  )}
               </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}