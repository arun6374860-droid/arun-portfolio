import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  RotateCcw, 
  Terminal, 
  Cpu, 
  CloudSun, 
  Sparkles, 
  ShieldAlert, 
  Navigation, 
  Sliders, 
  Database,
  Radio,
  CheckCircle,
  AlertTriangle,
  Send,
  Zap,
  Volume2,
  ExternalLink
} from 'lucide-react';
import { Project } from '../types';
import { sounds } from '../utils/audio';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.3)] bg-[#080d1a] overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-[#060a14]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
              <div className="w-full h-full bg-[#080b14] rounded-xl flex items-center justify-center">
                <Play className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                  {project.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Interactive Simulator
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">{project.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playSuccess()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all shadow-sm"
                title={`Open Live Deployed App (${project.liveUrl})`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Live App ↗</span>
              </a>
            )}

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Interactive Simulation by Project Type */}
        <div className="p-5 sm:p-8 max-h-[75vh] overflow-y-auto">
          {project.liveDemoType === 'crm' && <CrmSimulation />}
          {project.liveDemoType === 'weather' && <WeatherSimulation />}
          {project.liveDemoType === 'agri-rover' && <AgriRoverSimulation />}
          {project.liveDemoType === 'bluetooth-alert' && <BluetoothAlertSimulation />}
          {project.liveDemoType === 'obstacle-rover' && <ObstacleRoverSimulation />}

          {/* Project Technical Bullets from Resume */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Resume Implementation Highlights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.bullets.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#060a14]/90 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Built by Arun Pandi A (ECE '28)</span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
};

