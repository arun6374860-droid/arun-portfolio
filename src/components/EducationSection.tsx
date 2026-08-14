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
  ChevronRight
} from 'lucide-react';
import { EDUCATION_DATA, SCHOOL_EDUCATION_DATA } from '../data/resumeData';
import { SchoolEducationItem } from '../types';
import { sounds } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { MarksheetModal } from './MarksheetModal';

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
            Education &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">Academics</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Verified academic milestones from Secondary School (SSLC), Higher Secondary (HSC), through B.E. Electronics and Communication Engineering.
          </p>
        </div>

        {/* School Education Cards (12th & 10th Standards) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
                Schooling &amp; Board Marksheets
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              Official Tamil Nadu State Board Certificates
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SCHOOL_EDUCATION_DATA.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => sounds.playHover()}
                id={`education-card-${item.id}`}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.3)] flex flex-col justify-between"
              >
                {/* Ambient glow */}
                <div 
                  className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity bg-gradient-to-br ${item.color}`} 
                />

                <div>
                  {/* Card Header: Level Tag & Prominent Percentage Dial */}
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300 font-semibold shadow-inner">
                        <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.level}</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit'] mt-2 group-hover:text-cyan-300 transition-colors">
                        {item.standardTitle}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 pt-1">
                        <School className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="font-semibold text-slate-300">{item.schoolName}</span>
                      </p>
                    </div>

                    {/* Prominent Score Pill */}
                    <div className={`shrink-0 p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border ${
                      item.id === '12th' ? 'border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.2)]' : 'border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                    } text-center min-w-[105px]`}>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        Percentage
                      </div>
                      <div className={`text-3xl sm:text-4xl font-black font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-tr ${item.color} mt-0.5`}>
                        {item.percentageDisplay}
                      </div>
                      <div className="text-[10px] font-mono text-slate-300 mt-1 font-semibold">
                        {item.totalMarks} / {item.maxMarks}
                      </div>
                    </div>
                  </div>

                  {/* Institution Details & Session */}
                  <div className="py-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono border-b border-slate-800/60 text-slate-400">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Board</span>
                      <span className="text-slate-200 font-semibold">{item.board}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Exam Session</span>
                      <span className="text-slate-200 font-semibold">{item.session}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="block text-[10px] text-slate-500 uppercase">Standing</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> First Class Distinction
                      </span>
                    </div>
                  </div>

                  {/* Key Subject Scores Showcase */}
                  <div className="py-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        Subject-wise Marks
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400">Max: 100 / subject</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {item.subjects.map((sub, i) => (
                        <div 
                          key={i}
                          className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-colors flex items-center justify-between"
                        >
                          <div className="truncate mr-1">
                            <div className="text-xs font-medium text-slate-200 truncate">{sub.name}</div>
                            {sub.tamilName && (
                              <div className="text-[10px] text-slate-500 truncate">{sub.tamilName}</div>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-sm font-black font-mono text-cyan-300">
                              {sub.marksObtained}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="py-2 space-y-1.5 text-xs text-slate-300">
                    {item.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons (View Marksheet & Download Marksheet) */}
                <div className="pt-6 mt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  {/* Primary View Button */}
                  <button
                    onClick={() => handleViewMarksheet(item)}
                    id={`view-marksheet-btn-${item.id}`}
                    className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                  >
                    <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span>View Marksheet</span>
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={(e) => handleDownloadDirect(item, e)}
                    id={`download-marksheet-btn-${item.id}`}
                    className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-500/60 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group/dl"
                    title="Download original marksheet file"
                  >
                    <Download className="w-4 h-4 group-hover/dl:translate-y-0.5 transition-transform" />
                    <span className="hidden sm:inline">Download</span>
                  </button>

                  {/* New Tab Shortcut */}
                  <button
                    onClick={(e) => handleOpenNewTab(item, e)}
                    className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                    title="Open marksheet in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Undergraduate Engineering Card (Sethu Institute of Technology) */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4 px-1">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              Undergraduate Engineering Degree
            </h3>
          </div>

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
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900/90 border border-indigo-500/40 text-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.2)] min-w-[140px]">
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

            {/* Core Coursework & Subject Foundations */}
            <div className="mt-8 space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Relevant Coursework &amp; Core Engineering Competencies
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

      {/* Interactive Marksheet Fullscreen / Modal Viewer */}
      <MarksheetModal
        item={selectedMarksheet}
        onClose={() => setSelectedMarksheet(null)}
      />
    </section>
  );
};
