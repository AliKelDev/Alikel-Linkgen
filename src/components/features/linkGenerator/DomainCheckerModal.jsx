import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertCircle, X, Copy, CheckCheck, Loader2, Globe } from 'lucide-react';

const DomainCheckerModal = ({ company, isOpen, onClose }) => {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [copied, setCopied] = useState(false);
  const [openingDomains, setOpeningDomains] = useState(false);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [openDelay, setOpenDelay] = useState(2); // Default 2 seconds delay
  const modalRef = useRef(null);

  // Common TLDs to check
  const commonTLDs = [
    '.com', '.fr', '.io', '.ai', '.net', '.org', '.co', 
    '.eu', '.co.uk', '.de', '.es', '.it', '.tech', '.app'
  ];
  
  // When modal is shown, generate domain list and make sure it's visible
  useEffect(() => {
    if (isOpen && modalRef.current) {
      generateDomainList();
      
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        modalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isOpen, company]);

  const generateDomainList = () => {
    if (!company) return;
    
    // Clean company name for domain use
    const cleanCompanyName = company
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
    
    // Generate Google search URLs for each TLD
    const domains = commonTLDs.map(tld => {
      const domainName = `${cleanCompanyName}${tld}`;
      return {
        domain: domainName,
        link: `https://www.google.com/search?q=site%3A${domainName}`,
        opened: false
      };
    });
    
    setSelectedDomains(domains);
    setCurrentDomainIndex(0);
    setOpeningDomains(false);
  };

  const handleCopyAllDomains = () => {
    const textToCopy = selectedDomains.map(item => 
      `${item.domain}: ${item.link}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy domains: ', err);
      });
  };

  // This function opens a single domain search
  const handleOpenSingle = (url, index) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Mark this domain as opened
    if (index !== undefined) {
      const updatedDomains = [...selectedDomains];
      updatedDomains[index] = { ...updatedDomains[index], opened: true };
      setSelectedDomains(updatedDomains);
    }
  };

  // Rate-limited domain opening process
  const startRateLimitedOpening = () => {
    setOpeningDomains(true);
    setCurrentDomainIndex(0);
    
    // Reset all domains to "unopened" state
    const resetDomains = selectedDomains.map(domain => ({
      ...domain,
      opened: false
    }));
    setSelectedDomains(resetDomains);
    
    // Start the opening process for the first domain
    openNextDomain(0, resetDomains);
  };
  
  // Recursive function to open domains with delay
  const openNextDomain = (index, domains) => {
    if (index >= domains.length) {
      // All domains opened
      setOpeningDomains(false);
      return;
    }
    
    // Open current domain
    handleOpenSingle(domains[index].link, index);
    setCurrentDomainIndex(index);
    
    // Schedule next domain opening
    setTimeout(() => {
      openNextDomain(index + 1, domains);
    }, openDelay * 1000); // Convert seconds to milliseconds
  };

  // Calculate progress percentage
  const progressPercentage = openingDomains 
    ? Math.round((currentDomainIndex / selectedDomains.length) * 100)
    : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={() => !openingDomains && onClose()}
      >
        <motion.div
          ref={modalRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-xl p-4 w-full max-w-2xl max-h-[80vh] overflow-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-900">
              {`Domain Checker: ${company}`}
            </h3>
            {!openingDomains && (
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            {!openingDomains ? (
              <>
                <button
                  onClick={handleCopyAllDomains}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy All Links
                    </>
                  )}
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Open every</span>
                  <select 
                    value={openDelay}
                    onChange={(e) => setOpenDelay(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="0.5">0.5 second</option>
                    <option value="1">1 second</option>
                    <option value="2">2 seconds</option>
                    <option value="3">3 seconds</option>
                    <option value="5">5 seconds</option>
                  </select>
                </div>
                
                <button
                  onClick={startRateLimitedOpening}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Start Domain Search
                </button>
              </>
            ) : (
              <button
                onClick={() => setOpeningDomains(false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Stop Opening
              </button>
            )}
          </div>

          {/* Progress Bar (only shown when opening domains) */}
          {openingDomains && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-700">
                  Checking domain {currentDomainIndex + 1} of {selectedDomains.length}
                </span>
                <span className="text-blue-700 font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-center mt-2">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
            </div>
          )}

          {/* Information Alert */}
          <div className="border-t border-gray-200 pt-3">
            <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                {openingDomains 
                  ? `Opening one search every ${openDelay} seconds to avoid rate limiting. Please don't close this dialog.`
                  : "This will open Google searches for each domain variation to help you validate if they exist."
                }
              </p>
            </div>

            {/* Domain List */}
            <div className="space-y-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {selectedDomains.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    item.opened 
                      ? 'bg-green-50 border border-green-100' 
                      : index === currentDomainIndex && openingDomains
                        ? 'bg-blue-50 border border-blue-100'
                        : 'bg-gray-50'
                  }`}
                >
                  {item.opened && (
                    <CheckCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                  {!item.opened && index === currentDomainIndex && openingDomains && (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                  )}
                  {!item.opened && index !== currentDomainIndex && (
                    <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-blue-900 mb-1 truncate">{item.domain}</div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate block"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSingle(item.link, index);
                      }}
                    >
                      Google Search
                    </a>
                  </div>
                  <button
                    onClick={() => handleOpenSingle(item.link, index)}
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex-shrink-0"
                    title="Open search"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DomainCheckerModal;