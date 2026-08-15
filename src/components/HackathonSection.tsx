import React from 'react';
import { 
  Flame, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Zap, 
  Award,
  Timer
} from 'lucide-react';
import { HACKATHON_DATA } from '../data/resumeData';
import { sounds } from '../utils/audio';
import { TiltCard } from './TiltCard';

export const HackathonSection: React.FC = () => {
  return (
    <section id="hackathon" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Flame className="w-3.5 h-3.5" />
            <span>05. Hackathon & Innovation Sprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">Spotlight</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Real-world non-stop innovation sprint addressing municipal waste management challenges.
          </p>
        </div>

        {/* Hackathon Highlight Showcase Card */}
        <div className="max-w-5xl mx-auto">
          <TiltCard maxTilt={4} scale={1.01}>
            <div 
              onMouseEnter={() => sounds.playHover()}
              className="glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.2)] relative overflow-hidden group"
            >
              {/* Ambient background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-[2px] shrink-0 shadow-lg">
                    <div className="w-full h-full bg-[#080b14] rounded-2xl flex items-center justify-center">
                      <Flame className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold shadow-sm">
                        Civic Tech Hackathon
                      </span>
                      <span className="text-xs font-mono text-slate-400">Madurai City</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] group-hover:text-amber-300 transition-colors">
                      {HACKATHON_DATA.initiative}
                    </h3>
                    <div className="text-sm font-semibold text-amber-400 mt-1">
                      {HACKATHON_DATA.duration}
                    </div>
                  </div>
                </div>

                {/* Sprint Clock Badge */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/80 to-slate-900 border border-amber-500/50 text-center shrink-0 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                  <div className="text-xs font-mono text-amber-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-amber-400" /> Sprint Endurance
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mt-1">
                    36 Hours
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono font-medium mt-0.5">
                    Non-Stop Rapid Prototyping
                  </div>
                </div>
              </div>

              {/* Description and Key Contributions */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" />
                    Key Sprint Contributions & Outcomes
                  </h4>
                  <div className="space-y-3">
                    {HACKATHON_DATA.keyContributions.map((contrib, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{contrib}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Attributes Showcase */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold mb-1">
                      <Users className="w-4 h-4 text-amber-400" /> Teamwork & Cross-Collaboration
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Collaborated seamlessly under tight sprint deadlines with multidisciplinary team members to architect civic waste solutions.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold mb-1">
                      <Zap className="w-4 h-4 text-cyan-400" /> Pressure Handling & Agility
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Demonstrated rapid problem-solving, real-time debugging, and prototype delivery during intense 36-hour sprint milestones.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {HACKATHON_DATA.techFocus.map((focus) => (
                      <span
                        key={focus}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-mono"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </TiltCard>
        </div>

      </div>
    </section>
  );
};

