import { useEffect, useState } from 'react';
import { X, Clock, Flame, ShoppingCart, Zap } from 'lucide-react';
import { products, formatPrice } from '../../data/products';
import { useStore } from '../../store/useStore';
import { playPopSound, playClickSound } from '../../utils/sounds';
import { fireSideConfetti } from '../../utils/confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdModal() {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  // Pick a random high-discount product
  const adProduct = products.sort((a, b) => b.discount - a.discount)[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      playPopSound();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const handleAdd = () => {
    addToCart(adProduct);
    playClickSound();
    fireSideConfetti();
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setShow(false);
    }, 1500);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-dark-card rounded-3xl overflow-hidden border-2 border-brand-pink shadow-2xl shadow-brand-pink/30"
          >
            {/* Close */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            >
              <X size={16} />
            </button>

            {/* Ad badge */}
            <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-brand-pink to-brand-red text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
              <Flame size={12} />
              OFERTA FLASH
            </div>

            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={adProduct.image}
                alt={adProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />

              {/* Discount overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-brand-red/90 backdrop-blur-sm text-white text-2xl font-black px-4 py-2 rounded-2xl text-center shadow-lg">
                  -{adProduct.discount}% OFF
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-extrabold text-dark-text mb-1 font-poppins">
                {adProduct.name}
              </h3>
              <p className="text-xs text-dark-muted mb-3">{adProduct.description}</p>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2 bg-brand-red/10 rounded-xl p-3 mb-3 border border-brand-red/20">
                <Clock size={16} className="text-brand-red" />
                <span className="text-sm font-bold text-brand-red">
                  Termina en {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center gap-3 mb-4">
                <span className="text-sm text-dark-muted line-through">{formatPrice(adProduct.originalPrice)}</span>
                <span className="text-2xl font-black text-brand-green">{formatPrice(adProduct.price)}</span>
              </div>

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-brand-green'
                    : 'bg-gradient-to-r from-brand-pink to-brand-purple animate-pulse-glow'
                }`}
              >
                {added ? (
                  <>
                    <Zap size={18} />
                    ¡Agregado!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Agregar al carrito AHORA
                  </>
                )}
              </motion.button>

              <p className="text-[10px] text-dark-muted text-center mt-2">
                🎮 Compra simulada • No se cobra dinero real
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
