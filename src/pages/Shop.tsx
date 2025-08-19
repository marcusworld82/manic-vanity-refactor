import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Shop: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Midnight Rebellion Jacket',
      price: 299,
      originalPrice: 349,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Sale',
      category: 'Outerwear'
    },
    {
      id: 2,
      name: 'Neon Dreams Hoodie',
      price: 189,
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'New',
      category: 'Hoodies'
    },
    {
      id: 3,
      name: 'Electric Pulse Sneakers',
      price: 259,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Limited',
      category: 'Footwear'
    },
    {
      id: 4,
      name: 'Cyber Punk Tee',
      price: 89,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'T-Shirts'
    },
    {
      id: 5,
      name: 'Holographic Backpack',
      price: 149,
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Trending',
      category: 'Accessories'
    },
    {
      id: 6,
      name: 'Neon Stripe Joggers',
      price: 129,
      image: 'https://images.pexels.com/photos/2598024/pexels-photo-2598024.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Bottoms'
    }
  ];

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Sale':
        return 'bg-emerald-500';
      case 'New':
        return 'bg-electric-500';
      case 'Limited':
        return 'bg-neon-500';
      case 'Trending':
        return 'bg-orange-500';
      default:
        return 'bg-electric-500';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      {/* Header */}
      <section className="py-12 px-4 bg-dark-card border-b border-dark-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Shop All
            </h1>
            <p className="text-xl text-dark-muted max-w-2xl mx-auto">
              Discover our full collection of bold, fearless fashion pieces
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 px-4 border-b border-dark-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-dark-border text-dark-text hover:bg-electric-500 hover:text-white hover:border-electric-500"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 bg-dark-card border-dark-border text-dark-text placeholder:text-dark-muted focus:border-electric-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-dark-muted">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' 
                  ? 'bg-electric-500 hover:bg-electric-600 text-white' 
                  : 'border-dark-border text-dark-text hover:bg-electric-500 hover:text-white hover:border-electric-500'
                }
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' 
                  ? 'bg-electric-500 hover:bg-electric-600 text-white' 
                  : 'border-dark-border text-dark-text hover:bg-electric-500 hover:text-white hover:border-electric-500'
                }
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group relative bg-dark-card rounded-2xl overflow-hidden border border-dark-border hover:border-electric-500/50 transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <p className="text-sm text-dark-muted mb-2">{product.category}</p>
                    <h3 className="text-xl font-semibold text-dark-text mb-2 group-hover:text-electric-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-electric-400">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-dark-muted line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className={`${viewMode === 'list' ? 'w-auto self-start' : 'w-full'} bg-transparent border-2 border-electric-500 text-electric-400 hover:bg-electric-500 hover:text-white transition-all duration-300`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;