# Project Export

## Project Statistics

- Total files: 20

## Folder Structure

```
src
  components
    common
      RoleSelector.jsx
    features
      linkGenerator
        BulkLinkGenerator.jsx
        CompanyInput.jsx
        GeneratedLinkCard.jsx
        DomainList.jsx
        SearchHistorySection.jsx
    AnimatedBackground.jsx
    BucketSelector.jsx
    exportUtils.js
    exportDropdown.jsx
    linkUtils.js
  contexts
    RoleContext.jsx
  pages
    HomePage.jsx
  utils
    linkUtils
      recruiter.js
      jobseeker.js
      sales.js
  App.jsx
  App.css
  index.css
  main.jsx

```

### src/components/common/RoleSelector.jsx

```jsx
import React from 'react';
import { useRole, ROLES } from '../../contexts/RoleContext';
import { motion } from 'framer-motion';
import { Users, UserSearch, Briefcase } from 'lucide-react';

const RoleSelector = () => {
  const { currentRole, updateRole, availableRoles } = useRole();

  const roleIcons = {
    [ROLES.SALES]: Users,
    [ROLES.RECRUITER]: UserSearch,
    [ROLES.JOBSEEKER]: Briefcase,
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {availableRoles.map(({ id, title, description }) => {
            const Icon = roleIcons[id] || Users;
            const isActive = currentRole === id;
            
            return (
              <motion.button
                key={id}
                onClick={() => updateRole(id)}
                className={`relative flex flex-col items-center p-4 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-900 shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                  w-full sm:w-48`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon 
                  className={`w-8 h-8 mb-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                />
                <span className="font-semibold text-sm mb-1">{title}</span>
                <span className="text-xs text-center text-gray-500">{description}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-b-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
