import React from 'react';
import { X, Flame, Check } from 'lucide-react';

export default function ActionButtons({ onLike, onDislike }) {
  return (
    <div className="relative z-10 px-4 pb-12">
      <div className="flex justify-between items-center gap-4">
        <button 
            onClick={onDislike}
            className="flex-1 h-16 rounded-2xl bg-[#C86B98] shadow-lg shadow-pink-200/50 flex items-center justify-center text-white hover:opacity-90 transition active:scale-95"
        >
          <X className="w-8 h-8" strokeWidth={3} />
        </button>

        
        <button className="flex-1 h-16 rounded-2xl bg-[#D6C6F3] shadow-lg shadow-purple-200/50 flex items-center justify-center text-purple-400 hover:opacity-90 transition active:scale-95">
          <Flame className="w-8 h-8" strokeWidth={3} />
        </button>

        
        <button 
            onClick={onLike}
            className="flex-1 h-16 rounded-2xl bg-[#93C5FD] shadow-lg shadow-blue-200/50 flex items-center justify-center text-blue-600 hover:opacity-90 transition active:scale-95"
        >
          <Check className="w-8 h-8" strokeWidth={3} />
        </button>

      </div>
    </div>
  );
}