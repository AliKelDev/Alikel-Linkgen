/**
 * BulkLinkGenerator.jsx - src/components/features/linkGenerator/BulkLinkGenerator.jsx
 * Main component for bulk link generation with Chrome extension support
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// Define role-specific link types and labels
const ROLE_LINK_TYPES = {
    'sales': [
        { type: 'dev', label: 'Dev Search' },
        { type: 'securityIAM', label: 'Security' },
        { type: 'finance', label: 'Finance' },
        { type: 'machineIdentity', label: 'Machine Identity' }
    ],
    'recruiter': [
        { type: 'dev', label: 'Tech Candidates' }, // Using 'dev' type for Tech Candidates
        { type: 'techLeaders', label: 'Tech Leaders' },
        { type: 'financeCandidates', label: 'Finance Candidates' }
    ],
    'jobseeker': [
        // Removed "Find Peers" as requested
        { type: 'hrContacts', label: 'HR Contacts' },
        { type: 'financeContacts', label: 'Finance Contacts' }
    ]
};

const BulkLinkGenerator = ({ updateMetrics, setNotifications }) => {
    const [generatedLinks, setGeneratedLinks] = useState([]);
    const [allGeneratedLinks, setAllGeneratedLinks] = useState({}); // Store links for all roles
    const [searchHistory, setSearchHistory] = useState([]);
    const { currentRole, roleConfig } = useRole();
    const [showBucketSelector, setShowBucketSelector] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
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
            // Create a new object to store links for all roles
            const newAllGeneratedLinks = { ...allGeneratedLinks };
            
            // Generate links for each role
            ['sales', 'recruiter', 'jobseeker'].forEach(role => {
                const roleLinks = companies.map((company) => ({
                    id: Date.now() + Math.random(),
                    company,
                    priorityDomains: PRIORITY_DOMAINS,
                    secondaryDomains: SECONDARY_DOMAINS,
                    selectedDomain: null,
                    links: getRoleSpecificLinks(company, PRIORITY_DOMAINS[0], role),
                    role
                }));

                // Store links for this role
                newAllGeneratedLinks[role] = roleLinks;
            });

            // Update the state with all generated links
            setAllGeneratedLinks(newAllGeneratedLinks);
            
            // Update displayed links for current role
            setGeneratedLinks(newAllGeneratedLinks[currentRole]);
            
            // Save all links to history
            saveToHistory(companies, newAllGeneratedLinks[currentRole]);
            
            if (updateMetrics) {
                updateMetrics();
            }

            // Scroll to results with smooth behavior for all devices
            if (scrollRef.current) {
                // For mobile devices, use a more compatible approach
                if (isMobile) {
                    // First scroll to top
                    window.scrollTo(0, 0);
                    // Then to the element
                    setTimeout(() => {
                        const yOffset = scrollRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
                        window.scrollTo({
                            top: yOffset,
                            behavior: 'smooth'
                        });
                    }, 100);
                } else {
                    // Desktop behavior
                    scrollRef.current.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });
                }
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
    }, [allGeneratedLinks, currentRole, updateMetrics, setNotifications, isMobile]);

    // Chrome Extension Message Listener
    useEffect(() => {
        console.log('LinkForge: Setting up extension message listener...');
        
        const handleExtensionMessage = (event) => {
            console.log('LinkForge: Received window message:', event);
            
            // Only process messages from our extension
            if (event.data && event.data.type === 'LINKFORGE_DEV_COUNT') {
                console.log('LinkForge: Processing dev count message');
                console.log('Company:', event.data.companyName);
                console.log('Count:', event.data.count);
                console.log('Timestamp:', event.data.timestamp);
                
                // Automatically trigger a search for this company
                const companyName = event.data.companyName;
                console.log(`LinkForge: Auto-generating links for ${companyName} (${event.data.count} results found)`);
                
                // Use the existing handleGenerateLinks function
                handleGenerateLinks([companyName]);
                
                // Show a notification
                if (setNotifications) {
                    setNotifications(prev => [...prev, {
                        id: Date.now() + Math.random(),
                        message: `Auto-generated links for ${companyName} (${event.data.count} LinkedIn results found)`,
                        read: false,
                    }]);
                }
            }
        };

        // Listen for messages from the extension
        window.addEventListener('message', handleExtensionMessage);
        
        // Cleanup
        return () => {
            console.log('LinkForge: Removing extension message listener');
            window.removeEventListener('message', handleExtensionMessage);
        };
    }, [handleGenerateLinks, setNotifications]);

    // Expose the handleGenerateLinks function to window for cross-component access
    useEffect(() => {
        window.triggerSearch = handleGenerateLinks;
        
        return () => {
            // Clean up
            delete window.triggerSearch;
        };
    }, [handleGenerateLinks]);

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

    // Get link types for the current role
    const getCurrentRoleLinkTypes = () => {
        return ROLE_LINK_TYPES[currentRole] || [];
    };

    // Check if links exist for the current role
    const hasLinksForCurrentRole = () => {
        return allGeneratedLinks[currentRole] && allGeneratedLinks[currentRole].length > 0;
    };

    // Function to handle the search again action
    const handleSearchAgain = (company) => {
        // Scroll to form first
        if (formRef.current) {
            // For mobile devices, use a more robust scrolling approach
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
            
            // Slight delay to ensure scroll completes
            setTimeout(() => {
                handleGenerateLinks([company]);
            }, 300);
        } else {
            // If ref not available, just generate links
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

                {/* Main Content Card - Add ref to form section */}
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
                                                // Update both allGeneratedLinks and generatedLinks
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

                    {/* Search History - Pass the handleSearchAgain function */}
                    <SearchHistorySection
                        searchHistory={searchHistory}
                        generatedLinks={generatedLinks}
                        onClearHistory={() => {
                            setSearchHistory([]);
                            localStorage.removeItem(`searchHistory_${currentRole}`);
                            localStorage.removeItem(`generatedLinks_${currentRole}`);
                            
                            // Also clear the current role's generated links
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