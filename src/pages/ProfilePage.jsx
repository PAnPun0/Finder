import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPen, Zap, Star, ChevronRight, Maximize2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans">
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-white">
        <h1 className="text-3xl font-bold text-slate-800">Finder</h1>
        <button onClick={() => navigate('/profile/edit')}>
            <UserPen className="w-6 h-6 text-slate-800" />
        </button>
      </header>

      <div className="px-4 mt-6 flex flex-col items-center">
        
        <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-purple-400 to-blue-400">
                <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300" 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                />
            </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800">Егоров Егор, 18</h2>

        <button className="w-full mt-6 bg-slate-100 rounded-2xl p-4 flex justify-between items-center hover:bg-slate-200 transition">
            <div className="flex items-center gap-3">
                <Maximize2 className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-slate-700">Укажите рост?</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
            
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-3">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                        <Star className="w-8 h-8 fill-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">+</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-lg text-slate-900">Суперлайк 0</div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-3">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-red-400 flex items-center justify-center text-white shadow-lg shadow-orange-200">
                        <Zap className="w-8 h-8 fill-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">+</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-lg text-slate-900">Внимание 0</div>
                </div>
            </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}