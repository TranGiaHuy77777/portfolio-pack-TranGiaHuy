import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import profileData from '../profile.json';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hero', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update browser history URL
      window.history.pushState(null, '', href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'py-3 bg-background/60 backdrop-blur-md border-b border-white/5' : 'py-5 bg-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-width-1440 mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="text-sm font-bold font-sora tracking-widest text-white flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/5 group-hover:border-primary/30 bg-[#131315] group-hover:scale-105 transition-all duration-300 flex items-center justify-center relative">
            <img
              src="/me.png"
              alt="H"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                  const fallback = document.createElement('span');
                  fallback.className = "w-full h-full flex items-center justify-center text-[10px] font-bold text-black bg-primary font-sora";
                  fallback.innerText = "H";
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <span className="group-hover:text-primary transition-colors duration-300">
            {profileData.name.toUpperCase()}
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[10px] font-medium font-sora tracking-widest uppercase text-gray-400 hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white focus:outline-none p-1 rounded-lg border border-white/5 bg-white/5"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-[#0B0B0Cc0] backdrop-blur-lg border-b border-white/5 py-6 px-6 flex flex-col gap-4 z-40 md:hidden shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-semibold font-sora tracking-widest uppercase text-gray-300 hover:text-primary py-2 border-b border-white/5 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
