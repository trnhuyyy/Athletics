import { Product, Voucher, OutfitLook, UserProfile, Order } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_sportswear_motion_1791968307198.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: {
      vi: 'Áo Khoác Chạy Bộ Gió Phản Quang AERO-SHIELD Pro',
      en: 'AERO-SHIELD Pro Reflective Running Windbreaker'
    },
    category: 'tops',
    sport: 'running',
    price: 890000,
    originalPrice: 1190000,
    rating: 4.9,
    reviewsCount: 148,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Obsidian Matte', hex: '#1c1d22' },
      { name: 'Neon Volt', hex: '#d4ff00' },
      { name: 'Slate Gray', hex: '#4b5563' }
    ],
    image: '/src/assets/images/product_running_jacket_1791968307938.jpg',
    gallery: [
      '/src/assets/images/product_running_jacket_1791968307938.jpg',
      '/src/assets/images/hero_sportswear_motion_1791968307198.jpg'
    ],
    description: {
      vi: 'Áo khoác gió khí động học chuyên biệt cho cự ly dài và chạy đêm. Kháng nước chuẩn DWR, thông hơi sau lưng với màng micro-perforated và dải phản quang 360 độ.',
      en: 'Aerodynamic windbreaker engineered for endurance running and low-light training. DWR water repellent coating, back ventilation micro-mesh, and 360-degree reflective accents.'
    },
    specs: {
      material: '100% Recycled Ripstop Nylon + Polyurethane DWR',
      breathabilityScore: 9.5,
      stretchFactor: '4-Way Elastic',
      weightGrams: 145,
      waterResistant: true,
      technology: ['AeroShield™', 'DWR WaterGuard', 'NightReflect 360', 'LaserCut Vent'],
      careInstructions: 'Giặt máy chế độ nhẹ 30°C, không ủi trực tiếp lên dải phản quang.'
    },
    inStock: 34,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-01',
        author: 'Trần Minh Hoàng',
        rating: 5,
        date: '2026-03-28',
        comment: 'Áo siêu nhẹ, mặc cản gió chạy giải sáng sớm ở Hồ Gươm cực đã. Túi có khoá zip đựng điện thoại không bị rung lắc.',
        userStats: {
          height: '1m76',
          weight: '71kg',
          purchasedSize: 'L',
          fitFeedback: 'true_to_size'
        },
        verifiedPurchase: true
      },
      {
        id: 'rev-02',
        author: 'Lê Thùy Dương',
        rating: 5,
        date: '2026-03-15',
        comment: 'Phản quang ban đêm sáng rực, đi chạy hay đạp xe đều rất an tâm. Chất vải sờ rất thích, không bị kêu loạt xoạt.',
        userStats: {
          height: '1m64',
          weight: '52kg',
          purchasedSize: 'S',
          fitFeedback: 'true_to_size'
        },
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-002',
    name: {
      vi: 'Áo Thun Nén Cơ Thể Thao AERO-TECH V2',
      en: 'AERO-TECH V2 Seamless Compression Training Tee'
    },
    category: 'tops',
    sport: 'gym_training',
    price: 490000,
    originalPrice: 650000,
    rating: 4.8,
    reviewsCount: 236,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Graphite Black', hex: '#18181b' },
      { name: 'Titanium Blue', hex: '#1e3a8a' },
      { name: 'Crimson Red', hex: '#991b1b' }
    ],
    image: '/src/assets/images/product_pro_compression_tee_1791968308695.jpg',
    gallery: [
      '/src/assets/images/product_pro_compression_tee_1791968308695.jpg'
    ],
    description: {
      vi: 'Áo nén tập luyện liền mạch dệt 3D hỗ trợ tuần hoàn máu cơ bắp, giảm rung lắc mô cơ khi nâng tạ nặng hoặc tập cường độ cao (HIIT/CrossFit).',
      en: '3D circular knit seamless compression base layer designed to support muscle alignment, optimize venous return, and eliminate friction during high-intensity training.'
    },
    specs: {
      material: '82% Polyamide Microfiber, 18% Elastane Spandex',
      breathabilityScore: 9.8,
      stretchFactor: 'Compression 360',
      weightGrams: 130,
      technology: ['ZeroSeam™ Construction', 'HydroDry Moisture Lock', 'Anti-Odor IonSilver'],
      careInstructions: 'Không sấy nhiệt độ cao, giặt cùng đồ tối màu.'
    },
    inStock: 58,
    isNewArrival: true,
    reviews: [
      {
        id: 'rev-03',
        author: 'Nguyễn Tiến Dũng',
        rating: 5,
        date: '2026-04-02',
        comment: 'Mặc ôm sát tôn cơ cực kỳ, thấm hút mồ hôi nhanh như chớp. Tập squat với deadlift không bị xoắn áo.',
        userStats: {
          height: '1m78',
          weight: '76kg',
          purchasedSize: 'L',
          fitFeedback: 'true_to_size'
        },
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-003',
    name: {
      vi: 'Quần Short Thể Thao 2 Trong 1 AURA Multi-Pocket',
      en: 'AURA 2-in-1 Multi-Pocket Performance Shorts'
    },
    category: 'bottoms',
    sport: 'running',
    price: 550000,
    originalPrice: 720000,
    rating: 4.9,
    reviewsCount: 312,
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Dark Slate Gray', hex: '#374151' },
      { name: 'Deep Onyx', hex: '#111827' },
      { name: 'Military Olive', hex: '#3f4f3e' }
    ],
    image: '/src/assets/images/product_tech_shorts_1791968310963.jpg',
    gallery: [
      '/src/assets/images/product_tech_shorts_1791968310963.jpg'
    ],
    description: {
      vi: 'Quần short tích hợp quần lót nén cơ chống cọ xát đùi trong (anti-chafing). Tích hợp túi đựng điện thoại chống nảy, đai treo khăn và ngăn khoá kéo chống nước.',
      en: 'Engineered 2-in-1 running shorts featuring an inner compressive anti-chafing liner, bounce-free phone sleeve, towel loop, and waterproof zippered stash pocket.'
    },
    specs: {
      material: 'Outer: 88% Polyester, 12% Spandex; Inner Liner: 80% Nylon, 20% Spandex',
      breathabilityScore: 9.2,
      stretchFactor: '4-Way Elastic',
      weightGrams: 165,
      waterResistant: true,
      technology: ['GlideFree Liner™', 'SecurePocket Lock', 'AirFlow Perforations'],
      careInstructions: 'Giặt lạnh, không dùng chất làm mềm vải.'
    },
    inStock: 42,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-04',
        author: 'Vũ Quốc Bảo',
        rating: 5,
        date: '2026-03-19',
        comment: 'Chạy cự ly 21km không hề bị cọ rát đùi. Quần có túi nén đút vừa iPhone 16 Pro Max chạy êm ru không nhảy.',
        userStats: {
          height: '1m72',
          weight: '67kg',
          purchasedSize: 'M',
          fitFeedback: 'true_to_size'
        },
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-004',
    name: {
      vi: 'Giày Chạy Bộ Carbon Plate ZOOM-SPEED Marathon',
      en: 'ZOOM-SPEED Carbon Plate Marathon Road Racers'
    },
    category: 'footwear',
    sport: 'running',
    price: 2450000,
    originalPrice: 2890000,
    rating: 5.0,
    reviewsCount: 89,
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Hyper Volt & White', hex: '#ccff00' },
      { name: 'Midnight Stealth', hex: '#0a0a0a' }
    ],
    image: '/src/assets/images/product_speed_sneakers_1791968310460.jpg',
    gallery: [
      '/src/assets/images/product_speed_sneakers_1791968310460.jpg'
    ],
    description: {
      vi: 'Giày đua marathon trang bị đĩa sợi carbon nguyên khối kết hợp đệm bọt siêu nảy Zoom-Foam hoàn trả năng lượng 87%. Thân giày FlyWeave siêu thoáng.',
      en: 'Elite road racing shoes with a full-length curved carbon fiber propulsion plate embedded in super-critical Zoom-Foam for 87% energy return. Ultralight FlyWeave upper.'
    },
    specs: {
      material: 'Engineered Mono-Mesh, Full Carbon FlyPlate, ZoomX PEBA Foam, Continental Rubber',
      breathabilityScore: 9.9,
      stretchFactor: 'Rigid Tech',
      weightGrams: 188,
      waterResistant: false,
      technology: ['Carbon Propulsion Plate', 'SuperCritical PEBA Foam', 'Gripmaster Outsole'],
      careInstructions: 'Dùng bàn chải mềm và bọt vệ sinh giày chuyên dụng, phơi nơi thoáng gió.'
    },
    inStock: 19,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-05',
        author: 'Đỗ Hữu Thắng',
        rating: 5,
        date: '2026-04-05',
        comment: 'Đẩy bước chạy cực bốc, giảm mỏi cơ bắp chân rõ rệt khi duy trì pace 4:30. Đúng chất giày đua chuyên nghiệp!',
        userStats: {
          height: '1m75',
          weight: '66kg',
          purchasedSize: '42',
          fitFeedback: 'true_to_size'
        },
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-005',
    name: {
      vi: 'Quần Legging Tập Gym & Yoga Tôn Dáng SCULPT-FIT',
      en: 'SCULPT-FIT High-Waist Seamless Gym Leggings'
    },
    category: 'bottoms',
    sport: 'gym_training',
    price: 490000,
    originalPrice: 620000,
    rating: 4.9,
    reviewsCount: 194,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Obsidian', hex: '#171717' },
      { name: 'Sage Forest', hex: '#475569' },
      { name: 'Deep Burgundy', hex: '#701a75' }
    ],
    image: '/src/assets/images/product_tech_shorts_1791968310963.jpg',
    gallery: [
      '/src/assets/images/product_tech_shorts_1791968310963.jpg'
    ],
    description: {
      vi: 'Quần legging cạp cao định hình vòng eo, công nghệ dệt 3D nâng mông tự nhiên (scrunch contour), vải đục tuyệt đối chuẩn squat-proof không lộ sáng.',
      en: 'High-waisted compression leggings featuring anatomical contouring, squat-proof opacity, and a zero-dig waistband that stays locked during deep squats and Pilates.'
    },
    specs: {
      material: '75% Polyamide, 25% Lycra Soft-Touch',
      breathabilityScore: 9.3,
      stretchFactor: '4-Way Elastic',
      weightGrams: 210,
      technology: ['SquatProof 100% Opacity', 'WaistSculpt Band', 'ButtContour Weave'],
      careInstructions: 'Giặt lộn mặt trái, không dùng sấy nhiệt.'
    },
    inStock: 65,
    isNewArrival: false,
    reviews: [
      {
        id: 'rev-06',
        author: 'Nguyễn Phương Thảo',
        rating: 5,
        date: '2026-03-22',
        comment: 'Vải mềm mượt như bơ mà nén bụng rất tốt, tập squat 100% không bị lộ hay tuột lưng.',
        userStats: {
          height: '1m62',
          weight: '51kg',
          purchasedSize: 'S',
          fitFeedback: 'true_to_size'
        },
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-006',
    name: {
      vi: 'Bình Nước Giữ Nhiệt Thể Thao HYDRO-LOK 1000ml',
      en: 'HYDRO-LOK 1000ml Insulated Stainless Steel Sports Flask'
    },
    category: 'accessories',
    sport: 'outdoor',
    price: 320000,
    originalPrice: 420000,
    rating: 4.8,
    reviewsCount: 167,
    sizes: ['1000ml'],
    colors: [
      { name: 'Matte Stealth Black', hex: '#111827' },
      { name: 'Steel Brushed', hex: '#9ca3af' },
      { name: 'Alpine Moss', hex: '#2e3a2f' }
    ],
    image: '/src/assets/images/product_running_jacket_1791968307938.jpg',
    gallery: [
      '/src/assets/images/product_running_jacket_1791968307938.jpg'
    ],
    description: {
      vi: 'Bình thép không gỉ 304 hai lớp chân không cách nhiệt, giữ lạnh 24 giờ và giữ ấm 12 giờ. Nắp bật thể thao 1 chạm tiện lợi khi đang chạy bộ hoặc đạp xe.',
      en: 'Double-wall vacuum insulated 18/8 food-grade stainless steel bottle. Keeps drinks cold for 24h or hot for 12h. One-touch sports nozzle designed for rapid hydration.'
    },
    specs: {
      material: '18/8 Pro-Grade Stainless Steel, BPA-Free Tritan Cap',
      breathabilityScore: 10,
      stretchFactor: 'Rigid Tech',
      weightGrams: 360,
      waterResistant: true,
      technology: ['TempShield Double Vacuum', 'HydroShield Powder Coat', 'LeakProof Lock'],
      careInstructions: 'Rửa tay để giữ độ bền sơn tĩnh điện tốt nhất.'
    },
    inStock: 80,
    isBestSeller: false,
    reviews: [
      {
        id: 'rev-07',
        author: 'Phạm Hải Nam',
        rating: 5,
        date: '2026-03-30',
        comment: 'Đựng đá từ sáng đến chiều tối vẫn chưa tan hết. Cầm đầm tay và sơn nhám chống trơn rất xịn.',
        userStats: {
          height: '1m70',
          weight: '68kg',
          purchasedSize: '1000ml',
          fitFeedback: 'true_to_size'
        },
        verifiedPurchase: true
      }
    ]
  }
];

