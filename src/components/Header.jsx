import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-10 px-6 pt-12 pb-2 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-vk-black tracking-tight">Finder</h1>
      <button className="p-2 rounded-full hover:bg-black/5 transition">
        <SlidersHorizontal className="w-6 h-6 text-slate-800" />
      </button>
    </header>
  );
}