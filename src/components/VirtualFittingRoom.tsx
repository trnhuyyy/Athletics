import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  CameraOff, 
  X, 
  Sliders, 
  Download, 
  ShoppingBag, 
  Check, 
  RotateCcw,
  Sparkles,
  User
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const VirtualFittingRoom: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedProduct, 
    products, 
    addToCart, 
    formatPrice, 
    lang, 
    t, 
    showToast 
  } = useStore();

  const [currentProduct, setCurrentProduct] = useState<Product>(selectedProduct || products[0]);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [selectedColor, setSelectedColor] = useState(currentProduct.colors[0]);

  // Camera & Model selection
  const [useCamera, setUseCamera] = useState(false);
  const [modelType, setModelType] = useState<'male_runner' | 'female_athletic' | 'male_bodybuilder'>('male_runner');
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Garment drape adjustments
  const [scale, setScale] = useState(100);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [opacity, setOpacity] = useState(90);

  // Snapshot lookbook
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      setSelectedColor(selectedProduct.colors[0]);
    }
  }, [selectedProduct]);

  // Manage WebCam
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setUseCamera(true);
      showToast(lang === 'vi' ? 'Đã kết nối máy ảnh trực tiếp' : 'Live camera connected');
    } catch (err: any) {
      setCameraError('Không thể mở camera (yêu cầu cấp quyền hoặc thiết bị không có webcam). Bạn có thể thử với mẫu thể thao bên dưới.');
      setUseCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setUseCamera(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (activeModal !== 'tryon') return null;

  // Athletic model images (using high-contrast dark athletic backdrops)
  const modelPresets = {
    male_runner: '/src/assets/images/hero_sportswear_motion_1791968307198.jpg',
    female_athletic: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&fit=crop',
    male_bodybuilder: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&fit=crop'
  };

  const handleTakeSnapshot = () => {
    setSnapshotTaken(true);
    showToast(t('snapshotSaved'));
    setTimeout(() => setSnapshotTaken(false), 2500);
  };

  const handleAddToCartFromTryon = () => {
    addToCart(currentProduct, selectedSize, selectedColor, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-950 p-4 sm:p-6 text-neutral-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>{t('tryOnTitle')}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  AR Virtual 2.0
                </span>
              </h2>
              <p className="text-xs text-neutral-400">{t('tryOnSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              closeModal();
            }}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main AR Studio Layout: Left Viewport (Camera/Model) | Right Controls */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Viewport Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative aspect-3/4 sm:aspect-4/3 w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-inner flex items-center justify-center">
              
              {/* Background: Camera Stream or Athlete Model */}
              {useCamera ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover transform -scale-x-100"
                />
              ) : (
                <div className="relative h-full w-full bg-neutral-900">
                  <img
                    src={modelPresets[modelType]}
                    alt="Athlete model"
                    className="h-full w-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/30 pointer-events-none" />
                </div>
              )}

              {/* Garment Augmented Overlay */}
              <div 
                className="absolute pointer-events-none transition-transform duration-100"
                style={{
                  transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale / 100})`,
                  opacity: opacity / 100
                }}
              >
                <div className="relative">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name[lang]}
                    className="max-h-72 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                    style={{
                      filter: selectedColor.hex !== currentProduct.colors[0].hex ? `hue-rotate(60deg)` : 'none'
                    }}
                  />
                  {/* Tension contour lines for selected size fit */}
                  <div className="absolute inset-0 border border-dashed border-cyan-400/40 rounded-lg pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-cyan-300 font-bold backdrop-blur-sm">
                      Size {selectedSize} · {scale > 105 ? 'Relaxed Fit' : scale < 95 ? 'Compression Fit' : 'True Fit'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Viewport Top Overlay Indicators */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-950/80 text-cyan-300 border border-cyan-500/20 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span>{useCamera ? 'Live Camera Feed' : 'Athlete Model Simulation'}</span>
                </span>

                <span className="px-2.5 py-1 rounded-md bg-neutral-950/80 text-neutral-300 font-mono text-[11px] backdrop-blur-md">
                  Scale: {scale}% · Opacity: {opacity}%
                </span>
              </div>

              {/* Snapshot confirmation flash */}
              {snapshotTaken && (
                <div className="absolute inset-0 bg-white/30 flex items-center justify-center backdrop-blur-xs transition-opacity">
                  <div className="rounded-xl bg-neutral-950 p-4 border border-amber-400 text-center">
                    <Check className="h-8 w-8 text-amber-400 mx-auto" />
                    <p className="mt-1 text-xs font-bold text-white">{t('snapshotSaved')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Viewport Mode Bar: Camera toggle & Model Selectors */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 w-full">
              {!useCamera ? (
                <button
                  onClick={startCamera}
                  className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>{t('startCamera')}</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
                >
                  <CameraOff className="h-3.5 w-3.5" />
                  <span>{t('stopCamera')}</span>
                </button>
              )}

              {/* Models */}
              <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
                <button
                  onClick={() => { stopCamera(); setModelType('male_runner'); }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    !useCamera && modelType === 'male_runner' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Nam 1m80
                </button>
                <button
                  onClick={() => { stopCamera(); setModelType('female_athletic'); }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    !useCamera && modelType === 'female_athletic' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Nữ 1m68
                </button>
              </div>

              {/* Snapshot Button */}
              <button
                onClick={handleTakeSnapshot}
                className="flex items-center gap-1.5 rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{t('takeSnapshot')}</span>
              </button>
            </div>

            {cameraError && (
              <p className="mt-2 text-[11px] text-amber-400/90 text-center max-w-md">
                {cameraError}
              </p>
            )}
          </div>

          {/* Right Column: Customization Controls & Instant Buy */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Garment Switcher */}
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Chọn sản phẩm thử:
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {products.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentProduct(p);
                      setSelectedColor(p.colors[0]);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-colors ${
                      currentProduct.id === p.id
                        ? 'border-cyan-400 bg-cyan-950/30 text-white font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <img src={p.image} alt={p.name[lang]} className="h-8 w-8 rounded object-cover" />
                    <span className="line-clamp-1">{p.name[lang]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Item Specs & Price */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white line-clamp-1">
                  {currentProduct.name[lang]}
                </span>
                <span className="text-sm font-extrabold text-amber-400 tabular-nums font-mono">
                  {formatPrice(currentProduct.price)}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-400">
                {currentProduct.specs.material} · {currentProduct.specs.stretchFactor}
              </p>
            </div>

            {/* Size & Tension Simulation */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-neutral-300">{t('selectSize')}:</span>
                <span className="text-cyan-400 font-mono text-[11px]">Mô phỏng độ căng vải AR</span>
              </div>
              <div className="flex gap-2">
                {currentProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedSize(sz);
                      // Adjust scale slightly based on size
                      if (sz === 'S') setScale(90);
                      if (sz === 'M') setScale(96);
                      if (sz === 'L') setScale(100);
                      if (sz === 'XL') setScale(106);
                      if (sz === '2XL') setScale(112);
                    }}
                    className={`h-9 flex-1 rounded-lg text-xs font-bold transition-colors ${
                      selectedSize === sz
                        ? 'bg-cyan-400 text-neutral-950 font-black'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch */}
            <div>
              <span className="text-xs font-semibold text-neutral-300 mb-1.5 block">
                {t('selectColor')}: {selectedColor.name}
              </span>
              <div className="flex items-center gap-2">
                {currentProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-7 w-7 rounded-full border-2 transition-transform ${
                      selectedColor.name === c.name
                        ? 'scale-110 border-white ring-2 ring-cyan-400'
                        : 'border-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Fine Tuning Sliders (Scale, Offset, Opacity) */}
            <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Sliders className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{t('adjustGarment')}</span>
                </span>
                <button
                  onClick={() => { setScale(100); setOffsetY(0); setOffsetX(0); setOpacity(90); }}
                  className="text-[11px] text-neutral-500 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Scale Slider */}
              <div className="flex items-center gap-2">
                <span className="w-16 text-neutral-400 text-[11px]">Tỷ lệ:</span>
                <input
                  type="range"
                  min="75"
                  max="130"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-neutral-800 rounded"
                />
                <span className="w-8 text-right font-mono text-[11px]">{scale}%</span>
              </div>

              {/* Offset Y Slider */}
              <div className="flex items-center gap-2">
                <span className="w-16 text-neutral-400 text-[11px]">Cao/thấp:</span>
                <input
                  type="range"
                  min="-80"
                  max="80"
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-neutral-800 rounded"
                />
                <span className="w-8 text-right font-mono text-[11px]">{offsetY}</span>
              </div>
            </div>

            {/* Add to Cart directly from AR */}
            <div className="pt-2">
              <button
                onClick={handleAddToCartFromTryon}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg active:scale-98"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{t('addToCart')} ({selectedSize} · {selectedColor.name})</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
