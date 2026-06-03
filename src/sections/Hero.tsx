import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Award, BookOpen } from 'lucide-react';
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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden py-32 z-10 bg-background">
      {/* 3D background */}
      <Scene3D />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Main Content (8 cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col items-start gap-8 text-left"
        >
          {/* Welcome Tagline */}
          <motion.div
            variants={itemVariants}
            className="text-[10px] font-bold font-sora tracking-[0.25em] text-primary uppercase"
          >
            {profileData.positioning}
          </motion.div>

          {/* Name & Role */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2 max-w-3xl">
            <h1 className="text-6xl md:text-8xl tracking-tighter leading-[0.95] text-white">
              <span className="font-light block text-white/95">TRAN GIA</span>
              <span className="font-extrabold font-sora block text-primary mt-2">HUY</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-sora tracking-tight text-white/90 mt-4 flex flex-wrap gap-x-2">
              <span className="font-light">Specializing in</span>
              <span className="font-extrabold text-primary">{profileData.role}</span>
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm text-[#A0A0A5] font-sans leading-relaxed max-w-xl"
          >
            {profileData.tagline}
          </motion.p>

          {/* Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
            <MagneticButton
              onClick={() => handleScrollTo('#projects')}
              className="py-3 px-8 bg-primary text-black font-sora font-semibold text-[10px] tracking-widest uppercase rounded-sm border border-primary btn-editorial transition-all cursor-pointer flex items-center gap-2"
            >
              Explore Projects
              <ArrowRight size={12} />
            </MagneticButton>

            <MagneticButton
              onClick={() => handleScrollTo('#about')}
              className="py-3 px-8 bg-transparent text-gray-300 font-sora font-semibold text-[10px] tracking-widest uppercase rounded-sm btn-editorial-outline transition-all cursor-pointer"
            >
              About Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats & Positioning Cards (4 cols) */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-5 w-full">
          {profileData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#131315]/80 border border-white/[0.04] p-6 rounded-sm flex flex-col justify-between h-[120px] hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl font-serif italic font-light text-primary">
                  {stat.value}
                </span>
                <div className="text-primary/70">
                  {idx === 0 ? (
                    <GraduationCap size={16} />
                  ) : idx === 1 ? (
                    <Award size={16} />
                  ) : (
                    <BookOpen size={16} />
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold font-sora tracking-wider text-white uppercase">
                  {stat.label}
                </h4>
                <p className="text-[9px] text-[#A0A0A5] leading-relaxed mt-1 font-sans">
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
