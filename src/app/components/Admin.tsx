import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getProducts, addProduct, deleteProduct, getOrders } from '../utils/storage';
import { Product, Order } from '../types';
import { motion } from 'motion/react';
import { Plus, Trash2, Package, ShoppingBag, ArrowLeft, X, Upload, Settings } from 'lucide-react';
import { getSocialLinks, saveSocialLinks, SocialLinks } from '../utils/socialLinks';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSocialSettings, setShowSocialSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(getSocialLinks());

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'unisex' as 'men' | 'women' | 'unisex',
    imageUrl: '',
    description: '',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    isNewArrival: true,
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setProducts(getProducts());
    setOrders(getOrders());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      images: [uploadedImage || newProduct.imageUrl || 'https://images.unsplash.com/photo-1623421536280-fa8ae906ed1d?w=800'],
      description: newProduct.description,
      sizes: newProduct.sizes,
      colors: newProduct.colors,
      isNewArrival: newProduct.isNewArrival,
      createdAt: new Date().toISOString(),
    };

    addProduct(product);
    loadData();
    setShowAddProduct(false);
    setNewProduct({
      name: '',
      price: '',
      category: 'unisex',
      imageUrl: '',
      description: '',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'White'],
      isNewArrival: true,
    });
    setImagePreview('');
    setUploadedImage('');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      loadData();
    }
  };

  const handleSizeToggle = (size: string) => {
    setNewProduct(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...newProduct.colors];
    newColors[index] = value;
    setNewProduct(prev => ({ ...prev, colors: newColors }));
  };

  const addColor = () => {
    setNewProduct(prev => ({ ...prev, colors: [...prev.colors, ''] }));
  };

  const removeColor = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage('');
    setImagePreview('');
  };

  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    saveSocialLinks(socialLinks);
    setShowSocialSettings(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors mb-4"
            >
              Login
            </button>
            <Link
              to="/"
              className="block text-center text-gray-600 hover:text-black transition-colors"
            >
              Back to Home
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">DORCY VOGUE Management</p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">New Arrivals</p>
                <p className="text-3xl font-bold">{products.filter(p => p.isNewArrival).length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'products'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setShowSocialSettings(true)}
            className="px-6 py-3 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <Settings className="w-5 h-5" />
            Social Settings
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products Management</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-4"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                      {product.category}
                    </span>
                    {product.isNewArrival && (
                      <span className="text-xs px-2 py-1 bg-black text-white rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
            
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Customer</p>
                        <p className="font-semibold">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                        <p className="text-sm">
                          {order.address}<br />
                          {order.city}, {order.state} {order.zipCode}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 mb-2">Items ({order.items.length})</p>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.product.name} x{item.quantity}</span>
                            <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col"
          >
            {/* Fixed Header */}
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-2xl font-bold">Add New Product</h2>
              <button
                onClick={() => setShowAddProduct(false)}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              <form onSubmit={handleAddProduct} className="space-y-4" id="addProductForm">
                <div>
                  <label className="block text-sm font-semibold mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                    placeholder="e.g., Classic Oversized Tee"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                    >
                      <option value="unisex">Unisex</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Upload Image from Device</label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Upload className="w-5 h-5" />
                      Choose Image from Device
                    </label>
                    {imagePreview && (
                      <div className="relative inline-block w-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full max-w-sm h-48 object-cover rounded-lg border-2 border-purple-200 shadow-lg mx-auto"
                        />
                        <button
                          type="button"
                          onClick={removeUploadedImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <p className="text-xs text-green-600 mt-2 font-semibold text-center">✓ Image ready to upload</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">Recommended: Upload high-quality product images (max 5MB)</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-500 italic">Or paste an image URL below:</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Image URL</label>
                  <input
                    type="url"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty for default image</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description *</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none resize-none"
                    placeholder="Describe the product..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Available Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          newProduct.sizes.includes(size)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Available Colors</label>
                  <div className="space-y-2">
                    {newProduct.colors.map((color, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={color}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                          placeholder="e.g., Black"
                        />
                        {newProduct.colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeColor(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addColor}
                    className="text-sm text-gray-600 hover:text-black transition-colors mt-2"
                  >
                    + Add Color
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="newArrival"
                    checked={newProduct.isNewArrival}
                    onChange={(e) => setNewProduct({ ...newProduct, isNewArrival: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor="newArrival" className="text-sm font-semibold">
                    Mark as New Arrival
                  </label>
                </div>
              </form>
            </div>

            {/* Fixed Footer */}
            <div className="flex gap-4 p-6 md:p-8 border-t border-gray-200 flex-shrink-0">
              <button
                type="submit"
                form="addProductForm"
                className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors font-semibold"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddProduct(false);
                  setImagePreview('');
                  setUploadedImage('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Social Settings Modal */}
      {showSocialSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full my-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Social Media Settings</h2>
              <button
                onClick={() => setShowSocialSettings(false)}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveSocialLinks} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                  placeholder="https://instagram.com/dorcyvogue"
                />
                <p className="text-xs text-gray-500 mt-1">Your Instagram profile URL</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">TikTok URL</label>
                <input
                  type="url"
                  value={socialLinks.tiktok}
                  onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                  placeholder="https://tiktok.com/@dorcyvogue"
                />
                <p className="text-xs text-gray-500 mt-1">Your TikTok profile URL</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">WhatsApp URL</label>
                <input
                  type="url"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
                  placeholder="https://wa.me/234XXXXXXXXXX"
                />
                <p className="text-xs text-gray-500 mt-1">WhatsApp link with your phone number (e.g., https://wa.me/2348012345678)</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-900">
                  <strong>Tip:</strong> Make sure to include the full URL including "https://"
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105 font-bold"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={() => setShowSocialSettings(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}