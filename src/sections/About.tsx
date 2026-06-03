import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, BarChart4 } from 'lucide-react';
import profileData from '../profile.json';

export default function About() {
  const timelineIcons = [
    <BarChart4 size={20} className="text-primary" />,
    <UserCheck size={20} className="text-secondary" />,
    <ShieldCheck size={20} className="text-primary" />,
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-background">
      {/* Soft background light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(197,168,128,0.015),transparent_70%)] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-16 text-left">
          <span className="text-[10px] font-bold font-sora tracking-[0.25em] text-primary uppercase">
            STORY-DRIVEN INSIGHT
          </span>
          <h2 className="text-3xl md:text-5xl font-sora text-white leading-tight font-extrabold tracking-tight mt-2">
            Transforming <span className="font-serif italic font-normal text-primary">Operations</span> into <span className="font-serif italic font-normal text-primary">Software</span>
          </h2>
          <div className="w-16 h-[1px] bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Panel: Description Copy (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col gap-6 text-left"
          >
            <h3 className="text-lg font-bold font-sora text-white">
              Why my execution is your competitive advantage.
            </h3>
            <p className="text-xs md:text-sm text-[#A0A0A5] font-sans leading-relaxed">
              While most developers focus solely on code, my hands-on background in retail operations and business workflows gives me a commercial vantage point.
            </p>
            <p className="text-xs md:text-sm text-[#A0A0A5] font-sans leading-relaxed">
              I don't just write code; I actively listen to user pain points and operation bottlenecks to translate them into clean, optimized software architectures.
            </p>
            <div className="p-5 bg-[#131315]/40 border-l border-primary rounded-none">
              <p className="text-xs font-serif italic text-gray-300 leading-relaxed">
                "To me, writing code is simply the final execution step. The true value lies in dissecting customer needs and engineering a solution that drives business performance."
              </p>
            </div>
          </motion.div>

          {/* Middle Panel: Profile Photo Card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col gap-4 items-center relative z-10"
          >
            <div className="relative group/avatar w-full aspect-[3/4] max-w-[220px] rounded-none overflow-hidden border border-white/[0.04] hover:border-primary/20 transition-all duration-500 shadow-2xl bg-[#131315]">
              {/* Matte overlay */}
              <div className="absolute inset-0 bg-[#0B0B0C]/10 opacity-60 group-hover/avatar:opacity-0 transition-opacity duration-500 z-10" />

              {/* Actual Image */}
              <img
                src="/me.jpg"
                alt="Tran Gia Huy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-[1.03]"
              />
            </div>

            {/* Quick Status Tags */}
            <div className="flex flex-col gap-2 w-full max-w-[220px] text-[9px] font-mono">
              <div className="flex justify-between items-center bg-[#131315]/80 border border-white/[0.04] px-3 py-2 rounded-none">
                <span className="text-gray-500 uppercase tracking-widest">Location</span>
                <span className="text-white font-medium">HCMC, Vietnam 🇻🇳</span>
              </div>
              <div className="flex justify-between items-center bg-[#131315]/80 border border-white/[0.04] px-3 py-2 rounded-none">
                <span className="text-gray-500 uppercase tracking-widest">Status</span>
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  ACTIVE
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Interactive Timeline Process (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            {/* Middle connecting line */}
            <div className="absolute left-[35px] top-6 bottom-6 w-[1px] bg-primary/20 hidden md:block" />

            {profileData.timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#131315]/80 border border-white/[0.04] p-6 rounded-none flex flex-col md:flex-row gap-5 items-start relative z-10 text-left transition-all duration-500 hover:border-primary/20 hover:-translate-y-1"
              >
                {/* Node icon indicator */}
                <div className="w-12 h-12 rounded-none bg-[#0B0B0C] border border-white/[0.04] flex items-center justify-center shrink-0 text-primary">
                  {timelineIcons[idx]}
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-medium font-serif italic tracking-wider text-primary">
                    {item.period}
                  </span>
                  <h4 className="text-sm font-bold font-sora text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A0A0A5] font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
