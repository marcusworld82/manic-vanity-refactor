import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';

const CartDrawer: React.FC = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-card border-l border-dark-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold text-dark-text">Shopping Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCart}
                className="text-dark-text hover:text-electric-400 hover:bg-dark-bg"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-dark-muted mb-4" />
                  <h3 className="text-lg font-medium text-dark-text mb-2">Your cart is empty</h3>
                  <p className="text-dark-muted mb-6">Add some items to get started</p>
                  <Button
                    onClick={toggleCart}
                    className="bg-electric-500 hover:bg-electric-600 text-white"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex space-x-4 bg-dark-bg rounded-lg p-4 border border-dark-border"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-dark-text mb-1">{item.name}</h3>
                        <p className="text-electric-400 font-semibold mb-2">${item.price}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 border-dark-border text-dark-text hover:bg-electric-500 hover:text-white hover:border-electric-500"
                            >
                              <Minus size={12} />
                            </Button>
                            <span className="text-dark-text font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 border-dark-border text-dark-text hover:bg-electric-500 hover:text-white hover:border-electric-500"
                            >
                              <Plus size={12} />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dark-border p-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-dark-text">Total:</span>
                  <span className="text-electric-400">${totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full bg-electric-500 hover:bg-electric-600 text-white py-3"
                  onClick={() => {
                    toggleCart();
                    // Navigate to checkout
                  }}
                >
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;