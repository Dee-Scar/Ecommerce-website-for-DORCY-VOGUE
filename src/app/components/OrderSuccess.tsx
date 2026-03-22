import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Package, Mail, ArrowRight, CreditCard, Check, Copy, MessageCircle } from 'lucide-react';
import { Order } from '../types';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [copied, setCopied] = useState(false);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            🎉 Order Placed Successfully!
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for shopping with <span className="font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">DORCY VOGUE</span>
          </motion.p>

          <motion.p 
            className="text-sm text-gray-500 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Your order has been received and is awaiting payment confirmation
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 mb-6 text-left border-2 border-purple-100"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-purple-600" />
              <h2 className="font-bold text-lg text-purple-900">Order Summary</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-bold text-purple-900">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-black text-2xl text-purple-900">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-semibold">{order.customerName}</span>
              </div>
            </div>

            <div className="border-t border-purple-200 mt-4 pt-4">
              <p className="text-sm text-gray-600 mb-2 font-bold">
                📍 Delivery Address:
              </p>
              <p className="text-sm bg-white rounded-lg p-3 border border-purple-100">
                {order.customerName}<br />
                {order.address}<br />
                {order.city}, {order.state} {order.zipCode}<br />
                📧 {order.email}<br />
                📱 {order.phone}
              </p>
            </div>
          </motion.div>

          {/* Payment Instructions - HIGHLIGHTED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white rounded-2xl p-6 mb-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-6 h-6" />
              <h3 className="font-black text-xl">Complete Your Payment</h3>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <p className="text-sm text-purple-100 mb-2">Transfer to:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-purple-200">Bank Name</p>
                  <p className="font-bold text-lg">{bankInfo.bankName}</p>
                </div>
                <div>
                  <p className="text-xs text-purple-200">Account Name</p>
                  <p className="font-bold text-lg">{bankInfo.accountName}</p>
                </div>
                <div>
                  <p className="text-xs text-purple-200">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-2xl tracking-wider">{bankInfo.accountNumber}</p>
                    <button
                      onClick={() => copyToClipboard(bankInfo.accountNumber)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-300" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-xs text-purple-200">Amount to Pay</p>
                  <p className="font-black text-3xl">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-purple-100 mb-4">
              ⚠️ Please transfer the exact amount to the account above
            </p>
          </motion.div>

          {/* WhatsApp Payment Confirmation - IMPORTANT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-black text-lg text-green-900">📸 Send Payment Screenshot</h3>
            </div>
            <div className="text-left space-y-3 mb-4">
              <p className="text-sm text-green-900 font-semibold">
                After making the payment, please follow these steps:
              </p>
              <ol className="text-sm text-green-900 space-y-2 list-decimal list-inside pl-2">
                <li className="font-semibold">Take a clear screenshot of your payment confirmation</li>
                <li className="font-semibold">Click the button below to open WhatsApp</li>
                <li className="font-semibold">Send the screenshot along with your Order ID: <span className="bg-white px-2 py-1 rounded font-black">#{order.id}</span></li>
                <li className="font-semibold">We'll confirm your payment and ship your order ASAP! 🚀</li>
              </ol>
            </div>
            <a
              href={`${socialLinks.whatsapp}?text=Hi DORCY VOGUE! I've completed payment for Order ID: ${order.id}. Total: $${order.total.toFixed(2)}. Sending payment screenshot now.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-black transition-all transform hover:scale-105 shadow-xl text-lg w-full justify-center"
            >
              <MessageCircle className="w-6 h-6" />
              Send Screenshot on WhatsApp
            </a>
            <p className="text-xs text-green-700 mt-3 text-center">
              ⚡ Quick response guaranteed! We're online and ready to confirm your order.
            </p>
          </motion.div>

          {/* Email Confirmation Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-blue-900 text-sm">Order Confirmation Email</h3>
            </div>
            <p className="text-xs text-blue-900">
              We've sent order confirmation to <strong>{order.email}</strong>. 
              Please check your inbox (and spam folder) for complete order details.
            </p>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <h3 className="font-bold text-lg mb-4 text-left text-gray-800">📦 Items in Your Order</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-md flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-bold truncate text-gray-800">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: <span className="font-semibold">{item.selectedSize}</span> | Color: <span className="font-semibold">{item.selectedColor}</span>
                    </p>
                    <p className="text-sm text-gray-600">Quantity: <span className="font-semibold">{item.quantity}</span></p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-lg text-purple-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 font-bold"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-full hover:bg-gray-50 transition-all font-bold"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}