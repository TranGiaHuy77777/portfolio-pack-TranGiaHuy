import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, ShieldCheck } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Fullstack Development');
  const [message, setMessage] = useState('');

  // Slide to Verify states
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Form status states
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isVerified || !sliderRef.current) return;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const handleWidth = 40; // width of handle
    const maxDistance = width - handleWidth - 4; // margin padding boundary
    const relativeX = e.clientX - left - handleWidth / 2;
    const boundedX = Math.max(0, Math.min(relativeX, maxDistance));
    
    setSliderPosition(boundedX);

    // If reached end boundary, unlock!
    if (boundedX >= maxDistance - 2) {
      setIsVerified(true);
      setIsDragging(false);
      // Triggers subtle celebration confetti
      canvasConfetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#00D9FF', '#6D5DF6'],
      });
    }
  };

  const handleMouseUp = () => {
    if (isVerified) return;
    setIsDragging(false);
    // Reset to start on release
    setSliderPosition(0);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isVerified]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;

    setSubmitting(true);
    // Simulate API upload
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Giant multi-directional confetti splash!
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        canvasConfetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6D5DF6', '#00D9FF', '#9E7BFF']
        });
        canvasConfetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6D5DF6', '#00D9FF', '#9E7BFF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
            ENGAGEMENT
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white">
            Secure Project Operations
          </h2>
          <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-center">
          {/* Left panel: Info logs (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <h3 className="text-xl font-bold font-sora text-white">
              Ready to automate your store workflows?
            </h3>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              If you have a digital product requirement, need custom fullstack pipelines, or want to audit your store operations overhead, send a request.
            </p>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Recruiters are welcome to request specific code showcases or download specific project RAR sources directly.
            </p>

            {/* Social badges links */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://github.com/trangiahuy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:border-gray-500 text-gray-400 hover:text-white flex items-center justify-center transition-all"
                title="GitHub Profiles"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com/in/trangiahuy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:border-gray-500 text-gray-400 hover:text-white flex items-center justify-center transition-all"
                title="LinkedIn Connections"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right panel: Glassmorphic form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#121216]/60 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl w-full text-left"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-3 font-sans"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 mb-2">
                  <Check size={28} />
                </div>
                <h3 className="text-xl font-bold font-sora text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Thank you for reaching out. I have received your requirements log and will reply back as soon as operations permit.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setIsVerified(false);
                    setSliderPosition(0);
                  }}
                  className="mt-4 px-4 py-2 border border-white/10 hover:border-gray-500 rounded-lg text-xs text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-medium">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Recruiter Lead"
                      className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-medium">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. recruiter@company.com"
                      className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-medium">PROJECT REQUIREMENT TYPE</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                  >
                    <option value="Fullstack Development" className="bg-[#121216]">Fullstack React + Java/Node Webapp</option>
                    <option value="Frontend Engineering" className="bg-[#121216]">Elite React / TypeScript Layout</option>
                    <option value="Operations Optimization" className="bg-[#121216]">Store Workflow Analysis & Scripting</option>
                    <option value="General Conversation" className="bg-[#121216]">Saying Hello / Tech Interview</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-medium">MESSAGE LOG DETAILS</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Briefly explain your business objective or job opening requirements..."
                    className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs resize-none"
                  />
                </div>

                {/* Secure Anti-Spam Slide to Verify widget */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-medium flex items-center gap-1">
                      <ShieldCheck size={11} className="text-accent" />
                      ANTI-SPAM GATEWAY
                    </span>
                    <span className={`font-mono font-bold ${isVerified ? 'text-green-400' : 'text-gray-500'}`}>
                      {isVerified ? 'SECURED' : 'LOCKED'}
                    </span>
                  </div>

                  <div
                    ref={sliderRef}
                    className="relative h-11 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center select-none"
                  >
                    {/* Glowing background indication */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-primary/20 transition-all pointer-events-none"
                      style={{ width: `${sliderPosition + 20}px` }}
                    />

                    {/* Locked/Unlocked Text label */}
                    <span className={`text-[10px] pointer-events-none z-10 transition-colors duration-300 font-sora font-semibold ${
                      isVerified ? 'text-green-400 font-bold' : 'text-gray-400'
                    }`}>
                      {isVerified ? 'VERIFICATION COMPLETED' : 'SLIDE RIGHT TO UNLOCK'}
                    </span>

                    {/* Floating Handle */}
                    <motion.div
                      className={`absolute left-0.5 top-0.5 bottom-0.5 w-10 rounded-lg flex items-center justify-center cursor-pointer shadow-md z-20 ${
                        isVerified
                          ? 'bg-green-500 text-black'
                          : 'bg-white text-black hover:bg-accent'
                      }`}
                      style={{ x: sliderPosition }}
                      onMouseDown={() => {
                        if (!isVerified) setIsDragging(true);
                      }}
                      animate={isVerified ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {isVerified ? <Check size={16} /> : <Send size={14} className="rotate-45" />}
                    </motion.div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isVerified || submitting}
                  className={`w-full py-3 rounded-xl font-sora font-bold text-xs flex items-center justify-center gap-2 mt-4 transition-all duration-300 ${
                    isVerified && !submitting
                      ? 'bg-glow-gradient text-black hover:scale-[1.02] active:scale-95 shadow-neon-glow'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      TRANSMITTING LOGS...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      TRANSMIT MESSAGE
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
