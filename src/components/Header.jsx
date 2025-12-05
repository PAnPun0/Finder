import React from 'react';
import { SlidersHorizontal } from 'lucide-react';


export default function Header({ onOpenFilters }) {
  const handleClick = () => {
    console.log('Клик');
    if (onOpenFilters) {
      onOpenFilters();
    }else {
      console.log('неа');
    }
  };
  return (
    <header className="relative z-50 px-6 pt-6 pb-2 flex justify-between items-center">
      
      <div className="flex items-center gap-2">
         {/* Лого и текст */}
         <img src="src/assets/finderLogo.svg" alt="Logo" className="w-16 h-16" />
         <h1 className="text-3xl font-bold text-vk-black tracking-tight">Finder</h1>
      </div>
      
      <button 
        onClick={onOpenFilters}
        className="p-2 rounded-full hover:bg-black/5 transition cursor-pointer"
      >
        <SlidersHorizontal className="w-6 h-6 text-slate-800" />
      </button>

    </header>
  );
}