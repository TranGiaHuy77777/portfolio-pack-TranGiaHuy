import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import profileData from '../profile.json';

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#C5A880]/[0.01] blur-[150px] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-16 text-left">
          <span className="text-[10px] font-bold font-sora tracking-[0.25em] text-primary uppercase">
            CAREER PIPELINE
          </span>
          <h2 className="text-3xl md:text-5xl font-sora text-white leading-tight font-extrabold tracking-tight mt-2">
            Professional <span className="font-serif italic font-normal text-primary">Evolution</span>
          </h2>
          <div className="w-16 h-[1px] bg-primary mt-4" />
        </div>

        {/* Experience Timeline Asymmetrical Grid */}
        <div className="flex flex-col gap-12 max-w-4xl mx-auto text-left relative mt-16">
          {/* Thin timeline divider line */}
          <div className="absolute left-[15px] md:left-[160px] top-2 bottom-2 w-[1px] bg-primary/20" />

          {profileData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 relative z-10"
            >
              {/* Left Side: Period indicator */}
              <div className="w-[120px] shrink-0 pl-10 md:pl-0 md:text-right pt-1 md:pt-2">
                <span className="text-xl md:text-2xl font-serif italic text-primary block leading-none font-light">
                  {exp.period.split(' - ')[0]}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-gray-500 block mt-1">
                  TO {exp.period.split(' - ')[1] || 'PRESENT'}
                </span>
              </div>

              {/* Timeline Node dot */}
              <div className="absolute left-[11px] md:left-[156px] top-[7px] md:top-[11px] w-2.5 h-2.5 rounded-full bg-primary border-[3px] border-background shrink-0 z-20" />

              {/* Right Side: Details Card */}
              <div className="flex-1 bg-[#131315]/80 border border-white/[0.04] p-6 md:p-8 rounded-sm hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 ml-8 md:ml-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 pb-4 border-b border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm bg-[#0B0B0C] border border-white/[0.04] flex items-center justify-center text-primary">
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold font-sora text-white">
                        {exp.company}
                      </h3>
                      <p className="text-xs text-primary font-semibold font-sora mt-0.5 tracking-widest uppercase">
                        {exp.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlights list */}
                <ul className="flex flex-col gap-3 text-xs text-[#A0A0A5] font-sans leading-relaxed pt-5">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex gap-2.5 items-start">
                      <span className="text-primary mt-1.5">•</span>
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

