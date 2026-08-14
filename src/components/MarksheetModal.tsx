import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  School, 
  Calendar, 
  Hash, 
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { SchoolEducationItem } from '../types';
import { sounds } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface MarksheetModalProps {
  item: SchoolEducationItem | null;
  onClose: () => void;
}

export const MarksheetModal: React.FC<MarksheetModalProps> = ({ item, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<'certificate' | 'marks_table' | 'credentials'>('certificate');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!item) return null;

  const handleDownload = () => {
    sounds.playSuccess();
    triggerConfetti();

    // Create download anchor
    const downloadFileName = `Arun_Pandi_${item.id.toUpperCase()}_Marksheet_${item.year.replace(/\s+/g, '_')}.svg`;
    const link = document.createElement('a');
    link.href = item.marksheetFilePath;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    sounds.playClick();
    window.open(item.marksheetFilePath, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    sounds.playClick();
    const printWindow = window.open(item.marksheetFilePath, '_blank');
    if (printWindow) {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    sounds.playClick();
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      id="marksheet-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-[#0b0f19] border border-cyan-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden text-slate-100 relative"
        id="marksheet-modal-container"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${item.color} text-white shadow-md shrink-0`}>
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white">
                  {item.standardTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/40">
                  {item.percentageDisplay} (Pass)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate max-w-md hidden sm:block">
                {item.schoolName}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-300/30"
              title="Download original marksheet file"
              id="modal-download-btn"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Marksheet</span>
              <span className="sm:hidden">Download</span>
            </button>

            <button
              onClick={handleOpenNewTab}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
              title="Open in new browser tab"
              id="modal-newtab-btn"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Marksheet Modal"
              id="modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Tabs & Zoom Controller */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-950/70 border-b border-slate-800/80 gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('certificate');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'certificate'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Certificate</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('marks_table');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'marks_table'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Marks Breakdown</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('credentials');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'credentials'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Credentials &amp; EMIS</span>
            </button>
          </div>

          {activeTab === 'certificate' && (
            <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  sounds.playClick();
                  setZoomLevel((z) => Math.max(0.6, z - 0.15));
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-cyan-300 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => {
                  sounds.playClick();
                  setZoomLevel((z) => Math.min(2.0, z + 0.15));
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setZoomLevel(1);
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1 hidden sm:block"
                title="Print Marksheet"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6 bg-[#060911]/80">
          
          {/* TAB 1: Authentic Certificate Document View */}
          {activeTab === 'certificate' && (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
              <div 
                className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-400/40 transition-transform duration-200 origin-top"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  maxWidth: '780px',
                  width: '100%'
                }}
              >
                <img
                  src={item.marksheetFilePath}
                  alt={`${item.standardTitle} - Arun Pandi A`}
                  className="w-full h-auto object-contain block"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom helper text */}
              <div className="mt-4 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Original State Board Tamil Nadu Certificate Verified &amp; Digitally Rendered</span>
              </div>
            </div>
          )}

          {/* TAB 2: Structured Subject Marks Breakdown */}
          {activeTab === 'marks_table' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Summary Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xs font-mono text-slate-400">Total Marks Scored</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white mt-1">
                    {item.totalMarks} <span className="text-base text-slate-400 font-normal">/ {item.maxMarks}</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{item.marksInWords}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 text-center">
                  <div className="text-xs font-mono text-cyan-300">Percentage Score</div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 mt-1">
                    {item.percentageDisplay}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Result: {item.result}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xs font-mono text-slate-400">Academic Standing</div>
                  <div className="text-lg font-bold text-amber-300 mt-1">
                    {item.badge}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{item.session}</div>
                </div>
              </div>

              {/* Subject Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-lg">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/80 text-slate-400 font-mono text-xs border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Subject</th>
                      {item.id === '12th' && <th className="p-3.5 text-center hidden sm:table-cell">Theory</th>}
                      {item.id === '12th' && <th className="p-3.5 text-center hidden sm:table-cell">Practical</th>}
                      {item.id === '12th' && <th className="p-3.5 text-center hidden sm:table-cell">Internal</th>}
                      <th className="p-3.5 text-center">Marks (100)</th>
                      <th className="p-3.5 text-left hidden md:table-cell">Marks in Words</th>
                      <th className="p-3.5 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {item.subjects.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                              {idx + 1}
                            </span>
                            <div>
                              <span>{sub.name}</span>
                              {sub.tamilName && (
                                <span className="text-xs text-slate-400 ml-1.5 font-normal">({sub.tamilName})</span>
                              )}
                            </div>
                          </div>
                        </td>
                        {item.id === '12th' && (
                          <td className="p-3.5 text-center font-mono text-slate-300 hidden sm:table-cell">
                            {sub.theory ?? '—'}
                          </td>
                        )}
                        {item.id === '12th' && (
                          <td className="p-3.5 text-center font-mono text-slate-300 hidden sm:table-cell">
                            {sub.practical ?? '—'}
                          </td>
                        )}
                        {item.id === '12th' && (
                          <td className="p-3.5 text-center font-mono text-slate-300 hidden sm:table-cell">
                            {sub.internal ?? '—'}
                          </td>
                        )}
                        <td className="p-3.5 text-center font-mono font-bold text-cyan-300 text-sm sm:text-base">
                          {sub.marksObtained}
                        </td>
                        <td className="p-3.5 font-mono text-xs text-slate-400 hidden md:table-cell">
                          {sub.marksInWords}
                        </td>
                        <td className="p-3.5 text-right">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-950 font-bold border-t-2 border-slate-700">
                    <tr>
                      <td className="p-3.5 text-white" colSpan={item.id === '12th' ? 4 : 1}>
                        TOTAL MARKS
                      </td>
                      <td className="p-3.5 text-center text-cyan-400 font-mono text-base sm:text-lg">
                        {item.totalMarks} / {item.maxMarks}
                      </td>
                      <td className="p-3.5 text-slate-300 font-mono text-xs hidden md:table-cell">
                        {item.marksInWords}
                      </td>
                      <td className="p-3.5 text-right text-emerald-400 font-mono">
                        PASS (85%)
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Highlights */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs font-mono uppercase text-cyan-300 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Academic Milestones
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Official Verification Credentials */}
          {activeTab === 'credentials' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Hash className="w-4 h-4 text-cyan-400" />
                  Government Examination Board Credentials
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Candidate Name */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-400 font-mono">Candidate Name</div>
                    <div className="text-sm font-bold text-white mt-0.5">{item.candidateName}</div>
                  </div>

                  {/* Register Number */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 font-mono">Permanent Register No.</div>
                      <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">{item.registerNo}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.registerNo, 'reg')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Copy Register Number"
                    >
                      {copiedField === 'reg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Certificate Serial Number */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 font-mono">Certificate Serial No.</div>
                      <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">{item.certificateNo}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.certificateNo, 'cert')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Copy Certificate Number"
                    >
                      {copiedField === 'cert' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* EMIS ID */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 font-mono">EMIS ID No.</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">{item.emisId}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.emisId, 'emis')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Copy EMIS ID"
                    >
                      {copiedField === 'emis' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Date of Birth */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-400 font-mono">Date of Birth</div>
                    <div className="text-sm font-bold text-white mt-0.5">{item.dob}</div>
                  </div>

                  {/* Medium & TMR Code */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-400 font-mono">T.M.R. Code &amp; Medium</div>
                    <div className="text-sm font-bold text-white mt-0.5">{item.tmrCode} • {item.medium}</div>
                  </div>
                </div>

                {/* School Information */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <School className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono text-slate-400">Educational Institution</div>
                    <div className="text-sm font-bold text-white">{item.schoolName}</div>
                    {item.schoolTamilName && (
                      <div className="text-xs text-slate-400 mt-0.5">{item.schoolTamilName}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Footer Actions */}
        <div className="px-4 sm:px-6 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tamil Nadu State Board Public Exam Record</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNewTab}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Screen View</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
