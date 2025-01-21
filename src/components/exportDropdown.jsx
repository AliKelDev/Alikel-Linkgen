import React, { useState } from 'react';
import { FileDown, ChevronDown } from 'lucide-react';
import { exportSearchResults, exportHistory } from './exportUtils';

const ExportDropdown = ({ history, generatedLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (type) => {
    if (type === 'current') {
      exportSearchResults(generatedLinks);
    } else if (type === 'history') {
      exportHistory(history);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
      >
        <FileDown className="w-4 h-4" />
        Export
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          {generatedLinks?.length > 0 && (
            <button
              onClick={() => handleExport('current')}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 first:rounded-t-md"
            >
              Export Current Search
            </button>
          )}
          {history?.length > 0 && (
            <button
              onClick={() => handleExport('history')}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 last:rounded-b-md"
            >
              Export Search History
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportDropdown;