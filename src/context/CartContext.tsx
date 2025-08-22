import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  variant_id: string | null;
  qty: number;
  unit_price_cents: number;
  subtotal_cents: number;
  product: {
    name: string;
    slug: string;
    price_cents: number;
    images: Array<{ url: string; alt: string | null; }>;
  };
  variant: {
    name: string;
    sku: string;
  } | null;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  cartId: string | null;
  loading: boolean;
  addItem: (productId: string, variantId?: string, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CART_ID_COOKIE = 'cart_id';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Get or create cart on mount
  useEffect(() => {
    initializeCart();
  }, [user]);

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.subtotal_cents, 0) / 100;

  const initializeCart = async () => {
    try {
      setLoading(true);
      let currentCartId = localStorage.getItem(CART_ID_COOKIE);
      
      if (user?.id) {
        // For authenticated users, find or create cart
        const { data: existingCart } = await supabase
          .from('carts')
          .select('id')
          .eq('user_id', user.id)
          .single();
          
        if (existingCart) {
          currentCartId = existingCart.id;
        } else {
          // Create new cart for user
          const { data: newCart, error } = await supabase
            .from('carts')
            .insert({ user_id: user.id })
            .select('id')
            .single();
            
          if (error) throw error;
          currentCartId = newCart.id;
        }
      } else if (!currentCartId) {
        // For guest users, create anonymous cart
        const { data: newCart, error } = await supabase
          .from('carts')
          .insert({ 
            user_id: null,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
          })
          .select('id')
          .single();
          
        if (error) throw error;
        currentCartId = newCart.id;
      }
      
      if (currentCartId) {
        localStorage.setItem(CART_ID_COOKIE, currentCartId);
        setCartId(currentCartId);
        await loadCartItems(currentCartId);
      }
    } catch (error) {
      console.error('Error initializing cart:', error);
      toast({
        title: "Error",
        description: "Failed to initialize cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCartItems = async (cartId: string) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products!cart_items_product_id_fkey (
            name,
            slug,
            price_cents,
            product_images (url, alt)
          ),
          variants (name, sku)
        `)
        .eq('cart_id', cartId);

      if (error) throw error;

      const cartItems: CartItem[] = (data || []).map(item => ({
        id: item.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        qty: item.qty,
        unit_price_cents: item.products.price_cents,
        subtotal_cents: item.products.price_cents * item.qty,
        product: {
          name: item.products.name,
          slug: item.products.slug,
          price_cents: item.products.price_cents,
          images: item.products.product_images || []
        },
        variant: item.variants
      }));

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const addItem = async (productId: string, variantId?: string, quantity: number = 1) => {
    if (!cartId) {
      toast({
        title: "Error",
        description: "Cart not initialized",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get product info for pricing
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('price_cents')
        .eq('id', productId)
        .single();

      if (productError) throw productError;

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, qty')
        .eq('cart_id', cartId)
        .eq('product_id', productId)
        .eq('variant_id', variantId || null)
        .single();

      if (existingItem) {
        // Update existing item
        await updateQuantity(existingItem.id, existingItem.qty + quantity);
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cartId,
            product_id: productId,
            variant_id: variantId || null,
            qty: quantity,
            unit_cents: product.price_cents
          });

        if (error) throw error;
        await loadCartItems(cartId);
      }

      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      
      setItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cartId) return;

    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ qty: quantity })
        .eq('id', itemId);

      if (error) throw error;
      
      setItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, qty: quantity, subtotal_cents: item.unit_price_cents * quantity }
          : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error", 
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);

      if (error) throw error;
      
      setItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart", 
        variant: "destructive",
      });
    }
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      isOpen,
      cartId,
      loading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};