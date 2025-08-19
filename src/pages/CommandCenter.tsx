import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Kanban, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';

const CommandCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Command Center
            </h1>
            <p className="text-xl text-dark-muted">
              Your creative hub for content planning and execution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <Kanban className="text-electric-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Kanban Board</h3>
              <p className="text-dark-muted mb-4">Organize your content workflow</p>
              <Button className="bg-electric-500 hover:bg-electric-600 text-white">
                Open Board
              </Button>
            </div>
            
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <Calendar className="text-neon-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Content Calendar</h3>
              <p className="text-dark-muted mb-4">Schedule and plan your posts</p>
              <Button className="bg-neon-500 hover:bg-neon-600 text-white">
                View Calendar
              </Button>
            </div>
            
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <Lightbulb className="text-emerald-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Ideas Hub</h3>
              <p className="text-dark-muted mb-4">Capture and develop concepts</p>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Explore Ideas
              </Button>
            </div>
            
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-electric-500/50 transition-all duration-300">
              <TrendingUp className="text-orange-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-dark-text mb-2">Analytics</h3>
              <p className="text-dark-muted mb-4">Track your content performance</p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                View Stats
              </Button>
            </div>
          </div>

          <div className="bg-dark-card rounded-2xl p-8 border border-dark-border">
            <h2 className="text-2xl font-bold text-dark-text mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                <div>
                  <h3 className="font-medium text-dark-text">New Campaign: Summer Collection Launch</h3>
                  <p className="text-dark-muted text-sm">Created 2 hours ago</p>
                </div>
                <div className="bg-electric-500/20 text-electric-400 px-3 py-1 rounded-full text-sm">
                  In Progress
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                <div>
                  <h3 className="font-medium text-dark-text">Content Draft: "Bold Fashion Trends"</h3>
                  <p className="text-dark-muted text-sm">Updated yesterday</p>
                </div>
                <div className="bg-neon-500/20 text-neon-400 px-3 py-1 rounded-full text-sm">
                  Review
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                <div>
                  <h3 className="font-medium text-dark-text">Social Media Calendar Updated</h3>
                  <p className="text-dark-muted text-sm">2 days ago</p>
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                  Completed
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommandCenter;