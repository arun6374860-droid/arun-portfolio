import React from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles, 
  Cpu, 
  Code, 
  Layers, 
  Languages, 
  GraduationCap, 
  Award,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { sounds } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const domains = [
    {
      title: 'Software Development',
      description: 'Crafting robust logic, data structures, and modular algorithms in C, C++, and Python.',
      icon: Code,
      color: 'from-blue-500 to-cyan-400',
      border: 'border-cyan-500/30',
    },
    {
      title: 'IoT & Embedded Systems',
      description: 'Building autonomous rovers, sensor integration, Arduino firmware, and Bluetooth telemetry.',
      icon: Cpu,
      color: 'from-emerald-400 to-teal-500',
      border: 'border-emerald-500/30',
    },
    {
      title: 'Web & API Development',
      description: 'Designing responsive interfaces in HTML, CSS, JavaScript, and integrating backend data pipelines.',
      icon: Layers,
      color: 'from-purple-500 to-pink-500',
      border: 'border-purple-500/30',
    },
    {
      title: 'VLSI & Circuit Design',
      description: 'Applying digital logic, semiconductor fundamentals, and circuit analysis for hardware optimization.',
      icon: Award,
      color: 'from-amber-400 to-orange-500',
      border: 'border-amber-500/30',
    },
  ];

  const spokenLanguages = [
    { name: 'Tamil', fluency: 'Native', level: '100%', tag: 'First Language' },
    { name: 'English', fluency: 'Proficient', level: '90%', tag: 'Professional' },
    { name: 'German', fluency: 'Learning', level: '35%', tag: 'Elementary' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>01. Professional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Me</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Electronics & Communication Engineering undergraduate passionate about bridging software programming with smart hardware systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bio Card & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/20 relative overflow-hidden">
              
              {/* Background gradient accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Engineering Profile & Background
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-5">
                I am an <strong className="text-cyan-300 font-semibold">Electronics and Communication Engineering undergraduate</strong> at Sethu Institute of Technology (Expected Graduation: 2028, <strong className="text-emerald-400">CGPA: 8.2/10</strong>). My engineering foundation combines hands-on software development with practical IoT and embedded hardware systems.
              </p>

              <p className="text-slate-300 text-base leading-relaxed mb-5">
                I am proficient in <strong className="text-white">C, C++, Python, and Web Development</strong>, with practical project experience spanning CRM dashboards, public API-driven weather applications, autonomous agricultural rovers, voice-activated emergency distress systems, and obstacle-avoiding robotics.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm leading-relaxed mb-6">
                <span className="text-emerald-400 font-semibold block mb-1">🎯 Career Objective:</span>
                Actively seeking entry-level roles and internships as a <strong className="text-cyan-300">Software Developer</strong> or <strong className="text-purple-300">VLSI Design Engineer</strong>, where I can apply my analytical skills, programming expertise, and hardware-software integration capabilities.
              </div>

              {/* Quick Contact & Location Pill Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Location</div>
                    <div className="font-medium text-white">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                  <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Institution & CGPA</div>
                    <div className="font-medium text-white">Sethu Inst of Tech (8.2 CGPA)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spoken Languages Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                <Languages className="w-5 h-5 text-purple-400" />
                Spoken Languages
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {spokenLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-base">{lang.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {lang.tag}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mb-3">{lang.fluency}</div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                        style={{ width: lang.level }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Technical Domains */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {domains.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  onMouseEnter={() => sounds.playHover()}
                  className={`glass-card p-5 rounded-2xl border ${d.border} hover:scale-[1.02] transition-all duration-200 group`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${d.color} p-[1.5px] shrink-0 shadow-lg`}
                    >
                      <div className="w-full h-full bg-[#080b14] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                        {d.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
