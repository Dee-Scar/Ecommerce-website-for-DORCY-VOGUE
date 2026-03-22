import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { getCart, saveCart } from '../utils/storage';
import { CartItem } from '../types';
import { motion } from 'motion/react';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartItems = getCart();
    setCart(cartItems);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    saveCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    saveCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getSubtotal(); // Add shipping or tax here if needed
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-8">
            <ShoppingBag className="w-20 h-20 text-purple-600" />
          </div>
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg">Start adding some items to your cart!</p>
          <Link 
            to="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 text-lg font-bold"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shopping Cart 🛍️
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 flex gap-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Product Image */}
                <Link 
                  to={`/product/${item.product.id}`}
                  className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/product/${item.product.id}`}
                    className="font-bold text-xl hover:text-purple-600 transition-colors block mb-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-900 font-bold mb-2 text-lg">${item.product.price}</p>
                  <div className="flex gap-4 text-sm text-gray-600 font-semibold">
                    <span>Size: {item.selectedSize}</span>
                    <span>Color: {item.selectedColor}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="w-10 h-10 rounded-lg border-2 border-purple-300 hover:border-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center font-bold shadow-md"
                      >
                        -
                      </button>
                      <span className="font-bold w-10 text-center text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="w-10 h-10 rounded-lg border-2 border-purple-300 hover:border-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center font-bold shadow-md"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="ml-auto text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 font-semibold hover:bg-red-50 px-3 py-2 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="flex-shrink-0 text-right">
                  <p className="font-bold text-xl text-purple-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl p-8 sticky top-24 shadow-2xl"
            >
              <h2 className="text-3xl font-black mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-purple-100">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-bold">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-purple-100">
                  <span>Shipping</span>
                  <span className="font-semibold">At checkout</span>
                </div>
                <div className="border-t-2 border-white/30 pt-4 flex justify-between text-2xl font-black">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-white text-purple-900 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-black mb-4 shadow-xl"
              >
                Proceed to Checkout
                <ArrowRight className="w-6 h-6" />
              </button>

              <Link
                to="/shop"
                className="block w-full text-center py-3 text-white/90 hover:text-white transition-colors font-semibold"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}