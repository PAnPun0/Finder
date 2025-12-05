import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/finderLogo.svg';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex flex-col font-sans">
      

      <div className="absolute top-[-15%] left-[-25%] w-[150%] h-[80%] flex gap-4 rotate-[-15deg] opacity-90 pointer-events-none">
        
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white via-50%" />

      <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10">
        <img src={logo} alt="Logo" className="w-16 h-16 mb-6" />

        <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
          Любовь находится <br /> здесь
        </h1>
        <p className="text-slate-500 mb-10 text-lg">
          Найди свою пару, общайся и <br /> встречайся.
        </p>
        <div className="flex justify-center gap-6 mb-8">
           <button className="w-12 h-12 border rounded-full flex items-center justify-center">🍎</button>
           <button className="w-12 h-12 border rounded-full flex items-center justify-center text-purple-600 font-bold">@</button>
           <button className="w-12 h-12 border rounded-full flex items-center justify-center">G</button>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition shadow-lg shadow-blue-200"
          >
            Войти
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-blue-600 font-semibold py-4 rounded-2xl transition"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
}