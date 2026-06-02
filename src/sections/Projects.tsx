import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import profileData from '../profile.json';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  businessGoal: string;
  challenges: string;
  learnings: string;
  techStack: string[];
  downloadPath: string;
  github: string;
  demo: string;
  gallery: { type: string; title: string; description: string }[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const personalProjects = profileData.projects.filter(p => p.id === 'stock-ai');
  const academicProjects = profileData.projects.filter(p => p.id !== 'stock-ai');

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0C0C0F]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full flex flex-col gap-20">
        
        {/* SECTION 1: INDEPENDENT RESEARCH & PRODUCTS */}
        <div>
          <div className="flex flex-col items-center gap-2 mb-10 text-center">
            <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
              INDEPENDENT RESEARCH & DEVELOPMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white max-w-3xl leading-tight">
              Independent Research & Practical Products
            </h2>
            <div className="bg-yellow-500/[0.03] border border-yellow-500/20 backdrop-blur-md rounded-2xl p-4 max-w-2xl mx-auto mt-4 text-center shadow-[0_0_15px_rgba(234,179,8,0.02)] hover:border-yellow-500/35 transition-all duration-300">
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                🚀 <span className="text-yellow-400 font-bold">Self-directed software solutions</span> focused on <span className="text-yellow-400 font-semibold">optimizing investment strategies</span> and delivering practical value to <span className="text-white font-bold underline decoration-yellow-500/40 decoration-2">retail investors (F0, F1)</span> and <span className="text-white font-bold underline decoration-yellow-500/40 decoration-2">newly entered stockbrokers</span> in the Vietnamese market.
              </p>
            </div>
            <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
          </div>

          <div className="max-w-xl mx-auto">
            {personalProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>

        {/* SECTION 2: ACADEMIC & COURSE PROJECTS */}
        <div>
          <div className="flex flex-col items-center gap-2 mb-10 text-center">
            <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
              ACADEMIC & COURSE PROJECTS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-sora text-white max-w-3xl">
              Academic & Software Engineering Projects
            </h2>
            <p className="text-xs text-gray-400 font-sans max-w-2xl mt-2 leading-relaxed">
              Large-scale software applications developed during the Software Engineering curriculum at FPT University, requiring robust architectural integrity and resource optimization.
            </p>
            <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {academicProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>

        {/* Detailed Fullscreen Modal */}
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
