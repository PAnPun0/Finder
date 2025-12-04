import React, { useState } from 'react';
import { X, Search, SlidersHorizontal } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Обязательно импортируем стили слайдера!

// Компонент переключателя (Девушки | Парни | Все)
const SegmentedControl = ({ options, active, onChange }) => {
  return (
    <div className="bg-slate-100 p-1 rounded-xl flex text-sm font-medium relative">
      {options.map((option) => {
        const isActive = active === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2 rounded-lg text-center transition-all duration-200 z-10 ${
              isActive ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default function FilterModal({ isOpen, onClose }) {
  // Состояния фильтров
  const [interest, setInterest] = useState('girls');
  const [visibility, setVisibility] = useState('girls');
  const [ageRange, setAgeRange] = useState([14, 20]); // Мой возраст
  const [targetAge, setTargetAge] = useState([18, 22]); // Кого ищу
  const [distance, setDistance] = useState(3);

  const genderOptions = [
    { label: 'Девушки', value: 'girls' },
    { label: 'Парни', value: 'guys' },
    { label: 'Все', value: 'all' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      
      {/* 1. Затемнение фона (Blur backdrop) */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* 2. Модальное окно */}
      <div className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-slide-up h-[90vh] overflow-y-auto">
        
        {/* Шапка модалки */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                {/* Логотип (можно картинкой, можно иконкой) */}
                <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                   <Search size={18} strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Finder</h2>
            </div>
            
            {/* Кнопка закрытия (или иконка настроек как на скрине) */}
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
               <SlidersHorizontal className="w-5 h-5 text-slate-800" />
            </button>
        </div>

        <div className="space-y-6">
            
            {/* Блок 1: Мне интересны */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Мне интересны</label>
                <SegmentedControl 
                    options={genderOptions} 
                    active={interest} 
                    onChange={setInterest} 
                />
            </div>

            {/* Блок 2: Кто меня может смотреть */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Кто меня может смотреть</label>
                <SegmentedControl 
                    options={genderOptions} 
                    active={visibility} 
                    onChange={setVisibility} 
                />
            </div>

            {/* Блок 3: Возраст (Двойной слайдер) */}
            <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700">Возраст</span>
                    <span className="text-slate-900">{ageRange[0]}-{ageRange[1]}</span>
                </div>
                <Slider 
                    range 
                    min={14} 
                    max={60} 
                    value={ageRange} 
                    onChange={setAgeRange}
                    trackStyle={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', height: 6 }}
                    handleStyle={[
                        { borderColor: 'white', backgroundColor: 'white', opacity: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.2)', width: 20, height: 20, marginTop: -7 },
                        { borderColor: 'white', backgroundColor: 'white', opacity: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.2)', width: 20, height: 20, marginTop: -7 }
                    ]}
                    railStyle={{ backgroundColor: '#e2e8f0', height: 6 }}
                />
            </div>

            {/* Блок 4: Какие возрасты меня смотрят */}
            <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700">Какие возрасты меня смотрят</span>
                    <span className="text-slate-900">{targetAge[0]}-{targetAge[1]}</span>
                </div>
                <Slider 
                    range 
                    min={18} 
                    max={60} 
                    value={targetAge} 
                    onChange={setTargetAge}
                    trackStyle={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', height: 6 }}
                    handleStyle={[
                        { borderColor: 'white', backgroundColor: 'white', opacity: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.2)', width: 20, height: 20, marginTop: -7 },
                        { borderColor: 'white', backgroundColor: 'white', opacity: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.2)', width: 20, height: 20, marginTop: -7 }
                    ]}
                    railStyle={{ backgroundColor: '#e2e8f0', height: 6 }}
                />
            </div>

            {/* Блок 5: Радиус поиска (Одинарный слайдер) */}
            <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700">Радиус поиска</span>
                    <span className="text-slate-900">{distance} км</span>
                </div>
                <Slider 
                    min={1} 
                    max={100} 
                    value={distance} 
                    onChange={setDistance}
                    trackStyle={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', height: 6 }}
                    handleStyle={{ borderColor: 'white', backgroundColor: 'white', opacity: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.2)', width: 24, height: 24, marginTop: -9 }}
                    railStyle={{ backgroundColor: '#e2e8f0', height: 6 }}
                />
            </div>

            {/* Кнопка ГОТОВО */}
            <div className="pt-4 pb-8">
                <button 
                    onClick={onClose}
                    className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl shadow-sm active:scale-95 transition-transform"
                >
                    Готово
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}