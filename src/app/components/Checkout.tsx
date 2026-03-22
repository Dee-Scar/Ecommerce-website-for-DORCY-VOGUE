import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getCart, saveOrder, clearCart, getBankAccountInfo } from '../utils/storage';
import { getSocialLinks } from '../utils/socialLinks';
import { CartItem, Order } from '../types';
import { motion } from 'motion/react';
import { CreditCard, Truck, ShoppingBag, Copy, Check, MessageCircle } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [copied, setCopied] = useState(false);
  const bankInfo = getBankAccountInfo();
  const socialLinks = getSocialLinks();
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    const cartItems = getCart();
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    setCart(cartItems);
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const order: Order = {
      id: Date.now().toString(),
      items: cart,
      ...formData,
      total: getTotal(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    saveOrder(order);
    clearCart();
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/order-success', { state: { order } });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Checkout ✨
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                    1
                  </div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-purple-900">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition-colors shadow-md"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-purple-900">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition-colors shadow-md"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-purple-900">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition-colors shadow-md"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                    2
                  </div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                    Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-purple-900">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition-colors shadow-md"
                      placeholder="123 Main Street, Apartment 4B"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-purple-900">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition-colors shadow-md"
                      placeholder="Lagos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-purple-900">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition-colors shadow-md"
                      placeholder="Lagos"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-purple-900">Zip/Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition-colors shadow-md"
                      placeholder="100001"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                    3
                  </div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                    Payment Information
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white rounded-2xl p-8 mb-4 shadow-2xl relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-7 h-7" />
                      <span className="font-black text-xl">Bank Transfer Details</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-purple-200 mb-1">Bank Name</p>
                        <p className="font-black text-xl">{bankInfo.bankName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-200 mb-1">Account Name</p>
                        <p className="font-black text-xl">{bankInfo.accountName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-200 mb-1">Account Number</p>
                        <div className="flex items-center gap-3">
                          <p className="font-black text-3xl tracking-wider">{bankInfo.accountNumber}</p>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(bankInfo.accountNumber)}
                            className="p-3 hover:bg-white/20 rounded-xl transition-colors"
                          >
                            {copied ? (
                              <Check className="w-6 h-6 text-green-400" />
                            ) : (
                              <Copy className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                  <p className="text-sm text-amber-900 font-semibold">
                    <strong>Important:</strong> Please transfer the total amount to the account above. 
                    Your order will be processed once payment is confirmed. Keep your receipt for reference.
                  </p>
                </div>

                {/* Payment Screenshot Instructions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mt-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-green-900 mb-2">After making payment:</p>
                      <ol className="text-sm text-green-900 space-y-2 list-decimal list-inside">
                        <li>Take a screenshot of your payment confirmation</li>
                        <li>Send the screenshot to us via WhatsApp</li>
                        <li>Include your order details in the message</li>
                        <li>We'll confirm your payment and process your order immediately!</li>
                      </ol>
                      <a
                        href={socialLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Send Screenshot on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <button
                type="submit"
                disabled={!isFormValid()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none shadow-xl"
              >
                <ShoppingBag className="w-7 h-7" />
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl p-8 sticky top-24 shadow-2xl"
            >
              <h2 className="text-3xl font-black mb-8">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/20 flex-shrink-0 shadow-lg">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-purple-100">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                      <p className="text-sm text-purple-100">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-white/30 pt-6 space-y-4">
                <div className="flex justify-between text-purple-100">
                  <span>Subtotal</span>
                  <span className="font-bold">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-purple-100">
                  <span className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping
                  </span>
                  <span className="font-semibold">TBD</span>
                </div>
                <div className="border-t-2 border-white/30 pt-4 flex justify-between text-2xl font-black">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}