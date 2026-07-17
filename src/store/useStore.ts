import { create } from 'zustand';
import { Product, CartItem, CategoryId } from '../types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  cartSavings: () => number;

  // UI State
  activeCategory: CategoryId | 'all';
  setActiveCategory: (category: CategoryId | 'all') => void;
  
  showCart: boolean;
  toggleCart: () => void;
  setShowCart: (show: boolean) => void;

  showCheckout: boolean;
  setShowCheckout: (show: boolean) => void;

  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Stats
  totalPurchases: number;
  totalSpent: number;
  incrementPurchases: () => void;

  // Animations
  lastAddedId: string | null;
  setLastAddedId: (id: string | null) => void;

  // Virtual wallet
  wallet: number;
  setWallet: (amount: number) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Cart
  cart: [],
  addToCart: (product) => {
    const existing = get().cart.find((item) => item.product.id === product.id);
    if (existing) {
      set({
        cart: get().cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...get().cart, { product, quantity: 1 }] });
    }
    set({ lastAddedId: product.id });
    setTimeout(() => set({ lastAddedId: null }), 600);
  },
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.product.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: get().cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ cart: [] }),
  cartTotal: () => get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
  cartSavings: () =>
    get().cart.reduce(
      (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
      0
    ),

  // UI State
  activeCategory: 'all',
  setActiveCategory: (category) => set({ activeCategory: category }),

  showCart: false,
  toggleCart: () => set({ showCart: !get().showCart }),
  setShowCart: (show) => set({ showCart: show }),

  showCheckout: false,
  setShowCheckout: (show) => set({ showCheckout: show }),

  showSuccess: false,
  setShowSuccess: (show) => set({ showSuccess: show }),

  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Stats
  totalPurchases: 0,
  totalSpent: 0,
  incrementPurchases: () => {
    const total = get().cartTotal();
    set({
      totalPurchases: get().totalPurchases + 1,
      totalSpent: get().totalSpent + total,
    });
  },

  // Animations
  lastAddedId: null,
  setLastAddedId: (id) => set({ lastAddedId: id }),

  // Virtual wallet
  wallet: 99999990,
  setWallet: (amount) => set({ wallet: amount }),
}));
