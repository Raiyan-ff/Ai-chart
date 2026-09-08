// Generate realistic high-tech Quotex trading chart SVGs for instant 1-click test analysis

export interface SampleChartPreset {
  id: string;
  title: string;
  asset: string;
  timeframe: string;
  type: 'UP_HAMMER' | 'DOWN_ENGULFING' | 'UP_BB_BOUNCE' | 'DOWN_RSI_PEAK';
  description: string;
  expectedAction: 'CALL' | 'PUT';
  base64: string;
}

function svgToBase64(svgString: string): string {
  if (typeof window !== 'undefined' && window.btoa) {
    return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgString)))}`;
  }
  // Node / SSR fallback
  return `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
}

// 1. EUR/USD OTC - Bullish Hammer at Support
const svgEurUsd = `
<svg width="1000" height="600" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" style="background-color:#10141f; font-family:'Segoe UI', sans-serif;">
  <!-- Quotex Top Header Bar -->
  <rect x="0" y="0" width="1000" height="48" fill="#171c2b"/>
  <text x="24" y="30" fill="#00e676" font-size="18" font-weight="bold">QUOTEX</text>
  <rect x="120" y="10" width="180" height="28" rx="4" fill="#232a3f"/>
  <text x="135" y="29" fill="#ffffff" font-size="13" font-weight="600">EUR/USD (OTC) 92%</text>
  <circle cx="282" cy="24" r="5" fill="#00e676"/>
  <text x="320" y="29" fill="#94a3b8" font-size="12">M1 • Japanese Candlesticks</text>
  <text x="820" y="29" fill="#00e676" font-size="14" font-weight="bold">Payout: +92%</text>

  <!-- Grid lines -->
  <line x1="60" y1="100" x2="940" y2="100" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="60" y1="180" x2="940" y2="180" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="60" y1="260" x2="940" y2="260" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="60" y1="340" x2="940" y2="340" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="60" y1="420" x2="940" y2="420" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>

  <!-- Price Scale Right -->
  <rect x="920" y="48" width="80" height="452" fill="#131826"/>
  <text x="930" y="105" fill="#64748b" font-size="11">1.08580</text>
  <text x="930" y="185" fill="#64748b" font-size="11">1.08520</text>
  <text x="930" y="265" fill="#64748b" font-size="11">1.08460</text>
  <text x="930" y="345" fill="#64748b" font-size="11">1.08400</text>
  <text x="930" y="425" fill="#64748b" font-size="11">1.08340</text>

  <!-- Key Horizontal Support Line at 1.08400 -->
  <line x1="60" y1="340" x2="920" y2="340" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6,4"/>
  <rect x="80" y="325" width="130" height="20" rx="3" fill="#0369a1" opacity="0.8"/>
  <text x="90" y="339" fill="#ffffff" font-size="11" font-weight="bold">KEY SNR SUPPORT</text>

  <!-- Dynamic EMA 21 (Yellow Line) -->
  <path d="M 80 210 Q 300 240 500 270 T 800 330 T 900 335" fill="none" stroke="#facc15" stroke-width="2"/>
  <text x="80" y="200" fill="#facc15" font-size="10">EMA 21</text>

  <!-- Candlesticks Sequence (Forex M1) -->
  <!-- Candle 1: Green -->
  <line x1="120" y1="180" x2="120" y2="240" stroke="#00e676" stroke-width="2"/>
  <rect x="110" y="195" width="20" height="35" fill="#00e676"/>

  <!-- Candle 2: Green -->
  <line x1="170" y1="160" x2="170" y2="220" stroke="#00e676" stroke-width="2"/>
  <rect x="160" y="170" width="20" height="40" fill="#00e676"/>

  <!-- Candle 3: Red Drop -->
  <line x1="220" y1="175" x2="220" y2="245" stroke="#ff3366" stroke-width="2"/>
  <rect x="210" y="180" width="20" height="50" fill="#ff3366"/>

  <!-- Candle 4: Red Drop -->
  <line x1="270" y1="220" x2="270" y2="280" stroke="#ff3366" stroke-width="2"/>
  <rect x="260" y="225" width="20" height="45" fill="#ff3366"/>

  <!-- Candle 5: Red Drop into Support -->
  <line x1="320" y1="260" x2="320" y2="330" stroke="#ff3366" stroke-width="2"/>
  <rect x="310" y="265" width="20" height="55" fill="#ff3366"/>

  <!-- Candle 6: Doji bounce test -->
  <line x1="370" y1="310" x2="370" y2="360" stroke="#94a3b8" stroke-width="2"/>
  <rect x="360" y="335" width="20" height="6" fill="#94a3b8"/>

  <!-- Candle 7: Green Recovery -->
  <line x1="420" y1="290" x2="420" y2="345" stroke="#00e676" stroke-width="2"/>
  <rect x="410" y="300" width="20" height="35" fill="#00e676"/>

  <!-- Candle 8: Small Red -->
  <line x1="470" y1="295" x2="470" y2="340" stroke="#ff3366" stroke-width="2"/>
  <rect x="460" y="305" width="20" height="25" fill="#ff3366"/>

  <!-- Candle 9: Red retest of support -->
  <line x1="520" y1="315" x2="520" y2="350" stroke="#ff3366" stroke-width="2"/>
  <rect x="510" y="320" width="20" height="25" fill="#ff3366"/>

  <!-- Candle 10: Red push into support -->
  <line x1="570" y1="325" x2="570" y2="365" stroke="#ff3366" stroke-width="2"/>
  <rect x="560" y="330" width="20" height="25" fill="#ff3366"/>

  <!-- Candle 11: Green push -->
  <line x1="620" y1="300" x2="620" y2="345" stroke="#00e676" stroke-width="2"/>
  <rect x="610" y="308" width="20" height="30" fill="#00e676"/>

  <!-- Candle 12: Exhaustion Red -->
  <line x1="670" y1="310" x2="670" y2="355" stroke="#ff3366" stroke-width="2"/>
  <rect x="660" y="318" width="20" height="30" fill="#ff3366"/>

  <!-- Candle 13: THE TRIGGER CANDLE -> BULLISH HAMMER ON SUPPORT (Long lower wick) -->
  <line x1="720" y1="312" x2="720" y2="378" stroke="#00e676" stroke-width="3"/>
  <rect x="710" y="315" width="20" height="18" rx="2" fill="#00e676"/>
  <!-- Target highlight circle -->
  <circle cx="720" cy="330" r="28" fill="none" stroke="#00e676" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="720,270 710,285 730,285" fill="#00e676"/>
  <text x="660" y="260" fill="#00e676" font-size="12" font-weight="bold">BULLISH HAMMER (CALL)</text>

  <!-- Live Candle cursor line -->
  <line x1="755" y1="48" x2="755" y2="500" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,3"/>
  <rect x="920" y="315" width="80" height="22" fill="#00e676"/>
  <text x="928" y="331" fill="#000000" font-size="12" font-weight="bold">1.08412</text>

  <!-- Indicator Sub-window (RSI 14) -->
  <rect x="0" y="500" width="1000" height="100" fill="#131826"/>
  <line x1="0" y1="500" x2="1000" y2="500" stroke="#1e293b" stroke-width="1"/>
  <text x="24" y="525" fill="#94a3b8" font-size="12" font-weight="600">RSI (14) - 34.2 (Bullish Divergence Hook)</text>
  <line x1="60" y1="530" x2="920" y2="530" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="930" y="534" fill="#ef4444" font-size="10">70 OB</text>
  <line x1="60" y1="575" x2="920" y2="575" stroke="#10b981" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="930" y="579" fill="#10b981" font-size="10">30 OS</text>
  <!-- RSI curve hooking up from 30 -->
  <path d="M 80 540 Q 250 560 400 570 T 600 580 T 680 578 T 720 565" fill="none" stroke="#a855f7" stroke-width="2.5"/>

  <!-- Quotex Quick UI widgets Bottom Right -->
  <rect x="800" y="60" width="110" height="34" rx="4" fill="#00e676"/>
  <text x="830" y="82" fill="#000000" font-size="14" font-weight="bold">▲ CALL</text>
</svg>
`;

