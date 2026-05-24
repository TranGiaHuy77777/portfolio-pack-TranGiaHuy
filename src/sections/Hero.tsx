import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Cpu } from 'lucide-react';
import Scene3D from '../components/Scene3D';
import MagneticButton from '../components/MagneticButton';
import profileData from '../profile.json';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden py-24 z-10">
      {/* 3D background */}
      <Scene3D />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Main Content (7 cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col items-start gap-6 text-left"
        >
          {/* Welcome Tagline */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
          >
            <Sparkles size={12} className="text-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold font-sora tracking-wide text-secondary uppercase">
              {profileData.positioning}
            </span>
          </motion.div>

          {/* Name & Role */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <h1 className="text-5xl md:text-7xl font-extrabold font-sora tracking-tight leading-none text-white">
              {profileData.name.toUpperCase()}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold font-sora bg-glow-gradient bg-clip-text text-transparent mt-2">
              {profileData.role}
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-400 font-sans leading-relaxed max-w-2xl"
          >
            {profileData.tagline}
          </motion.p>

          {/* Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
            <MagneticButton
              onClick={() => handleScrollTo('#projects')}
              className="py-3 px-6 bg-glow-gradient text-black font-sora font-bold text-sm rounded-xl flex items-center gap-2 shadow-neon-glow hover:scale-105 active:scale-95 transition-transform"
            >
              Explore Projects
              <ArrowRight size={16} />
            </MagneticButton>

            <MagneticButton
              onClick={() => handleScrollTo('#about')}
              className="py-3 px-6 bg-white/5 border border-white/10 hover:border-gray-500 text-gray-300 hover:text-white font-sora font-semibold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all"
            >
              About Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats & Positioning Cards (4 cols) */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-4 w-full">
          {profileData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between h-[120px]"
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold font-sora text-white">
                  {stat.value}
                </span>
                {idx === 0 ? (
                  <Code size={18} className="text-primary" />
                ) : idx === 1 ? (
                  <Sparkles size={18} className="text-accent" />
                ) : (
                  <Cpu size={18} className="text-secondary" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold font-sora text-gray-300">
                  {stat.label}
                </h4>
                <p className="text-[10px] text-gray-500 leading-snug mt-0.5">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
