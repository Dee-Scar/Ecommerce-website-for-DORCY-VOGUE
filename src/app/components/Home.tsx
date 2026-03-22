import { Link } from 'react-router';
import { ArrowRight, Sparkles, Truck, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { getProducts } from '../utils/storage';
import { Product } from '../types';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    const arrivals = products.filter(p => p.isNewArrival).slice(0, 4);
    setNewArrivals(arrivals);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-2xl"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">
                New Spring Collection
              </span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              DORCY VOGUE
            </motion.h1>
            
            {/* Tagline */}
            <motion.p 
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Style Beyond Gender
            </motion.p>
            
            {/* Description */}
            <motion.p 
              className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Discover fashion that transcends boundaries. Contemporary designs crafted for everyone, 
              celebrating individuality and self-expression.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                to="/shop/new-arrivals"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3 group text-lg font-bold"
              >
                Shop New Arrivals
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link 
                to="/shop"
                className="bg-white/90 backdrop-blur-sm text-gray-900 border-2 border-gray-900 px-12 py-5 rounded-full hover:bg-gray-900 hover:text-white transition-all transform hover:scale-105 inline-flex items-center justify-center text-lg font-bold shadow-xl"
              >
                Browse All
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-40"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-3xl opacity-40"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Features */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-10 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-purple-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl mb-6 shadow-lg">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Gender-Fluid Fashion
              </h3>
              <p className="text-gray-600 text-lg">
                Designs that celebrate every identity. Fashion for all, beyond labels.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-10 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-orange-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl mb-6 shadow-lg">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Nationwide Delivery
              </h3>
              <p className="text-gray-600 text-lg">
                Fast and reliable shipping to your doorstep across the country.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-10 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl mb-6 shadow-lg">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 text-lg">
                Premium materials and craftsmanship in every piece we create.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 bg-clip-text text-transparent">
              New Arrivals
            </h2>
            <p className="text-gray-600 text-xl">
              Fresh styles, endless possibilities ✨
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/product/${product.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 mb-4 shadow-xl hover:shadow-2xl transition-all">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      NEW ✨
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-900 font-bold text-lg mb-3">${product.price}</p>
                  <div className="flex gap-1.5">
                    {product.colors.slice(0, 4).map((color, i) => (
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
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/shop/new-arrivals"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 text-lg font-bold"
            >
              View All New Arrivals
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Fashion Gallery
            </h2>
            <p className="text-gray-600 text-xl">
              Curated looks for the modern individual
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1683290845409-280ec0dc39df?w=800',
              'https://images.unsplash.com/photo-1765009433753-c7462637d21f?w=800',
              'https://images.unsplash.com/photo-1610100926902-15ffa6086e8d?w=800',
              'https://images.unsplash.com/photo-1621004805829-94ac33d1cd91?w=800',
              'https://images.unsplash.com/photo-1771736823376-5b1447f1e5f1?w=800',
              'https://images.unsplash.com/photo-1721152531778-47bb07d618bc?w=800',
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
              >
                <img 
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Join the Movement
            </h2>
            <p className="text-2xl text-white/90 mb-10 leading-relaxed">
              Fashion without borders. Express yourself authentically with DORCY VOGUE.
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-purple-900 px-12 py-5 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110 shadow-2xl text-lg font-bold"
            >
              Start Shopping
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}