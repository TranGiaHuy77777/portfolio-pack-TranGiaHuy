import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing core protocols...');

  const steps = [
    'Initializing core protocols...',
    'Loading 3D WebGL render canvas...',
    'Establishing secure Formspree pipelines...',
    'Fetching projects archive cabinets...',
    'Decrypting technical skill vectors...',
    'Configuring reactive mouse interface...',
    'System ready. Transmitting portfolio UI...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Small delay for polished transition feel
          return 100;
        }

        // Random organic-feeling increments
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + increment, 100);

        // Map progress to steps description
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setCurrentStep(steps[stepIdx]);

        return next;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#08080C] z-[99999] flex flex-col items-center justify-center font-mono p-6 select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -40,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Glow Core Icon */}
        <div className="flex justify-center mb-2">
          <div className="relative group w-12 h-12 rounded-xl bg-glow-gradient flex items-center justify-center text-black font-sora font-extrabold text-lg shadow-[0_0_30px_rgba(0,217,255,0.4)]">
            <div className="absolute inset-0 bg-white/20 blur rounded-xl group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">H</span>
          </div>
        </div>

        {/* Progress Display */}
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-primary font-bold tracking-widest uppercase text-[10px]">BOOTING PORTFOLIO</span>
            <span className="text-accent font-extrabold font-mono text-[10px]">{progress}%</span>
          </div>
          
          {/* Neon loading bar */}
          <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              className="h-full bg-glow-gradient rounded-full shadow-[0_0_10px_rgba(0,217,255,0.8)]"
              style={{ width: `${progress}%` }}
              layoutId="preloaderBar"
            />
          </div>
        </div>

        {/* Terminal status logs */}
        <div className="h-6 flex items-center justify-center text-[10px] text-gray-500 text-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-ping flex-shrink-0" />
          <span className="truncate tracking-wide">{currentStep}</span>
        </div>
      </div>
    </motion.div>
  );
}
