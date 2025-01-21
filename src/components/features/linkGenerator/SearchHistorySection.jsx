import React, { useState } from 'react';
import { History, Trash2 } from 'lucide-react';
import ExportDropdown from '../../../components/exportDropdown';

const SearchHistorySection = ({ 
  searchHistory, 
  onClearHistory, 
  onSearchAgain,
  generatedLinks 
}) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold shadow-sm"
          >
            <History className="w-5 h-5" />
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
          {searchHistory.length > 0 && (
            <ExportDropdown 
              history={searchHistory}
              generatedLinks={generatedLinks}
            />
          )}
        </div>
        {showHistory && searchHistory.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold shadow-sm"
          >
            <Trash2 className="w-5 h-5" />
            Clear History
          </button>
        )}
      </div>

      {showHistory && searchHistory.length > 0 && (
        <div className="mt-8 space-y-6">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-blue-200 shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.company}</h3>
                  <p className="text-blue-600">
                    Searched on: {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onSearchAgain(item.company)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  Search Again
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistorySection;