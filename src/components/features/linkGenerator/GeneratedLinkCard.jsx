import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import DomainList from './DomainList';
import BucketSelector from '../../../components/BucketSelector';
import { generateLinks } from '../../../components/linkUtils';
import { useChatAssistant } from '../../AnimatedBackground';

const GeneratedLinkCard = ({ 
    linkData, 
    onUpdateLink, 
    showBucketSelector, 
    isExpanded, 
    onToggleExpand,
    isMobile 
}) => {
    const [copiedStates, setCopiedStates] = useState({});
    const [selectedCompany, setSelectedCompany] = useState(linkData);
    
    // Use the global chat context instead of local state
    const { openChat } = useChatAssistant();

    const handleDomainSelect = (domain) => {
        const updatedLink = {
            ...selectedCompany,
            selectedDomain: domain,
            links: generateLinks(selectedCompany.company, domain)
        };
        setSelectedCompany(updatedLink);
        onUpdateLink(updatedLink);
    };

    const handleBucketSelect = (bucket) => {
        const updatedLink = {
            ...selectedCompany,
            bucket
        };
        setSelectedCompany(updatedLink);
        onUpdateLink(updatedLink);
    };

    const handleCopy = async (type, link, description) => {
        try {
            await navigator.clipboard.writeText(`${description}\n${link}`);
            setCopiedStates((prev) => ({ ...prev, [type]: true }));
            
            // Reset copy state after 2 seconds
            setTimeout(() => {
                setCopiedStates((prev) => ({ ...prev, [type]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    
    // Open the global chat assistant with context about this company
    const handleOpenChat = () => {
        openChat(
            selectedCompany.company, 
            selectedCompany.selectedDomain,
            { company: selectedCompany.company, domain: selectedCompany.selectedDomain }
        );
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-md overflow-hidden"
        >
            <div className="p-4 md:p-6">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-blue-900 break-words">
                            {selectedCompany.company}
                        </h3>
                        {selectedCompany.selectedDomain && (
                            <p className="text-sm text-blue-600 mt-1">
                                Selected Domain: {selectedCompany.selectedDomain}
                            </p>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {/* Ask AI Button */}
                        <motion.button
                            onClick={handleOpenChat}
                            className="inline-flex items-center justify-center gap-2 p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Ask Kei about this company"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm font-medium">Ask Kei</span>
                        </motion.button>
                        
                        {isMobile && (
                            <button
                                onClick={onToggleExpand}
                                className="inline-flex items-center justify-center p-2.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                aria-expanded={isExpanded}
                            >
                                {isExpanded ? (
                                    <span className="flex items-center gap-1">
                                        <ChevronUp className="w-4 h-4" />
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {(!isMobile || isExpanded) && (
                        <motion.div
                            initial={isMobile ? { height: 0, opacity: 0 } : false}
                            animate={isMobile ? { height: 'auto', opacity: 1 } : false}
                            exit={isMobile ? { height: 0, opacity: 0 } : false}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Bucket Selector */}
                            {showBucketSelector && (
                                <div className="mb-6">
                                    <BucketSelector
                                        selectedBucket={selectedCompany.bucket}
                                        onChange={handleBucketSelect}
                                    />
                                </div>
                            )}

                            {/* Domain List */}
                            <div className="mb-6">
                                <DomainList
                                    priorityDomains={selectedCompany.priorityDomains}
                                    secondaryDomains={selectedCompany.secondaryDomains}
                                    selectedDomain={selectedCompany.selectedDomain}
                                    onDomainSelect={handleDomainSelect}
                                    companyName={selectedCompany.company}
                                    isMobile={isMobile}
                                />
                            </div>

                            {/* Generated Links */}
                            <div className="space-y-4">
                                {Object.entries(selectedCompany.links).map(([type, linkInfo]) => (
                                    <div 
                                        key={type}
                                        className="flex flex-col md:flex-row items-start justify-between gap-4 p-4 bg-white rounded-lg shadow-sm"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-blue-900 mb-2">
                                                {linkInfo.title}
                                            </div>
                                            <a
                                                href={linkInfo.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 break-all"
                                            >
                                                <span className="truncate">
                                                    {isMobile ? linkInfo.link.substring(0, 40) + '...' : linkInfo.link}
                                                </span>
                                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                            </a>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {linkInfo.description}
                                            </p>
                                        </div>

                                        <motion.button
                                            onClick={() => handleCopy(type, linkInfo.link, linkInfo.description)}
                                            className={`
                                                inline-flex items-center justify-center gap-2 px-4 py-2 
                                                rounded-lg transition-all min-h-[44px] w-full md:w-auto
                                                ${copiedStates[type]
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                                } text-white shadow-sm hover:shadow-md
                                            `}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {copiedStates[type] ? (
                                                    <motion.span
                                                        key="check"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                        Copied!
                                                    </motion.span>
                                                ) : (
                                                    <motion.span
                                                        key="copy"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                        Copy Link
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default GeneratedLinkCard;