import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

const OrderSuccess: React.FC = () => {
  const { paymentIntentId } = useParams();
  const [orderNumber] = useState(() => 
    `MV${Date.now().toString().slice(-8).toUpperCase()}`
  );

  useEffect(() => {
    // Clear any remaining cart state
    localStorage.removeItem('cart_id');
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15 
            }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={48} className="text-emerald-500" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-lg border border-border p-8 mb-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-lg">
                <Package size={20} className="text-primary" />
                <span className="font-semibold text-foreground">Order Number</span>
              </div>
              <p className="text-2xl font-mono font-bold text-primary">
                {orderNumber}
              </p>
              
              {paymentIntentId && (
                <div className="text-sm text-muted-foreground border-t border-border pt-4">
                  <p>Payment ID: {paymentIntentId}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-lg border border-border p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">What's Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an order confirmation email within the next few minutes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be processed and prepared for shipping within 1-2 business days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    Once shipped, you'll receive tracking information to monitor your delivery.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Package size={16} className="mr-2" />
                  Track Your Order
                </Button>
              </Link>
              
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Home size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            <p>
              Need help with your order?{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;