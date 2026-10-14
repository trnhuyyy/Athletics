import React, { useState } from 'react';
import { Camera, Check, Plus, Scale, Star, Eye, Share2 } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    lang, 
    t, 
    formatPrice, 
    addToCart, 
    openModal, 
    toggleCompare, 
    isInCompare 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const compared = isInCompare(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
  };

  const handleOpenDetail = () => {
    openModal('productDetail', product);
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOpenDetail}
    >
      {/* Visual Product Canvas: 65-75% height */}
      <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-neutral-950/80">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name[lang]}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-900 p-6 text-center text-neutral-500">
            <span className="font-display text-sm font-bold text-neutral-400">{product.name[lang]}</span>
            <span className="text-xs">{product.specs.material}</span>
          </div>
        )}

        {/* Top Badges: Quiet text, no pill sandwiches */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.isBestSeller && (
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400 bg-neutral-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[11px] font-bold tracking-wider uppercase text-cyan-400 bg-neutral-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
              New Arrival
            </span>
          )}

          {/* Compare toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`pointer-events-auto ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
              compared
                ? 'bg-amber-400 text-neutral-950'
                : 'bg-neutral-950/70 text-neutral-300 hover:text-white backdrop-blur-sm'
            }`}
            title={compared ? t('removeCompare') : t('addToCompare')}
          >
            <Scale className="h-3 w-3" />
            <span className="hidden sm:inline">{compared ? t('removeCompare') : t('addToCompare')}</span>
          </button>
        </div>

        {/* Floating Quick Action Overlay on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('tryon', product);
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-neutral-950/90 py-2 px-2.5 text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-neutral-900 backdrop-blur-sm transition-colors whitespace-nowrap"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>AR Try-On</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetail();
            }}
            className="flex items-center justify-center rounded-lg bg-neutral-950/90 p-2 text-neutral-300 hover:text-white border border-neutral-700 backdrop-blur-sm transition-colors"
            title={t('viewDetails')}
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetail();
            }}
            className="flex items-center justify-center rounded-lg bg-neutral-950/90 p-2 text-neutral-300 hover:text-amber-400 border border-neutral-700 backdrop-blur-sm transition-colors"
            title={t('shareProduct')}
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Unboxed Metadata with Typographic Separators */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider">
          <span>{product.category}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{product.sport}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="flex items-center gap-0.5 text-amber-400">
            <Star className="h-3 w-3 fill-amber-400" />
            <span className="tabular-nums font-mono">{product.rating}</span>
          </span>
        </div>

        {/* Product Title */}
        <h3 className="mt-1.5 text-sm font-semibold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
          {product.name[lang]}
        </h3>

        {/* Tech highlight */}
        <p className="mt-1 text-xs text-neutral-400 line-clamp-1 font-mono">
          {product.specs.technology[0]} · {product.specs.stretchFactor}
        </p>

        {/* Price & Size Selector Footer */}
        <div className="mt-auto pt-4 border-t border-neutral-800/60 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white tabular-nums font-mono">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-500 line-through tabular-nums font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-400">
              {product.inStock > 0 ? `${product.inStock} ${t('inStock')}` : t('outOfStock')}
            </span>
          </div>

          {/* Interactive quick size selector & Add button */}
          <div className="flex items-center justify-between gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-6 min-w-6 rounded px-1.5 text-[11px] font-semibold transition-colors shrink-0 ${
                    selectedSize === size
                      ? 'bg-white text-neutral-950'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={product.inStock <= 0}
              className="flex items-center gap-1 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-neutral-950 transition-colors hover:bg-amber-300 active:scale-95 disabled:opacity-50 whitespace-nowrap shrink-0"
              title={t('addToCart')}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{t('quickAdd')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
