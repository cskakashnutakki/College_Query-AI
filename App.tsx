import React, { useState, useRef, useEffect } from 'react';
import { Send, GraduationCap, Loader2, Sparkles, Info } from 'lucide-react';
import { Message, MessageRole } from './types';
import { sendMessageToGemini } from './services/gemini';
import ChatMessage from './components/ChatMessage';
import WelcomeScreen from './components/WelcomeScreen';
import AboutModal from './components/AboutModal';

export default function App() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = query) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: MessageRole.User,
      text: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      const result = await sendMessageToGemini(text, messages);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.Model,
        text: result.text,
        timestamp: Date.now(),
        groundingMetadata: result.groundingMetadata
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.Model,
        text: "I'm having trouble connecting to the admissions office (API Error). Please check your connection and try again.",
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Keep focus on input for rapid queries
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setQuery('');
    setIsLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      
      {/* Header */}
      <header className="flex-none bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={resetChat}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                resetChat();
              }
            }}
          >
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight hidden sm:block">CollegeQuery</span>
            <span className="font-bold text-xl text-slate-800 tracking-tight sm:hidden">CQ</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <Sparkles size={14} className="text-indigo-500" />
              <span>Powered by Gemini</span>
            </div>
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
              title="About Project"
            >
              <Info size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={(text) => handleSendMessage(text)} />
          ) : (
            <div className="flex flex-col min-h-[500px]">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex flex-row gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                       <GraduationCap size={18} />
                    </div>
                    <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                      <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                      <span className="text-slate-500 text-sm font-medium">Researching university data...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none bg-white border-t border-slate-200 p-4 pb-6 md:pb-8">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center group">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about colleges, JEE/NEET exams, placements..."
              disabled={isLoading}
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 shadow-sm disabled:opacity-60 group-hover:border-slate-300"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!query.trim() || isLoading}
              className="absolute right-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            AI can make mistakes. Verify important admissions information with official university websites.
          </p>
        </div>
      </footer>
    </div>
  );
}