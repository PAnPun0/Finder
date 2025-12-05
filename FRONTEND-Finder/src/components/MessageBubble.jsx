import React, { memo } from 'react';
import { Check, CheckCheck } from 'lucide-react';

// Хелпер для форматирования времени из ISO (2023-10-05T14:48:00.000Z)
const formatTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageBubble = ({ message, currentUserId }) => {
  // 1. Обработка системных сообщений (дата, "пользователь вошел" и т.д.)
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-4">
        <span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  // 2. Определяем, кто автор (Я или Собеседник)
  // Бэкенд на Go пришлет sender_id, мы сравниваем его с нашим ID
  const isMe = message.senderId === currentUserId;

  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] p-4 rounded-2xl relative text-sm leading-relaxed shadow-sm ${
          isMe
            ? 'bg-blue-600 text-white rounded-br-none' // Мои сообщения (Синие)
            : 'bg-slate-50 text-slate-800 rounded-bl-none' // Чужие (Серые)
        }`}
      >
        {/* Текст сообщения */}
        <p className="whitespace-pre-wrap break-words">{message.content}</p>

        {/* Мета-информация (Время + Статус) */}
        <div
          className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
            isMe ? 'text-blue-200' : 'text-slate-400'
          }`}
        >
          {/* Время */}
          <span>{formatTime(message.createdAt)}</span>

          {/* Статус (только для моих сообщений) */}
          {isMe && (
            <span>
              {message.status === 'read' && <CheckCheck size={14} />}
              {message.status === 'sent' && <Check size={14} />}
              {message.status === 'sending' && (
                // Иконка часиков или просто прозрачность, пока летит на сервер
                <span className="animate-pulse">...</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// memo предотвращает лишние ререндеры
export default memo(MessageBubble);