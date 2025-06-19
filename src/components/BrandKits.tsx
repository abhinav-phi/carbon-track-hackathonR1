import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Settings, Check } from 'lucide-react';

const BrandKits: React.FC = () => {
  const [selectedKit, setSelectedKit] = useState<string>('the-agency');

  const brandKits = [
    {
      id: 'ecorp',
      name: 'ECorp',
      color: 'bg-emerald-500',
      selected: false,
    },
    {
      id: 'icorp',
      name: 'ICorp',
      color: 'bg-orange-500',
      selected: false,
    },
    {
      id: 'the-agency',
      name: 'The Agency',
      color: 'bg-red-500',
      selected: true,
    },
  ];

  return (
    <section id="brand-kits" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Brand Kits
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your organization's brand identities and carbon tracking preferences
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 border border-gray-700"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <h3 className="text-white text-xl font-semibold mb-6">Brand Kits</h3>
            
            <div className="space-y-3">
              {brandKits.map((kit, index) => (
                <motion.div
                  key={kit.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedKit(kit.id)}
                  className="flex items-center justify-between p-4 bg-gray-800/50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700/50 dark:hover:bg-gray-600/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {selectedKit === kit.id ? (
                        <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-500 rounded"></div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${kit.color} rounded-full flex items-center justify-center`}>
                        <Cloud className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium">{kit.name}</span>
                    </div>
                  </div>
                  
                  <Settings className="w-5 h-5 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandKits;