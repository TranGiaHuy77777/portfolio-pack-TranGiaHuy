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

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0C0C0F]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
            PRODUCT EXHIBIT
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white">
            Engineering Projects as Products
          </h2>
          <p className="text-xs text-gray-400 font-sans max-w-xl mt-1 leading-relaxed">
            Every project below is presented with a deep breakdown of business goals, technical architecture challenges, and lessons learned. Click "View Interactive Demo" to simulate live workflows.
          </p>
          <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {profileData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={() => setSelectedProject(project)}
            />
          ))}
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
