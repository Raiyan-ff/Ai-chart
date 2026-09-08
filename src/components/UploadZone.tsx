import React, { useState, useRef, useEffect, DragEvent, ClipboardEvent } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  X, 
  SlidersHorizontal, 
  Clipboard, 
  FileText,
  AlertCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import { SAMPLE_CHART_PRESETS, SampleChartPreset } from '../data/sampleCharts';
import { playShutterSound } from '../utils/audio';

interface UploadZoneProps {
  onAnalyze: (data: {
    imageBase64: string;
    mimeType: string;
    selectedMarket: string;
    timeframe: string;
    userNotes: string;
    imageUrl: string;
  }) => void;
  isAnalyzing: boolean;
  soundEnabled: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onAnalyze,
  isAnalyzing,
  soundEnabled,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [selectedMarket, setSelectedMarket] = useState<string>('AUTO_DETECT');
  const [timeframe, setTimeframe] = useState<string>('AUTO_DETECT');
  const [userNotes, setUserNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global paste handler so trader can just press Ctrl+V anywhere!
  useEffect(() => {
    const handleGlobalPaste = (e: globalThis.ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            if (soundEnabled) playShutterSound();
            e.preventDefault();
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [soundEnabled]);

  const processFile = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds 25MB limit.');
      return;
    }

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      // Clean base64
      const base64Data = result.includes(';base64,') ? result.split(';base64,')[1] : result;
      setImageBase64(base64Data);
    };
    reader.onerror = () => {
      setErrorMessage('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
      if (soundEnabled) playShutterSound();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
      if (soundEnabled) playShutterSound();
    }
  };

  const handlePresetSelect = (preset: SampleChartPreset) => {
    setErrorMessage(null);
    setImagePreview(preset.base64);
    const base64Clean = preset.base64.split(';base64,')[1] || preset.base64;
    setImageBase64(base64Clean);
    setMimeType('image/svg+xml');
    setSelectedMarket(preset.asset);
    setTimeframe(preset.timeframe);
    setUserNotes(`Testing preset: ${preset.title}`);
    if (soundEnabled) playShutterSound();
  };

  const handleClear = () => {
    setImagePreview(null);
    setImageBase64(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageBase64 || !imagePreview) {
      setErrorMessage('Please upload a screenshot or select a preset chart first.');
      return;
    }

    onAnalyze({
      imageBase64,
      mimeType,
      selectedMarket,
      timeframe,
      userNotes,
      imageUrl: imagePreview,
    });
  };

  return (
    <div className="bg-[#111622] rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-6 relative z-10">
        {/* Left Side: Upload & Drop Area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                Upload Quotex Chart Screenshot
              </h2>
              <p className="text-xs text-slate-400">
                Paste directly (<kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300">Ctrl+V</kbd>), drag & drop, or browse file
              </p>
            </div>
            {imagePreview && (
              <button
                type="button"
                onClick={handleClear}
                disabled={isAnalyzing}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 transition-all disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Main Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !imagePreview && fileInputRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer min-h-[260px] sm:min-h-[300px] flex flex-col items-center justify-center p-4 text-center overflow-hidden ${
              dragActive
                ? 'border-emerald-500 bg-emerald-500/10 scale-[0.99]'
                : imagePreview
                ? 'border-slate-700 bg-slate-900/60'
                : 'border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={isAnalyzing}
            />

            {imagePreview ? (
              <div className="w-full h-full relative group">
                <img
                  src={imagePreview}
                  alt="Quotex Chart Preview"
                  className="w-full max-h-[340px] object-contain rounded-lg shadow-md mx-auto"
                />
                {/* Laser scan animation line while analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400/50 animate-pulse relative top-0"
                      style={{
                        animation: 'scanner 2.2s ease-in-out infinite alternate',
                      }}
                    />
                    <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="px-4 py-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/50 shadow-2xl flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-bold tracking-wide text-emerald-400 uppercase">
                          AI Neural Engine Scanning Chart...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {!isAnalyzing && (
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur border border-slate-700 text-slate-300 text-[11px] px-2.5 py-1 rounded-md">
                    Click to change screenshot
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center text-emerald-400 shadow-inner">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <div className="max-w-xs">
                  <p className="text-sm font-semibold text-slate-200">
                    Drop your Quotex chart here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Or <span className="text-emerald-400 underline decoration-emerald-500/50">browse from computer</span> or paste clipboard screenshot directly
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
                  <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Supports: Full Quotex UI, Lightshot, Snipping Tool</span>
                </div>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="mt-3 flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Presets row */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Or Try Sample Chart Presets (1-Click Test):
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_CHART_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  disabled={isAnalyzing}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-emerald-500/40 text-left transition-all group disabled:opacity-50"
                >
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${preset.expectedAction === 'CALL' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 truncate">
                        {preset.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {preset.description}
                    </p>
                  </div>
                  <span className={`shrink-0 ml-2 text-[10px] font-bold px-2 py-0.5 rounded border ${
                    preset.expectedAction === 'CALL'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  }`}>
                    {preset.expectedAction === 'CALL' ? '▲ UP' : '▼ DOWN'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Parameters & Analyze Trigger */}
        <div className="w-full lg:w-80 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Chart Parameters
              </span>
            </div>

            {/* Market Asset Hint */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Market / Asset Pair
              </label>
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                disabled={isAnalyzing}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="AUTO_DETECT">✨ Auto-Detect From Screenshot</option>
                <optgroup label="Quotex OTC Pairs (High Payouts 90%+)">
                  <option value="EUR/USD (OTC)">EUR/USD (OTC) - 93% Payout</option>
                  <option value="GBP/USD (OTC)">GBP/USD (OTC) - 92% Payout</option>
                  <option value="USD/INR (OTC)">USD/INR (OTC) - 90% Payout</option>
                  <option value="USD/BRL (OTC)">USD/BRL (OTC) - 89% Payout</option>
                  <option value="USD/BDT (OTC)">USD/BDT (OTC) - 90% Payout</option>
                  <option value="Gold (OTC)">Gold (OTC) - 94% Payout</option>
                </optgroup>
                <optgroup label="Forex Live Currencies">
                  <option value="EUR/USD">EUR/USD (Live)</option>
                  <option value="GBP/USD">GBP/USD (Live)</option>
                  <option value="USD/JPY">USD/JPY (Live)</option>
                  <option value="AUD/CAD">AUD/CAD (Live)</option>
                  <option value="EUR/JPY">EUR/JPY (Live)</option>
                </optgroup>
                <optgroup label="Crypto & Commodities">
                  <option value="BTC/USD">BTC/USD (Bitcoin)</option>
                  <option value="ETH/USD">ETH/USD (Ethereum)</option>
                  <option value="Gold (XAU/USD)">Gold (XAU/USD)</option>
                  <option value="US Crude Oil">US Crude Oil (WTI)</option>
                </optgroup>
              </select>
            </div>

            {/* Visible Timeframe */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Candle Timeframe
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['AUTO_DETECT', '5s', '15s', '30s', '1M', '2M', '5M', '15M'].map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    disabled={isAnalyzing}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                      timeframe === tf
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {tf === 'AUTO_DETECT' ? 'Auto' : tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional User Notes / Context */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Trader Notes / Specific Focus</span>
                <span className="text-[10px] text-slate-500">Optional</span>
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                disabled={isAnalyzing}
                rows={2}
                placeholder="e.g. Bounced off 20 EMA, RSI near 30, looking for 1M call..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Analyze Action Button */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isAnalyzing || !imageBase64}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
                isAnalyzing
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : imageBase64
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/20 hover:shadow-emerald-500/30 scale-100 hover:scale-[1.01] active:scale-[0.99] border border-emerald-400/30 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>ANALYZING CHART CANDLES...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>ANALYZE NEXT MOVE (UP/DOWN)</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Gemini 3.8 Flash Vision • Candlestick & SNR Algorithms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
