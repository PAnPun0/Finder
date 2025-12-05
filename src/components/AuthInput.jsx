import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthInput({ label, type = 'text', value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
      <label className="block text-xs font-medium text-slate-500 mb-1">
        {label}
      </label>
      <div className="flex items-center justify-between">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-300"
        />
        
        {type === 'password' && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}