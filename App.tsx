import React, { useState, useEffect } from 'react';
import { SubjectType, User, UserProgress, ViewState, Lesson, Course, TutorialStep } from './types';
import { COURSES, MOCK_USERS, TUTORIAL_STEPS_CONFIG } from './constants';
import { LessonView } from './components/LessonView';
import { Dashboard } from './components/Dashboard';
import { TutorialOverlay } from './components/TutorialOverlay';
import { HanoiGame } from './components/HanoiGame';
import { BookOpen, Calculator, User as UserIcon, LogOut, CheckCircle, Lock, PlayCircle, Bot, Gamepad2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedSubject, setSelectedSubject] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({ userId: '', progress: {} });
  
  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentTutorialSteps, setCurrentTutorialSteps] = useState<TutorialStep[]>([]);
  const [showLoginTutorial, setShowLoginTutorial] = useState(true);

  // Load progress on user login
  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`progress_${currentUser.id}`);
      if (saved) {
        setUserProgress(JSON.parse(saved));
      } else {
        setUserProgress({ userId: currentUser.id, progress: {} });
      }
      setShowLoginTutorial(false);
      
      // Auto-trigger only the button guide if not seen
      if (!localStorage.getItem('button_tutorial_done')) {
        setTimeout(() => {
            handleTriggerTutorial('BUTTON_GUIDE');
        }, 800);
      }
    }
  }, [currentUser]);

  // Update tutorial steps when view changes or manually triggered
  const handleTriggerTutorial = (targetView: ViewState | 'BUTTON_GUIDE') => {
    let steps: TutorialStep[] = [];
    switch (targetView) {
        case 'BUTTON_GUIDE':
            steps = TUTORIAL_STEPS_CONFIG.BUTTON_GUIDE;
            break;
        case 'HOME':
            steps = TUTORIAL_STEPS_CONFIG.HOME;
            break;
        case 'SUBJECT':
            steps = TUTORIAL_STEPS_CONFIG.SUBJECT;
            break;
        case 'LESSON':
            steps = TUTORIAL_STEPS_CONFIG.LESSON_PRACTICE;
            break;
        case 'STATS':
            steps = TUTORIAL_STEPS_CONFIG.STATS;
            break;
        default:
            steps = [];
    }
    
    if (steps.length > 0) {
        // Filter steps to ensure targets exist in the DOM
        // This prevents the tutorial from showing blank or broken steps if an element (like the Next button) isn't visible yet.
        const validSteps = steps.filter(step => document.getElementById(step.targetId));
        
        if (validSteps.length > 0) {
             setCurrentTutorialSteps(validSteps);
             setShowTutorial(true);
        }
    }
  };

  const saveProgress = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
    localStorage.setItem(`progress_${currentUser?.id}`, JSON.stringify(newProgress));
  };

  const handleCompleteLesson = (lessonId: string, score: number) => {
    const updated = { ...userProgress };
    updated.progress[lessonId] = {
      score,
      completed: true,
      timestamp: Date.now()
    };
    saveProgress(updated);
  };

  const loginSteps: TutorialStep[] = [
      { 
          targetId: 'user-selection', 
          message: 'Chào bé! Hãy nhập tên của mình để bắt đầu nhé.', 
          audio: 'Chào bé! Hãy nhập tên của mình để bắt đầu nhé.',
          position: 'top' 
      }
  ];

  const [inputName, setInputName] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputName.trim()) {
      setCurrentUser({
        id: `user_${Date.now()}`,
        name: inputName.trim(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(inputName.trim())}`
      });
    }
  };

  const handleGuestLogin = () => {
    setCurrentUser({
      id: 'guest',
      name: 'Khách',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center p-4">
        <TutorialOverlay 
            isActive={showLoginTutorial} 
            steps={loginSteps} 
            onComplete={() => setShowLoginTutorial(false)} 
        />
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-2 font-sans">Bé Vui Học</h1>
            <p className="text-gray-500 mb-8">Nhập tên của bé để bắt đầu</p>
            
            <form onSubmit={handleLogin} className="space-y-4" id="user-selection">
              <div>
                <input 
                  type="text" 
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Tên của bé là gì?" 
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg text-center font-bold text-gray-700"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                disabled={!inputName.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-2xl transition shadow-md"
              >
                Bắt đầu học
              </button>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">Hoặc</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={handleGuestLogin}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-2xl transition"
              >
                Vào chơi ngay (Tài khoản khách)
              </button>
            </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] font-sans pb-20 relative">
      
      {/* Global Tutorial Overlay */}
      <TutorialOverlay 
        isActive={showTutorial} 
        steps={currentTutorialSteps} 
        onComplete={() => {
            setShowTutorial(false);
            // Check if we just finished the button guide
            if (currentTutorialSteps === TUTORIAL_STEPS_CONFIG.BUTTON_GUIDE) {
                localStorage.setItem('button_tutorial_done', 'true');
            }
        }} 
      />

      {/* GLOBAL ASSISTANT BUTTON - ALWAYS VISIBLE BOTTOM LEFT */}
      <button
        id="btn-global-assist"
        onClick={() => handleTriggerTutorial(view)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-500 text-white rounded-full shadow-2xl border-4 border-white flex items-center justify-center z-50 hover:scale-110 transition-transform animate-bounce-small"
        title="Hướng dẫn / Trợ lý"
      >
        <Bot size={32} />
      </button>

      {/* Navbar */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('HOME'); setSelectedSubject(null); }}>
                <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    B
                </div>
                <span className="text-xl font-extrabold text-gray-700 hidden sm:block">Bé Vui Học</span>
            </div>
            
            <div className="flex items-center gap-3">
                 <button 
                    id="btn-stats"
                    onClick={() => setView('STATS')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full font-bold hover:bg-yellow-200 transition text-sm md:text-base"
                >
                    ⭐ Thành tích
                </button>
                <div id="user-info-bar" className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                    <img src={currentUser.avatar} className="w-6 h-6 rounded-full" alt="avatar"/>
                    <span className="font-bold text-gray-600 text-sm hidden md:block">{currentUser.name}</span>
                </div>
                <button onClick={() => setCurrentUser(null)} className="p-2 text-gray-400 hover:text-red-500">
                    <LogOut size={20} />
                </button>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        
        {view === 'HOME' && (
          <div className="animate-fade-in">
             <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
                    Chào {currentUser.name}! 👋
                </h1>
                <p className="text-gray-500 text-lg">Hôm nay chúng mình sẽ học môn gì nào?</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {COURSES.map(course => (
                    <div 
                        key={course.id}
                        id={`course-${course.id}`}
                        onClick={() => { setSelectedSubject(course); setView('SUBJECT'); }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 transition duration-300 group"
                    >
                        <div className={`h-32 ${course.color} flex items-center justify-center relative overflow-hidden`}>
                             <div className="absolute inset-0 bg-white/10 rotate-12 scale-150 rounded-full"></div>
                             {course.id === SubjectType.MATH ? <Calculator size={64} className="text-white relative z-10" /> : <BookOpen size={64} className="text-white relative z-10" />}
                        </div>
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-black text-gray-800 mb-2">{course.title}</h2>
                            <p className="text-gray-500 mb-4">{course.topics.length} chủ đề thú vị đang chờ bé!</p>
                            <span className="inline-block px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-full group-hover:bg-gray-800 group-hover:text-white transition">
                                Bắt đầu học
                            </span>
                        </div>
                    </div>
                ))}

                {/* Giải trí */}
                <div 
                    onClick={() => setView('HANOI_GAME')}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 transition duration-300 group"
                >
                    <div className={`h-32 bg-purple-500 flex items-center justify-center relative overflow-hidden`}>
                         <div className="absolute inset-0 bg-white/10 rotate-12 scale-150 rounded-full"></div>
                         <Gamepad2 size={64} className="text-white relative z-10" />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-black text-gray-800 mb-2">Giải trí</h2>
                        <p className="text-gray-500 mb-4">Trò chơi Tháp Hà Nội</p>
                        <span className="inline-block px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-full group-hover:bg-purple-600 group-hover:text-white transition">
                            Chơi ngay
                        </span>
                    </div>
                </div>
             </div>
          </div>
        )}

        {view === 'SUBJECT' && selectedSubject && (
            <div className="animate-fade-in">
                <div className="mb-6 flex items-center gap-4">
                     <button id="btn-back-home" onClick={() => setView('HOME')} className="p-2 bg-white rounded-xl shadow-sm hover:shadow text-gray-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                     </button>
                     <h2 className="text-2xl md:text-3xl font-black text-gray-800">{selectedSubject.title}</h2>
                </div>

                <div id="topic-list" className="space-y-6">
                    {selectedSubject.topics.map((topic, index) => (
                        <div key={topic.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-700">{topic.title}</h3>
                            </div>
                            <div className="p-4 grid gap-3">
                                {topic.lessons.map(lesson => {
                                    const isCompleted = userProgress.progress[lesson.id]?.completed;
                                    return (
                                        <button 
                                            key={lesson.id}
                                            onClick={() => { setSelectedLesson(lesson); setView('LESSON'); }}
                                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition text-left group
                                                ${isCompleted 
                                                    ? 'bg-green-50 border-green-100' 
                                                    : 'bg-white border-transparent hover:border-indigo-100 hover:bg-indigo-50 shadow-sm'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                                    ${isCompleted ? 'bg-green-200 text-green-700' : 'bg-indigo-100 text-indigo-500'}
                                                `}>
                                                    {isCompleted ? <CheckCircle size={20} fill="currentColor" className="text-green-500 bg-white rounded-full"/> : <PlayCircle size={20} />}
                                                </div>
                                                <span className={`font-bold ${isCompleted ? 'text-green-800' : 'text-gray-700'}`}>
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            {isCompleted && <span className="text-xs font-bold bg-green-200 text-green-800 px-2 py-1 rounded">Hoàn thành</span>}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {view === 'LESSON' && selectedLesson && selectedSubject && (
            <LessonView 
                lesson={selectedLesson} 
                subjectType={selectedSubject.id}
                subjectTitle={selectedSubject.title}
                onBack={() => setView('SUBJECT')}
                onComplete={(score) => {
                    handleCompleteLesson(selectedLesson.id, score);
                    // Do not auto navigate, let them enjoy the celebration in LessonView
                }}
            />
        )}

        {view === 'STATS' && (
            <Dashboard userProgress={userProgress} onClose={() => setView('HOME')} />
        )}

        {view === 'HANOI_GAME' && (
            <HanoiGame onBack={() => setView('HOME')} />
        )}

      </div>
    </div>
  );
};

export default App;