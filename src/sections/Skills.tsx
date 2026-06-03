import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Wrench, Sparkles, Award } from 'lucide-react';
import profileData from '../profile.json';

const getSkillIcon = (name: string) => {
  const normalized = name.toLowerCase();
  
  if (normalized.includes('claude')) {
    return (
      <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c2-3.5 6-3.5 6 0s-4 3.5-6 0z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 12c-2-3.5-6-3.5-6 0s4 3.5 6 0z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 12c3.5-2 3.5-6 0-6s-3.5 4 0 6z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 12c3.5 2 3.5 6 0 6s-3.5-4 0-6z" fill="currentColor" fillOpacity="0.1" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes('antigravity')) {
    return (
      <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.05" />
        <ellipse cx="12" cy="12" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" transform="rotate(-15 12 12)" />
        <path d="M12 2v2M12 20v2M4 12h2M18 12h2" opacity="0.4" strokeWidth="1" strokeDasharray="1 1" />
        <circle cx="18" cy="17" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes('copilot')) {
    return (
      <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a8 8 0 0 1 16 0" />
        <rect x="2" y="10" width="2" height="4" rx="1" fill="currentColor" />
        <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor" />
        <path d="M6 14v-3a6 6 0 0 1 12 0v3" fill="currentColor" fillOpacity="0.03" />
        <rect x="8" y="11" width="8" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="12.5" r="0.75" fill="currentColor" />
        <circle cx="14" cy="12.5" r="0.75" fill="currentColor" />
        <path d="M12 3V1" strokeWidth="1.5" />
        <circle cx="12" cy="1" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes('react') && !normalized.includes('native')) {
    return (
      <svg className="w-5 h-5 text-primary" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
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
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  if (normalized.includes('typescript')) {
    return (
      <span className="w-5 h-5 rounded-[2px] bg-primary text-black font-bold flex items-center justify-center text-[9px] font-sora">
        TS
      </span>
    );
  }

  if (normalized.includes('javascript')) {
    return (
      <span className="w-5 h-5 rounded-[2px] bg-primary text-black font-extrabold flex items-center justify-center text-[9px] font-sora">
        JS
      </span>
    );
  }

  if (normalized.includes('tailwindcss')) {
    return (
      <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6 0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8 1.2 0 2.4-.6 3.6-1.8 1.2-1.2 1.8-2.4 1.8-3.6 0-1.2-.6-2.4-1.8-3.6C14.4 3.6 13.2 3 12 3z"/>
        <path d="M12 12c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6 0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8 1.2 0 2.4-.6 3.6-1.8 1.2-1.2 1.8-2.4 1.8-3.6 0-1.2-.6-2.4-1.8-3.6-1.2-1.2-2.4-1.8-3.6-1.8z" opacity="0.5"/>
      </svg>
    );
  }

  if (normalized.includes('bootstrap')) {
    return (
      <span className="w-5 h-5 rounded-[2px] bg-white/5 border border-white/10 text-white font-extrabold flex items-center justify-center text-[9px] font-sora">
        BS
      </span>
    );
  }

  if (normalized.includes('html5') || normalized.includes('css3') || normalized.includes('html')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    );
  }

  if (normalized.includes('java')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <path d="M6 1v3M10 1v3M14 1v3"/>
      </svg>
    );
  }

  if (normalized.includes('node')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeDasharray="2 2"/>
        <circle cx="12" cy="11" r="2.5"/>
      </svg>
    );
  }

  if (normalized.includes('express')) {
    return (
      <span className="text-[7.5px] font-extrabold border border-white/10 px-1 py-px rounded-[2px] font-mono text-gray-400">
        EXP
      </span>
    );
  }

  if (normalized.includes('rest') || normalized.includes('api')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    );
  }

  if (normalized.includes('postgres') || normalized.includes('sql')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    );
  }

  if (normalized.includes('git')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"/>
        <circle cx="6" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="M6 9v6M9 18h6"/>
      </svg>
    );
  }

  if (normalized.includes('vite')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    );
  }

  if (normalized.includes('code') || normalized.includes('vs')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    );
  }

  if (normalized.includes('postman')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 22 12 17 22 22 12 2"/>
      </svg>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2A5 5 0 0 0 7 7a5 5 0 0 0 5 5 5 5 0 0 0 5-5A5 5 0 0 0 12 2zm0 10a5 5 0 0 0-5 5c0 2.76 2.24 5 5 5s5-2.24 5-5a5 5 0 0 0-5-5z"/>
      </svg>
    );
  }

  if (normalized.includes('ai')) {
    return (
      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    );
  }

  return <Award size={14} className="text-gray-400 group-hover:text-primary transition-colors" />;
};

