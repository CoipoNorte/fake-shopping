import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { products } from '../../data/products';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function ProductGrid() {
  const { activeCategory, searchQuery } = useStore();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, searchQuery]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length));
      }
    },
    [hasMore, filteredProducts.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="px-4 pb-24">
      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-dark-muted">
          <span className="font-bold text-dark-text">{filteredProducts.length}</span> productos encontrados
          {visibleCount < filteredProducts.length && (
            <span className="text-dark-muted"> • Mostrando {visibleCount}</span>
          )}
        </p>
        {searchQuery && (
          <p className="text-xs text-brand-purple">
            Buscando: &quot;{searchQuery}&quot;
          </p>
        )}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {visibleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index % ITEMS_PER_PAGE} />
              ))}
            </div>

            {/* Load more trigger */}
            {hasMore && (
              <div ref={loaderRef} className="flex flex-col items-center justify-center py-8">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-brand-pink animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className="text-xs text-dark-muted">Cargando más productos...</p>
                  <ChevronDown size={16} className="text-dark-muted" />
                </motion.div>
              </div>
            )}

            {/* End message */}
            {!hasMore && filteredProducts.length > ITEMS_PER_PAGE && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-sm text-dark-muted">
                  ✨ ¡Has visto todos los {filteredProducts.length} productos! ✨
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-dark-text mb-2">No encontramos nada</h3>
            <p className="text-sm text-dark-muted text-center max-w-xs">
              Intenta con otra búsqueda o cambia de categoría para descubrir más productos
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
