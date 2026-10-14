import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  QrCode, 
  Wallet, 
  Truck, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Award,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    openModal, 
    cart, 
    subtotal, 
    discount, 
    shippingFee, 
    total, 
    formatPrice, 
    createOrder, 
    user, 
    lang, 
    t, 
    showToast 
  } = useStore();

  // Form states
  const [customerName, setCustomerName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vietqr');

  // Credit Card states
  const [cardNumber, setCardNumber] = useState('4532 8890 1234 5678');
  const [cardHolder, setCardHolder] = useState('NGUYEN HUY HOANG');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('889');

  // VietQR copy states
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Success state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeModal !== 'checkout') return null;

  const pointsEarned = Math.floor(total / 10000);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`${t('copied')} ${text}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      showToast('Vui lòng điền đầy đủ họ tên, điện thoại và địa chỉ giao hàng.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customerName,
        phone,
        address,
        items: [...cart],
        subtotal,
        discount,
        shippingFee,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'confirmed'
      });

      setIsProcessing(false);
      setPlacedOrder(order);
    }, 1200);
  };

  const handleGoToTracking = () => {
    closeModal();
    openModal('tracking');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-8 text-neutral-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                {placedOrder ? t('orderSuccessTitle') : t('checkoutTitle')}
              </h2>
              <p className="text-xs text-neutral-400">
                {placedOrder 
                  ? `Mã vận đơn: ${placedOrder.trackingNumber}` 
                  : 'Giao thức mã hóa SSL 256-bit an toàn bảo mật tuyệt đối.'}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Successful Placement View */}
        {placedOrder ? (
          <div className="py-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white font-display">
                {t('orderSuccessTitle')}
              </h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto">
                {t('orderSuccessDesc')}
              </p>
            </div>

            {/* Loyalty bonus announcement */}
            <div className="mx-auto max-w-md rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 flex items-center justify-center gap-3 text-amber-300 text-xs font-bold">
              <Award className="h-5 w-5 text-amber-400 shrink-0" />
              <span>{t('earnedPointsNotice').replace('{points}', placedOrder.earnedPoints.toString())}</span>
            </div>

            {/* Order Brief Summary */}
            <div className="mx-auto max-w-md rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-xs text-neutral-300 space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-neutral-500">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-white">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Mã vận đơn bưu tá:</span>
                <span className="font-mono font-bold text-amber-400">{placedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Phương thức:</span>
                <span className="uppercase font-semibold">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2 font-bold text-white">
                <span>Tổng tiền:</span>
                <span className="text-amber-400 font-mono text-sm">{formatPrice(placedOrder.total)}</span>
              </div>
            </div>

            {/* Action Button: Go to live shipment tracking */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleGoToTracking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-8 py-3.5 text-sm font-black text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                <Truck className="h-4 w-4" />
                <span>{t('trackMyOrder')}</span>
              </button>
              <button
                onClick={closeModal}
                className="w-full sm:w-auto rounded-xl border border-neutral-800 bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                {t('continueShopping')}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleConfirmOrder} className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Shipping Address & Payment Selection */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Shipping Address Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  1. {t('shippingInfo')}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">{t('fullName')} *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">{t('phoneNumber')} *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Giao hàng dự kiến</label>
                      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-3.5 py-2.5 text-xs text-amber-400 flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Hôm nay (Hỏa tốc 2 giờ)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">{t('deliveryAddress')} *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="pt-2 border-t border-neutral-900">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  2. {t('paymentMethodTitle')}
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* VietQR */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'vietqr'
                        ? 'border-amber-400 bg-amber-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <QrCode className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-bold text-white">VietQR / 247</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Quét mã app ngân hàng</span>
                  </button>

                  {/* MoMo / ZaloPay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-pink-500 bg-pink-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Wallet className="h-4 w-4 text-pink-400" />
                      <span className="text-xs font-bold text-white">MoMo / ZaloPay</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Ví điện tử 1 chạm</span>
                  </button>

                  {/* Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'credit_card'
                        ? 'border-cyan-400 bg-cyan-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs font-bold text-white">Thẻ Visa / Master</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Thẻ quốc tế & nội địa</span>
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-400 bg-emerald-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">COD Tiền mặt</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Thanh toán khi nhận</span>
                  </button>
                </div>

                {/* Sub-interface for Selected Payment Method */}
                <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                  {paymentMethod === 'vietqr' && (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Dynamic simulated VietQR code image */}
                      <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow-lg shrink-0">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=00020101021238540010A00000072701240006970407011299882200110208QRIBFTTA5303704540${total}5802VN62170813AERO89420`}
                          alt="VietQR code"
                          className="h-28 w-28 object-contain"
                        />
                        <span className="text-[9px] font-black text-blue-900 mt-1 uppercase tracking-tighter">
                          VietQR · Napas247
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-neutral-300 w-full">
                        <p className="text-[11px] text-neutral-400">{t('bankTransferInstructions')}</p>
                        <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                          <span className="text-neutral-500">{t('bankName')}:</span>
                          <span className="font-bold text-white">Techcombank (TCB)</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                          <span className="text-neutral-500">{t('accountNumber')}:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-amber-400">9988 2200 11</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('9988220011', 'acc')}
                              className="text-neutral-400 hover:text-white"
                            >
                              {copiedField === 'acc' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                          <span className="text-neutral-500">{t('transferContent')}:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-amber-400">AERO 89420</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('AERO 89420', 'content')}
                              className="text-neutral-400 hover:text-white"
                            >
                              {copiedField === 'content' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'credit_card' && (
                    <div className="space-y-3">
                      {/* Interactive Credit Card Mockup */}
                      <div className="relative aspect-16/9 max-w-xs mx-auto rounded-xl p-4 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 border border-neutral-700 shadow-xl text-white flex flex-col justify-between font-mono">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-sans font-black italic tracking-widest text-amber-400">AEROSTRIKE VIP</span>
                          <span className="text-[11px] font-bold text-neutral-300">VISA</span>
                        </div>
                        <div className="text-sm font-black tracking-widest my-2">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between text-[10px] text-neutral-300">
                          <div>
                            <span className="text-[8px] text-neutral-400 block">CARDHOLDER</span>
                            <span>{cardHolder || 'NAME'}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-neutral-400 block">EXPIRES</span>
                            <span>{cardExpiry || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card inputs */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="col-span-2">
                          <label className="text-[11px] text-neutral-400 block mb-1">{t('cardNumber')}</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">{t('cardExpiry')}</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">{t('cardCvc')}</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'momo' && (
                    <div className="text-center py-2 space-y-2">
                      <div className="flex justify-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded bg-pink-900/60 text-pink-300 font-bold text-xs border border-pink-700">MoMo QR</span>
                        <span className="px-2 py-1 rounded bg-blue-900/60 text-blue-300 font-bold text-xs border border-blue-700">ZaloPay</span>
                      </div>
                      <p className="text-xs text-neutral-300">
                        Hệ thống sẽ mở ứng dụng ví MoMo hoặc ZaloPay của bạn để quét mã xác thực sinh trắc học FaceID.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-xs text-neutral-300 space-y-1">
                      <p className="font-semibold text-emerald-400">Kiểm tra hàng trước khi thanh toán tiền mặt cho shipper.</p>
                      <p className="text-neutral-400">Miễn phí đổi size tại chỗ nếu không vừa vặn.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Order Items Summary & Confirm */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  {t('orderSummary')} ({cart.length} món)
                </h3>

                {/* Items preview list */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5 text-xs">
                      <img src={item.product.image} alt="cart item" className="h-10 w-10 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{item.product.name[lang]}</p>
                        <p className="text-neutral-500 font-mono text-[11px]">Size {item.size} · x{item.quantity}</p>
                      </div>
                      <span className="font-mono font-bold text-white tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-4 pt-4 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-400">
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
                    <span className="text-lg font-black text-amber-400 font-mono tabular-nums">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* SportPoints Earn Notice */}
                <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/20 p-2.5 flex items-center gap-2 text-amber-300 text-xs">
                  <Award className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Tích lũy ngay <strong>+{pointsEarned} SportPoints</strong> vào tài khoản VIP</span>
                </div>
              </div>

              {/* Confirm Button */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-black text-neutral-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 animate-spin" />
                      <span>Đang xử lý kết nối cổng thanh toán...</span>
                    </span>
                  ) : (
                    <span>{t('confirmPayment')} · {formatPrice(total)}</span>
                  )}
                </button>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};
