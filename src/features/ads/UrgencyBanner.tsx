import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { icon: '🔥', text: '¡158 personas están viendo esto ahora!', color: 'from-brand-orange to-brand-red' },
  { icon: '⚡', text: '¡Solo quedan 3 unidades en stock!', color: 'from-brand-pink to-brand-purple' },
  { icon: '🚚', text: 'Envío GRATIS en compras sobre $30.000', color: 'from-brand-green to-brand-cyan' },
  { icon: '💎', text: '¡Oferta VIP: 40% OFF en seleccionados!', color: 'from-brand-blue to-brand-purple' },
  { icon: '⏰', text: 'La oferta termina en 2 horas 14 min', color: 'from-brand-yellow to-brand-orange' },
];

export default function UrgencyBanner() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const msg = messages[current];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-[120px] sm:top-[68px] left-0 right-0 z-[55] bg-gradient-to-r ${msg.color} py-2 px-4`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 relative">
          <span className="text-lg">{msg.icon}</span>
          <p className="text-xs sm:text-sm font-bold text-white text-center">
            {msg.text}
          </p>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-0 p-1 rounded-full hover:bg-white/20 transition-all"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
