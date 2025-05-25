export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  wishlist: string[];
}

export type Category = 'wedding' | 'anniversary' | 'birthday' | 'congratulations' | 'sympathy' | 'holiday';