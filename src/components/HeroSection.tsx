import React from 'react';
import { Sparkles, Camera, ShieldCheck, Zap, RotateCcw, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE } from '../data/mockData';

export const HeroSection: React.FC = () => {
  const { t, openModal } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-900 bg-neutral-950 pt-8 pb-14 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 2-column split with items-stretch and balanced proportions */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Editorial Headline & High-intent CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed inline kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>Pro Performance 2026</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Air-Weave Technology</span>
            </div>

            {/* Headline with text-wrap balance to avoid orphans */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              {t('heroHeadline')}
            </h1>

            {/* Refined measure body prose */}
            <p className="max-w-xl text-base text-neutral-400 leading-relaxed sm:text-lg">
              {t('heroSubheadline')}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToCatalog}
                className="group flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-neutral-950 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-400/10 whitespace-nowrap shrink-0"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => openModal('tryon')}
                className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-cyan-400/50 hover:bg-neutral-800 whitespace-nowrap shrink-0"
              >
                <Camera className="h-4 w-4 text-cyan-400" />
                <span>{t('exploreTryOn')}</span>
              </button>

              <button
                onClick={() => openModal('outfit')}
                className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber-400/50 hover:bg-neutral-800 whitespace-nowrap shrink-0"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>{t('navOutfit')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-fidelity Sports Action Campaign Image */}
          <div className="lg:col-span-5">
            <div className="relative group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src={HERO_IMAGE}
                alt="AEROSTRIKE Athlete Training"
                referrerPolicy="no-referrer"
                className="aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                <span className="font-medium">Obsidian Shield Series</span>
                <span className="text-amber-400 font-mono">DWR Proof · 145g</span>
              </div>
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency Strip: 3 Concrete Value Props */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-neutral-900 pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-amber-400 border border-neutral-800">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t('fastDeliveryBadge')}</p>
              <p className="text-xs text-neutral-400">{t('freeShippingNotice')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-cyan-400 border border-neutral-800">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t('returnBadge')}</p>
              <p className="text-xs text-neutral-400">Đổi cỡ tận nhà miễn phí 100%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-emerald-400 border border-neutral-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t('genuineBadge')}</p>
              <p className="text-xs text-neutral-400">Bảo hành đường may & khóa kéo trọn đời</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
