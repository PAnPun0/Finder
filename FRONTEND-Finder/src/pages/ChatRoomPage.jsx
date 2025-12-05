import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Paperclip, Send, User } from 'lucide-react';
import MessageBubble from '../components/MessageBubble'; 


const CURRENT_USER_ID = 1; 
const INITIAL_MESSAGES = [
  { 
    id: 101, 
    chatId: 1, 
    senderId: 2,
    content: 'aooaoa', 
    type: 'text',
    status: 'read',
    createdAt: '2023-12-01T18:20:00.000Z' 
  },
  { 
    id: 102, 
    chatId: 1, 
    senderId: 1,
    content: '676776676767', 
    type: 'text',
    status: 'read',
    createdAt: '2023-12-01T18:22:00.000Z' 
  },
  { 
    id: 'sys-1', 
    type: 'system', 
    content: 'Сегодня' 
  }
];

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const isAnon = id === 'anon';
  const chatPartner = isAnon ? {
      name: 'Аноним',
      status: 'В сети',
      avatar: null // У анонима нет фото
  } : {
      name: 'Jane Jain',
      status: 'Online',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  };


  // Скролл вниз
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Создаем объект сообщения (Optimistic Update)
    // Мы сразу показываем сообщение юзеру, не дожидаясь ответа сервера
    const tempId = Date.now(); // Временный ID
    const newMessage = {
      id: tempId,
      chatId: Number(id),
      senderId: CURRENT_USER_ID,
      content: inputValue,
      type: 'text',
      status: 'sending', // Пока статус "отправляется"
      createdAt: new Date().toISOString(), // ISO формат (важно для Go!)
    };

    // Добавляем в список
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // 2. Имитация отправки на Бэкенд (Go)
    // В реальности тут будет: await api.sendMessage(newMessage)
    try {
        // Имитируем задержку сети 500мс
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Сервер вернул ответ: "Всё ок, сообщение сохранено, вот его настоящий ID"
        setMessages((prev) => 
            prev.map(msg => 
                msg.id === tempId 
                    ? { ...msg, status: 'sent', id: 9999 } // Обновляем статус на 'sent'
                    : msg
            )
        );
    } catch (error) {
        console.error("Ошибка отправки:", error);
        // Тут можно пометить сообщение красным (status: 'error')
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      
      {/* ШАПКА */}
      <header className="px-4 pt-12 pb-3 flex items-center justify-between bg-white border-b border-slate-50 sticky top-0 z-20">
        <button onClick={() => navigate('/chats')} className="p-2 -ml-2 hover:bg-slate-50 rounded-full">
            <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg text-slate-900">{chatPartner.name}</h2>
            <span className="text-xs text-green-500 font-medium">Online</span>
            {!isAnon && <span className="text-xs text-green-500 font-medium">{chatPartner.status}</span>}

        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
             {chatPartner.avatar ? (
                 <img src={chatPartner.avatar} className="w-full h-full object-cover" />
             ) : (
                 <User size={24} className="text-slate-400" />
             )}
        </div>

      </header>

      {/* СПИСОК СООБЩЕНИЙ */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            currentUserId={CURRENT_USER_ID} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ПОЛЕ ВВОДА */}
      <div className="p-4 bg-white border-t border-slate-50 sticky bottom-0 z-20">
        <form 
            onSubmit={handleSend}
            className="flex items-center gap-2 bg-white rounded-full border border-slate-200 px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-shadow"
        >
            <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition">
                <Paperclip className="w-5 h-5 rotate-45" />
            </button>
            
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Напишите сообщение..." 
                className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
            />
            
            <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="p-2.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 disabled:opacity-50 transition-transform active:scale-95"
            >
                <Send className="w-4 h-4 ml-0.5" />
            </button>
        </form>
      </div>
    </div>
  );
}