import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleVKLogin = () => {
    
    console.log("Логинимся через ВК...");
    
    localStorage.setItem('token', 'fake-jwt-token');
    
    navigate('/finder');
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-slate-800">Вход</h2>
        
        {/* Кнопка VK */}
        <button
          onClick={handleVKLogin}
          className="bg-[#0077FF] hover:bg-[#0066DD] text-white font-medium py-3 px-6 rounded-xl flex items-center gap-3 transition-transform active:scale-95"
        >
          {/* Иконка VK (SVG) */}
          
          Войти через ВКонтакте
        </button>
      </div>
    </div>
  );
}