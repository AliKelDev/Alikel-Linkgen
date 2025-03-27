import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, History, Trash2 } from 'lucide-react';
import { generateNameSearchLink, generateTargetedNameSearchLink } from '../../../utils/nameSearchUtils';
import OpenAllLinksButton from '../linkGenerator/OpenAllLinksButton';

const BulkNameSearch = ({ updateMetrics, setNotifications }) => {
  const [names, setNames] = useState('');
  const [commonCompany, setCommonCompany] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const formRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

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
    const savedHistory = localStorage.getItem('nameSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Expose the search function to window for cross-component access
  useEffect(() => {
    // Store the original trigger search function if it exists
    const originalTriggerSearch = window.triggerSearch;
    
    // Define a function to handle name searches
    const handleNameSearch = (nameList) => {
      if (Array.isArray(nameList) && nameList.length > 0) {
        setNames(nameList.join('\n'));
        // Submit the form after a short delay
        setTimeout(() => {
          handleSubmit({ preventDefault: () => {} });
        }, 100);
      }
    };
    
    // Store our function or the combined function
    window.nameSearch = handleNameSearch;
    
    return () => {
      // Clean up
      delete window.nameSearch;
    };
  }, []);

  /**
   * Save name searches to history
   */
  const saveToHistory = (nameList) => {
    const timestamp = new Date().toISOString();
    const newSearches = nameList.map((name) => ({
      id: Date.now() + Math.random(),
      name,
      timestamp,
      company: commonCompany || '' // Include company context if available
    }));

    // Keep only unique names, limit to 50 most recent
    const combinedHistory = [...newSearches, ...searchHistory];
    const uniqueHistory = Array.from(
      new Map(combinedHistory.map((item) => [item.name, item])).values()
    ).slice(0, 50);

    setSearchHistory(uniqueHistory);
    localStorage.setItem('nameSearchHistory', JSON.stringify(uniqueHistory));

    // Save generated links if needed
    localStorage.setItem('nameSearchLinks', JSON.stringify(generatedLinks));
  };

  /**
   * Handle searching again for a name from history
   */
  const handleSearchAgain = (name, company = '') => {
    // Set the form values
    setNames(name);
    if (company) setCommonCompany(company);
    
    // Scroll to form
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
      
      // Submit the form after scrolling
      setTimeout(() => {
        handleSubmit({ preventDefault: () => {} });
      }, 300);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Split input by new lines to get individual names
    const nameList = names
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    // Only proceed if we have names
    if (nameList.length === 0) return;
    
    setLoading(true);
    
    try {
      // Generate links for each name
      const links = nameList.map(name => ({
        id: Date.now() + Math.random(),
        name,
        links: {
          basic: {
            title: "Basic Search",
            link: generateNameSearchLink(name),
            description: `LinkedIn Search for ${name}`
          },
          targeted: {
            title: "Targeted Search",
            link: generateTargetedNameSearchLink(name, commonCompany),
            description: commonCompany ? 
              `LinkedIn Search for ${name} at ${commonCompany}` : 
              `LinkedIn Search for ${name} (targeted)`
          }
        }
      }));
      
      // Update state with generated links
      setGeneratedLinks(links);
      
      // Save to history
      saveToHistory(nameList);
      
      // Update metrics if needed
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
        id: Date.now() + Math.random(),
        message: `Generated links for ${nameList.length} individual${nameList.length > 1 ? 's' : ''}.`,
        read: false,
      }]);
      
    } catch (error) {
      console.error('Error generating name search links:', error);
      setNotifications(prev => [...prev, {
        id: Date.now() + Math.random(),
        message: 'Error generating name search links. Please try again.',
        read: false,
        error: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 md:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-2">
            Person Name Search Generator
          </h1>
          <p className="text-base md:text-lg text-blue-200 mb-4">
            Generate LinkedIn search links for individual people by name
          </p>
        </div>

        {/* Input Form */}
        <div id="name-search-form-section" ref={formRef} className="bg-white/80 rounded-2xl shadow-xl p-4 md:p-8 backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-lg font-semibold text-blue-900">
                  Enter Names
                </label>
                <span className="text-sm text-blue-500">
                  {names.split('\n').filter(n => n.trim()).length} names entered
                </span>
              </div>
              <p className="text-sm text-blue-600 mb-3">Add one name per line</p>
              <textarea
                value={names}
                onChange={(e) => setNames(e.target.value)}
                placeholder="John Smith
Jane Doe
Michael Johnson"
                className="w-full p-4 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none overflow-hidden"
                required
                rows={5}
              />
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-blue-900 mb-2">
                Common Company (Optional)
              </label>
              <p className="text-sm text-blue-600 mb-3">If all names are associated with the same company</p>
              <input
                type="text"
                value={commonCompany}
                onChange={(e) => setCommonCompany(e.target.value)}
                placeholder="e.g. Microsoft"
                className="w-full p-4 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                Generate Name Search Links
              </button>
            </div>
          </form>

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
                      generatedLinks={generatedLinks} 
                      linkType="basic" 
                      label="Basic Name Search" 
                    />
                    <OpenAllLinksButton 
                      generatedLinks={generatedLinks} 
                      linkType="targeted" 
                      label="Targeted Name Search" 
                    />
                  </div>
                  
                  {/* Individual Link Cards */}
                  {generatedLinks.map((linkData) => (
                    <motion.div 
                      key={linkData.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-md overflow-hidden p-4 md:p-6"
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-blue-900 break-words">
                            {linkData.name}
                          </h3>
                          {commonCompany && (
                            <p className="text-sm text-blue-600 mt-1">
                              Company Context: {commonCompany}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Links */}
                      <div className="space-y-4">
                        {Object.entries(linkData.links).map(([type, linkInfo]) => (
                          <div 
                            key={type}
                            className="flex flex-col md:flex-row items-start justify-between gap-4 p-4 bg-white rounded-lg shadow-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-blue-900 mb-2">
                                {linkInfo.title}
                              </div>
                              <a
                                href={linkInfo.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 break-words"
                              >
                                {isMobile ? linkInfo.link.substring(0, 40) + '...' : linkInfo.link}
                              </a>
                              <p className="text-sm text-gray-600 mt-1">
                                {linkInfo.description}
                              </p>
                            </div>
                            <a
                              href={linkInfo.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all min-h-[44px] w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md"
                            >
                              Open Link
                            </a>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Name Search History Section */}
          {searchHistory.length > 0 && (
            <div className="mt-12">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setSearchHistory([])}
                    className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-semibold shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-5 h-5" />
                    Clear History
                  </motion.button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Recent Name Searches</h3>
                {searchHistory.slice(0, 5).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-white rounded-xl border border-blue-200 shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          {item.name}
                        </h3>
                        {item.company && (
                          <p className="text-blue-600 text-sm mb-1">
                            Company: {item.company}
                          </p>
                        )}
                        <p className="text-blue-600 text-sm">
                          Searched on {new Date(item.timestamp).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => handleSearchAgain(item.name, item.company)}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium whitespace-nowrap touch-manipulation min-h-[44px] active:bg-blue-800"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Search Again
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkNameSearch;