import React from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';

const Account: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-8">
            My Account
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <User className="text-electric-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Profile</h3>
              <p className="text-dark-muted mb-4">Manage your personal information</p>
              <Button variant="outline" className="border-dark-border text-dark-text hover:bg-electric-500 hover:text-white hover:border-electric-500">
                Edit Profile
              </Button>
            </div>
            
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <Package className="text-neon-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Orders</h3>
              <p className="text-dark-muted mb-4">Track your orders and history</p>
              <Button variant="outline" className="border-dark-border text-dark-text hover:bg-neon-500 hover:text-white hover:border-neon-500">
                View Orders
              </Button>
            </div>
            
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <Heart className="text-emerald-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Wishlist</h3>
              <p className="text-dark-muted mb-4">Save items for later</p>
              <Button variant="outline" className="border-dark-border text-dark-text hover:bg-emerald-500 hover:text-white hover:border-emerald-500">
                View Wishlist
              </Button>
            </div>
            
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <Settings className="text-orange-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Settings</h3>
              <p className="text-dark-muted mb-4">Preferences and security</p>
              <Button variant="outline" className="border-dark-border text-dark-text hover:bg-orange-500 hover:text-white hover:border-orange-500">
                Manage Settings
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;