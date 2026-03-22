export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'unisex';
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  isNewArrival: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  total: number;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}
