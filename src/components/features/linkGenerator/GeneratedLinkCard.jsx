import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import DomainList from './DomainList';
import BucketSelector from '../../../components/BucketSelector';
import { generateLinks } from '../../../components/linkUtils';

const GeneratedLinkCard = ({ linkData, onUpdateLink }) => {
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
          <BucketSelector
            selectedBucket={linkData.bucket}
            onChange={handleBucketSelect}
          />
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