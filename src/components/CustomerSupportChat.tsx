import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  SlidersHorizontal, 
  Camera, 
  Truck,
  Minimize2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ChatMessage } from '../types';

export const CustomerSupportChat: React.FC = () => {
  const { lang, t, openModal } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'bot',
      text: lang === 'vi' 
        ? 'Xin chào! Tôi là Trợ lý Thể Thao AEROSTRIKE. Tôi có thể hỗ trợ bạn chọn size chuẩn xác, gợi ý phối đồ chạy bộ/tập gym, hoặc kiểm tra đơn hàng 24/7!'
        : 'Welcome! I am your AEROSTRIKE Performance Concierge. How can I assist you with sizing, workout coordination, or real-time shipment updates today?',
      timestamp: 'Vừa xong'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Vừa xong'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Smart bot response logic
    setTimeout(() => {
      let botReply = '';
      let suggestedAction: ChatMessage['suggestedAction'] | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('size') || lower.includes('cỡ') || lower.includes('vừa') || lower.includes('số đo')) {
        botReply = lang === 'vi'
          ? 'Để chọn size vừa vặn nhất, AEROSTRIKE có công cụ AI Fit Calculator tính toán dựa trên chiều cao, cân nặng và độ ôm mong muốn của bạn.'
          : 'For pinpoint accuracy, try our AI Fit Calculator that analyzes your exact height, weight, and compression preference.';
        suggestedAction = {
          type: 'open_calculator',
          label: lang === 'vi' ? 'Mở máy tính size AI' : 'Open AI Fit Calculator'
        };
      } else if (lower.includes('thử') || lower.includes('try') || lower.includes('camera') || lower.includes('mẫu')) {
        botReply = lang === 'vi'
          ? 'Bạn có thể bật tính năng "Thử đồ ảo AR" để chiếu trang phục trực tiếp lên cơ thể qua Camera hoặc chọn người mẫu thể thao.'
          : 'Launch our AR Virtual Fitting Room to project apparel directly onto your body or examine drape on athlete models.';
        suggestedAction = {
          type: 'open_tryon',
          label: lang === 'vi' ? 'Bật Camera thử đồ ảo' : 'Open AR Fitting Room'
        };
      } else if (lower.includes('đơn') || lower.includes('giao') || lower.includes('ship') || lower.includes('vận chuyển') || lower.includes('track')) {
        botReply = lang === 'vi'
          ? 'Đơn hàng AEROSTRIKE được giao hỏa tốc 2 giờ tại nội thành. Bạn có thể theo dõi vị trí bưu tá và lộ trình xe hàng trên Radar thời gian thực.'
          : 'All shipments are tracked live with our 24/7 delivery radar including driver hotline and GPS waypoint updates.';
        suggestedAction = {
          type: 'open_tracking',
          label: lang === 'vi' ? 'Xem radar vận chuyển' : 'Track Shipment Radar'
        };
      } else if (lower.includes('đổi') || lower.includes('trả') || lower.includes('bảo hành') || lower.includes('return')) {
        botReply = lang === 'vi'
          ? 'AEROSTRIKE áp dụng chính sách 30 ngày đổi trả miễn phí tận nhà. Bưu tá sẽ mang size mới tới tận nơi và nhận lại size cũ mà không tốn bất kỳ chi phí nào.'
          : 'We offer 100% complimentary 30-day doorstep size exchanges nationwide. Our courier handles pickup at zero cost to you.';
      } else {
        botReply = lang === 'vi'
          ? 'Cảm ơn bạn! Chuyên viên tư vấn thể thao AEROSTRIKE sẵn sàng hỗ trợ mọi câu hỏi về chất liệu vải công nghệ cao, độ nén cơ hoặc gợi ý phối đồ thi đấu.'
          : 'Thank you! Our technical athletics team is standing by to answer any questions about proprietary fabrics, muscle compression, or race day kits.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: 'Vừa xong',
          suggestedAction
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;
    if (action.type === 'open_calculator') openModal('sizeCalc');
    if (action.type === 'open_tryon') openModal('tryon');
    if (action.type === 'open_tracking') openModal('tracking');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full bg-amber-400 p-3.5 text-neutral-950 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-amber-300"
          aria-label="Open Chat"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="hidden sm:inline text-xs font-black pr-1 tracking-tight">
            Chat 24/7
          </span>
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[480px] w-[340px] sm:w-[380px] flex-col rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 p-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-neutral-950">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                  <span>{t('chatTitle')}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-neutral-400">{t('online')} · Phản hồi trong 3 giây</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Quick FAQ Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-neutral-900 bg-neutral-950/80 p-2 text-[11px] no-scrollbar">
            <button
              onClick={() => handleSend(t('faqSize'))}
              className="rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-300 hover:border-amber-400/50 hover:text-white whitespace-nowrap shrink-0"
            >
              {t('faqSize')}
            </button>
            <button
              onClick={() => handleSend(t('faqShip'))}
              className="rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-300 hover:border-amber-400/50 hover:text-white whitespace-nowrap shrink-0"
            >
              {t('faqShip')}
            </button>
            <button
              onClick={() => handleSend(t('faqReturn'))}
              className="rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-300 hover:border-amber-400/50 hover:text-white whitespace-nowrap shrink-0"
            >
              {t('faqReturn')}
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    m.sender === 'user' 
                      ? 'bg-amber-400 text-neutral-950 font-medium rounded-tr-xs' 
                      : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>

                {/* Optional smart quick action button inside message */}
                {m.suggestedAction && (
                  <button
                    onClick={() => handleActionClick(m.suggestedAction)}
                    className="mt-1.5 flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-950/30 px-3 py-1.5 text-[11px] font-bold text-amber-300 hover:bg-amber-400/20 transition-colors"
                  >
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    <span>{m.suggestedAction.label}</span>
                  </button>
                )}
                <span className="text-[9px] text-neutral-600 mt-0.5 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-neutral-500 text-xs italic">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="border-t border-neutral-800 bg-neutral-900/60 p-2.5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatPlaceholder')}
                className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