export const MOCK_USER: UserProfile = {
  id: 'usr-8891',
  name: 'Nguyễn Huy Hoàng',
  email: 'huy85070@gmail.com',
  phone: '0988 567 890',
  address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
  tier: 'gold',
  points: 480,
  totalSpent: 4850000,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
};

export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: 'vouch-50k',
    code: 'AERO50K',
    discountAmount: 50000,
    minSpend: 400000,
    pointsCost: 100,
    title: {
      vi: 'Giảm 50.000₫ cho đơn từ 400.000₫',
      en: '50,000₫ off orders from 400,000₫'
    },
    description: {
      vi: 'Áp dụng cho toàn bộ đồ thể thao AEROSTRIKE chính hãng.',
      en: 'Valid on all genuine AEROSTRIKE apparel and gear.'
    }
  },
  {
    id: 'vouch-120k',
    code: 'VIPGOLD120',
    discountAmount: 120000,
    minSpend: 800000,
    pointsCost: 200,
    title: {
      vi: 'Giảm 120.000₫ cho đơn từ 800.000₫',
      en: '120,000₫ off orders from 800,000₫'
    },
    description: {
      vi: 'Đặc quyền thành viên Gold & Platinum đổi điểm thưởng.',
      en: 'Exclusive for Gold & Platinum loyalty members.'
    }
  },
  {
    id: 'vouch-250k',
    code: 'ELITE250',
    discountAmount: 250000,
    minSpend: 1500000,
    pointsCost: 400,
    title: {
      vi: 'Giảm 250.000₫ cho đơn từ 1.500.000₫',
      en: '250,000₫ off orders from 1,500,000₫'
    },
    description: {
      vi: 'Ưu đãi cao cấp cho combo trang phục hoặc giày carbon.',
      en: 'Premium voucher for kit bundles or carbon racing footwear.'
    }
  }
];

