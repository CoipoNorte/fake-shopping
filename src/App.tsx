import Header from './features/header/Header';
import HeroBanner from './features/hero/HeroBanner';
import CategoryBar from './features/categories/CategoryBar';
import FlashDeals from './features/deals/FlashDeals';
import ProductGrid from './features/products/ProductGrid';
import ProductDetail from './features/products/ProductDetail';
import CartDrawer from './features/cart/CartDrawer';
import FloatingCartButton from './features/cart/FloatingCartButton';
import CheckoutModal from './features/checkout/CheckoutModal';
import SuccessScreen from './features/checkout/SuccessScreen';
import ParticleBackground from './features/effects/ParticleBackground';
import AdModal from './features/ads/AdModal';
import UrgencyBanner from './features/ads/UrgencyBanner';
import NewsletterAd from './features/ads/NewsletterAd';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg relative">
      {/* Background effects */}
      <ParticleBackground />

      {/* Header */}
      <Header />

      {/* Urgency Banner */}
      <UrgencyBanner />

      {/* Main content */}
      <main className="relative z-10 pt-[148px] sm:pt-[104px]">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Category Bar */}
        <CategoryBar />

        {/* Flash Deals */}
        <FlashDeals />

        {/* Section Title */}
        <div className="px-4 pt-2 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛍️</span>
            <h2 className="text-xl font-extrabold text-dark-text font-poppins">
              Todos los productos
            </h2>
          </div>
          <p className="text-sm text-dark-muted mt-0.5 ml-8">
            Compra lo que quieras, ¡es gratis! 😄
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </main>

      {/* Modals & Overlays */}
      <ProductDetail />
      <CartDrawer />
      <CheckoutModal />
      <SuccessScreen />
      <FloatingCartButton />

      {/* Ads */}
      <AdModal />
      <NewsletterAd />

      {/* Footer disclaimer */}
      <footer className="relative z-10 pb-28 sm:pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center py-6 border-t border-dark-border">
          <p className="text-xs text-dark-muted mb-1">
            🎮 CompraFeliz — Compras simuladas para tu dopamina
          </p>
          <p className="text-[10px] text-dark-muted/60">
            No se cobra dinero real • Inspirado en la cultura de compras coreana • Hecho con 💜 en Chile
          </p>
        </div>
      </footer>
    </div>
  );
}
