# AEROSTRIKE Athletics | Cửa Hàng Thời Trang & Đồ Thể Thao Cao Cấp

Nền tảng thương mại điện tử chuyên nghiệp dành cho đồ thể thao và thời trang năng động (Quần, áo nén cơ, áo khoác gió, giày chạy Carbon plate, phụ kiện), tích hợp thử đồ ảo AR, gợi ý phối đồ AI, đo kích thước chính xác, theo dõi vận đơn thời gian thực và cổng quản trị người bán.

---

## ⚡ Tính Năng Nổi Bật (Key Features)

1. **Thử Đồ Ảo AR Qua Camera (AR Virtual Fitting Room)**:
   - Truy cập webcam máy tính / điện thoại thời gian thực để chiếu trang phục thể thao trực tiếp lên cơ thể.
   - Chế độ người mẫu vận động viên (Nam / Nữ) chuyên nghiệp.
   - Tùy chỉnh tỷ lệ (Scale), vị trí cao/thấp (Offset Y), độ co giãn vải theo từng size (S, M, L, XL, 2XL) và chụp ảnh Lookbook.

2. **AI Stylist - Gợi Ý Phối Đồ Thông Minh**:
   - Tự động đồng bộ combo 3 món (Áo + Quần + Giày/Phụ kiện) theo mục tiêu tập luyện (Chạy Marathon 42K, Tập Gym cơ bắp, Dã ngoại leo núi).
   - Tích hợp nút 1-click **Mua trọn bộ trang phục** với ưu đãi tự động giảm 15% nguyên combo.

3. **Máy Tính Kích Thước Chuẩn Xác AI (AI Precision Fit Calculator)**:
   - Tính toán dựa trên chiều cao, cân nặng, số đo vòng ngực, vòng eo và sở thích độ ôm (Nén cơ Tight, Tiêu chuẩn Regular, Thoải mái Loose).
   - Hiển thị tỷ lệ chuẩn xác (% Confidence Match) và bảng kích cỡ đối chiếu chi tiết.

4. **Thanh Toán Đa Phương Thức An Toàn**:
   - **VietQR / Napas247**: Mã QR động kèm thông tin chuyển khoản ngân hàng và nút sao chép nhanh.
   - **Ví điện tử MoMo / ZaloPay**: Quét mã hoặc liên kết ví.
   - **Thẻ quốc tế (Visa / Mastercard)**: Giao diện mô phỏng thẻ tương tác thực tế.
   - **COD**: Thanh toán tiền mặt khi nhận hàng.

5. **Theo Dõi Đơn Hàng Vận Chuyển Thời Gian Thực (Shipment Radar)**:
   - Bản đồ radar lộ trình từ Kho tổng -> Phân loại -> Bưu tá đang giao -> Giao thành công.
   - Nhật ký hành trình theo từng mốc thời gian, mã vận đơn và hotline liên hệ bưu tá.

6. **Hệ Thống Hội Viên VIP & Tích Điểm SportPoints**:
   - 4 Hạng hội viên: Bronze, Silver, Gold, Platinum VIP.
   - Tích lũy điểm tự động (+1 điểm cho mỗi 10.000₫ thanh toán).
   - Sàn đổi điểm lấy Voucher giảm giá (50.000₫, 120.000₫, 250.000₫).

7. **Chia Sẻ Mạng Xã Hội (Social Sharing Component)**:
   - Chia sẻ trực tiếp lên **Facebook**, **Instagram**, **X (Twitter)**, **Zalo**, **WhatsApp**.
   - Sao chép link 1-chạm (Copy to clipboard) và hỗ trợ Web Share API trên thiết bị di động.

8. **So Sánh Sản Phẩm & Đánh Giá Chi Tiết**:
   - Đối chiếu ma trận thông số kỹ thuật (Chất liệu, độ thoáng khí, độ co giãn 4-way stretch, trọng lượng).
   - Đánh giá từ người mua kèm thông số chiều cao, cân nặng thực tế.

9. **Cổng Quản Trị Người Bán (Merchant Admin Portal)**:
   - Thống kê doanh thu, số lượng đơn hàng, AOV.
   - Quản lý vận đơn: cập nhật trạng thái đơn hàng (Chờ xác nhận, Đang giao, Đã giao) - đồng bộ trực tiếp với radar của khách hàng.
   - Quản lý kho hàng: sửa giá, cập nhật số lượng tồn kho, thêm sản phẩm mới.