// 2. GBP/JPY 1M - Bearish Engulfing at Double Top Resistance
const svgGbpJpy = `
<svg width="1000" height="600" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" style="background-color:#10141f; font-family:'Segoe UI', sans-serif;">
  <rect x="0" y="0" width="1000" height="48" fill="#171c2b"/>
  <text x="24" y="30" fill="#ff3366" font-size="18" font-weight="bold">QUOTEX</text>
  <rect x="120" y="10" width="180" height="28" rx="4" fill="#232a3f"/>
  <text x="135" y="29" fill="#ffffff" font-size="13" font-weight="600">GBP/JPY (Live) 87%</text>
  <circle cx="282" cy="24" r="5" fill="#ff3366"/>
  <text x="320" y="29" fill="#94a3b8" font-size="12">M1 • Japanese Candlesticks</text>
  <text x="820" y="29" fill="#ff3366" font-size="14" font-weight="bold">Payout: +87%</text>

  <!-- Grid lines -->
  <line x1="60" y1="120" x2="940" y2="120" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="60" y1="200" x2="940" y2="200" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="60" y1="280" x2="940" y2="280" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="60" y1="360" x2="940" y2="360" stroke="#1c2438" stroke-width="1" stroke-dasharray="4,4"/>

  <!-- Key Horizontal Resistance Line at Top -->
  <line x1="60" y1="130" x2="920" y2="130" stroke="#ff3366" stroke-width="2" stroke-dasharray="6,4"/>
  <rect x="80" y="115" width="150" height="20" rx="3" fill="#991b1b" opacity="0.8"/>
  <text x="90" y="129" fill="#ffffff" font-size="11" font-weight="bold">STRONG RESISTANCE (192.500)</text>

  <!-- Price Scale Right -->
  <rect x="920" y="48" width="80" height="452" fill="#131826"/>
  <text x="930" y="135" fill="#ef4444" font-size="11">192.500</text>
  <text x="930" y="215" fill="#64748b" font-size="11">192.350</text>
  <text x="930" y="295" fill="#64748b" font-size="11">192.200</text>
  <text x="930" y="375" fill="#64748b" font-size="11">192.050</text>

  <!-- Candlesticks: Prior Uptrend into Double Top -->
  <!-- Candle 1: Green rally -->
  <line x1="120" y1="280" x2="120" y2="360" stroke="#00e676" stroke-width="2"/>
  <rect x="110" y="295" width="20" height="50" fill="#00e676"/>
  <!-- Candle 2: Green -->
  <line x1="170" y1="220" x2="170" y2="300" stroke="#00e676" stroke-width="2"/>
  <rect x="160" y="235" width="20" height="55" fill="#00e676"/>
  <!-- Candle 3: Peak 1 at Resistance (Wick rejection) -->
  <line x1="220" y1="125" x2="220" y2="210" stroke="#ff3366" stroke-width="2"/>
  <rect x="210" y="150" width="20" height="45" fill="#ff3366"/>
  <!-- Candle 4: Red Pullback -->
  <line x1="270" y1="190" x2="270" y2="250" stroke="#ff3366" stroke-width="2"/>
  <rect x="260" y="195" width="20" height="45" fill="#ff3366"/>
  <!-- Candle 5: Small green -->
  <line x1="320" y1="200" x2="320" y2="250" stroke="#00e676" stroke-width="2"/>
  <rect x="310" y="210" width="20" height="30" fill="#00e676"/>
  <!-- Candle 6: Second attempt to break resistance (Small green) -->
  <line x1="380" y1="140" x2="380" y2="210" stroke="#00e676" stroke-width="2"/>
  <rect x="370" y="145" width="20" height="35" fill="#00e676"/>

  <!-- Candle 7: MASSIVE BEARISH ENGULFING CANDLE (TRIGGER) -->
  <line x1="440" y1="130" x2="440" y2="235" stroke="#ff3366" stroke-width="3"/>
  <rect x="430" y="140" width="22" height="75" fill="#ff3366"/>
  <!-- Target highlight circle -->
  <circle cx="441" cy="180" r="32" fill="none" stroke="#ff3366" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="441,270 431,255 451,255" fill="#ff3366"/>
  <text x="375" y="290" fill="#ff3366" font-size="12" font-weight="bold">BEARISH ENGULFING (PUT)</text>

  <!-- Indicator Sub-window (MACD + Stochastic) -->
  <rect x="0" y="500" width="1000" height="100" fill="#131826"/>
  <line x1="0" y1="500" x2="1000" y2="500" stroke="#1e293b" stroke-width="1"/>
  <text x="24" y="525" fill="#94a3b8" font-size="12" font-weight="600">Stochastic (14, 3, 3) - 86.4 (Overbought Bearish Death Cross)</text>
  <line x1="60" y1="540" x2="920" y2="540" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <!-- Cross downwards -->
  <path d="M 80 570 Q 250 535 380 530 T 440 545" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <path d="M 80 575 Q 250 540 380 533 T 440 540" fill="none" stroke="#f43f5e" stroke-width="2"/>

  <!-- Live Cursor & Price -->
  <rect x="920" y="210" width="80" height="22" fill="#ff3366"/>
  <text x="928" y="226" fill="#ffffff" font-size="12" font-weight="bold">192.365</text>

  <!-- Quotex Quick UI widgets Bottom Right -->
  <rect x="800" y="60" width="110" height="34" rx="4" fill="#ff3366"/>
  <text x="830" y="82" fill="#ffffff" font-size="14" font-weight="bold">▼ PUT</text>
</svg>
`;

