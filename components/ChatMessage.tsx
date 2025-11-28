import React from 'react';
import { User, Bot, GraduationCap } from 'lucide-react';
import { Message, MessageRole } from '../types';
import GroundingSources from './GroundingSources';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.User;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          {isUser ? <User size={16} /> : <GraduationCap size={18} />}
        </div>

        {/* Message Body */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed overflow-hidden ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-sm' 
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
          }`}>
            {message.isError ? (
              <span className="text-red-300 font-medium">Error: {message.text}</span>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-li:my-0.5">
                {/* Simple line break handling. In a real app, use react-markdown */}
                {message.text.split('\n').map((line, i) => (
                  <p key={i} className="min-h-[1em]">{line}</p>
                ))}
              </div>
            )}
            
            {!isUser && message.groundingMetadata && (
              <GroundingSources metadata={message.groundingMetadata} />
            )}
          </div>
          <span className="text-xs text-slate-400 mt-1 px-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
