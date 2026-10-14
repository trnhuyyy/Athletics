export type Language = 'vi' | 'en';

export type Category = 'all' | 'tops' | 'bottoms' | 'footwear' | 'accessories';
export type SportDiscipline = 'all' | 'running' | 'gym_training' | 'yoga' | 'outdoor';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  userStats?: {
    height: string;
    weight: string;
    purchasedSize: string;
    fitFeedback: 'true_to_size' | 'runs_small' | 'runs_large';
  };
  verifiedPurchase: boolean;
}

export interface ProductSpecs {
  material: string;
  breathabilityScore: number; // 1-10
  stretchFactor: '2-Way' | '4-Way Elastic' | 'Rigid Tech' | 'Compression 360';
  weightGrams: number;
  waterResistant?: boolean;
  technology: string[];
  careInstructions: string;
}

export interface Product {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  category: Category;
  sport: SportDiscipline;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  sizes: string[];
  colors: ProductColor[];
  image: string;
  gallery: string[];
  description: {
    vi: string;
    en: string;
  };
  specs: ProductSpecs;
  inStock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${size}-${colorHex}`
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export type PaymentMethod = 'vietqr' | 'momo' | 'credit_card' | 'cod';

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  orderStatus: OrderStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
  earnedPoints: number;
}

export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  tier: MembershipTier;
  points: number;
  totalSpent: number;
  avatar?: string;
}

export interface Voucher {
  id: string;
  code: string;
  discountAmount: number;
  minSpend: number;
  pointsCost: number;
  title: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
}

export interface OutfitLook {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  discipline: SportDiscipline;
  description: {
    vi: string;
    en: string;
  };
  items: {
    top: Product;
    bottom: Product;
    footwear?: Product;
    accessory?: Product;
  };
  bundleDiscountPercent: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'open_product' | 'open_calculator' | 'open_tracking' | 'open_tryon';
    payload?: string;
    label: string;
  };
}
