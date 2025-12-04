import React, { useState } from 'react';
// Импортируем нужные иконки
import { Layers, Search, Heart, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  // Состояние: какая вкладка сейчас активна (по умолчанию 'ankety')
  const [activeTab, setActiveTab] = useState('ankety');

  // Настройки наших кнопок
  const navItems = [
    { id: 'ankety', label: 'Анкеты', icon: Layers },
    { id: 'poisk',  label: 'Поиск',  icon: Search },
    { id: 'likes',  label: 'Лайки',  icon: Heart },
    { id: 'chats',  label: 'Чаты',   icon: MessageCircle },
    { id: 'profile', label: 'Профиль', icon: User },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-t border-slate-100 px-2 py-2 flex justify-between items-center pb-6 relative z-20">
      
      {navItems.map((item) => {
        // Проверяем, активна ли эта кнопка
        const isActive = activeTab === item.id;
        
        return (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)} // При клике меняем активную вкладку
            className={`flex-1 flex flex-col items-center gap-1 transition-colors duration-200 ${
              isActive ? 'text-vk-blue' : 'text-vk-black '
            }`}
          >
            {/* Рендерим иконку */}
            <item.icon 
              
              strokeWidth={isActive ? 2.5 : 2} // Делаем линию жирнее, если активно
            />
            
            {/* Текст под иконкой */}
            <span className="text-[15px] font-medium">
              {item.label}
            </span>
          </button>
        );
      })}

    </nav>
  );
}