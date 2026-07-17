import { useEffect, useState } from 'react';
import { X, Gift, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playPopSound } from '../../utils/sounds';

export default function NewsletterAd() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      playPopSound();
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = () => {
    if (email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setShow(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-br from-brand-purple via-dark-card to-brand-pink rounded-3xl overflow-hidden border border-brand-purple/40 shadow-2xl"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl" />

            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
            >
              <X size={16} />
            </button>

            <div className="relative p-8 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🎁
              </motion.div>

              <h3 className="text-2xl font-black gradient-text mb-2 font-poppins">
                ¡GANA UN CUPÓN!
              </h3>

              <p className="text-sm text-dark-muted mb-6">
                Suscríbete y recibe un cupón de <span className="text-brand-green font-bold">$50.000</span> para tu próxima compra simulada 🎉
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-brand-green/20 rounded-2xl p-4 border border-brand-green/30"
                >
                  <Sparkles size={24} className="text-brand-green mx-auto mb-2" />
                  <p className="text-brand-green font-bold">¡Cupón enviado! 🎊</p>
                  <p className="text-xs text-dark-muted">Código: COMPRAFELIZ50K</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-dark-surface border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubscribe}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-bold text-sm whitespace-nowrap"
                    >
                      <Gift size={16} className="inline mr-1" />
                      Recibir
                    </motion.button>
                  </div>

                  <p className="text-[10px] text-dark-muted/60">
                    No enviamos spam. Solo diversión virtual 😄
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
