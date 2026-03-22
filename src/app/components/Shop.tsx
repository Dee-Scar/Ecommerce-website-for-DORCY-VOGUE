import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getProducts } from '../utils/storage';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Filter } from 'lucide-react';

export default function Shop() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (category === 'new-arrivals') {
      filtered = products.filter(p => p.isNewArrival);
      setSelectedCategory('new-arrivals');
    } else if (category === 'men') {
      filtered = products.filter(p => p.category === 'men' || p.category === 'unisex');
      setSelectedCategory('men');
    } else if (category === 'women') {
      filtered = products.filter(p => p.category === 'women' || p.category === 'unisex');
      setSelectedCategory('women');
    } else {
      setSelectedCategory('all');
    }

    setFilteredProducts(filtered);
  }, [category, products]);

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'new-arrivals':
        return 'New Arrivals';
      case 'men':
        return "Men's Collection";
      case 'women':
        return "Women's Collection";
      default:
        return 'All Products';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-black text-center mb-4 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {getCategoryTitle()}
          </motion.h1>
          <p className="text-center text-gray-700 text-xl font-semibold">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} ✨
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <Link
              to="/shop"
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-semibold ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </Link>
            <Link
              to="/shop/new-arrivals"
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-semibold ${
                selectedCategory === 'new-arrivals'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              New Arrivals ✨
            </Link>
            <Link
              to="/shop/men"
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-semibold ${
                selectedCategory === 'men'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Men
            </Link>
            <Link
              to="/shop/women"
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-semibold ${
                selectedCategory === 'women'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Women
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Link 
              to="/shop"
              className="inline-block mt-4 text-purple-600 font-semibold hover:underline"
            >
              View all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/product/${product.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 mb-4 shadow-lg hover:shadow-2xl transition-all">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {product.isNewArrival && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        NEW ✨
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-900 font-bold text-lg">${product.price}</p>
                    <div className="flex gap-1.5">
                      {product.colors.slice(0, 5).map((color, i) => (
                        <div 
                          key={i}
                          className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                          style={{ 
                            backgroundColor: color.toLowerCase().replace(' ', '') === 'beige' ? '#F5F5DC' : 
                                             color.toLowerCase().replace(' ', '') === 'olive' ? '#808000' :
                                             color.toLowerCase().replace(' ', '') === 'forestgreen' ? '#228B22' :
                                             color.toLowerCase().replace(' ', '') === 'charcoal' ? '#36454F' :
                                             color.toLowerCase().replace(' ', '') === 'cream' ? '#FFFDD0' :
                                             color.toLowerCase().replace(' ', '') === 'tan' ? '#D2B48C' :
                                             color.toLowerCase() 
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 capitalize font-semibold">
                      {product.category === 'unisex' ? '✨ Unisex' : product.category}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}