// 3. BTC/USD 1M - Bollinger Bands Lower Squeeze Reversal
const svgBtcUsd = `
<svg width="1000" height="600" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" style="background-color:#10141f; font-family:'Segoe UI', sans-serif;">
  <rect x="0" y="0" width="1000" height="48" fill="#171c2b"/>
  <text x="24" y="30" fill="#f59e0b" font-size="18" font-weight="bold">QUOTEX</text>
  <rect x="120" y="10" width="180" height="28" rx="4" fill="#232a3f"/>
  <text x="135" y="29" fill="#ffffff" font-size="13" font-weight="600">BTC/USD (Crypto) 90%</text>
  <circle cx="282" cy="24" r="5" fill="#f59e0b"/>
  <text x="320" y="29" fill="#94a3b8" font-size="12">M1 • Bollinger Bands (20,2)</text>
  <text x="820" y="29" fill="#00e676" font-size="14" font-weight="bold">Payout: +90%</text>

  <!-- Bollinger Bands (Upper, Middle, Lower) -->
  <path d="M 60 160 Q 300 180 500 240 T 750 330 T 920 340" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="3,3"/>
  <path d="M 60 250 Q 300 260 500 310 T 750 390 T 920 395" fill="none" stroke="#eab308" stroke-width="1.5"/>
  <path d="M 60 340 Q 300 350 500 390 T 750 450 T 920 455" fill="none" stroke="#0ea5e9" stroke-width="2"/>

  <!-- Candle action testing and piercing Lower Bollinger Band -->
  <line x1="500" y1="360" x2="500" y2="440" stroke="#ff3366" stroke-width="2"/>
  <rect x="490" y="370" width="20" height="60" fill="#ff3366"/>

  <line x1="560" y1="410" x2="560" y2="470" stroke="#ff3366" stroke-width="2"/>
  <rect x="550" y="420" width="20" height="40" fill="#ff3366"/>

  <!-- TRIGGER: Pin bar wick outside lower band bouncing back inside -->
  <line x1="620" y1="415" x2="620" y2="485" stroke="#00e676" stroke-width="3"/>
  <rect x="610" y="420" width="20" height="15" fill="#00e676"/>
  <circle cx="620" cy="435" r="30" fill="none" stroke="#00e676" stroke-width="2"/>
  <text x="560" y="370" fill="#00e676" font-size="12" font-weight="bold">BOLLINGER BOUNCE (CALL)</text>

  <rect x="0" y="500" width="1000" height="100" fill="#131826"/>
  <text x="24" y="525" fill="#94a3b8" font-size="12">Awesome Oscillator - Momentum turning green</text>
  <rect x="550" y="540" width="16" height="30" fill="#ef4444"/>
  <rect x="580" y="545" width="16" height="20" fill="#ef4444"/>
  <rect x="610" y="530" width="16" height="35" fill="#10b981"/>
</svg>
`;

