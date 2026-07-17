import { ShoppingCart } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { playClickSound } from '../../utils/sounds';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCartButton() {
  const { cartCount, cartTotal, toggleCart, showCart, showCheckout, showSuccess, selectedProduct } = useStore();
  const count = cartCount();
  const total = cartTotal();

  // Don't show if any modal is open or cart is empty
  if (count === 0 || showCart || showCheckout || showSuccess || selectedProduct) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClickSound();
          toggleCart();
        }}
        className="fixed bottom-6 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-auto sm:bottom-8 bg-gradient-to-r from-brand-pink to-brand-purple text-white rounded-2xl py-3.5 px-5 flex items-center justify-between sm:justify-center gap-3 shadow-2xl shadow-brand-purple/40 animate-pulse-glow"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-white text-brand-purple text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {count > 9 ? '9+' : count}
            </span>
          </div>
          <span className="font-bold text-sm">Ver carrito</span>
        </div>
        <span className="font-black text-sm bg-white/20 rounded-lg px-3 py-1">
          {formatPrice(total)}
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
