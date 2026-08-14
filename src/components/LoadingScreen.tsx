import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, CheckCircle2, Sparkles, FastForward } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const logs = [
    'Initializing Core Systems: Arun Pandi A Developer Portfolio...',
    'Loading C / C++ & Embedded Architecture Modules...',
    'Mounting IoT Telemetry, Arduino & Microcontroller Frameworks...',
    'Compiling Python CRM Engine & REST API Services...',
    'Calibrating Madurai Clean City Hackathon & Project Repositories...',
    'Ready: Welcome to Arun Pandi A\'s Developer Portfolio',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepIndex = Math.min(
      Math.floor((progress / 100) * logs.length),
      logs.length - 1
    );
    setCurrentStep(stepIndex);
  }, [progress, logs.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060911] text-slate-100 p-6">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-lg glass-card rounded-2xl p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              sys://arun-pandi/boot.sh
            </span>
          </div>
          <button
            onClick={onComplete}
            className="text-xs font-mono text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-cyan-500/10 cursor-pointer"
          >
            <FastForward className="w-3 h-3" /> Skip
          </button>
        </div>

        {/* Animated Developer Avatar / Logo */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full bg-[#080b14] rounded-2xl flex items-center justify-center flex-col">
              <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                AP.DEV
              </span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-4 ring-[#080b14] animate-ping" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-4 font-['Outfit']">
            ARUN PANDI A
          </h2>
          <p className="text-xs text-cyan-400 font-mono tracking-wide mt-0.5">
            Software Developer | Embedded & Web
          </p>
        </div>

        {/* Dynamic Log Text */}
        <div className="bg-[#04060a]/80 rounded-xl p-3 border border-slate-800/80 my-4 min-h-[58px] flex items-center">
          <div className="flex items-start space-x-2">
            <span className="text-cyan-400 font-mono text-xs select-none">{'>'}</span>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              {logs[currentStep]}
              <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Compiling Portfolio
            </span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_#06b6d4]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>ECE Undergraduate @ SIT</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" /> Ready for Internships
          </span>
        </div>
      </div>
    </div>
  );
};
