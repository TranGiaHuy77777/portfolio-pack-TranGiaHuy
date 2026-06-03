import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check, Sparkles, Lock } from 'lucide-react';
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
  subject?: string;
  cover?: string;
}

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

// ====================================================
// 1. SMART PARKING LIVE MOCKUPS
// ====================================================

function ParkingLandingMockup({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
        <span className="text-primary font-sora font-semibold tracking-wider">SMART PARKING HUB</span>
        <span className="text-[9px] text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-sm">ONLINE</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3 py-2">
        <div>
          <h3 className="text-white font-sora font-bold text-xs tracking-tight leading-snug">
            Smart Parking & Building Control Hub
          </h3>
          <p className="text-[9px] text-gray-400 mt-1 leading-relaxed font-sans">
            Intelligent facility management and automated parking allocation platform with instant ANPR and real-time reservation logic.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="bg-black/20 border border-white/[0.04] p-2 rounded-sm">
            <div className="text-gray-500 font-sans">OPERATIONS</div>
            <div className="text-white font-bold">24/7 ACTIVE</div>
          </div>
          <div className="bg-black/20 border border-white/[0.04] p-2 rounded-sm">
            <div className="text-gray-500 font-sans">ANPR MATCH</div>
            <div className="text-primary font-bold">99.8% ACC</div>
          </div>
        </div>
      </div>

      <button
        onClick={onNavigate}
        className="w-full py-2 bg-primary text-black font-semibold font-sora text-[10px] rounded-sm text-center transition-all cursor-pointer btn-editorial"
      >
        CHECK PARKING MAP NOW
      </button>
    </div>
  );
}

