import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layers, Search, Heart, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const navItems = [
    { id: 'finder',  path: '/finder',  label: 'Анкеты',  icon: Layers },
    { id: 'search',  path: '/search',  label: 'Поиск',   icon: Search },
    { id: 'likes',   path: '/likes',   label: 'Лайки',   icon: Heart },
    { id: 'chats',   path: '/chats',   label: 'Чаты',    icon: MessageCircle },
    { id: 'profile', path: '/profile', label: 'Профиль', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 px-2 py-2 flex justify-between items-center pb-6 z-50">
      {navItems.map((item) => {

        const isActive = location.pathname === item.path;
        
        return (
          <button 
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex-1 flex flex-col items-center gap-1 transition-colors duration-200 ${
              isActive ? 'text-blue-500' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className="text-[15px] font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}