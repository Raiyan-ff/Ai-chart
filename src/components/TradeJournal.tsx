import React from 'react';
import { 
  History, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar,
  AlertCircle,
  Percent
} from 'lucide-react';
import { JournalEntry } from '../types/trading';

interface TradeJournalProps {
  entries: JournalEntry[];
  onUpdateOutcome: (id: string, outcome: 'WIN' | 'LOSS' | 'TIE' | 'PENDING') => void;
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
}

export const TradeJournal: React.FC<TradeJournalProps> = ({
  entries,
  onUpdateOutcome,
  onDeleteEntry,
  onClearAll,
}) => {
  const completedEntries = entries.filter((e) => e.outcome === 'WIN' || e.outcome === 'LOSS');
  const winCount = entries.filter((e) => e.outcome === 'WIN').length;
  const lossCount = entries.filter((e) => e.outcome === 'LOSS').length;
  const winRate = completedEntries.length > 0 
    ? Math.round((winCount / completedEntries.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-[#111622] rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <History className="w-4 h-4" />
              Quotex Signal Performance Tracker
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Trade Signal Journal & Win-Rate Statistics
            </h2>
          </div>

          {entries.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Total Logged Signals</span>
            <span className="text-xl font-black text-white mt-1 block">
              {entries.length}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Wins Recorded</span>
            <span className="text-xl font-black text-emerald-400 mt-1 block">
              {winCount} Trades
            </span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Losses Recorded</span>
            <span className="text-xl font-black text-rose-400 mt-1 block">
              {lossCount} Trades
            </span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Net Win Rate</span>
            <span className={`text-xl font-black mt-1 block ${
              winRate >= 75 ? 'text-emerald-400' : winRate >= 50 ? 'text-amber-400' : 'text-slate-300'
            }`}>
              {completedEntries.length > 0 ? `${winRate}%` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Journal Table / Cards */}
      {entries.length === 0 ? (
        <div className="bg-[#111622] rounded-2xl border border-slate-800 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 mx-auto">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Logged Signals Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Analyze any Quotex chart screenshot in the Analyzer tab, then click &quot;Save Signal&quot; to log and track your win rate here.
          </p>
        </div>
      ) : (
        <div className="bg-[#111622] rounded-2xl border border-slate-800 overflow-hidden">
          <div className="divide-y divide-slate-800">
            {entries.map((entry) => (
              <div key={entry.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
                {/* Left info */}
                <div className="flex items-start gap-3">
                  {/* Action Badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    entry.action === 'CALL'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : entry.action === 'PUT'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {entry.action === 'CALL' && <TrendingUp className="w-5 h-5" />}
                    {entry.action === 'PUT' && <TrendingDown className="w-5 h-5" />}
                    {entry.action === 'NO_TRADE' && <Clock className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {entry.asset}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        entry.action === 'CALL'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : entry.action === 'PUT'
                          ? 'bg-rose-500/15 text-rose-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}>
                        {entry.action === 'CALL' ? 'CALL (UP)' : entry.action === 'PUT' ? 'PUT (DOWN)' : 'WAIT'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {entry.expiry}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>Confidence: <strong className="text-slate-200">{entry.confidence}%</strong></span>
                    </div>

                    {entry.notes && (
                      <p className="text-xs text-slate-300 mt-1.5 line-clamp-1 italic">
                        &ldquo;{entry.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Right outcome controls */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => onUpdateOutcome(entry.id, 'WIN')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        entry.outcome === 'WIN'
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-emerald-400'
                      }`}
                    >
                      WIN 🟢
                    </button>
                    <button
                      onClick={() => onUpdateOutcome(entry.id, 'LOSS')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        entry.outcome === 'LOSS'
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'text-slate-400 hover:text-rose-400'
                      }`}
                    >
                      LOSS 🔴
                    </button>
                    <button
                      onClick={() => onUpdateOutcome(entry.id, 'PENDING')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        entry.outcome === 'PENDING'
                          ? 'bg-slate-700 text-slate-200'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Pending
                    </button>
                  </div>

                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    title="Delete log"
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
