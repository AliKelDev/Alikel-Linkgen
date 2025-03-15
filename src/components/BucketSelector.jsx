import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, Save, Edit2, X, Check, RefreshCw } from 'lucide-react';

// Default buckets configuration
const DEFAULT_BUCKETS = [
  { 
    id: 'TECH_GIANT', 
    label: 'Tech Giant',
    devThreshold: 10000,
    securityThreshold: 3000,
    color: 'bg-indigo-600 hover:bg-indigo-700'
  },
  { 
    id: 'MAJOR_ENTERPRISE', 
    label: 'Major Enterprise',
    devThreshold: 5000,
    securityThreshold: 1500, 
    color: 'bg-blue-700 hover:bg-blue-800'
  },
  { 
    id: 'LARGE_ENTERPRISE', 
    label: 'Large Enterprise',
    devThreshold: 2000,
    securityThreshold: 600, 
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  { 
    id: 'ENTERPRISE', 
    label: 'Enterprise',
    devThreshold: 1000,
    securityThreshold: 300, 
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  { 
    id: 'GROWTH_PLUS', 
    label: 'Growth Plus',
    devThreshold: 500,
    securityThreshold: 150, 
    color: 'bg-green-600 hover:bg-green-700'
  },
  { 
    id: 'GROWTH', 
    label: 'Growth',
    devThreshold: 200,
    securityThreshold: 60, 
    color: 'bg-green-500 hover:bg-green-600'
  },
  { 
    id: 'LATE_STARTUP', 
    label: 'Late Startup',
    devThreshold: 100,
    securityThreshold: 30, 
    color: 'bg-teal-500 hover:bg-teal-600'
  },
  { 
    id: 'MID_STARTUP', 
    label: 'Mid Startup',
    devThreshold: 50,
    securityThreshold: 15, 
    color: 'bg-cyan-500 hover:bg-cyan-600'
  },
  { 
    id: 'EARLY_STARTUP', 
    label: 'Early Startup',
    devThreshold: 20,
    securityThreshold: 6, 
    color: 'bg-yellow-500 hover:bg-yellow-600'
  },
  { 
    id: 'PRE_SEED', 
    label: 'Pre-Seed',
    devThreshold: 0,
    securityThreshold: 0, 
    color: 'bg-orange-500 hover:bg-orange-600'
  }
];

// Available color options for bucket customization
const COLOR_OPTIONS = [
  { value: 'bg-indigo-600 hover:bg-indigo-700', label: 'Indigo' },
  { value: 'bg-blue-700 hover:bg-blue-800', label: 'Dark Blue' },
  { value: 'bg-blue-600 hover:bg-blue-700', label: 'Blue' },
  { value: 'bg-blue-500 hover:bg-blue-600', label: 'Light Blue' },
  { value: 'bg-green-600 hover:bg-green-700', label: 'Dark Green' },
  { value: 'bg-green-500 hover:bg-green-600', label: 'Green' },
  { value: 'bg-teal-500 hover:bg-teal-600', label: 'Teal' },
  { value: 'bg-cyan-500 hover:bg-cyan-600', label: 'Cyan' },
  { value: 'bg-purple-500 hover:bg-purple-600', label: 'Purple' },
  { value: 'bg-pink-500 hover:bg-pink-600', label: 'Pink' },
  { value: 'bg-yellow-500 hover:bg-yellow-600', label: 'Yellow' },
  { value: 'bg-orange-500 hover:bg-orange-600', label: 'Orange' },
  { value: 'bg-red-500 hover:bg-red-600', label: 'Red' },
  { value: 'bg-gray-700 hover:bg-gray-800', label: 'Dark Gray' },
  { value: 'bg-gray-500 hover:bg-gray-600', label: 'Gray' },
];

const determineBucket = (devTeamSize, securityTeamSize, buckets) => {
  if (!devTeamSize || !securityTeamSize) return '';
  
  // Sort buckets by thresholds in descending order to check largest first
  const sortedBuckets = [...buckets].sort((a, b) => 
    (b.devThreshold - a.devThreshold) || (b.securityThreshold - a.securityThreshold)
  );
  
  // Find the first bucket where the thresholds are met
  for (const bucket of sortedBuckets) {
    if (devTeamSize >= bucket.devThreshold && securityTeamSize >= bucket.securityThreshold) {
      return bucket.id;
    }
  }
  
  // If no bucket is found, return the smallest one
  return sortedBuckets[sortedBuckets.length - 1].id;
};

const BucketSelector = ({ selectedBucket, onChange }) => {
  const [devTeamSize, setDevTeamSize] = useState('');
  const [securityTeamSize, setSecurityTeamSize] = useState('');
  const [customBuckets, setCustomBuckets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingBucket, setEditingBucket] = useState(null);
  const [newBucketForm, setNewBucketForm] = useState({
    id: '',
    label: '',
    devThreshold: 0,
    securityThreshold: 0,
    color: 'bg-blue-600 hover:bg-blue-700'
  });
  const [bucketFormErrors, setBucketFormErrors] = useState({});

  // Load custom buckets from localStorage
  useEffect(() => {
    const savedBuckets = localStorage.getItem('customBuckets');
    if (savedBuckets) {
      try {
        setCustomBuckets(JSON.parse(savedBuckets));
      } catch (e) {
        console.error('Error loading custom buckets:', e);
        setCustomBuckets([]);
      }
    } else {
      setCustomBuckets(DEFAULT_BUCKETS);
    }
  }, []);

  // Save buckets whenever they change
  useEffect(() => {
    if (customBuckets.length > 0) {
      localStorage.setItem('customBuckets', JSON.stringify(customBuckets));
    }
  }, [customBuckets]);

  useEffect(() => {
    const determinedBucket = determineBucket(Number(devTeamSize), Number(securityTeamSize), customBuckets);
    if (determinedBucket) {
      onChange(determinedBucket);
    }
  }, [devTeamSize, securityTeamSize, onChange, customBuckets]);

  const getBucketById = (bucketId) => {
    return customBuckets.find(b => b.id === bucketId) || {};
  };

  const handleEditBucket = (bucket) => {
    setEditingBucket({ ...bucket });
    setEditMode(true);
  };

  const handleDeleteBucket = (bucketId) => {
    setCustomBuckets(customBuckets.filter(b => b.id !== bucketId));
  };

  const validateBucketForm = (bucket) => {
    const errors = {};
    
    if (!bucket.id) errors.id = 'ID is required';
    else if (!/^[A-Z0-9_]+$/.test(bucket.id)) errors.id = 'ID should be uppercase with underscores';
    else if (customBuckets.some(b => b.id === bucket.id && (!editingBucket || b.id !== editingBucket.id))) {
      errors.id = 'ID must be unique';
    }
    
    if (!bucket.label) errors.label = 'Label is required';
    
    if (bucket.devThreshold === '' || isNaN(bucket.devThreshold)) {
      errors.devThreshold = 'Must be a number';
    }
    
    if (bucket.securityThreshold === '' || isNaN(bucket.securityThreshold)) {
      errors.securityThreshold = 'Must be a number';
    }
    
    return errors;
  };

  const handleSaveBucket = () => {
    const formData = editingBucket || newBucketForm;
    const errors = validateBucketForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setBucketFormErrors(errors);
      return;
    }
    
    if (editingBucket) {
      // Update existing bucket
      setCustomBuckets(customBuckets.map(b => 
        b.id === editingBucket.id ? { ...formData } : b
      ));
    } else {
      // Add new bucket
      setCustomBuckets([...customBuckets, { ...formData }]);
    }
    
    setEditMode(false);
    setEditingBucket(null);
    setNewBucketForm({
      id: '',
      label: '',
      devThreshold: 0,
      securityThreshold: 0,
      color: 'bg-blue-600 hover:bg-blue-700'
    });
    setBucketFormErrors({});
  };

  const resetToDefaultBuckets = () => {
    setCustomBuckets(DEFAULT_BUCKETS);
    localStorage.setItem('customBuckets', JSON.stringify(DEFAULT_BUCKETS));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            Development Team Size
          </label>
          <input
            type="number"
            value={devTeamSize}
            onChange={(e) => setDevTeamSize(e.target.value)}
            className="w-full p-3 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            placeholder="Enter number"
            min="0"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            Security Team Size
          </label>
          <input
            type="number"
            value={securityTeamSize}
            onChange={(e) => setSecurityTeamSize(e.target.value)}
            className="w-full p-3 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            placeholder="Enter number"
            min="0"
          />
        </div>
      </div>

      {selectedBucket && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm bg-blue-50 p-3 rounded-lg"
        >
          <span className="font-medium text-blue-900">Selected Bucket: </span>
          <span className={`px-3 py-1 rounded-md text-white ${getBucketById(selectedBucket)?.color || 'bg-blue-600'}`}>
            {getBucketById(selectedBucket)?.label || selectedBucket}
            {getBucketById(selectedBucket)?.devThreshold && ` (${getBucketById(selectedBucket)?.devThreshold}+ devs, ${getBucketById(selectedBucket)?.securityThreshold}+ security)`}
          </span>
        </motion.div>
      )}

      {/* Bucket Management Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-blue-900">Company Size Buckets</h3>
        <div className="flex gap-2">
          {!editMode && (
            <>
              <motion.button
                onClick={() => {
                  setEditMode(true);
                  setEditingBucket(null);
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusCircle className="w-4 h-4" />
                New Bucket
              </motion.button>
              <motion.button
                onClick={resetToDefaultBuckets}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Reset to default buckets"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {editMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <h4 className="font-medium text-blue-900 mb-3">
            {editingBucket ? `Edit Bucket: ${editingBucket.label}` : 'Create New Bucket'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Bucket ID</label>
              <input
                type="text"
                value={editingBucket ? editingBucket.id : newBucketForm.id}
                onChange={(e) => {
                  if (editingBucket) {
                    setEditingBucket({ ...editingBucket, id: e.target.value.toUpperCase() });
                  } else {
                    setNewBucketForm({ ...newBucketForm, id: e.target.value.toUpperCase() });
                  }
                  setBucketFormErrors({ ...bucketFormErrors, id: null });
                }}
                className={`w-full p-2 border rounded-lg text-sm ${
                  bucketFormErrors.id ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="BUCKET_ID"
              />
              {bucketFormErrors.id && (
                <p className="text-red-500 text-xs mt-1">{bucketFormErrors.id}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Display Name</label>
              <input
                type="text"
                value={editingBucket ? editingBucket.label : newBucketForm.label}
                onChange={(e) => {
                  if (editingBucket) {
                    setEditingBucket({ ...editingBucket, label: e.target.value });
                  } else {
                    setNewBucketForm({ ...newBucketForm, label: e.target.value });
                  }
                  setBucketFormErrors({ ...bucketFormErrors, label: null });
                }}
                className={`w-full p-2 border rounded-lg text-sm ${
                  bucketFormErrors.label ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Bucket Name"
              />
              {bucketFormErrors.label && (
                <p className="text-red-500 text-xs mt-1">{bucketFormErrors.label}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min Dev Team Size</label>
              <input
                type="number"
                value={editingBucket ? editingBucket.devThreshold : newBucketForm.devThreshold}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingBucket) {
                    setEditingBucket({ ...editingBucket, devThreshold: value });
                  } else {
                    setNewBucketForm({ ...newBucketForm, devThreshold: value });
                  }
                  setBucketFormErrors({ ...bucketFormErrors, devThreshold: null });
                }}
                className={`w-full p-2 border rounded-lg text-sm ${
                  bucketFormErrors.devThreshold ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
              />
              {bucketFormErrors.devThreshold && (
                <p className="text-red-500 text-xs mt-1">{bucketFormErrors.devThreshold}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min Security Team Size</label>
              <input
                type="number"
                value={editingBucket ? editingBucket.securityThreshold : newBucketForm.securityThreshold}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingBucket) {
                    setEditingBucket({ ...editingBucket, securityThreshold: value });
                  } else {
                    setNewBucketForm({ ...newBucketForm, securityThreshold: value });
                  }
                  setBucketFormErrors({ ...bucketFormErrors, securityThreshold: null });
                }}
                className={`w-full p-2 border rounded-lg text-sm ${
                  bucketFormErrors.securityThreshold ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
              />
              {bucketFormErrors.securityThreshold && (
                <p className="text-red-500 text-xs mt-1">{bucketFormErrors.securityThreshold}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Color</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {COLOR_OPTIONS.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      if (editingBucket) {
                        setEditingBucket({ ...editingBucket, color: color.value });
                      } else {
                        setNewBucketForm({ ...newBucketForm, color: color.value });
                      }
                    }}
                    className={`p-2 rounded-lg text-white text-sm ${color.value} ${
                      (editingBucket && editingBucket.color === color.value) || 
                      (!editingBucket && newBucketForm.color === color.value)
                        ? 'ring-2 ring-offset-2 ring-blue-500'
                        : ''
                    }`}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <motion.button
              onClick={() => {
                setEditMode(false);
                setEditingBucket(null);
                setBucketFormErrors({});
              }}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4" />
              Cancel
            </motion.button>
            
            <motion.button
              onClick={handleSaveBucket}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="w-4 h-4" />
              {editingBucket ? 'Update' : 'Create'} Bucket
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Buckets Display */}
      {!editMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {customBuckets.map((bucket) => (
            <motion.div
              key={bucket.id}
              className={`p-3 rounded-xl transition-all relative ${bucket.color} ${
                selectedBucket === bucket.id 
                  ? 'ring-2 ring-blue-500 ring-offset-2' 
                  : 'opacity-90 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(bucket.id)}
            >
              <div className="font-medium text-white">{bucket.label}</div>
              <div className="text-xs text-white/80 mt-1">
                {bucket.devThreshold}+ devs, {bucket.securityThreshold}+ security
              </div>
              
              {/* Edit/Delete buttons (only visible on hover) */}
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditBucket(bucket);
                  }}
                  className="p-1 bg-white/20 hover:bg-white/30 rounded-md"
                  title="Edit bucket"
                >
                  <Edit2 className="w-3 h-3 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBucket(bucket.id);
                  }}
                  className="p-1 bg-white/20 hover:bg-red-400/50 rounded-md"
                  title="Delete bucket"
                >
                  <Trash2 className="w-3 h-3 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
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