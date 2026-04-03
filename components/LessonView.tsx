
import React, { useState, useEffect, useRef } from 'react';
import { Lesson, SubjectType, Quiz, TutorialStep } from '../types';
import { AiTutor } from './AiTutor';
import { ChevronLeft, RefreshCcw, Volume2, Play, ArrowRight, Star, Hand } from 'lucide-react';
import { generateQuiz } from '../services/geminiService';
import { TutorialOverlay } from './TutorialOverlay';

interface LessonViewProps {
  lesson: Lesson;
  subjectType: SubjectType;
  subjectTitle: string;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, subjectType, subjectTitle, onComplete, onBack }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [message, setMessage] = useState('');
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Mock colors based on subject
  const themeColor = subjectType === SubjectType.MATH ? 'blue' : 'emerald';
  const bgColor = subjectType === SubjectType.MATH ? 'bg-blue-500' : 'bg-emerald-500';
  const textColor = subjectType === SubjectType.MATH ? 'text-blue-600' : 'text-emerald-600';

  // Check if this is a Vietnamese Alphabet lesson (Visual Listening Mode)
  const isVietnameseAlphabet = subjectType === SubjectType.VIETNAMESE && lesson.id.startsWith('v-t1');

  useEffect(() => {
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuizIndex]);

  // Auto-play audio when quizData changes
  useEffect(() => {
    if (quizData && !answered) {
        // Reduced latency to 10ms for instant response
        const timer = setTimeout(() => {
            playQuizAudio(quizData);
        }, 10);
        return () => clearTimeout(timer);
    }
  }, [quizData, answered]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
        stopAudio();
    }
  }, []);

  // Ensure voices are loaded for fallback TTS
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
        window.speechSynthesis.onvoiceschanged = null;
    }
  }, []);

  const cleanTextForTTS = (text: string) => {
    // Remove emojis and special characters to prevent reading them
    return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  }

  const stopAudio = () => {
      if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
      }
      window.speechSynthesis.cancel();
  }

  const playAudio = (text: string, audioUrl?: string) => {
    stopAudio();

    // 1. Priority: Play Audio File
    if (audioUrl) {
        try {
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.play().catch(e => {
                console.warn("Audio file play failed, falling back to TTS", e);
                // Fallback to TTS if file fails/missing
                playTTS(text);
            });
            return;
        } catch (e) {
            console.error("Invalid audio URL");
        }
    }

    // 2. Fallback: TTS
    playTTS(text);
  };

  const playTTS = (text: string) => {
    if (!text) return;
    const cleanText = cleanTextForTTS(text);
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0; // Normal speed
        utterance.pitch = 1.1; // Slightly friendly pitch
        
        // Try to select a Vietnamese voice
        const voices = window.speechSynthesis.getVoices();
        const viVoice = voices.find(v => v.lang.includes('vi'));
        if (viVoice) utterance.voice = viVoice;

        window.speechSynthesis.speak(utterance);
    } else {
        console.warn("Trình duyệt không hỗ trợ đọc văn bản.");
    }
  }

  const playQuizAudio = (quiz: Quiz) => {
      // Prioritize speakText if available, otherwise use question
      const textToRead = quiz.speakText || quiz.question;
      playAudio(textToRead, quiz.audioUrl);
  }

  const loadQuiz = async () => {
      setMessage('');
      setAnswered(false);
      
      // Load from static curriculum first
      if (lesson.quizzes && lesson.quizzes.length > currentQuizIndex) {
          setQuizData(lesson.quizzes[currentQuizIndex]);
          return;
      }

      // Fallback to AI if needed
      if (!lesson.quizzes || lesson.quizzes.length === 0) {
          setLoadingQuiz(true);
          const aiQuiz = await generateQuiz(lesson.title);
          if (aiQuiz) {
              setQuizData(aiQuiz);
          } else {
              setQuizData({
                  question: "Câu hỏi mẫu (chưa có dữ liệu)",
                  options: ["A", "B", "C"],
                  correctAnswer: 0
              });
          }
          setLoadingQuiz(false);
      }
  }

  const checkAnswer = (selectedIdx: number) => {
    if (!quizData || answered) return;
    
    setAnswered(true);
    const isCorrect = selectedIdx === quizData.correctAnswer;

    if (isCorrect) {
      setMessage('🎉 Hoan hô! Đúng rồi!');
      setScore(s => s + 10);
      playAudio("Đúng rồi, bé giỏi quá!");
    } else {
      setMessage('🤔 Sai rồi, thử lại lần sau nhé!');
      playAudio("Sai rồi, cố gắng lên nhé.");
    }
  };

  const handleNext = () => {
      if (lesson.quizzes && currentQuizIndex < lesson.quizzes.length - 1) {
          setCurrentQuizIndex(prev => prev + 1);
      } else {
          onComplete(100); 
          onBack(); 
      }
  };

  const isLastQuestion = lesson.quizzes && currentQuizIndex === lesson.quizzes.length - 1;

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-white md:rounded-3xl shadow-xl overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className={`${bgColor} p-4 md:p-6 text-white flex items-center gap-4`}>
        <button onClick={() => { stopAudio(); onBack(); }} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
          <ChevronLeft size={24} />
        </button>
        <div>
           <p className="text-white/80 text-sm font-bold uppercase tracking-wider">{subjectTitle}</p>
           <h1 className="text-xl md:text-2xl font-bold">{lesson.title}</h1>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 flex flex-col relative">
        
        {/* Content Area */}
        <div className="flex-1">
            <div className="animate-fade-in flex flex-col items-center justify-center h-full">
                    {loadingQuiz ? (
                        <div className="text-center">
                            <RefreshCcw className="animate-spin text-gray-300 mx-auto mb-4" size={40} />
                            <p className="text-gray-500">Đang tạo câu hỏi thú vị cho bé...</p>
                        </div>
                    ) : quizData ? (
                        <div className="w-full max-w-md relative">
                            
                            <div className="flex justify-between items-center mb-4 px-2">
                                <span className="text-gray-400 font-bold text-sm">Câu hỏi {currentQuizIndex + 1}/{lesson.quizzes?.length || 1}</span>
                                <span className="flex items-center gap-1 text-yellow-500 font-bold"><Star size={16} fill="currentColor"/> {score}</span>
                            </div>

                            <div className="bg-white border-4 border-indigo-50 shadow-xl rounded-3xl p-6 mb-6 relative min-h-[240px] flex flex-col items-center justify-center text-center">
                                <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {currentQuizIndex < 2 ? "⭐ Dễ" : (currentQuizIndex < 4 ? "⭐⭐ Vừa" : "⭐⭐⭐ Khó")}
                                </span>
                                
                                <button 
                                    id="btn-quiz-question-audio"
                                    onClick={() => playQuizAudio(quizData)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 transition bg-gray-50 p-2 rounded-full"
                                >
                                    <Volume2 size={28} />
                                </button>

                                {/* ILLUSTRATION CENTER */}
                                {quizData.illustration && (
                                    <div className="mb-4 mt-4 w-full flex justify-center px-2">
                                        {quizData.illustration.startsWith('http') ? (
                                            <img src={quizData.illustration} alt="minh họa" className="h-32 object-contain rounded-lg mx-auto" />
                                        ) : (
                                            <span 
                                                className={`animate-bounce-small inline-block whitespace-nowrap ${
                                                    Array.from(quizData.illustration).length > 12 ? 'text-2xl sm:text-3xl md:text-4xl tracking-tighter' :
                                                    Array.from(quizData.illustration).length > 8 ? 'text-3xl sm:text-4xl md:text-5xl tracking-tight' :
                                                    Array.from(quizData.illustration).length > 5 ? 'text-4xl sm:text-5xl md:text-6xl' :
                                                    'text-6xl sm:text-7xl'
                                                }`}
                                            >
                                                {quizData.illustration}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* QUESTION TEXT */}
                                <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-2 px-2 leading-tight">
                                    {quizData.question}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {quizData.options.map((opt, idx) => {
                                    let btnClass = "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 shadow-sm";
                                    if (answered) {
                                        if (idx === quizData.correctAnswer) btnClass = "bg-green-100 border-green-500 text-green-700 ring-2 ring-green-200";
                                        else btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                                    }

                                    return (
                                        <div key={idx} className="flex gap-2">
                                            <button
                                                onClick={() => checkAnswer(idx)}
                                                disabled={answered}
                                                className={`flex-1 p-4 border-b-4 rounded-2xl font-bold transition text-left flex items-center gap-4 ${btnClass}`}
                                            >
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg font-black text-indigo-400">
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="text-2xl md:text-3xl font-medium">{opt}</span>
                                            </button>
                                            
                                            {/* Audio button for individual option */}
                                            <button 
                                                id={`btn-quiz-option-audio-${idx}`}
                                                onClick={(e) => { e.stopPropagation(); playAudio(opt); }}
                                                className="bg-gray-100 hover:bg-blue-100 text-gray-400 hover:text-blue-500 rounded-2xl p-4 flex items-center justify-center transition"
                                                title="Nghe đáp án này"
                                            >
                                                <Volume2 size={24} />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            {message && (
                                <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg animate-bounce ${message.includes('Đúng') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {message}
                                </div>
                            )}

                            {answered && (
                                <button 
                                    id="btn-next-question"
                                    onClick={handleNext}
                                    className={`w-full mt-6 py-4 rounded-2xl font-black text-xl text-white shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-1 ${isLastQuestion ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                                >
                                    {isLastQuestion ? 'Nhận quà thôi! 🎁' : 'Tiếp tục nào ➜'}
                                </button>
                            )}
                        </div>
                    ) : (
                    <div className="text-center text-gray-500">
                         Không có bài tập nào.
                    </div>
                )}
            </div>
        </div>

        <AiTutor context={`Môn học: ${subjectTitle}. Bài học: ${lesson.title}. Nội dung: ${lesson.content}`} />
      </div>
    </div>
  );
};
