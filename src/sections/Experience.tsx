import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import profileData from '../profile.json';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12 text-left">
          <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
            CAREER PIPELINE
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white">
            Professional Evolution
          </h2>
          <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
        </div>

        {/* Experience Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {profileData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel glass-panel-hover p-6 md:p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-sora text-white">
                        {exp.company}
                      </h3>
                      <p className="text-xs text-accent font-semibold font-sora mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono">
                    <Calendar size={10} />
                    {exp.period}
                  </div>
                </div>

                {/* Highlights list */}
                <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-sans leading-relaxed border-t border-white/5 pt-4 mt-4">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex gap-2 items-start">
                      <span className="text-accent mt-1.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