// 4. Gold (OTC) 1M - RSI 78 Extreme Overbought Shooting Star Put
const svgGoldOtc = `
<svg width="1000" height="600" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" style="background-color:#10141f; font-family:'Segoe UI', sans-serif;">
  <rect x="0" y="0" width="1000" height="48" fill="#171c2b"/>
  <text x="24" y="30" fill="#eab308" font-size="18" font-weight="bold">QUOTEX</text>
  <rect x="120" y="10" width="180" height="28" rx="4" fill="#232a3f"/>
  <text x="135" y="29" fill="#ffffff" font-size="13" font-weight="600">Gold (OTC) 94%</text>
  <circle cx="282" cy="24" r="5" fill="#eab308"/>
  <text x="320" y="29" fill="#94a3b8" font-size="12">M1 • Commodities • OTC High Volatility</text>
  <text x="820" y="29" fill="#00e676" font-size="14" font-weight="bold">Payout: +94%</text>

  <!-- Resistance Ceiling -->
  <line x1="60" y1="140" x2="920" y2="140" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,4"/>
  <rect x="80" y="125" width="180" height="20" rx="3" fill="#881337"/>
  <text x="90" y="139" fill="#ffffff" font-size="11" font-weight="bold">HISTORICAL OTC CEILING ($2,745.00)</text>

  <!-- Climax green candles -->
  <line x1="450" y1="210" x2="450" y2="330" stroke="#00e676" stroke-width="2"/>
  <rect x="440" y="230" width="20" height="90" fill="#00e676"/>
  <line x1="510" y1="150" x2="510" y2="240" stroke="#00e676" stroke-width="2"/>
  <rect x="500" y="160" width="20" height="70" fill="#00e676"/>

  <!-- TRIGGER: Long upper wick SHOOTING STAR at ceiling -->
  <line x1="580" y1="135" x2="580" y2="210" stroke="#ff3366" stroke-width="3"/>
  <rect x="570" y="195" width="20" height="15" fill="#ff3366"/>
  <circle cx="580" cy="170" r="32" fill="none" stroke="#ff3366" stroke-width="2"/>
  <text x="520" y="115" fill="#ff3366" font-size="12" font-weight="bold">SHOOTING STAR REJECTION (PUT)</text>

  <!-- RSI Panel showing 78.4 Overbought -->
  <rect x="0" y="500" width="1000" height="100" fill="#131826"/>
  <line x1="0" y1="500" x2="1000" y2="500" stroke="#1e293b" stroke-width="1"/>
  <text x="24" y="525" fill="#ef4444" font-size="12" font-weight="bold">RSI (14) - 78.4 (EXTREME OVERBOUGHT REVERSAL)</text>
  <line x1="60" y1="535" x2="920" y2="535" stroke="#ef4444" stroke-width="1.5"/>
  <path d="M 80 570 Q 300 560 480 528 T 580 522" fill="none" stroke="#a855f7" stroke-width="3"/>
</svg>
`;

