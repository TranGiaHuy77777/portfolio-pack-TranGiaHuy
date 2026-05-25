import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Layers, Download } from 'lucide-react';

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#121216]/60 backdrop-blur-md border border-white/5 hover:border-primary/20 rounded-2xl p-6 flex flex-col justify-between h-[360px] overflow-hidden transition-colors duration-300"
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
              rgba(109, 93, 246, 0.12),
              transparent 80%
            )
          `
        }}
      />

      <div className="z-10 relative">
        <div className="flex justify-between items-center mb-3 gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded text-primary font-bold font-mono">
              {project.role}
            </span>
            {project.id === 'mumcare-platform' && (
              <span className="text-[8px] bg-accent/20 border border-accent/30 px-1.5 py-0.5 rounded text-accent font-bold font-sora tracking-wide">
                📱 MOBILE + 💻 WEB
              </span>
            )}
            {project.subject && (
              <span className="text-[8px] bg-purple-950/40 border border-purple-500/20 px-1.5 py-0.5 rounded text-purple-400 font-bold font-mono tracking-wider">
                📚 MÔN: {project.subject}
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-500 font-mono flex-shrink-0">
            ID: {project.id.toUpperCase()}
          </span>
        </div>

        <h3 className="text-xl font-bold font-sora text-white mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">
          {project.subtitle}
        </p>

        {/* Tech Stack items */}
        <div className="flex flex-wrap gap-1 mb-6">
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
        {/* Custom Actions */}
        <button
          onClick={onOpenDetails}
          className="w-full py-2.5 px-4 bg-glow-gradient text-black font-sora font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-transform duration-300 group-hover:scale-[1.02] shadow-neon-glow"
        >
          <Layers size={14} />
          VIEW INTERACTIVE DEMO
        </button>

        <div className={`grid ${project.github ? (project.githubBE ? 'grid-cols-3' : 'grid-cols-2') : 'grid-cols-1'} gap-1.5 mt-1`}>
          <a
            href={project.downloadPath}
            download
            onClick={(e) => e.stopPropagation()}
            className="py-2 bg-[#181820] hover:bg-[#20202a] border border-white/5 text-gray-300 font-sora font-semibold text-[9px] rounded-lg flex items-center justify-center gap-1 transition-colors"
          >
            <Download size={10} />
            SOURCE (.RAR)
          </a>
          {project.github && (
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
      </div>
    </motion.div>
  );
}
