import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Star,
  Zap
} from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/resumeData';
import { sounds } from '../utils/audio';

export const AchievementsSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Flame: <Flame className="w-6 h-6 text-amber-400" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-cyan-400" />,
    Award: <Award className="w-6 h-6 text-purple-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-emerald-400" />,
  };

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>07. Honors & Key Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Achievements</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Demonstrated engineering problem-solving, competitive technical symposium honors, and academic excellence.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS_DATA.map((ach, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sounds.playHover()}
              className="glass-card rounded-3xl p-6 border border-white/10 hover:border-emerald-500/40 hover:scale-[1.02] transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                    {iconMap[ach.icon]}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {ach.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-['Outfit'] group-hover:text-emerald-300 transition-colors mb-1">
                  {ach.title}
                </h3>
                
                <div className="text-xs font-mono text-cyan-400 font-semibold mb-3">
                  {ach.subtitle}
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Verified Milestone</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
