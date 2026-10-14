import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SmartCartDrawer: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    openModal, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    subtotal, 
    discount, 
    shippingFee, 
    total, 
    activeVoucher, 
    applyVoucher, 
    removeVoucher, 
    formatPrice, 
    lang, 
    t 
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (activeModal !== 'cart') return null;

  const freeShippingThreshold = 599000;
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);
  const freeShipPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyVoucher(promoInput);
      setPromoInput('');
    }
  };

  const handleProceedCheckout = () => {
    closeModal();
    openModal('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs transition-opacity">
      <div 
        className="relative flex h-full w-full max-w-md flex-col bg-neutral-950 border-l border-neutral-800 text-neutral-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              {t('cartTitle')} ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="border-b border-neutral-900 bg-neutral-900/50 p-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Truck className="h-3.5 w-3.5 text-amber-400" />
              {remainingForFreeShip > 0 ? (
                <span>Mua thêm <strong className="text-amber-400 font-mono">{formatPrice(remainingForFreeShip)}</strong> để FREESHIP</span>
              ) : (
                <span className="text-emerald-400">Đơn hàng của bạn đã đủ điều kiện MIỄN PHÍ VẬN CHUYỂN!</span>
              )}
            </span>
            <span className="font-mono text-neutral-400">{freeShipPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
            <div 
              className="h-full bg-amber-400 transition-all duration-300 rounded-full"
              style={{ width: `${freeShipPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-6 text-neutral-500">
              <ShoppingBag className="h-12 w-12 text-neutral-700 stroke-1 mb-3" />
              <p className="text-sm font-semibold text-neutral-300">{t('cartEmpty')}</p>
              <button
                onClick={closeModal}
                className="mt-4 rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id}
                className="flex gap-3 rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-3 transition-colors hover:border-neutral-700"
              >
                {/* Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name[lang]}
                  className="h-20 w-20 shrink-0 rounded-lg object-cover bg-neutral-950"
                />

                {/* Info & Quantity */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name[lang]}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Size & Color Swatch */}
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300 font-bold">
                      {item.size}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full border border-neutral-600" style={{ backgroundColor: item.color.hex }} />
                      <span>{item.color.name}</span>
                    </span>
                  </div>

                  {/* Stepper & Price Row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-0.5 text-neutral-400 hover:text-white"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-0.5 text-neutral-400 hover:text-white"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-xs font-mono font-bold text-white tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-800 bg-neutral-950 p-5 space-y-4">
            
            {/* Promo Code Form */}
            {activeVoucher ? (
              <div className="flex items-center justify-between rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2 text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Mã {activeVoucher.code}: -{formatPrice(activeVoucher.discountAmount)}</span>
                </span>
                <button
                  onClick={removeVoucher}
                  className="text-[11px] text-neutral-400 hover:text-rose-400 underline"
                >
                  {t('removeVoucher')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Mã ưu đãi (VD: AERO50K)"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-neutral-800 px-3 py-2 text-xs font-bold text-white hover:bg-neutral-700 transition-colors"
                >
                  {t('apply')}
                </button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>{t('subtotal')}:</span>
                <span className="font-mono text-white tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-amber-400 font-semibold">
                  <span>{t('discount')}:</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t('shipping')}:</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-400 font-bold">{t('free')}</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2 text-sm font-bold text-white">
                <span>{t('total')}:</span>
                <span className="text-base font-black text-amber-400 font-mono tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedCheckout}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-black text-neutral-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/10 active:scale-98"
            >
              <span>{t('checkout')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
