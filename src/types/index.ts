export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: CategoryId;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  discount: number;
}

export type CategoryId = 'food' | 'tech' | 'fashion' | 'beauty' | 'home' | 'gaming' | 'sports' | 'pets' | 'toys' | 'books' | 'auto' | 'wellness' | 'drinks' | 'music';

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  gradient: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