10. **Hỗ Trợ Song Ngữ (Bilingual)**:
    - Chuyển đổi 1-click giữa **Tiếng Việt** và **English**.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: React 19 (TypeScript)
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations & Interactions**: Motion (Framer Motion)
- **Camera & Media**: HTML5 MediaDevices API & Web Share API

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Setup)

### 1. Cài đặt Dependencies:
```bash
npm install
```

### 2. Khởi chạy Server Phát Triển:
```bash
npm run dev
```
Mở trình duyệt tại địa chỉ: `http://localhost:3000`

### 3. Build Production:
```bash
npm run build
```

---

## 📦 Cách Đưa Lên GitHub (How to Push to GitHub)

Repository đã được khởi tạo sẵn git. Để đưa toàn bộ mã nguồn lên GitHub của bạn:

1. **Tạo một Repository mới** trên [GitHub](https://github.com/new) (ví dụ đặt tên là `aerostrike-athletics`), không cần tích chọn "Initialize with README".
2. **Chạy các lệnh sau trong terminal**:

```bash
# Đổi tên nhánh sang main
git branch -M main

# Liên kết với repository GitHub của bạn (thay thế URL bằng link repo của bạn)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/aerostrike-athletics.git

# Đẩy toàn bộ mã nguồn lên GitHub
git push -u origin main
```

---

## 📁 Cấu Trúc Dự Án (Project Structure)

```
├── src/
│   ├── assets/images/       # Ảnh sản phẩm chất lượng cao và ảnh chiến dịch
│   ├── components/          # Toàn bộ components chức năng:
│   │   ├── AIOutfitCoordinator.tsx      # Gợi ý phối đồ AI & combo discount
│   │   ├── CheckoutModal.tsx            # Thanh toán đa phương thức (VietQR, MoMo, Visa)
│   │   ├── CustomerSupportChat.tsx      # Trợ lý chat thể thao 24/7
│   │   ├── Footer.tsx                   # Footer chân trang
│   │   ├── Header.tsx                   # Top bar navigation & tools
│   │   ├── HeroSection.tsx              # Banner mở đầu chiến dịch
│   │   ├── MembershipLoyaltyModal.tsx   # Hệ thống VIP & đổi thưởng SportPoints
│   │   ├── MerchantAdminPortal.tsx      # Cổng quản trị người bán
│   │   ├── MobileBottomNav.tsx          # Thanh điều hướng ngón tay cái trên mobile
│   │   ├── OrderTrackingModal.tsx       # Radar theo dõi vận chuyển trực tiếp
│   │   ├── ProductCard.tsx              # Thẻ sản phẩm kèm quick-actions
│   │   ├── ProductCatalog.tsx           # Bộ lọc danh mục, bộ môn, tìm kiếm
│   │   ├── ProductComparisonModal.tsx   # Ma trận so sánh sản phẩm
│   │   ├── ProductDetailModal.tsx       # Trang chi tiết sản phẩm đầy đủ
│   │   ├── SmartCartDrawer.tsx          # Giỏ hàng thông minh & thanh freeship
│   │   ├── SmartSizeCalculator.tsx      # Đo size chuẩn xác theo số đo cơ thể
│   │   ├── SocialShareComponent.tsx     # Chia sẻ Facebook, IG, X, Zalo, Copy Link
│   │   └── VirtualFittingRoom.tsx       # Phòng thử đồ ảo AR qua Camera
│   ├── context/
│   │   └── StoreContext.tsx # Quản lý toàn bộ State toàn cục (Giỏ hàng, Đơn hàng, VIP, Admin)
│   ├── data/
│   │   └── mockData.ts      # Dữ liệu sản phẩm, outfit mẫu, vouchers, đơn hàng ban đầu
│   ├── types/
│   │   └── index.ts         # Khai báo TypeScript types toàn diện
│   ├── utils/
│   │   └── i18n.ts          # Từ điển song ngữ Tiếng Việt & English
│   ├── App.tsx              # Component trung tâm kết nối các module
│   ├── index.css            # Cấu hình Tailwind CSS và font chữ thể thao
│   └── main.tsx             # Entry point React
├── index.html               # Cấu trúc HTML & Google Fonts
├── package.json             # Danh sách thư viện & scripts
├── tsconfig.json            # Cấu hình TypeScript
└── vite.config.ts           # Cấu hình Vite
```

---
© 2026 AEROSTRIKE Athletics Inc.