```

### src/components/features/linkGenerator/BulkLinkGenerator.jsx

```jsx
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
```

### src/components/features/linkGenerator/CompanyInput.jsx

```jsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CompanyInput = ({ onSubmit }) => {
  const [companyInput, setCompanyInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const companies = companyInput
      .split('\n')
      .map((company) => company.trim())
      .filter((company) => company.length > 0);
    
    if (companies.length > 0) {
      onSubmit(companies);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-2 text-blue-900">
          Enter Company Names
        </label>
        <p className="text-sm text-blue-600 mb-3">Add one company per line</p>
        <textarea
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
          placeholder="CyberAgent, Inc.&#10;TechCorp LLC&#10;SecureNet Systems"
          className="w-full h-32 p-4 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          Generate Links
        </button>
      </div>
    </form>
  );
};

export default CompanyInput;
```

### src/components/features/linkGenerator/GeneratedLinkCard.jsx

```jsx
import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import DomainList from './DomainList';
import BucketSelector from '../../../components/BucketSelector';
import { generateLinks } from '../../../components/linkUtils';

const GeneratedLinkCard = ({ linkData, onUpdateLink, showBucketSelector }) => {
  const [copiedStates, setCopiedStates] = useState({});

  const handleDomainSelect = (domain) => {
    onUpdateLink({
      ...linkData,
      selectedDomain: domain,
      links: generateLinks(linkData.company, domain)
    });
  };

  const handleBucketSelect = (bucket) => {
    onUpdateLink({
      ...linkData,
      bucket
    });
  };

  const handleCopy = async (type, link, description) => {
    try {
      await navigator.clipboard.writeText(`${description}\n${link}`);
      setCopiedStates((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-blue-900">{linkData.company}</h3>
          {/* Conditional rendering of BucketSelector */}
          {showBucketSelector && (
            <BucketSelector
              selectedBucket={linkData.bucket}
              onChange={handleBucketSelect}
            />
          )}
        </div>
        
        <DomainList
          priorityDomains={linkData.priorityDomains}
          secondaryDomains={linkData.secondaryDomains}
          selectedDomain={linkData.selectedDomain}
          onDomainSelect={handleDomainSelect}
          companyName={linkData.company}
        />

        {/* Links Section */}
        <div className="mt-6 space-y-4">
          {Object.entries(linkData.links).map(([type, linkInfo]) => (
            <div key={type} className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-1">
                <div className="font-semibold text-blue-900 mb-1">{linkInfo.title}</div>
                <a
                  href={linkInfo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  {linkInfo.link.substring(0, 60)}...
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <button
                onClick={() => handleCopy(type, linkInfo.link, linkInfo.description)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                {copiedStates[type] ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copiedStates[type] ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratedLinkCard;
```

### src/components/features/linkGenerator/DomainList.jsx

```jsx
import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const DomainList = ({ 
  priorityDomains, 
  secondaryDomains, 
  selectedDomain,
  onDomainSelect,
  companyName 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderDomainButton = (domain) => (
    <div key={domain} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
      <a
        href={`https://${domain}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
      >
        {domain}
        <ExternalLink className="w-4 h-4" />
      </a>
      <button
        onClick={() => onDomainSelect(domain)}
        className={`ml-3 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          selectedDomain === domain
            ? 'bg-green-500 text-white'
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        }`}
      >
        {selectedDomain === domain ? 'Selected ✓' : 'Select'}
      </button>
    </div>
  );

  return (
    <div>
      {/* Priority Domains Row */}
      <div className="flex flex-wrap gap-3 pb-4 border-b border-blue-200">
        {priorityDomains.map(renderDomainButton)}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors font-medium"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-5 h-5" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              Show More ({secondaryDomains.length} domains)
            </>
          )}
        </button>
      </div>

      {/* Secondary Domains (Expandable) */}
      <AnimatePresence>
        {isExpanded && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {secondaryDomains.map(renderDomainButton)}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainList;
```

### src/components/features/linkGenerator/SearchHistorySection.jsx

```jsx
import React, { useState } from 'react';
import { History, Trash2 } from 'lucide-react';
import ExportDropdown from '../../../components/exportDropdown';

const SearchHistorySection = ({ 
  searchHistory, 
  onClearHistory, 
  onSearchAgain,
  generatedLinks 
}) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold shadow-sm"
          >
            <History className="w-5 h-5" />
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
          {searchHistory.length > 0 && (
            <ExportDropdown 
              history={searchHistory}
              generatedLinks={generatedLinks}
            />
          )}
        </div>
        {showHistory && searchHistory.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold shadow-sm"
          >
            <Trash2 className="w-5 h-5" />
            Clear History
          </button>
        )}
      </div>

      {showHistory && searchHistory.length > 0 && (
        <div className="mt-8 space-y-6">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-blue-200 shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.company}</h3>
                  <p className="text-blue-600">
                    Searched on: {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onSearchAgain(item.company)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  Search Again
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistorySection;
```

### src/components/AnimatedBackground.jsx

```jsx
// src/components/AnimatedBackground.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 to-black">
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className="border border-blue-200/10 rounded-lg"
              style={{
                animation: `pulse ${2 + (i % 3)}s infinite ${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(147, 197, 253, 0.2)"
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>

      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-900/50"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(30, 58, 138, 0.3) 100%)'
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
```

### src/components/BucketSelector.jsx

```jsx
import React, { useState, useEffect } from 'react';

const determineBucket = (devTeamSize, securityTeamSize) => {
  if (!devTeamSize || !securityTeamSize) return '';
  
  // Tech Giants
  if (devTeamSize >= 10000 && securityTeamSize >= 3000) return 'TECH_GIANT';
  // Major Enterprise
  if (devTeamSize >= 5000 && securityTeamSize >= 1500) return 'MAJOR_ENTERPRISE';
  // Large Enterprise
  if (devTeamSize >= 2000 && securityTeamSize >= 600) return 'LARGE_ENTERPRISE';
  // Enterprise
  if (devTeamSize >= 1000 && securityTeamSize >= 300) return 'ENTERPRISE';
  // Growth Plus
  if (devTeamSize >= 500 && securityTeamSize >= 150) return 'GROWTH_PLUS';
  // Growth
  if (devTeamSize >= 200 && securityTeamSize >= 60) return 'GROWTH';
  // Late Startup
  if (devTeamSize >= 100 && securityTeamSize >= 30) return 'LATE_STARTUP';
  // Mid Startup
  if (devTeamSize >= 50 && securityTeamSize >= 15) return 'MID_STARTUP';
  // Early Startup
  if (devTeamSize >= 20 && securityTeamSize >= 6) return 'EARLY_STARTUP';
  // Pre-Seed
  return 'PRE_SEED';
};

const BucketSelector = ({ selectedBucket, onChange }) => {
  const [devTeamSize, setDevTeamSize] = useState('');
  const [securityTeamSize, setSecurityTeamSize] = useState('');

  const buckets = [
    { 
      value: 'TECH_GIANT', 
      label: 'Tech Giant (10000+ devs, 3000+ security)', 
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    { 
      value: 'MAJOR_ENTERPRISE', 
      label: 'Major Enterprise (5000+ devs, 1500+ security)', 
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    { 
      value: 'LARGE_ENTERPRISE', 
      label: 'Large Enterprise (2000+ devs, 600+ security)', 
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      value: 'ENTERPRISE', 
      label: 'Enterprise (1000+ devs, 300+ security)', 
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      value: 'GROWTH_PLUS', 
      label: 'Growth Plus (500+ devs, 150+ security)', 
      color: 'bg-green-600 hover:bg-green-700'
    },
    { 
      value: 'GROWTH', 
      label: 'Growth (200+ devs, 60+ security)', 
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      value: 'LATE_STARTUP', 
      label: 'Late Startup (100+ devs, 30+ security)', 
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    { 
      value: 'MID_STARTUP', 
      label: 'Mid Startup (50+ devs, 15+ security)', 
      color: 'bg-cyan-500 hover:bg-cyan-600'
    },
    { 
      value: 'EARLY_STARTUP', 
      label: 'Early Startup (20+ devs, 6+ security)', 
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    { 
      value: 'PRE_SEED', 
      label: 'Pre-Seed (<20 devs, <6 security)', 
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  useEffect(() => {
    const determinedBucket = determineBucket(Number(devTeamSize), Number(securityTeamSize));
    if (determinedBucket) {
      onChange(determinedBucket);
    }
  }, [devTeamSize, securityTeamSize, onChange]);

  const getBucketDescription = (bucket) => {
    const found = buckets.find(b => b.value === bucket);
    return found ? found.label : '';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="space-y-1">
          <label htmlFor="devteam" className="block text-sm font-medium text-gray-700">
            Development Team Size
          </label>
          <input
            id="devteam"
            type="number"
            value={devTeamSize}
            onChange={(e) => setDevTeamSize(e.target.value)}
            className="p-2 border border-gray-300 rounded text-sm w-40"
            min="0"
            placeholder="Enter number"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="securityteam" className="block text-sm font-medium text-gray-700">
            Security Team Size
          </label>
          <input
            id="securityteam"
            type="number"
            value={securityTeamSize}
            onChange={(e) => setSecurityTeamSize(e.target.value)}
            className="p-2 border border-gray-300 rounded text-sm w-40"
            min="0"
            placeholder="Enter number"
          />
        </div>
      </div>

      {selectedBucket && (
        <div className="text-sm">
          <span className="font-medium">Selected: </span>
          <span className={`inline-block px-2 py-1 rounded text-white ${buckets.find(b => b.value === selectedBucket)?.color}`}>
            {getBucketDescription(selectedBucket)}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {buckets.map((bucket) => (
          <button
            key={bucket.value}
            onClick={() => onChange(bucket.value)}
            className={`
              px-4 py-2 rounded text-sm text-white transition-colors
              ${bucket.color}
              ${selectedBucket === bucket.value ? 'ring-2 ring-offset-2 ring-black' : ''}
            `}
          >
            {bucket.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const formatSearchDataForExport = (generatedLinks) => {
  const formattedData = [];
  
  generatedLinks.forEach(company => {
    const baseRow = {
      'Company Name': company.company,
      'Selected Domain': company.selectedDomain || '',
      'Bucket': company.bucket || '',
    };
    
    Object.entries(company.links).forEach(([type, linkInfo]) => {
      baseRow[`${linkInfo.title} Link`] = linkInfo.link;
      baseRow[`${linkInfo.title} Description`] = linkInfo.description;
    });
    
    formattedData.push(baseRow);
  });
  
  return formattedData;
};

export default BucketSelector;
```

### src/components/exportUtils.js

```js
import Papa from 'papaparse';

const formatSearchDataForExport = (generatedLinks) => {
  const formattedData = [];
  
  generatedLinks.forEach(company => {
    // Add basic company info
    const baseRow = {
      'Company Name': company.company,
      'Selected Domain': company.selectedDomain || '',
      'Bucket': company.bucket || '', // Added bucket to export
    };
    
    // Add all link types
    Object.entries(company.links).forEach(([type, linkInfo]) => {
      baseRow[`${linkInfo.title} Link`] = linkInfo.link;
      baseRow[`${linkInfo.title} Description`] = linkInfo.description;
    });
    
    formattedData.push(baseRow);
  });
  
  return formattedData;
};

const exportToCSV = (data, filename = 'search_results.csv') => {
  const csv = Papa.unparse(data, {
    quotes: true,
    skipEmptyLines: true,
    delimiter: ',',
  });
  
  const csvContent = '\ufeff' + csv; // Add BOM for Excel UTF-8 compatibility
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  try {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const exportSearchResults = (generatedLinks) => {
  const formattedData = formatSearchDataForExport(generatedLinks);
  exportToCSV(formattedData);
};

export const exportHistory = (history) => {
  const formattedData = history.map(item => ({
    Company: item.company,
    'Search Date': new Date(item.timestamp).toLocaleString(),
    'Search ID': item.id
  }));
  exportToCSV(formattedData, 'search_history.csv');
};
```

### src/components/exportDropdown.jsx

```jsx
import React, { useState } from 'react';
import { FileDown, ChevronDown } from 'lucide-react';
import { exportSearchResults, exportHistory } from './exportUtils';

const ExportDropdown = ({ history, generatedLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (type) => {
    if (type === 'current') {
      exportSearchResults(generatedLinks);
    } else if (type === 'history') {
      exportHistory(history);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
      >
        <FileDown className="w-4 h-4" />
        Export
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          {generatedLinks?.length > 0 && (
            <button
              onClick={() => handleExport('current')}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 first:rounded-t-md"
            >
              Export Current Search
            </button>
          )}
          {history?.length > 0 && (
            <button
              onClick={() => handleExport('history')}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 last:rounded-b-md"
            >
              Export Search History
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportDropdown;
```

### src/components/linkUtils.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
  return companyName
    .toLowerCase()
    .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
    .replace(/[^a-z0-9]/g, '');
};

/**
 * Generates domain variants for a company based on given extensions
 * @param {string} companyName - The company name
 * @param {string[]} extensions - Array of domain extensions
 * @returns {string[]} - Array of complete domain names
 */
export const generateDomainVariants = (companyName, extensions) => {
  const cleanName = cleanCompanyName(companyName);
  return extensions.map(ext => `${cleanName}${ext}`);
};

/**
 * Generates a LinkedIn search URL for developer profiles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateDevSearchLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
    // Function exclusions
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    // Company filter
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    // Keywords
    'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Logiciel%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
    '%2522D%25C3%25A9veloppeur%2522%2520OR%2520%2522Entwickler%2522%2520OR%2520%2522Desarrollador%2522%2520OR%2520' +
    '%2522DevOps%2522%2520OR%2520%2522Cloud%2522%2520OR%2520%2522Engineer%2522%2520OR%2520%2522Ing%25C3%25A9nieur' +
    '%2522%2520OR%2520%2522Ingenieur%2522%2520OR%2520%2522Ingeniero%2522%2529%2520And%2520%2528NOT%2520%2522Marketing' +
    '%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for security/IAM roles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateSecurityIAMLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    // Function exclusions
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    // Company filter
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    // Keywords for security roles and management positions
    'keywords%3A%2528%2522Security%2522%2520OR%2520%2522CISO%2522%2520OR%2520%2522CTO%2522%2520OR%2520' +
    '%2522Information%2520Security%2522%2520OR%2520%2522Cybersecurity%2522%2520OR%2520%2522AppSec%2522%2520OR%2520' +
    '%2522Application%2520Security%2522%2520OR%2520%2522IAM%2522%2520OR%2520%2522Identity%2522%2520OR%2520' +
    '%2522Access%2520Management%2522%2529%2520AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520' +
    '%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates all search links for a company
 * @param {string} company - The company name
 * @param {string} domain - The company's domain
 * @returns {Object} - Object containing all generated links with their metadata
 */
export const generateLinks = (company, domain) => {
  return {
    dev: {
      title: "Dev Search",
      link: generateDevSearchLink(company),
      description: "LinkedIn Search for Development Team Members",
    },
    securityIAM: {
      title: "Security/IAM",
      link: generateSecurityIAMLink(company),
      description: "LinkedIn Search for Security/IAM Decision Makers",
    }
  };
};
```

### src/contexts/RoleContext.jsx

```jsx
// src/contexts/RoleContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Role configurations
export const ROLES = {
  SALES: 'sales',
  RECRUITER: 'recruiter',
  JOBSEEKER: 'jobseeker',
};

export const ROLE_CONFIGS = {
  [ROLES.SALES]: {
    title: 'Sales Team',
    description: 'Find and connect with technical decision makers',
    defaultSearchTypes: ['dev', 'securityIAM'],
    functionExclusions: [
      'Accounting', 'Finance', 'Human Resources', 'Legal',
      'Marketing', 'Sales', 'Customer Success and Support',
      'Arts and Design', 'Business Development'
    ],
  },
  [ROLES.RECRUITER]: {
    title: 'Recruiter',
    description: 'Find potential candidates and HR decision makers',
    defaultSearchTypes: ['hrTeam', 'candidates'],
    functionExclusions: [
      'Sales', 'Customer Success and Support',
      'Business Development'
    ],
  },
  [ROLES.JOBSEEKER]: {
    title: 'Job Seeker',
    description: 'Find relevant positions and company information',
    defaultSearchTypes: ['openings', 'teamInsights'],
    functionExclusions: [], // Job seekers typically want to see all departments
  },
};

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(ROLES.SALES); // Default to sales role
  const [roleConfig, setRoleConfig] = useState(ROLE_CONFIGS[ROLES.SALES]);

  const updateRole = (newRole) => {
    if (ROLE_CONFIGS[newRole]) {
      setCurrentRole(newRole);
      setRoleConfig(ROLE_CONFIGS[newRole]);
    }
  };

  const contextValue = {
    currentRole,
    roleConfig,
    updateRole,
    availableRoles: Object.keys(ROLE_CONFIGS).map(role => ({
      id: role,
      ...ROLE_CONFIGS[role]
    })),
  };

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

// Custom hook for role-specific link generation
export const useRoleLinks = (company, domain) => {
  const { currentRole, roleConfig } = useRole();
  
  // This will be expanded as we implement role-specific link generators
  const generateRoleSpecificLinks = () => {
    switch (currentRole) {
      case ROLES.SALES:
        return {
          dev: {
            title: "Dev Search",
            link: generateDevSearchLink(company),
            description: "LinkedIn Search for Development Team Members",
          },
          securityIAM: {
            title: "Security/IAM",
            link: generateSecurityIAMLink(company),
            description: "LinkedIn Search for Security/IAM Decision Makers",
          }
        };
      case ROLES.RECRUITER:
        // To be implemented
        return {
          hrTeam: {
            title: "HR Team",
            link: "", // TODO: Implement recruiter-specific link generation
            description: "LinkedIn Search for HR Team Members",
          },
          candidates: {
            title: "Potential Candidates",
            link: "", // TODO: Implement candidate search
            description: "LinkedIn Search for Potential Candidates",
          }
        };
      case ROLES.JOBSEEKER:
        // To be implemented
        return {
          openings: {
            title: "Open Positions",
            link: "", // TODO: Implement job opening search
            description: "LinkedIn Search for Open Positions",
          },
          teamInsights: {
            title: "Team Insights",
            link: "", // TODO: Implement team insights search
            description: "LinkedIn Search for Team Information",
          }
        };
      default:
        return {};
    }
  };

  return generateRoleSpecificLinks();
};
```

### src/pages/HomePage.jsx

```jsx
import React from 'react';
import BulkLinkGenerator from '../components/features/linkGenerator/BulkLinkGenerator';

const HomePage = () => {
  return <BulkLinkGenerator />;
};

export default HomePage;
```

### src/utils/linkUtils/recruiter.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
    return companyName
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '');
};

/**
 * Generates domain variants for a company based on given extensions
 * @param {string} companyName - The company name
 * @param {string[]} extensions - Array of domain extensions
 * @returns {string[]} - Array of complete domain names
 */
export const generateDomainVariants = (companyName, extensions) => {
    const cleanName = cleanCompanyName(companyName);
    return extensions.map(ext => `${cleanName}${ext}`);
};

/**
 * Generates a LinkedIn search URL for developer profiles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateDevSearchLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
      // Function exclusions
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords
      'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Logiciel%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
      '%2522D%25C3%25A9veloppeur%2522%2520OR%2520%2522Entwickler%2522%2520OR%2520%2522Desarrollador%2522%2520OR%2520' +
      '%2522DevOps%2522%2520OR%2520%2522Cloud%2522%2520OR%2520%2522Engineer%2522%2520OR%2520%2522Ing%25C3%25A9nieur' +
      '%2522%2520OR%2520%2522Ingenieur%2522%2520OR%2520%2522Ingeniero%2522%2529%2520And%2520%2528NOT%2520%2522Marketing' +
      '%2522%2529)';

    return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for tech leaders and hiring managers
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateTechLeadersLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
      // Function exclusions
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords for tech leadership roles
      'keywords%3A%2528%2522Engineering%2522%2520OR%2520%2522Software%2522%2520OR%2520%2522Development%2522%2520OR%2520' +
      '%2522Tech%2522%2520OR%2520%2522Technology%2522%2520OR%2520%2522R%2526D%2522%2520OR%2520%2522Product%2522%2520OR%2520' +
      '%2522Platform%2522%2520OR%2520%2522Architecture%2522%2529%2520AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520' +
      '%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2529)';

    return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates all search links for a company
 * @param {string} company - The company name
 * @param {string} domain - The company's domain
 * @returns {Object} - Object containing all generated links with their metadata
 */
export const generateLinks = (company, domain) => {
    return {
      dev: {
        title: "Tech Candidates",
        link: generateDevSearchLink(company),
        description: "LinkedIn Search for Development Team Members",
      },
      techLeaders: {
        title: "Tech Leaders",
        link: generateTechLeadersLink(company),
        description: "LinkedIn Search for Tech Leaders and Hiring Managers",
      }
    };
};
```

### src/utils/linkUtils/jobseeker.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
    return companyName
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '');
};

/**
 * Generates domain variants for a company based on given extensions
 * @param {string} companyName - The company name
 * @param {string[]} extensions - Array of domain extensions
 * @returns {string[]} - Array of complete domain names
 */
export const generateDomainVariants = (companyName, extensions) => {
    const cleanName = cleanCompanyName(companyName);
    return extensions.map(ext => `${cleanName}${ext}`);
};

/**
 * Generates a LinkedIn search URL for peers in your role
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generatePeerSearchLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
      // Function exclusions
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords
      'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
      '%2522Engineer%2522%2520OR%2520%2522Development%2522%2520OR%2520%2522Programming%2522%2520OR%2520' +
      '%2522Full%2520Stack%2522%2520OR%2520%2522Backend%2522%2520OR%2520%2522Frontend%2522%2529)';

    return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for HR and recruiting contacts
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateHRContactLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
      // Function inclusions for HR
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AINCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords for HR and recruiting
      'keywords%3A%2528%2522Recruiter%2522%2520OR%2520%2522Recruiting%2522%2520OR%2520%2522Talent%2522%2520OR%2520' +
      '%2522HR%2522%2520OR%2520%2522Human%2520Resources%2522%2520OR%2520%2522Talent%2520Acquisition%2522%2529)';

    return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates all search links for a company
 * @param {string} company - The company name
 * @param {string} domain - The company's domain
 * @returns {Object} - Object containing all generated links with their metadata
 */
export const generateLinks = (company, domain) => {
    return {
      peers: {
        title: "Find Peers",
        link: generatePeerSearchLink(company),
        description: "LinkedIn Search for People in Similar Roles",
      },
      hrContacts: {
        title: "HR Contacts",
        link: generateHRContactLink(company),
        description: "LinkedIn Search for HR and Recruiting Team Members",
      }
    };
};
```

### src/utils/linkUtils/sales.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
    return companyName
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '');
  };
  
  /**
   * Generates domain variants for a company based on given extensions
   * @param {string} companyName - The company name
   * @param {string[]} extensions - Array of domain extensions
   * @returns {string[]} - Array of complete domain names
   */
  export const generateDomainVariants = (companyName, extensions) => {
    const cleanName = cleanCompanyName(companyName);
    return extensions.map(ext => `${cleanName}${ext}`);
  };
  
  /**
   * Generates a LinkedIn search URL for developer profiles
   * @param {string} company - The company name
   * @returns {string} - LinkedIn search URL
   */
  export const generateDevSearchLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
      // Function exclusions
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords
      'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Logiciel%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
      '%2522D%25C3%25A9veloppeur%2522%2520OR%2520%2522Entwickler%2522%2520OR%2520%2522Desarrollador%2522%2520OR%2520' +
      '%2522DevOps%2522%2520OR%2520%2522Cloud%2522%2520OR%2520%2522Engineer%2522%2520OR%2520%2522Ing%25C3%25A9nieur' +
      '%2522%2520OR%2520%2522Ingenieur%2522%2520OR%2520%2522Ingeniero%2522%2529%2520And%2520%2528NOT%2520%2522Marketing' +
      '%2522%2529)';
  
    return `${baseUrl}?query=${queryParams}`;
  };
  
  /**
   * Generates a LinkedIn search URL for security/IAM roles
   * @param {string} company - The company name
   * @returns {string} - LinkedIn search URL
   */
  export const generateSecurityIAMLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
      // Function exclusions
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords for security roles and management positions
      'keywords%3A%2528%2522Security%2522%2520OR%2520%2522CISO%2522%2520OR%2520%2522CTO%2522%2520OR%2520' +
      '%2522Information%2520Security%2522%2520OR%2520%2522Cybersecurity%2522%2520OR%2520%2522AppSec%2522%2520OR%2520' +
      '%2522Application%2520Security%2522%2520OR%2520%2522IAM%2522%2520OR%2520%2522Identity%2522%2520OR%2520' +
      '%2522Access%2520Management%2522%2529%2520AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520' +
      '%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2529)';
  
    return `${baseUrl}?query=${queryParams}`;
  };
  
  /**
   * Generates all search links for a company
   * @param {string} company - The company name
   * @param {string} domain - The company's domain
   * @returns {Object} - Object containing all generated links with their metadata
   */
  export const generateLinks = (company, domain) => {
    return {
      dev: {
        title: "Dev Search",
        link: generateDevSearchLink(company),
        description: "LinkedIn Search for Development Team Members",
      },
      securityIAM: {
        title: "Security/IAM",
        link: generateSecurityIAMLink(company),
        description: "LinkedIn Search for Security/IAM Decision Makers",
      }
    };
  };
```

### src/App.jsx

```jsx
// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoleProvider } from './contexts/RoleContext';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <AnimatedBackground />
      </RoleProvider>
    </BrowserRouter>
  );
}

export default App;
```

### src/App.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/main.jsx

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
