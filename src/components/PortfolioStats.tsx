import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Download, ArrowRight } from 'lucide-react';
import Modal from './Modal';

const PortfolioStats: React.FC = () => {
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);

  const stats = [
    {
      title: 'Managed portfolio carbon footprint',
      value: '45,048',
      unit: 'tCO₂e',
      change: '+16%',
      trend: 'up',
      fromYear: 'from 2019',
      yearlyData: [
        { year: '2019', value: '38,673' },
        { year: '2020', value: '32,813' },
        { year: '2021', value: '14,111' },
        { year: '2022', value: '45,048' },
      ]
    },
    {
      title: 'Managed portfolio energy intensity',
      value: '123',
      unit: 'kWh/m²',
      change: '-22%',
      trend: 'down',
      fromYear: 'from 2019',
      yearlyData: [
        { year: '2019', value: '157' },
        { year: '2020', value: '135' },
        { year: '2021', value: '128' },
        { year: '2022', value: '123' },
      ]
    },
    {
      title: 'Managed portfolio energy consumption',
      value: '47,790,662',
      unit: 'kWh',
      change: '-27%',
      trend: 'down',
      fromYear: 'from 2019',
      yearlyData: [
        { year: '2019', value: '65,198,706' },
        { year: '2020', value: '48,784,205' },
        { year: '2021', value: '49,324,077' },
        { year: '2022', value: '47,790,662' },
      ]
    }
  ];

  const handleDownloadData = (statIndex: number) => {
    const stat = stats[statIndex];
    const csvContent = [
      ['Year', stat.title, 'Unit'],
      ...stat.yearlyData.map(item => [
        item.year,
        item.value,
        stat.unit
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${stat.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const carbonBreakdownData = [
    { category: 'Scope 1 - Direct Emissions', value: '12,450', percentage: 28, color: 'bg-red-500' },
    { category: 'Scope 2 - Electricity', value: '18,920', percentage: 42, color: 'bg-orange-500' },
    { category: 'Scope 3 - Indirect', value: '13,678', percentage: 30, color: 'bg-yellow-500' },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Performance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track your managed portfolio's carbon footprint and energy performance over time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 group"
            >
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {stat.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.unit}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.fromYear}
                  </span>
                  <div className={`flex items-center space-x-1 ${
                    stat.trend === 'up' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>

              {/* Yearly Progress Bars */}
              <div className="space-y-3 mb-6">
                {stat.yearlyData.map((yearData, yearIndex) => {
                  const maxValue = Math.max(...stat.yearlyData.map(d => parseInt(d.value.replace(/,/g, ''))));
                  const currentValue = parseInt(yearData.value.replace(/,/g, ''));
                  const percentage = (currentValue / maxValue) * 100;
                  
                  return (
                    <div key={yearIndex} className="flex items-center space-x-3 group/bar">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8 group-hover/bar:text-primary-600 transition-colors duration-200">
                        {yearData.year}
                      </span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (yearIndex * 0.1), duration: 0.8 }}
                          className="bg-primary-600 h-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
                        />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white font-medium w-20 text-right group-hover/bar:text-primary-600 transition-colors duration-200">
                        {yearData.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {index === 0 && (
                  <button 
                    onClick={() => setShowBreakdownModal(true)}
                    className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-3 py-2 rounded-md transition-all duration-200 group/btn"
                  >
                    <span>See full breakdown of carbon footprint</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                )}
                {index > 0 && (
                  <button 
                    onClick={() => handleDownloadData(index)}
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-200 group/btn"
                  >
                    <Download className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                    <span>Download the data</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carbon Footprint Breakdown Modal */}
        <Modal
          isOpen={showBreakdownModal}
          onClose={() => setShowBreakdownModal(false)}
          title="Carbon Footprint Breakdown"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">45,048 tCO₂e</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Carbon Footprint (2022)</div>
            </div>

            <div className="space-y-4">
              {carbonBreakdownData.map((item, index) => (
                <div key={index} className="space-y-2 group">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors duration-200">{item.category}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.value} tCO₂e</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      className={`h-3 rounded-full ${item.color} hover:opacity-80 transition-opacity duration-200`}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.percentage}% of total emissions</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleDownloadData(0)}
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Download Detailed Breakdown</span>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default PortfolioStats;