import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyInput from './CompanyInput';
import GeneratedLinkCard from './GeneratedLinkCard';
import SearchHistorySection from './SearchHistorySection';
import RoleSelector from '../../../components/common/RoleSelector';
import { useRole } from '../../../contexts/RoleContext';
import { generateLinks as generateSalesLinks } from '../../../utils/linkUtils/sales';
import { generateLinks as generateRecruiterLinks } from '../../../utils/linkUtils/recruiter';
import { generateLinks as generateJobSeekerLinks } from '../../../utils/linkUtils/jobseeker';

const PRIORITY_DOMAINS = ['.com', '.fr', '.es', '.it'];
const SECONDARY_DOMAINS = [
  '.eu', '.co.uk', '.de', '.pt', '.nl', '.be', '.ch', '.at', '.dk', '.ie', '.no', '.se', '.fi',
  '.pl', '.cz', '.sk', '.hu', '.ro', '.bg', '.hr', '.si', '.ee', '.lv', '.lt',
  '.gr', '.mt', '.cy', '.il', '.ae', '.sa', '.qa', '.bh', '.kw', '.om',
  '.za', '.eg', '.ma', '.ng', '.ke', '.tz', '.io', '.ai', '.tech', '.co'
];

const BulkLinkGenerator = () => {
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const { currentRole, roleConfig } = useRole();
  // Add state for bucket selector visibility
  const [showBucketSelector, setShowBucketSelector] = useState(true);

  useEffect(() => {
    const savedHistory = localStorage.getItem(`searchHistory_${currentRole}`);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, [currentRole]);

  // Toggle function for bucket selector
  const toggleBucketSelector = () => {
    setShowBucketSelector(!showBucketSelector);
  };

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

  const handleGenerateLinks = (companies) => {
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
    saveToHistory(companies);
  };

  const saveToHistory = (companies) => {
    const timestamp = new Date().toISOString();
    const newSearches = companies.map((company) => ({
      id: Date.now() + Math.random(),
      company,
      timestamp,
      role: currentRole
    }));

    const combinedHistory = [...newSearches, ...searchHistory];
    const uniqueHistory = Array.from(
      new Map(combinedHistory.map((item) => [item.company, item])).values()
    ).slice(0, 50);

    setSearchHistory(uniqueHistory);
    localStorage.setItem(`searchHistory_${currentRole}`, JSON.stringify(uniqueHistory));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            {roleConfig.title} Link Generator
          </h1>
          <p className="text-lg text-blue-600">{roleConfig.description}</p>
          {/* Add Bucket Selector Toggle Button */}
          <button
            onClick={toggleBucketSelector}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors shadow-sm"
          >
            {showBucketSelector ? 'Hide Bucket Selector' : 'Show Bucket Selector'}
          </button>
        </div>

        <RoleSelector />

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm backdrop-filter">
          <CompanyInput onSubmit={handleGenerateLinks} />

          <AnimatePresence mode="wait">
            {generatedLinks.length > 0 && (
              <motion.div 
                className="mt-12 space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {generatedLinks
                  .filter(linkData => linkData.role === currentRole)
                  .map((linkData) => (
                    <GeneratedLinkCard 
                      key={linkData.id} 
                      linkData={linkData}
                      onUpdateLink={(updatedLink) => {
                        setGeneratedLinks(prev => 
                          prev.map(link => link.id === updatedLink.id ? updatedLink : link)
                        );
                      }}
                      // Pass the showBucketSelector state as prop
                      showBucketSelector={showBucketSelector}
                    />
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          <SearchHistorySection
            searchHistory={searchHistory}
            onClearHistory={() => {
              setSearchHistory([]);
              localStorage.removeItem(`searchHistory_${currentRole}`);
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