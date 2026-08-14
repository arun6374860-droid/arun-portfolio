import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Sparkles, 
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { EDUCATION_DATA } from '../data/resumeData';
import { sounds } from '../utils/audio';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>02. Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">Academics</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Strong undergraduate engineering background at Sethu Institute of Technology with a high academic standard.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className="max-w-4xl mx-auto">
          <div 
            onMouseEnter={() => sounds.playHover()}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)] relative overflow-hidden group"
          >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
              
              {/* Institution & Degree */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-cyan-400 p-[2px] shrink-0 shadow-lg">
                  <div className="w-full h-full bg-[#080b14] rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-indigo-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit'] group-hover:text-indigo-300 transition-colors">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <div className="text-base font-semibold text-cyan-400 mt-1">
                    {EDUCATION_DATA.institution}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {EDUCATION_DATA.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      Expected Graduation: {EDUCATION_DATA.expectedGraduation}
                    </span>
                  </div>
                </div>
              </div>

              {/* CGPA Badge */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900/90 border border-indigo-500/40 text-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <div className="text-xs font-mono text-indigo-300 uppercase tracking-widest">
                  Academic Performance
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 mt-1">
                  {EDUCATION_DATA.cgpa}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono font-medium mt-0.5 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> Excellent Standing
                </div>
              </div>

            </div>

            {/* Core Coursework & Subject Foundations */}
            <div className="mt-8 space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Relevant Coursework & Core Engineering Competencies
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {EDUCATION_DATA.coursework.map((course) => (
                  <div
                    key={course}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-colors"
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-medium">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Academic Takeaways */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
              {EDUCATION_DATA.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
