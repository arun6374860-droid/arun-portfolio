import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Sparkles, 
  CheckCircle2,
  Cpu,
  Eye,
  Download,
  ExternalLink,
  School,
  FileCheck,
  TrendingUp,
  Percent,
  Layers,
  ChevronRight,
  Milestone
} from 'lucide-react';
import { EDUCATION_DATA, SCHOOL_EDUCATION_DATA } from '../data/resumeData';
import { SchoolEducationItem } from '../types';
import { sounds } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { MarksheetModal } from './MarksheetModal';
import { TiltCard } from './TiltCard';

export const EducationSection: React.FC = () => {
  const [selectedMarksheet, setSelectedMarksheet] = useState<SchoolEducationItem | null>(null);

  const handleDownloadDirect = (item: SchoolEducationItem, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playSuccess();
    triggerConfetti();

    const downloadFileName = `Arun_Pandi_${item.id.toUpperCase()}_Marksheet.svg`;
    const link = document.createElement('a');
    link.href = item.marksheetFilePath;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewMarksheet = (item: SchoolEducationItem) => {
    sounds.playClick();
    setSelectedMarksheet(item);
  };

  const handleOpenNewTab = (item: SchoolEducationItem, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    window.open(item.marksheetFilePath, '_blank', 'noopener,noreferrer');
  };

  // Chronological order: 10th (2020) -> 12th (2022) -> B.E. College (2022-2026)
  const sortedSchoolData = [...SCHOOL_EDUCATION_DATA].sort((a, b) => {
    if (a.id === '10th') return -1;
    return 1;
  });

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>02. Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Education &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">Timeline</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Verified academic milestones from Secondary School (SSLC), Higher Secondary (HSC), through B.E. Electronics and Communication Engineering.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-indigo-500/30 ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 space-y-16">
          
          {/* Milestone 1: 10th Standard (SSLC) */}
          {sortedSchoolData.filter(s => s.id === '10th').map((item) => (
            <div key={item.id} className="relative group">
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-10 h-10 rounded-full bg-[#080b14] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] z-20 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              <TiltCard maxTilt={4} scale={1.01}>
                <div
                  onMouseEnter={() => sounds.playHover()}
                  id={`education-card-${item.id}`}
                  className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 font-semibold mb-2">
                        <Milestone className="w-3.5 h-3.5" />
                        <span>{item.level} ({item.session})</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                        {item.standardTitle}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 pt-1">
                        <School className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-semibold text-slate-300">{item.schoolName}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 text-center min-w-[110px] shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Score</div>
                      <div className="text-3xl font-black font-['Outfit'] text-amber-400 mt-0.5">
                        {item.percentageDisplay}
                      </div>
                      <div className="text-[10px] font-mono text-slate-300 mt-0.5">
                        {item.totalMarks} / {item.maxMarks}
                      </div>
                    </div>
                  </div>

                  {/* Subject Scores Grid */}
                  <div className="py-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-amber-300">
                        <Layers className="w-3.5 h-3.5" /> Subject Breakdown
                      </span>
                      <span>Max: 100 / subject</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {item.subjects.map((sub, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                          <div className="text-[11px] font-medium text-slate-300 truncate">{sub.name}</div>
                          <div className="text-sm font-black font-mono text-amber-300 mt-0.5">{sub.marksObtained}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleViewMarksheet(item)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View 10th Marksheet</span>
                    </button>
                    <button
                      onClick={(e) => handleDownloadDirect(item, e)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}

          {/* Milestone 2: 12th Standard (HSC) */}
          {sortedSchoolData.filter(s => s.id === '12th').map((item) => (
            <div key={item.id} className="relative group">
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-10 h-10 rounded-full bg-[#080b14] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] z-20 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>

              <TiltCard maxTilt={4} scale={1.01}>
                <div
                  onMouseEnter={() => sounds.playHover()}
                  id={`education-card-${item.id}`}
                  className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold mb-2">
                        <Milestone className="w-3.5 h-3.5" />
                        <span>{item.level} ({item.session})</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                        {item.standardTitle}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 pt-1">
                        <School className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-semibold text-slate-300">{item.schoolName}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center min-w-[110px] shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Score</div>
                      <div className="text-3xl font-black font-['Outfit'] text-cyan-400 mt-0.5">
                        {item.percentageDisplay}
                      </div>
                      <div className="text-[10px] font-mono text-slate-300 mt-0.5">
                        {item.totalMarks} / {item.maxMarks}
                      </div>
                    </div>
                  </div>

                  {/* Subject Scores Grid */}
                  <div className="py-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-300">
                        <Layers className="w-3.5 h-3.5" /> Subject Breakdown
                      </span>
                      <span>Max: 100 / subject</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {item.subjects.map((sub, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                          <div className="text-[11px] font-medium text-slate-300 truncate">{sub.name}</div>
                          <div className="text-sm font-black font-mono text-cyan-300 mt-0.5">{sub.marksObtained}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleViewMarksheet(item)}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View 12th Marksheet</span>
                    </button>
                    <button
                      onClick={(e) => handleDownloadDirect(item, e)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}

          {/* Milestone 3: B.E. Electronics & Communication Engineering (College) */}
          <div className="relative group">
            {/* Glowing Timeline Node */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-10 h-10 rounded-full bg-[#080b14] border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.6)] z-20 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
            </div>

            <TiltCard maxTilt={4} scale={1.01}>
              <div 
                onMouseEnter={() => sounds.playHover()}
                className="glass-card rounded-3xl p-6 sm:p-10 border border-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.2)] relative overflow-hidden group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 font-semibold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Undergraduate Engineering (2022 - 2026)</span>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-white font-['Outfit'] group-hover:text-indigo-300 transition-colors">
                      {EDUCATION_DATA.degree}
                    </h3>
                    <div className="text-base font-semibold text-cyan-400">
                      {EDUCATION_DATA.institution}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
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

                  {/* CGPA Badge */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/50 text-center shrink-0 shadow-[0_0_25px_rgba(99,102,241,0.3)] min-w-[140px]">
                    <div className="text-xs font-mono text-indigo-300 uppercase tracking-widest">
                      Academic CGPA
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 mt-1">
                      {EDUCATION_DATA.cgpa}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono font-medium mt-0.5 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" /> 8.2 / 10.0 CGPA
                    </div>
                  </div>
                </div>

                {/* Coursework */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    Relevant Coursework &amp; Engineering Disciplines
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {EDUCATION_DATA.coursework.map((course) => (
                      <div
                        key={course}
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 hover:border-indigo-500/40 transition-colors"
                      >
                        <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-medium">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {EDUCATION_DATA.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

              </div>
            </TiltCard>
          </div>

        </div>

      </div>

      {/* Interactive Marksheet Fullscreen / Modal Viewer */}
      <MarksheetModal
        item={selectedMarksheet}
        onClose={() => setSelectedMarksheet(null)}
      />
    </section>
  );
};

