import { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import { products, formatPrice } from '../../data/products';
import { useStore } from '../../store/useStore';
import { playAddToCartSound } from '../../utils/sounds';
import { fireSideConfetti } from '../../utils/confetti';
import { motion } from 'framer-motion';

export default function FlashDeals() {
  const { addToCart } = useStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 56 });

  // Top deals - products with highest discount, pick diverse categories
  const topDeals = [...products]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(product);
    playAddToCartSound();
    fireSideConfetti();
  };

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <Zap size={20} className="text-brand-yellow fill-brand-yellow" />
          </motion.div>
          <h2 className="text-lg font-extrabold text-dark-text font-poppins">
            Flash Deals
          </h2>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 bg-dark-surface rounded-full px-3 py-1.5 border border-brand-red/30">
          <Clock size={12} className="text-brand-red" />
          <div className="flex items-center gap-0.5">
            {[
              String(timeLeft.hours).padStart(2, '0'),
              String(timeLeft.minutes).padStart(2, '0'),
              String(timeLeft.seconds).padStart(2, '0'),
            ].map((unit, i) => (
              <span key={i} className="flex items-center">
                <span className="bg-brand-red/20 text-brand-red text-[11px] font-mono font-bold px-1.5 py-0.5 rounded">
                  {unit}
                </span>
                {i < 2 && <span className="text-brand-red text-xs mx-0.5">:</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
        <div className="flex gap-3 min-w-max">
          {topDeals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-36 shrink-0 bg-dark-card rounded-2xl overflow-hidden border border-dark-border hover:border-brand-yellow/30 transition-all group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Discount badge */}
                <div className="absolute top-1.5 left-1.5 bg-brand-red text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Zap size={10} />
                  -{product.discount}%
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5">
                <h4 className="text-xs font-bold text-dark-text line-clamp-1 mb-1">{product.name}</h4>
                <p className="text-[10px] text-dark-muted line-through">{formatPrice(product.originalPrice)}</p>
                <p className="text-sm font-black text-brand-green mb-2">{formatPrice(product.price)}</p>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuickAdd(product)}
                  className="w-full py-1.5 rounded-lg bg-gradient-to-r from-brand-yellow to-brand-orange text-white text-xs font-bold transition-all active:shadow-none shadow-md shadow-brand-orange/20"
                >
                  ⚡ Agregar
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
