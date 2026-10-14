import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { lang, setLang, t, openModal, setViewMode } = useStore();

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs pb-20 lg:pb-8 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-black text-neutral-950 text-sm">
                A
              </span>
              <span className="font-display text-lg font-black tracking-tight text-white">
                AERO<span className="text-amber-400">STRIKE</span>
              </span>
            </div>
            <p className="text-neutral-500 leading-relaxed text-xs">
              Thương hiệu đồ thể thao hiệu năng cao. Sáng tạo với vật liệu khí động học, kiểm định tiêu chuẩn thi đấu chuyên nghiệp.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Tính năng độc quyền
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => openModal('tryon')} className="hover:text-cyan-400 transition-colors">
                  Phòng thử đồ ảo qua Camera (AR Try-On)
                </button>
              </li>
              <li>
                <button onClick={() => openModal('outfit')} className="hover:text-amber-400 transition-colors">
                  AI Stylist - Gợi ý phối đồ thể thao
                </button>
              </li>
              <li>
                <button onClick={() => openModal('sizeCalc')} className="hover:text-emerald-400 transition-colors">
                  Máy tính kích thước chuẩn theo số đo
                </button>
              </li>
              <li>
                <button onClick={() => openModal('tracking')} className="hover:text-white transition-colors">
                  Radar theo dõi bưu tá giao hàng trực tiếp
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Chính sách & Khách hàng
            </h4>
            <ul className="space-y-2">
              <li>Đổi trả miễn phí 30 ngày tận nhà</li>
              <li>Bảo hành đường may & khóa kéo trọn đời</li>
              <li>Miễn phí vận chuyển toàn quốc từ 599.000₫</li>
              <li>
                <button onClick={() => openModal('loyalty')} className="hover:text-amber-400 transition-colors">
                  Hội viên VIP & Tích điểm SportPoints
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Dành cho đối tác
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setViewMode('admin')} 
                  className="font-bold text-amber-400 hover:underline"
                >
                  Cổng Quản Trị Người Bán (Merchant Portal)
                </button>
              </li>
              <li>Hợp tác phân phối độc quyền</li>
              <li>Tài trợ vận động viên marathon & gym</li>
            </ul>
          </div>

        </div>

        {/* Payment Methods Trust Bar & Copyright */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © 2026 AEROSTRIKE Athletics Inc. Tất cả quyền được bảo lưu.
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-neutral-400">VietQR</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-neutral-400">Napas247</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-neutral-400">MoMo</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-neutral-400">ZaloPay</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-neutral-400">Visa / Mastercard</span>
          </div>

          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1 hover:text-white"
          >
            <Globe className="h-3 w-3" />
            <span>Ngôn ngữ: {lang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
