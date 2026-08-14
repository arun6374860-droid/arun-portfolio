import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  Github,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, SCHOOL_EDUCATION_DATA, SKILL_CATEGORIES, PROJECTS_DATA, HACKATHON_DATA, CERTIFICATIONS_DATA } from '../data/resumeData';
import { triggerConfetti, triggerSuperConfetti } from '../utils/confetti';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playSuccess();
    triggerConfetti();
    window.print();
  };

  const handleCopyText = () => {
    sounds.playClick();
    const resumeText = `
ARUN PANDI A
Software Developer | C & Web Development
+91 6374868926 | arun6374860@gmail.com | Madurai, Tamil Nadu
LinkedIn: linkedin.com/in/arun-pandi-a43a003a9 | GitHub: github.com/arun6374860-droid

PROFESSIONAL SUMMARY
Electronics and Communication Engineering undergraduate (Expected 2028, GPA: 8.2/10) with hands-on experience in software development, IoT, and embedded systems. Proficient in C, C++, Python, and basic web development with project experience spanning CRM dashboards, weather applications, and hardware-software integrated systems. Participated in a 36-hour hackathon focused on Madurai Clean City initiatives. Seeking entry-level roles as a Software Developer or VLSI Design Engineer.

TECHNICAL SKILLS
• Programming Languages: C, C++, Basic Java, Python
• Web Development: HTML, CSS, Basic JavaScript, Responsive Design
• Tools & IDEs: VS Code, Arduino IDE, Git
• Domains: Software Development, IoT (Internet of Things), Embedded Systems
• Spoken Languages: Tamil (Native), English (Proficient), German (Learning)

EDUCATION
Bachelor of Engineering (B.E.) – Electronics and Communication Engineering
Sethu Institute of Technology, Madurai, Tamil Nadu
Expected Graduation: 2028 | CGPA: 8.2 / 10.0

Higher Secondary Course (12th Standard HSC) – 85%
St. Britto Hr. Sec. School, Madurai, Tamil Nadu (State Board | Marks: 510/600 | 2024)

Secondary School Leaving Certificate (10th Standard SSLC) – 83%
St. Joseph's High School, Samayanallur, Madurai (State Board | Marks: 419/500 | 2022)

PROJECTS
1. CRM Dashboard | Web Development / Python (Live: https://arun-web-seven.vercel.app)
• Built a Customer Relationship Management (CRM) dashboard to manage and visualise customer data efficiently.
• Developed interactive UI components using HTML, CSS, and basic JavaScript for data display and filtering.
• Implemented backend logic using Python to handle data operations and generate summary reports.

2. Weather Application | Web Development / API Integration (Live: https://arun-weather.vercel.app)
• Developed a weather application that fetches and displays real-time weather data using a public weather API.
• Designed a clean, responsive front-end using HTML and CSS for cross-device compatibility.
• Implemented JavaScript logic for API calls, JSON parsing, and dynamic content rendering.

3. Agricultural Rover | IoT / Embedded Systems / C
• Built an autonomous rover for agricultural field monitoring using microcontroller programming in C.
• Integrated sensors for real-time data acquisition and programmed navigation algorithms in Arduino IDE.

4. Bluetooth Voice Emergency System | IoT / Embedded Systems
• Developed a voice-activated emergency alert system using Bluetooth (HC-05) modules and Arduino.
• System processes voice commands and transmits distress signals to predefined contacts in real time.

5. Obstacle Avoiding Rover | Embedded Systems / C / Sensor Integration
• Engineered an Arduino-powered rover with ultrasonic sensors to autonomously detect and avoid obstacles.
• Applied digital logic and circuit analysis principles to optimise sensor response and motor control.

HACKATHON
36-Hour Hackathon – Madurai Clean City Initiative
• Participated in a 36-hour non-stop hackathon focused on developing tech solutions for urban cleanliness in Madurai.
• Collaborated in a team to design and prototype a solution addressing civic waste management challenges.
• Demonstrated problem-solving ability, teamwork, and ability to perform under pressure within tight deadlines.

CERTIFICATIONS & ACHIEVEMENTS
• IoT Fundamentals – Level 1 Certification
• IoT Fundamentals – Level 2 Certification
• Technical Symposium Certificate – NIT (National Institute of Technology)
• Technical Symposium Certificate – SSN College of Engineering
• Attended multiple inter-college technical symposiums, showcasing initiative beyond classroom learning.
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFile = () => {
    sounds.playSuccess();
    triggerSuperConfetti();
    
    // Generate text blob for direct download
    const element = document.createElement('a');
    const resumeText = `ARUN PANDI A - Resume\nSoftware Developer | C & Web Development\nPhone: +91 6374868926\nEmail: arun6374860@gmail.com\nLocation: Madurai, Tamil Nadu\nLinkedIn: linkedin.com/in/arun-pandi-a43a003a9\n\nPROFESSIONAL SUMMARY:\n${PERSONAL_INFO.summary}\n\nEDUCATION:\n${EDUCATION_DATA.degree}\n${EDUCATION_DATA.institution}, ${EDUCATION_DATA.location}\nExpected Graduation: ${EDUCATION_DATA.expectedGraduation} | CGPA: ${EDUCATION_DATA.cgpa}\n\nTECHNICAL SKILLS:\nProgramming Languages: C, C++, Basic Java, Python\nWeb Development: HTML, CSS, Basic JavaScript, Responsive Design\nTools & IDEs: VS Code, Arduino IDE, Git\nDomains: Software Development, IoT, Embedded Systems\nSpoken Languages: Tamil (Native), English (Proficient), German (Learning)\n\nPROJECTS:\n1. CRM Dashboard (Web Development / Python)\n2. Weather Application (Web Development / API Integration)\n3. Agricultural Rover (IoT / Embedded Systems / C)\n4. Bluetooth Voice Emergency System (IoT / Embedded Systems)\n5. Obstacle Avoiding Rover (Embedded Systems / C / Sensor Integration)\n\nHACKATHON:\n36-Hour Hackathon – Madurai Clean City Initiative\n\nCERTIFICATIONS & ACHIEVEMENTS:\n• IoT Fundamentals – Level 1 Certification\n• IoT Fundamentals – Level 2 Certification\n• Technical Symposium Certificate – NIT\n• Technical Symposium Certificate – SSN College of Engineering\n`;
    
    const file = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Arun_Pandi_A_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl border border-cyan-500/40 bg-[#080d1a] shadow-[0_0_80px_rgba(6,182,212,0.3)] overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col">
        
        {/* Modal Action Bar */}
        <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#060a14] gap-3">
          <div className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold font-['Outfit']">Arun Pandi A — Official Resume</h3>
              <p className="text-[11px] font-mono text-slate-400">ATS-Formatted | Exact Source of Truth</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="Copy Plaintext Resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-purple-400" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Container (High fidelity ATS formatted paper) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#ffffff] text-[#111827] font-sans selection:bg-cyan-200 selection:text-black">
          
          {/* Header */}
          <div className="text-center pb-5 border-b-2 border-slate-900">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-['Outfit'] uppercase">
              ARUN PANDI A
            </h1>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              Software Developer | C & Web Development
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-700" /> +91 6374868926
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-700" /> arun6374860@gmail.com
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-700" /> Madurai, Tamil Nadu
              </span>
              <span>•</span>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-700 underline font-medium"
              >
                <Linkedin className="w-3 h-3" /> {PERSONAL_INFO.linkedinUsername}
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-800 underline font-medium"
              >
                <Github className="w-3 h-3" /> {PERSONAL_INFO.githubUsername}
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mt-5">
            <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div className="mt-5">
            <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
              TECHNICAL SKILLS
            </h2>
            <ul className="text-xs text-slate-800 space-y-1">
              <li>• <strong>Programming Languages:</strong> C, C++, Basic Java, Python</li>
              <li>• <strong>Web Development:</strong> HTML, CSS, Basic JavaScript, Responsive Design</li>
              <li>• <strong>Tools & IDEs:</strong> VS Code, Arduino IDE, Git</li>
              <li>• <strong>Domains:</strong> Software Development, IoT (Internet of Things), Embedded Systems</li>
              <li>• <strong>Spoken Languages:</strong> Tamil (Native), English (Proficient), German (Learning)</li>
            </ul>
          </div>

          {/* Section: Education */}
          <div className="mt-5">
            <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
              EDUCATION
            </h2>
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{EDUCATION_DATA.degree}</span>
                  <span>Expected Graduation: {EDUCATION_DATA.expectedGraduation}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700 italic">
                  <span>{EDUCATION_DATA.institution}, {EDUCATION_DATA.location}</span>
                  <span className="font-semibold not-italic">CGPA: {EDUCATION_DATA.cgpa}</span>
                </div>
              </div>

              {SCHOOL_EDUCATION_DATA.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{item.standardTitle} ({item.id} Standard)</span>
                    <span className="font-mono text-blue-700">{item.percentageDisplay} ({item.totalMarks}/{item.maxMarks})</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700 italic">
                    <span>{item.schoolName} ({item.board})</span>
                    <span className="font-semibold not-italic text-slate-600">{item.session}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Projects */}
          <div className="mt-5">
            <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
              PROJECTS
            </h2>
            <div className="space-y-4 text-xs text-slate-800">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="font-bold text-slate-900">
                      {proj.title} <span className="font-normal text-slate-600">| {proj.subtitle}</span>
                    </div>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-blue-700 underline hover:text-blue-900 font-mono font-medium flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 mt-0.5 text-slate-700">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Hackathon */}
          <div className="mt-5">
            <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
              HACKATHON
            </h2>
            <div>
              <div className="font-bold text-slate-900">
                {HACKATHON_DATA.title} – {HACKATHON_DATA.initiative}
              </div>
              <ul className="list-disc list-inside space-y-0.5 mt-0.5 text-xs text-slate-700">
                {HACKATHON_DATA.keyContributions.slice(0, 3).map((contrib, cIdx) => (
                  <li key={cIdx} className="leading-snug">{contrib}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Certifications & Achievements */}
          <div className="mt-5 pb-2">
            <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
              CERTIFICATIONS & ACHIEVEMENTS
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
              <li>• IoT Fundamentals – Level 1 Certification</li>
              <li>• IoT Fundamentals – Level 2 Certification</li>
              <li>• Technical Symposium Certificate – NIT (National Institute of Technology)</li>
              <li>• Technical Symposium Certificate – SSN College of Engineering</li>
              <li>• Attended multiple inter-college technical symposiums, showcasing initiative beyond classroom learning.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
