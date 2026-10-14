import React, { useState, useMemo } from 'react';
import { Search, Filter, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category, SportDiscipline } from '../types';
import { ProductCard } from './ProductCard';

export const ProductCatalog: React.FC = () => {
  const { lang, t, products, openModal } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<SportDiscipline>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  // Categories list
  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: t('allCategories') },
    { id: 'tops', label: t('tops') },
    { id: 'bottoms', label: t('bottoms') },
    { id: 'footwear', label: t('footwear') },
    { id: 'accessories', label: t('accessories') }
  ];

  // Disciplines list
  const disciplines: { id: SportDiscipline; label: string }[] = [
    { id: 'all', label: t('allSports') },
    { id: 'running', label: t('running') },
    { id: 'gym_training', label: t('gym_training') },
    { id: 'outdoor', label: t('outdoor') }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Discipline check
      if (selectedDiscipline !== 'all' && p.sport !== selectedDiscipline) return false;
      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = p.name.vi.toLowerCase().includes(q) || p.name.en.toLowerCase().includes(q);
        const descMatch = p.description.vi.toLowerCase().includes(q) || p.description.en.toLowerCase().includes(q);
        const techMatch = p.specs.technology.some(t => t.toLowerCase().includes(q));
        if (!nameMatch && !descMatch && !techMatch) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, selectedCategory, selectedDiscipline, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedDiscipline !== 'all' || searchQuery.trim() !== '';

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDiscipline('all');
    setSearchQuery('');
  };

  return (
    <section id="catalog-section" className="py-12 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 border-b border-neutral-900">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              AEROSTRIKE Catalog
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
              {t('navCatalog')}
            </h2>
          </div>

          {/* Quick AI Advisor banner shortcut */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal('outfit')}
              className="flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Gợi ý theo mục tiêu tập luyện</span>
            </button>
            <button
              onClick={() => openModal('sizeCalc')}
              className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t('smartSizeHelper')}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar Controls */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Interactive segmented controls for Category */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-neutral-950 font-bold shadow'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-500 hidden sm:inline">{t('sortBy')}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="price_asc">{t('sortPriceAsc')}</option>
              <option value="price_desc">{t('sortPriceDesc')}</option>
              <option value="rating">{t('sortRating')}</option>
            </select>
          </div>
        </div>

        {/* Secondary Sport Discipline Filter Strip */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
          <span className="text-neutral-500 font-medium shrink-0">{t('filterByDiscipline')}:</span>
          {disciplines.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiscipline(d.id)}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedDiscipline === d.id
                  ? 'border border-amber-400/50 bg-amber-400/10 text-amber-300'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-rose-400 hover:underline shrink-0"
            >
              {t('clearFilters')}
            </button>
          )}
        </div>

        {/* Product Count Metric */}
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <span>{filteredProducts.length} {t('productsFound')}</span>
        </div>

        {/* 3-Column Desktop / 2-Column Mobile Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 p-12 text-center">
            <p className="text-base font-semibold text-white">Không tìm thấy sản phẩm phù hợp</p>
            <p className="mt-1 text-xs text-neutral-400">Hãy thử đổi từ khóa tìm kiếm hoặc bỏ chọn các bộ lọc phân loại.</p>
            <button
              onClick={clearFilters}
              className="mt-4 rounded-lg bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-700"
            >
              {t('clearFilters')}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
