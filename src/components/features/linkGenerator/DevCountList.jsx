/**
 * DevCountList.jsx - Display and manage dev counts from Chrome extension
 */

import React, { useState } from 'react';
import { Copy, Trash2, Download, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DevCountList = ({ devCountList, onClear }) => {
    const [copied, setCopied] = useState(false);

    if (!devCountList || devCountList.length === 0) {
        return null;
    }

    const formatCount = (num) => {
        if (num >= 1000) {
            return `${Math.floor(num / 1000)}K+`;
        }
        return num.toLocaleString();
    };

    const handleCopyList = () => {
        // Format: Company Name - Count
        const text = devCountList
            .map(item => `${item.company} - ${item.count}`)
            .join('\n');

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyCSV = () => {
        // Format: Company,Count
        const csv = 'Company,Count\n' + devCountList
            .map(item => `${item.company},${item.count}`)
            .join('\n');

        navigator.clipboard.writeText(csv);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadCSV = () => {
        const csv = 'Company,Count\n' + devCountList
            .map(item => `${item.company},${item.count}`)
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `linkforge-dev-counts-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border border-blue-200"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        Dev Count Tracker
                    </h3>
                    <p className="text-sm text-gray-600">
                        {devCountList.length} compan{devCountList.length === 1 ? 'y' : 'ies'} detected
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={handleCopyList}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg
                                 hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        title="Copy as plain text"
                    >
                        {copied ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                Copy
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleCopyCSV}
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg
                                 hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                        title="Copy as CSV"
                    >
                        <Copy className="w-4 h-4" />
                        CSV
                    </button>

                    <button
                        onClick={handleDownloadCSV}
                        className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg
                                 hover:bg-purple-700 transition-colors text-sm font-medium shadow-sm"
                        title="Download as CSV"
                    >
                        <Download className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onClear}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg
                                 hover:bg-red-700 transition-colors text-sm font-medium shadow-sm"
                        title="Clear all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-lg shadow-sm max-h-96 overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Company
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                Dev Count
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                Last Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <AnimatePresence>
                            {devCountList.map((item, index) => (
                                <motion.tr
                                    key={item.company}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-blue-50 transition-colors"
                                >
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                        {item.company}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-right">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full
                                                       bg-blue-100 text-blue-800 font-semibold">
                                            {formatCount(item.count)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500 text-right">
                                        {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Footer Info */}
            <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-gray-600">
                    Total developers tracked: <span className="font-semibold text-gray-800">
                        {devCountList.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                    </span>
                </p>
            </div>
        </motion.div>
    );
};

export default DevCountList;
