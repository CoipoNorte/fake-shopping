import { X, Minus, Plus, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { playClickSound, playRemoveSound, playPopSound } from '../../utils/sounds';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const {
    showCart,
    setShowCart,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    cartSavings,
    setShowCheckout,
  } = useStore();

  const total = cartTotal();
  const count = cartCount();
  const savings = cartSavings();

  return (
    <AnimatePresence>
      {showCart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm"
          onClick={() => setShowCart(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-dark-card border-l border-dark-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dark-border">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <ShoppingBag size={22} className="text-brand-purple" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-dark-text">Mi Carrito</h2>
                  <p className="text-xs text-dark-muted">
                    {count} {count === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={() => {
                      playRemoveSound();
                      clearCart();
                    }}
                    className="text-xs text-dark-muted hover:text-brand-red transition-colors px-2 py-1 rounded-lg hover:bg-brand-red/10"
                  >
                    Vaciar
                  </button>
                )}
                <button
                  onClick={() => {
                    playClickSound();
                    setShowCart(false);
                  }}
                  className="p-2 rounded-xl bg-dark-surface text-dark-muted hover:text-dark-text transition-all active:scale-90"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-lg font-bold text-dark-text mb-2">Carrito vacío</h3>
                  <p className="text-sm text-dark-muted text-center max-w-xs">
                    ¡Agrega productos y disfruta la dopamina de comprar sin gastar! 🎉
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-3 bg-dark-surface rounded-2xl p-3 border border-dark-border"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-dark-text line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-dark-muted line-through">
                            {formatPrice(item.product.originalPrice)}
                          </p>
                          <p className="text-sm font-bold text-brand-green">
                            {formatPrice(item.product.price)}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2 bg-dark-card rounded-lg border border-dark-border">
                              <button
                                onClick={() => {
                                  playClickSound();
                                  updateQuantity(item.product.id, item.quantity - 1);
                                }}
                                className="p-1.5 text-dark-muted hover:text-dark-text active:scale-90 transition-all"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold text-dark-text w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  playPopSound();
                                  updateQuantity(item.product.id, item.quantity + 1);
                                }}
                                className="p-1.5 text-dark-muted hover:text-dark-text active:scale-90 transition-all"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                playRemoveSound();
                                removeFromCart(item.product.id);
                              }}
                              className="p-1.5 rounded-lg text-dark-muted hover:text-brand-red hover:bg-brand-red/10 transition-all active:scale-90"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-dark-border p-4 space-y-3">
                {/* Savings */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-brand-green/10 rounded-xl p-3 border border-brand-green/20"
                >
                  <Sparkles size={16} className="text-brand-green shrink-0" />
                  <p className="text-xs text-brand-green">
                    ¡Estás ahorrando <span className="font-bold">{formatPrice(savings)}</span> en esta compra!
                  </p>
                </motion.div>

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-muted">Total</span>
                  <span className="text-2xl font-black gradient-text">{formatPrice(total)}</span>
                </div>

                {/* Checkout button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playClickSound();
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-all animate-pulse-glow"
                >
                  <ShoppingBag size={20} />
                  Proceder al pago 🎉
                </motion.button>

                <p className="text-[10px] text-dark-muted text-center">
                  💡 Recuerda: No se cobra dinero real
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
