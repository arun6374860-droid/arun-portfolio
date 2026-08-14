import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  FileText, 
  Menu, 
  X, 
  Send,
  Sparkles,
  Github,
  ExternalLink
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { PERSONAL_INFO } from '../data/resumeData';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  openResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, openResumeModal }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Hackathon', href: '#hackathon' },
    { label: 'Certificates', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'hackathon', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sounds.playClick();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between border ${
          isScrolled
            ? 'glass-card shadow-[0_10px_35px_rgba(0,0,0,0.3)] border-cyan-500/20 bg-[#080b14]/80'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          onMouseEnter={() => sounds.playHover()}
          className="flex items-center gap-3 group"
          id="nav-logo"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#090d16] rounded-xl flex items-center justify-center">
              <span className="font-['Outfit'] font-black text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                AP
              </span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#080b14]" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Outfit'] font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              {PERSONAL_INFO.name}
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                8.2 CGPA
              </span>
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Software Developer | IoT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 glass-card px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => sounds.playHover()}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-cyan-500/15 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-xl glass-card text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer border border-white/10 hover:border-cyan-500/30"
            title={isMuted ? 'Unmute UI Audio' : 'Mute UI Audio'}
            aria-label="Toggle Sound Effects"
            id="sound-toggle-btn"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              toggleTheme();
            }}
            className="p-2 rounded-xl glass-card text-slate-300 hover:text-amber-400 transition-colors cursor-pointer border border-white/10 hover:border-amber-500/30"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Color Theme"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* GitHub Profile Icon Link */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.playClick()}
            className="p-2 rounded-xl glass-card text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer border border-white/10 hover:border-cyan-500/30 flex items-center justify-center"
            title="GitHub: arun6374860-droid"
            aria-label="GitHub Profile"
            id="nav-github-btn"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Resume CTA Button */}
          <button
            onClick={() => {
              sounds.playClick();
              openResumeModal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white text-xs font-semibold shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-[1.03] transition-all cursor-pointer border border-cyan-300/30"
            id="nav-resume-btn"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl glass-card text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer border border-white/10"
            aria-label="Toggle Mobile Menu"
            id="mobile-menu-toggle-btn"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto glass-card rounded-2xl p-5 border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <FileText className="w-4 h-4" /> View & Download Full Resume
            </button>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 hover:text-white border border-cyan-500/20 text-xs font-mono"
            >
              <Github className="w-3.5 h-3.5" /> GitHub: {PERSONAL_INFO.githubUsername}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 text-slate-300 hover:text-cyan-400 text-xs font-medium"
            >
              <Send className="w-3.5 h-3.5" /> Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
