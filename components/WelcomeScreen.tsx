import React from 'react';
import { Search, TrendingUp, BookOpen, DollarSign, MapPin } from 'lucide-react';

interface SuggestionCardProps {
  icon: React.ReactNode;
  text: string;
  subtext: string;
  onClick: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ icon, text, subtext, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-start gap-4 p-4 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all rounded-xl text-left group h-full"
  >
    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-900 mb-1">{text}</span>
      <span className="text-xs text-slate-500 leading-relaxed">{subtext}</span>
    </div>
  </button>
);

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
        <div className="p-3 bg-indigo-100 rounded-full mb-4">
          <BookOpen size={40} className="text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center tracking-tight">
          CollegeQuery AI
        </h1>
        <p className="text-slate-500 text-center max-w-lg text-lg">
          Your intelligent guide to Indian Universities, Exams, and Campus Life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        <SuggestionCard 
          icon={<TrendingUp size={20} />} 
          text="Engineering Rankings" 
          subtext="What are the top NIRF ranked engineering colleges in India for Computer Science?"
          onClick={() => onSuggestionClick("What are the top NIRF ranked Engineering colleges in India for Computer Science?")}
        />
        <SuggestionCard 
          icon={<DollarSign size={20} />} 
          text="Placement Comparison" 
          subtext="Compare IIT Bombay and IIT Delhi based on average package and top recruiters."
          onClick={() => onSuggestionClick("Compare IIT Bombay and IIT Delhi based on placement statistics, average package, and top recruiters.")}
        />
        <SuggestionCard 
          icon={<MapPin size={20} />} 
          text="Medical Cut-offs" 
          subtext="What is the NEET cut-off for AIIMS Delhi and other top government colleges?"
          onClick={() => onSuggestionClick("What is the NEET cut-off for AIIMS Delhi and other top government medical colleges for general category?")}
        />
        <SuggestionCard 
          icon={<BookOpen size={20} />} 
          text="MBA Opportunities" 
          subtext="List the best MBA colleges in Bangalore with their fee structure."
          onClick={() => onSuggestionClick("List the best MBA colleges in Bangalore with their fee structure and admission process.")}
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;