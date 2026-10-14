import React, { useState } from 'react';
import { 
  Store, 
  DollarSign, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Check, 
  Truck, 
  Clock, 
  X,
  Search
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus, Product, Category, SportDiscipline } from '../types';

export const MerchantAdminPortal: React.FC = () => {
  const { 
    products, 
    addProduct, 
    editProduct, 
    deleteProduct, 
    updateStock, 
    orders, 
    updateOrderStatus, 
    formatPrice, 
    setViewMode, 
    lang, 
    t, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | OrderStatus>('all');
  const [productSearch, setProductSearch] = useState('');

  // Add product modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNameVi, setNewNameVi] = useState('');
  const [newNameEn, setNewNameEn] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('tops');
  const [newSport, setNewSport] = useState<SportDiscipline>('running');
  const [newPrice, setNewPrice] = useState(650000);
  const [newStock, setNewStock] = useState(50);
  const [newMaterial, setNewMaterial] = useState('85% Recycled Polyester, 15% Spandex');

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const totalStockUnits = products.reduce((sum, p) => sum + p.inStock, 0);

  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.orderStatus !== orderFilter) return false;
    return true;
  });

  const filteredProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.name.vi.toLowerCase().includes(q) || p.name.en.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNameVi.trim() || !newPrice) return;

    const newProd: Product = {
      id: `prod-${Date.now().toString().slice(-4)}`,
      name: {
        vi: newNameVi.trim(),
        en: newNameEn.trim() || newNameVi.trim()
      },
      category: newCategory,
      sport: newSport,
      price: Number(newPrice),
      originalPrice: Number(newPrice) * 1.25,
      rating: 5.0,
      reviewsCount: 1,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Obsidian Black', hex: '#111827' },
        { name: 'Volt Glow', hex: '#ccff00' }
      ],
      image: '/src/assets/images/product_pro_compression_tee_1791968308695.jpg',
      gallery: ['/src/assets/images/product_pro_compression_tee_1791968308695.jpg'],
      description: {
        vi: 'Sản phẩm thể thao hiệu năng cao vừa được bổ sung vào kho AEROSTRIKE.',
        en: 'High-performance athletic gear recently added to the AEROSTRIKE inventory.'
      },
      specs: {
        material: newMaterial,
        breathabilityScore: 9.4,
        stretchFactor: '4-Way Elastic',
        weightGrams: 160,
        technology: ['AirFlow 360', 'AntiBacterial Guard'],
        careInstructions: 'Giặt máy ở nhiệt độ thấp.'
      },
      inStock: Number(newStock),
      isNewArrival: true,
      reviews: []
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
    setNewNameVi('');
    setNewNameEn('');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Top Bar with Back to Storefront button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-bold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('backToStore')}</span>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
                <span>{t('adminTitle')}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400 text-neutral-950 font-black">
                  PRO SELLER
                </span>
              </h1>
              <p className="text-xs text-neutral-400">{t('adminSubtitle')}</p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>{t('addNewProduct')}</span>
          </button>
        </div>

        {/* KPI Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>{t('totalRevenue')}</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white font-mono tabular-nums">
              {formatPrice(totalRevenue)}
            </p>
            <p className="text-[11px] text-emerald-400 font-mono">+18.4% so với tuần trước</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>{t('totalOrders')}</span>
              <ShoppingBag className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white font-mono tabular-nums">
              {totalOrdersCount}
            </p>
            <p className="text-[11px] text-neutral-400 font-mono">100% tỷ lệ hoàn thành</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>{t('averageOrderValue')}</span>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-black text-white font-mono tabular-nums">
              {formatPrice(aov)}
            </p>
            <p className="text-[11px] text-neutral-400 font-mono">Combo 2-3 món/đơn</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>{t('activeStock')}</span>
              <Package className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-2xl font-black text-white font-mono tabular-nums">
              {totalStockUnits} chiếc
            </p>
            <p className="text-[11px] text-neutral-400 font-mono">{products.length} danh mục SKU</p>
          </div>

        </div>

        {/* Section Tabs: Orders vs Inventory */}
        <div className="flex items-center gap-3 border-b border-neutral-900 pb-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'text-neutral-400 hover:text-white bg-neutral-900'
            }`}
          >
            {t('orderManagement')} ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'inventory'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'text-neutral-400 hover:text-white bg-neutral-900'
            }`}
          >
            {t('productManagement')} ({products.length})
          </button>
        </div>

        {/* Orders Fulfillment Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
              <span className="text-neutral-500 font-semibold">Lọc trạng thái:</span>
              {(['all', 'pending', 'confirmed', 'shipping', 'delivered'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    orderFilter === st
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'Tất cả' : t(`status${st.charAt(0).toUpperCase() + st.slice(1)}` as any)}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/40">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Mã đơn & Ngày</th>
                    <th className="p-4">Khách hàng</th>
                    <th className="p-4">Sản phẩm</th>
                    <th className="p-4">Tổng tiền & PTTT</th>
                    <th className="p-4">Trạng thái vận đơn</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-neutral-900/50">
                      <td className="p-4 font-mono">
                        <span className="font-bold text-white block">{ord.id}</span>
                        <span className="text-[11px] text-neutral-500">{ord.createdAt}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-white block">{ord.customerName}</span>
                        <span className="text-neutral-400 font-mono text-[11px]">{ord.phone}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-white block">{ord.items.length} món</span>
                        <span className="text-neutral-500 text-[11px] truncate block max-w-xs">
                          {ord.items.map(i => `${i.product.name.vi} (${i.size})`).join(', ')}
                        </span>
                      </td>

                      <td className="p-4 font-mono">
                        <span className="font-bold text-amber-400 block tabular-nums">{formatPrice(ord.total)}</span>
                        <span className="uppercase text-[10px] text-neutral-500">{ord.paymentMethod} ({ord.paymentStatus})</span>
                      </td>

                      <td className="p-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-bold focus:outline-none ${
                            ord.orderStatus === 'delivered'
                              ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                              : ord.orderStatus === 'shipping'
                              ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300'
                              : 'border-amber-500/40 bg-amber-950/40 text-amber-300'
                          }`}
                        >
                          <option value="pending">{t('statusPending')}</option>
                          <option value="confirmed">{t('statusConfirmed')}</option>
                          <option value="shipping">{t('statusShipping')}</option>
                          <option value="delivered">{t('statusDelivered')}</option>
                          <option value="cancelled">{t('statusCancelled')}</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <span className="text-[11px] text-neutral-500 font-mono block">
                          Vận đơn: {ord.trackingNumber}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            
            {/* Search SKU input */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Tìm mã SKU hoặc tên sản phẩm..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-9 pr-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/40">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Sản phẩm</th>
                    <th className="p-4">Phân loại & Bộ môn</th>
                    <th className="p-4">Giá bán niêm yết</th>
                    <th className="p-4">Tồn kho hiện tại</th>
                    <th className="p-4 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-900/50">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.image} alt={p.name.vi} className="h-10 w-10 rounded-lg object-cover bg-neutral-950 shrink-0" />
                        <div>
                          <span className="font-bold text-white block">{p.name.vi}</span>
                          <span className="text-neutral-500 font-mono text-[11px]">SKU: {p.id}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-white uppercase text-[11px] block">{p.category}</span>
                        <span className="text-neutral-500 capitalize">{p.sport}</span>
                      </td>

                      <td className="p-4 font-mono font-bold text-amber-400">
                        {formatPrice(p.price)}
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          value={p.inStock}
                          onChange={(e) => updateStock(p.id, Number(e.target.value))}
                          className="w-20 rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1 font-mono text-xs text-white focus:border-amber-400 focus:outline-none"
                        />
                        <span className="text-[11px] text-neutral-500 ml-1.5">cái</span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="rounded-lg p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-neutral-800 transition-colors"
                          title={t('deleteProduct')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-neutral-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-white font-display">{t('addNewProduct')}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Tên sản phẩm (Tiếng Việt) *</label>
                <input
                  type="text"
                  value={newNameVi}
                  onChange={(e) => setNewNameVi(e.target.value)}
                  placeholder="VD: Áo Thun Chạy Bộ Siêu Thoáng AERO-SPEED"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Tên sản phẩm (English)</label>
                <input
                  type="text"
                  value={newNameEn}
                  onChange={(e) => setNewNameEn(e.target.value)}
                  placeholder="E.g. AERO-SPEED Ultra Ventilated Running Tee"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Danh mục</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Category)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-2 text-white"
                  >
                    <option value="tops">Áo (Tops)</option>
                    <option value="bottoms">Quần (Bottoms)</option>
                    <option value="footwear">Giày (Footwear)</option>
                    <option value="accessories">Phụ kiện (Accessories)</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Bộ môn thể thao</label>
                  <select
                    value={newSport}
                    onChange={(e) => setNewSport(e.target.value as SportDiscipline)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-2 text-white"
                  >
                    <option value="running">Chạy bộ</option>
                    <option value="gym_training">Gym & Fitness</option>
                    <option value="outdoor">Dã ngoại / Trail</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Giá bán (VND) *</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Số lượng tồn kho ban đầu</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Chất liệu vải công nghệ</label>
                <input
                  type="text"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white"
                />
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-neutral-400 hover:text-white"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-400 px-4 py-2 font-black text-neutral-950 hover:bg-amber-300"
                >
                  {t('saveChanges')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
