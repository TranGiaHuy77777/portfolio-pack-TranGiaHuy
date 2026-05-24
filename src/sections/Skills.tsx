import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Wrench, Sparkles, Award } from 'lucide-react';
import profileData from '../profile.json';

const getSkillIcon = (name: string) => {
  const normalized = name.toLowerCase();
  
  if (normalized.includes('claude')) {
    return (
      <svg className="w-5 h-5 text-[#D97757]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* 3D-like layered organic flower/cabbage shape */}
        <path d="M12 12c2-3.5 6-3.5 6 0s-4 3.5-6 0z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 12c-2-3.5-6-3.5-6 0s4 3.5 6 0z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 12c3.5-2 3.5-6 0-6s-3.5 4 0 6z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 12c3.5 2 3.5 6 0 6s-3.5-4 0-6z" fill="currentColor" fillOpacity="0.1" />
        <circle cx="12" cy="12" r="2" fill="currentColor" className="animate-pulse" />
      </svg>
    );
  }

  if (normalized.includes('antigravity')) {
    return (
      <svg className="w-5 h-5 text-[#9E7BFF] animate-[bounce_4s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.1" />
        <ellipse cx="12" cy="12" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" transform="rotate(-15 12 12)" />
        <path d="M12 2v2M12 20v2M4 12h2M18 12h2" opacity="0.6" strokeWidth="1" strokeDasharray="1 1" />
        <circle cx="6" cy="6" r="1" fill="currentColor" className="animate-ping" />
        <circle cx="18" cy="17" r="1.5" fill="currentColor" className="animate-pulse" />
      </svg>
    );
  }

  if (normalized.includes('copilot')) {
    return (
      <svg className="w-5 h-5 text-[#00D9FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a8 8 0 0 1 16 0" />
        <rect x="2" y="10" width="2" height="4" rx="1" fill="currentColor" />
        <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor" />
        <path d="M6 14v-3a6 6 0 0 1 12 0v3" fill="currentColor" fillOpacity="0.05" />
        <rect x="8" y="11" width="8" height="3" rx="1.5" stroke="#00D9FF" strokeWidth="1.5" />
        <circle cx="10" cy="12.5" r="0.75" fill="#00D9FF" />
        <circle cx="14" cy="12.5" r="0.75" fill="#00D9FF" />
        <path d="M12 3V1" strokeWidth="1.5" />
        <circle cx="12" cy="1" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes('react') && !normalized.includes('native')) {
    return (
      <svg className="w-5 h-5 text-[#00D9FF] animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  
  if (normalized.includes('redux')) {
    return (
      <svg className="w-4 h-4 text-[#764ABC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  if (normalized.includes('typescript')) {
    return (
      <span className="w-4.5 h-4.5 rounded-[3px] bg-[#3178C6] text-black font-bold flex items-center justify-center text-[9px] font-sans">
        TS
      </span>
    );
  }

  if (normalized.includes('javascript')) {
    return (
      <span className="w-4.5 h-4.5 rounded-[3px] bg-[#F7DF1E] text-black font-extrabold flex items-center justify-center text-[9px] font-sans">
        JS
      </span>
    );
  }

  if (normalized.includes('tailwindcss')) {
    return (
      <svg className="w-4.5 h-4.5 text-[#06B6D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6 0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8 1.2 0 2.4-.6 3.6-1.8 1.2-1.2 1.8-2.4 1.8-3.6 0-1.2-.6-2.4-1.8-3.6C14.4 3.6 13.2 3 12 3z"/>
        <path d="M12 12c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6 0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8 1.2 0 2.4-.6 3.6-1.8 1.2-1.2 1.8-2.4 1.8-3.6 0-1.2-.6-2.4-1.8-3.6-1.2-1.2-2.4-1.8-3.6-1.8z" opacity="0.6"/>
      </svg>
    );
  }

  if (normalized.includes('bootstrap')) {
    return (
      <span className="w-4.5 h-4.5 rounded-[3px] bg-[#7952B3] text-white font-extrabold flex items-center justify-center text-[10px] font-sans">
        B
      </span>
    );
  }

  if (normalized.includes('html5') || normalized.includes('css3') || normalized.includes('html')) {
    return (
      <svg className="w-4 h-4 text-[#E34F26]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    );
  }

  if (normalized.includes('java')) {
    return (
      <svg className="w-4 h-4 text-[#F89820]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <path d="M6 1v3M10 1v3M14 1v3"/>
      </svg>
    );
  }

  if (normalized.includes('node')) {
    return (
      <svg className="w-4 h-4 text-[#339933]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeDasharray="3 3"/>
        <circle cx="12" cy="11" r="3"/>
      </svg>
    );
  }

  if (normalized.includes('express')) {
    return (
      <span className="text-[7.5px] font-extrabold border border-white/20 px-1 py-px rounded font-mono text-gray-300">
        EX
      </span>
    );
  }

  if (normalized.includes('rest') || normalized.includes('api')) {
    return (
      <svg className="w-4 h-4 text-[#00D9FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    );
  }

  if (normalized.includes('postgres') || normalized.includes('sql')) {
    return (
      <svg className="w-4 h-4 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    );
  }

  if (normalized.includes('git')) {
    return (
      <svg className="w-4 h-4 text-[#F05032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"/>
        <circle cx="6" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="M6 9v6M9 18h6"/>
      </svg>
    );
  }

  if (normalized.includes('vite')) {
    return (
      <svg className="w-4 h-4 text-[#FFD600]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    );
  }

  if (normalized.includes('code') || normalized.includes('vs')) {
    return (
      <svg className="w-4 h-4 text-[#007ACC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    );
  }

  if (normalized.includes('postman')) {
    return (
      <svg className="w-4 h-4 text-[#FF6C37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 22 12 17 22 22 12 2"/>
      </svg>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <svg className="w-4 h-4 text-[#F24E1E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2A5 5 0 0 0 7 7a5 5 0 0 0 5 5 5 5 0 0 0 5-5A5 5 0 0 0 12 2zm0 10a5 5 0 0 0-5 5c0 2.76 2.24 5 5 5s5-2.24 5-5a5 5 0 0 0-5-5z"/>
      </svg>
    );
  }

  if (normalized.includes('ai')) {
    return (
      <svg className="w-4 h-4 text-[#9E7BFF] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    );
  }

  return <Award size={14} className="text-gray-500 group-hover:text-accent transition-colors" />;
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'tools' | 'ai'>('frontend');

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: <Layout size={16} /> },
    { id: 'backend', label: 'Backend', icon: <Server size={16} /> },
    { id: 'tools', label: 'Tools', icon: <Wrench size={16} /> },
    { id: 'ai', label: 'AI Workflow', icon: <Sparkles size={16} /> },
  ] as const;

  // Define neon light colors for each tab category
  const glowColors = {
    frontend: 'shadow-[0_0_25px_rgba(109,93,246,0.15)] border-primary/20 hover:border-primary/40',
    backend: 'shadow-[0_0_25px_rgba(158,123,255,0.15)] border-secondary/20 hover:border-secondary/40',
    tools: 'shadow-[0_0_25px_rgba(0,217,255,0.15)] border-accent/20 hover:border-accent/40',
    ai: 'shadow-[0_0_25px_rgba(255,255,255,0.1)] border-white/10 hover:border-white/30',
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
            TECHNICAL ARSENAL
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white">
            Core Competencies & AI Tools
          </h2>
          <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold font-sora tracking-wide border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-glow-gradient border-transparent text-black shadow-neon-glow font-bold scale-105'
                  : 'bg-[#121216]/60 backdrop-blur-md border-white/5 text-gray-400 hover:text-white hover:border-gray-600'
              }`}
            >
              {tab.icon}
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {profileData.skills[activeTab].map((skill) => (
                <div
                  key={skill.name}
                  className={`bg-[#121216]/60 backdrop-blur-md border rounded-2xl p-5 flex flex-col justify-between h-[110px] group transition-all duration-300 hover:scale-[1.02] ${glowColors[activeTab]}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-base font-bold font-sora text-white group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {getSkillIcon(skill.name)}
                    </div>
                  </div>
                  
                  {/* Glowing custom badges */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="text-[10px] text-gray-500 font-mono">CAPABILITY</span>
                    <span className={`text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded ${
                      skill.level === 'Expert' ? 'bg-green-950/40 border border-green-500/20 text-green-400' :
                      skill.level === 'Advanced' ? 'bg-blue-950/40 border border-blue-500/20 text-blue-400' :
                      'bg-gray-800 text-gray-300'
                    }`}>
                      {skill.level.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
