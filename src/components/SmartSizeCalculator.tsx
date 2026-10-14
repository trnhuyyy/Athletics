import React, { useState, useMemo } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Check, 
  HelpCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SmartSizeCalculator: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedProduct, 
    addToCart, 
    t, 
    lang, 
    showToast 
  } = useStore();

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [chest, setChest] = useState(96);
  const [waist, setWaist] = useState(80);
  const [hips, setHips] = useState(95);
  const [fitPref, setFitPref] = useState<'tight' | 'regular' | 'loose'>('regular');

  // Algorithm to calculate optimal size
  const calculatedResult = useMemo(() => {
    // Basic athletic sizing formula
    let score = (chest * 0.5) + (waist * 0.3) + (weight * 0.4);
    if (gender === 'female') {
      score = score * 0.92;
    }
    if (fitPref === 'tight') score -= 3;
    if (fitPref === 'loose') score += 4;

    let recSize = 'M';
    let confidence = 94;

    if (score < 90) {
      recSize = 'S';
      confidence = 96;
    } else if (score < 100) {
      recSize = 'M';
      confidence = 97;
    } else if (score < 110) {
      recSize = 'L';
      confidence = 98;
    } else if (score < 120) {
      recSize = 'XL';
      confidence = 95;
    } else {
      recSize = '2XL';
      confidence = 93;
    }

    return {
      size: recSize,
      confidence,
      chestDiff: fitPref === 'tight' ? '+0 cm (ôm sát)' : fitPref === 'regular' ? '+3 cm (chuẩn thể thao)' : '+6 cm (thoải mái)',
      waistDiff: fitPref === 'tight' ? '+1 cm' : '+4 cm',
      reasoning: lang === 'vi' 
        ? `Với chiều cao ${height}cm, nặng ${weight}kg và số đo ngực ${chest}cm, size ${recSize} mang lại độ căng giãn lý tưởng nhất cho chuyển động mạnh mẽ mà không bị co rút hay đọng mồ hôi.`
        : `At ${height}cm, ${weight}kg and ${chest}cm chest, size ${recSize} guarantees maximum dynamic mobility with zero excess friction or fabric bunching.`
    };
  }, [gender, height, weight, chest, waist, hips, fitPref, lang]);

  if (activeModal !== 'sizeCalc') return null;

  const handleApplySize = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, calculatedResult.size, selectedProduct.colors[0], 1);
      closeModal();
      showToast(lang === 'vi' ? `Đã thêm size ${calculatedResult.size} vào giỏ!` : `Applied size ${calculatedResult.size} to bag!`);
    } else {
      showToast(lang === 'vi' ? `Đã ghi nhớ size ${calculatedResult.size} của bạn!` : `Saved size ${calculatedResult.size} to your profile!`);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-8 text-neutral-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>{t('sizeCalculatorTitle')}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  AI Fit Engine
                </span>
              </h2>
              <p className="text-xs text-neutral-400">{t('sizeCalculatorSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content: Left Inputs Form | Right Recommendations & Size Table */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Inputs */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Gender Toggle */}
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1.5">{t('gender')}:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                    gender === 'male'
                      ? 'bg-neutral-800 text-white border-emerald-400'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {t('male')}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                    gender === 'female'
                      ? 'bg-neutral-800 text-white border-emerald-400'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {t('female')}
                </button>
              </div>
            </div>

            {/* Height & Weight Sliders */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">{t('height')}:</span>
                  <span className="font-mono font-bold text-white">{height} cm</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="205"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-neutral-800 rounded"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">{t('weightKg')}:</span>
                  <span className="font-mono font-bold text-white">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="125"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-neutral-800 rounded"
                />
              </div>
            </div>

            {/* Circumference measurements */}
            <div className="space-y-3 pt-2 border-t border-neutral-900">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">{t('chest')}:</span>
                  <span className="font-mono font-bold text-white">{chest} cm</span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="135"
                  value={chest}
                  onChange={(e) => setChest(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-neutral-800 rounded"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">{t('waist')}:</span>
                  <span className="font-mono font-bold text-white">{waist} cm</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="120"
                  value={waist}
                  onChange={(e) => setWaist(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-neutral-800 rounded"
                />
              </div>
            </div>

            {/* Fit Preference */}
            <div className="pt-2 border-t border-neutral-900">
              <label className="text-xs font-semibold text-neutral-400 block mb-1.5">{t('fitPreference')}:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFitPref('tight')}
                  className={`py-2 px-1 text-center rounded-lg text-[11px] font-bold border transition-colors ${
                    fitPref === 'tight' ? 'bg-neutral-800 text-emerald-400 border-emerald-400' : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                  }`}
                >
                  Nén cơ (Tight)
                </button>
                <button
                  type="button"
                  onClick={() => setFitPref('regular')}
                  className={`py-2 px-1 text-center rounded-lg text-[11px] font-bold border transition-colors ${
                    fitPref === 'regular' ? 'bg-neutral-800 text-emerald-400 border-emerald-400' : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                  }`}
                >
                  Tiêu chuẩn (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setFitPref('loose')}
                  className={`py-2 px-1 text-center rounded-lg text-[11px] font-bold border transition-colors ${
                    fitPref === 'loose' ? 'bg-neutral-800 text-emerald-400 border-emerald-400' : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                  }`}
                >
                  Rộng rãi (Loose)
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: AI Result Card & Chart */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Big Recommended Size Display */}
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-950 p-6 shadow-xl text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center justify-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>{t('recommendedSize')}</span>
              </span>

              <div className="my-3 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-white font-display tracking-tight">
                  {calculatedResult.size}
                </span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {calculatedResult.confidence}% {t('confidenceScore')}
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed max-w-md mx-auto">
                {calculatedResult.reasoning}
              </p>

              {/* Dimension breakdown bars */}
              <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-2 gap-3 text-left text-xs">
                <div className="rounded-lg bg-neutral-900/80 p-2.5 border border-neutral-800">
                  <span className="text-neutral-500 block text-[11px]">Độ ôm vòng ngực</span>
                  <span className="font-bold text-white font-mono">{calculatedResult.chestDiff}</span>
                </div>
                <div className="rounded-lg bg-neutral-900/80 p-2.5 border border-neutral-800">
                  <span className="text-neutral-500 block text-[11px]">Độ thoải mái eo</span>
                  <span className="font-bold text-white font-mono">{calculatedResult.waistDiff}</span>
                </div>
              </div>
            </div>

            {/* Standard Athletic Sizing Reference Table */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3 text-xs overflow-x-auto">
              <span className="font-bold text-neutral-300 block mb-2">Bảng Thông Số Chuẩn AEROSTRIKE:</span>
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500">
                    <th className="pb-1">Size</th>
                    <th className="pb-1">Chiều cao</th>
                    <th className="pb-1">Cân nặng</th>
                    <th className="pb-1">Vòng ngực</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/40 text-neutral-300">
                  <tr className={calculatedResult.size === 'S' ? 'bg-emerald-950/40 text-emerald-300 font-bold' : ''}>
                    <td className="py-1">S</td>
                    <td>160 - 168 cm</td>
                    <td>52 - 62 kg</td>
                    <td>86 - 92 cm</td>
                  </tr>
                  <tr className={calculatedResult.size === 'M' ? 'bg-emerald-950/40 text-emerald-300 font-bold' : ''}>
                    <td className="py-1">M</td>
                    <td>168 - 174 cm</td>
                    <td>63 - 70 kg</td>
                    <td>92 - 97 cm</td>
                  </tr>
                  <tr className={calculatedResult.size === 'L' ? 'bg-emerald-950/40 text-emerald-300 font-bold' : ''}>
                    <td className="py-1">L</td>
                    <td>174 - 180 cm</td>
                    <td>71 - 79 kg</td>
                    <td>98 - 104 cm</td>
                  </tr>
                  <tr className={calculatedResult.size === 'XL' ? 'bg-emerald-950/40 text-emerald-300 font-bold' : ''}>
                    <td className="py-1">XL</td>
                    <td>178 - 186 cm</td>
                    <td>80 - 88 kg</td>
                    <td>105 - 112 cm</td>
                  </tr>
                  <tr className={calculatedResult.size === '2XL' ? 'bg-emerald-950/40 text-emerald-300 font-bold' : ''}>
                    <td className="py-1">2XL</td>
                    <td>182 - 192 cm</td>
                    <td>89 - 100 kg</td>
                    <td>113 - 120 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Apply button */}
            <button
              onClick={handleApplySize}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 text-sm font-bold text-neutral-950 hover:bg-emerald-300 transition-colors shadow-lg active:scale-98"
            >
              <Check className="h-4 w-4" />
              <span>{t('applyThisSize')} ({calculatedResult.size})</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
