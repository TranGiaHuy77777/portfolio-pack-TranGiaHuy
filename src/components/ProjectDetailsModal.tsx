import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check, Sparkles } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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
  gallery: { type: string; image?: string; title: string; description: string }[];
}

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

// ----------------------------------------------------
// 1. SMART PARKING LIVE MOCKUPS
// ----------------------------------------------------
function ParkingDashboardMockup() {
  const [slots, setSlots] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      isOccupied: Math.random() > 0.4,
      floor: i < 10 ? 'Floor 1' : 'Floor 2'
    }))
  );

  const occupiedCount = slots.filter(s => s.isOccupied).length;
  const vacantCount = slots.length - occupiedCount;

  const toggleSlot = (id: number) => {
    setSlots(prev => prev.map(s => s.id === id ? { ...s, isOccupied: !s.isOccupied } : s));
  };

  return (
    <div className="bg-[#121216] border border-white/5 rounded-xl p-4 w-full h-full flex flex-col justify-between font-mono text-xs">
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
        <span className="text-[#00D9FF] flex items-center gap-1 font-sora font-semibold">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          PARKING CONTROL HUB
        </span>
        <span className="text-gray-400">STATUS: ACTIVE</span>
      </div>
      
      {/* KPI Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-[#181820] border border-white/5 p-2 rounded text-center">
          <div className="text-gray-400 font-sans">TOTAL</div>
          <div className="text-base text-white font-bold">{slots.length}</div>
        </div>
        <div className="bg-[#181820] border border-white/5 p-2 rounded text-center">
          <div className="text-red-400 font-sans">OCCUPIED</div>
          <div className="text-base font-bold">{occupiedCount}</div>
        </div>
        <div className="bg-[#181820] border border-white/5 p-2 rounded text-center">
          <div className="text-green-400 font-sans">VACANT</div>
          <div className="text-base font-bold">{vacantCount}</div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-[140px] p-1 bg-black/30 rounded border border-white/5">
        {slots.map(s => (
          <button
            key={s.id}
            onClick={() => toggleSlot(s.id)}
            className={`p-2 rounded border text-center font-bold transition-all duration-300 ${
              s.isOccupied
                ? 'bg-red-950/40 border-red-500/30 text-red-400'
                : 'bg-green-950/40 border-green-500/30 text-green-400 hover:scale-105 hover:bg-green-900/40'
            }`}
            title="Click to toggle status"
          >
            P{s.id}
          </button>
        ))}
      </div>
      <div className="text-[10px] text-gray-500 mt-2 text-center font-sans">
        *Click on any slot P1-P20 to toggle occupied/vacant status in real-time.
      </div>
    </div>
  );
}

function ParkingReservationMockup() {
  const [plate, setPlate] = useState('59A-123.45');
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [resSuccess, setResSuccess] = useState(false);

  const handleReserve = () => {
    if (!selectedSlot) return;
    setResSuccess(true);
    canvasConfetti({ particleCount: 40, spread: 60, colors: ['#6D5DF6', '#00D9FF'] });
    setTimeout(() => setResSuccess(false), 4000);
  };

  return (
    <div className="bg-[#121216] border border-white/5 rounded-xl p-4 w-full h-full flex flex-col justify-between font-mono text-xs">
      <div className="border-b border-white/5 pb-2 mb-2">
        <span className="text-[#9E7BFF] font-sora font-semibold">RESERVATION TERMINAL</span>
      </div>

      {resSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center p-3"
        >
          <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 mb-2">
            <Check size={20} />
          </div>
          <div className="text-white font-bold font-sora text-sm mb-1">RESERVATION CONFIRMED</div>
          <div className="text-gray-400 text-[10px] mb-2">PLATE: {plate} | SLOT: P{selectedSlot}</div>
          <div className="bg-white p-2 rounded inline-block">
            <div className="w-16 h-16 bg-black flex items-center justify-center text-[10px] text-white">
              {/* QR representation */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-black w-full h-full border border-gray-800">
                <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
                <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                <div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div>
                <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex-1 flex flex-col justify-around gap-2">
          <div>
            <label className="text-gray-400 text-[10px] block mb-1">LICENSE PLATE NUMBER</label>
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="bg-[#181820] border border-white/5 rounded p-2 text-white w-full text-center tracking-widest text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-gray-400 text-[10px] block mb-1">CHOOSE SLOT LOCATION</label>
            <div className="flex gap-2 justify-center">
              {[3, 7, 12, 18].map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSlot(s)}
                  className={`px-3 py-1.5 rounded border ${
                    selectedSlot === s
                      ? 'bg-primary border-primary text-white shadow-neon-glow'
                      : 'bg-[#181820] border-white/5 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  P{s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleReserve}
            disabled={!selectedSlot}
            className={`w-full py-2 rounded font-bold font-sora flex items-center justify-center gap-2 transition-all duration-300 ${
              selectedSlot
                ? 'bg-glow-gradient text-black hover:scale-[1.02]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            CONFIRM SLOT RESERVATION
          </button>
        </div>
      )}
    </div>
  );
}

