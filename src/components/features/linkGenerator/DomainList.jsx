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