import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Layers, Download, Lock, Crown, Sparkles } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  techStack: string[];
  downloadPath: string;
  github: string;
  githubBE?: string;
  demo: string;
  subject?: string;
  cover?: string;
}

interface ProjectCardProps {
  project: Project;
  onOpenDetails: () => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Custom glow coordinates relative to mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    mouseX.set(x);
    mouseY.set(y);
  };

  const isStockAi = project.id === 'stock-ai';
  const isParking = project.id === 'parking-building-management';
  const isMumCare = project.id === 'mumcare-platform';

  const getCardBorderClass = () => {
    if (isStockAi) return 'border-yellow-500/45 hover:border-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.06)] hover:shadow-[0_0_35px_rgba(234,179,8,0.25)] scale-[1.01] hover:scale-[1.02]';
    if (isParking) return 'border-cyan-500/45 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.06)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] scale-[1.01] hover:scale-[1.02]';
    if (isMumCare) return 'border-pink-500/45 hover:border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.06)] hover:shadow-[0_0_35px_rgba(236,72,153,0.25)] scale-[1.01] hover:scale-[1.02]';
    return 'border-white/5 hover:border-primary/20 shadow-none';
  };

  const getRadialGlowColor = () => {
    if (isStockAi) return 'rgba(234, 179, 8, 0.16)';
    if (isParking) return 'rgba(6, 182, 212, 0.16)';
    if (isMumCare) return 'rgba(236, 72, 153, 0.16)';
    return 'rgba(109, 93, 246, 0.12)';
  };

  const getTitleHoverClass = () => {
    if (isStockAi) return 'group-hover:text-yellow-400';
    if (isParking) return 'group-hover:text-cyan-400';
    if (isMumCare) return 'group-hover:text-pink-400';
    return 'group-hover:text-primary';
  };

  const getRoleBadgeClass = () => {
    if (isStockAi) return 'bg-yellow-500/10 border-yellow-500/35 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.08)]';
    if (isParking) return 'bg-cyan-500/10 border-cyan-500/35 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.08)]';
    if (isMumCare) return 'bg-pink-500/10 border-pink-500/35 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.08)]';
    return 'bg-primary/10 border-primary/20 text-primary';
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative bg-[#121216]/60 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between h-[490px] overflow-hidden transition-all duration-500 border ${getCardBorderClass()}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Radial Hover Glow Background effect */}
      <motion.div
        className="absolute -inset-px pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              ${getRadialGlowColor()},
              transparent 80%
            )
          `
        }}
      />

      <div className="z-10 relative">
        {/* Cover Image */}
        {project.cover && (
          <div className={`w-full h-32 rounded-xl overflow-hidden mb-4 border relative bg-black/40 ${
            isStockAi ? 'border-yellow-500/25' : isParking ? 'border-cyan-500/25' : isMumCare ? 'border-pink-500/25' : 'border-white/5'
          }`}>
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-80" />

            {/* Glowing Golden Crown Badge */}
            {isStockAi && (
              <div className="absolute top-2 right-2 z-20 bg-black/75 backdrop-blur-md border border-yellow-500/40 rounded-lg px-2 py-0.5 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)] flex items-center gap-1 text-[8px] font-bold font-sora uppercase tracking-wider animate-pulse">
                <Crown size={10} className="fill-yellow-400" />
                <span>PREMIER</span>
              </div>
            )}

            {/* Twinkling Cyan Sparkles for Smart Parking */}
            {isParking && (
              <div className="absolute top-2 right-2 z-20 bg-black/75 backdrop-blur-md border border-cyan-500/40 rounded-lg px-2 py-0.5 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-center gap-1.5 text-[8px] font-bold font-sora uppercase tracking-wider animate-pulse">
                <Sparkles size={10} className="fill-cyan-400 text-cyan-400" />
                <span>SMART</span>
              </div>
            )}

            {/* Twinkling Pink Sparkles for MumCare */}
            {isMumCare && (
              <div className="absolute top-2 right-2 z-20 bg-black/75 backdrop-blur-md border border-pink-500/40 rounded-lg px-2 py-0.5 text-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.4)] flex items-center gap-1.5 text-[8px] font-bold font-sora uppercase tracking-wider animate-pulse">
                <Sparkles size={10} className="fill-pink-400 text-pink-400" />
                <span>PLATFORM</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mb-3 gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono border ${getRoleBadgeClass()}`}>
              {project.role}
            </span>
            {project.id === 'mumcare-platform' && (
              <span className="text-[8px] bg-accent/20 border border-accent/30 px-1.5 py-0.5 rounded text-accent font-bold font-sora tracking-wide">
                📱 MOBILE + 💻 WEB
              </span>
            )}
            {project.subject && (
              <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold font-mono tracking-wider border ${
                isStockAi
                  ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                  : 'bg-purple-950/40 border-purple-500/20 text-purple-400'
              }`}>
                {project.id === 'stock-ai' ? '🔬 RESEARCH: ' : '📚 COURSE: '}{project.subject}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-mono flex-shrink-0 ${
            isStockAi ? 'text-yellow-500/60 font-bold' : isParking ? 'text-cyan-500/60 font-bold' : isMumCare ? 'text-pink-500/60 font-bold' : 'text-gray-500'
          }`}>
            ID: {project.id.toUpperCase()}
          </span>
        </div>

        <h3 className={`text-lg font-bold font-sora text-white mb-1 transition-colors flex items-center gap-1.5 line-clamp-1 ${getTitleHoverClass()}`}>
          <span>{project.title}</span>
          {isStockAi && (
            <span className="text-[7px] px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/35 text-yellow-400 font-bold rounded-md tracking-wider uppercase font-sora flex-shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.15)]">
              BUSINESS
            </span>
          )}
        </h3>
        <p className="text-[11px] text-gray-400 font-sans leading-relaxed mb-3 line-clamp-2 h-[34px]">
          {project.subtitle}
        </p>

        {/* Tech Stack items */}
        <div className="flex flex-wrap gap-1 mb-2">
          {project.techStack.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="text-[9px] bg-white/5 border border-white/5 rounded px-2 py-0.5 text-gray-300 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[9px] bg-white/5 border border-white/5 rounded px-1.5 py-0.5 text-gray-400 font-mono">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      <div className="z-10 relative flex flex-col gap-2">
        {/* Buttons Grid */}
        <button
          onClick={onOpenDetails}
          className={`w-full py-2 font-sora font-extrabold text-[10px] rounded-lg flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer ${
            isStockAi
              ? 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.35)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] font-black'
              : 'bg-glow-gradient text-black shadow-neon-glow'
          }`}
        >
          <Layers size={14} />
          VIEW INTERACTIVE DEMO
        </button>

        {/* Buttons Grid */}
        <div className={`grid ${project.github && project.github !== 'private' ? (project.githubBE ? 'grid-cols-3' : 'grid-cols-2') : 'grid-cols-1'} gap-1.5 mt-1`}>
          <a
            href={project.downloadPath}
            download={!project.downloadPath.startsWith('http')}
            target={project.downloadPath.startsWith('http') ? '_blank' : undefined}
            rel={project.downloadPath.startsWith('http') ? 'noreferrer' : undefined}
            onClick={(e) => e.stopPropagation()}
            className="py-2 bg-[#181820] hover:bg-[#20202a] border border-white/5 text-gray-300 font-sora font-semibold text-[9px] rounded-lg flex items-center justify-center gap-1 transition-colors"
          >
            <Download size={10} />
            SOURCE {project.id === 'stock-ai' ? '(.EXE)' : '(.RAR)'}
          </a>
          {project.github && project.github !== 'private' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-2 bg-[#181820] hover:bg-[#20202a] border border-white/5 text-gray-300 font-sora font-semibold text-[9px] rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <ExternalLink size={10} />
              {project.githubBE ? 'GIT FE' : 'GITHUB'}
            </a>
          )}
          {project.githubBE && (
            <a
              href={project.githubBE}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-2 bg-[#181820] hover:bg-[#20202a] border border-white/5 text-gray-300 font-sora font-semibold text-[9px] rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <ExternalLink size={10} />
              GIT BE
            </a>
          )}
        </div>

        {project.github === 'private' && (
          <p className="text-[8px] text-red-500 font-bold font-sans italic text-center mt-2.5 flex items-center justify-center gap-1">
            <Lock size={8} className="text-red-500 flex-shrink-0" />
            Private repository. To view the source code, please contact me directly via Zalo or the contact form below.
          </p>
        )}
      </div>
    </motion.div>
  );
}
