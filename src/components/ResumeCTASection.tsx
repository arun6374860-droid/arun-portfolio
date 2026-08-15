import React from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { sounds } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { TiltCard } from './TiltCard';

interface ResumeCTASectionProps {
  openResumeModal: () => void;
}

export const ResumeCTASection: React.FC<ResumeCTASectionProps> = ({ openResumeModal }) => {
  const handleQuickDownload = () => {
    sounds.playSuccess();
    triggerConfetti();
    window.print();
  };

  return (
    <section id="resume-cta" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <TiltCard maxTilt={4} scale={1.01} className="w-full">
          <div className="relative rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-r from-[#0d1527] via-[#141b33] to-[#0f172a] shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
            
            {/* Animated glowing mesh backdrop */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-blob pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left Column: Information */}
              <div className="space-y-4 text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Curriculum Vitae & Technical Dossier</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                  Looking for a Dedicated <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Software Developer</span>?
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Download or inspect my comprehensive 1-page recruiter-friendly resume, complete with verified project metrics, C/C++ architecture, and academic credentials.
                </p>

                {/* Key Quick Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ATS-Optimized
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Academic Records
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    <Terminal className="w-3.5 h-3.5" /> Ready for Immediate Joining
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Glowing Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full sm:w-auto">
                {/* View & Inspect Resume Modal Button */}
                <button
                  onClick={() => {
                    sounds.playSuccess();
                    openResumeModal();
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  id="resume-cta-view-btn"
                  className="relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:scale-[1.03] transition-all flex items-center justify-center gap-3 cursor-pointer border border-cyan-300/40 overflow-hidden"
                >
                  {/* Subtle animated shimmer */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <Eye className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
                  <span>Inspect Full Resume</span>
                  <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Direct Print / PDF Download Button */}
                <button
                  onClick={handleQuickDownload}
                  onMouseEnter={() => sounds.playHover()}
                  id="resume-cta-download-btn"
                  className="px-8 py-4 rounded-2xl glass-card text-white font-bold text-sm border border-slate-700 hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-[1.03] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                  title="Print / Save PDF format"
                >
                  <Download className="w-5 h-5 text-emerald-400" />
                  <span>Download / Print PDF</span>
                </button>
              </div>

            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
