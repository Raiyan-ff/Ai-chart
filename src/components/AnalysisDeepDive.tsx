import React, { useState } from 'react';
import { 
  BarChart2, 
  Activity, 
  Layers, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  Maximize2,
  Minimize2,
  Info,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { AnalysisResult } from '../types/trading';

interface AnalysisDeepDiveProps {
  result: AnalysisResult;
}

export const AnalysisDeepDive: React.FC<AnalysisDeepDiveProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'price_action' | 'indicators' | 'strategy' | 'chart_inspect'>('price_action');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  return (
    <div className="bg-[#111622] rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Section Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            Comprehensive Technical Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            AI price action, indicator readings, and execution checklist
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('price_action')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'price_action'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Price Action & Candlesticks
          </button>
          <button
            onClick={() => setActiveTab('indicators')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'indicators'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Indicators ({result.technicalIndicatorsDetected?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'strategy'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Strategy & Execution
          </button>
          {result.imageUrl && (
            <button
              onClick={() => setActiveTab('chart_inspect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'chart_inspect'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Chart Annotations
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Price Action & Candlesticks */}
      {activeTab === 'price_action' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Candlestick Pattern Card */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5" />
                Detected Candlestick Formation
              </span>
              <div className="text-sm font-bold text-white">
                {result.priceActionDetails?.currentCandlePattern || 'Pattern identified'}
              </div>
              <p className="text-xs text-slate-300">
                {result.priceActionDetails?.patternSignificance || 'Signifies immediate reaction at current price level.'}
              </p>
            </div>

            {/* Support & Resistance (SNR) Level */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Support / Resistance (SNR) Level
              </span>
              <div className="text-sm font-bold text-white">
                {result.priceActionDetails?.supportResistanceLevel || 'Key Horizontal Level'}
              </div>
              <p className="text-xs text-slate-300">
                {result.priceActionDetails?.breakoutOrRejection || 'Rejection confirmed by candle body and wick geometry.'}
              </p>
            </div>
          </div>

          {/* Trend & Momentum overview */}
          <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800/80">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Trend Direction:</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-white flex items-center gap-1">
                  {result.trendAnalysis?.direction === 'UPTREND' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {result.trendAnalysis?.direction === 'DOWNTREND' && <TrendingDown className="w-3 h-3 text-rose-400" />}
                  {result.trendAnalysis?.direction} ({result.trendAnalysis?.strength})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Momentum Phase:</span>
                <span className="text-xs font-bold text-slate-200">
                  {result.priceActionDetails?.momentum || 'Accelerating'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.trendAnalysis?.description}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Technical Indicators Detected */}
      {activeTab === 'indicators' && (
        <div className="space-y-3">
          {result.technicalIndicatorsDetected && result.technicalIndicatorsDetected.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.technicalIndicatorsDetected.map((indicator, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 rounded-xl p-4 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      {indicator.name}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${
                      indicator.signal === 'BULLISH'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : indicator.signal === 'BEARISH'
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {indicator.signal}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    {indicator.reading}
                  </div>

                  <p className="text-xs text-slate-400">
                    {indicator.notes}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
              No secondary technical indicators visible in screenshot. Analysis derived purely from raw Price Action, Candlestick geometry, and Horizontal SNR levels.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Strategy & Execution */}
      {activeTab === 'strategy' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quotex Recommended Playbook
                </span>
                <h4 className="text-sm sm:text-base font-bold text-emerald-400">
                  {result.quotexStrategyInsight?.strategyName || '1M SNR Reversal Scalper'}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1 - 5 Min Binary
              </span>
            </div>

            {/* Step-by-step Execution Checklist */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Execution Steps for Quotex Platform:
              </span>

              <div className="flex items-start gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                  1
                </span>
                <div>
                  <span className="font-semibold text-white">Select Asset & Payout Check:</span>
                  <p className="text-slate-300 mt-0.5">
                    Navigate to <span className="text-emerald-300 font-medium">{result.assetDetected}</span> on Quotex. Ensure current payout is at least 80%+.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                  2
                </span>
                <div>
                  <span className="font-semibold text-white">Set Expiration Timer:</span>
                  <p className="text-slate-300 mt-0.5">
                    Switch expiry timer on right sidebar to <span className="text-cyan-300 font-bold">{result.recommendedExpiry}</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                  3
                </span>
                <div>
                  <span className="font-semibold text-white">Entry Trigger & Timing:</span>
                  <p className="text-slate-300 mt-0.5">
                    {result.quotexStrategyInsight?.exactEntryTiming || 'Enter trade immediately at candle open 00:01s.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Warning */}
            {result.quotexStrategyInsight?.safetyWarning && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <span className="font-bold">Risk Management Warning: </span>
                  <span>{result.quotexStrategyInsight.safetyWarning}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Chart Annotations & Visual Inspector */}
      {activeTab === 'chart_inspect' && result.imageUrl && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="p-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-semibold">
                Uploaded Chart Screenshot
              </span>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                {isZoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isZoomed ? 'Reset Zoom' : 'Expand'}</span>
              </button>
            </div>

            <div className={`overflow-auto flex items-center justify-center p-2 transition-all ${
              isZoomed ? 'max-h-[650px]' : 'max-h-[380px]'
            }`}>
              <img
                src={result.imageUrl}
                alt="Analyzed Chart"
                className="max-w-full object-contain rounded"
              />
            </div>
          </div>

          {/* Annotations List */}
          {result.visualAnnotations && result.visualAnnotations.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-slate-400">
                Key Detected Visual Zones:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.visualAnnotations.map((anno, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="font-bold text-emerald-400 block">{anno.area}</span>
                    <p className="text-slate-300 mt-1">{anno.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
