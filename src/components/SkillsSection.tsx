import React, { useState } from 'react';
import { 
  Code2, 
  Globe, 
  Wrench, 
  Cpu, 
  Languages, 
  Sparkles, 
  Check, 
  Search,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/resumeData';
import { sounds } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const iconMap: Record<string, React.ReactNode> = {
    Code: <Code2 className="w-4 h-4" />,
    Globe: <Globe className="w-4 h-4" />,
    Wrench: <Wrench className="w-4 h-4" />,
    Cpu: <Cpu className="w-4 h-4" />,
    Languages: <Languages className="w-4 h-4" />,
  };

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.badge.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter((cat): cat is typeof SKILL_CATEGORIES[0] => cat !== null && cat.skills.length > 0);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>03. Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Expertise</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Strictly derived from real project development in C, C++, Python, Web Development, and IoT embedded hardware.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl glass-card border border-white/10 w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. C, Python, IoT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl glass-card text-xs text-white placeholder-slate-400 border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Skill Category Cards */}
        <div className="space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              
              {/* Category Subtitle */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/80">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {iconMap[category.iconName]}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                  {category.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline-block">
                  ({category.skills.length} competencies)
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => sounds.playHover()}
                    className="glass-card rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Skill Row */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </span>
                        <span
                          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${skill.color}20`,
                            color: skill.color,
                            border: `1px solid ${skill.color}40`,
                          }}
                        >
                          {skill.badge}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-slate-400 mb-3">
                        Proficiency: <span className="text-slate-200 font-semibold">{skill.level}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                        {skill.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Mastery</span>
                        <span style={{ color: skill.color }} className="font-bold">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${skill.percentage}%`,
                            backgroundColor: skill.color,
                            boxShadow: `0 0 8px ${skill.color}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16 glass-card rounded-2xl border border-white/10">
              <p className="text-slate-400 text-sm">No skills matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-3 text-xs text-cyan-400 font-mono hover:underline"
              >
                Reset search filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
