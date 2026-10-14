import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  Tag, 
  Check, 
  Crown, 
  Gift, 
  TrendingUp, 
  User, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Voucher } from '../types';

export const MembershipLoyaltyModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    user, 
    vouchers, 
    redeemVoucher, 
    formatPrice, 
    lang, 
    t, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'tiers' | 'vouchers' | 'profile'>('vouchers');

  if (activeModal !== 'loyalty') return null;

  // Next tier calculation: Platinum VIP at 10,000,000₫
  const nextTierTarget = 10000000;
  const progressPercent = Math.min(100, Math.round((user.totalSpent / nextTierTarget) * 100));

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
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>{t('membershipTitle')}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 uppercase">
                  {user.tier} VIP
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Tích điểm mỗi lần mua sắm để nâng hạng và mở khóa voucher giảm giá độc quyền.
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

        {/* Big VIP Member Card */}
        <div className="mt-5 relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-950 p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                AEROSTRIKE ATHLETIC CLUB
              </span>
              <h3 className="text-2xl font-black text-white font-display tracking-tight">
                {user.name}
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Thành viên Hạng Vàng (Gold Member) · ID: {user.id}
              </p>
            </div>

            {/* SportPoints Box */}
            <div className="rounded-xl border border-amber-400/30 bg-neutral-950/80 px-6 py-3 text-center shrink-0">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block">{t('myPoints')}</span>
              <span className="text-3xl font-black text-amber-400 font-mono tabular-nums">
                {user.points}
              </span>
              <span className="text-[10px] text-neutral-500 block">SportPoints khả dụng</span>
            </div>

          </div>

          {/* Progress bar to Platinum VIP */}
          <div className="mt-6 pt-4 border-t border-neutral-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-300">
                {t('tierProgress')}: <strong className="text-white">Gold</strong> → <strong className="text-amber-400">Platinum VIP</strong>
              </span>
              <span className="font-mono text-neutral-400">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-neutral-500 font-mono">
              <span>Đã chi tiêu: {formatPrice(user.totalSpent)}</span>
              <span>Cần thêm {formatPrice(Math.max(0, nextTierTarget - user.totalSpent))}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex items-center gap-2 border-b border-neutral-800 pb-2">
          <button
            onClick={() => setActiveTab('vouchers')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'vouchers' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Gift className="h-4 w-4" />
            <span>{t('redeemVouchers')}</span>
          </button>

          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'tiers' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Crown className="h-4 w-4" />
            <span>Đặc quyền các Hạng</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Hồ sơ thành viên</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-5">
          {activeTab === 'vouchers' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vouchers.map((voucher) => {
                const canAfford = user.points >= voucher.pointsCost;
                return (
                  <div 
                    key={voucher.id}
                    className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 transition-colors hover:border-neutral-700"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                          {voucher.code}
                        </span>
                        <span className="font-mono text-neutral-400 font-bold">
                          {voucher.pointsCost} pts
                        </span>
                      </div>

                      <h4 className="mt-3 text-sm font-bold text-white">
                        {voucher.title[lang]}
                      </h4>
                      <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                        {voucher.description[lang]}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800">
                      <button
                        onClick={() => redeemVoucher(voucher)}
                        disabled={!canAfford}
                        className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          canAfford
                            ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <Tag className="h-3.5 w-3.5" />
                            <span>{t('redeemNow')}</span>
                          </>
                        ) : (
                          <span>{t('notEnoughPoints')} ({voucher.pointsCost - user.points} pts)</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'tiers' && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 space-y-2">
                <span className="font-bold text-neutral-400 block">{t('bronzeTier')}</span>
                <span className="text-sm font-mono font-bold text-white">0đ</span>
                <ul className="text-neutral-400 space-y-1 text-[11px] list-disc list-inside">
                  <li>Tích 1% điểm mỗi đơn</li>
                  <li>Bảo hành 12 tháng</li>
                </ul>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 space-y-2">
                <span className="font-bold text-neutral-300 block">{t('silverTier')}</span>
                <span className="text-sm font-mono font-bold text-white">Từ 2.000.000₫</span>
                <ul className="text-neutral-400 space-y-1 text-[11px] list-disc list-inside">
                  <li>Tích 1.5% điểm</li>
                  <li>Tặng quà sinh nhật 100k</li>
                  <li>Ưu tiên giao hỏa tốc</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 space-y-2">
                <span className="font-bold text-amber-400 block">{t('goldTier')} (Hiện tại)</span>
                <span className="text-sm font-mono font-bold text-white">Từ 5.000.000₫</span>
                <ul className="text-amber-200/80 space-y-1 text-[11px] list-disc list-inside">
                  <li>Tích 2% điểm</li>
                  <li>Miễn phí ship mọi đơn</li>
                  <li>Đổi trả tận nhà miễn phí</li>
                  <li>Thử mẫu thử trước khi ra mắt</li>
                </ul>
              </div>

              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-2">
                <span className="font-bold text-purple-400 block">{t('platinumTier')}</span>
                <span className="text-sm font-mono font-bold text-white">Từ 10.000.000₫</span>
                <ul className="text-purple-200/80 space-y-1 text-[11px] list-disc list-inside">
                  <li>Tích 3% điểm</li>
                  <li>Trợ lý thể thao riêng 24/7</li>
                  <li>Khắc tên logo cá nhân hóa</li>
                  <li>Vé mời các giải chạy lớn</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-3 text-xs max-w-lg">
              <div className="flex justify-between py-1.5 border-b border-neutral-800">
                <span className="text-neutral-500">Họ và tên:</span>
                <span className="font-bold text-white">{user.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800">
                <span className="text-neutral-500">Email:</span>
                <span className="text-white font-mono">{user.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800">
                <span className="text-neutral-500">Số điện thoại:</span>
                <span className="text-white font-mono">{user.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800">
                <span className="text-neutral-500">Địa chỉ giao hàng mặc định:</span>
                <span className="text-white text-right max-w-xs">{user.address}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
