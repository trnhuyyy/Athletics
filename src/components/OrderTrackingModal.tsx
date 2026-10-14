import React from 'react';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Package, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderTrackingModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    orders, 
    currentTrackingOrder, 
    setCurrentTrackingOrder, 
    formatPrice, 
    lang, 
    t 
  } = useStore();

  if (activeModal !== 'tracking') return null;

  const order = currentTrackingOrder || orders[0];

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
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>{t('orderTrackingTitle')}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Radar Live 24/7
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                {t('carrier')}: <strong className="text-white">{order ? order.carrier : 'AEROSTRIKE Express'}</strong> · Mã vận đơn: <span className="text-amber-400 font-mono font-bold">{order?.trackingNumber}</span>
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

        {!order ? (
          <div className="py-16 text-center text-neutral-400">
            <p className="text-sm">Bạn chưa có đơn hàng nào cần theo dõi.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            
            {/* Visual Simulated Live Delivery Route Radar */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>{t('liveMapStatus')}</span>
                </span>
                <span className="font-mono text-neutral-300">
                  Dự kiến nhận hàng: <strong className="text-emerald-400">{order.estimatedDelivery}</strong>
                </span>
              </div>

              {/* Progress track with 4 nodes */}
              <div className="relative flex items-center justify-between px-4 sm:px-12 my-6">
                {/* Connecting track line */}
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-neutral-800 -z-0">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                    style={{ 
                      width: order.orderStatus === 'delivered' ? '100%' : order.orderStatus === 'shipping' ? '70%' : '35%' 
                    }}
                  />
                </div>

                {/* Node 1: Warehouse */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20">
                    <Package className="h-4 w-4" />
                  </div>
                  <span className="mt-2 text-[11px] font-bold text-white text-center">Kho Tổng</span>
                </div>

                {/* Node 2: Sorting Hub */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="mt-2 text-[11px] font-bold text-white text-center">Phân loại Express</span>
                </div>

                {/* Node 3: On The Road (Shipper) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform ${
                    order.orderStatus === 'shipping' 
                      ? 'bg-amber-400 text-neutral-950 scale-110 ring-4 ring-amber-400/30' 
                      : order.orderStatus === 'delivered' 
                      ? 'bg-amber-400 text-neutral-950' 
                      : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    <Truck className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-[11px] font-bold text-amber-400 text-center">Đang giao tới bạn</span>
                </div>

                {/* Node 4: Destination */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg ${
                    order.orderStatus === 'delivered' 
                      ? 'bg-emerald-400 text-neutral-950 ring-4 ring-emerald-400/30' 
                      : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="mt-2 text-[11px] font-bold text-neutral-400 text-center">Đích đến</span>
                </div>

              </div>

              {/* Courier info card */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Bưu tá: Lê Văn Tuấn (AERO-Rider #412)</p>
                    <p className="text-neutral-400 text-[11px]">Phương tiện: Xe chuyên dụng giữ phom dáng đồ thể thao</p>
                  </div>
                </div>

                <a 
                  href="tel:0909123456" 
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 font-bold text-emerald-400 hover:bg-emerald-500/20"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Gọi bưu tá (0909 123 456)</span>
                </a>
              </div>
            </div>

            {/* Split: Left Timeline Milestones | Right Order Items */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Timeline Steps */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Nhật Ký Hành Trình Đơn Hàng
                </h3>

                <div className="space-y-4 border-l-2 border-neutral-800 ml-3 pl-4 text-xs">
                  {order.trackingSteps.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Step bullet */}
                      <span className={`absolute -left-[23px] top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-neutral-950 ${
                        step.current 
                          ? 'bg-amber-400 ring-amber-400/30' 
                          : step.completed 
                          ? 'bg-emerald-400' 
                          : 'bg-neutral-800'
                      }`} />
                      
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${step.completed ? 'text-white' : 'text-neutral-500'}`}>
                          {step.title}
                        </span>
                        <span className="font-mono text-neutral-500 text-[11px]">{step.timestamp}</span>
                      </div>
                      <p className="mt-0.5 text-neutral-400 text-[11px]">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items & Recipient address */}
              <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 space-y-3 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Chi Tiết Đơn Hàng ({order.items.length} món)
                </h3>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {order.items.map((i) => (
                    <div key={i.id} className="flex items-center gap-2.5">
                      <img src={i.product.image} alt="item" className="h-9 w-9 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{i.product.name[lang]}</p>
                        <p className="text-neutral-500 font-mono text-[11px]">Size {i.size} · x{i.quantity}</p>
                      </div>
                      <span className="font-mono font-bold text-amber-400">
                        {formatPrice(i.product.price * i.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-neutral-800 text-neutral-400 space-y-1 text-[11px]">
                  <p><strong className="text-white">Người nhận:</strong> {order.customerName} ({order.phone})</p>
                  <p><strong className="text-white">Địa chỉ:</strong> {order.address}</p>
                  <p><strong className="text-white">Thanh toán:</strong> <span className="uppercase text-amber-400 font-semibold">{order.paymentMethod}</span> ({order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chờ thu tiền mặt'})</p>
                  <p className="pt-1 text-sm font-bold text-white flex justify-between">
                    <span>Tổng tiền:</span>
                    <span className="text-amber-400 font-mono">{formatPrice(order.total)}</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Other orders switchers if any */}
            {orders.length > 1 && (
              <div className="pt-2 border-t border-neutral-900">
                <span className="text-xs text-neutral-500 font-semibold mb-2 block">Các đơn hàng khác của bạn:</span>
                <div className="flex flex-wrap gap-2">
                  {orders.map((ord) => (
                    <button
                      key={ord.id}
                      onClick={() => setCurrentTrackingOrder(ord)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                        order.id === ord.id 
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold' 
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {ord.id} ({formatPrice(ord.total)})
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
