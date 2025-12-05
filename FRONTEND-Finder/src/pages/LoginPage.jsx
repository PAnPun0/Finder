import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VKLoginButton from '../components/VKlogButton'; // Твой компонент кнопки
import { api } from '../api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const payload = searchParams.get('payload');
    
    if (payload) {
      // Отправляем код бэкендеру
      api.authVk(payload)
        .then((response) => {
          // ПРЕДПОЛАГАЕМ, что бэкенд возвращает: { token: "...", user_id: 123 }
          const { token, user_id } = response.data;
          
          if (token && user_id) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user_id); // <--- СОХРАНЯЕМ ID!
            navigate('/finder');
          } else {
            console.error("Бэкенд не вернул token или user_id");
          }
        })
        .catch((err) => {
          console.error("Ошибка входа:", err);
          // Для теста, пока нет бэка, можно раскомментировать:
          // localStorage.setItem('userId', '1');
          // navigate('/finder');
        });
    }
  }, [searchParams, navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-6 font-sans">
      <div className="text-center mb-10">
         <h1 className="text-4xl font-bold text-slate-900 mb-2">Finder</h1>
         <p className="text-slate-500">Найди свою пару</p>
      </div>
      
      {/* Только кнопка VK */}
      <VKLoginButton />
    </div>
  );
}