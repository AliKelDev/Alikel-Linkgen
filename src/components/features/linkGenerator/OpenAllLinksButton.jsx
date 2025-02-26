import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertCircle, X, Copy, CheckCheck, Loader2 } from 'lucide-react';

const OpenAllLinksButton = ({ generatedLinks, linkType, label }) => {
  const [showLinkList, setShowLinkList] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [openingLinks, setOpeningLinks] = useState(false);
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
  const [openDelay, setOpenDelay] = useState(3); // Default 3 seconds delay
  const modalRef = useRef(null);

  // Count how many links of this type exist across all companies
  const filteredLinks = generatedLinks.filter(company => 
    company.links && company.links[linkType]
  );
  
  const linkCount = filteredLinks.length;

  // No links of this type exist
  if (linkCount === 0) {
    return null;
  }

  // When modal is shown, make sure it's visible in the viewport
  useEffect(() => {
    if (showLinkList && modalRef.current) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        modalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [showLinkList]);

  const handleShowLinks = () => {
    // Collect all the links of the specified type
    const links = filteredLinks.map(company => ({
      company: company.company,
      link: company.links[linkType].link,
      description: company.links[linkType].description,
      opened: false // Track which links have been opened
    }));
    
    setSelectedLinks(links);
    setShowLinkList(true);
    setCurrentLinkIndex(0);
    setOpeningLinks(false);
  };

  const handleCopyAllLinks = () => {
    const textToCopy = selectedLinks.map(item => 
      `${item.company}: ${item.link}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy links: ', err);
      });
  };

  // This function opens a single link
  const handleOpenSingle = (url, index) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Mark this link as opened
    if (index !== undefined) {
      const updatedLinks = [...selectedLinks];
      updatedLinks[index] = { ...updatedLinks[index], opened: true };
      setSelectedLinks(updatedLinks);
    }
  };

  // Rate-limited link opening process
  const startRateLimitedOpening = () => {
    setOpeningLinks(true);
    setCurrentLinkIndex(0);
    
    // Reset all links to "unopened" state
    const resetLinks = selectedLinks.map(link => ({
      ...link,
      opened: false
    }));
    setSelectedLinks(resetLinks);
    
    // Start the opening process for the first link
    openNextLink(0, resetLinks);
  };
  
  // Recursive function to open links with delay
  const openNextLink = (index, links) => {
    if (index >= links.length) {
      // All links opened
      setOpeningLinks(false);
      return;
    }
    
    // Open current link
    handleOpenSingle(links[index].link, index);
    setCurrentLinkIndex(index);
    
    // Schedule next link opening
    setTimeout(() => {
      openNextLink(index + 1, links);
    }, openDelay * 1000); // Convert seconds to milliseconds
  };

  // Calculate progress percentage
  const progressPercentage = openingLinks 
    ? Math.round((currentLinkIndex / selectedLinks.length) * 100)
    : 0;

  return (
    <>
      <motion.button
        onClick={handleShowLinks}
        className="mb-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ExternalLink className="w-4 h-4" />
        {`Open All ${label} Links (${linkCount})`}
      </motion.button>

      <AnimatePresence>
        {showLinkList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => !openingLinks && setShowLinkList(false)}
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
                  {`${label} Links (${selectedLinks.length})`}
                </h3>
                {!openingLinks && (
                  <button 
                    onClick={() => setShowLinkList(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mb-4 flex flex-wrap gap-2">
                {!openingLinks ? (
                  <>
                    <button
                      onClick={handleCopyAllLinks}
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
                        <option value="1">1 second</option>
                        <option value="2">2 seconds</option>
                        <option value="3">3 seconds</option>
                        <option value="5">5 seconds</option>
                        <option value="10">10 seconds</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={startRateLimitedOpening}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Start Opening Links
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setOpeningLinks(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Stop Opening
                  </button>
                )}
              </div>

              {/* Progress Bar (only shown when opening links) */}
              {openingLinks && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-700">
                      Opening link {currentLinkIndex + 1} of {selectedLinks.length}
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
                    {openingLinks 
                      ? `Opening one link every ${openDelay} seconds to avoid rate limiting. Please don't close this dialog.`
                      : "Use the rate-limited opener to avoid 429 errors. You can also click links individually or copy all links to open them later."
                    }
                  </p>
                </div>

                {/* Link List */}
                <div className="space-y-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {selectedLinks.map((item, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg flex items-center gap-3 ${
                        item.opened 
                          ? 'bg-green-50 border border-green-100' 
                          : index === currentLinkIndex && openingLinks
                            ? 'bg-blue-50 border border-blue-100'
                            : 'bg-gray-50'
                      }`}
                    >
                      {item.opened && (
                        <CheckCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                      {!item.opened && index === currentLinkIndex && openingLinks && (
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-blue-900 mb-1 truncate">{item.company}</div>
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
                          {item.link.length > 50 ? `${item.link.substring(0, 50)}...` : item.link}
                        </a>
                      </div>
                      <button
                        onClick={() => handleOpenSingle(item.link, index)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex-shrink-0"
                        title="Open link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OpenAllLinksButton;