function ParkingAnalyticsMockup() {
  return (
    <div className="bg-[#121216] border border-white/5 rounded-xl p-4 w-full h-full flex flex-col justify-between font-mono text-xs">
      <div className="border-b border-white/5 pb-2 mb-2 flex justify-between items-center">
        <span className="text-[#00D9FF] font-sora font-semibold">FINANCIAL & FLOW ANALYTICS</span>
        <span className="text-[10px] text-gray-400">TODAY</span>
      </div>

      <div className="flex-1 flex flex-col justify-around gap-2">
        {/* Total revenue */}
        <div>
          <div className="text-gray-400 text-[10px]">TOTAL COLLECTED</div>
          <div className="text-lg text-white font-bold font-sora">$1,452.80 <span className="text-xs text-green-400 font-mono font-normal">(+14.2%)</span></div>
        </div>

        {/* Peak hour bar graph */}
        <div>
          <div className="text-gray-400 text-[10px] mb-1">PEAK LOAD TIMELINE</div>
          <div className="flex items-end justify-between h-[80px] bg-black/20 rounded p-2 border border-white/5">
            {[20, 35, 75, 95, 60, 45, 15].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 w-full">
                <div
                  className="w-4 rounded-t bg-gradient-to-t from-primary to-accent transition-all duration-500"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[8px] text-gray-500">{8 + idx * 2}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
          <div>AVG PARK: <span className="text-white font-bold">2.4 hrs</span></div>
          <div>REVENUE RATE: <span className="text-white font-bold">$4.50/hr</span></div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. STOREOPS AI LIVE MOCKUPS
// ----------------------------------------------------
function StoreOpsDashboardMockup() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Analyze customer checkout delay logs', category: 'Research', status: 'done' },
    { id: 2, text: 'Refactor Redux invoice payload tree', category: 'Engineering', status: 'progress' },
    { id: 3, text: 'Integrate OpenAI logs sentiment pipeline', category: 'AI', status: 'pending' },
  ]);

  const advanceTask = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'pending' ? 'progress' : t.status === 'progress' ? 'done' : 'pending';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="bg-[#121216] border border-white/5 rounded-xl p-4 w-full h-full flex flex-col justify-between font-mono text-xs">
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
        <span className="text-primary flex items-center gap-1 font-sora font-semibold">
          <Sparkles size={12} className="text-accent animate-pulse" />
          WORKFLOW ORCHESTRATOR
        </span>
        <span className="text-[10px] bg-primary/20 text-secondary border border-primary/30 px-1.5 py-0.5 rounded">OPS ACTIVE</span>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto max-h-[160px] p-1">
        {tasks.map(t => (
          <div
            key={t.id}
            onClick={() => advanceTask(t.id)}
            className="bg-[#181820] border border-white/5 p-2 rounded flex justify-between items-center cursor-pointer hover:border-primary/40 transition-colors"
          >
            <div className="flex flex-col gap-0.5 max-w-[80%]">
              <span className="text-white text-[10px] truncate">{t.text}</span>
              <span className="text-[8px] text-gray-500">TAG: {t.category}</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
              t.status === 'done' ? 'bg-green-950/60 border border-green-500/30 text-green-400' :
              t.status === 'progress' ? 'bg-blue-950/60 border border-blue-500/30 text-blue-400' :
              'bg-gray-800 text-gray-400'
            }`}>
              {t.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <div className="text-[9px] text-gray-500 mt-2 text-center font-sans">
        *Click task to advance status: Pending → Progress → Done
      </div>
    </div>
  );
}

function StoreOpsReservationMockup() {
  const [inputText, setInputText] = useState('Chúng tôi mua 50 cái ghế nhưng cửa hàng giao nhầm màu xanh và trầy xước.');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      // Simple mock analyzer
      const lower = inputText.toLowerCase();
      let category = 'General Request';
      let sentiment = 'Neutral';
      let severity = 'Low';
      
      if (lower.includes('nhầm') || lower.includes('trầy') || lower.includes('lỗi')) {
        category = 'Delivery / Faulty Product';
        sentiment = 'Negative / Angry';
        severity = 'High';
      } else if (lower.includes('giá') || lower.includes('mua') || lower.includes('hỏi')) {
        category = 'Sales Inquiry';
        sentiment = 'Inquisitive';
        severity = 'Medium';
      }

      setAnalysis({ category, sentiment, severity });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#121216] border border-white/5 rounded-xl p-4 w-full h-full flex flex-col justify-between font-mono text-xs">
      <div className="border-b border-white/5 pb-2 mb-2">
        <span className="text-[#00D9FF] font-sora font-semibold">AI CUSTOMER LOG ANALYZER</span>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <label className="text-gray-400 text-[9px] block mb-1">ENTER CUSTOMER FEEDBACK LOG</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={2}
            className="bg-[#181820] border border-white/5 rounded p-2 text-white w-full text-xs focus:outline-none focus:border-primary resize-none font-sans"
          />
        </div>

        {loading ? (
          <div className="text-center py-4 flex flex-col items-center justify-center gap-2">
            <span className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-gray-400 text-[10px] animate-pulse">AI IS PARSING LOGS...</span>
          </div>
        ) : analysis ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/30 rounded border border-white/5 p-2 flex flex-col gap-1 text-[10px]"
          >
            <div>CATEGORY: <span className="text-white font-bold">{analysis.category}</span></div>
            <div>SENTIMENT: <span className="text-red-400 font-bold">{analysis.sentiment}</span></div>
            <div>SEVERITY: <span className="text-yellow-400 font-bold">{analysis.severity}</span></div>
            <button
              onClick={() => setAnalysis(null)}
              className="text-right text-[8px] text-primary hover:underline mt-1 block font-sans"
            >
              Analyze another text
            </button>
          </motion.div>
        ) : (
          <button
            onClick={handleAnalyze}
            className="w-full py-2 rounded bg-glow-gradient text-black font-bold font-sora hover:scale-[1.02] transition-transform duration-300"
          >
            RUN AI LOG ANALYZER
          </button>
        )}
      </div>
    </div>
  );
}

function StoreOpsAnalyticsMockup() {
  return (
    <div className="bg-[#121216] border border-white/5 rounded-xl p-4 w-full h-full flex flex-col justify-between font-mono text-xs">
      <div className="border-b border-white/5 pb-2 mb-2 flex justify-between items-center">
        <span className="text-[#9E7BFF] font-sora font-semibold">OPERATIONS OPTIMIZATION AUDIT</span>
        <span className="text-[10px] text-green-400 font-bold">SAVINGS TARGET MET</span>
      </div>

      <div className="flex-1 flex flex-col justify-around gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/20 border border-white/5 p-2 rounded">
            <div className="text-gray-400 text-[9px]">OVERHEAD REDUCTION</div>
            <div className="text-base text-white font-bold font-sora">-32.4%</div>
          </div>
          <div className="bg-black/20 border border-white/5 p-2 rounded">
            <div className="text-gray-400 text-[9px]">RESOLVE TIME</div>
            <div className="text-base text-white font-bold font-sora">-4.5h</div>
          </div>
        </div>

        {/* Cost Optimization chart */}
        <div>
          <div className="text-gray-400 text-[9px] mb-1">COST OUTLAY PROJECTION</div>
          <div className="h-[70px] bg-black/20 rounded p-2 border border-white/5 flex items-end justify-between relative overflow-hidden">
            {/* SVG line representation */}
            <div className="absolute inset-0 p-2 flex items-center">
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <path d="M 0,35 Q 25,25 50,15 T 100,5" fill="none" stroke="#00D9FF" strokeWidth="2" />
                <path d="M 0,35 Q 25,30 50,25 T 100,20" fill="none" stroke="#6D5DF6" strokeWidth="2" strokeDasharray="3" />
              </svg>
            </div>
            <span className="text-[8px] text-gray-500 absolute bottom-1 left-2">Q1</span>
            <span className="text-[8px] text-gray-500 absolute bottom-1 right-2">Q4</span>
          </div>
        </div>

        <div className="text-[8px] text-gray-500 text-center font-sans">
          Blue Solid Line: AI Workflow Optimization Outlay | Violet Dotted: Standard Operations Outlay
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN PROJECT DETAILS MODAL
// ----------------------------------------------------
export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSimulator, setShowSimulator] = useState(true);

  // Reset to simulator view when changing slide
  useEffect(() => {
    setShowSimulator(true);
  }, [activeSlide]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Render the selected interactive simulated UI
  const renderInteractiveMockup = (type: string) => {
    if (project.id === 'parking-building-management') {
      switch (type) {
        case 'dashboard': return <ParkingDashboardMockup />;
        case 'reservation': return <ParkingReservationMockup />;
        case 'analytics': return <ParkingAnalyticsMockup />;
        default: return null;
      }
    } else {
      switch (type) {
        case 'dashboard': return <StoreOpsDashboardMockup />;
        case 'reservation': return <StoreOpsReservationMockup />;
        case 'analytics': return <StoreOpsAnalyticsMockup />;
        default: return null;
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
        {/* Backdrop trigger */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-[#0C0C0F] border border-white/5 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white p-1 bg-black/40 hover:bg-black/60 rounded-full border border-white/5 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Left panel: Media & Interactive Mockup (5 cols) */}
          <div className="col-span-1 md:col-span-6 bg-black/40 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between max-h-[45vh] md:max-h-full overflow-y-auto">
             <div>
              <div className="flex justify-between items-center mb-4">
                {project.gallery[activeSlide].image ? (
                  <button
                    onClick={() => setShowSimulator(!showSimulator)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[9px] font-bold text-[#00D9FF] hover:bg-primary/35 transition-all shadow-neon-glow cursor-pointer"
                  >
                    <Sparkles size={10} className="animate-pulse" />
                    {showSimulator ? "VIEW REAL SCREENSHOT" : "ACTIVATE LIVE SIMULATOR"}
                  </button>
                ) : (
                  <span className="text-[10px] tracking-wider text-accent font-bold uppercase font-sora">
                    LIVE INTERACTIVE DEMO SIMULATOR
                  </span>
                )}
                <span className="text-[10px] text-gray-500 font-mono">
                  SLIDE {activeSlide + 1} OF {project.gallery.length}
                </span>
              </div>

              {/* Showcase Screen */}
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/5 shadow-inner relative bg-[#09090C] mb-4">
                {showSimulator ? (
                  renderInteractiveMockup(project.gallery[activeSlide].type)
                ) : (
                  <img
                    src={project.gallery[activeSlide].image}
                    alt={project.gallery[activeSlide].title}
                    className="w-full h-full object-contain bg-[#08080A]"
                  />
                )}
              </div>

              <h4 className="text-white font-sora font-semibold text-sm mb-1">
                {project.gallery[activeSlide].title}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                {project.gallery[activeSlide].description}
              </p>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {project.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? 'w-6 bg-primary' : 'w-2 bg-gray-700 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right panel: Details & Spec Copy (6 cols) */}
          <div className="col-span-1 md:col-span-6 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-full">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs font-semibold text-primary block mb-1">
                  {project.role}
                </span>
                <h2 className="text-2xl font-bold text-white font-sora">
                  {project.title}
                </h2>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              {/* Details sections */}
              <div className="flex flex-col gap-3 text-xs leading-relaxed font-sans">
                <div>
                  <h4 className="text-white font-sora font-bold text-[10px] tracking-wider text-accent uppercase mb-1">
                    🎯 BUSINESS GOAL & IMPACT
                  </h4>
                  <p className="text-gray-400">{project.businessGoal}</p>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <h4 className="text-white font-sora font-bold text-[10px] tracking-wider text-accent uppercase mb-1">
                    🔥 KEY CHALLENGES
                  </h4>
                  <p className="text-gray-400">{project.challenges}</p>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <h4 className="text-white font-sora font-bold text-[10px] tracking-wider text-accent uppercase mb-1">
                    📖 LEARNINGS & ARCHITECTURE
                  </h4>
                  <p className="text-gray-400">{project.learnings}</p>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] text-gray-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3 mt-6 border-t border-white/5 pt-4">
              <a
                href={project.downloadPath}
                download
                className="py-2.5 px-4 bg-glow-gradient text-black font-sora font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-neon-glow"
              >
                <Download size={14} />
                DOWNLOAD SOURCE (.RAR)
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 bg-[#121216] border border-white/5 text-gray-300 font-sora font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 hover:text-white hover:border-gray-500 active:scale-95 transition-all duration-200"
              >
                <GithubIcon size={14} />
                GITHUB CODE
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
