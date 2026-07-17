import { useState } from 'react';
import { Star, Plus, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { playAddToCartSound, playPopSound } from '../../utils/sounds';
import { fireSideConfetti, fireEmoji } from '../../utils/confetti';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart, setSelectedProduct, lastAddedId } = useStore();
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFlyEmoji, setShowFlyEmoji] = useState(false);

  const isJustAdded = lastAddedId === product.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    playAddToCartSound();
    fireSideConfetti();
    
    setShowFlyEmoji(true);
    setTimeout(() => setShowFlyEmoji(false), 1000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    playPopSound();
    if (!liked) {
      fireEmoji('❤️');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setSelectedProduct(product)}
      className={`group relative bg-dark-card rounded-2xl overflow-hidden border border-dark-border hover:border-brand-purple/50 transition-all duration-300 cursor-pointer ${
        isJustAdded ? 'ring-2 ring-brand-green ring-offset-2 ring-offset-dark-bg' : ''
      }`}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-dark-surface animate-shimmer" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        {product.badge && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full"
          >
            {product.badge}
          </motion.div>
        )}

        {/* Discount badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-brand-pink to-brand-red text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg shadow-brand-pink/30">
          -{product.discount}%
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
              liked
                ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/40'
                : 'bg-black/50 text-white hover:bg-brand-pink/80'
            }`}
          >
            <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-brand-purple/80 transition-all active:scale-90"
          >
            <Eye size={14} />
          </button>
        </div>

        {/* Mobile action buttons (always visible) */}
        <div className="absolute bottom-2 right-2 flex gap-1.5 sm:hidden">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
              liked
                ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/40'
                : 'bg-black/50 text-white'
            }`}
          >
            <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Flying emoji animation */}
        {showFlyEmoji && (
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: [0, 1.5, 1], y: -80, opacity: [0, 1, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 text-3xl pointer-events-none z-10"
          >
            🛒
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <Star size={12} className="text-brand-yellow fill-brand-yellow" />
          <span className="text-[11px] font-semibold text-brand-yellow">{product.rating}</span>
          <span className="text-[10px] text-dark-muted">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-dark-text line-clamp-2 leading-tight mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price section */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] text-dark-muted line-through">{formatPrice(product.originalPrice)}</p>
            <p className="text-base font-black text-brand-green">{formatPrice(product.price)}</p>
          </div>

          {/* Add to cart button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleAddToCart}
            className={`p-2.5 rounded-xl transition-all duration-200 shadow-lg active:shadow-none ${
              isJustAdded
                ? 'bg-brand-green text-white shadow-brand-green/30'
                : 'bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-brand-purple/30 hover:shadow-brand-purple/50'
            }`}
          >
            <Plus size={18} strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
