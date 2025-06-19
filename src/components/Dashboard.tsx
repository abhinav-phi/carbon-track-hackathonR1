import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingDown, Leaf, Building2 } from 'lucide-react';

interface DashboardProps {
  onViewAnalytics?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewAnalytics }) => {
  const metrics = [
    {
      icon: BarChart3,
      title: 'Total Emissions',
      value: '45,048',
      unit: 'tCO₂e',
      change: '+16%',
      trend: 'up',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      icon: TrendingDown,
      title: 'Energy Intensity',
      value: '123',
      unit: 'kWh/m²',
      change: '-22%',
      trend: 'down',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Leaf,
      title: 'Carbon Saved',
      value: '12,450',
      unit: 'tCO₂e',
      change: '+34%',
      trend: 'up',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      icon: Building2,
      title: 'Buildings Tracked',
      value: '247',
      unit: 'properties',
      change: '+8%',
      trend: 'up',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];

  const handleViewAnalytics = () => {
    if (onViewAnalytics) {
      onViewAnalytics();
    } else {
      // Scroll to analytics section
      const analyticsSection = document.getElementById('analytics');
      if (analyticsSection) {
        analyticsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="dashboard" className="pt-24 pb-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Carbon Emissions Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Monitor, analyze, and reduce your organization's carbon footprint with real-time insights and comprehensive reporting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.trend === 'up' ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-green-500 bg-green-50 dark:bg-green-900/20'
                }`}>
                  {metric.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {metric.title}
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors duration-200">
                  {metric.value}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white hover:shadow-2xl transition-all duration-500 group"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 group-hover:text-primary-100 transition-colors duration-300">
              Real-time Carbon Monitoring
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl group-hover:text-white transition-colors duration-300">
              Get instant insights into your carbon emissions with our advanced monitoring system. 
              Track progress towards your sustainability goals and identify optimization opportunities.
            </p>
            <button 
              onClick={handleViewAnalytics}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300 transform active:scale-95"
            >
              View Detailed Analytics
            </button>
          </div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          <div className="absolute bottom-4 right-12 w-8 h-8 bg-white/20 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
          <div className="absolute top-1/2 right-8 w-4 h-4 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;