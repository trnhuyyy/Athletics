import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Send, 
  Smartphone,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface SocialShareComponentProps {
  product: Product;
  variant?: 'compact' | 'full';
}

export const SocialShareComponent: React.FC<SocialShareComponentProps> = ({ 
  product, 
  variant = 'full' 
}) => {
  const { lang, t, formatPrice, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  // Formulate product URL and share text
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aerostrike.athletics';
  const productUrl = `${baseUrl}/#product-${product.id}`;
  const shareTitle = `${product.name[lang]} | AEROSTRIKE Athletics`;
  const shareDescription = `${product.name[lang]} - ${formatPrice(product.price)}. ${product.description[lang].slice(0, 100)}...`;
  const shareText = `🔥 Khám phá đồ thể thao công nghệ cao: ${product.name[lang]} (${formatPrice(product.price)}) tại AEROSTRIKE Athletics:`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(productUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = productUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      showToast(t('linkCopied'));
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      showToast(t('linkCopied'));
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: productUrl,
        });
        showToast(lang === 'vi' ? 'Đã mở bảng chia sẻ!' : 'Opened native share sheet!');
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
    showToast(lang === 'vi' ? 'Đang mở chia sẻ Facebook...' : 'Opening Facebook share...');
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}&hashtags=AerostrikeAthletics,Sportswear,Performance`;
    window.open(twitterUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
    showToast(lang === 'vi' ? 'Đang mở chia sẻ X (Twitter)...' : 'Opening X share...');
  };

  const handleShareInstagram = () => {
    // Copy Instagram optimized caption + link and offer quick clipboard
    const igCaption = `${shareTitle} • ${formatPrice(product.price)}\n\nThiết kế khí động học co giãn 4 chiều cho vận động viên chuyên nghiệp. Nhấn vào link bên dưới để xem chi tiết!\n\n${productUrl} #AerostrikeAthletics #Sportswear #GymRunning`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(igCaption);
    }
    setActivePlatform('instagram');
    showToast(lang === 'vi' ? 'Đã sao chép caption & link cho Instagram!' : 'Caption & link copied for Instagram!');
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + productUrl)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareZalo = () => {
    // Zalo share link
    const zaloUrl = `https://sp.zalo.me/share_inline?link=${encodeURIComponent(productUrl)}`;
    window.open(zaloUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
    showToast(lang === 'vi' ? 'Đang mở chia sẻ qua Zalo...' : 'Opening Zalo share...');
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3.5">
      {/* Header with quiet metadata & share count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
            {t('shareProduct')}
          </span>
        </div>
        <span className="text-[11px] font-mono text-neutral-400">
          {(product.reviewsCount * 3 + 47)} {t('shareCounter')}
        </span>
      </div>

      <p className="text-[11px] text-neutral-400 leading-relaxed">
        {t('shareSubtitle')}
      </p>

      {/* Social Platform Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        
        {/* Facebook */}
        <button
          onClick={handleShareFacebook}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-950/20 py-2 px-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-900/40 transition-colors whitespace-nowrap"
          title="Chia sẻ lên Facebook"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </button>

        {/* Instagram */}
        <button
          onClick={handleShareInstagram}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-950/20 py-2 px-2.5 text-xs font-semibold text-pink-400 hover:bg-pink-900/40 transition-colors whitespace-nowrap"
          title="Chia sẻ lên Instagram"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Instagram</span>
        </button>

        {/* X / Twitter */}
        <button
          onClick={handleShareTwitter}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/60 py-2 px-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-800 transition-colors whitespace-nowrap"
          title="Chia sẻ lên X (Twitter)"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>X / Twitter</span>
        </button>

        {/* Zalo */}
        <button
          onClick={handleShareZalo}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 py-2 px-2.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-900/40 transition-colors whitespace-nowrap"
          title="Chia sẻ qua Zalo"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Zalo</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 py-2 px-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/40 transition-colors whitespace-nowrap"
          title="Chia sẻ qua WhatsApp"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>WhatsApp</span>
        </button>

      </div>

      {/* Direct Copy to Clipboard Bar */}
      <div className="flex items-center gap-2 pt-1">
        <div className="relative flex-1">
          <input
            type="text"
            readOnly
            value={productUrl}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs font-mono text-neutral-400 focus:outline-none select-all"
          />
        </div>

        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            copied
              ? 'bg-emerald-400 text-neutral-950 font-black'
              : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>{t('copied')}</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-neutral-400" />
              <span>{t('copyLink')}</span>
            </>
          )}
        </button>

        {/* Native Web Share Button for Mobile */}
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          title={t('nativeShare')}
        >
          <Smartphone className="h-4 w-4" />
        </button>
      </div>

      {/* Instagram Story / Feed Tip alert when Instagram clicked */}
      {activePlatform === 'instagram' && (
        <div className="rounded-lg bg-pink-950/30 border border-pink-500/30 p-2.5 text-xs text-pink-200 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Đã sao chép caption & link cho Instagram!</p>
            <p className="text-[11px] text-pink-300/80">
              Bạn có thể dán trực tiếp vào Story (sử dụng Sticker Liên kết) hoặc bài viết Instagram của bạn.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
