import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const banners = [
  {
    title: '¡MEGA OFERTAS!',
    subtitle: 'Hasta 50% de descuento en todo',
    emoji: '🔥',
    gradient: 'from-brand-pink via-brand-purple to-brand-blue',
    cta: 'Ver ofertas',
  },
  {
    title: 'TECH FEST',
    subtitle: 'Los últimos gadgets al mejor precio',
    emoji: '📱',
    gradient: 'from-brand-blue via-brand-cyan to-brand-green',
    cta: 'Explorar tech',
  },
  {
    title: 'FOOD LOVERS',
    subtitle: 'Tu comida favorita con delivery gratis',
    emoji: '🍔',
    gradient: 'from-brand-orange via-brand-red to-brand-pink',
    cta: 'Pedir ahora',
  },
  {
    title: 'FASHION WEEK',
    subtitle: 'Las tendencias que son furor en Chile',
    emoji: '👟',
    gradient: 'from-brand-purple via-brand-pink to-brand-orange',
    cta: 'Ver moda',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[current];

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className={`relative bg-gradient-to-r ${banner.gradient} p-6 sm:p-8 min-h-[140px] sm:min-h-[160px] flex items-center`}
          >
            {/* Decorative circles */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -right-4 -bottom-8 w-24 h-24 bg-white/5 rounded-full" />
            <div className="absolute left-1/2 -top-6 w-20 h-20 bg-white/5 rounded-full" />

            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="text-yellow-300" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Oferta especial
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 font-poppins">
                {banner.title}
              </h2>
              <p className="text-sm text-white/80 mb-3">{banner.subtitle}</p>
              <button className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-white/30 transition-all active:scale-95">
                {banner.cta} →
              </button>
            </div>

            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl sm:text-6xl"
            >
              {banner.emoji}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all active:scale-90"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all active:scale-90"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
