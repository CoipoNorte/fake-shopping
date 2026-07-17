import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Sparkles, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { playClickSound } from '../../utils/sounds';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, toggleCart, wallet, searchQuery, setSearchQuery, totalPurchases } = useStore();
  const count = cartCount();
  const [showSearch, setShowSearch] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
    }
  }, [count]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl"
            >
              ✨
            </motion.div>
            <div>
              <h1 className="text-lg font-extrabold font-poppins gradient-text leading-tight">
                CompraFeliz
              </h1>
              <p className="text-[10px] text-dark-muted leading-none">
                Compra sin gastar 💸
              </p>
            </div>
          </div>

          {/* Wallet */}
          <div className="hidden sm:flex items-center gap-2 bg-dark-surface rounded-full px-3 py-1.5 border border-dark-border">
            <span className="text-sm">💰</span>
            <div className="text-right">
              <p className="text-[10px] text-dark-muted leading-none">Billetera virtual</p>
              <p className="text-xs font-bold text-brand-green">{formatPrice(wallet)}</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button
              onClick={() => {
                playClickSound();
                setShowSearch(!showSearch);
              }}
              className="relative p-2.5 rounded-xl bg-dark-surface border border-dark-border hover:border-brand-purple transition-all active:scale-90"
            >
              <Search size={18} className="text-dark-muted" />
            </button>

            {/* Purchase counter */}
            {totalPurchases > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="hidden sm:flex items-center gap-1 bg-dark-surface rounded-full px-3 py-1.5 border border-brand-pink/30"
              >
                <Sparkles size={14} className="text-brand-pink" />
                <span className="text-xs font-bold text-brand-pink">{totalPurchases}</span>
              </motion.div>
            )}

            {/* Cart button */}
            <button
              onClick={() => {
                playClickSound();
                toggleCart();
              }}
              className={`relative p-2.5 rounded-xl bg-dark-surface border border-dark-border hover:border-brand-purple transition-all active:scale-90 ${
                cartBounce ? 'animate-cart-bounce' : ''
              }`}
            >
              <ShoppingCart size={18} className="text-dark-muted" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-pink to-brand-purple text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-brand-pink/30"
                  >
                    {count > 99 ? '99+' : count}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-3 flex gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-dark-surface border border-dark-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-brand-purple transition-colors"
                  />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2.5 rounded-xl bg-dark-surface border border-dark-border hover:border-brand-pink transition-all"
                  >
                    <X size={16} className="text-dark-muted" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile wallet bar */}
      <div className="sm:hidden border-t border-dark-border/50">
        <div className="px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">💰</span>
            <span className="text-[11px] font-bold text-brand-green">{formatPrice(wallet)}</span>
          </div>
          {totalPurchases > 0 && (
            <div className="flex items-center gap-1">
              <Sparkles size={11} className="text-brand-pink" />
              <span className="text-[11px] font-bold text-brand-pink">{totalPurchases} compras</span>
            </div>
          )}
          <span className="text-[10px] text-dark-muted">Dinero virtual ∞</span>
        </div>
      </div>
    </header>
  );
}
