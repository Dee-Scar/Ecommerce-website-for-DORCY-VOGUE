import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { getProducts, getCart, saveCart } from '../utils/storage';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { Sparkles } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const products = getProducts();
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0]);
      setSelectedColor(found.colors[0]);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = getCart();
    const existingItemIndex = cart.findIndex(
      item => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        product,
        quantity,
        selectedSize,
        selectedColor,
      });
    }

    saveCart(cart);
    setAddedToCart(true);
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));

    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/20 via-white to-pink-50/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition-all font-semibold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-2xl relative group">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {product.isNewArrival && (
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                <Sparkles className="w-4 h-4" />
                NEW ARRIVAL
              </span>
            )}

            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-gray-900">${product.price}</p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-purple-600 pl-6">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-bold mb-4 uppercase tracking-wide text-purple-900">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-4 rounded-xl border-2 transition-all font-bold shadow-md hover:shadow-lg ${
                      selectedSize === size
                        ? 'border-purple-600 bg-gradient-to-r from-purple-600 to-pink-600 text-white transform scale-110'
                        : 'border-gray-300 hover:border-purple-400 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-bold mb-4 uppercase tracking-wide text-purple-900">
                Select Color
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-8 py-4 rounded-xl border-2 transition-all font-bold shadow-md hover:shadow-lg ${
                      selectedColor === color
                        ? 'border-purple-600 bg-gradient-to-r from-purple-600 to-pink-600 text-white transform scale-110'
                        : 'border-gray-300 hover:border-purple-400 bg-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold mb-4 uppercase tracking-wide text-purple-900">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 rounded-xl border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-50 transition-all font-bold text-xl shadow-md"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-14 rounded-xl border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-50 transition-all font-bold text-xl shadow-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 text-xl font-bold shadow-xl"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-7 h-7" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-7 h-7" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  setTimeout(() => navigate('/cart'), 500);
                }}
                className="w-full bg-white text-purple-900 border-2 border-purple-900 py-5 rounded-full hover:bg-purple-900 hover:text-white transition-all text-xl font-bold shadow-lg"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t-2 border-purple-200 pt-8 space-y-3 bg-purple-50/50 rounded-2xl p-6">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-purple-900">Category:</span> {product.category === 'unisex' ? '✨ Unisex' : product.category}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-purple-900">Available Sizes:</span> {product.sizes.join(', ')}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-purple-900">Available Colors:</span> {product.colors.join(', ')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}