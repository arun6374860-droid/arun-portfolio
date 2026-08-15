import React, { useState } from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Play, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Code,
  ArrowUpRight,
  Radio,
  Bot
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/resumeData';
import { Project } from '../types';
import { ProjectDemoModal } from './ProjectDemoModal';
import { sounds } from '../utils/audio';
import { TiltCard } from './TiltCard';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Web Development' | 'IoT / Embedded Systems'>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'Web Development', 'IoT / Embedded Systems'] as const;

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>04. Featured Engineering Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Software development, Python data engines, and autonomous IoT embedded systems built and programmed by Arun Pandi A.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-card border border-white/10 shadow-lg">
            {categories.map((cat) => {
              const isSelected = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedFilter(cat);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.45)] scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <TiltCard
              key={project.id}
              maxTilt={6}
              scale={1.02}
              className="h-full"
            >
              <div
                onMouseEnter={() => sounds.playHover()}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-2xl h-full"
                style={{
                  boxShadow: `0 15px 35px -10px ${project.glowColor}30`,
                }}
              >
                {/* Holographic animated gradient border accent on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none p-[1px] bg-gradient-to-br from-cyan-400/50 via-purple-500/40 to-transparent -z-10" />

                {/* Background ambient gradient glow */}
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${project.glowColor}, transparent)`,
                  }}
                />

                <div>
                  {/* Card Top Pill & Category */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)] flex items-center gap-1.5">
                      {project.category.includes('IoT') ? <Bot className="w-3 h-3" /> : <Code className="w-3 h-3" />}
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      Project 0{index + 1}
                    </span>
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-indigo-400 font-semibold mt-1 mb-4">
                    {project.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Resume Bullets */}
                  <div className="space-y-2.5 mb-6">
                    {project.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges with micro-interactions */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-[11px] font-mono font-medium hover:border-cyan-400 hover:text-cyan-300 hover:scale-105 transition-all shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sounds.playSuccess()}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer border border-emerald-300/40"
                        title={`Open Live Deployed App (${project.liveUrl})`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live App</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setActiveProjectModal(project);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer border border-cyan-300/30"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{project.liveUrl ? 'Sandbox' : 'Launch Sandbox'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl || 'https://github.com/arun6374860-droid'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-mono group/btn"
                      title={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span className="hidden sm:inline text-[11px]">Code</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/arun-pandi-a43a003a9"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
                      title="View Author LinkedIn"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

      </div>

      {/* Interactive Simulation Modal */}
      {activeProjectModal && (
        <ProjectDemoModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
};

