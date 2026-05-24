import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Wrench, Sparkles, Award } from 'lucide-react';
import profileData from '../profile.json';

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
                    <Award size={14} className="text-gray-500 group-hover:text-accent transition-colors" />
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
