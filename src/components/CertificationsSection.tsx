import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  GraduationCap,
  Eye,
  FileCheck2,
  X
} from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/resumeData';
import { Certification } from '../types';
import { sounds } from '../utils/audio';
import { TiltCard } from './TiltCard';

export const CertificationsSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Award className="w-3.5 h-3.5" />
            <span>06. Credentials & Verified Learning</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Symposiums</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Verified qualifications in IoT fundamentals and competitive technical symposium honors from premier institutions.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <TiltCard key={cert.id} maxTilt={5} scale={1.02} className="h-full">
              <div
                onMouseEnter={() => sounds.playHover()}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-xl h-full"
              >
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/25 transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      {cert.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Verified Credential 0{index + 1}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 p-[1.5px] shrink-0 shadow-md">
                      <div className="w-full h-full bg-[#080b14] rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-['Outfit'] group-hover:text-purple-300 transition-colors">
                        {cert.title}
                      </h3>
                      <div className="text-xs font-mono text-cyan-400 font-semibold mt-1">
                        {cert.issuer}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {cert.description}
                  </p>

                  {/* Skills gained */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Skills & Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsGained.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-800 text-[11px] font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActiveCert(cert);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Credential Details</span>
                  </button>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

        {/* Certificate Inspection Modal */}
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/40 bg-[#080d1a] shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
                  <FileCheck2 className="w-4 h-4" /> Verified Educational Credential
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-6 space-y-4">
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center">
                  <Award className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-xl font-bold text-white font-['Outfit']">
                    {activeCert.title}
                  </h4>
                  <div className="text-xs font-mono text-cyan-400 mt-1">
                    Issued by: {activeCert.issuer}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-white">Verification Summary:</div>
                  <p className="leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {activeCert.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Student: Arun Pandi A</span>
                  <span className="text-emerald-400">Status: Completed</span>
                </div>
              </div>

              <button
                onClick={() => setActiveCert(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
