import Papa from 'papaparse';

const formatSearchDataForExport = (generatedLinks) => {
  const formattedData = [];
  
  generatedLinks.forEach(company => {
    // Add basic company info
    const baseRow = {
      'Company Name': company.company,
      'Selected Domain': company.selectedDomain || '',
      'Bucket': company.bucket || '', // Added bucket to export
    };
    
    // Add all link types
    Object.entries(company.links).forEach(([type, linkInfo]) => {
      baseRow[`${linkInfo.title} Link`] = linkInfo.link;
      baseRow[`${linkInfo.title} Description`] = linkInfo.description;
    });
    
    formattedData.push(baseRow);
  });
  
  return formattedData;
};

const exportToCSV = (data, filename = 'search_results.csv') => {
  const csv = Papa.unparse(data, {
    quotes: true,
    skipEmptyLines: true,
    delimiter: ',',
  });
  
  const csvContent = '\ufeff' + csv; // Add BOM for Excel UTF-8 compatibility
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  try {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const exportSearchResults = (generatedLinks) => {
  const formattedData = formatSearchDataForExport(generatedLinks);
  exportToCSV(formattedData);
};

export const exportHistory = (history) => {
  const formattedData = history.map(item => ({
    Company: item.company,
    'Search Date': new Date(item.timestamp).toLocaleString(),
    'Search ID': item.id
  }));
  exportToCSV(formattedData, 'search_history.csv');
};