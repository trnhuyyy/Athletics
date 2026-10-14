import React from 'react';
import { X, Scale, Trash2, ShoppingBag, Star, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductComparisonModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    compareList, 
    toggleCompare, 
    clearCompare, 
    formatPrice, 
    addToCart, 
    lang, 
    t 
  } = useStore();

  if (activeModal !== 'compare') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-8 text-neutral-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                {t('comparisonTitle')}
              </h2>
              <p className="text-xs text-neutral-400">
                Đối chiếu chi tiết công nghệ vải, trọng lượng và độ co giãn giữa các dòng sản phẩm.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 py-1.5 px-2.5 rounded-lg border border-neutral-800 bg-neutral-900"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t('clearCompareList')}</span>
              </button>
            )}
            <button
              onClick={closeModal}
              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        {compareList.length === 0 ? (
          <div className="py-16 text-center text-neutral-400">
            <p className="text-sm">{t('comparisonEmpty')}</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="p-3 font-semibold text-neutral-500 w-36 uppercase tracking-wider">{t('feature')}</th>
                  {compareList.map((prod) => (
                    <th key={prod.id} className="p-3 w-56 min-w-50 align-top">
                      <div className="relative flex flex-col gap-2">
                        <button
                          onClick={() => toggleCompare(prod)}
                          className="absolute top-1 right-1 z-10 rounded-full bg-neutral-900/90 p-1 text-neutral-400 hover:text-rose-400"
                          title={t('removeCompare')}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        <img
                          src={prod.image}
                          alt={prod.name[lang]}
                          className="h-36 w-full rounded-xl object-cover border border-neutral-800"
                        />
                        <h4 className="font-bold text-white text-sm line-clamp-1">{prod.name[lang]}</h4>
                        <span className="text-amber-400 font-bold font-mono text-sm">{formatPrice(prod.price)}</span>
                        <button
                          onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                          className="flex items-center justify-center gap-1 rounded-lg bg-white py-1.5 text-neutral-950 font-bold hover:bg-neutral-200 transition-colors"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>{t('quickAdd')}</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                <tr>
                  <td className="p-3 font-medium text-neutral-500">{t('ratingCol')}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 font-mono">
                      <span className="text-amber-400 font-bold">★ {p.rating}</span> ({p.reviewsCount})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-neutral-500">{t('materialCol')}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3">{p.specs.material}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-neutral-500">{t('breathabilityCol')}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 font-mono font-bold text-amber-400">
                      {p.specs.breathabilityScore} / 10
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-neutral-500">{t('stretchCol')}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 font-medium">{p.specs.stretchFactor}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-neutral-500">{t('weightCol')}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 font-mono">{p.specs.weightGrams}g</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-neutral-500">{t('techCol')}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {p.specs.technology.map((tech) => (
                          <span key={tech} className="rounded bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
