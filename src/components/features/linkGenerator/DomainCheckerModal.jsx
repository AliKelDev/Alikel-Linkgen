import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertCircle, X, Copy, CheckCheck, Loader2, Globe } from 'lucide-react';

const DomainCheckerModal = ({ company, isOpen, onClose }) => {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [copied, setCopied] = useState(false);
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
        link: `https://www.google.com/search?q=site%3A${domainName}`
      };
    });
    
    setSelectedDomains(domains);
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

  // Open a single domain search
  const handleOpenSingle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Open batch domain researcher
  const openBatchDomainResearcher = () => {
    // Clean company name for domain use
    const cleanCompanyName = company
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
    
    // Generate the HTML for our custom researcher page
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Domain Research: ${company}</title>
  <style>
    :root {
      --blue-50: #eff6ff;
      --blue-100: #dbeafe;
      --blue-200: #bfdbfe;
      --blue-500: #3b82f6;
      --blue-600: #2563eb;
      --blue-700: #1d4ed8;
      --blue-900: #1e3a8a;
      --green-100: #dcfce7;
      --green-500: #22c55e;
      --green-600: #16a34a;
      --yellow-50: #fefce8;
      --yellow-100: #fef9c3;
      --yellow-600: #ca8a04;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --red-100: #fee2e2;
      --red-500: #ef4444;
      --red-600: #dc2626;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.5;
      color: var(--gray-700);
      background-color: var(--blue-50);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--blue-200);
    }
    
    h1 {
      color: var(--blue-900);
      font-size: 1.5rem;
    }
    
    .domains-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .domain-card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      border: 1px solid var(--gray-200);
      transition: all 0.2s ease;
    }
    
    .domain-card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    
    .domain-name {
      font-weight: 600;
      color: var(--blue-700);
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
    }
    
    .domain-url {
      color: var(--gray-500);
      font-size: 0.875rem;
      margin-bottom: 1rem;
      word-break: break-all;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    
    button {
      cursor: pointer;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
    
    .btn-search {
      background-color: var(--blue-500);
      color: white;
    }
    
    .btn-search:hover {
      background-color: var(--blue-600);
    }
    
    .btn-mark {
      background-color: var(--gray-100);
      color: var(--gray-700);
    }
    
    .btn-mark:hover {
      background-color: var(--gray-200);
    }
    
    .domain-card.available {
      background-color: var(--green-100);
      border-color: var(--green-500);
    }
    
    .domain-card.taken {
      background-color: var(--red-100);
      border-color: var(--red-500);
    }
    
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .status-badge.available {
      background-color: var(--green-500);
      color: white;
    }
    
    .status-badge.taken {
      background-color: var(--red-500);
      color: white;
    }
    
    .status-badge.unknown {
      background-color: var(--gray-300);
      color: var(--gray-700);
    }
    
    .info-alert {
      background-color: var(--yellow-50);
      border: 1px solid var(--yellow-100);
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 2rem;
      color: var(--yellow-600);
    }
    
    .batch-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .auto-open-section {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .auto-open-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    
    progress {
      width: 100%;
      height: 0.5rem;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Domain Research: ${company}</h1>
      <div id="summary">
        <span id="checked-count">0</span>/${selectedDomains.length} domains checked
      </div>
    </header>
    
    <div class="info-alert">
      <strong>Note:</strong> Make sure pop-ups are allowed in your browser for this tool to work properly.
      This tool will help you research domains systematically without juggling multiple tabs.
    </div>
    
    <div class="auto-open-section">
      <h2>Batch Search Options</h2>
      <div class="auto-open-controls">
        <select id="delay-select" class="btn-mark">
          <option value="0.1">0.1 second delay</option>
          <option value="0.5">0.5 second delay</option>
          <option value="1">1 second delay</option>
          <option value="2" selected>2 seconds delay</option>
        </select>
        <button id="start-auto-search" class="btn-search">Start Auto-Search</button>
        <button id="stop-auto-search" class="btn-mark" disabled>Stop</button>
      </div>
      <div id="progress-container" style="display: none; margin-top: 0.5rem;">
        <div>Searching: <span id="current-domain"></span> (<span id="progress-count">0</span>/${selectedDomains.length})</div>
        <progress id="progress-bar" value="0" max="${selectedDomains.length}"></progress>
      </div>
    </div>
    
    <div class="batch-actions">
      <button id="btn-reset" class="btn-mark">Reset All Status</button>
      <button id="btn-export" class="btn-mark">Export Results</button>
    </div>
    
    <div class="domains-grid">
      ${selectedDomains.map((domain, index) => `
        <div class="domain-card" id="domain-${index}" data-domain="${domain.domain}" data-search-url="${domain.link}">
          <div class="status-badge unknown">Unknown</div>
          <div class="domain-name">${domain.domain}</div>
          <div class="domain-url">http://${domain.domain}</div>
          <div class="actions">
            <button class="btn-search" onclick="openSearch(${index})">Search</button>
            <button class="btn-mark" onclick="markAvailable(${index})">Available</button>
            <button class="btn-mark" onclick="markTaken(${index})">Taken</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <script>
    // Domain data
    const domains = ${JSON.stringify(selectedDomains)};
    let checkedCount = 0;
    let isAutoSearching = false;
    let currentSearchIndex = 0;
    let searchInterval;
    
    // Open Google search for a domain
    function openSearch(index) {
      const card = document.getElementById('domain-' + index);
      const searchUrl = card.dataset.searchUrl;
      window.open(searchUrl, '_blank');
    }
    
    // Mark a domain as available
    function markAvailable(index) {
      const card = document.getElementById('domain-' + index);
      
      // If it wasn't already marked as something, increment the counter
      if (!card.classList.contains('available') && !card.classList.contains('taken')) {
        checkedCount++;
        document.getElementById('checked-count').textContent = checkedCount;
      }
      
      // Update styling
      card.classList.remove('taken');
      card.classList.add('available');
      card.querySelector('.status-badge').textContent = 'Available';
      card.querySelector('.status-badge').classList.remove('unknown', 'taken');
      card.querySelector('.status-badge').classList.add('available');
      
      // Save to localStorage
      saveDomainsStatus();
    }
    
    // Mark a domain as taken
    function markTaken(index) {
      const card = document.getElementById('domain-' + index);
      
      // If it wasn't already marked as something, increment the counter
      if (!card.classList.contains('available') && !card.classList.contains('taken')) {
        checkedCount++;
        document.getElementById('checked-count').textContent = checkedCount;
      }
      
      // Update styling
      card.classList.remove('available');
      card.classList.add('taken');
      card.querySelector('.status-badge').textContent = 'Taken';
      card.querySelector('.status-badge').classList.remove('unknown', 'available');
      card.querySelector('.status-badge').classList.add('taken');
      
      // Save to localStorage
      saveDomainsStatus();
    }
    
    // Save domain status to localStorage
    function saveDomainsStatus() {
      const domainStatus = {};
      
      document.querySelectorAll('.domain-card').forEach(card => {
        const domain = card.dataset.domain;
        let status = 'unknown';
        
        if (card.classList.contains('available')) {
          status = 'available';
        } else if (card.classList.contains('taken')) {
          status = 'taken';
        }
        
        domainStatus[domain] = status;
      });
      
      localStorage.setItem('domainStatus_${cleanCompanyName}', JSON.stringify(domainStatus));
    }
    
    // Load domain status from localStorage
    function loadDomainsStatus() {
      const saved = localStorage.getItem('domainStatus_${cleanCompanyName}');
      if (!saved) return;
      
      try {
        const domainStatus = JSON.parse(saved);
        let count = 0;
        
        document.querySelectorAll('.domain-card').forEach(card => {
          const domain = card.dataset.domain;
          if (domain in domainStatus) {
            const status = domainStatus[domain];
            
            if (status === 'available') {
              card.classList.add('available');
              card.querySelector('.status-badge').textContent = 'Available';
              card.querySelector('.status-badge').classList.add('available');
              card.querySelector('.status-badge').classList.remove('unknown');
              count++;
            } else if (status === 'taken') {
              card.classList.add('taken');
              card.querySelector('.status-badge').textContent = 'Taken';
              card.querySelector('.status-badge').classList.add('taken');
              card.querySelector('.status-badge').classList.remove('unknown');
              count++;
            }
          }
        });
        
        checkedCount = count;
        document.getElementById('checked-count').textContent = count;
      } catch (e) {
        console.error('Error loading domain status:', e);
      }
    }
    
    // Start auto search process
    function startAutoSearch() {
      if (isAutoSearching) return;
      
      const delaySelect = document.getElementById('delay-select');
      const delay = parseFloat(delaySelect.value) * 1000; // Convert to milliseconds
      
      isAutoSearching = true;
      currentSearchIndex = 0;
      
      // Update UI
      document.getElementById('start-auto-search').disabled = true;
      document.getElementById('stop-auto-search').disabled = false;
      document.getElementById('progress-container').style.display = 'block';
      document.getElementById('progress-count').textContent = 0;
      document.getElementById('progress-bar').value = 0;
      
      // Start the search process
      searchNext(delay);
    }
    
    // Search next domain
    function searchNext(delay) {
      if (!isAutoSearching || currentSearchIndex >= domains.length) {
        stopAutoSearch();
        return;
      }
      
      // Update progress
      document.getElementById('current-domain').textContent = domains[currentSearchIndex].domain;
      document.getElementById('progress-count').textContent = currentSearchIndex + 1;
      document.getElementById('progress-bar').value = currentSearchIndex + 1;
      
      // Open search
      openSearch(currentSearchIndex);
      
      // Schedule next search
      currentSearchIndex++;
      if (currentSearchIndex < domains.length) {
        setTimeout(() => searchNext(delay), delay);
      } else {
        stopAutoSearch();
      }
    }
    
    // Stop auto search
    function stopAutoSearch() {
      isAutoSearching = false;
      document.getElementById('start-auto-search').disabled = false;
      document.getElementById('stop-auto-search').disabled = true;
    }
    
    // Export results
    function exportResults() {
      const results = {
        company: '${company}',
        date: new Date().toISOString().split('T')[0],
        domains: []
      };
      
      document.querySelectorAll('.domain-card').forEach(card => {
        const domain = card.dataset.domain;
        let status = 'unknown';
        
        if (card.classList.contains('available')) {
          status = 'available';
        } else if (card.classList.contains('taken')) {
          status = 'taken';
        }
        
        results.domains.push({
          domain,
          status
        });
      });
      
      // Create downloadable file
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "${cleanCompanyName}_domain_results.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
    
    // Event Listeners
    document.getElementById('start-auto-search').addEventListener('click', startAutoSearch);
    document.getElementById('stop-auto-search').addEventListener('click', stopAutoSearch);
    document.getElementById('btn-export').addEventListener('click', exportResults);
    
    // Reset all domains
    document.getElementById('btn-reset').addEventListener('click', function() {
      document.querySelectorAll('.domain-card').forEach(card => {
        card.classList.remove('available', 'taken');
        card.querySelector('.status-badge').textContent = 'Unknown';
        card.querySelector('.status-badge').classList.remove('available', 'taken');
        card.querySelector('.status-badge').classList.add('unknown');
      });
      
      checkedCount = 0;
      document.getElementById('checked-count').textContent = '0';
      
      localStorage.removeItem('domainStatus_${cleanCompanyName}');
    });
    
    // Initialize
    loadDomainsStatus();
  </script>
</body>
</html>
    `;
    
    // Create a blob from our HTML
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open in a new tab
    window.open(url, '_blank');
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
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
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
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
            
            <button
              onClick={openBatchDomainResearcher}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Open Domain Researcher
            </button>
          </div>

          {/* Information Alert */}
          <div className="border-t border-gray-200 pt-3">
            <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                The domain researcher tool will open in a new tab. Make sure pop-ups are allowed in your browser.
                It provides a better way to research domains systematically without juggling multiple tabs.
              </p>
            </div>

            {/* Domain List */}
            <div className="space-y-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {selectedDomains.map((item, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg flex items-center gap-3 bg-gray-50"
                >
                  <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-blue-900 mb-1 truncate">{item.domain}</div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate block"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSingle(item.link);
                      }}
                    >
                      Google Search
                    </a>
                  </div>
                  <button
                    onClick={() => handleOpenSingle(item.link)}
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