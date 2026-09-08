import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Calculator, 
  History, 
  Activity,
  Globe2,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'knowledge' | 'calculator' | 'journal';
  setActiveTab: (tab: 'analyzer' | 'knowledge' | 'calculator' | 'journal') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  journalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  journalCount,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Market session calculations (UTC hours)
  // London: 08:00 - 16:00 UTC
  // New York: 13:00 - 21:00 UTC
  // Tokyo: 00:00 - 09:00 UTC
  // Sydney: 21:00 - 06:00 UTC
  const nowUtcHour = new Date().getUTCHours();
  const isLondonOpen = nowUtcHour >= 8 && nowUtcHour < 16;
  const isNewYorkOpen = nowUtcHour >= 13 && nowUtcHour < 21;
  const isTokyoOpen = nowUtcHour >= 0 && nowUtcHour < 9;
  const isSydneyOpen = nowUtcHour >= 21 || nowUtcHour < 6;

  return (
    <header className="border-b border-slate-800 bg-[#0d121d]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-xl">
              Q
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  QUOTEX <span className="text-emerald-400 font-extrabold">AI</span> ANALYZER
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" /> v2.4 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Multimodal AI Chart Scanner • Binary Up/Down Predictions
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Analyzer</span>
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'knowledge'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Markets & </span>Knowledge
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'calculator'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden md:inline">Risk </span>Calc
            </button>

            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                activeTab === 'journal'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden md:inline">Trade </span>Journal
              {journalCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-200 border border-slate-700">
                  {journalCount}
                </span>
              )}
            </button>
          </nav>

          {/* Sound & Status Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* UTC Clock */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{utcTime || '00:00:00 UTC'}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute signal sounds' : 'Enable signal sounds'}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled
                  ? 'bg-slate-800/80 border-slate-700 text-emerald-400 hover:bg-slate-700/80'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Market Sessions Sub-Bar */}
        <div className="py-1.5 border-t border-slate-800/50 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-0.5">
            <span className="text-slate-500 flex items-center gap-1 font-semibold">
              <Globe2 className="w-3 h-3 text-cyan-400" /> SESSIONS:
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLondonOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span className={isLondonOpen ? 'text-emerald-300 font-medium' : 'text-slate-500'}>
                London {isLondonOpen ? '(Open)' : '(Closed)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isNewYorkOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span className={isNewYorkOpen ? 'text-emerald-300 font-medium' : 'text-slate-500'}>
                New York {isNewYorkOpen ? '(Open)' : '(Closed)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isTokyoOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span className={isTokyoOpen ? 'text-emerald-300 font-medium' : 'text-slate-500'}>
                Tokyo {isTokyoOpen ? '(Open)' : '(Closed)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isSydneyOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span className={isSydneyOpen ? 'text-emerald-300 font-medium' : 'text-slate-500'}>
                Sydney {isSydneyOpen ? '(Open)' : '(Closed)'}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Quotex 24/7 OTC Feeds Active • 90%+ Payouts
          </div>
        </div>
      </div>
    </header>
  );
};
