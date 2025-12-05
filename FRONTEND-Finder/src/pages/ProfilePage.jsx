import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPen, Zap, Flame, Send, User } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import AuroraBackground from '../components/AuroraBackground';
import { api } from '../api';

// Хелпер для форматирования даты из Go (ISO string)
const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const myId = localStorage.getItem('userId');

  // Состояния
  const [profile, setProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Состояния для нового комментария
  const [newCommentText, setNewCommentText] = useState('');
  const [isAnonInput, setIsAnonInput] = useState(false);

  // 1. ЗАГРУЗКА ДАННЫХ
  const loadData = async () => {
    if (!myId) return;
    try {
      setIsLoading(true);
      
      // Параллельно загружаем профиль и стену
      const [userRes, commentsRes] = await Promise.all([
        api.getUser(myId),
        // Предполагаем, что есть такой метод в api (мы его добавляли ранее)
        // Если нет - добавь в api.js: getWallComments: (id) => $api.get(`/user/${id}/comments`)
        api.getWallComments(myId).catch(() => ({ data: [] })) // Если стена пустая, не падаем
      ]);

      setProfile(userRes.data);
      setComments(commentsRes.data || []);
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [myId]);

  // 2. ОТПРАВКА КОММЕНТАРИЯ
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      // Отправляем на бэк
      await api.postWallComment(myId, {
        Text: newCommentText,
        IsAnon: isAnonInput
      });

      // Очищаем поле
      setNewCommentText('');
      
      // Перезагружаем комментарии (или можно добавить в массив вручную для скорости)
      // Для простоты перезагрузим список:
      const res = await api.getWallComments(myId);
      setComments(res.data);

    } catch (error) {
      console.error("Ошибка отправки коммента:", error);
      alert("Не удалось отправить комментарий");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!profile) return <div>Ошибка загрузки профиля</div>;

  return (
    <div className="relative min-h-screen font-sans pb-24 overflow-hidden">
      
      {/* Фон */}
      <AuroraBackground />

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Шапка */}
        <header className="w-full px-6 pt-12 pb-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-900">Профиль</h1>
            <button onClick={() => navigate('/profile/edit')} className="p-2 bg-white/50 rounded-full hover:bg-white transition">
                <UserPen className="w-6 h-6 text-slate-800" />
            </button>
        </header>

        {/* Аватарка и Инфо */}
        <div className="px-4 mt-2 flex flex-col items-center text-center">
            <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-purple-400 to-blue-400 shadow-xl">
                    <img 
                        src={profile.photo || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300'} 
                        alt="Avatar" 
                        className="w-full h-full rounded-full object-cover border-4 border-white bg-white"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
                {profile.name}, {profile.age}
            </h2>
            {profile.bio && (
              <p className="text-slate-600 mt-2 max-w-xs text-sm leading-relaxed">
                {profile.bio}
              </p>
            )}
        </div>

        {/* Кнопки действий (Статика) */}
        <div className="w-full px-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                        <Flame className="w-6 h-6 fill-white" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Суперлайк 0</div>
                </div>

                <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 to-red-400 flex items-center justify-center text-white shadow-lg shadow-orange-200">
                        <Zap className="w-6 h-6 fill-white" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Внимание 0</div>
                </div>
            </div>
        </div>

        {/* --- СТЕНА --- */}
        <div className="w-full px-4 mt-8">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">Стена</h3>
            
            {/* 1. Форма отправки */}
            <form onSubmit={handlePostComment} className="mb-4 bg-white/60 backdrop-blur-md rounded-[24px] p-2 border border-white/50 shadow-sm flex items-center gap-2">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Написать на стене..."
                        className="w-full bg-transparent pl-4 pr-2 py-3 outline-none text-slate-800 placeholder:text-slate-500 text-sm"
                    />
                </div>
                
                {/* Тоггл Анонимности */}
                <button 
                    type="button"
                    onClick={() => setIsAnonInput(!isAnonInput)}
                    className={`p-2 rounded-full transition ${isAnonInput ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-500'}`}
                    title="Анонимно?"
                >
                    <User size={20} />
                </button>

                {/* Кнопка Отправить */}
                <button 
                    type="submit" 
                    disabled={!newCommentText.trim()}
                    className="p-3 bg-blue-600 rounded-2xl text-white hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    <Send size={18} />
                </button>
            </form>

            {/* 2. Список комментариев */}
            <div className="bg-white/40 backdrop-blur-xl rounded-[32px] px-2 py-1 border border-white/40 shadow-sm min-h-[100px]">
                
                {comments.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-sm">
                        Здесь пока пусто. Напишите первым!
                    </div>
                ) : (
                    comments.map((comment, index) => (
                        <div 
                            key={comment.ID || index} 
                            className={`flex gap-3 p-4 ${index !== comments.length - 1 ? 'border-b border-white/30' : ''}`}
                        >
                            {/* Аватарка автора */}
                            <div className="flex-shrink-0">
                                {comment.isAnon ? (
                                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white shadow-sm flex items-center justify-center">
                                        <UserSecret className="text-white w-5 h-5" />
                                    </div>
                                ) : (
                                    <img 
                                        // Если бэкенд не присылает фото автора, ставим заглушку
                                        src={comment.AuthorPhoto || 'https://via.placeholder.com/150'} 
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                        alt="User"
                                    />
                                )}
                            </div>

                            {/* Текст */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className={`font-bold text-sm truncate ${comment.isAnon ? 'text-green-600' : 'text-slate-900'}`}>
                                        {comment.isAnon ? 'Анонимный вопрос' : (comment.AuthorName || 'Пользователь')}
                                    </h4>
                                    <span className="text-[10px] text-slate-500 font-medium">
                                        {formatDate(comment.CreatedAt)}
                                    </span>
                                </div>
                                <p className="text-slate-800 text-sm leading-relaxed break-words">
                                    {comment.Text}
                                </p>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}