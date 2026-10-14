import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  ShoppingBag, 
  Check, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRESET_OUTFITS } from '../data/mockData';
import { SportDiscipline } from '../types';

export const AIOutfitCoordinator: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    addToCart, 
    formatPrice, 
    lang, 
    t, 
    showToast 
  } = useStore();

  const [selectedOutfit, setSelectedOutfit] = useState(PRESET_OUTFITS[0]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<SportDiscipline>('running');

  if (activeModal !== 'outfit') return null;

  // Calculate kit pricing
  const topPrice = selectedOutfit.items.top.price;
  const bottomPrice = selectedOutfit.items.bottom.price;
  const footwearPrice = selectedOutfit.items.footwear ? selectedOutfit.items.footwear.price : 0;
  const accessoryPrice = selectedOutfit.items.accessory ? selectedOutfit.items.accessory.price : 0;
  
  const rawTotal = topPrice + bottomPrice + footwearPrice + accessoryPrice;
  const discountAmount = Math.round(rawTotal * (selectedOutfit.bundleDiscountPercent / 100));
  const finalBundlePrice = rawTotal - discountAmount;

  const handleBuyWholeSet = () => {
    // Add top
    addToCart(selectedOutfit.items.top, 'L', selectedOutfit.items.top.colors[0], 1);
    // Add bottom
    addToCart(selectedOutfit.items.bottom, 'M', selectedOutfit.items.bottom.colors[0], 1);
    // Add footwear or accessory
    if (selectedOutfit.items.footwear) {
      addToCart(selectedOutfit.items.footwear, '42', selectedOutfit.items.footwear.colors[0], 1);
    }
    if (selectedOutfit.items.accessory) {
      addToCart(selectedOutfit.items.accessory, '1000ml', selectedOutfit.items.accessory.colors[0], 1);
    }

    closeModal();
    showToast(
      lang === 'vi' 
        ? `Đã thêm trọn bộ ${selectedOutfit.title.vi} vào giỏ hàng (tiết kiệm ${formatPrice(discountAmount)})!`
        : `Added full outfit to bag with 15% bundle discount!`
    );
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>{t('aiOutfitTitle')}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  AI Stylist 4.0
                </span>
              </h2>
              <p className="text-xs text-neutral-400">{t('aiOutfitSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Goal Selector Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {PRESET_OUTFITS.map((outfit) => (
            <button
              key={outfit.id}
              onClick={() => setSelectedOutfit(outfit)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                selectedOutfit.id === outfit.id
                  ? 'bg-amber-400 text-neutral-950 font-black shadow-lg shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{outfit.title[lang]}</span>
            </button>
          ))}
        </div>

        {/* Coordinated Outfit Preview Stage */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: 3-piece Card Grid */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>Các món trong set đồ:</span>
              <span className="text-amber-400 font-bold">Giảm 15% nguyên combo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Item 1: Top */}
              <div className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                <span className="text-[10px] font-mono uppercase text-neutral-500 mb-1">Áo Thể Thao</span>
                <img
                  src={selectedOutfit.items.top.image}
                  alt={selectedOutfit.items.top.name[lang]}
                  className="aspect-square w-full rounded-lg object-cover mb-2"
                />
                <h4 className="text-xs font-bold text-white line-clamp-1">{selectedOutfit.items.top.name[lang]}</h4>
                <p className="mt-auto pt-2 text-xs font-mono font-bold text-amber-400">{formatPrice(selectedOutfit.items.top.price)}</p>
              </div>

              {/* Item 2: Bottom */}
              <div className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                <span className="text-[10px] font-mono uppercase text-neutral-500 mb-1">Quần Thể Thao</span>
                <img
                  src={selectedOutfit.items.bottom.image}
                  alt={selectedOutfit.items.bottom.name[lang]}
                  className="aspect-square w-full rounded-lg object-cover mb-2"
                />
                <h4 className="text-xs font-bold text-white line-clamp-1">{selectedOutfit.items.bottom.name[lang]}</h4>
                <p className="mt-auto pt-2 text-xs font-mono font-bold text-amber-400">{formatPrice(selectedOutfit.items.bottom.price)}</p>
              </div>

              {/* Item 3: Footwear or Accessory */}
              <div className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                <span className="text-[10px] font-mono uppercase text-neutral-500 mb-1">
                  {selectedOutfit.items.footwear ? 'Giày Thi Đấu' : 'Phụ Kiện'}
                </span>
                <img
                  src={selectedOutfit.items.footwear ? selectedOutfit.items.footwear.image : selectedOutfit.items.accessory?.image}
                  alt="Extra item"
                  className="aspect-square w-full rounded-lg object-cover mb-2"
                />
                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {selectedOutfit.items.footwear ? selectedOutfit.items.footwear.name[lang] : selectedOutfit.items.accessory?.name[lang]}
                </h4>
                <p className="mt-auto pt-2 text-xs font-mono font-bold text-amber-400">
                  {formatPrice(selectedOutfit.items.footwear ? selectedOutfit.items.footwear.price : selectedOutfit.items.accessory?.price || 0)}
                </p>
              </div>

            </div>

            {/* Performance Synergy Insight */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-xs text-neutral-300 leading-relaxed">
              <span className="font-bold text-white block mb-1 flex items-center gap-1.5 text-amber-400">
                <Sparkles className="h-4 w-4" />
                <span>Phân tích hiệu năng phối đồ từ AI:</span>
              </span>
              <p>{selectedOutfit.description[lang]}</p>
            </div>
          </div>

          {/* Right: Bundle Pricing Breakdown & 1-Click Buy */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Báo giá Combo Ưu Đãi
              </span>
              <h3 className="mt-1 text-lg font-bold text-white font-display">
                {selectedOutfit.title[lang]}
              </h3>

              <div className="mt-4 space-y-2 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Giá gốc từng món:</span>
                  <span className="line-through font-mono">{formatPrice(rawTotal)}</span>
                </div>
                <div className="flex justify-between text-amber-400 font-semibold">
                  <span>Ưu đãi Combo trọn bộ (-15%):</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Vận chuyển hoả tốc:</span>
                  <span>Miễn phí</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800 flex items-baseline justify-between">
                <span className="text-sm font-semibold text-white">{t('totalSetPrice')}:</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {formatPrice(finalBundlePrice)}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2">
              <button
                onClick={handleBuyWholeSet}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-black text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 active:scale-98"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{t('buyCompleteSet')}</span>
              </button>
              <p className="text-[11px] text-neutral-500 text-center">
                Được đổi size từng món riêng biệt nếu không vừa vặn.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
