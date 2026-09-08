import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Flame, 
  ShieldCheck, 
  BarChart, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  HelpCircle,
  Clock,
  Coins,
  Globe
} from 'lucide-react';
import { 
  QUOTEX_MARKETS, 
  TRADING_STRATEGIES, 
  CANDLESTICK_PATTERNS, 
  QUOTEX_OTC_RULES 
} from '../data/marketKnowledge';
import { MarketCategory } from '../types/trading';

export const MarketHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | MarketCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subTab, setSubTab] = useState<'markets' | 'strategies' | 'candlesticks' | 'otc_rules'>('markets');

  const filteredMarkets = QUOTEX_MARKETS.filter((asset) => {
    const matchesCat = activeCategory === 'all' || asset.category === activeCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Knowledge Hub Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#101927] to-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            Quotex Trading Encyclopedia
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            All Trading Markets, Strategies & Candlestick Knowledge
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            Master Quotex live currencies, OTC algorithmic behaviors, sniper reversal setups, and high-probability candlestick geometry.
          </p>
        </div>

        {/* Sub Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800">
          <button
            onClick={() => setSubTab('markets')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              subTab === 'markets'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>All Quotex Markets ({QUOTEX_MARKETS.length})</span>
          </button>

          <button
            onClick={() => setSubTab('strategies')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              subTab === 'strategies'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Trading Strategies ({TRADING_STRATEGIES.length})</span>
          </button>

          <button
            onClick={() => setSubTab('candlesticks')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              subTab === 'candlesticks'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart className="w-3.5 h-3.5" />
            <span>Candlestick Patterns ({CANDLESTICK_PATTERNS.length})</span>
          </button>

          <button
            onClick={() => setSubTab('otc_rules')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              subTab === 'otc_rules'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Quotex OTC Secret Rules</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: All Quotex Markets */}
      {subTab === 'markets' && (
        <div className="space-y-4">
          {/* Filter and search bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#111622] p-3 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symbol (e.g. EUR/USD, Gold, BTC)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {(['all', 'otc', 'forex', 'crypto', 'commodities', 'stocks'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition-all shrink-0 ${
                    activeCategory === cat
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Markets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map((asset) => (
              <div
                key={asset.symbol}
                className="bg-[#111622] rounded-xl border border-slate-800 p-4 hover:border-slate-700 transition-all space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {asset.symbol}
                      </span>
                      {asset.isOtc && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          24/7 OTC
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{asset.name}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-400">
                      +{asset.typicalPayout}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">Typical Payout</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {asset.description}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {asset.bestHours}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    asset.volatility === 'High' || asset.volatility === 'Very High'
                      ? 'bg-rose-500/10 text-rose-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {asset.volatility} Volatility
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Trading Strategies */}
      {subTab === 'strategies' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRADING_STRATEGIES.map((strat) => (
              <div
                key={strat.id}
                className="bg-[#111622] rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                      {strat.targetTimeframe} • Expiry: {strat.idealExpiry}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {strat.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {strat.winRateEst} Win Rate
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {strat.description}
                </p>

                {/* Key Rules List */}
                <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Entry Rules & Checklist:
                  </span>
                  {strat.keyRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>

                {/* Quotex Pro Tip */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                  <span className="font-bold text-amber-400">Quotex Pro Tip: </span>
                  {strat.quotexTip}
                </div>

                {/* Recommended Indicators */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-slate-500">Indicators:</span>
                  {strat.indicators.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Candlestick Patterns */}
      {subTab === 'candlesticks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANDLESTICK_PATTERNS.map((pattern, idx) => (
            <div
              key={idx}
              className="bg-[#111622] rounded-xl border border-slate-800 p-4 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">
                    {pattern.name}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase flex items-center gap-1 ${
                    pattern.sentiment === 'BULLISH'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : pattern.sentiment === 'BEARISH'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}>
                    {pattern.sentiment === 'BULLISH' && <ArrowUpRight className="w-3 h-3" />}
                    {pattern.sentiment === 'BEARISH' && <ArrowDownRight className="w-3 h-3" />}
                    {pattern.sentiment}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {pattern.description}
                </p>

                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-slate-400 block text-[10px] uppercase">
                    Signal Trigger:
                  </span>
                  <p className="mt-0.5">{pattern.entrySignal}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Est. Win Rate: <span className="font-bold text-emerald-400">{pattern.winRate}</span>
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  pattern.quotexAction === 'CALL'
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : pattern.quotexAction === 'PUT'
                    ? 'bg-rose-500 text-white font-black'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  Action: {pattern.quotexAction}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 4: Quotex OTC Secret Rules */}
      {subTab === 'otc_rules' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              Quotex Over-The-Counter (OTC) Market Mechanics
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Quotex OTC pairs are active 24/7 (including Saturdays and Sundays) with high payouts often reaching 92%-94%. Because OTC price feeds are generated by algorithmic market makers, traditional real-market price action requires these specialized adjustments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUOTEX_OTC_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="bg-[#111622] rounded-xl border border-slate-800 p-5 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {rule.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-8">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
