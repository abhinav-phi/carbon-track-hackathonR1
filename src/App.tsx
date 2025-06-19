import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';
import BrandKits from './components/BrandKits';
import EmissionsChart from './components/EmissionsChart';
import PortfolioStats from './components/PortfolioStats';
import Analytics from './components/Analytics';
import Reports from './components/Reports';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleViewAnalytics = () => {
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
      analyticsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          
          <main>
            <Dashboard onViewAnalytics={handleViewAnalytics} />
            <BrandKits />
            <EmissionsChart />
            <PortfolioStats />
            <Analytics />
            <Reports />
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 dark:bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">CarbonTrack</h3>
                  <p className="text-gray-400 mb-4 max-w-md">
                    Leading the way in carbon emissions monitoring and sustainability reporting. 
                    Helping organizations achieve their net-zero goals through data-driven insights.
                  </p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>CarbonTrack Solutions Ltd.</p>
                    <p>123 Sustainability Street, Green City, GC 12345</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Email: info@carbontrack.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Platform</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                    <li><a href="#emissions" className="hover:text-white transition-colors">Emissions</a></li>
                    <li><a href="#analytics" className="hover:text-white transition-colors">Analytics</a></li>
                    <li><a href="#reports" className="hover:text-white transition-colors">Reports</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <a 
                        href="mailto:info@carbontrack.com?subject=About CarbonTrack" 
                        className="hover:text-white transition-colors"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a 
                        href="mailto:support@carbontrack.com?subject=Contact Support" 
                        className="hover:text-white transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/privacy-policy" 
                        className="hover:text-white transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Privacy Policy: CarbonTrack is committed to protecting your privacy. We collect and use data in accordance with GDPR and other applicable privacy laws. For detailed information, contact privacy@carbontrack.com');
                        }}
                      >
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/terms-of-service" 
                        className="hover:text-white transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Terms of Service: By using CarbonTrack, you agree to our terms and conditions. For complete terms, contact legal@carbontrack.com');
                        }}
                      >
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-center text-gray-400">
                <p>&copy; 2024 CarbonTrack Solutions Ltd. All rights reserved.</p>
                <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
                  <span>ISO 14001 Certified</span>
                  <span>GDPR Compliant</span>
                  <span>SOC 2 Type II</span>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;