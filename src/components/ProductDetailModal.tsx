import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  Camera, 
  SlidersHorizontal, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ShoppingBag,
  Scale,
  Plus,
  Minus,
  Share2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductColor, Review } from '../types';
import { SocialShareComponent } from './SocialShareComponent';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedProduct, 
    lang, 
    t, 
    formatPrice, 
    addToCart, 
    openModal, 
    toggleCompare, 
    isInCompare,
    showToast
  } = useStore();

  if (activeModal !== 'productDetail' || !selectedProduct) return null;

  const product = selectedProduct;
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const [activeImage, setActiveImage] = useState(product.image);
  const [showShare, setShowShare] = useState(true);

  // New review form states
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewHeight, setNewReviewHeight] = useState('1m75');
  const [newReviewWeight, setNewReviewWeight] = useState('70kg');

  const compared = isInCompare(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    closeModal();
    openModal('checkout');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Vừa xong',
      comment: newReviewComment.trim(),
      userStats: {
        height: newReviewHeight,
        weight: newReviewWeight,
        purchasedSize: selectedSize,
        fitFeedback: 'true_to_size'
      },
      verifiedPurchase: true
    };

    product.reviews.unshift(newRev);
    product.reviewsCount += 1;
    setNewReviewAuthor('');
    setNewReviewComment('');
    showToast(lang === 'vi' ? 'Cảm ơn bạn đã gửi đánh giá!' : 'Thank you for your review!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-neutral-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 2-Column Contiguous Purchase PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              <img
                src={activeImage}
                alt={product.name[lang]}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />

              {/* Quick AR try-on badge */}
              <button
                onClick={() => {
                  closeModal();
                  openModal('tryon', product);
                }}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-neutral-950/90 px-3 py-1.5 text-xs font-bold text-cyan-400 border border-cyan-500/30 backdrop-blur-md hover:bg-neutral-900 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <span>AR Try-On Live</span>
              </button>
            </div>

            {/* Thumbnail selector */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                      activeImage === img ? 'border-amber-400' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-900 text-center text-xs text-neutral-400">
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-neutral-900/40">
                <Truck className="h-4 w-4 text-amber-400" />
                <span>Giao hỏa tốc 2h</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-neutral-900/40">
                <RotateCcw className="h-4 w-4 text-cyan-400" />
                <span>Đổi cỡ 30 ngày</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-neutral-900/40">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Chính hãng 100%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* Category & Sport breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">{product.sport}</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400 font-mono">SKU: {product.id}</span>
            </div>

            {/* Title */}
            <h1 className="mt-2 text-xl sm:text-2xl font-bold text-white font-display">
              {product.name[lang]}
            </h1>

            {/* Rating & Reviews */}
            <div className="mt-2 flex items-center gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <span className="font-bold tabular-nums font-mono">{product.rating}</span>
              </div>
              <span>·</span>
              <span>{product.reviewsCount} {t('reviewsCount')}</span>
              <span>·</span>
              <span className="text-emerald-400 font-medium">
                {product.inStock > 0 ? `${product.inStock} ${t('inStock')}` : t('outOfStock')}
              </span>
            </div>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-white tabular-nums font-mono">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through tabular-nums font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {product.description[lang]}
            </p>

            {/* Color Swatches */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">{t('selectColor')}:</span>
                <span className="text-neutral-400">{selectedColor.name}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-7 w-7 rounded-full border-2 transition-transform ${
                      selectedColor.name === c.name
                        ? 'scale-110 border-white ring-2 ring-amber-400'
                        : 'border-neutral-700 hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector + Size Calculator Link */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">{t('selectSize')}:</span>
                <button
                  onClick={() => openModal('sizeCalc', product)}
                  className="flex items-center gap-1 text-amber-400 hover:underline font-medium"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>{t('smartSizeHelper')}</span>
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-9 min-w-10 rounded-lg px-3 text-xs font-bold transition-colors ${
                      selectedSize === s
                        ? 'bg-amber-400 text-neutral-950 font-black shadow-md'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold tabular-nums font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 hover:bg-amber-300 transition-colors active:scale-98"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{t('addToCart')}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors whitespace-nowrap"
              >
                <span>{t('buyNow')}</span>
              </button>
            </div>

            {/* Compare, AR Try-on, and Share Quick Row */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleCompare(product)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Scale className="h-3.5 w-3.5" />
                  <span>{compared ? t('removeCompare') : t('addToCompare')}</span>
                </button>

                <button
                  onClick={() => {
                    closeModal();
                    openModal('tryon', product);
                  }}
                  className="flex items-center gap-1.5 text-cyan-400 hover:underline"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>{t('tryOnVirtualHelper')}</span>
                </button>
              </div>

              <button
                onClick={() => setShowShare(!showShare)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                  showShare
                    ? 'border-amber-400/40 bg-amber-400/10 text-amber-300 font-semibold'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700'
                }`}
                title={t('shareProduct')}
              >
                <Share2 className="h-3.5 w-3.5 text-amber-400" />
                <span>{t('shareProduct')}</span>
              </button>
            </div>

            {/* Social Sharing Component on Product Page */}
            {showShare && (
              <div className="mt-3.5">
                <SocialShareComponent product={product} />
              </div>
            )}

            {/* Spec & Reviews Tabs */}
            <div className="mt-6 border-t border-neutral-800 pt-4">
              <div className="flex items-center gap-4 border-b border-neutral-900 pb-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'specs' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {t('techSpecifications')}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'reviews' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {t('customerReviews')} ({product.reviews.length})
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className="mt-3 space-y-2 text-xs text-neutral-300">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">{t('material')}:</span>
                    <span className="font-medium text-right max-w-xs">{product.specs.material}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">{t('breathability')}:</span>
                    <span className="font-bold text-amber-400 font-mono">{product.specs.breathabilityScore}/10</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">{t('stretch')}:</span>
                    <span>{product.specs.stretchFactor}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">{t('weight')}:</span>
                    <span className="font-mono">{product.specs.weightGrams}g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">{t('techFeatures')}:</span>
                    <span>{product.specs.technology.join(', ')}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-3 space-y-4 max-h-60 overflow-y-auto pr-1">
                  {/* Reviews List */}
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="rounded-lg bg-neutral-900/60 p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{rev.author}</span>
                        <span className="text-neutral-500">{rev.date}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400" />
                        ))}
                      </div>
                      {rev.userStats && (
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                          <span>Cao {rev.userStats.height}</span>
                          <span>·</span>
                          <span>Nặng {rev.userStats.weight}</span>
                          <span>·</span>
                          <span className="text-emerald-400">Size {rev.userStats.purchasedSize} (Chuẩn form)</span>
                        </div>
                      )}
                      <p className="mt-2 text-neutral-300">{rev.comment}</p>
                    </div>
                  ))}

                  {/* Add review form */}
                  <form onSubmit={handleSubmitReview} className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-3 space-y-2">
                    <p className="font-bold text-xs text-white">{t('writeReview')}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Họ tên của bạn"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="rounded bg-neutral-900 border border-neutral-800 px-2 py-1 text-xs text-white focus:outline-none"
                        required
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-neutral-400">Số sao:</span>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="rounded bg-neutral-900 border border-neutral-800 px-2 py-1 text-xs text-white"
                        >
                          <option value={5}>5 ★★★★★</option>
                          <option value={4}>4 ★★★★</option>
                          <option value={3}>3 ★★★</option>
                        </select>
                      </div>
                    </div>
                    <textarea
                      placeholder="Chia sẻ trải nghiệm độ co giãn, form dáng của bạn..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows={2}
                      className="w-full rounded bg-neutral-900 border border-neutral-800 p-2 text-xs text-white focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="rounded bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700"
                    >
                      Gửi đánh giá
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