function ParkingDashboardMockup() {
  const [slots, setSlots] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      isOccupied: Math.random() > 0.4,
    }))
  );

  const occupiedCount = slots.filter(s => s.isOccupied).length;
  const vacantCount = slots.length - occupiedCount;

  const toggleSlot = (id: number) => {
    setSlots(prev => prev.map(s => s.id === id ? { ...s, isOccupied: !s.isOccupied } : s));
  };

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="flex justify-between items-center border-b border-white/[0.04] pb-1.5 mb-1.5">
        <span className="text-primary flex items-center gap-1.5 font-sora font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          PARKING CONTROL HUB
        </span>
        <span className="text-gray-500">ACTIVE</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        <div className="bg-[#0B0B0C] border border-white/[0.04] p-1 rounded-sm text-center">
          <div className="text-gray-500 text-[8px] font-sans">TOTAL</div>
          <div className="text-xs text-white font-bold">{slots.length}</div>
        </div>
        <div className="bg-[#0B0B0C] border border-white/[0.04] p-1 rounded-sm text-center">
          <div className="text-secondary text-[8px] font-sans">OCCUPIED</div>
          <div className="text-xs font-bold text-secondary">{occupiedCount}</div>
        </div>
        <div className="bg-[#0B0B0C] border border-white/[0.04] p-1 rounded-sm text-center">
          <div className="text-primary text-[8px] font-sans">VACANT</div>
          <div className="text-xs font-bold text-primary">{vacantCount}</div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 overflow-y-auto max-h-[90px] p-1 bg-black/30 rounded-sm border border-white/[0.04]">
        {slots.map(s => (
          <button
            key={s.id}
            onClick={() => toggleSlot(s.id)}
            className={`py-1 rounded-sm border text-center font-bold text-[9px] transition-all ${
              s.isOccupied
                ? 'bg-secondary/10 border-secondary/20 text-secondary'
                : 'bg-primary/10 border-primary/20 text-primary hover:scale-105 hover:bg-primary/20'
            }`}
          >
            P{s.id}
          </button>
        ))}
      </div>
      <div className="text-[8px] text-gray-500 mt-1 text-center font-sans">
        *Click slot P1-P20 to toggle occupied status live.
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
    canvasConfetti({ particleCount: 30, spread: 50, colors: ['#C5A880', '#E07A5F'] });
    setTimeout(() => setResSuccess(false), 4000);
  };

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="border-b border-white/[0.04] pb-2">
        <span className="text-primary font-sora font-semibold">RESERVATION TERMINAL</span>
      </div>

      {resSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center py-2"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary mb-1.5">
            <Check size={16} />
          </div>
          <div className="text-white font-bold font-sora text-xs mb-0.5">RESERVATION CONFIRMED</div>
          <div className="text-gray-400 text-[8px] mb-2">PLATE: {plate} | SLOT: P{selectedSlot}</div>
          <div className="bg-white p-1 rounded-sm inline-block">
            <div className="grid grid-cols-4 gap-0.5 p-0.5 bg-black w-10 h-10 border border-gray-800">
              <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
              <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
              <div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-white"></div>
              <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex-1 flex flex-col justify-between py-2 gap-2">
          <div>
            <label className="text-gray-500 text-[8px] block mb-0.5">LICENSE PLATE</label>
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="bg-[#0B0B0C] border border-white/[0.04] rounded-sm px-2 py-1 text-white w-full text-center tracking-widest text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-gray-500 text-[8px] block mb-1">CHOOSE SLOT</label>
            <div className="flex gap-1.5 justify-center">
              {[3, 7, 12, 18].map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSlot(s)}
                  className={`px-2 py-1 rounded-sm border text-[9px] ${
                    selectedSlot === s
                      ? 'bg-primary border-primary text-black font-semibold'
                      : 'bg-[#0B0B0C] border-white/[0.04] text-gray-400 hover:border-gray-500'
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
            className={`w-full py-1.5 rounded-sm font-semibold font-sora text-[9px] flex items-center justify-center transition-all ${
              selectedSlot
                ? 'bg-primary text-black btn-editorial'
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

function ParkingSubscriptionsMockup() {
  const [cards, setCards] = useState([
    { room: '402', plate: '59A-123.45', rfid: '98124', status: 'ACTIVE' },
    { room: '105', plate: '29B-987.65', rfid: '12489', status: 'EXPIRED' },
    { room: '901', plate: '30C-456.78', rfid: '74210', status: 'ACTIVE' },
  ]);

  const handleRenew = (plate: string) => {
    setCards(prev => prev.map(c => c.plate === plate ? { ...c, status: 'ACTIVE' } : c));
    canvasConfetti({ particleCount: 30, spread: 40, colors: ['#C5A880', '#E07A5F'] });
  };

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="border-b border-white/[0.04] pb-1.5 mb-1.5 flex justify-between items-center">
        <span className="text-primary font-sora font-semibold">MONTHLY SUBSCRIPTIONS</span>
        <span className="text-[8px] text-gray-500">TOTAL: 3</span>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto max-h-[90px] p-0.5">
        {cards.map(c => (
          <div key={c.plate} className="bg-black/20 border border-white/[0.04] p-1.5 rounded-sm flex justify-between items-center gap-1">
            <div className="flex flex-col gap-0.5">
              <div className="text-white font-bold text-[9px]">PLATE: {c.plate} <span className="text-gray-500 font-normal">({c.room})</span></div>
              <div className="text-[8px] text-gray-500">RFID: {c.rfid}</div>
            </div>
            
            {c.status === 'EXPIRED' ? (
              <button
                onClick={() => handleRenew(c.plate)}
                className="px-2 py-0.5 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 text-secondary hover:text-white rounded-sm text-[8px] font-bold transition-all cursor-pointer"
              >
                RENEW
              </button>
            ) : (
              <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-sm text-[8px] font-bold">
                ACTIVE
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="text-[8px] text-gray-500 mt-1 text-center font-sans">
        *Click 'RENEW' on expired cards to extend monthly billing.
      </div>
    </div>
  );
}

function ParkingAnalyticsMockup() {
  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="border-b border-white/[0.04] pb-1.5 mb-1.5 flex justify-between items-center">
        <span className="text-primary font-sora font-semibold">FINANCIAL & FLOW METRICS</span>
        <span className="text-[8px] text-gray-500">LIVE</span>
      </div>

      <div className="flex-1 flex flex-col justify-around gap-1.5">
        <div>
          <div className="text-gray-500 text-[8px]">TOTAL REVENUE</div>
          <div className="text-sm text-white font-bold font-sora">$1,452.80 <span className="text-[9px] text-primary font-mono font-normal">(+14.2%)</span></div>
        </div>

        <div>
          <div className="text-gray-500 text-[8px] mb-0.5">PEAK HOURLY Timeline</div>
          <div className="flex items-end justify-between h-[45px] bg-black/20 rounded-sm p-1 border border-white/[0.04]">
            {[20, 35, 75, 95, 60, 45, 15].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-0.5 w-full">
                <div
                  className="w-3 rounded-t-sm bg-gradient-to-t from-primary to-secondary transition-all duration-500"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[7px] text-gray-500">{8 + idx * 2}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[8px] text-gray-400">
          <div>AVG PARK: <span className="text-white font-bold">2.4 hrs</span></div>
          <div>RATE: <span className="text-white font-bold">$4.50/hr</span></div>
        </div>
      </div>
    </div>
  );
}

function ParkingSecurityLogsMockup() {
  const [logs, setLogs] = useState([
    '[22:45:01] IN: Vehicle 59A-123.45 entered Gate A.',
    '[22:46:12] OUT: Vehicle 29B-987.65 exited Gate B.',
    '[22:47:05] SYSTEM: Plate recognition ANPR matched 98.7%.',
  ]);

  useEffect(() => {
    const plates = ['30H-999.99', '51G-888.88', '43A-777.77', '75C-666.66'];
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const randPlate = plates[Math.floor(Math.random() * plates.length)];
      const logType = Math.random() > 0.5 ? 'IN' : 'OUT';
      const newLog = `[${time}] ${logType}: Vehicle ${randPlate} ${logType === 'IN' ? 'entered Gate A' : 'exited Gate B'}.`;
      
      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[9px] text-left">
      <div className="border-b border-white/[0.04] pb-1.5 mb-1.5 flex justify-between items-center">
        <span className="text-primary font-sora font-semibold text-[9px]">SECURITY SYSTEM LOGS</span>
        <span className="text-[7px] text-primary font-bold flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-primary" />
          FEED LIVE
        </span>
      </div>

      <div className="flex-1 bg-black/40 border border-white/[0.04] rounded-sm p-1.5 overflow-y-auto max-h-[85px] flex flex-col gap-1">
        {logs.map((log, idx) => (
          <div key={idx} className={`${
            log.includes('SYSTEM') ? 'text-primary font-semibold' :
            log.includes('IN') ? 'text-primary' : 'text-secondary'
          }`}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ====================================================
// 2. STOREOPS AI LIVE MOCKUPS
// ====================================================

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
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="flex justify-between items-center border-b border-white/[0.04] pb-1.5 mb-1.5">
        <span className="text-primary flex items-center gap-1 font-sora font-semibold">
          WORKFLOW ORCHESTRATOR
        </span>
        <span className="text-[8px] bg-primary/10 text-primary border border-primary/20 px-1 py-0.5 rounded-sm">ACTIVE</span>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto max-h-[90px] p-0.5">
        {tasks.map(t => (
          <div
            key={t.id}
            onClick={() => advanceTask(t.id)}
            className="bg-[#0B0B0C] border border-white/[0.04] p-1.5 rounded-sm flex justify-between items-center cursor-pointer hover:border-primary/45 transition-colors"
          >
            <div className="flex flex-col gap-0.5 max-w-[70%]">
              <span className="text-white text-[9px] truncate">{t.text}</span>
              <span className="text-[7px] text-gray-500">TAG: {t.category}</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded-sm text-[7px] font-bold ${
              t.status === 'done' ? 'bg-primary/10 border border-primary/20 text-primary' :
              t.status === 'progress' ? 'bg-secondary/10 border border-secondary/20 text-secondary' :
              'bg-gray-800 text-gray-400'
            }`}>
              {t.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <div className="text-[8px] text-gray-500 mt-1 text-center font-sans">
        *Click task to advance: Pending → Progress → Done
      </div>
    </div>
  );
}

function StoreOpsReservationMockup() {
  const [inputText, setInputText] = useState('We bought 50 chairs but the store delivered the wrong color (blue) and some are scratched.');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const lower = inputText.toLowerCase();
      let category = 'General Request';
      let sentiment = 'Neutral';
      let severity = 'Low';
      
      if (lower.includes('wrong') || lower.includes('scratch') || lower.includes('defect') || lower.includes('error') || lower.includes('faulty')) {
        category = 'Delivery / Faulty Product';
        sentiment = 'Negative / Angry';
        severity = 'High';
      } else if (lower.includes('price') || lower.includes('buy') || lower.includes('inquiry') || lower.includes('ask') || lower.includes('cost')) {
        category = 'Sales Inquiry';
        sentiment = 'Inquisitive';
        severity = 'Medium';
      }

      setAnalysis({ category, sentiment, severity });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="border-b border-white/[0.04] pb-1.5 mb-1.5">
        <span className="text-primary font-sora font-semibold">AI CUSTOMER LOG ANALYZER</span>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-1.5">
        <div>
          <label className="text-gray-500 text-[8px] block mb-0.5 font-sans">ENTER CUSTOMER LOG</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={2}
            className="bg-[#0B0B0C] border border-white/[0.04] rounded-sm p-1.5 text-white w-full text-[9px] focus:outline-none focus:border-primary resize-none font-sans"
          />
        </div>

        {loading ? (
          <div className="text-center py-2 flex flex-col items-center justify-center gap-1">
            <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-gray-400 text-[8px] animate-pulse">AI IS PARSING LOGS...</span>
          </div>
        ) : analysis ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/30 rounded-sm border border-white/[0.04] p-1.5 flex flex-col gap-0.5 text-[8px]"
          >
            <div>CATEGORY: <span className="text-white font-bold">{analysis.category}</span></div>
            <div>SENTIMENT: <span className="text-secondary font-bold">{analysis.sentiment}</span></div>
            <div>SEVERITY: <span className="text-primary font-bold">{analysis.severity}</span></div>
            <button
              onClick={() => setAnalysis(null)}
              className="text-right text-[8px] text-primary hover:underline mt-1 block font-sans cursor-pointer"
            >
              Analyze another text
            </button>
          </motion.div>
        ) : (
          <button
            onClick={handleAnalyze}
            className="w-full py-1 rounded-sm bg-primary text-black font-bold font-sora text-[9px] hover:scale-[1.01] cursor-pointer"
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
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[10px] text-left">
      <div className="border-b border-white/[0.04] pb-1.5 mb-1.5 flex justify-between items-center">
        <span className="text-primary font-sora font-semibold">OPERATIONS AUDIT METRICS</span>
        <span className="text-[8px] text-primary font-bold">SAVED</span>
      </div>

      <div className="flex-1 flex flex-col justify-around gap-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-black/20 border border-white/[0.04] p-1.5 rounded-sm">
            <div className="text-gray-500 text-[8px] font-sans">OVERHEAD</div>
            <div className="text-xs text-white font-bold font-sora">-32.4%</div>
          </div>
          <div className="bg-black/20 border border-white/[0.04] p-1.5 rounded-sm">
            <div className="text-gray-500 text-[8px] font-sans">RESOLVE TIME</div>
            <div className="text-xs text-white font-bold font-sora">-4.5h</div>
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-[8px] mb-0.5">COST OUTLAY PROJECTION</div>
          <div className="h-[40px] bg-black/20 rounded-sm p-1 border border-white/[0.04] flex items-end justify-between relative overflow-hidden">
            <div className="absolute inset-0 p-1 flex items-center">
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <path d="M 0,35 Q 25,25 50,15 T 100,5" fill="none" stroke="#C5A880" strokeWidth="2" />
                <path d="M 0,35 Q 25,30 50,25 T 100,20" fill="none" stroke="#E07A5F" strokeWidth="2" strokeDasharray="3" />
              </svg>
            </div>
            <span className="text-[6px] text-gray-500 absolute bottom-0.5 left-1.5">Q1</span>
            <span className="text-[6px] text-gray-500 absolute bottom-0.5 right-1.5">Q4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====================================================
// 3. MUMCARE PLATFORM LIVE MOCKUPS
// ====================================================

function MumCareShopMockup() {
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([]);
  const [log, setLog] = useState('SYSTEM: Storefront Connected via Socket.io');
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  const products = [
    { name: 'Enfamil Premium Gold', price: 34.50 },
    { name: 'Similac Infant Formula', price: 29.90 },
    { name: 'MumCare Organic Pregnancy', price: 39.90 },
  ];

  const addToCart = (p: typeof products[0]) => {
    setCart(prev => {
      const exist = prev.find(item => item.name === p.name);
      if (exist) {
        return prev.map(item => item.name === p.name ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setLog(`[Socket.io] User added ${p.name} to cart.`);
  };

  const handleOrder = () => {
    if (cart.length === 0) return;
    setOrdering(true);
    setLog('[Socket.io] Broadcasting order checkout payload to Server...');
    
    setTimeout(() => {
      setOrdering(false);
      setSuccess(true);
      setCart([]);
      setLog('✔ Server: Order #MC-9402 created successfully. Joi schema valid.');
      canvasConfetti({ particleCount: 30, spread: 45, colors: ['#C5A880', '#E07A5F'] });
      
      setTimeout(() => {
        setSuccess(false);
        setLog('SYSTEM: Storefront Connected via Socket.io');
      }, 5000);
    }, 2000);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[9px] text-left">
      <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
        <span className="text-primary font-sora font-semibold tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          MUMCARE MILK STOREFRONT
        </span>
        <span className="text-[8px] bg-primary/10 text-primary border border-primary/20 px-1 py-0.5 rounded-sm">
          WEB CLIENT
        </span>
      </div>

      {success ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary mb-2">
            <Check size={16} />
          </div>
          <div className="text-white font-bold font-sora text-[11px] mb-1">ORDER PLACED SUCCESSFULLY!</div>
          <div className="text-gray-400 text-[8px] leading-relaxed">
            The system successfully sent a confirmation email via **Nodemailer** and persisted order records to **MongoDB**.
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between py-2 gap-2">
          {/* Products List */}
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 text-[8px] font-sans">SELECT PREMIUM MILK</div>
            {products.map(p => (
              <div key={p.name} className="bg-black/20 border border-white/[0.04] px-2 py-1.5 rounded-sm flex justify-between items-center">
                <span className="text-white font-bold">{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">${p.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-2 py-0.5 bg-primary/20 border border-primary/30 hover:bg-primary hover:text-black text-white rounded-sm text-[8px] cursor-pointer"
                  >
                    + ADD
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart summary */}
          <div className="bg-black/30 border border-white/[0.04] rounded-sm p-1.5 flex justify-between items-center text-[8px]">
            <div>
              <span className="text-gray-500 font-sans block">ITEMS IN CART</span>
              <span className="text-white font-bold">
                {cart.length === 0 ? 'EMPTY' : `${cart.reduce((s, i) => s + i.qty, 0)} items (${cart.map(c => `${c.qty}x ${c.name.split(' ')[0]}`).join(', ')})`}
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 font-sans block">TOTAL VALUE</span>
              <span className="text-primary font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="bg-black/60 border border-white/[0.04] px-2 py-1 rounded-sm text-[7.5px] text-gray-400 truncate">
          {log}
        </div>
        
        {!success && (
          <button
            onClick={handleOrder}
            disabled={cart.length === 0 || ordering}
            className={`w-full py-1.5 font-bold font-sora rounded-sm text-center transition-all ${
              cart.length > 0 && !ordering
                ? 'bg-primary text-black hover:scale-[1.01] cursor-pointer btn-editorial'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {ordering ? 'BROADCASTING CHECKOUT VIA WEBSOCKETS...' : 'PROCEED CHECKOUT ($' + total.toFixed(2) + ')'}
          </button>
        )}
      </div>
    </div>
  );
}

function MumCareMilestonesMockup() {
  const [intake, setIntake] = useState(350);
  const goal = 500;
  const percent = Math.min(100, Math.floor((intake / goal) * 100));

  const logWater = () => {
    if (intake >= goal) return;
    setIntake(prev => Math.min(goal, prev + 150));
    canvasConfetti({ particleCount: 20, spread: 35, colors: ['#C5A880', '#E07A5F'] });
  };

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[9px] text-left relative overflow-hidden">
      {/* Phone status bar simulation */}
      <div className="flex justify-between items-center border-b border-white/[0.04] pb-1.5 mb-1.5 text-gray-500 text-[8px] font-sans">
        <span className="font-bold">09:41 AM</span>
        <span className="text-primary font-semibold font-sora">MUMCARE ROUTINE</span>
        <div className="flex items-center gap-1">
          <span>5G</span>
          <span className="border border-gray-700 px-0.5 py-px rounded-[2px] text-[6px]">100%</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-1 gap-2">
        {/* Profile Info */}
        <div className="flex items-center gap-2 bg-[#0B0B0C] border border-white/[0.04] p-2 rounded-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-px flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center text-[10px] text-white font-bold">🤰</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold font-sora text-[10px] truncate">Mother: Tran Gia Huy (Week 24)</div>
            <div className="text-gray-400 text-[8px] font-sans">Baby Size: Cantaloupe (~600g)</div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-black/30 border border-white/[0.04] rounded-sm p-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">MILK INTAKE GOAL</span>
            <span className="text-white font-bold">{intake}/{goal} ml</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-gray-800 rounded-sm overflow-hidden p-px border border-white/[0.04] relative">
            <div
              className="h-full rounded-sm bg-gradient-to-r from-primary to-secondary transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[8px]">
            <span className="text-primary">{percent}% COMPLETED</span>
            <span className="text-gray-500 font-sans">RECOMMENDED DAILY AMOUNT</span>
          </div>
        </div>

        {/* Medical Advisory Box */}
        <div className="bg-[#0B0B0C] border border-white/[0.04] p-2 rounded-sm text-[7.5px] leading-relaxed text-gray-400 font-sans">
          {percent >= 100 ? (
            <span className="text-primary font-bold block">✔ PERFECT INTAKE RECORD!</span>
          ) : (
            <span className="text-primary font-semibold block">💡 NUTRITIONAL RECOMMENDATION:</span>
          )}
          {percent >= 100
            ? "You have successfully supplied the ideal calcium amount required for the baby's bone and tooth growth today. Keep it up!"
            : "The 24-week fetus is developing bones rapidly. It is recommended to log another 150ml of organic prenatal milk."}
        </div>
      </div>

      {/* Log Button */}
      <button
        onClick={logWater}
        disabled={intake >= goal}
        className={`w-full mt-2 py-1.5 font-bold font-sora text-center rounded-sm transition-all ${
          intake < goal
            ? 'bg-primary text-black hover:scale-[1.01] cursor-pointer btn-editorial'
            : 'bg-green-950/40 border border-green-500/20 text-green-400 cursor-not-allowed'
        }`}
      >
        {intake >= goal ? '✔ GOAL ACHIEVED TODAY' : 'LOG MILK DRUNK (+150ml)'}
      </button>
    </div>
  );
}

function MumCareServerLogsMockup() {
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'express' | 'mongo' | 'mailer'>('express');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const initLogs = {
      express: [
        '[10:45:01] [Express] GET /api/v1/products - 200 OK (8.2ms)',
        '[10:45:03] [Express] POST /api/v1/auth/login - 200 OK (24.1ms)',
        '[10:45:04] [Joi] Validation schema success for login model.',
        '[10:45:06] [Socket.io] Socket user_active_91 connected to server gateway.',
      ],
      mongo: [
        '[10:45:01] [MongoDB] Established connection to cluster0.mongodb.net pool.',
        '[10:45:03] [MongoDB] Users: Found user Gia Huy matching account credentials.',
        '[10:45:04] [MongoDB] Sessions: Session model generated with index TTL.',
      ],
      mailer: [
        '[10:45:01] [Nodemailer] SMTP Transport initialized on port 587.',
        '[10:45:04] [Nodemailer] Template parsed: pregnancy_welcome_mail.',
        '[10:45:06] [Nodemailer] Dynamic mail payload matched user: Gia Huy.',
      ]
    };

    setLogs(initLogs[activeTab]);

    const templates = {
      express: [
        'GET /api/v1/users/profile - 200 OK (4.2ms)',
        'POST /api/v1/orders/checkout - 201 Created (142ms)',
        'Joi: Validation schema success for order model.',
        'Socket.io: User order_track_48 joined order channel notifications.',
        'Express: Multer upload success on endpoint POST /api/v1/products/upload.'
      ],
      mongo: [
        'MongoDB: Found product "Similac Milk" - inventory matches (42).',
        'MongoDB: Injected document to collection "orders" - ID: MC-9402.',
        'MongoDB: Connected pools stable (active client connections: 4).',
        'MongoDB: Index scan matched query "products/category/pregnancy" (12ms).',
        'MongoDB: Updated user daily intake parameters.'
      ],
      mailer: [
        'Nodemailer: Sent Order #MC-9402 confirmation mail to huytran@gmail.com.',
        'Nodemailer: Mail response code: 250 (Message accepted for delivery).',
        'Nodemailer: Sent weekly milestone update email to active_mums_list.',
        'Nodemailer: Mail delivery queue empty.',
        'Nodemailer: SMTP connection pool refreshed successfully.'
      ]
    };

    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const pool = templates[activeTab];
      const randomLine = pool[Math.floor(Math.random() * pool.length)];
      const logLine = `[${time}] [${activeTab.toUpperCase()}] ${randomLine}`;
      
      setLogs(prev => [logLine, ...prev.slice(0, 4)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [activeTab, isLive]);

  return (
    <div className="bg-[#131315] border border-white/[0.04] rounded-sm p-4 w-full h-full flex flex-col justify-between font-mono text-[9px] text-left">
      <div className="border-b border-white/[0.04] pb-1.5 mb-1.5 flex justify-between items-center">
        <span className="text-primary font-sora font-semibold text-[9px] flex items-center gap-1.5">
          MUMCARE SERVER MONITOR
        </span>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-1.5 py-0.5 rounded-sm text-[7px] font-bold transition-all cursor-pointer ${
            isLive ? 'text-primary bg-primary/10 border border-primary/20' : 'text-gray-400 bg-gray-800'
          }`}
        >
          {isLive ? '● LIVE LOGS' : '|| PAUSED'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1 mb-2 font-sans">
        <button
          onClick={() => setActiveTab('express')}
          className={`py-1 rounded-sm border text-[8px] font-semibold transition-all cursor-pointer ${
            activeTab === 'express'
              ? 'bg-primary border-primary text-black font-bold'
              : 'bg-black/20 border-white/[0.04] text-gray-400 hover:border-gray-500'
          }`}
        >
          Express / API
        </button>
        <button
          onClick={() => setActiveTab('mongo')}
          className={`py-1 rounded-sm border text-[8px] font-semibold transition-all cursor-pointer ${
            activeTab === 'mongo'
              ? 'bg-primary border-primary text-black font-bold'
              : 'bg-black/20 border-white/[0.04] text-gray-400 hover:border-gray-500'
          }`}
        >
          MongoDB
        </button>
        <button
          onClick={() => setActiveTab('mailer')}
          className={`py-1 rounded-sm border text-[8px] font-semibold transition-all cursor-pointer ${
            activeTab === 'mailer'
              ? 'bg-primary border-primary text-black font-bold'
              : 'bg-black/20 border-white/[0.04] text-gray-400 hover:border-gray-500'
          }`}
        >
          NodeMailer
        </button>
      </div>

      <div className="flex-1 bg-black/40 border border-white/[0.04] rounded-sm p-1.5 overflow-y-auto max-h-[85px] flex flex-col gap-1.5">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={`${
              log.includes('POST') || log.includes('Injected') ? 'text-primary font-bold' :
              log.includes('Sent') || log.includes('success') || log.includes('OK') ? 'text-primary' :
              log.includes('User') || log.includes('TTL') ? 'text-secondary' : 'text-gray-300'
            }`}
          >
            {log}
          </div>
        ))}
      </div>

      <div className="text-[8px] text-gray-500 mt-1 text-center font-sans">
        *Choose a backend service tab to analyze Node.js API runtime communications.
      </div>
    </div>
  );
}

// ====================================================
// MAIN PROJECT DETAILS MODAL
// ====================================================

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
        case 'landing': return <ParkingLandingMockup onNavigate={() => setActiveSlide(1)} />;
        case 'dashboard': return <ParkingDashboardMockup />;
        case 'reservation': return <ParkingReservationMockup />;
        case 'subscriptions': return <ParkingSubscriptionsMockup />;
        case 'analytics': return <ParkingAnalyticsMockup />;
        case 'logs': return <ParkingSecurityLogsMockup />;
        default: return null;
      }
    } else if (project.id === 'mumcare-platform') {
      switch (type) {
        case 'shop': return <MumCareShopMockup />;
        case 'milestones': return <MumCareMilestonesMockup />;
        case 'server': return <MumCareServerLogsMockup />;
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

  const isStockAi = project.id === 'stock-ai';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
        {/* Backdrop trigger */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative bg-[#0B0B0C] rounded-sm w-full max-w-5xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 h-[90vh] md:h-[80vh] max-h-[90vh] md:max-h-[85vh] border ${
            isStockAi
              ? 'border-primary/30'
              : 'border-white/[0.04]'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white p-1 bg-black/40 hover:bg-black/60 rounded-sm border border-white/[0.04] transition-colors cursor-pointer animate-none"
          >
            <X size={18} />
          </button>

          {/* Left panel: Media & Interactive Mockup (6 cols) */}
          <div className="col-span-1 md:col-span-6 bg-black/40 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/[0.04] flex flex-col justify-between h-[45vh] md:h-full overflow-y-auto">
             <div>
              <div className="flex justify-between items-center mb-4">
                {project.gallery[activeSlide].image ? (
                  <button
                    onClick={() => setShowSimulator(!showSimulator)}
                    className="flex items-center gap-1.5 px-3 py-1 border rounded-sm text-[9px] font-bold hover:scale-[1.01] transition-all cursor-pointer bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <Sparkles size={10} />
                    {showSimulator ? "VIEW REAL SCREENSHOT" : "ACTIVATE LIVE SIMULATOR"}
                  </button>
                ) : (
                  <span className="text-[9px] tracking-widest text-primary font-bold uppercase font-sora">
                    LIVE INTERACTIVE SIMULATOR
                  </span>
                )}
                <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
                  SLIDE {activeSlide + 1} OF {project.gallery.length}
                </span>
              </div>

              {/* Showcase Screen */}
              <div className="aspect-[4/3] w-full rounded-sm overflow-hidden border border-white/[0.04] shadow-inner relative bg-[#09090C] mb-4">
                {showSimulator ? (
                  renderInteractiveMockup(project.gallery[activeSlide].type)
                ) : (
                  <img
                    src={project.gallery[activeSlide].image}
                    alt={project.gallery[activeSlide].title}
                    className="w-full h-full object-contain bg-[#0B0B0C] grayscale hover:grayscale-0 transition-all duration-500"
                  />
                )}
              </div>

              <h4 className="text-white font-sora font-semibold text-sm mb-1 text-left">
                {project.gallery[activeSlide].title}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-sans text-left">
                {project.gallery[activeSlide].description}
              </p>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {project.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1 rounded-sm transition-all duration-300 cursor-pointer ${
                    activeSlide === idx 
                      ? 'w-6 bg-primary' 
                      : 'w-2 bg-gray-700 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right panel: Details & Spec Copy (6 cols) */}
          <div className="col-span-1 md:col-span-6 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-[45vh] md:h-full">
            <div className="flex flex-col gap-4">
              <div className="text-left">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold font-sora tracking-widest text-primary uppercase">
                    {project.role}
                  </span>
                  {project.id === 'mumcare-platform' && (
                    <span className="text-[9px] bg-primary/5 border border-primary/20 px-2 py-0.5 rounded-sm text-primary font-bold font-sora tracking-wide">
                      📱 MOBILE APP (EXPO) + 💻 WEB SYSTEM
                    </span>
                  )}
                  {project.subject && (
                    <span className={`text-[9px] px-2.5 py-0.5 rounded-sm font-bold font-mono tracking-wider border ${
                      isStockAi
                        ? 'bg-amber-950/40 border-primary/20 text-primary'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}>
                      {project.id === 'stock-ai' ? '🔬 INDEPENDENT RESEARCH: ' : '📚 ACADEMIC COURSE: '}{project.subject}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white font-sora flex flex-wrap items-center gap-2">
                  <span>{project.title}</span>
                  {isStockAi && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[9px] px-2 py-0.5 bg-primary text-black font-semibold rounded-sm tracking-wider uppercase font-sora">
                        BUSINESS
                      </span>
                      <span className="text-[9px] px-2.5 py-0.5 bg-secondary/10 border border-secondary/20 text-secondary font-bold rounded-sm tracking-wider uppercase font-sora">
                        7-DAY TRIAL
                      </span>
                    </div>
                  )}
                </h2>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              {/* Details sections */}
              <div className="flex flex-col gap-3 text-xs leading-relaxed font-sans text-left">
                <div>
                  <h4 className="text-primary font-sora font-bold text-[10px] tracking-wider uppercase mb-1">
                    🎯 BUSINESS GOAL & IMPACT
                  </h4>
                  <p className="text-gray-400 whitespace-pre-line">{project.businessGoal}</p>
                </div>

                <div className="border-t border-white/[0.04] pt-3">
                  <h4 className="text-primary font-sora font-bold text-[10px] tracking-wider uppercase mb-1">
                    🔥 KEY CHALLENGES
                  </h4>
                  <p className="text-gray-400 whitespace-pre-line">{project.challenges}</p>
                </div>

                <div className="border-t border-white/[0.04] pt-3">
                  <h4 className="text-primary font-sora font-bold text-[10px] tracking-wider uppercase mb-1">
                    📖 LEARNINGS & ARCHITECTURE
                  </h4>
                  <p className="text-gray-400 whitespace-pre-line">{project.learnings}</p>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#0B0B0C] border border-white/[0.04] rounded-sm text-[10px] text-gray-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className={`grid grid-cols-1 ${project.github && project.github !== 'private' ? 'sm:grid-cols-2' : ''} gap-3 mt-6 border-t border-white/[0.04] pt-4`}>
              <a
                href={project.downloadPath}
                download={!project.downloadPath.startsWith('http')}
                target={project.downloadPath.startsWith('http') ? '_blank' : undefined}
                rel={project.downloadPath.startsWith('http') ? 'noreferrer' : undefined}
                className="py-2.5 px-4 font-sora font-semibold text-xs rounded-sm flex items-center justify-center gap-1.5 transition-all duration-200 bg-primary border border-primary text-black btn-editorial"
              >
                <Download size={14} />
                DOWNLOAD SOURCE {project.id === 'stock-ai' ? '(.EXE)' : '(.RAR)'}
              </a>

              {project.github && project.github !== 'private' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 bg-[#131315] border border-white/[0.04] text-gray-300 font-sora font-semibold text-xs rounded-sm flex items-center justify-center gap-1.5 hover:border-primary/20 hover:text-white btn-editorial-outline transition-all duration-200"
                >
                  <GithubIcon size={14} />
                  GITHUB CODE
                </a>
              )}
            </div>

            {project.github === 'private' && (
              <p className="text-[10px] text-[#E07A5F] font-bold font-sans italic text-center mt-3 flex items-center justify-center gap-1.5">
                <Lock size={10} className="text-[#E07A5F] flex-shrink-0" />
                Private repository. Contact me via Zalo or details form to request access.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
