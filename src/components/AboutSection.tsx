import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Sparkles, 
  Cpu, 
  Code, 
  Layers, 
  Languages, 
  GraduationCap, 
  Award,
  Upload,
  Camera,
  RotateCcw,
  Maximize2,
  X,
  Briefcase,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { sounds } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string>('/images/arun_photo.jpg');
  const [isPhotoZoomOpen, setIsPhotoZoomOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for Edit Mode (via ?edit=true in URL or localStorage) & load saved photo
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isParamEdit = params.get('edit') === 'true' || window.location.hash === '#edit';
      const isSavedEdit = localStorage.getItem('arun_portfolio_edit_mode') === 'true';
      setIsEditMode(isParamEdit || isSavedEdit);

      const savedPhoto = localStorage.getItem('arun_portfolio_profile_photo');
      if (savedPhoto) {
        setPhotoUrl(savedPhoto);
      }
    } catch (e) {
      console.warn('Could not initialize photo/edit state:', e);
    }

    const handleHashOrUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setIsEditMode(params.get('edit') === 'true' || window.location.hash === '#edit');
    };

    window.addEventListener('hashchange', handleHashOrUrl);
    window.addEventListener('popstate', handleHashOrUrl);
    return () => {
      window.removeEventListener('hashchange', handleHashOrUrl);
      window.removeEventListener('popstate', handleHashOrUrl);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
  };

  const processPhotoFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('⚠️ Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('⚠️ File is too large. Maximum size is 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        try {
          localStorage.setItem('arun_portfolio_profile_photo', base64);
        } catch (err) {
          console.warn('LocalStorage quota limit reached, stored in session memory:', err);
        }
        setPhotoUrl(base64);
        sounds.playSuccess();
        showToast('✨ Photo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processPhotoFile(e.dataTransfer.files[0]);
    }
  };

  const handleResetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('arun_portfolio_profile_photo');
    } catch (err) {
      console.warn(err);
    }
    setPhotoUrl('/images/arun_photo.jpg');
    sounds.playClick();
    showToast('Reset to original photo');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
      {/* Hidden file input for actual photo upload (only triggered in edit mode) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        id="about-photo-file-input"
      />

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

        {/* Profile Card with Original Photo Frame */}
        <div className="mb-10 glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Original Photo in Clean Frame */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] group">
                
                {/* Glowing border outline */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 rounded-2xl blur opacity-35 group-hover:opacity-75 transition duration-500 -z-10" />

                <div 
                  className={`relative rounded-xl overflow-hidden bg-[#070b14] border-2 transition-all duration-300 aspect-[4/5] ${
                    isEditMode && dragOver 
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.6)]' 
                      : 'border-cyan-500/40 hover:border-cyan-400'
                  }`}
                  onDragOver={(e) => {
                    if (isEditMode) {
                      e.preventDefault();
                      setDragOver(true);
                    }
                  }}
                  onDragLeave={() => {
                    if (isEditMode) setDragOver(false);
                  }}
                  onDrop={handleDrop}
                >
                  {/* Exact Uploaded / Original Photo Display */}
                  <img
                    src={photoUrl}
                    alt="Arun Pandi A Profile Photo"
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    id="about-profile-photo-img"
                  />

                  {/* Gradient bottom shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Top expand button */}
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setIsPhotoZoomOpen(true);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
                    title="View Full Photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Top left verified badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Active Profile</span>
                  </div>

                  {/* Bottom details */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-xs font-mono font-bold text-white mb-0.5">{PERSONAL_INFO.name}</div>
                    <div className="text-[11px] font-mono text-cyan-300">B.E. ECE • Sethu Inst of Tech</div>
                  </div>
                </div>

                {/* Edit Controls: ONLY VISIBLE IN EDIT MODE (?edit=true), completely hidden for public visitors */}
                {isEditMode && (
                  <div className="mt-3 w-full animate-fade-in">
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        onClick={() => {
                          sounds.playClick();
                          fileInputRef.current?.click();
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        id="about-upload-photo-btn"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo (Edit Mode)</span>
                      </button>

                      <button
                        onClick={handleResetToDefault}
                        className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer text-xs"
                        title="Reset Photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-center text-cyan-400/80 mt-1.5 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Edit Mode Active • Drag & drop or click upload</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Personal Overview & Identity Quick-Facts */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                  Identity & Background
                </span>
                <span className="text-xs font-mono text-slate-400">Class of 2028</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                {PERSONAL_INFO.name}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Electronics and Communication Engineering undergraduate at <strong className="text-cyan-300">Sethu Institute of Technology</strong> with a passion for software craftsmanship, low-level embedded programming, and modern web application development.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Degree & Grade</div>
                    <div className="text-xs font-bold text-white">B.E. ECE • 8.2 CGPA</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Core Focus</div>
                    <div className="text-xs font-bold text-emerald-400">Software & VLSI Systems</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Current Location</div>
                    <div className="text-xs font-bold text-white">Madurai, Tamil Nadu</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Availability</div>
                    <div className="text-xs font-bold text-cyan-300">Open for Internships</div>
                  </div>
                </div>
              </div>

              {/* Career Objective Summary */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-cyan-400 block mb-1">🎯 Career Objective:</strong>
                Actively seeking entry-level software engineering or VLSI internship roles to contribute to scalable applications, firmware design, and hardware-software co-design.
              </div>

            </div>

          </div>

        </div>

        {/* Technical Domains & Spoken Languages Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Spoken Languages */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                <Languages className="w-5 h-5 text-purple-400" />
                Spoken Languages
              </h4>
              <div className="space-y-4">
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
                    <div className="text-xs text-slate-400 mb-2">{lang.fluency}</div>
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
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domains.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  onMouseEnter={() => sounds.playHover()}
                  className={`glass-card p-5 rounded-2xl border ${d.border} hover:scale-[1.02] transition-all duration-200 group flex flex-col justify-between`}
                >
                  <div className="flex items-start gap-4 mb-3">
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
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {d.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 text-cyan-200 text-xs font-mono shadow-[0_0_25px_rgba(6,182,212,0.4)] backdrop-blur-md z-50 animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fullscreen Photo Lightbox Modal */}
      {isPhotoZoomOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsPhotoZoomOpen(false)}
        >
          <div 
            className="glass-card bg-[#0b101e] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPhotoZoomOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4 self-start">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">{PERSONAL_INFO.name}</h3>
                <p className="text-xs text-slate-400 font-mono">Profile Portrait • Full Resolution</p>
              </div>
            </div>

            <div className="relative max-h-[70vh] rounded-xl overflow-hidden border border-slate-700 bg-black flex items-center justify-center">
              <img 
                src={photoUrl} 
                alt={PERSONAL_INFO.name} 
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 flex items-center justify-between w-full text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              {isEditMode ? (
                <button
                  onClick={() => {
                    sounds.playClick();
                    fileInputRef.current?.click();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New File</span>
                </button>
              ) : (
                <span className="text-slate-500">{PERSONAL_INFO.subHeadline}</span>
              )}

              <button
                onClick={() => setIsPhotoZoomOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
