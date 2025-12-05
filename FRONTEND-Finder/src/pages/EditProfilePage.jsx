import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, ChevronDown, 
  Globe, Music, Gamepad2, Palette, Dumbbell, Plane, Camera, Coffee 
} from 'lucide-react';
import { api } from '../api';

const INTERESTS_OPTIONS = [
  { id: 'it', label: 'IT', icon: Globe },
  { id: 'music', label: 'Музыка', icon: Music },
  { id: 'games', label: 'Разработка игр', icon: Gamepad2 },
  { id: 'sport', label: 'Спорт', icon: Dumbbell },
  { id: 'art', label: 'Искусство', icon: Palette },
  { id: 'travel', label: 'Путешествия', icon: Plane },
  { id: 'photo', label: 'Фотография', icon: Camera },
  { id: 'food', label: 'Еда', icon: Coffee },
];

export default function EditProfilePage() {
  const navigate = useNavigate();
  const myId = localStorage.getItem('userId');

  const [form, setForm] = useState({
    bio: '',
    education: '',
    work: '',
    tags: []
  });

  // 1. Загружаем текущие данные при открытии
  useEffect(() => {
    if (myId) {
      api.getUser(myId).then((res) => {
        const user = res.data;
        // Заполняем форму нашими "чистыми" данными
        setForm({
            bio: user.bio || '',
            education: user.education || '',
            work: user.job || '', // В маппере мы сделали job
            tags: user.tags || [] // Массив строк ["IT", "Music"]
        });
      });
    }
  }, [myId]);

  // 2. Функция сохранения (PUT запрос)
  const handleSave = async () => {
    try {
      await api.updateUser(myId, form); // Отправляем обновленный объект
      navigate('/profile');
    } catch (e) {
      console.error("Ошибка обновления:", e);
      alert("Не удалось сохранить");
    }
  };

    // Хелпер для изменения полей
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };



  // 2. Состояния (State)
  // Для образования (храним выбранную строку)
  const [education, setEducation] = useState('');
  
  // Для интересов (храним массив ID выбранных интересов)
  const [selectedTags, setSelectedTags] = useState(['it', 'games']); 

  // Логика выбора интереса
  const toggleTag = (id) => {
    if (selectedTags.includes(id)) {
      // Если уже выбран -> убираем из массива
      setSelectedTags(selectedTags.filter(tagId => tagId !== id));
    } else {
      // Если не выбран -> добавляем (с ограничением, например, макс 5)
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, id]);
      } else {
        alert("Можно выбрать максимум 5 интересов");
      }
    }
  };


  return (
    <div className="min-h-screen bg-white pb-10 font-sans">
      
      {/* Шапка */}
      <div className="px-6 pt-12 pb-4 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-10 border-b border-slate-50">
        <h1 className="text-3xl font-bold text-slate-900">Анкета</h1>
        <button 
          onClick={handleSave} 
          className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
        >
          <Check className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 mt-4 space-y-8">
        
        {/* Блок: О себе */}
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">О себе</h2>
            <textarea 
                className="w-full bg-slate-100 rounded-2xl p-4 h-32 outline-none"
                value={form.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
            />

            <textarea 
                className="w-full bg-slate-100 rounded-2xl p-4 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                placeholder="Расскажите о себе"
                defaultValue="Yeah"
            />
        </section>

        {/* Блок: Образование (Выпадающий список) */}
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Образование</h2>
            <p className="text-xs text-slate-500 mb-4">Где вы учитесь или учились?</p>
            
            <div className="relative">
                {/* Нативный select, стилизованный под дизайн */}
                <select 
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full bg-slate-100 rounded-2xl p-4 text-slate-800 font-medium outline-none appearance-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value="" disabled>Не выбрано</option>
                    <option value="СВФУ">СВФУ</option>
                    <option value="ТГУ">ТГУ</option>
                    <option value="ТПУ">ТПУ</option>
                    <option value="Работа">Работа</option>
                </select>
                
                {/* Иконка стрелочки (абсолютно позиционирована) */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>
        </section>

        {/* Блок: Интересы (Интерактивные теги) */}
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Интересы</h2>
            <p className="text-xs text-slate-500 mb-4">
                Выберите интересы (выбрано: {selectedTags.length}/5)
            </p>
            
            <div className="flex flex-wrap gap-3">
                {INTERESTS_OPTIONS.map((item) => {
                    const isSelected = selectedTags.includes(item.id);
                    return (
                        <Tag 
                            key={item.id}
                            icon={item.icon} 
                            label={item.label} 
                            isSelected={isSelected}
                            onClick={() => toggleTag(item.id)}
                        />
                    );
                })}
            </div>
        </section>

        {/* Блок: Работа */}
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Работа</h2>
            <p className="text-xs text-slate-500 mb-4">Кем вы работаете?</p>
            <input 
                type="text"
                className="w-full bg-slate-100 rounded-2xl p-4 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Например: Дизайнер"
            />
        </section>

      </div>
    </div>
  );
}

// Компонент Тега
const Tag = ({ icon: Icon, label, isSelected, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-200 active:scale-95 border-2 ${
        isSelected 
        ? 'bg-blue-50 border-blue-200 shadow-sm' // Стиль выбранного
        : 'bg-slate-100 border-transparent hover:bg-slate-200' // Стиль обычного
    }`}
  >
    {Icon && (
        <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-500' : 'text-slate-500'}`} />
    )}
    <span className={`font-semibold text-sm ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
        {label}
    </span>
  </button>
);