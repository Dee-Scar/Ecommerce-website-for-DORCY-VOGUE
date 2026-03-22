import { Product, CartItem, Order } from '../types';

// Products Storage
export const getProducts = (): Product[] => {
  const products = localStorage.getItem('dorcyVogueProducts');
  return products ? JSON.parse(products) : getInitialProducts();
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('dorcyVogueProducts', JSON.stringify(products));
};

export const addProduct = (product: Product) => {
  const products = getProducts();
  products.unshift(product); // Add to beginning
  saveProducts(products);
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
};

export const deleteProduct = (id: string) => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
};

// Cart Storage
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('dorcyVogueCart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('dorcyVogueCart', JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.setItem('dorcyVogueCart', JSON.stringify([]));
};

// Orders Storage
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('dorcyVogueOrders');
  return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem('dorcyVogueOrders', JSON.stringify(orders));
};

// Initial Products
const getInitialProducts = (): Product[] => {
  const initialProducts: Product[] = [
    {
      id: '1',
      name: 'Classic Oversized Tee',
      price: 45,
      category: 'unisex',
      images: ['https://images.unsplash.com/photo-1623421536280-fa8ae906ed1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBuZXV0cmFsJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzcyMTYwNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080'],
      description: 'Premium cotton oversized tee. Perfect for any occasion, designed beyond gender norms.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Grey', 'Navy'],
      isNewArrival: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Minimalist Trench Coat',
      price: 189,
      category: 'unisex',
      images: ['https://images.unsplash.com/photo-1769107805465-bfd41863f1a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2xvdGhpbmclMjBzdG9yZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MjEzMDQxNnww&ixlib=rb-4.1.0&q=80&w=1080'],
      description: 'Timeless trench coat with clean lines. A wardrobe essential for everyone.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Beige', 'Black', 'Olive'],
      isNewArrival: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Urban Streetwear Set',
      price: 125,
      category: 'unisex',
      images: ['https://images.unsplash.com/photo-1764698403436-35977fd6e27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBzdHJlZXR3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzIyMDQwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080'],
      description: 'Contemporary streetwear combining comfort and style. Break boundaries with fashion.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Charcoal', 'Forest Green'],
      isNewArrival: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Elegant Casual Ensemble',
      price: 95,
      category: 'unisex',
      images: ['https://images.unsplash.com/photo-1762588120789-d9525e1784d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY2FzdWFsJTIwd2VhcnxlbnwxfHx8fDE3NzIyMDQwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080'],
      description: 'Refined casual wear that transitions seamlessly from day to night.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Cream', 'Tan', 'Black', 'Navy'],
      isNewArrival: false,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  
  saveProducts(initialProducts);
  return initialProducts;
};

// Bank Account Info
export const getBankAccountInfo = () => {
  return {
    bankName: 'First National Bank',
    accountName: 'DORCY VOGUE',
    accountNumber: '0123456789',
  };
};
