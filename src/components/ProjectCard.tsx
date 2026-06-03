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
  businessGoal?: string;
  challenges?: string;
  subject?: string;
  cover?: string;
}

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
  onOpenDetails: () => void;
}

export default function ProjectCard({ project, isFeatured = false, onOpenDetails }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Custom subtle white light coordinate relative to mouse position
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative bg-[#131315]/80 backdrop-blur-md rounded-sm p-6 md:p-8 flex flex-col justify-between transition-all duration-500 border text-left ${
        isFeatured
          ? 'min-h-[500px] lg:min-h-[480px] border-primary/20 hover:border-primary/40 hover:-translate-y-1'
          : 'min-h-[440px] border-white/[0.04] hover:border-primary/25 hover:-translate-y-1'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle white radial highlight on hover */}
      <motion.div
        className="absolute -inset-px pointer-events-none rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(197, 168, 128, 0.03),
              transparent 80%
            )
          `
        }}
      />

      <div className="z-10 relative flex flex-col gap-5 flex-1">
        {/* Cover Image & Layout Grid */}
        <div className={`flex flex-col ${isFeatured ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''} gap-4`}>
          {project.cover && (
            <div className={`w-full rounded-sm overflow-hidden border relative bg-black/40 border-white/[0.04] ${
              isFeatured ? 'lg:col-span-5 h-44 lg:h-full min-h-[160px]' : 'h-36'
            }`}>
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent opacity-80" />

              {/* Cover Badges */}
              {isStockAi && (
                <div className="absolute top-3 right-3 z-20 bg-[#131315]/95 border border-primary/20 rounded-sm px-2 py-0.5 text-primary flex items-center gap-1.5 text-[8px] font-bold font-sora uppercase tracking-wider">
                  <Crown size={10} className="fill-primary" />
                  <span>PREMIER</span>
                </div>
              )}

              {isParking && (
                <div className="absolute top-3 right-3 z-20 bg-[#131315]/95 border border-primary/20 rounded-sm px-2 py-0.5 text-primary flex items-center gap-1.5 text-[8px] font-bold font-sora uppercase tracking-wider">
                  <Sparkles size={10} className="fill-primary text-primary" />
                  <span>SYSTEM</span>
                </div>
              )}

              {isMumCare && (
                <div className="absolute top-3 right-3 z-20 bg-[#131315]/95 border border-primary/20 rounded-sm px-2 py-0.5 text-primary flex items-center gap-1.5 text-[8px] font-bold font-sora uppercase tracking-wider">
                  <Sparkles size={10} className="fill-primary text-primary" />
                  <span>PLATFORM</span>
                </div>
              )}
            </div>
          )}

          {/* Details Column */}
          <div className={`${isFeatured ? 'lg:col-span-7' : ''} flex flex-col justify-start`}>
            <div className="flex justify-between items-center mb-3 gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] px-2 py-0.5 rounded-sm font-bold font-mono border bg-primary/5 border-primary/20 text-primary tracking-wider uppercase">
                  {project.role}
                </span>
                {project.subject && (
                  <span className="text-[8px] px-2 py-0.5 rounded-sm font-bold font-mono tracking-widest border bg-white/5 border-white/10 text-gray-400">
                    {project.id === 'stock-ai' ? '🔬 ' : '📚 '}{project.subject}
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-bold font-sora text-white mb-2 group-hover:text-primary transition-colors flex flex-wrap items-center gap-1.5">
              <span>{project.title}</span>
              {isStockAi && (
                <span className="text-[7px] px-1.5 py-0.5 bg-secondary/10 border border-secondary/35 text-secondary font-bold rounded-sm tracking-wider uppercase font-sora">
                  PROD ACTIVE
                </span>
              )}
            </h3>

            <p className="text-[11px] md:text-xs text-[#A0A0A5] font-sans leading-relaxed mb-4">
              {project.subtitle}
            </p>

            {/* Asymmetrical Detail Additions: Business Goals & Challenges for Featured card */}
            {isFeatured && (
              <div className="flex flex-col gap-3 border-t border-white/[0.04] pt-4 mt-1 font-sans text-xs">
                {project.businessGoal && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold font-sora tracking-widest text-primary uppercase">Business Goal</span>
                    <p className="text-[#A0A0A5] leading-relaxed text-[11px]">{project.businessGoal}</p>
                  </div>
                )}
                {project.challenges && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold font-sora tracking-widest text-secondary uppercase">Core Challenge</span>
                    <p className="text-[#A0A0A5] leading-relaxed text-[11px]">{project.challenges}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-white/[0.04]">
          {project.techStack.slice(0, isFeatured ? 8 : 4).map(tech => (
            <span
              key={tech}
              className="text-[9px] bg-[#0B0B0C] border border-white/[0.04] rounded-sm px-2 py-0.5 text-gray-300 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > (isFeatured ? 8 : 4) && (
            <span className="text-[9px] bg-[#0B0B0C] border border-white/[0.04] rounded-sm px-1.5 py-0.5 text-gray-500 font-mono">
              +{project.techStack.length - (isFeatured ? 8 : 4)}
            </span>
          )}
        </div>
      </div>

      <div className="z-10 relative flex flex-col gap-2 mt-6 pt-4 border-t border-white/[0.04]">
        {/* Buttons Grid */}
        <button
          onClick={onOpenDetails}
          className={`w-full py-2.5 font-sora font-semibold text-[10px] tracking-widest uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isFeatured
              ? 'bg-primary border border-primary text-black btn-editorial'
              : 'bg-transparent text-white btn-editorial-outline'
          }`}
        >
          <Layers size={12} />
          VIEW INTERACTIVE DEMO
        </button>

        {/* Source/Github Links */}
        <div className={`grid ${project.github && project.github !== 'private' ? (project.githubBE ? 'grid-cols-3' : 'grid-cols-2') : 'grid-cols-1'} gap-2 mt-1`}>
          <a
            href={project.downloadPath}
            download={!project.downloadPath.startsWith('http')}
            target={project.downloadPath.startsWith('http') ? '_blank' : undefined}
            rel={project.downloadPath.startsWith('http') ? 'noreferrer' : undefined}
            onClick={(e) => e.stopPropagation()}
            className="py-2 bg-[#0B0B0C] hover:bg-[#131315] border border-white/[0.04] text-gray-400 hover:text-white font-sora font-semibold text-[9px] tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download size={10} />
            {project.id === 'stock-ai' ? '(.EXE)' : '(.RAR)'}
          </a>
          {project.github && project.github !== 'private' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-2 bg-[#0B0B0C] hover:bg-[#131315] border border-white/[0.04] text-gray-400 hover:text-white font-sora font-semibold text-[9px] tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink size={10} />
              {project.githubBE ? 'FE CODE' : 'GITHUB'}
            </a>
          )}
          {project.githubBE && (
            <a
              href={project.githubBE}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-2 bg-[#0B0B0C] hover:bg-[#131315] border border-white/[0.04] text-gray-400 hover:text-white font-sora font-semibold text-[9px] tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink size={10} />
              BE CODE
            </a>
          )}
        </div>

        {project.github === 'private' && (
          <p className="text-[8px] text-[#E07A5F] font-bold font-sans italic text-center mt-2 flex items-center justify-center gap-1">
            <Lock size={8} className="text-[#E07A5F] flex-shrink-0" />
            Private repository. Contact me via Zalo or details form to request access.
          </p>
        )}
      </div>
    </motion.div>
  );
}
