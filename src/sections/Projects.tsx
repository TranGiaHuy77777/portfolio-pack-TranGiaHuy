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
  subject?: string;
  cover?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const personalProjects = profileData.projects.filter(p => p.id === 'stock-ai');
  const academicProjects = profileData.projects.filter(p => p.id !== 'stock-ai');

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,168,128,0.015),transparent_70%)] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full flex flex-col gap-12">
        {/* Unified Projects Section Header */}
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <span className="text-[10px] font-bold font-sora tracking-[0.25em] text-primary uppercase">
            PROJECTS SHOWCASE
          </span>
          <h2 className="text-3xl md:text-5xl font-sora text-white leading-tight font-extrabold tracking-tight mt-2">
            Selected <span className="font-serif italic font-normal text-primary">Works</span> & Engineering
          </h2>
          <div className="w-16 h-[1px] bg-primary mt-4" />
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl w-full mx-auto">
          {/* Left Column: Featured Project (2/3 width) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <span className="text-[9px] font-bold font-mono tracking-widest text-primary uppercase text-left pl-1">
              [ featured product & research ]
            </span>
            {personalProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isFeatured={true}
                onOpenDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* Right Column: Other Projects (1/3 width) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-[9px] font-bold font-mono tracking-widest text-primary uppercase text-left pl-1">
              [ systems & mobile engineering ]
            </span>
            <div className="flex flex-col gap-6">
              {academicProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFeatured={false}
                  onOpenDetails={() => setSelectedProject(project)}
                />
              ))}
            </div>
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
