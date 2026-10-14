import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Product, 
  CartItem, 
  Order, 
  UserProfile, 
  Voucher, 
  OrderStatus,
  ProductColor
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  MOCK_USER, 
  MOCK_VOUCHERS, 
  INITIAL_ORDERS 
} from '../data/mockData';
import { translations } from '../utils/i18n';

interface StoreContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['vi']) => string;
  formatPrice: (amount: number) => string;
  
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  activeVoucher: Voucher | null;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'carrier' | 'trackingSteps' | 'earnedPoints' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  currentTrackingOrder: Order | null;
  setCurrentTrackingOrder: (order: Order | null) => void;

  // Compare
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Modals
  activeModal: string | null;
  selectedProduct: Product | null;
  openModal: (modal: string, product?: Product) => void;
  closeModal: () => void;

  // User & Loyalty
  user: UserProfile;
  vouchers: Voucher[];
  redeemVoucher: (voucher: Voucher) => boolean;

  // View Mode: 'store' | 'admin'
  viewMode: 'store' | 'admin';
  setViewMode: (mode: 'store' | 'admin') => void;

  // Toast / feedback message
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('vi');
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial sample item in bag
    return [
      {
        id: `${INITIAL_PRODUCTS[0].id}-L-${INITIAL_PRODUCTS[0].colors[0].hex}`,
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        color: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1
      }
    ];
  });
  const [activeVoucher, setActiveVoucher] = useState<Voucher | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [currentTrackingOrder, setCurrentTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [vouchers] = useState<Voucher[]>(MOCK_VOUCHERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const t = (key: keyof typeof translations['vi']): string => {
    const dict = translations[lang] || translations.vi;
    return dict[key] || translations.vi[key] || key;
  };

  const formatPrice = (amount: number): string => {
    if (lang === 'en') {
      const usd = (amount / 25000).toFixed(2);
      return `$${usd}`;
    }
    return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
  };

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 599000 || subtotal === 0 ? 0 : 35000;
  const discount = activeVoucher ? activeVoucher.discountAmount : 0;
  const total = Math.max(0, subtotal + shippingFee - discount);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color.hex}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, size, color, quantity }];
    });
    showToast(lang === 'vi' ? `Đã thêm "${product.name.vi}" vào giỏ hàng` : `Added "${product.name.en}" to bag`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveVoucher(null);
  };

  const applyVoucher = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    const found = vouchers.find((v) => v.code.toUpperCase() === trimmed);
    if (found) {
      if (subtotal < found.minSpend) {
        showToast(
          lang === 'vi'
            ? `Đơn hàng tối thiểu phải từ ${formatPrice(found.minSpend)}`
            : `Minimum order value must be at least ${formatPrice(found.minSpend)}`
        );
        return false;
      }
      setActiveVoucher(found);
      showToast(lang === 'vi' ? `Đã áp dụng mã giảm ${formatPrice(found.discountAmount)}` : `Voucher applied: -${formatPrice(found.discountAmount)}`);
      return true;
    }
    showToast(lang === 'vi' ? 'Mã ưu đãi không hợp lệ' : 'Invalid promo code');
    return false;
  };

  const removeVoucher = () => {
    setActiveVoucher(null);
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'carrier' | 'trackingSteps' | 'earnedPoints' | 'estimatedDelivery'>): Order => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNum = `VN-AERO-${Math.floor(100000 + Math.random() * 900000)}`;
    const pointsEarned = Math.floor(orderData.total / 10000);
    const now = new Date();
    const dateStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: dateStr,
      trackingNumber: trackingNum,
      carrier: 'AEROSTRIKE Express Logistics',
      estimatedDelivery: 'Hôm nay, trước 19:00',
      earnedPoints: pointsEarned,
      trackingSteps: [
        {
          title: 'Đã nhận đơn hàng',
          description: 'Đơn hàng được ghi nhận vào hệ thống thành công.',
          timestamp: dateStr,
          completed: true,
          current: true
        },
        {
          title: 'Đóng gói kiện hàng thể thao',
          description: 'Hàng được đóng gói trong hộp chống sốc chuyên dụng.',
          timestamp: 'Dự kiến 30 phút sau',
          completed: false
        },
        {
          title: 'Đang vận chuyển hoả tốc',
          description: 'Tài xế nhận hàng và tiến hành giao tới quý khách.',
          timestamp: 'Dự kiến 2 giờ',
          completed: false
        },
        {
          title: 'Giao hàng thành công',
          description: 'Khách hàng nhận hàng và kiểm tra.',
          timestamp: 'Trước 19:00',
          completed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentTrackingOrder(newOrder);

    // Update user points and lifetime spend
    setUser((prev) => ({
      ...prev,
      points: prev.points + pointsEarned,
      totalSpent: prev.totalSpent + orderData.total
    }));

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedSteps = o.trackingSteps.map((step, idx) => {
            if (status === 'delivered') return { ...step, completed: true, current: idx === o.trackingSteps.length - 1 };
            if (status === 'shipping') return { ...step, completed: idx <= 2, current: idx === 2 };
            if (status === 'confirmed') return { ...step, completed: idx <= 1, current: idx === 1 };
            return step;
          });
          return { ...o, orderStatus: status, trackingSteps: updatedSteps };
        }
        return o;
      })
    );
    showToast(lang === 'vi' ? `Đã cập nhật trạng thái đơn ${orderId}` : `Updated status for ${orderId}`);
  };

  // Compare products
  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(lang === 'vi' ? 'Đã xóa khỏi danh sách so sánh' : 'Removed from comparison');
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast(lang === 'vi' ? 'Tối đa so sánh cùng lúc 4 sản phẩm' : 'Maximum 4 products allowed for comparison');
        return prev;
      }
      showToast(lang === 'vi' ? 'Đã thêm vào danh sách so sánh' : 'Added to comparison');
      return [...prev, product];
    });
  };

  const clearCompare = () => setCompareList([]);
  const isInCompare = (productId: string) => compareList.some((p) => p.id === productId);

  // Modals
  const openModal = (modal: string, product?: Product) => {
    setActiveModal(modal);
    if (product) setSelectedProduct(product);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Loyalty rewards
  const redeemVoucher = (voucher: Voucher): boolean => {
    if (user.points < voucher.pointsCost) {
      showToast(lang === 'vi' ? 'Bạn không đủ điểm SportPoints để đổi voucher này' : 'Insufficient SportPoints to redeem this voucher');
      return false;
    }
    setUser((prev) => ({
      ...prev,
      points: prev.points - voucher.pointsCost
    }));
    setActiveVoucher(voucher);
    showToast(lang === 'vi' ? `Đổi thành công! Đã áp dụng mã ${voucher.code}` : `Redeemed! Voucher ${voucher.code} applied`);
    return true;
  };

  // Merchant actions
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(lang === 'vi' ? 'Đã thêm sản phẩm mới vào kho' : 'New product created in inventory');
  };

  const editProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(lang === 'vi' ? 'Đã cập nhật thông tin sản phẩm' : 'Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(lang === 'vi' ? 'Đã xóa sản phẩm khỏi kho' : 'Product removed from catalog');
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: newStock } : p))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        t,
        formatPrice,
        products,
        addProduct,
        editProduct,
        deleteProduct,
        updateStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        total,
        activeVoucher,
        applyVoucher,
        removeVoucher,
        orders,
        createOrder,
        updateOrderStatus,
        currentTrackingOrder,
        setCurrentTrackingOrder,
        compareList,
        toggleCompare,
        clearCompare,
        isInCompare,
        activeModal,
        selectedProduct,
        openModal,
        closeModal,
        user,
        vouchers,
        redeemVoucher,
        viewMode,
        setViewMode,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
