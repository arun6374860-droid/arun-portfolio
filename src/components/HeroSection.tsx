import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Send, 
  Cpu, 
  Code2, 
  CheckCircle, 
  ExternalLink,
  Layers,
  Award,
  ChevronDown,
  Copy,
  Check,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { sounds } from '../utils/audio';

interface HeroSectionProps {
  openResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ openResumeModal }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'c' | 'python' | 'web'>('c');
  const [copiedCode, setCopiedCode] = useState(false);

  const roles = [
    'Software Developer',
    'C & C++ Systems Programmer',
    'IoT & Embedded Systems Engineer',
    'Python & Web Developer',
    'Electronics & Communication Engineer',
  ];

  // Typewriter effect
  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedRole === currentFullRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedRole((prev) =>
        isDeleting
          ? currentFullRole.substring(0, prev.length - 1)
          : currentFullRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex, roles]);

  const codeSnippets = {
    c: `// Agricultural & Obstacle Rover Autonomous Logic
#include <avr/io.h>
#include <util/delay.h>

void execute_autonomous_rover() {
    float distance_cm = ultrasonic_ping();
    if (distance_cm < 20.0) {
        trigger_obstacle_avoidance();
        recalibrate_steering_pwm(LEFT_TURN);
    } else {
        stream_agricultural_telemetry();
        drive_forward_continuous();
    }
}`,
    python: `# CRM Summary & Real-time Analytics Engine
def generate_crm_summary_report(customer_records):
    analytics = {
        "total_active": len(customer_records),
        "high_priority": sum(1 for c in customer_records if c['tier'] == 'Enterprise'),
        "conversion_rate": calculate_conversion(customer_records)
    }
    return render_dynamic_dashboard_metrics(analytics)`,
    web: `// Weather Application Real-Time Data Pipeline
async function fetchLiveAtmosphericMetrics(cityName) {
    const response = await fetch(\`https://api.weather.org/v1/\${cityName}\`);
    const payload = await response.json();
    updateDynamicDomMetrics({
        temp: payload.main.temp,
        condition: payload.weather[0].description,
        humidity: payload.main.humidity
    });
}`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    sounds.playClick();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Intro & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] text-xs font-mono text-cyan-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Seeking Software Developer & VLSI Internships / Placements</span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Hello, I am
            </h2>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.08]">
              {PERSONAL_INFO.name}
            </h1>
            
            {/* Dynamic Typewriter Text */}
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                {displayedRole}
              </span>
              <span className="w-1 h-7 sm:h-8 bg-cyan-400 ml-1.5 animate-pulse" />
            </div>
          </div>

          {/* Subheading / Summary */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
            {PERSONAL_INFO.summary}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            {/* View Projects */}
            <a
              href="#projects"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] hover:scale-[1.03] transition-all flex items-center gap-2 border border-cyan-300/30 cursor-pointer"
              id="hero-view-projects-btn"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Download Resume */}
            <button
              onClick={() => {
                sounds.playClick();
                openResumeModal();
              }}
              onMouseEnter={() => sounds.playHover()}
              className="px-6 py-3.5 rounded-xl glass-card text-white font-semibold text-sm border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              id="hero-download-resume-btn"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </button>

            {/* Contact Me */}
            <a
              href="#contact"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium text-sm border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              id="hero-contact-btn"
            >
              <Send className="w-4 h-4 text-purple-400" />
              <span>Contact Me</span>
            </a>

            {/* GitHub Profile */}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 font-medium text-sm border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
              id="hero-github-btn"
              title="GitHub: arun6374860-droid"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 w-full max-w-2xl border-t border-slate-800/80">
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card p-3 rounded-xl border border-white/10 hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">{stat.label}</div>
                <div className="text-[10px] text-slate-400 truncate">{stat.description}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Interactive Code Terminal Card */}
        <div className="lg:col-span-5 z-10">
          <div className="relative rounded-2xl glass-card border border-cyan-500/30 p-1 shadow-[0_0_50px_rgba(6,182,212,0.2)] group">
            
            {/* Glowing border accent */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10" />

            <div className="bg-[#070b14] rounded-xl overflow-hidden p-4 sm:p-5">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">arun_pandi_core.dev</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-900/60 border border-slate-800 cursor-pointer"
                  title="Copy Snippet"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1.5 my-3 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveCodeTab('c');
                  }}
                  className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                    activeCodeTab === 'c'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Embedded C
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveCodeTab('python');
                  }}
                  className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                    activeCodeTab === 'python'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Python CRM
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveCodeTab('web');
                  }}
                  className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                    activeCodeTab === 'web'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Weather API
                </button>
              </div>

              {/* Code Display */}
              <pre className="font-mono text-xs text-cyan-300/90 bg-[#04060a] p-4 rounded-xl overflow-x-auto border border-slate-800/80 leading-relaxed shadow-inner max-h-72">
                <code>{codeSnippets[activeCodeTab]}</code>
              </pre>

              {/* Developer Credentials Summary Pill */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Sethu Institute of Technology</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Madurai, TN</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-12">
        <a
          href="#about"
          onClick={() => sounds.playClick()}
          className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors animate-bounce cursor-pointer"
        >
          <span>Explore Portfolio</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
