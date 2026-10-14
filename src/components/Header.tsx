import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Camera, 
  Scale, 
  Truck, 
  Award, 
  Store, 
  Layers, 
  Search,
  Globe,
  SlidersHorizontal,
  Menu,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    lang, 
    setLang, 
    t, 
    cartCount, 
    openModal, 
    compareList, 
    viewMode, 
    setViewMode, 
    user 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="border-b border-neutral-900 bg-neutral-900/40 px-4 py-1.5 text-center text-xs font-medium text-neutral-400">
        <span>{t('freeShippingNotice')}</span>
        <span className="mx-2 text-neutral-600">·</span>
        <span className="text-amber-400">{t('fastDeliveryBadge')}</span>
      </div>

      {/* Main Top Bar Contract: 3 Zones separated by gap-8 */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => { setViewMode('store'); }}
            className="group flex items-center gap-2 text-left text-xl font-extrabold tracking-tighter text-white transition-opacity hover:opacity-90"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-black text-neutral-950">
              A
            </span>
            <span className="font-display tracking-tight text-white">
              AERO<span className="text-amber-400">STRIKE</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => { setViewMode('store'); }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${viewMode === 'store' ? 'text-amber-400 font-semibold' : ''}`}
          >
            {t('navCatalog')}
          </button>
          
          <button
            onClick={() => openModal('outfit')}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-amber-400"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>{t('navOutfit')}</span>
          </button>

          <button
            onClick={() => openModal('tryon')}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400"
          >
            <Camera className="h-4 w-4 text-cyan-400" />
            <span>{t('navTryOn')}</span>
          </button>

          <button
            onClick={() => openModal('sizeCalc')}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400"
          >
            <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
            <span>{t('navSizeGuide')}</span>
          </button>

          <button
            onClick={() => openModal('tracking')}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white"
          >
            <Truck className="h-4 w-4" />
            <span>{t('navTracking')}</span>
          </button>

          {compareList.length > 0 && (
            <button
              onClick={() => openModal('compare')}
              className="flex items-center gap-1.5 text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              <Scale className="h-4 w-4" />
              <span>{t('navCompare')} ({compareList.length})</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* VIP Loyalty Points Pill-less button */}
          <button
            onClick={() => openModal('loyalty')}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:border-amber-400/40 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>{user.points} {t('points')}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/40 px-2.5 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0"
            title="Đổi ngôn ngữ / Change language"
          >
            <Globe className="h-3.5 w-3.5 text-neutral-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Mode Switcher: Merchant Portal vs Store */}
          <button
            onClick={() => setViewMode(viewMode === 'store' ? 'admin' : 'store')}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              viewMode === 'admin'
                ? 'bg-amber-400 text-neutral-950 font-bold'
                : 'border border-neutral-800 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Store className="h-3.5 w-3.5" />
            <span>{viewMode === 'store' ? t('navAdmin') : t('navStore')}</span>
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => openModal('cart')}
            className="relative flex items-center justify-center rounded-lg bg-neutral-900 p-2 text-white border border-neutral-800 hover:border-neutral-700 transition-colors whitespace-nowrap shrink-0"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-neutral-950">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden rounded-lg p-2 text-neutral-300 hover:bg-neutral-900"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-800">
            <button
              onClick={() => { setViewMode('store'); setMobileMenuOpen(false); }}
              className="rounded-lg bg-neutral-900 p-2.5 text-left text-xs font-semibold text-white"
            >
              {t('navCatalog')}
            </button>
            <button
              onClick={() => { setViewMode(viewMode === 'store' ? 'admin' : 'store'); setMobileMenuOpen(false); }}
              className="rounded-lg bg-neutral-900 p-2.5 text-left text-xs font-semibold text-amber-400"
            >
              {viewMode === 'store' ? t('navAdmin') : t('navStore')}
            </button>
          </div>
          <div className="flex flex-col gap-2 text-sm text-neutral-300">
            <button
              onClick={() => { openModal('outfit'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-left"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>{t('navOutfit')}</span>
            </button>
            <button
              onClick={() => { openModal('tryon'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-left"
            >
              <Camera className="h-4 w-4 text-cyan-400" />
              <span>{t('navTryOn')}</span>
            </button>
            <button
              onClick={() => { openModal('sizeCalc'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-left"
            >
              <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
              <span>{t('navSizeGuide')}</span>
            </button>
            <button
              onClick={() => { openModal('tracking'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-left"
            >
              <Truck className="h-4 w-4" />
              <span>{t('navTracking')}</span>
            </button>
            <button
              onClick={() => { openModal('loyalty'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-left"
            >
              <Award className="h-4 w-4 text-amber-400" />
              <span>{t('navLoyalty')} ({user.points} pts)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
