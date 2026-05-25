import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Workflow from './sections/Workflow';
import Contact from './sections/Contact';
import CustomCursor from './components/CustomCursor';
import profileData from './profile.json';

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Reactive Premium Mouse Cursor */}
      <CustomCursor />

      <div className="relative min-h-screen bg-background text-gray-200 overflow-x-hidden selection:bg-primary/30 selection:text-white">
        {/* Floating Glassmorphic Header */}
        <Navigation />

        {/* Main Sections with smooth Scroll Reveal entries */}
        <main>
          {/* Fullscreen 3D Hero Entry (Loads first, zero delay reveal) */}
          <Hero />

          {/* Business Process Storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <About />
          </motion.div>

          {/* Technical Competencies Grid */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Skills />
          </motion.div>

          {/* Project Product Showcases */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Projects />
          </motion.div>

          {/* Career Evolution Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Experience />
          </motion.div>

          {/* Methodology Flow Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Workflow />
          </motion.div>

          {/* Interactive Slide-to-Verify Form */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Contact />
          </motion.div>
        </main>

        {/* Premium Footer */}
        <footer className="py-12 border-t border-white/5 bg-[#0C0C0F]">
          <div className="max-width-1440 mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-xs text-gray-500">
            <div>
              <p className="font-sora font-semibold text-gray-400">
                {profileData.name.toUpperCase()} — PORTFOLIO
              </p>
              <p className="mt-1">
                Building scalable digital products with business-driven engineering execution.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p>© {currentYear} Tran Gia Huy. All rights reserved.</p>
              <p className="mt-1 text-[10px] text-gray-600 font-mono">
                ENGINEERED WITH REACT • VITE • TS • THREE.JS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
