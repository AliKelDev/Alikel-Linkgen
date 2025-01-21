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