const skillDescriptions: Record<string, string> = {
  'React': 'High-performance components design, clean declarative hooks, state synchronization, and performance auditing.',
  'TypeScript': 'Rigorous compile-time checking, generics contract modeling, type narrowing, and advanced interface typing.',
  'Java & Spring Boot': 'Secure multithreaded routing, JPA database transaction mappings, caching layers, and enterprise locking.',
  'Node.js': 'Scalable event-driven architectures, real-time Socket.io endpoints, and file upload stream pipelines.',
  'Claude': 'Agentic code orchestration, rapid prototyping validation, system debugging, and recursive testing templates.',
  'GitHub & Git': 'Collaborative multi-branch strategies, secure code integrations, and deployment pipeline automation.',
  'Antigravity': 'Autonomous software engineering, system integration scripting, and advanced workspace modifications.'
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'tools' | 'ai'>('frontend');

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: <Layout size={14} /> },
    { id: 'backend', label: 'Backend', icon: <Server size={14} /> },
    { id: 'tools', label: 'Tools', icon: <Wrench size={14} /> },
    { id: 'ai', label: 'AI Workflow', icon: <Sparkles size={14} /> },
  ] as const;

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-[#C5A880]/[0.01] blur-[150px] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-16 text-center">
          <span className="text-[10px] font-bold font-sora tracking-[0.25em] text-primary uppercase">
            TECHNICAL ARSENAL
          </span>
          <h2 className="text-3xl md:text-5xl font-sora text-white leading-tight font-extrabold tracking-tight mt-2">
            Core <span className="font-serif italic font-normal text-primary">Competencies</span> & <span className="font-serif italic font-normal text-primary">AI Workflow</span>
          </h2>
          <div className="w-16 h-[1px] bg-primary mt-4" />
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-sm text-[10px] font-bold font-sora tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary border-primary text-black font-black'
                  : 'bg-[#131315]/80 border-white/[0.04] text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid layout */}
        <div className="min-h-[260px] max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {profileData.skills[activeTab].map((skill, index) => {
                const isFeatured = index === 0 || (activeTab === 'frontend' && index === 2) || (activeTab === 'backend' && index === 1);
                const desc = skillDescriptions[skill.name];
                
                return (
                  <div
                    key={skill.name}
                    className={`bg-[#131315]/80 backdrop-blur-md border border-white/[0.04] rounded-sm p-6 flex flex-col justify-between group transition-all duration-500 hover:border-primary/20 hover:-translate-y-1 text-left ${
                      isFeatured ? 'col-span-1 md:col-span-2 min-h-[140px]' : 'col-span-1 min-h-[140px]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm md:text-base font-semibold font-sora text-white group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        {isFeatured && desc && (
                          <p className="text-[11px] text-[#A0A0A5] leading-relaxed font-sans max-w-md mt-1">
                            {desc}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 text-primary transition-transform duration-300 group-hover:scale-105">
                        {getSkillIcon(skill.name)}
                      </div>
                    </div>
                    
                    {/* Clean custom badges */}
                    <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-6">
                      <span className="text-[9px] text-gray-500 font-mono tracking-widest">CAPABILITY</span>
                      <span className={`text-[9px] font-bold font-mono tracking-widest px-2.5 py-0.5 rounded-sm border ${
                        skill.level === 'Expert' ? 'bg-[#C5A880]/10 border-[#C5A880]/30 text-primary' :
                        skill.level === 'Advanced' ? 'bg-[#E07A5F]/10 border-[#E07A5F]/20 text-[#E07A5F]' :
                        'bg-white/5 border-white/10 text-gray-400'
                      }`}>
                        {skill.level.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
