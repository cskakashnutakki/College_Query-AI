import React from 'react';
import { X, Code, Database, Cpu } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden scale-100 opacity-100">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">About CollegeQuery</h2>
          <button 
            onClick={onClose} 
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <p className="text-slate-600 text-sm leading-relaxed">
            CollegeQuery is an intelligent research assistant designed to help students navigate the Indian education system, including IITs, NITs, and entrance exams like JEE & NEET.
          </p>
          
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tech Stack</h3>
            
            <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white text-blue-600 border border-slate-100 flex items-center justify-center shadow-sm">
                <Code size={18} />
              </div>
              <div>
                <span className="font-medium block">Frontend Architecture</span>
                <span className="text-slate-500 text-xs">React 19, TypeScript, Tailwind CSS</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white text-indigo-600 border border-slate-100 flex items-center justify-center shadow-sm">
                <Cpu size={18} />
              </div>
              <div>
                <span className="font-medium block">AI Engine</span>
                <span className="text-slate-500 text-xs">Google Gemini 2.5 Flash</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white text-emerald-600 border border-slate-100 flex items-center justify-center shadow-sm">
                <Database size={18} />
              </div>
              <div>
                <span className="font-medium block">Live Data</span>
                <span className="text-slate-500 text-xs">Google Search Grounding</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2024 CollegeQuery Project</p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;