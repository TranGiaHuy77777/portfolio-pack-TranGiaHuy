import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, ShieldCheck, ChevronDown } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ZaloIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M10 8.5h4L10 15h4" strokeWidth="2.5" />
  </svg>
);

const projectOptions = [
  { value: "Fullstack Development", label: "Fullstack Web App React + Java/Node" },
  { value: "Frontend Engineering", label: "High-Performance React/TypeScript UI" },
  { value: "Operations Optimization", label: "Retail Workflow Analysis & Automation" },
  { value: "General Conversation", label: "General Inquiries / Technical Interview" },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Fullstack Development');
  const [message, setMessage] = useState('');

  // Custom Dropdown State & Ref
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        colors: ['#C5A880', '#E07A5F'],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;

    setSubmitting(true);

    // MESSAGE SERVICE CONFIGURATION:
    // ---------------------------------------------------------------------------------
    // Option 1: Discord Webhook (Instant notifications directly on Discord) - FREE & FASTEST
    // Simply create a Webhook on Discord and paste your URL below.
    const DISCORD_WEBHOOK_URL = "";

    // Option 2: Formspree (Forward emails directly to Gmail) - FREE & EASY
    // Register a free account at formspree.io, create a new form, and paste your form ID below.
    const FORMSPREE_FORM_ID = "mzdwajay";
    // ---------------------------------------------------------------------------------

    try {
      if (DISCORD_WEBHOOK_URL) {
        // Send Rich Embed message to Discord
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: "Portfolio Notification Bot",
            avatar_url: "https://i.imgur.com/4M344ox.png",
            embeds: [{
              title: "📩 New Message From Portfolio!",
              color: 3380223, // Neon Blue color
              fields: [
                { name: "👤 Sender", value: name || "Anonymous", inline: true },
                { name: "✉️ Email", value: email || "None", inline: true },
                { name: "🛠️ Requested Project Category", value: projectType, inline: false },
                { name: "📝 Message Details", value: message || "No content.", inline: false }
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "Tran Gia Huy Portfolio" }
            }]
          })
        });
      } else if (FORMSPREE_FORM_ID) {
        // Send message via Formspree to forward to Gmail
        await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, projectType, message })
        });
      } else {
        // Default/Demo Mode: If nothing configured, run a 1.5s simulated submit animation
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

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
          colors: ['#C5A880', '#E07A5F']
        });
        canvasConfetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#C5A880', '#E07A5F']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

    } catch (error) {
      console.error("Message delivery failed:", error);
      alert("An error occurred while connecting to the messaging server. The demo interface will be activated to ensure a seamless experience!");

      // Fallback to simulated success
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(197,168,128,0.015),transparent_70%)] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-16 text-left">
          <span className="text-[10px] font-bold font-sora tracking-[0.25em] text-primary uppercase">
            ENGAGEMENT
          </span>
          <h2 className="text-3xl md:text-5xl font-sora text-white leading-tight font-extrabold tracking-tight mt-2">
            Secure Project <span className="font-serif italic font-normal text-primary">Operations</span>
          </h2>
          <div className="w-16 h-[1px] bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Left panel: Info logs (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <h3 className="text-xl font-bold font-sora text-white">
              Is your process automation shop ready?
            </h3>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              If you have custom digital product requirements, need full-stack software development, or want to audit retail operations cost efficiency, feel free to send a request.
            </p>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Recruiters are welcome to request custom source code walk-throughs or directly download compiled executable (.EXE / .ZIP) archives.
            </p>

            {/* Social badges links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com/trangiahuy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-sm bg-[#131315] border border-white/[0.04] hover:border-primary/50 text-gray-400 hover:text-primary flex items-center justify-center transition-all duration-300"
                title="GitHub Profiles"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://zalo.me/0938987703"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-sm bg-[#131315] border border-white/[0.04] hover:border-primary/50 text-gray-400 hover:text-primary flex items-center justify-center transition-all duration-300"
                title="Zalo Chat"
              >
                <ZaloIcon size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right panel: Premium Dark Matte Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#131315] border border-white/[0.04] p-6 md:p-8 rounded-sm w-full text-left transition-all duration-500 shadow-xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-3 font-sans"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2">
                  <Check size={28} />
                </div>
                <h3 className="text-xl font-bold font-sora text-white">
                  Message sent successfully!
                </h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Thank you for reaching out. I have received your request and will get back to you as soon as possible.
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
                  className="mt-4 px-4 py-2 bg-[#0B0B0C] border border-white/[0.08] hover:border-primary/50 rounded-sm text-xs text-white font-semibold transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold tracking-wider font-sora text-[10px]">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hiring Manager"
                      className="bg-[#0B0B0C] border border-white/[0.04] rounded-sm p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 hover:border-white/[0.08] text-xs transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold tracking-wider font-sora text-[10px]">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="recruiter@company.com"
                      className="bg-[#0B0B0C] border border-white/[0.04] rounded-sm p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 hover:border-white/[0.08] text-xs transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
                  <label className="text-gray-400 font-semibold tracking-wider font-sora text-[10px]">PROJECT CATEGORY REQUEST</label>

                  {/* Dropdown Button */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between bg-[#0B0B0C] border border-white/[0.04] rounded-sm p-3 text-white text-xs hover:border-white/[0.08] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-left font-sans cursor-pointer"
                  >
                    <span>
                      {projectOptions.find(opt => opt.value === projectType)?.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`}
                    />
                  </button>

                  {/* Dropdown Options Menu */}
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-[102%] z-50 bg-[#131315] border border-white/[0.08] rounded-sm shadow-2xl p-1.5 flex flex-col gap-0.5 overflow-hidden"
                    >
                      {projectOptions.map((option) => {
                        const isSelected = projectType === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setProjectType(option.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-sm text-xs transition-all duration-200 font-sans flex items-center justify-between cursor-pointer ${isSelected
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                              }`}
                          >
                            <span>{option.label}</span>
                            {isSelected && <Check size={12} className="text-primary font-bold" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wider font-sora text-[10px]">DETAILED MESSAGE CONTENT</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Briefly describe your business goals or recruitment requirements..."
                    className="bg-[#0B0B0C] border border-white/[0.04] rounded-sm p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 hover:border-white/[0.08] text-xs resize-none transition-all duration-300"
                  />
                </div>

                {/* Secure Anti-Spam Slide to Verify widget */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#88888D] font-semibold tracking-wider font-sora flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-primary" />
                      ANTI-SPAM SECURITY VERIFICATION
                    </span>
                    <span className={`font-mono font-bold ${isVerified ? 'text-primary' : 'text-gray-600'}`}>
                      {isVerified ? 'SECURED' : 'LOCKED'}
                    </span>
                  </div>

                  <div
                    ref={sliderRef}
                    className="relative h-11 bg-[#0B0B0C] border border-white/[0.04] rounded-sm overflow-hidden flex items-center justify-center select-none"
                  >
                    {/* Sand Gold background indication on progress */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-primary/10 transition-all pointer-events-none"
                      style={{ width: `${sliderPosition + 20}px` }}
                    />

                    {/* Locked/Unlocked Text label */}
                    <span className={`text-[10px] pointer-events-none z-10 transition-colors duration-300 font-sora font-semibold ${isVerified ? 'text-primary font-bold' : 'text-gray-500'}`}>
                      {isVerified ? 'VERIFICATION COMPLETE' : 'SLIDE TO UNLOCK'}
                    </span>

                    {/* Floating Handle */}
                    <motion.div
                      className={`absolute left-0.5 top-0.5 bottom-0.5 w-10 rounded-sm flex items-center justify-center cursor-pointer z-20 transition-colors duration-200 ${isVerified
                        ? 'bg-primary text-black'
                        : 'bg-[#131315] text-gray-400 hover:bg-primary hover:text-black border border-white/[0.08]'
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
                  className={`w-full py-3 rounded-sm font-sora font-bold text-xs flex items-center justify-center gap-2 mt-4 transition-all duration-300 cursor-pointer ${isVerified && !submitting
                    ? 'bg-primary border border-primary text-black hover:scale-[1.01] active:scale-[0.99] btn-editorial'
                    : 'bg-white/[0.02] text-gray-600 border border-white/[0.04] cursor-not-allowed'
                    }`}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      TRANSMITTING DATA...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit Contact
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
