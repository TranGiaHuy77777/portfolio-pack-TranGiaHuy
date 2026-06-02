import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, BarChart4 } from 'lucide-react';
import profileData from '../profile.json';

export default function About() {
  const timelineIcons = [
    <BarChart4 size={24} className="text-primary" />,
    <UserCheck size={24} className="text-accent" />,
    <ShieldCheck size={24} className="text-secondary" />,
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0C0C0F]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(109,93,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12 text-left">
          <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
            STORY-DRIVEN INSIGHT
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white">
            Transforming Operations into Software
          </h2>
          <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Panel: Description Copy (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col gap-6 text-left"
          >
            <h3 className="text-xl font-bold font-sora text-white">
              Why my execution is your competitive advantage.
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              While most developers focus solely on code, my hands-on background in retail operations and business workflows gives me a commercial vantage point.

              I don't just write code; I actively listen to user pain points and operation bottlenecks to translate them into clean, optimized software architectures.
            </p>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              The result is software that makes day-to-day operations seamless, maximizes end-user productivity, and drives measurable cost efficiency.
            </p>
            <div className="p-4 bg-white/5 border-l-2 border-primary rounded-r-xl">
              <p className="text-[11px] italic text-gray-300 font-sans leading-relaxed">
                "To me, writing code is simply the final execution step. The true value lies in dissecting customer needs and engineering a solution that drives business performance."
              </p>
            </div>
          </motion.div>

          {/* Middle Panel: Profile Photo Card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col gap-4 items-center relative z-10"
          >
            <div className="relative group/avatar w-full aspect-[3/4] max-w-[220px] rounded-2xl overflow-hidden border border-white/10 hover:border-primary/45 transition-colors duration-500 shadow-2xl bg-[#121216]">
              {/* Glowing background ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-60 group-hover/avatar:opacity-100 transition-opacity duration-500" />

              {/* Actual Image */}
              <img
                src="/me.jpg"
                alt="Tran Gia Huy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-105"
              />
            </div>

            {/* Quick Status Tags */}
            <div className="flex flex-col gap-1.5 w-full max-w-[220px] text-[9px] font-mono">
              <div className="flex justify-between items-center bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-xl">
                <span className="text-gray-500">Location</span>
                <span className="text-white font-bold">HCMC, Vietnam 🇻🇳</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-xl">
                <span className="text-gray-500">Status</span>
                <span className="text-green-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Interactive Timeline Process (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            {/* Middle connecting line */}
            <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary via-accent to-secondary/30 hidden md:block" />

            {profileData.timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative z-10 text-left"
              >
                {/* Node icon indicator */}
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  {timelineIcons[idx]}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-accent uppercase">
                    {item.period}
                  </span>
                  <h4 className="text-sm font-bold font-sora text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
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