export const SAMPLE_CHART_PRESETS: SampleChartPreset[] = [
  {
    id: 'preset-eurusd-hammer',
    title: 'EUR/USD (OTC) 1M - Bullish Hammer at SNR',
    asset: 'EUR/USD (OTC)',
    timeframe: '1M',
    type: 'UP_HAMMER',
    description: 'Candle tested key horizontal support with a deep lower wick rejection. High probability CALL signal.',
    expectedAction: 'CALL',
    base64: svgToBase64(svgEurUsd),
  },
  {
    id: 'preset-gbpjpy-engulfing',
    title: 'GBP/JPY Live 1M - Bearish Engulfing at Resistance',
    asset: 'GBP/JPY',
    timeframe: '1M',
    type: 'DOWN_ENGULFING',
    description: 'Double top rejection at 192.500 round number followed by complete bearish engulfing candle. Strong PUT signal.',
    expectedAction: 'PUT',
    base64: svgToBase64(svgGbpJpy),
  },
  {
    id: 'preset-btcusd-bb',
    title: 'BTC/USD 1M - Bollinger Band Squeeze Bounce',
    asset: 'BTC/USD',
    timeframe: '1M',
    type: 'UP_BB_BOUNCE',
    description: 'Pin bar piercing lower 2.0 standard deviation band with Awesome Oscillator turning green. High probability CALL.',
    expectedAction: 'CALL',
    base64: svgToBase64(svgBtcUsd),
  },
  {
    id: 'preset-gold-rsi',
    title: 'Gold (OTC) 1M - RSI 78 Overbought Shooting Star',
    asset: 'Gold (OTC)',
    timeframe: '1M',
    type: 'DOWN_RSI_PEAK',
    description: 'Extreme RSI overbought reading of 78+ paired with long upper shadow shooting star at historical OTC ceiling. PUT signal.',
    expectedAction: 'PUT',
    base64: svgToBase64(svgGoldOtc),
  },
];
