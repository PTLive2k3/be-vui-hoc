import React, { useState } from 'react';
import { askAiTutor } from '../services/geminiService';
import { Bot, Send, Sparkles, Loader2 } from 'lucide-react';

interface AiTutorProps {
  context: string;
}

export const AiTutor: React.FC<AiTutorProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResponse(null);
    
    const answer = await askAiTutor(input, context);
    
    setResponse(answer);
    setLoading(false);
    setInput('');
  };

  const handleClose = () => {
      setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <button
        id="btn-ai-tutor"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 z-50 border-4 border-white"
      >
        <Bot size={32} />
        <span className="font-bold hidden md:inline">Hỏi Thầy AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border-4 border-indigo-100 overflow-hidden z-50 flex flex-col">
      <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-yellow-300" />
          <h3 className="font-bold text-lg">Gia sư AI</h3>
        </div>
        <button onClick={handleClose} className="text-white/80 hover:text-white">✕</button>
      </div>

      <div className="p-4 h-64 overflow-y-auto bg-gray-50 flex flex-col gap-3">
        {response ? (
          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-800 relative">
             <div className="flex justify-between items-start mb-1">
                <div className="flex gap-2">
                    <Bot size={16} className="text-indigo-500"/>
                    <span className="font-bold text-xs text-indigo-500">Thầy AI</span>
                </div>
             </div>
             <p className="leading-relaxed">{response}</p>
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-10">
            <Bot size={48} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Bé thắc mắc gì về bài học này không? Hỏi thầy nhé!</p>
          </div>
        )}
        
        {loading && (
             <div className="flex gap-2 items-center justify-center text-gray-400 text-sm py-4">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
             </div>
        )}
      </div>

      <div className="p-3 border-t bg-white flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Nhập câu hỏi..."
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
        />
        
        <button 
          onClick={handleAsk}
          disabled={loading || !input}
          className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? <Loader2 size={20} className="animate-spin"/> : <Send size={20} />}
        </button>
      </div>
    </div>
  );
};
