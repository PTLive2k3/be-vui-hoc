import React, { useState, useEffect, useRef } from 'react';
import { TutorialStep } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface TutorialOverlayProps {
  isActive: boolean;
  steps: TutorialStep[];
  onComplete: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ isActive, steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const retryCount = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<'none' | 'playing' | 'failed' | 'stopped' | 'blocked' | 'loading'>('none');
  
  useEffect(() => {
    if (!isActive) {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        window.speechSynthesis.cancel();
        setAudioState('none');
        return;
    }
    setCurrentStep(0);
  }, [isActive]);

  const playAudio = async (url?: string, text?: string) => {
    if (audioRef.current) {
        audioRef.current.pause();
    }
    window.speechSynthesis.cancel();
    
    // 1. Try static URL first if provided
    if (url) {
        try {
            const audio = new Audio(url);
            audioRef.current = audio;
            setAudioState('playing');

            audio.play().catch(err => {
                if (err.name === 'NotAllowedError') {
                    setAudioState('blocked');
                } else {
                    // If static file fails, try TTS fallback
                    if (text) playTTS(text);
                }
            });

            audio.onended = () => setAudioState('stopped');
            audio.onerror = () => {
                if (text) playTTS(text);
                else setAudioState('failed');
            };
            return;
        } catch (e) {
            if (text) return playTTS(text);
        }
    }

    // 2. Fallback to TTS if no URL or URL failed
    if (text) {
        playTTS(text);
    }
  };

  const playTTS = (text: string) => {
    setAudioState('playing');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setAudioState('stopped');
    utterance.onerror = () => setAudioState('failed');

    window.speechSynthesis.speak(utterance);
  };

  // Global click listener to resume blocked audio
  useEffect(() => {
    const handleFirstInteraction = () => {
        if (audioState === 'blocked') {
            const step = steps[currentStep];
            playAudio(step?.audioUrl, step?.message);
        }
    };

    if (audioState === 'blocked') {
        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    }

    return () => {
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [audioState, currentStep, steps]);

  useEffect(() => {
    const step = steps[currentStep];
    if (isActive && step) {
        playAudio(step.audioUrl, step.message);
    } else {
        setAudioState('none');
    }

    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };
  }, [currentStep, isActive, steps]);

  useEffect(() => {
    const updateTargetRect = () => {
      const step = steps[currentStep];
      if (!step) return;
      const element = document.getElementById(step.targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        retryCount.current = 0;
      } else if (retryCount.current < 5) {
        // Retry a few times in case element is still rendering
        retryCount.current += 1;
        setTimeout(updateTargetRect, 500);
      } else {
        setTargetRect(null);
      }
    };

    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    return () => window.removeEventListener('resize', updateTargetRect);
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!isActive || !steps || steps.length === 0) return null;

  const step = steps[currentStep];
  if (!step) return null;
  
  // Fallback rect if target element is not found
  const effectiveTargetRect = targetRect || {
    top: window.innerHeight / 2 - 50,
    left: window.innerWidth / 2 - 50,
    width: 100,
    height: 100,
    bottom: window.innerHeight / 2 + 50,
    right: window.innerWidth / 2 + 50,
  } as DOMRect;

  const getBubblePosition = () => {
    const padding = 20;
    switch (step.position) {
      case 'top':
        return { bottom: window.innerHeight - effectiveTargetRect.top + padding, left: effectiveTargetRect.left + effectiveTargetRect.width / 2 };
      case 'bottom':
        return { top: effectiveTargetRect.bottom + padding, left: effectiveTargetRect.left + effectiveTargetRect.width / 2 };
      case 'left':
        return { top: effectiveTargetRect.top + effectiveTargetRect.height / 2, right: window.innerWidth - effectiveTargetRect.left + padding };
      case 'right':
        return { top: effectiveTargetRect.top + effectiveTargetRect.height / 2, left: effectiveTargetRect.right + padding };
      default:
        return { top: window.innerHeight / 2, left: window.innerWidth / 2 };
    }
  };

  const bubblePos = getBubblePosition();

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dark Overlay with Hole */}
      <div 
        className="absolute inset-0 bg-black/60 pointer-events-auto" 
        style={{
          clipPath: targetRect ? `polygon(0% 0%, 0% 100%, ${effectiveTargetRect.left}px 100%, ${effectiveTargetRect.left}px ${effectiveTargetRect.top}px, ${effectiveTargetRect.right}px ${effectiveTargetRect.top}px, ${effectiveTargetRect.right}px ${effectiveTargetRect.bottom}px, ${effectiveTargetRect.left}px ${effectiveTargetRect.bottom}px, ${effectiveTargetRect.left}px 100%, 100% 100%, 100% 0%)` : 'none'
        }} 
      />

      {/* Invisible click catcher for the hole/highlighted area */}
      {targetRect && (
        <div 
          className="absolute pointer-events-auto cursor-pointer"
          onClick={handleNext}
          style={{
            top: effectiveTargetRect.top,
            left: effectiveTargetRect.left,
            width: effectiveTargetRect.width,
            height: effectiveTargetRect.height,
          }}
        />
      )}

      {/* Highlight Ring */}
      {targetRect && (
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          key={`highlight-${currentStep}`}
          className="absolute border-4 border-yellow-400 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.5)] pointer-events-none"
          style={{
            top: effectiveTargetRect.top - 4,
            left: effectiveTargetRect.left - 4,
            width: effectiveTargetRect.width + 8,
            height: effectiveTargetRect.height + 8,
          }}
        />
      )}

      {/* Message Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bubble-${currentStep}`}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute pointer-events-auto bg-white p-6 rounded-3xl shadow-2xl border-4 border-indigo-500 max-w-xs md:max-w-sm"
          style={{
            ...bubblePos,
            transform: `translate(${step.position === 'left' ? '0' : (step.position === 'right' ? '0' : '-50%')}, ${step.position === 'top' ? '0' : (step.position === 'bottom' ? '0' : '-50%')})`,
          }}
        >
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <p className="text-lg font-bold text-gray-800 leading-tight pr-8">
                {step.message}
              </p>
              {(step.audioUrl || step.message) && (
                <button 
                  onClick={() => playAudio(step.audioUrl, step.message)}
                  className={`p-2 rounded-full transition-all ${
                    audioState === 'playing' ? 'bg-indigo-100 text-indigo-600 animate-pulse' : 
                    audioState === 'loading' ? 'bg-blue-50 text-blue-400' :
                    audioState === 'blocked' ? 'bg-yellow-100 text-yellow-600 animate-bounce' :
                    audioState === 'failed' ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  title={audioState === 'blocked' ? "Bấm vào màn hình để nghe" : "Nghe lại"}
                >
                  {audioState === 'loading' ? <Loader2 size={20} className="animate-spin" /> : 
                   audioState === 'failed' ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-indigo-500' : 'bg-gray-200'}`} />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? 'Bắt đầu học! 🚀' : 'Tiếp theo ➜'}
              </button>
            </div>

            {/* Arrow */}
            <div className={`absolute w-6 h-6 bg-white border-indigo-500 rotate-45 -z-10 ${
              step.position === 'top' ? 'bottom-[-12px] left-1/2 -translate-x-1/2 border-b-4 border-r-4' :
              step.position === 'bottom' ? 'top-[-12px] left-1/2 -translate-x-1/2 border-t-4 border-l-4' :
              step.position === 'left' ? 'right-[-12px] top-1/2 -translate-y-1/2 border-t-4 border-r-4' :
              'left-[-12px] top-1/2 -translate-y-1/2 border-b-4 border-l-4'
            }`} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
