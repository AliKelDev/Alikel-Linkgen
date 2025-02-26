import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyInput from './CompanyInput';
import GeneratedLinkCard from './GeneratedLinkCard';
import SearchHistorySection from './SearchHistorySection';
import RoleSelector from '../../../components/common/RoleSelector';
import { useRole } from '../../../contexts/RoleContext';
import { generateLinks as generateSalesLinks } from '../../../utils/linkUtils/sales';
import { generateLinks as generateRecruiterLinks } from '../../../utils/linkUtils/recruiter';
import { generateLinks as generateJobSeekerLinks } from '../../../utils/linkUtils/jobseeker';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import OpenAllLinksButton from './OpenAllLinksButton';

const PRIORITY_DOMAINS = ['.com', '.fr', '.es', '.it'];
const SECONDARY_DOMAINS = [
    '.eu', '.co.uk', '.de', '.pt', '.nl', '.be', '.ch', '.at', '.dk', '.ie', '.no', '.se', '.fi',
    '.pl', '.cz', '.sk', '.hu', '.ro', '.bg', '.hr', '.si', '.ee', '.lv', '.lt',
    '.gr', '.mt', '.cy', '.il', '.ae', '.sa', '.qa', '.bh', '.kw', '.om',
    '.za', '.eg', '.ma', '.ng', '.ke', '.tz', '.io', '.ai', '.tech', '.co'
];

const BulkLinkGenerator = ({ updateMetrics, setNotifications }) => {
    const [generatedLinks, setGeneratedLinks] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const { currentRole, roleConfig } = useRole();
    const [showBucketSelector, setShowBucketSelector] = useState(true);
    const [loading, setLoading] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', checkMobile);
        checkMobile();
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load search history
    useEffect(() => {
        const savedHistory = localStorage.getItem(`searchHistory_${currentRole}`);
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }, [currentRole]);

    const getRoleSpecificLinks = (company, domain) => {
        switch (currentRole) {
            case 'sales':
                return generateSalesLinks(company, domain);
            case 'recruiter':
                return generateRecruiterLinks(company, domain);
            case 'jobseeker':
                return generateJobSeekerLinks(company, domain);
            default:
                return generateSalesLinks(company, domain);
        }
    };

    const handleGenerateLinks = async (companies) => {
        setLoading(true);
        
        try {
            const newLinks = companies.map((company) => ({
                id: Date.now() + Math.random(),
                company,
                priorityDomains: PRIORITY_DOMAINS,
                secondaryDomains: SECONDARY_DOMAINS,
                selectedDomain: null,
                links: getRoleSpecificLinks(company, PRIORITY_DOMAINS[0]),
                role: currentRole
            }));

            setGeneratedLinks(newLinks);
            saveToHistory(companies, newLinks);
            
            if (updateMetrics) {
                updateMetrics();
            }

            // Scroll to results with smooth behavior
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start'
                });
            }

            // Add notification
            setNotifications(prev => [...prev, {
                id: Date.now() + Math.random(),
                message: `Generated links for ${companies.length} company${companies.length > 1 ? 'ies' : 'y'}.`,
                read: false,
            }]);

        } catch (error) {
            console.error('Error generating links:', error);
            setNotifications(prev => [...prev, {
                id: Date.now() + Math.random(),
                message: 'Error generating links. Please try again.',
                read: false,
                error: true
            }]);
        } finally {
            setLoading(false);
        }
    };

    const saveToHistory = (companies, newLinks) => {
        const timestamp = new Date().toISOString();
        const newSearches = companies.map((company) => ({
            id: Date.now() + Math.random(),
            company,
            timestamp,
            role: currentRole
        }));

        // Keep only unique companies, limit to 50 most recent
        const combinedHistory = [...newSearches, ...searchHistory];
        const uniqueHistory = Array.from(
            new Map(combinedHistory.map((item) => [item.company, item])).values()
        ).slice(0, 50);

        setSearchHistory(uniqueHistory);
        localStorage.setItem(`searchHistory_${currentRole}`, JSON.stringify(uniqueHistory));

        // Save generated links
        const storedLinks = localStorage.getItem(`generatedLinks_${currentRole}`);
        const links = storedLinks ? JSON.parse(storedLinks) : [];
        localStorage.setItem(`generatedLinks_${currentRole}`, JSON.stringify([...links, ...newLinks]));
    };

    const toggleBucketSelector = () => {
        setShowBucketSelector(!showBucketSelector);
    };

    return (
        <div className="min-h-screen py-6 md:py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-2">
                        {roleConfig.title} Link Generator
                    </h1>
                    <p className="text-base md:text-lg text-blue-200 mb-4">
                        {roleConfig.description}
                    </p>
                    <button
                        onClick={toggleBucketSelector}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/80 
                                 text-white rounded-lg hover:bg-blue-700 transition-colors 
                                 shadow-sm backdrop-blur-sm touch-manipulation"
                    >
                        {showBucketSelector ? 'Hide' : 'Show'} Bucket Selector
                        {showBucketSelector ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                </div>

                {/* Role Selector */}
                <RoleSelector />

                {/* Main Content Card */}
                <div className="bg-white/80 rounded-2xl shadow-xl p-4 md:p-8 backdrop-blur-lg">
                    <CompanyInput onSubmit={handleGenerateLinks} />

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center gap-3 mt-8">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                            <span className="text-gray-600">Generating links...</span>
                        </div>
                    )}

                    {/* Generated Links */}
                    <div ref={scrollRef}>
                        <AnimatePresence mode="wait">
                            {generatedLinks.length > 0 && (
                                <motion.div
                                className="mt-8 md:mt-12 space-y-6 md:space-y-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                {/* Open All Links Buttons */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <OpenAllLinksButton 
                                        generatedLinks={generatedLinks.filter(linkData => linkData.role === currentRole)} 
                                        linkType="dev" 
                                        label="Dev Search" 
                                    />
                                    <OpenAllLinksButton 
                                        generatedLinks={generatedLinks.filter(linkData => linkData.role === currentRole)} 
                                        linkType="securityIAM" 
                                        label="Security/IAM" 
                                    />
                                    <OpenAllLinksButton 
                                        generatedLinks={generatedLinks.filter(linkData => linkData.role === currentRole)} 
                                        linkType="finance" 
                                        label="Finance" 
                                    />
                                </div>
                                
                                {/* Individual Link Cards */}
                                {generatedLinks
                                    .filter(linkData => linkData.role === currentRole)
                                    .map((linkData) => (
                                        <GeneratedLinkCard
                                            key={linkData.id}
                                            linkData={linkData}
                                            onUpdateLink={(updatedLink) => {
                                                setGeneratedLinks(prev =>
                                                    prev.map(link => 
                                                        link.id === updatedLink.id ? updatedLink : link
                                                    )
                                                );
                                            }}
                                            showBucketSelector={showBucketSelector}
                                            isExpanded={expandedCard === linkData.id}
                                            onToggleExpand={() => {
                                                setExpandedCard(
                                                    expandedCard === linkData.id ? null : linkData.id
                                                );
                                            }}
                                            isMobile={isMobile}
                                        />
                                    ))}
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Search History */}
                    <SearchHistorySection
                        searchHistory={searchHistory}
                        onClearHistory={() => {
                            setSearchHistory([]);
                            localStorage.removeItem(`searchHistory_${currentRole}`);
                            localStorage.removeItem(`generatedLinks_${currentRole}`);
                            if (updateMetrics) {
                                updateMetrics();
                            }
                        }}
                        onSearchAgain={(company) => {
                            handleGenerateLinks([company]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BulkLinkGenerator;