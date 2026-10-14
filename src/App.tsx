import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VirtualFittingRoom } from './components/VirtualFittingRoom';
import { SmartSizeCalculator } from './components/SmartSizeCalculator';
import { AIOutfitCoordinator } from './components/AIOutfitCoordinator';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { SmartCartDrawer } from './components/SmartCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { MembershipLoyaltyModal } from './components/MembershipLoyaltyModal';
import { CustomerSupportChat } from './components/CustomerSupportChat';
import { MerchantAdminPortal } from './components/MerchantAdminPortal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { viewMode, toastMessage } = useStore();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3">
          <div className="rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-950 shadow-2xl shadow-amber-400/30 flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {viewMode === 'admin' ? (
        <MerchantAdminPortal />
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <HeroSection />
            <ProductCatalog />
          </main>
          <Footer />
          <MobileBottomNav />
        </>
      )}

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <VirtualFittingRoom />
      <SmartSizeCalculator />
      <AIOutfitCoordinator />
      <ProductComparisonModal />
      <SmartCartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <MembershipLoyaltyModal />

      {/* 24/7 Live Support Chat Widget */}
      <CustomerSupportChat />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
