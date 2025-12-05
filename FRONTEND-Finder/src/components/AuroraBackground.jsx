import React from 'react';

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
      {/* Розовое пятно (Справа сверху) */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-400 rounded-full blur-[130px] opacity-60" />

      {/* Синее пятно (Слева снизу) */}
      <div className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[600px] bg-blue-600 rounded-full blur-[140px] opacity-60" />

      {/* Голубое пятно (Справа) */}
      <div className="absolute top-[30%] right-[-20%] w-[500px] h-[500px] bg-sky-300 rounded-full blur-[120px] opacity-50" />
      
      {/* Фиолетовое пятно (Слева сверху) */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-300 rounded-full blur-[120px] opacity-40" />
    </div>
  );
}