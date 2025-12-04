import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MarqueeTags from './MarqueeTags';

export default function SwipeCard({ user, onSwipe, activeAction }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // -- ЛОГИКА СВАЙПА --
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      onSwipe('right');
    } else if (offset < -100 || velocity < -500) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag={isExpanded ? false : "x"} 
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      // Классы контейнера
      className={`absolute w-full h-[75vh] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing ${isExpanded ? 'z-50 h-[85vh]' : 'z-0'}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        x: activeAction === 'right' ? 500 : activeAction === 'left' ? -500 : 0, 
        opacity: 0, 
        transition: { duration: 0.2 } 
      }}
    >
      
      {/* 1. ФОТОГРАФИЯ */}
      <img 
        src={user.photo} 

        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isExpanded ? 'blur-xl scale-110 brightness-50' : ''}`}
      />

      {/* 2. ГРАДИЕНТЫ */}
      {!isExpanded && (
        <>
          {/* Верхний градиент сделали чуть темнее и больше, так как текст теперь там */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
          {/* Нижний градиент оставили для красоты */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </>
      )}


 
      <div className={`absolute inset-0 flex flex-col justify-start pt-12 p-6 text-white transition-all duration-500 ${isExpanded ? 'overflow-y-auto' : ''}`}>
        
        {/* Кликабельная зона */}
        <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer z-30">
          <div className="flex justify-between items-start">
             <div>
                <h2 className="text-4xl font-bold mb-1">{user.name}, {user.age}</h2>
                <p className="text-sm opacity-80 mb-4">{user.distance} km away</p>
             </div>
             {/* Стрелочка теперь выровнена по верху (items-start у родителя) */}
             <ChevronDown className={`w-8 h-8 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>

          <p className={`text-base leading-relaxed opacity-90 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {user.bio}
          </p>
        </div>

        {/* 5. БЕГУЩАЯ СТРОКА */}
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 1 }}
            className="mt-8 space-y-4 pb-10"
          >
             <h3 className="text-lg font-semibold text-slate-200 mb-2">Интересы</h3>
             
             {user.tags && (
               <>
                 <MarqueeTags tags={user.tags} direction="left" speed={30} />
                 <MarqueeTags tags={user.tags.slice().reverse()} direction="right" speed={25} />
               </>
             )}

             
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}