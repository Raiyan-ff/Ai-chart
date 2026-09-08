import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Target,
  ArrowRight
} from 'lucide-react';

export const MoneyManagementCalc: React.FC = () => {
  const [balance, setBalance] = useState<number>(200);
  const [payoutRate, setPayoutRate] = useState<number>(88); // 88%
  const [riskPercent, setRiskPercent] = useState<number>(2); // 2%
  const [compoundDays, setCompoundDays] = useState<number>(10);
  const [dailyTargetPercent, setDailyTargetPercent] = useState<number>(8); // 8% daily target

  // Calculations
  const baseStake = Math.max(1, Math.round((balance * (riskPercent / 100)) * 100) / 100);
  const baseProfit = Math.round(baseStake * (payoutRate / 100) * 100) / 100;

  // Controlled 1-step Martingale:
  // If Step 0 ($baseStake) loses, Step 1 recovers the loss + gives base profit
  const step1Stake = Math.round(((baseStake + baseProfit) / (payoutRate / 100)) * 100) / 100;
  const step1Profit = Math.round(step1Stake * (payoutRate / 100) * 100) / 100;
  const totalRisk2Steps = Math.round((baseStake + step1Stake) * 100) / 100;
  const totalRiskPercent = Math.round((totalRisk2Steps / balance) * 1000) / 10;

  // Compounding table
  const compoundingSchedule = [];
  let currentCap = balance;
  for (let i = 1; i <= compoundDays; i++) {
    const profitToday = Math.round(currentCap * (dailyTargetPercent / 100) * 100) / 100;
    const endBalance = Math.round((currentCap + profitToday) * 100) / 100;
    compoundingSchedule.push({
      session: i,
      start: currentCap,
      targetProfit: profitToday,
      end: endBalance,
    });
    currentCap = endBalance;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#131b2c] to-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <Calculator className="w-4 h-4" />
          Capital Preservation & Growth Calculator
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Quotex Money Management & Controlled Martingale
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Professional binary traders succeed because of strict money management, not gambling. Calculate your exact stake sizes, max daily loss limits, and 1-step recovery mathematics.
        </p>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#111622] p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Trading Balance ($)</span>
            <span className="text-emerald-400 font-bold">${balance}</span>
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="number"
              min="10"
              max="100000"
              value={balance}
              onChange={(e) => setBalance(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Asset Payout Rate (%)</span>
            <span className="text-emerald-400 font-bold">{payoutRate}%</span>
          </label>
          <input
            type="range"
            min="70"
            max="95"
            value={payoutRate}
            onChange={(e) => setPayoutRate(Number(e.target.value))}
            className="w-full accent-emerald-500 mt-2"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>70% (Min)</span>
            <span>88% (Standard)</span>
            <span>94% (OTC Max)</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Base Risk Per Trade (%)</span>
            <span className="text-cyan-400 font-bold">{riskPercent}%</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 mt-1">
            {[1, 2, 3].map((pct) => (
              <button
                key={pct}
                onClick={() => setRiskPercent(pct)}
                className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  riskPercent === pct
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Daily Profit Target (%)</span>
            <span className="text-emerald-400 font-bold">+{dailyTargetPercent}%</span>
          </label>
          <input
            type="number"
            min="2"
            max="30"
            value={dailyTargetPercent}
            onChange={(e) => setDailyTargetPercent(Math.max(1, Number(e.target.value)))}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>
      </div>

      {/* Controlled 1-Step Martingale vs Standard Model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: 1-Step Recovery Blueprint */}
        <div className="bg-[#111622] rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Controlled 1-Step Recovery Math (Quotex Safe Rule)
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              ANTI-BLOWOUT
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block">Step 0 (Primary Trade):</span>
                <span className="text-base font-extrabold text-white">${baseStake.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block">Net Win Payout:</span>
                <span className="text-sm font-bold text-emerald-400">+${baseProfit.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block">Step 1 (If Step 0 Loses):</span>
                <span className="text-base font-extrabold text-amber-300">${step1Stake.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block">Net Win Return:</span>
                <span className="text-sm font-bold text-emerald-400">+${step1Profit.toFixed(2)} (Recovers Step 0)</span>
              </div>
            </div>

            <div className="bg-rose-500/10 p-3 rounded-xl border border-rose-500/25 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-slate-300">Max Cumulative 2-Step Risk:</span>
              </div>
              <span className="text-sm font-bold text-rose-400">
                ${totalRisk2Steps.toFixed(2)} ({totalRiskPercent}% of Account)
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            <span className="text-amber-400 font-semibold">Golden Rule: </span>
            If Step 1 fails, <strong className="text-white">ABORT IMMEDIATELY</strong>. Never take Step 2 or Step 3. Close the Quotex app for the session. That ensures 90%+ of your capital remains completely safe.
          </div>
        </div>

        {/* Right: 10-Session Compound Ladder */}
        <div className="bg-[#111622] rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              10-Session Compounding Target (+{dailyTargetPercent}% per session)
            </h3>
            <span className="text-xs text-slate-400">
              Target: <span className="text-emerald-400 font-bold">${compoundingSchedule[compoundDays - 1]?.end.toFixed(2)}</span>
            </span>
          </div>

          <div className="overflow-x-auto max-h-[220px] overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/80 sticky top-0">
                <tr>
                  <th className="py-2 px-3">Session</th>
                  <th className="py-2 px-3">Start Cap</th>
                  <th className="py-2 px-3">Target Profit</th>
                  <th className="py-2 px-3 text-right">End Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {compoundingSchedule.map((row) => (
                  <tr key={row.session} className="hover:bg-slate-900/40">
                    <td className="py-1.5 px-3 text-slate-300 font-sans">Session {row.session}</td>
                    <td className="py-1.5 px-3 text-slate-400">${row.start.toFixed(2)}</td>
                    <td className="py-1.5 px-3 text-emerald-400 font-semibold">+${row.targetProfit.toFixed(2)}</td>
                    <td className="py-1.5 px-3 text-right text-white font-bold">${row.end.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Total 10-Session Gain:</span>
            <span className="font-extrabold text-emerald-400 text-sm">
              +{(((compoundingSchedule[compoundDays - 1]?.end - balance) / balance) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