export const PRESET_OUTFITS: OutfitLook[] = [
  {
    id: 'look-marathon-speed',
    title: {
      vi: 'Combo Đua Marathon 42K Tốc Độ Cao',
      en: 'Elite 42K Sub-3 Marathon Racing Kit'
    },
    discipline: 'running',
    description: {
      vi: 'Bộ trang phục tối ưu hóa khí động học và hoàn trả năng lượng. Áo gió cản gió sớm kết hợp quần 2-trong-1 chống rát đùi và giày carbon plate trợ lực vượt trội.',
      en: 'Aerodynamic endurance synchronization. Ultra-packable windbreaker, anti-chafing 2-in-1 shorts and carbon-plated propulsive footwear.'
    },
    items: {
      top: INITIAL_PRODUCTS[0], // windbreaker
      bottom: INITIAL_PRODUCTS[2], // 2-in-1 shorts
      footwear: INITIAL_PRODUCTS[3] // carbon shoes
    },
    bundleDiscountPercent: 15
  },
  {
    id: 'look-hiit-gym-beast',
    title: {
      vi: 'Set Tập Gym & Thể Lực Cường Độ Cao',
      en: 'High-Volume Hypertrophy & Cross-Training Kit'
    },
    discipline: 'gym_training',
    description: {
      vi: 'Bộ đôi nén cơ AERO-TECH V2 và quần short đa năng cho phép bạn thực hiện mọi bài squat, clean & jerk mà không gặp bất kỳ lực cản nào.',
      en: 'Zero-seam compressive upper paired with mobile performance shorts designed for unlimited range of motion under heavy barbells.'
    },
    items: {
      top: INITIAL_PRODUCTS[1], // compression tee
      bottom: INITIAL_PRODUCTS[2], // shorts
      accessory: INITIAL_PRODUCTS[5] // water bottle
    },
    bundleDiscountPercent: 15
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-89420',
    createdAt: '2026-04-12 14:30',
    customerName: 'Nguyễn Huy Hoàng',
    phone: '0988 567 890',
    address: 'Landmark 81, Bình Thạnh, TP. Hồ Chí Minh',
    items: [
      {
        id: 'prod-001-L-#1c1d22',
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        color: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1
      },
      {
        id: 'prod-003-M-#374151',
        product: INITIAL_PRODUCTS[2],
        size: 'M',
        color: INITIAL_PRODUCTS[2].colors[0],
        quantity: 1
      }
    ],
    subtotal: 1440000,
    discount: 120000,
    shippingFee: 0,
    total: 1320000,
    paymentMethod: 'vietqr',
    paymentStatus: 'paid',
    orderStatus: 'shipping',
    trackingNumber: 'VN-AERO-99824',
    carrier: 'AEROSTRIKE Express Logistics',
    estimatedDelivery: 'Hôm nay, trước 18:00',
    earnedPoints: 132,
    trackingSteps: [
      {
        title: 'Đã nhận đơn hàng',
        description: 'Đơn hàng được khởi tạo thành công trên hệ thống AEROSTRIKE.',
        timestamp: '14:30 - 12/04',
        completed: true
      },
      {
        title: 'Hoàn tất đóng gói kiểm định',
        description: 'Kho phân loại AEROSTRIKE kiểm tra tem QR và đóng hộp cao cấp.',
        timestamp: '16:15 - 12/04',
        completed: true
      },
      {
        title: 'Đang vận chuyển trên đường',
        description: 'Kiện hàng đã rời kho trung chuyển Tân Bình và đang giao đến Bình Thạnh.',
        timestamp: '09:40 - Hôm nay',
        completed: true,
        current: true
      },
      {
        title: 'Giao hàng thành công',
        description: 'Bàn giao trực tiếp và ký nhận của quý khách.',
        timestamp: 'Dự kiến 17:30',
        completed: false
      }
    ]
  }
];
