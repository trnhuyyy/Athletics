import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Camera, 
  Truck, 
  Layers 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { cartCount, openModal, setViewMode } = useStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-md px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-5 items-center text-center">
        
        <button
          onClick={() => setViewMode('store')}
          className="flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-white"
        >
          <Layers className="h-5 w-5" />
          <span className="text-[10px] mt-0.5 font-medium">Sản phẩm</span>
        </button>

        <button
          onClick={() => openModal('outfit')}
          className="flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-amber-400"
        >
          <Sparkles className="h-5 w-5 text-amber-400" />
          <span className="text-[10px] mt-0.5 font-medium">Phối đồ</span>
        </button>

        <button
          onClick={() => openModal('tryon')}
          className="flex flex-col items-center justify-center py-1 text-cyan-400"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Camera className="h-4 w-4" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold">Thử AR</span>
        </button>

        <button
          onClick={() => openModal('tracking')}
          className="flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-white"
        >
          <Truck className="h-5 w-5" />
          <span className="text-[10px] mt-0.5 font-medium">Vận đơn</span>
        </button>

        <button
          onClick={() => openModal('cart')}
          className="relative flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-white"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-neutral-950">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Giỏ hàng</span>
        </button>

      </div>
    </div>
  );
};
