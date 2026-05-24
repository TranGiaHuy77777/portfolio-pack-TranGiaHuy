import { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
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

const ARCHIVE_PROJECTS = [
  {
    title: 'StoreOps AI - Retail NLP & Ticket Assistant',
    role: 'Requirement Analyst & Fullstack Dev',
    tech: ['React', 'Express', 'MongoDB', 'OpenAI API'],
    desc: 'Hệ thống phân tích phản hồi khách hàng thông qua mô hình ngôn ngữ lớn NLP và quản lý phân bổ tác vụ vận hành tự động cho cửa hàng bán lẻ, giúp tối ưu hóa 32% thời gian giải quyết khiếu nại của khách hàng.'
  },
  {
    title: 'EcoSensor IoT Environmental Gateway',
    role: 'Embedded Systems & Protocol Architect',
    tech: ['C++', 'ESP32', 'MQTT', 'Redis'],
    desc: 'Mạng lưới cảm biến không dây thu thập dữ liệu môi trường và chỉ số chất lượng không khí trong thời gian thực, giao tiếp qua giao thức MQTT Broker và lưu dữ liệu đệm tại hàng đợi Redis để duy trì nguồn năng lượng thấp.'
  },
  {
    title: 'E-Commerce High-Concurrency Platform',
    role: 'Backend API Engineer',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    desc: 'Thiết kế cổng thanh toán và xử lý phân trang giao dịch mua sắm tốc độ cao. Thực hiện phân vùng bảng chỉ mục Database nâng cao giúp giải quyết hoàn toàn vấn đề nghẽn luồng xử lý tài nguyên (concurrency index collision).'
  },
  {
    title: 'Real-time Chat Socket Message Engine',
    role: 'Lead Fullstack Developer',
    tech: ['Node.js', 'Express', 'Socket.io', 'Redis Pub/Sub'],
    desc: 'Bộ công cụ Chat Socket đa kênh đồng bộ hóa trạng thái hoạt động tức thời của hàng ngàn tài khoản hoạt động đồng thời. Sử dụng hàng đợi Redis Broker giúp tối ưu tốc độ phân phối tin nhắn cực nhanh dưới 15ms.'
  },
  {
    title: 'RFID Recurring Membership Billing Engine',
    role: 'Backend Database Developer',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Cron Jobs'],
    desc: 'Hệ thống tự động đồng bộ hóa lịch sử xe ra vào bãi đỗ, tính toán chi phí gửi xe định kỳ hàng tháng và tự động trừ thẻ RFID liên kết thông qua trình lên lịch Cron Jobs tự phục hồi của Spring Framework.'
  }
];

function ArchiveCabinet() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
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

  const activeProject = ARCHIVE_PROJECTS[activeIndex];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#121216]/40 backdrop-blur-md border border-dashed border-white/10 hover:border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 justify-between min-h-[320px] overflow-hidden transition-colors duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute -inset-px pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(158, 123, 255, 0.08),
              transparent 80%
            )
          `
        }}
      />

      {/* Left Column: Active Project Details */}
      <div className="z-10 relative flex-1 flex flex-col justify-between text-left md:max-w-[45%]">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 bg-accent/15 rounded text-accent flex items-center justify-center">
              <FolderOpen size={14} />
            </span>
            <span className="text-[10px] tracking-wider text-accent font-bold uppercase font-sora">
              PAST WORKS & REPO ARCHIVES
            </span>
          </div>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2"
          >
            <span className="text-[9px] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded text-primary font-bold font-mono w-fit">
              {activeProject.role}
            </span>
            <h3 className="text-xl font-bold font-sora text-white leading-tight">
              {activeProject.title}
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed mt-2">
              {activeProject.desc}
            </p>
          </motion.div>
        </div>

        <motion.div
          key={`tech-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-wrap gap-1 mt-6"
        >
          {activeProject.tech.map(tech => (
            <span
              key={tech}
              className="text-[9px] bg-white/5 border border-white/5 rounded px-2 py-0.5 text-gray-300 font-mono"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right Column: Interactive Archives Registry Panel */}
      <div className="z-10 relative flex-1 flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 md:max-w-[50%]">
        <div className="text-gray-500 font-sans font-bold text-[9px] border-b border-white/5 pb-2 text-left mb-1 uppercase tracking-widest flex items-center justify-between">
          <span>PROJECTS IN ARCHIVE (5)</span>
          <span className="text-[8px] text-primary font-mono lowercase">click row to toggle preview</span>
        </div>

        {ARCHIVE_PROJECTS.map((proj, idx) => (
          <button
            key={proj.title}
            onClick={() => setActiveIndex(idx)}
            className={`w-full p-2.5 rounded-xl border text-left font-sans flex items-center justify-between transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? 'bg-primary/15 border-primary/45 text-white shadow-neon-glow'
                : 'bg-[#181820]/30 border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex flex-col gap-0.5 truncate pr-2">
              <span className={`text-[10px] font-bold ${activeIndex === idx ? 'text-[#00D9FF]' : 'text-white'}`}>
                {proj.title}
              </span>
              <span className="text-[8px] text-gray-500 font-mono truncate">{proj.role}</span>
            </div>
            
            <div className="flex-shrink-0 flex items-center justify-center">
              {activeIndex === idx ? (
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              ) : (
                <div className="w-1 h-1 rounded-full bg-gray-700" />
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
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

          {/* Special Archive Card (Spans both columns on md/lg screens) */}
          <div className="md:col-span-2 mt-4">
            <ArchiveCabinet />
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
