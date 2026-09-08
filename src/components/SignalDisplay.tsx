import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Target, 
  ShieldCheck, 
  Volume2, 
  Copy, 
  Check, 
  BookmarkPlus, 
  Zap, 
  Sparkles,
  Percent
} from 'lucide-react';
import { AnalysisResult } from '../types/trading';
import { playCallSound, playPutSound, playCautionSound } from '../utils/audio';

interface SignalDisplayProps {
  result: AnalysisResult;
  onSaveToJournal: () => void;
  isSaved: boolean;
  soundEnabled: boolean;
}

export const SignalDisplay: React.FC<SignalDisplayProps> = ({
  result,
  onSaveToJournal,
  isSaved,
  soundEnabled,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const isCall = result.action === 'CALL';
  const isPut = result.action === 'PUT';
  const isNoTrade = result.action === 'NO_TRADE';

  const handlePlaySound = () => {
    if (isCall) playCallSound();
    else if (isPut) playPutSound();
    else playCautionSound();
  };

  const handleCopySignal = () => {
    const text = `🎯 QUOTEX AI TRADING SIGNAL
━━━━━━━━━━━━━━━━━━
📊 Asset: ${result.assetDetected || 'Market Asset'}
⏱️ Timeframe: ${result.timeframeDetected || '1M'}
⚡ Action: ${result.actionLabel}
⏳ Recommended Expiry: ${result.recommendedExpiry}
🎯 Entry Trigger: ${result.quotexStrategyInsight?.exactEntryTiming || 'On candle open'}
🔥 Confidence: ${result.confidenceScore}%
🛡️ Risk Level: ${result.riskLevel}
━━━━━━━━━━━━━━━━━━
Strategy: ${result.quotexStrategyInsight?.strategyName || 'Price Action Sniper'}
📌 Note: ${result.quickSummary}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`rounded-2xl border p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-all ${
      isCall 
        ? 'bg-gradient-to-b from-[#092218] via-[#0d1620] to-[#0b0e14] border-emerald-500/40 shadow-emerald-500/10'
        : isPut
        ? 'bg-gradient-to-b from-[#240e15] via-[#150f19] to-[#0b0e14] border-rose-500/40 shadow-rose-500/10'
        : 'bg-gradient-to-b from-[#241a0e] via-[#17141d] to-[#0b0e14] border-amber-500/40 shadow-amber-500/10'
    }`}>
      {/* Top Banner & Quick Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isCall ? 'bg-emerald-400' : isPut ? 'bg-rose-400' : 'bg-amber-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isCall ? 'bg-emerald-500' : isPut ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
            VERDICT FOR NEXT CANDLE MOVE
          </span>
          {result.isSimulation && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Demo Simulation Mode
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlaySound}
            title="Replay Audio Alert"
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopySignal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 hover:text-white hover:border-slate-600 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Signal</span>
              </>
            )}
          </button>
          <button
            onClick={onSaveToJournal}
            disabled={isSaved}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              isSaved
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 cursor-default'
                : 'bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400 shadow-sm'
            }`}
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved to Journal' : 'Save Signal'}</span>
          </button>
        </div>
      </div>

      {/* Main Signal Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
        {/* Massive UP or DOWN Card (Columns 1-7) */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-stretch gap-5">
          {/* Visual Action Indicator Box */}
          <div className={`w-full sm:w-56 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 shadow-2xl relative overflow-hidden ${
            isCall
              ? 'bg-emerald-500/15 border-emerald-400/80 text-emerald-300 shadow-emerald-500/30'
              : isPut
              ? 'bg-rose-500/15 border-rose-400/80 text-rose-300 shadow-rose-500/30'
              : 'bg-amber-500/15 border-amber-400/80 text-amber-300 shadow-amber-500/30'
          }`}>
            <div className="mb-2">
              {isCall && <TrendingUp className="w-16 h-16 text-emerald-400 animate-bounce" />}
              {isPut && <TrendingDown className="w-16 h-16 text-rose-400 animate-bounce" />}
              {isNoTrade && <AlertTriangle className="w-16 h-16 text-amber-400 animate-pulse" />}
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase opacity-80">
              NEXT QUOTEX MOVE
            </span>
            <span className="text-3xl sm:text-4xl font-black tracking-tight mt-0.5">
              {isCall ? 'CALL (UP)' : isPut ? 'PUT (DOWN)' : 'WAIT / SKIP'}
            </span>
            <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
              isCall ? 'bg-emerald-400 text-slate-950' : isPut ? 'bg-rose-400 text-white' : 'bg-amber-400 text-slate-950'
            }`}>
              {isCall ? 'PRESS GREEN BUTTON' : isPut ? 'PRESS RED BUTTON' : 'AVOID CHOPPY MARKET'}
            </span>
          </div>

          {/* Quick Specifications */}
          <div className="flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-white">
                  {result.assetDetected || 'EUR/USD (OTC)'}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {result.timeframeDetected || 'M1'}
                </span>
                <span className="text-xs text-slate-400">
                  {result.marketType}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                {result.quickSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Expiry Duration</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  {result.recommendedExpiry || '1 Minute'}
                </div>
              </div>

              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Entry Window</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-emerald-300 mt-0.5 truncate" title={result.quotexStrategyInsight?.exactEntryTiming}>
                  {result.quotexStrategyInsight?.exactEntryTiming || 'Candle Open (00:01s)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence & Risk Gauge (Columns 8-12) */}
        <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Signal Confidence Score
              </span>
              <span className={`text-xl font-extrabold ${
                result.confidenceScore >= 80
                  ? 'text-emerald-400'
                  : result.confidenceScore >= 65
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}>
                {result.confidenceScore}%
              </span>
            </div>

            {/* Confidence Bar */}
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  result.confidenceScore >= 80
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/50'
                    : result.confidenceScore >= 65
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-400'
                }`}
                style={{ width: `${Math.min(100, Math.max(10, result.confidenceScore))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>Weak (50%)</span>
              <span>Moderate (70%)</span>
              <span>High Win-Rate (85%+)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block">Risk Assessment:</span>
              <span className={`font-bold inline-block px-2 py-0.5 rounded text-[11px] mt-0.5 ${
                result.riskLevel === 'LOW'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : result.riskLevel === 'MEDIUM'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                {result.riskLevel} RISK SETUP
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block">Recommended Stake:</span>
              <span className="font-bold text-slate-200 block mt-0.5">
                {result.moneyManagementAdvice?.recommendedStake || '1% - 2% Account'}
              </span>
            </div>
          </div>

          {/* Strategy name badge */}
          <div className="text-[11px] bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="overflow-hidden">
              <span className="text-slate-400">Identified Strategy: </span>
              <span className="text-white font-semibold">
                {result.quotexStrategyInsight?.strategyName || '1M SNR Reversal'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Factors Bullet Pills */}
      {result.keyFactors && result.keyFactors.length > 0 && (
        <div className="mt-2 pt-4 border-t border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Key Decision Factors Detected by Vision AI:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {result.keyFactors.map((factor, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/70 text-xs text-slate-300"
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                  isCall ? 'bg-emerald-500/20 text-emerald-400' : isPut ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {idx + 1}
                </span>
                <span className="leading-snug">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
