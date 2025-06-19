import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, Share2, Mail, Send, Link } from 'lucide-react';
import Modal from './Modal';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [shareReportName, setShareReportName] = useState('');
  const [emailForm, setEmailForm] = useState({
    recipients: '',
    subject: '',
    message: '',
    schedule: 'once'
  });

  const reports = [
    {
      id: 'monthly',
      name: 'Monthly Carbon Report',
      description: 'Comprehensive monthly analysis of carbon emissions and energy consumption',
      lastGenerated: '2024-01-15',
      size: '2.4 MB',
      format: 'PDF',
    },
    {
      id: 'quarterly',
      name: 'Quarterly Sustainability Report',
      description: 'Detailed quarterly review with trend analysis and recommendations',
      lastGenerated: '2024-01-01',
      size: '5.8 MB',
      format: 'PDF',
    },
    {
      id: 'annual',
      name: 'Annual ESG Report',
      description: 'Complete annual environmental, social, and governance report',
      lastGenerated: '2024-12-31',
      size: '12.3 MB',
      format: 'PDF',
    },
    {
      id: 'custom',
      name: 'Custom Data Export',
      description: 'Export specific data ranges and metrics in various formats',
      lastGenerated: '2024-01-10',
      size: '1.2 MB',
      format: 'CSV/Excel',
    },
  ];

  const recentReports = [
    { name: 'May 2025 Carbon Report', date: '2025-05-05', status: 'Ready' },
    { name: 'Q4 2025 Sustainability Report', date: '2025-05-12', status: 'Ready' },
    { name: 'April 2025 Carbon Report', date: '2025-04-04', status: 'Ready' },
    { name: 'Q3 2025 Sustainability Report', date: '2025-04-10', status: 'Ready' },
  ];

  const handleDownloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    // Create a mock file download
    const content = `${report.name}\nGenerated: ${report.lastGenerated}\nSize: ${report.size}\nFormat: ${report.format}\n\nThis is a sample report download.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.toLowerCase().replace(/\s+/g, '-')}-${report.lastGenerated}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareReport = (reportName: string) => {
    setShareReportName(reportName);
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/reports/shared/${shareReportName.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  const handleEmailReport = () => {
    setShowEmailModal(true);
  };

  const handleSendEmail = () => {
    // Mock email sending
    alert(`Email scheduled to be sent to: ${emailForm.recipients}`);
    setShowEmailModal(false);
    setEmailForm({ recipients: '', subject: '', message: '', schedule: 'once' });
  };

  const handleGenerateReport = () => {
    const selectedReportData = reports.find(r => r.id === selectedReport);
    if (selectedReportData) {
      alert(`Generating ${selectedReportData.name}... This may take a few minutes.`);
    }
  };

  return (
    <section id="reports" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Reports & Exports
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate comprehensive reports and export your carbon data for compliance and analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Types */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Available Reports
              </h3>
              
              <div className="space-y-4">
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedReport === report.id
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedReport === report.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {report.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {report.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>Last: {report.lastGenerated}</span>
                            <span>{report.size}</span>
                            <span>{report.format}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadReport(report.id);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareReport(report.name);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                          title="Share Report"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Generate Report Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleGenerateReport}
                    className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Generate New Report</span>
                  </button>
                  <button 
                    onClick={handleEmailReport}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Schedule Email</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Recent Reports
              </h3>
              
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {report.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                        {report.status}
                      </span>
                      <button 
                        onClick={() => handleDownloadReport('monthly')}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button 
                    onClick={handleEmailReport}
                    className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Monthly Report</span>
                  </button>
                  <button 
                    onClick={() => setSelectedReport('custom')}
                    className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Custom Data Export</span>
                  </button>
                  <button 
                    onClick={handleEmailReport}
                    className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Preferences</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Share Modal */}
        <Modal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title="Share Report"
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {shareReportName}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share this report with stakeholders and team members
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Link className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Copy Share Link</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Generate a shareable link</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setShowEmailModal(true);
                }}
                className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Send via Email</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Email directly to recipients</div>
                </div>
              </button>
            </div>
          </div>
        </Modal>

        {/* Email Modal */}
        <Modal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          title="Email Report"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recipients
              </label>
              <input
                type="email"
                value={emailForm.recipients}
                onChange={(e) => setEmailForm({...emailForm, recipients: e.target.value})}
                placeholder="Enter email addresses separated by commas"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                placeholder="Carbon Emissions Report"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={emailForm.message}
                onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                placeholder="Please find attached the latest carbon emissions report..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule
              </label>
              <select
                value={emailForm.schedule}
                onChange={(e) => setEmailForm({...emailForm, schedule: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="once">Send Once</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleSendEmail}
                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Email</span>
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Reports;
