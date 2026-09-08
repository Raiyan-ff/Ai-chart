/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { SignalDisplay } from './components/SignalDisplay';
import { AnalysisDeepDive } from './components/AnalysisDeepDive';
import { MarketHub } from './components/MarketHub';
import { MoneyManagementCalc } from './components/MoneyManagementCalc';
import { TradeJournal } from './components/TradeJournal';
import { AnalysisResult, JournalEntry } from './types/trading';
import { playCallSound, playPutSound, playCautionSound } from './utils/audio';
import { AlertCircle, ArrowUp, RefreshCw, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'knowledge' | 'calculator' | 'journal'>('analyzer');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Journal storage
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('quotex_ai_journal');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const resultsRef = useRef<HTMLDivElement>(null);

  // Sync journal with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quotex_ai_journal', JSON.stringify(journalEntries));
    } catch (e) {
      // Storage quota or error
    }
  }, [journalEntries]);

  // Handle Chart Analysis
  const handleAnalyzeChart = async (payload: {
    imageBase64: string;
    mimeType: string;
    selectedMarket: string;
    timeframe: string;
    userNotes: string;
    imageUrl: string;
  }) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/analyze-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: payload.imageBase64,
          mimeType: payload.mimeType,
          selectedMarket: payload.selectedMarket,
          timeframe: payload.timeframe,
          userNotes: payload.userNotes,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned error ${response.status}`);
      }

      const result: AnalysisResult = await response.json();
      result.imageUrl = payload.imageUrl;
      result.timestamp = Date.now();

      setAnalysisResult(result);

      // Play audio cue based on verdict
      if (soundEnabled) {
        if (result.action === 'CALL') playCallSound();
        else if (result.action === 'PUT') playPutSound();
        else playCautionSound();
      }

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setErrorMessage(err.message || 'Failed to analyze chart screenshot. Please check the image and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Save to journal
  const handleSaveToJournal = () => {
    if (!analysisResult) return;
    const newEntry: JournalEntry = {
      id: 'trade_' + Date.now(),
      timestamp: Date.now(),
      asset: analysisResult.assetDetected || 'Market Asset',
      action: analysisResult.action,
      confidence: analysisResult.confidenceScore,
      expiry: analysisResult.recommendedExpiry || '1M',
      outcome: 'PENDING',
      notes: analysisResult.quickSummary,
      imageUrl: analysisResult.imageUrl,
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
    setIsSaved(true);
  };

  const handleUpdateOutcome = (id: string, outcome: 'WIN' | 'LOSS' | 'TIE' | 'PENDING') => {
    setJournalEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, outcome } : item))
    );
  };

  const handleDeleteEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllJournal = () => {
    if (window.confirm('Are you sure you want to clear your trade journal history?')) {
      setJournalEntries([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        journalCount={journalEntries.length}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: ANALYZER (PRIMARY WORKSPACE) */}
        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            {/* Upload Zone & Presets */}
            <UploadZone
              onAnalyze={handleAnalyzeChart}
              isAnalyzing={isAnalyzing}
              soundEnabled={soundEnabled}
            />

            {/* Error Display */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="text-slate-400 hover:text-white underline ml-4"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Signal & Analysis Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {analysisResult ? (
                <>
                  <SignalDisplay
                    result={analysisResult}
                    onSaveToJournal={handleSaveToJournal}
                    isSaved={isSaved}
                    soundEnabled={soundEnabled}
                  />

                  <AnalysisDeepDive result={analysisResult} />
                </>
              ) : (
                /* Empty state guide when no chart uploaded yet */
                !isAnalyzing && (
                  <div className="bg-[#111622] rounded-2xl border border-slate-800/80 p-8 sm:p-10 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="max-w-md mx-auto space-y-1">
                      <h3 className="text-base font-bold text-white">
                        Ready to Analyze Quotex Chart Screenshot
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Paste any screenshot (<kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">Ctrl+V</kbd>) or test one of the 4 sample chart presets above to see the AI predict the next CALL (UP) or PUT (DOWN) move.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 border-t border-slate-800 text-left">
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                          1. Multi-Timeframe
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Detects 5s, 15s, 30s, 1M, and 5M candles automatically.
                        </p>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-bold text-cyan-400 block mb-1">
                          2. SNR & Wick Rejections
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Spots support/resistance zones, round numbers, and pin bar exhaustion.
                        </p>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-bold text-amber-400 block mb-1">
                          3. Quotex OTC Dynamics
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Specialized rules for 90%+ payout weekend OTC algorithmic feeds.
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MARKETS & KNOWLEDGE HUB */}
        {activeTab === 'knowledge' && <MarketHub />}

        {/* TAB 3: MONEY MANAGEMENT CALCULATOR */}
        {activeTab === 'calculator' && <MoneyManagementCalc />}

        {/* TAB 4: TRADE JOURNAL */}
        {activeTab === 'journal' && (
          <TradeJournal
            entries={journalEntries}
            onUpdateOutcome={handleUpdateOutcome}
            onDeleteEntry={handleDeleteEntry}
            onClearAll={handleClearAllJournal}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0d121d] py-5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">Quotex AI Trading Analyzer</span>
            <span>• Built for 1M-5M Binary Options</span>
          </div>

          <p className="text-[11px] text-slate-500 text-center sm:text-right">
            Disclaimer: High-risk trading tool. Always practice responsible money management and test strategies on demo.
          </p>
        </div>
      </footer>
    </div>
  );
}
