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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Panel: Description Copy (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <h3 className="text-xl font-bold font-sora text-white">
              Why my background is your unfair advantage.
            </h3>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Most developers only see the code tree. Having managed direct retail operations and customer relations, I see the whole commercial forest.
            </p>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              I specialize in mapping daily operational friction, customer complaints, and retail workflows into ultra-fluid, clean frontend software. I build systems that staff love to use and business owners count on to cut costs.
            </p>
            <div className="p-4 bg-white/5 border-l-2 border-primary rounded-r-xl">
              <p className="text-xs italic text-gray-300 font-sans leading-relaxed">
                "I do not just build layouts. I translate store operations metrics and customer empathy into high-performance software."
              </p>
            </div>
          </motion.div>

          {/* Right Panel: Interactive Timeline Process (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative">
            {/* Middle connecting line */}
            <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary via-accent to-secondary/30 hidden md:block" />

            {profileData.timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative z-10 text-left"
              >
                {/* Node icon indicator */}
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  {timelineIcons[idx]}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-accent uppercase">
                    {item.period}
                  </span>
                  <h4 className="text-base font-bold font-sora text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
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
