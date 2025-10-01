/**
 * BulkLinkGenerator.jsx - src/components/features/linkGenerator/BulkLinkGenerator.jsx
 * Main component for bulk link generation with Chrome extension integration
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyInput from './CompanyInput';
import GeneratedLinkCard from './GeneratedLinkCard';
import SearchHistorySection from './SearchHistorySection';
import DevCountList from './DevCountList';
import RoleSelector from '../../../components/common/RoleSelector';
import { useRole } from '../../../contexts/RoleContext';
import { generateLinks as generateSalesLinks } from '../../../utils/linkUtils/sales';
import { generateLinks as generateRecruiterLinks } from '../../../utils/linkUtils/recruiter';
import { generateLinks as generateJobSeekerLinks } from '../../../utils/linkUtils/jobseeker';
import { Loader2, ChevronDown, ChevronUp, Chrome } from 'lucide-react';
import OpenAllLinksButton from './OpenAllLinksButton';

const PRIORITY_DOMAINS = ['.com', '.fr', '.es', '.it'];
const SECONDARY_DOMAINS = [
    '.eu', '.co.uk', '.de', '.pt', '.nl', '.be', '.ch', '.at', '.dk', '.ie', '.no', '.se', '.fi',
    '.pl', '.cz', '.sk', '.hu', '.ro', '.bg', '.hr', '.si', '.ee', '.lv', '.lt',
    '.gr', '.mt', '.cy', '.il', '.ae', '.sa', '.qa', '.bh', '.kw', '.om',
    '.za', '.eg', '.ma', '.ng', '.ke', '.tz', '.io', '.ai', '.tech', '.co'
];

// Define role-specific link types and labels
const ROLE_LINK_TYPES = {
    'sales': [
        { type: 'dev', label: 'Dev Search' },
        { type: 'securityIAM', label: 'Security' },
        { type: 'finance', label: 'Finance' },
        { type: 'machineIdentity', label: 'Machine Identity' }
    ],
    'recruiter': [
        { type: 'dev', label: 'Tech Candidates' },
        { type: 'techLeaders', label: 'Tech Leaders' },
        { type: 'financeCandidates', label: 'Finance Candidates' }
    ],
    'jobseeker': [
        { type: 'hrContacts', label: 'HR Contacts' },
        { type: 'financeContacts', label: 'Finance Contacts' }
    ]
};

const BulkLinkGenerator = ({ updateMetrics, setNotifications }) => {
    const [generatedLinks, setGeneratedLinks] = useState([]);
    const [allGeneratedLinks, setAllGeneratedLinks] = useState({});
    const [searchHistory, setSearchHistory] = useState([]);
    const { currentRole, roleConfig } = useRole();
    const [showBucketSelector, setShowBucketSelector] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    const [extensionConnected, setExtensionConnected] = useState(false);
    const [devCountList, setDevCountList] = useState([]);
    const scrollRef = useRef(null);
    const formRef = useRef(null);
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

    // Load dev count list from localStorage
    useEffect(() => {
        const savedDevCounts = localStorage.getItem('linkforge_dev_counts');
        if (savedDevCounts) {
            setDevCountList(JSON.parse(savedDevCounts));
        }
    }, []);

    // Update displayed links when role changes
    useEffect(() => {
        if (allGeneratedLinks[currentRole]) {
            setGeneratedLinks(allGeneratedLinks[currentRole]);
        }
    }, [currentRole, allGeneratedLinks]);

    const getRoleSpecificLinks = (company, domain, role) => {
        switch (role) {
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

    const handleGenerateLinks = useCallback(async (companies) => {
        setLoading(true);
        
        try {
            const newAllGeneratedLinks = { ...allGeneratedLinks };
            
            // Generate links for each role
            ['sales', 'recruiter', 'jobseeker'].forEach(role => {
                const roleLinks = companies.map((company, index) => ({
                    id: `${role}-${company}-${Date.now()}-${index}`,
                    company,
                    priorityDomains: PRIORITY_DOMAINS,
                    secondaryDomains: SECONDARY_DOMAINS,
                    selectedDomain: null,
                    links: getRoleSpecificLinks(company, PRIORITY_DOMAINS[0], role),
                    role
                }));

                newAllGeneratedLinks[role] = roleLinks;
            });

            setAllGeneratedLinks(newAllGeneratedLinks);
            setGeneratedLinks(newAllGeneratedLinks[currentRole]);

            saveToHistory(companies);
            
            if (updateMetrics) {
                updateMetrics();
            }

            // Scroll to results
            if (scrollRef.current) {
                if (isMobile) {
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                        const yOffset = scrollRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
                        window.scrollTo({
                            top: yOffset,
                            behavior: 'smooth'
                        });
                    }, 100);
                } else {
                    scrollRef.current.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });
                }
            }

            // Add notification
            setNotifications(prev => [...prev, {
                id: `notification-${Date.now()}-${Math.random()}`,
                message: `Generated links for ${companies.length} company${companies.length > 1 ? 'ies' : 'y'}.`,
                read: false,
            }]);

        } catch (error) {
            console.error('Error generating links:', error);
            setNotifications(prev => [...prev, {
                id: `notification-error-${Date.now()}-${Math.random()}`,
                message: 'Error generating links. Please try again.',
                read: false,
                error: true
            }]);
        } finally {
            setLoading(false);
        }
    }, [allGeneratedLinks, currentRole, updateMetrics, setNotifications, isMobile]);

    // 🦊 Chrome Extension Integration
    useEffect(() => {
        console.log('🦊 LinkForge: Setting up Chrome extension listener...');
        
        const handleExtensionMessage = (event) => {
            // Only process messages from our Chrome extension
            if (event.data && 
                event.data.type === 'LINKFORGE_DEV_COUNT' && 
                event.data.source === 'chrome-extension') {
                
                console.log('🦊 LinkForge: Received data from Chrome extension:', event.data);
                
                const { companyName, count, sourceUrl } = event.data;

                // Set extension as connected
                setExtensionConnected(true);

                // Format count for display
                const formatCount = (num) => {
                    if (num >= 1000) {
                        return `${Math.floor(num / 1000)}K+`;
                    }
                    return num.toLocaleString();
                };

                // Store/update dev count in persistent list
                setDevCountList(prevList => {
                    const existingIndex = prevList.findIndex(item => item.company === companyName);
                    let newList;

                    if (existingIndex !== -1) {
                        // Update existing entry
                        newList = [...prevList];
                        newList[existingIndex] = {
                            company: companyName,
                            count: count,
                            timestamp: Date.now()
                        };
                    } else {
                        // Add new entry
                        newList = [...prevList, {
                            company: companyName,
                            count: count,
                            timestamp: Date.now()
                        }];
                    }

                    // Save to localStorage with error handling
                    try {
                        localStorage.setItem('linkforge_dev_counts', JSON.stringify(newList));
                    } catch (e) {
                        console.warn('Failed to save dev counts to localStorage:', e);
                        // If quota exceeded, try saving only the most recent 100 entries
                        try {
                            const truncatedList = newList.slice(0, 100);
                            localStorage.setItem('linkforge_dev_counts', JSON.stringify(truncatedList));
                            return truncatedList;
                        } catch (err) {
                            console.error('Could not save even truncated dev counts:', err);
                        }
                    }
                    return newList;
                });

                // Auto-generate links for the detected company
                console.log(`🦊 LinkForge: Auto-generating links for "${companyName}" (${formatCount(count)} LinkedIn results)`);
                handleGenerateLinks([companyName]);

                // Show success notification
                setNotifications(prev => [...prev, {
                    id: `extension-${companyName}-${Date.now()}-${Math.random()}`,
                    message: `🦊 Auto-detected: ${companyName} (${formatCount(count)} LinkedIn results)`,
                    read: false,
                }]);

                // Store extension activity
                localStorage.setItem('linkforge_extension_last_activity', JSON.stringify({
                    company: companyName,
                    count: count,
                    timestamp: Date.now(),
                    sourceUrl: sourceUrl
                }));
            }
        };

        // Listen for extension messages
        window.addEventListener('message', handleExtensionMessage);
        
        // Check if extension was recently active
        const lastActivity = localStorage.getItem('linkforge_extension_last_activity');
        if (lastActivity) {
            const activity = JSON.parse(lastActivity);
            const timeDiff = Date.now() - activity.timestamp;
            // If activity was within last 5 minutes, consider extension connected
            if (timeDiff < 5 * 60 * 1000) {
                setExtensionConnected(true);
            }
        }
        
        return () => {
            console.log('🦊 LinkForge: Removing Chrome extension listener');
            window.removeEventListener('message', handleExtensionMessage);
        };
    }, [handleGenerateLinks, setNotifications]);

    // Expose handleGenerateLinks globally
    useEffect(() => {
        window.triggerSearch = handleGenerateLinks;
        return () => {
            delete window.triggerSearch;
        };
    }, [handleGenerateLinks]);

    const saveToHistory = (companies) => {
        const timestamp = new Date().toISOString();
        const newSearches = companies.map((company, index) => ({
            id: `history-${currentRole}-${company}-${timestamp}-${index}`,
            company,
            timestamp,
            role: currentRole
        }));

        const combinedHistory = [...newSearches, ...searchHistory];
        const uniqueHistory = Array.from(
            new Map(combinedHistory.map((item) => [item.company, item])).values()
        ).slice(0, 50);

        setSearchHistory(uniqueHistory);

        try {
            localStorage.setItem(`searchHistory_${currentRole}`, JSON.stringify(uniqueHistory));
        } catch (e) {
            console.warn('Failed to save search history to localStorage:', e);
        }

        // Don't store generated links in localStorage - they take too much space
        // Links are already in memory via state, which is sufficient
    };

    const toggleBucketSelector = () => {
        setShowBucketSelector(!showBucketSelector);
    };

    const getCurrentRoleLinkTypes = () => {
        return ROLE_LINK_TYPES[currentRole] || [];
    };

    const hasLinksForCurrentRole = () => {
        return allGeneratedLinks[currentRole] && allGeneratedLinks[currentRole].length > 0;
    };

    const handleSearchAgain = (company) => {
        if (formRef.current) {
            if (isMobile) {
                const yOffset = formRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: yOffset,
                    behavior: 'smooth'
                });
            } else {
                formRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
            
            setTimeout(() => {
                handleGenerateLinks([company]);
            }, 300);
        } else {
            handleGenerateLinks([company]);
        }
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
                    
                    {/* Chrome Extension Status */}
                    <div className="mb-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                            extensionConnected 
                                ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                                : 'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                        }`}>
                            <Chrome className="w-4 h-4" />
                            <span>Extension {extensionConnected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                    </div>
                    
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
                <div id="search-form-section" ref={formRef} className="bg-white/80 rounded-2xl shadow-xl p-4 md:p-8 backdrop-blur-lg">
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
                            {hasLinksForCurrentRole() && (
                                <motion.div
                                    className="mt-8 md:mt-12 space-y-6 md:space-y-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    {/* Open All Links Buttons */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {getCurrentRoleLinkTypes().map(({ type, label }) => (
                                            <OpenAllLinksButton 
                                                key={type}
                                                generatedLinks={allGeneratedLinks[currentRole]} 
                                                linkType={type} 
                                                label={label} 
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Individual Link Cards */}
                                    {allGeneratedLinks[currentRole]?.map((linkData) => (
                                        <GeneratedLinkCard
                                            key={linkData.id}
                                            linkData={linkData}
                                            onUpdateLink={(updatedLink) => {
                                                const updatedRoleLinks = allGeneratedLinks[currentRole].map(link => 
                                                    link.id === updatedLink.id ? updatedLink : link
                                                );
                                                
                                                setAllGeneratedLinks(prev => ({
                                                    ...prev,
                                                    [currentRole]: updatedRoleLinks
                                                }));
                                                
                                                setGeneratedLinks(updatedRoleLinks);
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

                    {/* Dev Count List */}
                    <DevCountList
                        devCountList={devCountList}
                        onClear={() => {
                            setDevCountList([]);
                            localStorage.removeItem('linkforge_dev_counts');
                        }}
                    />

                    {/* Search History */}
                    <SearchHistorySection
                        searchHistory={searchHistory}
                        generatedLinks={generatedLinks}
                        onClearHistory={() => {
                            setSearchHistory([]);
                            localStorage.removeItem(`searchHistory_${currentRole}`);

                            setAllGeneratedLinks(prev => {
                                const newLinks = { ...prev };
                                delete newLinks[currentRole];
                                return newLinks;
                            });

                            setGeneratedLinks([]);

                            if (updateMetrics) {
                                updateMetrics();
                            }
                        }}
                        onSearchAgain={handleSearchAgain}
                    />
                </div>
            </div>
        </div>
    );
};

export default BulkLinkGenerator;