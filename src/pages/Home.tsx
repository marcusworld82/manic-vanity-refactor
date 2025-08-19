import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Home: React.FC = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Midnight Rebellion Jacket',
      price: '$299',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'New'
    },
    {
      id: 2,
      name: 'Neon Dreams Hoodie',
      price: '$189',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Trending'
    },
    {
      id: 3,
      name: 'Electric Pulse Sneakers',
      price: '$259',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Limited'
    }
  ];

  const collections = [
    {
      name: 'ELECTRIC NIGHTS',
      description: 'Bold pieces for the fearless',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-electric-500 to-electric-700'
    },
    {
      name: 'NEON DREAMS',
      description: 'Vibrant styles that glow',
      image: 'https://images.pexels.com/photos/1006202/pexels-photo-1006202.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-neon-500 to-neon-700'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/80 via-dark-bg/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="text-electric-400" size={24} />
              <span className="text-electric-400 font-medium tracking-wider">MANIC VANITY</span>
              <Sparkles className="text-electric-400" size={24} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              FEARLESS
              <br />
              FASHION
            </h1>
            
            <p className="text-xl md:text-2xl text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Express your boldest self with our curated collection of vibrant, 
              statement pieces that refuse to blend in.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/shop">
                <Button 
                  size="lg"
                  className="bg-electric-500 hover:bg-electric-600 text-white px-8 py-4 text-lg font-semibold shadow-electric group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-neon-500 text-neon-400 hover:bg-neon-500 hover:text-white px-8 py-4 text-lg font-semibold"
              >
                Explore Collections
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-20 text-electric-400 hidden lg:block"
        >
          <Zap size={40} />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 3, 0] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 
          }}
          className="absolute bottom-32 left-20 text-neon-400 hidden lg:block"
        >
          <Star size={32} />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
              Featured Drops
            </h2>
            <p className="text-xl text-dark-muted max-w-2xl mx-auto">
              The latest pieces that are making waves in the fashion world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-dark-card rounded-2xl overflow-hidden border border-dark-border hover:border-electric-500/50 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-electric-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark-text mb-2 group-hover:text-electric-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-electric-400 mb-4">{product.price}</p>
                  <Button 
                    className="w-full bg-transparent border-2 border-electric-500 text-electric-400 hover:bg-electric-500 hover:text-white transition-all duration-300"
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20 px-4 bg-dark-card">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
              Signature Collections
            </h2>
            <p className="text-xl text-dark-muted max-w-2xl mx-auto">
              Curated themes that define the MANIC VANITY aesthetic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                
                <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
                      {collection.name}
                    </h3>
                    <p className="text-lg text-white/90 mb-6">
                      {collection.description}
                    </p>
                    <Button 
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-dark-bg transition-all duration-300"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              Join the Revolution
            </h2>
            <p className="text-xl text-dark-muted mb-8">
              Be part of a community that celebrates individuality and fearless self-expression. 
              Get early access to new drops and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/sign-up">
                <Button 
                  size="lg"
                  className="bg-neon-500 hover:bg-neon-600 text-white px-8 py-4 text-lg font-semibold shadow-neon"
                >
                  Join Now
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;