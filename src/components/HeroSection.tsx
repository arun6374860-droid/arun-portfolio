import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Send, 
  ChevronDown,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { sounds } from '../utils/audio';

interface HeroSectionProps {
  openResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ openResumeModal }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Software Developer',
    'C & C++ Systems Programmer',
    'IoT & Embedded Systems Engineer',
    'Python & Web Developer',
    'Electronics & Communication Engineer',
  ];

  // Typewriter effect
  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedRole === currentFullRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedRole((prev) =>
        isDeleting
          ? currentFullRole.substring(0, prev.length - 1)
          : currentFullRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex, roles]);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-7 z-10">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] text-xs font-mono text-cyan-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Seeking Software Developer & VLSI Internships / Placements</span>
        </div>

        {/* Name & Headline */}
        <div className="space-y-3 flex flex-col items-center">
          <h2 className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Hello, I am
          </h2>
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.08]">
            {PERSONAL_INFO.name}
          </h1>
          
          {/* Dynamic Typewriter Text */}
          <div className="h-10 sm:h-12 flex items-center justify-center">
            <span className="text-xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
              {displayedRole}
            </span>
            <span className="w-1 h-7 sm:h-8 bg-cyan-400 ml-1.5 animate-pulse" />
          </div>
        </div>

        {/* Subheading / Summary */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          {PERSONAL_INFO.summary}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 w-full">
          {/* View Projects */}
          <a
            href="#projects"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] hover:scale-[1.03] transition-all flex items-center gap-2 border border-cyan-300/30 cursor-pointer"
            id="hero-view-projects-btn"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Download Resume */}
          <button
            onClick={() => {
              sounds.playClick();
              openResumeModal();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="px-6 py-3.5 rounded-xl glass-card text-white font-semibold text-sm border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            id="hero-download-resume-btn"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </button>

          {/* Contact Me */}
          <a
            href="#contact"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium text-sm border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            id="hero-contact-btn"
          >
            <Send className="w-4 h-4 text-purple-400" />
            <span>Contact Me</span>
          </a>

          {/* GitHub Profile */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 font-medium text-sm border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
            id="hero-github-btn"
            title="GitHub: arun6374860-droid"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 w-full max-w-2xl border-t border-slate-800/80">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-3 rounded-xl border border-white/10 hover:border-cyan-500/40 transition-colors text-center"
            >
              <div className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">{stat.label}</div>
              <div className="text-[10px] text-slate-400 truncate">{stat.description}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-12 z-10">
        <a
          href="#about"
          onClick={() => sounds.playClick()}
          className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors animate-bounce cursor-pointer"
        >
          <span>Explore Portfolio</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
