import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Send, 
  ChevronDown,
  Github,
  Code2,
  Cpu,
  Terminal,
  Zap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { sounds } from '../utils/audio';
import { TiltCard } from './TiltCard';

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
    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && displayedRole === currentFullRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
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
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Floating glowing background decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating tech nodes in background */}
      <div className="hidden lg:flex absolute top-36 left-[12%] items-center gap-2 px-3 py-1.5 rounded-2xl glass-card border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-pulse pointer-events-none">
        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
        <span>C & C++ Architecture</span>
      </div>

      <div className="hidden lg:flex absolute top-48 right-[12%] items-center gap-2 px-3 py-1.5 rounded-2xl glass-card border border-purple-500/30 text-purple-300 text-xs font-mono shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-pulse animation-delay-2000 pointer-events-none">
        <Cpu className="w-3.5 h-3.5 text-purple-400" />
        <span>IoT & Embedded Rovers</span>
      </div>

      <div className="hidden lg:flex absolute bottom-36 left-[14%] items-center gap-2 px-3 py-1.5 rounded-2xl glass-card border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse animation-delay-4000 pointer-events-none">
        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
        <span>Python & Web Engines</span>
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-7 z-10">
        
        {/* Status Badge with Neon Ripple */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-xs font-mono text-cyan-300 backdrop-blur-md hover:border-cyan-400 transition-all">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wide">Seeking Software Developer &amp; VLSI Internships / Placements</span>
        </div>

        {/* Name & Headline */}
        <div className="space-y-3 flex flex-col items-center">
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            Hello, I am
          </h2>
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.08] drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
            {PERSONAL_INFO.name}
          </h1>
          
          {/* Dynamic Typewriter Text with Neon Caret */}
          <div className="h-10 sm:h-12 flex items-center justify-center">
            <span className="text-xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              {displayedRole}
            </span>
            <span className="w-1 h-7 sm:h-8 bg-cyan-400 ml-1.5 animate-pulse shadow-[0_0_10px_#06b6d4]" />
          </div>
        </div>

        {/* Subheading / Summary */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          {PERSONAL_INFO.summary}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2 w-full">
          {/* View Projects CTA */}
          <a
            href="#projects"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] hover:scale-[1.03] transition-all flex items-center gap-2 border border-cyan-300/40 cursor-pointer overflow-hidden"
            id="hero-view-projects-btn"
          >
            {/* Shimmer animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Download Resume CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              openResumeModal();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="px-6 py-3.5 rounded-xl glass-card text-white font-bold text-sm border border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/15 hover:scale-[1.03] transition-all flex items-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.2)]"
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
            className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-2 cursor-pointer"
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
            className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 font-semibold text-sm border border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-2 cursor-pointer"
            id="hero-github-btn"
            title="GitHub: arun6374860-droid"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>

        {/* Quick Metrics Bar with 3D Tilt */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 w-full max-w-3xl border-t border-slate-800/80">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <TiltCard key={i} maxTilt={5} scale={1.03}>
              <div className="glass-card p-3.5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all text-center group h-full flex flex-col justify-center">
                <div className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{stat.description}</div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-12 z-10">
        <a
          href="#about"
          onClick={() => sounds.playClick()}
          className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors animate-bounce cursor-pointer group"
        >
          <span className="group-hover:tracking-wider transition-all">Explore Portfolio</span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </a>
      </div>
    </section>
  );
};

