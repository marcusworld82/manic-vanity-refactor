import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Grid, List, ShoppingCart, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Skeleton } from '../components/ui/skeleton';
import { Badge } from '../components/ui/badge';
import { useProductsQuery, useCategoriesQuery } from '../hooks/useProductsQuery';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';
import { setPageSEO } from '../lib/seo';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // UI State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter state from URL params
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'created_at';
  const sortOrder = searchParams.get('order') || 'desc';
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;

  // Data fetching
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProductsQuery({
    category: category || undefined,
    search: searchTerm || undefined,
    sortBy: sortBy as 'created_at' | 'price_cents' | 'name',
    sortOrder: sortOrder as 'asc' | 'desc',
    minPrice,
    maxPrice,
    limit: 50
  });

  const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery();

  // SEO setup
  useEffect(() => {
    setPageSEO({
      title: category 
        ? `${categories?.find(c => c.slug === category)?.name || 'Category'} - MANIC VANITY`
        : 'Shop All - MANIC VANITY',
      description: 'Discover our full collection of bold, fearless fashion pieces. Express your unique style.',
      canonical: '/shop',
      type: 'website'
    });
  }, [category, categories]);

  // URL param handlers
  const updateSearchParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleAddToCart = async (productId: string, productName: string) => {
    try {
      await addToCart(productId, null, 1);
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getBadgeText = (product: any) => {
    if (product.compare_at_cents && product.compare_at_cents > product.price_cents) {
      return 'Sale';
    }
    // Check if product is new (created within last 30 days)
    const createdDate = new Date(product.created_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    if (createdDate > thirtyDaysAgo) {
      return 'New';
    }
    return null;
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Sale':
        return 'bg-emerald-500';
      case 'New':
        return 'bg-electric-500';
      default:
        return 'bg-electric-500';
    }
  };

  if (productsError) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Failed to load products</h2>
          <p className="text-muted-foreground mb-4">Please try again later or check your connection.</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-12 px-4 bg-card border-b border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              {category && categories ? 
                categories.find(c => c.slug === category)?.name || 'Shop All'
                : 'Shop All'
              }
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our full collection of bold, fearless fashion pieces
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Left side filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              {/* Category Filter */}
              <Select 
                value={category} 
                onValueChange={(value) => updateSearchParams('category', value === 'all' ? null : value)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select 
                value={`${sortBy}-${sortOrder}`} 
                onValueChange={(value) => {
                  const [sort, order] = value.split('-');
                  updateSearchParams('sort', sort);
                  updateSearchParams('order', order);
                }}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Latest</SelectItem>
                  <SelectItem value="price_cents-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_cents-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Right side view controls */}
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground text-sm">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Loading State */}
          {productsLoading && (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={`${viewMode === 'list' ? 'flex' : ''} space-y-4`}>
                  <Skeleton className={`${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'} rounded-lg`} />
                  <div className={`${viewMode === 'list' ? 'flex-1 ml-4' : ''} space-y-2`}>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!productsLoading && productsData?.products.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || category ? 'Try adjusting your search or filters' : 'Products coming soon!'}
              </p>
              {(searchTerm || category) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSearchParams({});
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          {/* Products Grid */}
          {!productsLoading && productsData?.products && productsData.products.length > 0 && (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
              {productsData.products.map((product, index) => {
                const badge = getBadgeText(product);
                const mainImage = product.product_images?.[0];
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className={`group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} overflow-hidden`}>
                      {mainImage ? (
                        <img
                          src={mainImage.url}
                          alt={mainImage.alt || product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <div className="text-muted-foreground">No Image</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Badge */}
                    {badge && (
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getBadgeColor(badge)} text-white`}>
                          {badge}
                        </Badge>
                      </div>
                    )}

                    {/* Product Info */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.categories?.name || 'Uncategorized'}
                        </p>
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(product.price_cents)}
                          </span>
                          {product.compare_at_cents && product.compare_at_cents > product.price_cents && (
                            <span className="text-lg text-muted-foreground line-through">
                              {formatPrice(product.compare_at_cents)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        className={`${viewMode === 'list' ? 'w-auto self-start' : 'w-full'} group`}
                        onClick={() => handleAddToCart(product.id, product.name)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Results Summary */}
          {!productsLoading && productsData && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Showing {productsData.products.length} products
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;