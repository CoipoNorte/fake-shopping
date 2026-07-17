import { useStore } from '../../store/useStore';
import { categories } from '../../data/products';
import { playClickSound } from '../../utils/sounds';
import { motion } from 'framer-motion';

export default function CategoryBar() {
  const { activeCategory, setActiveCategory } = useStore();

  const allCategories = [
    { id: 'all' as const, name: 'Todo', emoji: '🛍️', gradient: 'from-brand-pink to-brand-purple', color: '#8b5cf6' },
    ...categories,
  ];

  return (
    <div className="sticky top-[108px] sm:top-[68px] z-40 glass py-3">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-4 min-w-max">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                    : 'bg-dark-surface text-dark-muted border border-dark-border hover:border-dark-muted'
                }`}
                style={isActive ? { boxShadow: `0 4px 20px ${cat.color}40` } : {}}
              >
                <span className="text-base">{cat.emoji}</span>
                <span>{cat.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${cat.color}20, transparent)` }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
