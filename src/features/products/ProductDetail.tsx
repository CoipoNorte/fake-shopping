import { useState } from 'react';
import { X, Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { playAddToCartSound, playPopSound } from '../../utils/sounds';
import { fireSideConfetti, fireEmoji } from '../../utils/confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  if (!selectedProduct) return null;

  const product = selectedProduct;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    playAddToCartSound();
    fireSideConfetti();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
    playPopSound();
    if (!liked) fireEmoji('❤️');
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => {
            setSelectedProduct(null);
            setQuantity(1);
            setAdded(false);
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
            {/* Close button */}
            <button
              onClick={() => {
                setSelectedProduct(null);
                setQuantity(1);
                setAdded(false);
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all active:scale-90"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="relative aspect-square sm:aspect-video overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badge && (
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className="bg-gradient-to-r from-brand-pink to-brand-red text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                  -{product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 -mt-6 relative">
              {/* Rating & Like */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-brand-yellow/20 rounded-full px-2.5 py-1">
                    <Star size={14} className="text-brand-yellow fill-brand-yellow" />
                    <span className="text-sm font-bold text-brand-yellow">{product.rating}</span>
                  </div>
                  <span className="text-xs text-dark-muted">
                    ({product.reviews.toLocaleString()} reseñas)
                  </span>
                </div>
                <button
                  onClick={handleLike}
                  className={`p-2.5 rounded-full transition-all active:scale-90 ${
                    liked
                      ? 'bg-brand-pink/20 text-brand-pink'
                      : 'bg-dark-surface text-dark-muted hover:text-brand-pink'
                  }`}
                >
                  <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl font-extrabold text-dark-text mb-2 font-poppins">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-dark-muted mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="bg-dark-surface rounded-2xl p-4 mb-4 border border-dark-border">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-2xl font-black text-brand-green">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-dark-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-pink bg-brand-pink/10 rounded-full px-2 py-0.5">
                    Ahorras {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="flex flex-col items-center gap-1 bg-dark-surface rounded-xl p-3 border border-dark-border">
                  <Truck size={18} className="text-brand-blue" />
                  <span className="text-[10px] text-dark-muted text-center">Envío gratis</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-dark-surface rounded-xl p-3 border border-dark-border">
                  <Shield size={18} className="text-brand-green" />
                  <span className="text-[10px] text-dark-muted text-center">Garantía</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-dark-surface rounded-xl p-3 border border-dark-border">
                  <RotateCcw size={18} className="text-brand-purple" />
                  <span className="text-[10px] text-dark-muted text-center">Devolución</span>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-dark-text">Cantidad</span>
                <div className="flex items-center gap-3 bg-dark-surface rounded-xl border border-dark-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-dark-muted hover:text-dark-text transition-colors active:scale-90"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-bold text-dark-text w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-dark-muted hover:text-dark-text transition-colors active:scale-90"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-4 bg-dark-surface rounded-xl p-3 border border-brand-purple/20">
                <span className="text-sm text-dark-muted">Total:</span>
                <span className="text-xl font-black gradient-text">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>

              {/* Add to cart button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? 'bg-brand-green shadow-lg shadow-brand-green/30'
                    : 'bg-gradient-to-r from-brand-pink to-brand-purple shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50'
                }`}
              >
                {added ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xl"
                    >
                      ✅
                    </motion.span>
                    ¡Agregado al carrito!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Agregar al carrito
                  </>
                )}
              </motion.button>

              {/* Disclaimer */}
              <p className="text-[10px] text-dark-muted text-center mt-3">
                🎮 Esto es una compra simulada • No se cobra dinero real
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
