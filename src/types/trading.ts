export type TradeAction = 'CALL' | 'PUT' | 'NO_TRADE';

export type MarketCategory = 'forex' | 'otc' | 'crypto' | 'commodities' | 'stocks';

export interface TechnicalIndicatorInfo {
  name: string;
  reading: string;
  signal: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  notes: string;
}

export interface VisualAnnotation {
  area: string;
  type: 'SUPPORT' | 'RESISTANCE' | 'TRIGGER_CANDLE' | 'INDICATOR';
  comment: string;
}

export interface AnalysisResult {
  action: TradeAction;
  actionLabel: string;
  confidenceScore: number;
  recommendedExpiry: string;
  assetDetected: string;
  marketType: string;
  timeframeDetected: string;
  trendAnalysis: {
    direction: 'UPTREND' | 'DOWNTREND' | 'RANGING' | 'CHOPPY';
    strength: 'STRONG' | 'MODERATE' | 'WEAK';
    description: string;
  };
  priceActionDetails: {
    currentCandlePattern: string;
    patternSignificance: string;
    supportResistanceLevel: string;
    breakoutOrRejection: string;
    momentum: string;
  };
  technicalIndicatorsDetected: TechnicalIndicatorInfo[];
  quotexStrategyInsight: {
    strategyName: string;
    triggerCondition: string;
    exactEntryTiming: string;
    safetyWarning: string;
  };
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  moneyManagementAdvice: {
    recommendedStake: string;
    martingaleAllowed: boolean;
    martingaleSteps: string;
  };
  keyFactors: string[];
  visualAnnotations: VisualAnnotation[];
  quickSummary: string;
  timestamp?: number;
  isSimulation?: boolean;
  imageUrl?: string;
}

export interface MarketAsset {
  symbol: string;
  name: string;
  category: MarketCategory;
  typicalPayout: number;
  volatility: 'Low' | 'Medium' | 'High' | 'Very High';
  bestHours: string;
  isOtc: boolean;
  description: string;
}

export interface TradingStrategy {
  id: string;
  title: string;
  targetTimeframe: string;
  idealExpiry: string;
  winRateEst: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  keyRules: string[];
  quotexTip: string;
  indicators: string[];
}

export interface CandlestickPatternInfo {
  name: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  winRate: string;
  description: string;
  entrySignal: string;
  quotexAction: 'CALL' | 'PUT' | 'WAIT';
}

export interface JournalEntry {
  id: string;
  timestamp: number;
  asset: string;
  action: TradeAction;
  confidence: number;
  expiry: string;
  outcome?: 'WIN' | 'LOSS' | 'TIE' | 'PENDING';
  pnl?: number;
  notes?: string;
  imageUrl?: string;
}
