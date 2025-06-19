import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart, LineChart, Calendar, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const [activeChart, setActiveChart] = useState('emissions');
  const [timeRange, setTimeRange] = useState('year');

  const chartTypes = [
    { id: 'emissions', name: 'Emissions Breakdown', icon: PieChart },
    { id: 'trends', name: 'Trend Analysis', icon: LineChart },
    { id: 'comparison', name: 'Portfolio Comparison', icon: BarChart },
  ];

  const timeRanges = [
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' },
    { id: 'all', name: 'All Time' },
  ];

  // Mock chart data generator
  const generateChartData = (chartType: string, timeRange: string) => {
    const baseValues = {
      emissions: { month: 120, quarter: 350, year: 1200, all: 5000 },
      trends: { month: 95, quarter: 280, year: 980, all: 4200 },
      comparison: { month: 85, quarter: 240, year: 850, all: 3800 }
    };

    const base = baseValues[chartType as keyof typeof baseValues][timeRange as keyof typeof baseValues.emissions];
    return Array.from({ length: timeRange === 'month' ? 30 : timeRange === 'quarter' ? 12 : timeRange === 'year' ? 12 : 60 }, 
      (_, i) => ({
        name: timeRange === 'month' ? `Day ${i + 1}` : 
              timeRange === 'quarter' ? `Week ${i + 1}` :
              timeRange === 'year' ? `Month ${i + 1}` : 
              `Period ${i + 1}`,
        value: Math.floor(base + Math.random() * 200 - 100)
      })
    );
  };

  // Dynamic data based on selections
  const getChartData = () => {
    const baseData = {
      emissions: {
        month: { target: '95%', change: '-8%', properties: '247' },
        quarter: { target: '88%', change: '-15%', properties: '247' },
        year: { target: '85%', change: '-22%', properties: '247' },
        all: { target: '82%', change: '-28%', properties: '247' }
      },
      trends: {
        month: { target: '92%', change: '-5%', properties: '247' },
        quarter: { target: '89%', change: '-12%', properties: '247' },
        year: { target: '87%', change: '-18%', properties: '247' },
        all: { target: '84%', change: '-25%', properties: '247' }
      },
      comparison: {
        month: { target: '90%', change: '-3%', properties: '247' },
        quarter: { target: '86%', change: '-10%', properties: '247' },
        year: { target: '83%', change: '-20%', properties: '247' },
        all: { target: '80%', change: '-30%', properties: '247' }
      }
    };

    return baseData[activeChart as keyof typeof baseData][timeRange as keyof typeof baseData.emissions];
  };

  const currentData = getChartData();
  const chartData = generateChartData(activeChart, timeRange);


  // Render different chart types
  const renderChart = () => {
    const maxValue = Math.max(...chartData.map(d => d.value));
    const minValue = Math.min(...chartData.map(d => d.value));

    if (activeChart === 'emissions') {
      // Pie chart representation
      return (
        <div className="flex items-center justify-center h-full">
          <div className="relative">
            <div className="w-48 h-48 rounded-full border-8 border-primary-200 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full border-8 border-primary-600" 
                   style={{ 
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     background: `conic-gradient(from 0deg, #3b82f6 0deg ${(currentData.target.replace('%', '') as any) * 3.6}deg, #e5e7eb ${(currentData.target.replace('%', '') as any) * 3.6}deg 360deg)` 
                   }}>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData.target}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Target Met</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeChart === 'trends') {
      // Line chart representation
      return (
        <div className="h-full p-4">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#e5e7eb" strokeWidth="1"/>
            ))}
            {/* Data line */}
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              points={chartData.map((d, i) => 
                `${(i / (chartData.length - 1)) * 400},${200 - ((d.value - minValue) / (maxValue - minValue)) * 160}`
              ).join(' ')}
            />
            {/* Fill area */}
            <polygon
              fill="url(#gradient)"
              points={`0,200 ${chartData.map((d, i) => 
                `${(i / (chartData.length - 1)) * 400},${200 - ((d.value - minValue) / (maxValue - minValue)) * 160}`
              ).join(' ')} 400,200`}
            />
            {/* Data points */}
            {chartData.map((d, i) => (
              <circle
                key={i}
                cx={(i / (chartData.length - 1)) * 400}
                cy={200 - ((d.value - minValue) / (maxValue - minValue)) * 160}
                r="3"
                fill="#3b82f6"
                className="hover:r-5 transition-all duration-200"
              />
            ))}
          </svg>
        </div>
      );
    } else {
      // Bar chart representation
      return (
        <div className="h-full p-4">
          <div className="flex items-end justify-between h-full space-x-1">
            {chartData.slice(0, 12).map((item, index) => (
              <motion.div
                key={`${activeChart}-${timeRange}-${index}`}
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-primary-600 rounded-t hover:bg-primary-700 transition-colors duration-200 cursor-pointer group relative"
                style={{ minWidth: '20px' }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <section id="analytics" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced Analytics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dive deep into your carbon data with interactive charts and comprehensive analysis tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Chart Type
                </h3>
                <div className="space-y-2">
                  {chartTypes.map((chart) => (
                    <button
                      key={chart.id}
                      onClick={() => setActiveChart(chart.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
                        activeChart === chart.id
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <chart.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{chart.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Time Range
                </h3>
                <div className="space-y-2">
                  {timeRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setTimeRange(range.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
                        timeRange === range.id
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className="text-sm font-medium">{range.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Selection Summary */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Current View</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {chartTypes.find(c => c.id === activeChart)?.name} for {timeRanges.find(r => r.id === timeRange)?.name.toLowerCase()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Chart Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {chartTypes.find(c => c.id === activeChart)?.name}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {timeRanges.find(r => r.id === timeRange)?.name}
                </div>
              </div>

              {/* Dynamic Chart */}
              <motion.div 
                key={`${activeChart}-${timeRange}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-80 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                {renderChart()}
              </motion.div>

              {/* Dynamic Chart Stats */}
              <motion.div 
                key={`stats-${activeChart}-${timeRange}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData.target}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Reduction Target</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-2xl font-bold text-green-600">{currentData.change}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {timeRange === 'month' ? 'MoM Change' : 
                     timeRange === 'quarter' ? 'QoQ Change' : 
                     timeRange === 'year' ? 'YoY Change' : 'Total Change'}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-2xl font-bold text-blue-600">{currentData.properties}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Properties</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;