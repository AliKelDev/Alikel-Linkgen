import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, AlertCircle, X, Copy, CheckCheck, Loader2, Globe, 
  Download, Check, XIcon, Grid, Layout, Maximize2
} from 'lucide-react';

const DomainCheckerModal = ({ company, isOpen, onClose }) => {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [copied, setCopied] = useState(false);
  const [domainStatus, setDomainStatus] = useState({}); // Track domain existence status
  const [popupWarningDismissed, setPopupWarningDismissed] = useState(false);
  const [showDomainFilter, setShowDomainFilter] = useState('all'); // 'all', 'exists', 'not-exists', 'unknown'
  const [viewMode, setViewMode] = useState('grid'); // Default to grid view now
  const [gridSize, setGridSize] = useState('3x3'); // Options: 2x2, 3x3, 4x4
  const [iframeLoading, setIframeLoading] = useState({});
  const [iframeError, setIframeError] = useState({});
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

  // Initialize loading state for all domains when switching to grid view
  useEffect(() => {
    if (viewMode === 'grid') {
      const initialLoading = {};
      selectedDomains.forEach(domain => {
        initialLoading[domain.domain] = true;
      });
      setIframeLoading(initialLoading);
      setIframeError({});
    }
  }, [viewMode, selectedDomains]);

  const generateDomainList = () => {
    if (!company) return;
    
    // Clean company name for domain use
    const cleanCompanyName = company
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
    
    // Generate domain URLs
    const domains = commonTLDs.map(tld => {
      const domainName = `${cleanCompanyName}${tld}`;
      return {
        domain: domainName
      };
    });
    
    // Initialize domain status for new domains
    const initialStatus = {};
    domains.forEach(domain => {
      // Preserve existing status if available
      initialStatus[domain.domain] = domainStatus[domain.domain] || 'unknown';
    });
    
    setDomainStatus(initialStatus);
    setSelectedDomains(domains);
  };

  const handleCopyAllDomains = () => {
    const textToCopy = selectedDomains.map(item => 
      `${item.domain}: https://${item.domain}`
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

  // Open a single domain in a new tab
  const handleOpenSingle = (domain) => {
    window.open(`https://${domain}`, '_blank', 'noopener,noreferrer');
  };

  // Handle domain status toggle
  const handleDomainStatusChange = (domain, status) => {
    setDomainStatus(prev => ({
      ...prev,
      [domain]: status
    }));
  };

  // Export domain results as CSV
  const exportToCSV = () => {
    const csvContent = [
      // CSV Header
      ['Domain', 'Status', 'URL'].join(','),
      // CSV Rows
      ...selectedDomains.map(item => 
        [
          item.domain,
          domainStatus[item.domain] || 'unknown',
          `https://${item.domain}`
        ].join(',')
      )
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${company.replace(/\s+/g, '_')}_domain_check.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get filtered domains based on status
  const getFilteredDomains = () => {
    if (showDomainFilter === 'all') return selectedDomains;
    return selectedDomains.filter(item => domainStatus[item.domain] === showDomainFilter);
  };

  // Calculate stats for domain checks
  const getDomainStats = () => {
    const total = selectedDomains.length;
    const exists = selectedDomains.filter(item => domainStatus[item.domain] === 'exists').length;
    const notExists = selectedDomains.filter(item => domainStatus[item.domain] === 'not-exists').length;
    const unknown = total - exists - notExists;
    
    return { total, exists, notExists, unknown };
  };

  // Handle iframe load events
  const handleIframeLoad = (domain) => {
    setIframeLoading(prev => ({ ...prev, [domain]: false }));
  };
  
  // Handle iframe load errors
  const handleIframeError = (domain) => {
    setIframeError(prev => ({ ...prev, [domain]: true }));
    setIframeLoading(prev => ({ ...prev, [domain]: false }));
  };
  
  // Grid column class based on selected size
  const getGridClass = () => {
    switch (gridSize) {
      case '2x2': return 'grid-cols-2';
      case '3x3': return 'grid-cols-3';
      case '4x4': return 'grid-cols-4';
      default: return 'grid-cols-3';
    }
  };

  // Open grid in new window
  const openGridInNewWindow = () => {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    const newWindow = window.open(
      '', 
      `${company}_domains`,
      `width=${width},height=${height},top=${top},left=${left}`
    );
    
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${company} Domain Grid</title>
            <style>
              body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #f9fafb; }
              .grid { display: grid; gap: 20px; margin-top: 20px; }
              .grid-2x2 { grid-template-columns: repeat(2, 1fr); }
              .grid-3x3 { grid-template-columns: repeat(3, 1fr); }
              .grid-4x4 { grid-template-columns: repeat(4, 1fr); }
              .domain-card { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: white; height: 400px; display: flex; flex-direction: column; }
              .domain-header { padding: 10px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; background: #f3f4f6; }
              .domain-title { font-weight: bold; color: #1e3a8a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
              .iframe-container { flex: 1; position: relative; }
              iframe { width: 100%; height: 100%; border: none; }
              .error-container { display: flex; height: 100%; align-items: center; justify-content: center; flex-direction: column; color: #b91c1c; }
              .loading-container { display: flex; height: 100%; align-items: center; justify-content: center; }
              .loader { border: 4px solid #f3f4f6; border-top: 4px solid #3b82f6; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              .controls { margin-bottom: 20px; display: flex; gap: 10px; align-items: center; }
              button { padding: 8px 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }
              button:hover { background: #1d4ed8; }
              select { padding: 8px; border-radius: 6px; border: 1px solid #d1d5db; }
              h1 { color: #1e3a8a; }
              .status-indicator { font-size: 12px; padding: 2px 6px; border-radius: 4px; margin-left: 8px; }
              .status-exists { background: #d1fae5; color: #065f46; }
              .status-not-exists { background: #fee2e2; color: #b91c1c; }
              .status-unknown { background: #e5e7eb; color: #4b5563; }
              .domain-actions { display: flex; gap: 5px; }
              .action-button { padding: 5px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
              .action-button-exists { background: #d1fae5; }
              .action-button-exists.active { background: #059669; color: white; }
              .action-button-not-exists { background: #fee2e2; }
              .action-button-not-exists.active { background: #dc2626; color: white; }
              .action-button-open { background: #dbeafe; }
            </style>
          </head>
          <body>
            <h1>${company} Domain Grid</h1>
            <div class="controls">
              <select id="gridSizeSelector" onchange="changeGridSize()">
                <option value="2x2">2×2 Grid</option>
                <option value="3x3" selected>3×3 Grid</option>
                <option value="4x4">4×4 Grid</option>
              </select>
              <button onclick="markAllExisting()">Mark All as Existing</button>
              <button onclick="markAllNotExisting()">Mark All as Not Existing</button>
            </div>
            <div id="domainGrid" class="grid grid-3x3">
              ${selectedDomains.map(item => {
                const status = domainStatus[item.domain] || 'unknown';
                const statusClass = status === 'exists' ? 'status-exists' : 
                                  status === 'not-exists' ? 'status-not-exists' : 
                                  'status-unknown';
                const statusText = status === 'exists' ? 'Exists' : 
                                  status === 'not-exists' ? 'Not Exists' : 
                                  'Unknown';
                return `
                  <div class="domain-card" id="card-${item.domain}">
                    <div class="domain-header">
                      <div style="display: flex; align-items: center; min-width: 0;">
                        <span class="domain-title">${item.domain}</span>
                        <span class="status-indicator ${statusClass}" id="status-${item.domain}">${statusText}</span>
                      </div>
                      <div class="domain-actions">
                        <button 
                          class="action-button action-button-exists ${status === 'exists' ? 'active' : ''}" 
                          onclick="updateStatus('${item.domain}', 'exists')"
                          title="Mark as exists"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                        <button 
                          class="action-button action-button-not-exists ${status === 'not-exists' ? 'active' : ''}" 
                          onclick="updateStatus('${item.domain}', 'not-exists')"
                          title="Mark as not exists"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <a 
                          href="https://${item.domain}" 
                          target="_blank" 
                          class="action-button action-button-open"
                          title="Open in new tab"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div class="iframe-container">
                      <div id="loading-${item.domain}" class="loading-container">
                        <div class="loader"></div>
                      </div>
                      <iframe 
                        src="https://${item.domain}" 
                        title="${item.domain}" 
                        onload="document.getElementById('loading-${item.domain}').style.display='none';"
                        onerror="handleIframeError('${item.domain}')"
                      ></iframe>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
            <script>
              // Domain statuses
              let domainStatuses = ${JSON.stringify(domainStatus)};
              
              // Send status updates back to parent window
              function updateStatus(domain, status) {
                domainStatuses[domain] = status;
                
                // Update UI
                const statusElement = document.getElementById(\`status-\${domain}\`);
                if (statusElement) {
                  statusElement.className = \`status-indicator \${status === 'exists' ? 'status-exists' : status === 'not-exists' ? 'status-not-exists' : 'status-unknown'}\`;
                  statusElement.textContent = status === 'exists' ? 'Exists' : status === 'not-exists' ? 'Not Exists' : 'Unknown';
                }
                
                // Update button states
                const existsButton = document.querySelector(\`#card-\${domain} .action-button-exists\`);
                const notExistsButton = document.querySelector(\`#card-\${domain} .action-button-not-exists\`);
                
                if (existsButton) existsButton.className = \`action-button action-button-exists \${status === 'exists' ? 'active' : ''}\`;
                if (notExistsButton) notExistsButton.className = \`action-button action-button-not-exists \${status === 'not-exists' ? 'active' : ''}\`;
                
                // Send to parent
                window.opener.postMessage({
                  type: 'domain-status-update',
                  domain: domain,
                  status: status
                }, '*');
              }
              
              function handleIframeError(domain) {
                const iframeContainer = document.querySelector(\`iframe[title="\${domain}"]\`).parentNode;
                const loadingElement = document.getElementById(\`loading-\${domain}\`);
                
                if (loadingElement) {
                  loadingElement.style.display = 'none';
                }
                
                const errorElement = document.createElement('div');
                errorElement.className = 'error-container';
                errorElement.innerHTML = \`
                  <p>Unable to embed this site</p>
                  <a href="https://\${domain}" target="_blank" style="color: #2563eb; text-decoration: none; padding: 6px 12px; background: #eff6ff; border-radius: 4px;">Open directly</a>
                \`;
                
                iframeContainer.appendChild(errorElement);
              }
              
              function changeGridSize() {
                const grid = document.getElementById('domainGrid');
                const size = document.getElementById('gridSizeSelector').value;
                grid.className = \`grid grid-\${size}\`;
              }
              
              function markAllExisting() {
                const domains = ${JSON.stringify(selectedDomains.map(item => item.domain))};
                domains.forEach(domain => updateStatus(domain, 'exists'));
              }
              
              function markAllNotExisting() {
                const domains = ${JSON.stringify(selectedDomains.map(item => item.domain))};
                domains.forEach(domain => updateStatus(domain, 'not-exists'));
              }
              
              // Handle X-Frame-Options restrictions
              window.addEventListener('message', function(event) {
                if (event.data.type === 'iframe-error') {
                  handleIframeError(event.data.domain);
                }
              });
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
      
      // Listen for messages from the opened window
      window.addEventListener('message', (event) => {
        if (event.data.type === 'domain-status-update') {
          handleDomainStatusChange(event.data.domain, event.data.status);
        }
      });
    }
  };

  if (!isOpen) return null;

  const filteredDomains = getFilteredDomains();
  const stats = getDomainStats();

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
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mr-2">
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="List View"
                >
                  <Layout className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pop-up Blocker Warning (only for the new window feature) */}
          {!popupWarningDismissed && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 font-medium mb-1">Important: Enable Pop-ups</p>
                <p className="text-sm text-red-600">
                  To use the "Open Grid in Window" feature, please ensure your browser allows pop-ups from this site.
                </p>
              </div>
              <button 
                onClick={() => setPopupWarningDismissed(true)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full flex-shrink-0"
                aria-label="Dismiss warning"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Domain Stats */}
          <div className="mb-4 grid grid-cols-4 gap-2 bg-blue-50 p-3 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-blue-600">Total</p>
              <p className="font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-green-600">Exists</p>
              <p className="font-bold text-green-700">{stats.exists}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-red-600">Not Exists</p>
              <p className="font-bold text-red-700">{stats.notExists}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Unknown</p>
              <p className="font-bold text-gray-700">{stats.unknown}</p>
            </div>
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
                  Copy All URLs
                </>
              )}
            </button>
            
            {viewMode === 'grid' && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Grid size:</span>
                  <select 
                    value={gridSize}
                    onChange={(e) => setGridSize(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="2x2">2×2</option>
                    <option value="3x3">3×3</option>
                    <option value="4x4">4×4</option>
                  </select>
                </div>
                
                <button
                  onClick={openGridInNewWindow}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                  Open Grid in Window
                </button>
              </>
            )}

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <>
              {/* Filter Options */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Filter:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setShowDomainFilter('all')} 
                    className={`px-3 py-1 rounded text-sm ${showDomainFilter === 'all' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setShowDomainFilter('exists')} 
                    className={`px-3 py-1 rounded text-sm ${showDomainFilter === 'exists' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    Exists
                  </button>
                  <button 
                    onClick={() => setShowDomainFilter('not-exists')} 
                    className={`px-3 py-1 rounded text-sm ${showDomainFilter === 'not-exists' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    Not Exists
                  </button>
                  <button 
                    onClick={() => setShowDomainFilter('unknown')} 
                    className={`px-3 py-1 rounded text-sm ${showDomainFilter === 'unknown' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    Unknown
                  </button>
                </div>
              </div>

              {/* Domain List */}
              <div className="space-y-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredDomains.length === 0 ? (
                  <div className="text-center text-gray-500 py-6">
                    No domains match the selected filter
                  </div>
                ) : (
                  filteredDomains.map((item) => {
                    const status = domainStatus[item.domain] || 'unknown';
                    return (
                      <div 
                        key={item.domain} 
                        className={`p-3 rounded-lg flex items-center ${
                          status === 'exists' 
                            ? 'bg-green-50 border border-green-100' 
                            : status === 'not-exists'
                              ? 'bg-red-50 border border-red-100'
                              : 'bg-gray-50'
                        }`}
                      >
                        {/* Domain Status Icon */}
                        {status === 'exists' ? (
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mr-3" />
                        ) : status === 'not-exists' ? (
                          <XIcon className="w-4 h-4 text-red-600 flex-shrink-0 mr-3" />
                        ) : (
                          <Globe className="w-4 h-4 text-blue-600 flex-shrink-0 mr-3" />
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-blue-900 truncate">{item.domain}</div>
                        </div>
                        
                        {/* Domain Status Controls */}
                        <div className="flex items-center gap-1 flex-shrink-0 ml-3">
                          <button
                            onClick={() => handleDomainStatusChange(item.domain, 'exists')}
                            className={`p-2 rounded-lg flex items-center justify-center ${
                              status === 'exists' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                            }`}
                            title="Mark as exists"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDomainStatusChange(item.domain, 'not-exists')}
                            className={`p-2 rounded-lg flex items-center justify-center ${
                              status === 'not-exists' 
                                ? 'bg-red-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                            }`}
                            title="Mark as does not exist"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleOpenSingle(item.domain)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex-shrink-0"
                            title="Open domain"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className={`grid ${getGridClass()} gap-4`}>
              {selectedDomains.map((item) => {
                const status = domainStatus[item.domain] || 'unknown';
                const statusClass = status === 'exists' ? 'bg-green-100 text-green-800' : 
                                  status === 'not-exists' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800';
                const statusText = status === 'exists' ? 'Exists' : 
                                  status === 'not-exists' ? 'Not Exists' : 
                                  'Unknown';
                return (
                  <div key={item.domain} className="border rounded-lg overflow-hidden flex flex-col h-64 bg-white">
                    <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
                      <div className="flex items-center min-w-0 pr-1">
                        <span className="font-medium text-blue-800 truncate max-w-[100px]">{item.domain}</span>
                        <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${statusClass}`}>
                          {statusText}
                        </span>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleDomainStatusChange(item.domain, 'exists')}
                          className={`p-1 rounded ${status === 'exists' ? 'bg-green-500 text-white' : 'hover:bg-green-100'}`}
                          title="Mark as exists"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDomainStatusChange(item.domain, 'not-exists')}
                          className={`p-1 rounded ${status === 'not-exists' ? 'bg-red-500 text-white' : 'hover:bg-red-100'}`}
                          title="Mark as not exists"
                        >
                          <XIcon className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleOpenSingle(item.domain)}
                          className="p-1 hover:bg-blue-100 rounded"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      {iframeLoading[item.domain] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                      )}
                      {iframeError[item.domain] ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 p-4">
                          <p className="text-red-700 mb-2">Unable to embed this site</p>
                          <button 
                            onClick={() => handleOpenSingle(item.domain)}
                            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Open directly
                          </button>
                        </div>
                      ) : (
                        <iframe 
                          src={`https://${item.domain}`}
                          title={item.domain}
                          className="w-full h-full border-0"
                          onLoad={() => handleIframeLoad(item.domain)}
                          onError={() => handleIframeError(item.domain)}
                          sandbox="allow-same-origin allow-scripts"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DomainCheckerModal;