import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

const CompanyInput = ({ onSubmit }) => {
  const [companyInput, setCompanyInput] = useState('');
  const [companyCount, setCompanyCount] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setCompanyCount(companyInput.split('\n').filter(c => c.trim()).length);
    }
  }, [companyInput]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const companies = companyInput
          .split('\n')
          .map((company) => company.trim())
          .filter((company) => company.length > 0);

      if (companies.length > 0) {
        onSubmit(companies);
      }
  };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-lg font-semibold text-blue-900">
                        Enter Company Names
                    </label>
                    <span className="text-sm text-blue-500">
                        {companyCount} companies entered
                    </span>
                </div>
                <p className="text-sm text-blue-600 mb-3">Add one company per line</p>
                <textarea
                    ref={textareaRef}
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    placeholder="CyberAgent, Inc.
TechCorp LLC
SecureNet Systems"
                    className="w-full p-4 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none overflow-hidden"
                    required
                    rows={3}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                    Generate Links
                </button>
            </div>
        </form>
    );
};

export default CompanyInput;