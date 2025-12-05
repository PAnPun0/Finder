import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput'; // Наш новый компонент

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Тут логика входа...
    navigate('/finder');
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-6 flex flex-col font-sans">
      {/* Шапка с временем (фейковая, как на скрине, или просто отступ) */}
      <div className="mt-12 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Войти в аккаунт</h1>
        <p className="text-slate-500">
          С возвращением! Готовы жестко кадрить <br /> любого встречного?
        </p>
      </div>

      {/* Форма */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="email.example@gmail.com" 
        />
        
        <AuthInput 
          label="Пароль" 
          type="password" 
          placeholder="••••••••" 
        />

        <div className="flex justify-start">
            <button type="button" className="text-blue-600 text-sm font-semibold hover:underline">
                Вы забыли пароль?
            </button>
        </div>

        <button 
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-200"
        >
            Войти
        </button>
      </form>
    </div>
  );
}