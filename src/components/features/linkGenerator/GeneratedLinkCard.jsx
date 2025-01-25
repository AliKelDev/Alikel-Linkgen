import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DomainList from './DomainList';
import BucketSelector from '../../../components/BucketSelector';
import { generateLinks } from '../../../components/linkUtils';
import AIChatAssistant from './AIChatAssistant';

const CompanySelector = ({ companies, currentCompany, onChange }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {companies.map((companyData) => (
      <button
        key={companyData.id}
        onClick={() => onChange(companyData)}
        className={`px-3 py-1 rounded-lg text-sm ${
          currentCompany.id === companyData.id
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {companyData.company}
      </button>
    ))}
  </div>
);

const GeneratedLinkCard = ({ linkData, onUpdateLink, showBucketSelector }) => {
  const [copiedStates, setCopiedStates] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(linkData);

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
          <h3 className="text-xl font-bold text-blue-900">{selectedCompany.company}</h3>
          {showBucketSelector && (
            <BucketSelector
              selectedBucket={selectedCompany.bucket}
              onChange={handleBucketSelect}
            />
          )}
        </div>
        
        <DomainList
          priorityDomains={selectedCompany.priorityDomains}
          secondaryDomains={selectedCompany.secondaryDomains}
          selectedDomain={selectedCompany.selectedDomain}
          onDomainSelect={handleDomainSelect}
          companyName={selectedCompany.company}
        />

        <div className="mt-6 space-y-4">
          {Object.entries(selectedCompany.links).map(([type, linkInfo]) => (
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
              <motion.button
                onClick={() => handleCopy(type, linkInfo.link, linkInfo.description)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all 
                  ${copiedStates[type] 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-500 hover:bg-blue-600'}
                  text-white shadow-sm hover:shadow-md`}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {copiedStates[type] ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
                {copiedStates[type] ? 'Copied!' : 'Copy'}
              </motion.button>
            </div>
          ))}
        </div>

        <AIChatAssistant 
          company={selectedCompany.company}
          domain={selectedCompany.selectedDomain}
          companies={[selectedCompany]}
        />
      </div>
    </div>
  );
};

export default GeneratedLinkCard;