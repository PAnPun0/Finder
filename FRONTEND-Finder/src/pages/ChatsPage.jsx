import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { api } from '../api';



export default function ChatsPage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const myId = localStorage.getItem('userId');
    if (myId) {
      // Используем ручку matches, как просил бэкендер
      api.getMatches(myId)
        .then((res) => setMatches(res.data))
        .catch((e) => console.error(e));
    }
  }, []);


  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-slate-900">Чаты (Мэтчи)</h1>
      </header>

      <div className="px-4">
        {matches.length === 0 ? (
            <p className="text-center text-slate-500 mt-10">Пока нет мэтчей</p>
        ) : (
            matches.map((user) => (
              <button
                key={user.id}
                onClick={() => navigate(`/chats/${user.id}`)}
                className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl border-b border-slate-50"
              >
                <img src={user.photo} className="w-14 h-14 rounded-full object-cover" alt="" />
                <div className="text-left">
                   <h3 className="font-bold text-lg text-slate-900">{user.name}</h3>
                   <p className="text-slate-500 text-sm">Нажмите, чтобы написать</p>
                </div>
              </button>
            ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}