/* --- 1. CRM Dashboard Simulation --- */
const CrmSimulation: React.FC = () => {
  const [filterTier, setFilterTier] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Apex Industrial Corp', contact: 'Karthik Raja', tier: 'Enterprise', status: 'Active', value: '$45,000' },
    { id: 2, name: 'Delta Smart Systems', contact: 'Meenakshi Sundaram', tier: 'SME', status: 'Pending', value: '$12,500' },
    { id: 3, name: 'Madurai Clean Tech', contact: 'Selvam V', tier: 'Enterprise', status: 'Active', value: '$38,000' },
    { id: 4, name: 'Vanguard Agri-Logistics', contact: 'Priya Anand', tier: 'Retail', status: 'Active', value: '$8,200' },
    { id: 5, name: 'Echo IoT Solutions', contact: 'Deepak Kumar', tier: 'SME', status: 'Completed', value: '$22,000' },
  ]);

  const filtered = customers.filter(
    (c) =>
      (filterTier === 'All' || c.tier === filterTier) &&
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contact.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Filter Tier:</span>
          {['All', 'Enterprise', 'SME', 'Retail'].map((tier) => (
            <button
              key={tier}
              onClick={() => {
                sounds.playClick();
                setFilterTier(tier);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterTier === tier
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            sounds.playSuccess();
            setReportGenerated(true);
          }}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Database className="w-3.5 h-3.5" />
          <span>Execute Python Report Engine</span>
        </button>
      </div>

      {/* Customer Records Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#050810]">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
            <tr>
              <th className="p-3">Client Company</th>
              <th className="p-3">Primary Contact</th>
              <th className="p-3">Client Tier</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Deal Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-semibold text-white">{c.name}</td>
                <td className="p-3 text-slate-300">{c.contact}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    c.tier === 'Enterprise' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                    c.tier === 'SME' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {c.status}
                  </span>
                </td>
                <td className="p-3 text-right font-bold text-cyan-300">{c.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Python Backend Summary Generation Output */}
      {reportGenerated && (
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-2 font-bold">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-purple-400" /> Python Backend Summary Report
            </span>
            <span className="text-emerald-400">Execution Status: 200 OK</span>
          </div>
          <pre className="text-[11px] font-mono text-slate-300 bg-[#03060d] p-3 rounded-lg overflow-x-auto leading-relaxed border border-purple-500/20">
{`{
  "total_records_processed": ${filtered.length},
  "pipeline_valuation": "$125,700.00",
  "active_enterprise_leads": ${filtered.filter(c => c.tier === 'Enterprise').length},
  "summary_timestamp": "${new Date().toISOString()}",
  "report_generated_by": "Arun Pandi A - Python Backend Data Engine"
}`}
          </pre>
        </div>
      )}
    </div>
  );
};

/* --- 2. Weather Application Simulation --- */
const WeatherSimulation: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Madurai');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [activeTab, setActiveTab] = useState<'ui' | 'json'>('ui');

  const weatherDatabase: Record<string, { tempC: number; condition: string; humidity: number; wind: number; pressure: number; icon: string }> = {
    Madurai: { tempC: 33, condition: 'Clear Sky / Sunny', humidity: 58, wind: 14, pressure: 1012, icon: '☀️' },
    Chennai: { tempC: 31, condition: 'Humid / Scattered Clouds', humidity: 74, wind: 18, pressure: 1010, icon: '⛅' },
    Bangalore: { tempC: 26, condition: 'Pleasant Breeze', humidity: 62, wind: 12, pressure: 1014, icon: '🌤️' },
    London: { tempC: 16, condition: 'Light Rain Showers', humidity: 82, wind: 22, pressure: 1008, icon: '🌧️' },
    Tokyo: { tempC: 22, condition: 'Overcast / Mild', humidity: 65, wind: 10, pressure: 1015, icon: '☁️' },
  };

  const current = weatherDatabase[selectedCity];
  const displayTemp = tempUnit === 'C' ? current.tempC : Math.round((current.tempC * 9) / 5 + 32);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Select City:</span>
          {Object.keys(weatherDatabase).map((city) => (
            <button
              key={city}
              onClick={() => {
                sounds.playClick();
                setSelectedCity(city);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCity === city
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(20,184,166,0.4)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
            className="px-2.5 py-1 rounded-lg bg-white/10 text-cyan-300 text-xs font-mono font-bold hover:bg-white/20 transition-colors"
          >
            Switch to °{tempUnit === 'C' ? 'F' : 'C'}
          </button>
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('ui')}
              className={`px-2.5 py-0.5 rounded text-xs font-mono ${activeTab === 'ui' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              UI View
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-2.5 py-0.5 rounded text-xs font-mono ${activeTab === 'json' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              REST JSON
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'ui' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Weather Card */}
          <div className="md:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-teal-950/40 border border-cyan-500/30 text-center relative overflow-hidden">
            <div className="text-5xl mb-2">{current.icon}</div>
            <h4 className="text-2xl font-bold text-white font-['Outfit']">{selectedCity}</h4>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 font-['Outfit'] my-2">
              {displayTemp}°{tempUnit}
            </div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              {current.condition}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="md:col-span-6 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">HUMIDITY</div>
              <div className="text-xl font-bold text-cyan-400 font-mono mt-1">{current.humidity}%</div>
              <div className="text-[10px] text-slate-400">Relative Humidity</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">WIND SPEED</div>
              <div className="text-xl font-bold text-teal-400 font-mono mt-1">{current.wind} km/h</div>
              <div className="text-[10px] text-slate-400">Anemometer metric</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">AIR PRESSURE</div>
              <div className="text-xl font-bold text-indigo-400 font-mono mt-1">{current.pressure} hPa</div>
              <div className="text-[10px] text-slate-400">Barometric sensor</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">STATUS</div>
              <div className="text-xl font-bold text-emerald-400 font-mono mt-1">200 OK</div>
              <div className="text-[10px] text-slate-400">Live API Sync</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#04060c] p-4 rounded-2xl border border-cyan-500/20 font-mono text-xs text-cyan-300">
          <div className="text-slate-400 mb-2 pb-1 border-b border-slate-800 flex justify-between">
            <span>GET /v1/weather?city={selectedCity}&units={tempUnit === 'C' ? 'metric' : 'imperial'}</span>
            <span className="text-emerald-400">HTTP/1.1 200 OK</span>
          </div>
          <pre className="overflow-x-auto leading-relaxed">
{`{
  "coord": { "lat": 9.9252, "lon": 78.1198 },
  "weather": [{ "id": 800, "main": "Clear", "description": "${current.condition}" }],
  "main": {
    "temp": ${displayTemp},
    "humidity": ${current.humidity},
    "pressure": ${current.pressure}
  },
  "wind": { "speed": ${current.wind}, "deg": 140 },
  "name": "${selectedCity}",
  "developer": "Arun Pandi A (API Integration & JSON Logic)"
}`}
          </pre>
        </div>
      )}
    </div>
  );
};

/* --- 3. Agricultural Rover Simulation --- */
const AgriRoverSimulation: React.FC = () => {
  const [roverState, setRoverState] = useState({
    moisture: 42,
    temp: 29.4,
    ph: 6.8,
    status: 'Autonomous Navigation Active',
    waypoint: 'Zone-3 (Paddy Field Sector B)',
    battery: 88,
  });

  const triggerTelemetryPing = () => {
    sounds.playClick();
    setRoverState({
      moisture: Math.floor(Math.random() * 25) + 35,
      temp: parseFloat((Math.random() * 4 + 27).toFixed(1)),
      ph: parseFloat((Math.random() * 1.2 + 6.2).toFixed(1)),
      status: 'Real-Time Sensor Telemetry Updated',
      waypoint: `Zone-${Math.floor(Math.random() * 6) + 1} (Sector ${['A', 'B', 'C'][Math.floor(Math.random() * 3)]})`,
      battery: Math.max(20, roverState.battery - 1),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Navigation className="w-4 h-4 animate-spin text-emerald-400" />
          <span>MCU C-Programmed Agricultural Navigation Mesh</span>
        </div>
        <button
          onClick={triggerTelemetryPing}
          className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Acquire New Telemetry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
          <div className="text-xs font-mono text-emerald-300">SOIL MOISTURE</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{roverState.moisture}%</div>
          <div className="text-[10px] text-emerald-400/80 mt-1">Optimal hydration target</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs font-mono text-amber-300">FIELD TEMPERATURE</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{roverState.temp} °C</div>
          <div className="text-[10px] text-slate-400 mt-1">Ambient thermal probe</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs font-mono text-cyan-300">SOIL pH LEVEL</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{roverState.ph} pH</div>
          <div className="text-[10px] text-slate-400 mt-1">Nutrient balanced</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs font-mono text-purple-300">MCU BATTERY</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{roverState.battery}%</div>
          <div className="text-[10px] text-slate-400 mt-1">Li-ion autonomous pack</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#040711] border border-slate-800 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
          <span>Arduino IDE / Microcontroller C Firmware Logs</span>
          <span className="text-emerald-400">Waypoint: {roverState.waypoint}</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          <span className="text-cyan-400">[C-KERNEL]</span> PID motor control initialized. Autonomous field grid rasterization running. Telemetry streaming over UART serial pipeline.
        </p>
      </div>
    </div>
  );
};

/* --- 4. Bluetooth Voice Emergency Alert Simulation --- */
const BluetoothAlertSimulation: React.FC = () => {
  const [alertActive, setAlertActive] = useState(false);
  const [lastCommand, setLastCommand] = useState('Standby');
  const [logs, setLogs] = useState<string[]>([
    'HC-05 Bluetooth Module: Paired & Listening on RFCOMM Channel 1',
    'Voice Processing Buffer: Initialized',
  ]);

  const triggerVoiceCommand = (cmd: string) => {
    sounds.playClick();
    setLastCommand(cmd);
    setAlertActive(true);
    setLogs((prev) => [
      `[VOICE RECOGNITION] Audio trigger captured: "${cmd}"`,
      `[HC-05 UART] Hex Packet Sent: 0x53 0x4F 0x53 0x01 (DISTRESS_SIGNAL)`,
      `[ARDUINO CORE] Transmitting instant alert to predefined emergency contacts...`,
      `[GSM/SMS] Emergency dispatch broadcasted: Coordinates (Madurai, TN) dispatched.`,
      ...prev.slice(0, 3),
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
          <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>HC-05 Bluetooth & Arduino Emergency Alert Channel</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Trigger Command:</span>
          {['HELP EMERGENCY', 'DISTRESS ALERT', 'MEDICAL ASSIST'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => triggerVoiceCommand(cmd)}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 transition-all cursor-pointer"
            >
              "{cmd}"
            </button>
          ))}
        </div>
      </div>

      {alertActive && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-400" />
            <div>
              <div className="text-sm font-bold text-white font-['Outfit']">
                DISTRESS PROTOCOL ACTIVATED
              </div>
              <div className="text-xs text-rose-200 font-mono">
                Command: "{lastCommand}" | Signal routed via HC-05 Arduino Module
              </div>
            </div>
          </div>
          <button
            onClick={() => setAlertActive(false)}
            className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-mono hover:bg-white/30"
          >
            Reset Alert
          </button>
        </div>
      )}

      <div className="bg-[#04060d] p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
        <div className="text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
          <span>HC-05 Serial Monitor Output (9600 Baud)</span>
          <span className="text-purple-400">Status: Active</span>
        </div>
        {logs.map((log, i) => (
          <div key={i} className="text-slate-300 leading-relaxed">
            <span className="text-purple-400">{'>'}</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- 5. Obstacle Avoiding Rover Simulation --- */
const ObstacleRoverSimulation: React.FC = () => {
  const [obstacleDistance, setObstacleDistance] = useState(45);
  const [motorAction, setMotorAction] = useState('FORWARD (PWM 220)');
  const [steeringAngle, setSteeringAngle] = useState(0);

  const simulatePing = (distance: number) => {
    setObstacleDistance(distance);
    sounds.playHover();
    if (distance < 25) {
      setMotorAction('REVERSE & PIVOT RIGHT (PWM 180)');
      setSteeringAngle(45);
    } else {
      setMotorAction('DRIVE STRAIGHT FORWARD (PWM 230)');
      setSteeringAngle(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 block font-bold">
            Ultrasonic Proximity Range Slider (HC-SR04)
          </span>
          <span className="text-[11px] text-slate-400">
            Slide to test autonomous digital logic avoidance in C
          </span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-64">
          <input
            type="range"
            min="5"
            max="80"
            value={obstacleDistance}
            onChange={(e) => simulatePing(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <span className="text-sm font-mono font-bold text-amber-400 min-w-[50px] text-right">
            {obstacleDistance} cm
          </span>
        </div>
      </div>

      {/* Radar & Motor Control Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-6 p-6 rounded-2xl bg-[#040711] border border-amber-500/30 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 rounded-full border border-amber-500/30 flex items-center justify-center mb-4">
            {/* Radar sweep lines */}
            <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/20 animate-spin" />
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-transform duration-300 ${
                obstacleDistance < 25
                  ? 'bg-rose-600 text-white shadow-[0_0_20px_#f43f5e]'
                  : 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_#10b981]'
              }`}
              style={{ transform: `rotate(${steeringAngle}deg)` }}
            >
              ROVER
            </div>
            {/* Obstacle dot */}
            <div
              className="absolute w-4 h-4 bg-rose-500 rounded-full animate-ping"
              style={{
                top: `${Math.max(10, 100 - obstacleDistance)}px`,
              }}
            />
          </div>
          <div className="text-xs font-mono text-slate-300">
            Sensor Reading: <span className="font-bold text-amber-400">{obstacleDistance} cm</span>
          </div>
        </div>

        <div className="md:col-span-6 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">PWM MOTOR STATE</div>
            <div className="text-sm font-bold text-white font-mono mt-1">{motorAction}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">DIGITAL LOGIC THRESHOLD</div>
            <div className="text-xs font-mono text-slate-300 mt-1">
              {obstacleDistance < 25 ? (
                <span className="text-rose-400 font-bold">⚠️ CRITICAL DISTANCE (&lt;25cm) - TRIGGER DETOUR</span>
              ) : (
                <span className="text-emerald-400 font-bold">✅ PATH CLEAR - CRUISING NOMINAL</span>
              )}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400">
            Engineered in C with direct register timer PWM manipulation and circuit analysis optimization.
          </div>
        </div>
      </div>
    </div>
  );
};
