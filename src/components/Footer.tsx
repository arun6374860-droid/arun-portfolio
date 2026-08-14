import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Cpu, 
  Heart, 
  MapPin, 
  Clock, 
  Sparkles, 
  Linkedin, 
  Github,
  Mail, 
  Phone,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { sounds } from '../utils/audio';

interface FooterProps {
  openResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ openResumeModal }) => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#050811]/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px]">
              <div className="w-full h-full bg-[#080b14] rounded-xl flex items-center justify-center">
                <span className="font-['Outfit'] font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  AP
                </span>
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-white font-['Outfit']">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Software Developer | C & Web Development
              </div>
            </div>
          </div>

          {/* Live Madurai Local Time Widget */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Madurai, TN (IST)</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>{localTime || 'IST Live'}</span>
            </div>
          </div>

          {/* Quick Jump & Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                openResumeModal();
              }}
              className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-mono text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" /> Resume
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors border border-white/10 cursor-pointer"
              title="Scroll to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Sethu Institute of Technology.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
