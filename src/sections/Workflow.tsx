import { motion } from 'framer-motion';
import { Search, FileSearch, Palette, Code, Gauge, CheckSquare } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      num: '01',
      title: 'Research',
      icon: <Search size={20} />,
      desc: 'Analyze business domains, research operational bottlenecks, and gather direct feedback from end users.',
    },
    {
      num: '02',
      title: 'Analysis',
      icon: <FileSearch size={20} />,
      desc: 'Map business workflows, specify technical constraints, design database schemas, and establish clean system architectures.',
    },
    {
      num: '03',
      title: 'Design',
      icon: <Palette size={20} />,
      desc: 'Design modern glassmorphic layouts, establish system style tokens, and implement fluid micro-animations.',
    },
    {
      num: '04',
      title: 'Development',
      icon: <Code size={20} />,
      desc: 'Develop robust React/TypeScript interfaces, construct Spring Boot REST endpoints, and implement advanced state management.',
    },
    {
      num: '05',
      title: 'Optimization',
      icon: <Gauge size={20} />,
      desc: 'Audit bundle sizes, refine render pipelines for 60 FPS performance, and implement robust anti-spam security gateways.',
    },
    {
      num: '06',
      title: 'Deployment',
      icon: <CheckSquare size={20} />,
      desc: 'Package deployment assets, configure CI/CD pipelines, and automate staging deployments to Vercel/Netlify.',
    },
  ];

  return (
    <section id="workflow" className="py-24 relative overflow-hidden bg-[#0C0C0F]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(158,123,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
            METHODOLOGY
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white">
            Structured Development Workflow
          </h2>
          <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
        </div>

        {/* Workflow steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between h-[180px] relative overflow-hidden"
            >
              {/* Giant background number */}
              <div className="absolute -bottom-4 -right-2 text-7xl font-extrabold text-white/[0.02] font-sora select-none pointer-events-none">
                {step.num}
              </div>

              <div className="flex justify-between items-start z-10 relative">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary group-hover:text-accent transition-colors">
                  {step.icon}
                </div>
                <span className="text-[10px] font-bold font-mono text-gray-500 tracking-wider">
                  STEP {step.num}
                </span>
              </div>

              <div className="z-10 relative mt-4">
                <h3 className="text-base font-bold font-sora text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
