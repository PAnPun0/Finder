import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Логика регистрации...
    navigate('/finder');
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-6 flex flex-col font-sans">
      <div className="mt-12 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Регистрация</h1>
        <p className="text-slate-500">
          Создайте новый аккаунт, если Вы у нас <br /> впервые!
        </p>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="email.example@gmail.com" 
        />
        
        <AuthInput 
          label="Повторите email" 
          type="email" 
          placeholder="email.example@gmail.com" 
        />

        <AuthInput 
          label="Пароль" 
          type="password" 
          placeholder="••••••••" 
        />
        
        <AuthInput 
          label="Повторите пароль" 
          type="password" 
          placeholder="••••••••" 
        />

        <button 
            type="submit"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-200"
        >
            Зарегистрироваться
        </button>
      </form>
    </div>
  );
}