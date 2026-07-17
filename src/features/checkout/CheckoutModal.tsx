import { useState } from 'react';
import { X, CreditCard, MapPin, User, Mail, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { playClickSound, playCheckoutSound } from '../../utils/sounds';
import { fireConfetti, fireStars } from '../../utils/confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutModal() {
  const {
    showCheckout,
    setShowCheckout,
    cartTotal,
    cartCount,
    cartSavings,
    clearCart,
    incrementPurchases,
    wallet,
    setWallet,
    setShowSuccess,
  } = useStore();

  const [step, setStep] = useState(0); // 0: form, 1: processing, 2: done
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    card: '',
  });

  const total = cartTotal();
  const count = cartCount();
  const savings = cartSavings();

  const handlePurchase = () => {
    playClickSound();
    setStep(1);

    // Simulate processing
    setTimeout(() => {
      playCheckoutSound();
      fireConfetti();
      setTimeout(() => fireStars(), 500);
      setTimeout(() => fireConfetti(), 1000);

      incrementPurchases();
      setWallet(wallet - total);
      clearCart();
      setStep(0);
      setShowCheckout(false);
      setShowSuccess(true);

      setFormData({ name: '', email: '', address: '', card: '' });
    }, 2500);
  };

  if (!showCheckout) return null;

  return (
    <AnimatePresence>
      {showCheckout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => {
            if (step === 0) {
              setShowCheckout(false);
            }
          }}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-lg bg-dark-card rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            {step === 1 ? (
              // Processing
              <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="mb-6"
                >
                  <Loader2 size={48} className="text-brand-purple" />
                </motion.div>
                <h3 className="text-xl font-bold text-dark-text mb-2">Procesando compra...</h3>
                <p className="text-sm text-dark-muted text-center">
                  Validando tu pago virtual 💳✨
                </p>

                {/* Fake progress bar */}
                <div className="w-full max-w-xs mt-6 bg-dark-surface rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.3, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-brand-pink to-brand-purple rounded-full"
                  />
                </div>

                <div className="mt-4 space-y-1 text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs text-dark-muted"
                  >
                    ✅ Verificando fondos virtuales...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-xs text-dark-muted"
                  >
                    ✅ Reservando productos...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-xs text-dark-muted"
                  >
                    ✅ Generando pedido...
                  </motion.p>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-dark-border">
                  <div>
                    <h2 className="text-lg font-bold text-dark-text">Checkout</h2>
                    <p className="text-xs text-dark-muted">
                      {count} {count === 1 ? 'producto' : 'productos'} • Compra simulada
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="p-2 rounded-xl bg-dark-surface text-dark-muted hover:text-dark-text transition-all active:scale-90"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Form */}
                <div className="p-5 space-y-4">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-dark-text mb-1.5">
                      <User size={14} className="text-brand-purple" />
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre aquí"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-brand-purple transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-dark-text mb-1.5">
                      <Mail size={14} className="text-brand-blue" />
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-brand-purple transition-colors"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-dark-text mb-1.5">
                      <MapPin size={14} className="text-brand-green" />
                      Dirección de envío
                    </label>
                    <input
                      type="text"
                      placeholder="Santiago, Chile"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-brand-purple transition-colors"
                    />
                  </div>

                  {/* Card */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-dark-text mb-1.5">
                      <CreditCard size={14} className="text-brand-pink" />
                      Tarjeta virtual
                    </label>
                    <input
                      type="text"
                      placeholder="**** **** **** ****"
                      value={formData.card}
                      onChange={(e) => setFormData({ ...formData, card: e.target.value })}
                      className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-brand-purple transition-colors"
                    />
                  </div>

                  {/* Order summary */}
                  <div className="bg-dark-surface rounded-2xl p-4 border border-dark-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-muted">Subtotal</span>
                      <span className="text-sm font-semibold text-dark-text">{formatPrice(total)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-muted">Envío</span>
                      <span className="text-sm font-semibold text-brand-green">GRATIS 🎁</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-muted">Descuento</span>
                      <span className="text-sm font-semibold text-brand-pink">-{formatPrice(savings)}</span>
                    </div>
                    <div className="border-t border-dark-border pt-2 flex items-center justify-between">
                      <span className="text-base font-bold text-dark-text">Total</span>
                      <span className="text-xl font-black gradient-text">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Purchase button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePurchase}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-green to-brand-cyan text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-brand-green/30 transition-all animate-pulse-glow"
                  >
                    💳 Comprar ahora — {formatPrice(total)}
                  </motion.button>

                  <p className="text-[10px] text-dark-muted text-center">
                    🎮 Compra 100% simulada • No se requiere tarjeta real • ¡Solo dopamina!
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
