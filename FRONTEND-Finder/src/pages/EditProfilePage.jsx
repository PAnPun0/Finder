import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, Globe, Music, Gamepad2 } from 'lucide-react';

export default function EditProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-10 font-sans">
      
      <div className="px-6 pt-12 pb-4 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-10 border-b border-slate-50">
        <h1 className="text-3xl font-bold text-slate-900">Анкета</h1>
        <button 
          onClick={() => navigate('/profile')} 
          className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
        >
          <Check className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 mt-4 space-y-8">
        
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">О себе</h2>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Рассказ о себе увеличит рейтинг от 5% до 15% - зависит от длины текста. 
                А если заполните поля «Образование» и «Работа», добавим по 5% за каждое.
            </p>
            <textarea 
                className="w-full bg-slate-100 rounded-2xl p-4 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                placeholder="Расскажите о себе"
                defaultValue="Yeah"
            />
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Образование</h2>
            <p className="text-xs text-slate-500 mb-4">Где вы учитесь или учились?</p>
            <button className="w-full bg-slate-100 rounded-2xl p-4 flex justify-between items-center text-slate-400">
                <span>Не выбрано</span>
                <ChevronDown className="w-5 h-5" />
            </button>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Интересы</h2>
            <p className="text-xs text-slate-500 mb-4">
                Выберите интересы, чтобы найти людей с похожими увлечениями.
            </p>
            
            <div className="flex flex-wrap gap-3">
                <Tag icon={Globe} label="IT" />
                <Tag icon={Music} label="Музыка" color="pink" />
                <Tag icon={Gamepad2} label="Разработка игр" color="blue" />
                <Tag icon={Music} label="Гитара" />
            </div>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Работа</h2>
            <p className="text-xs text-slate-500 mb-4">Кем вы работаете?</p>
            <input 
                type="text"
                className="w-full bg-slate-100 rounded-2xl p-4 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="Yeah"
            />
        </section>

      </div>
    </div>
  );
}

const Tag = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-2xl hover:bg-slate-200 transition active:scale-95">
    {Icon && <Icon className="w-5 h-5 text-slate-700" />}
    <span className="font-semibold text-slate-700 text-sm">{label}</span>
  </button>
);