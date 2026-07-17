import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { playWinSound } from '../../utils/sounds';
import { fireConfetti, fireSideConfetti, fireStars } from '../../utils/confetti';
import { motion, AnimatePresence } from 'framer-motion';

const celebrationEmojis = ['🎉', '🥳', '🎊', '🎈', '✨', '💫', '🌟', '⭐', '🏆', '💎', '🎁', '💖'];

export default function SuccessScreen() {
  const { showSuccess, setShowSuccess, totalPurchases } = useStore();
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; x: number; delay: number }>>([]);

  useEffect(() => {
    if (showSuccess) {
      playWinSound();
      
      // Multiple confetti bursts
      fireConfetti();
      setTimeout(() => fireSideConfetti(), 400);
      setTimeout(() => fireStars(), 800);
      setTimeout(() => fireConfetti(), 1200);
      setTimeout(() => fireSideConfetti(), 1600);

      // Generate floating emojis
      const emojis = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)],
        x: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setFloatingEmojis(emojis);
    }
  }, [showSuccess]);

  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-dark-bg/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          {/* Floating emojis background */}
          {floatingEmojis.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{ y: '-100vh', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 4 + Math.random() * 3,
                delay: item.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
              className="absolute text-3xl pointer-events-none"
              style={{ left: `${item.x}%` }}
            >
              {item.emoji}
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="relative bg-dark-card rounded-3xl p-8 max-w-md w-full border border-brand-purple/30 shadow-2xl shadow-brand-purple/20 text-center"
          >
            {/* Success rings */}
            <div className="relative mb-6 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-7xl"
              >
                🎉
              </motion.div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2.5, opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-24 h-24 rounded-full border-4 border-brand-purple/30"
              />
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 3, opacity: [0, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="absolute w-24 h-24 rounded-full border-4 border-brand-pink/30"
              />
            </div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black gradient-text mb-2 font-poppins"
            >
              ¡COMPRA EXITOSA!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-dark-muted mb-6"
            >
              Tu pedido virtual ha sido procesado 🚀
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-3 mb-6"
            >
              <div className="bg-dark-surface rounded-2xl p-4 border border-dark-border">
                <p className="text-3xl font-black text-brand-purple mb-1">{totalPurchases}</p>
                <p className="text-xs text-dark-muted">Compras totales</p>
              </div>
              <div className="bg-dark-surface rounded-2xl p-4 border border-dark-border">
                <motion.p
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl mb-1"
                >
                  🏆
                </motion.p>
                <p className="text-xs text-dark-muted">¡Eres top!</p>
              </div>
            </motion.div>

            {/* Achievement */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 rounded-2xl p-4 border border-brand-purple/20 mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-2xl"
                >
                  🏅
                </motion.span>
                <span className="text-sm font-bold text-brand-purple">LOGRO DESBLOQUEADO</span>
              </div>
              <p className="text-xs text-dark-muted">
                {totalPurchases === 1
                  ? '¡Primera compra! Bienvenid@ a CompraFeliz'
                  : totalPurchases < 5
                  ? `¡${totalPurchases} compras! Vas por buen camino 🌟`
                  : totalPurchases < 10
                  ? `¡${totalPurchases} compras! Eres un@ comprador/a estrella ⭐`
                  : `¡${totalPurchases} compras! ¡Leyenda del shopping! 👑`}
              </p>
            </motion.div>

            {/* Continue button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSuccess(false)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/30 transition-all"
            >
              ¡Seguir comprando! 🛍️
            </motion.button>

            <p className="text-[10px] text-dark-muted mt-3">
              🎮 Recuerda: Esto es pura diversión, no se cobró nada
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
