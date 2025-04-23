/**
 * Generates a LinkedIn search URL for a specific person by name
 * @param {string} name - Full name of the person to search
 * @returns {string} - LinkedIn search URL
 */
export const generateNameSearchLink = (name) => {
  // Clean the name by trimming and encoding for URL
  const cleanName = encodeURIComponent(name.trim());
  
  // Base URL for LinkedIn Sales Navigator people search
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  
  // Create query parameters for name search
  // This creates a basic search with the person's name
  const queryParams = `(keywords%3A${cleanName})`;

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a more targeted LinkedIn search URL with company context
 * @param {string} name - Full name of the person to search
 * @param {string} company - Optional company context
 * @returns {string} - LinkedIn search URL
 */
export const generateTargetedNameSearchLink = (name, company = '') => {
  // Clean the name by trimming and encoding for URL
  const cleanName = encodeURIComponent(name.trim());
  
  // Base URL for LinkedIn Sales Navigator people search
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  
  // Create query parameters for name search with company if provided
  let queryParams = `(keywords%3A${cleanName})`;
  
  // Add company filter if provided
  if (company && company.trim() !== '') {
    const cleanCompany = encodeURIComponent(company.trim());
    queryParams = `(spellCorrectionEnabled%3Atrue%2Cfilters%3AList(` + 
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${cleanCompany}%2CselectionType%3AINCLUDED)))` +
      `)%2Ckeywords%3A${cleanName})`;
  }

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL that combines multiple names with OR operators
 * @param {string[]} names - Array of person names to search
 * @param {string} company - Optional company context
 * @returns {string} - LinkedIn search URL for bulk search
 */
export const generateBulkNameSearchLink = (names, company = '') => {
  if (!names || !names.length) return '';
  
  // Clean and format each name with quotes for exact matching
  const formattedNames = names.map(name => `"${name.trim()}"`);
  
  // Join the names with OR operators
  const combinedNames = formattedNames.join(' OR ');
  
  // Encode the combined query for URL
  const encodedQuery = encodeURIComponent(combinedNames);
  
  // Base URL for LinkedIn Sales Navigator people search
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  
  // Create query parameters for combined name search
  let queryParams = `(keywords%3A${encodedQuery})`;
  
  // Add company filter if provided
  if (company && company.trim() !== '') {
    const cleanCompany = encodeURIComponent(company.trim());
    queryParams = `(spellCorrectionEnabled%3Atrue%2Cfilters%3AList(` + 
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${cleanCompany}%2CselectionType%3AINCLUDED)))` +
      `)%2Ckeywords%3A${encodedQuery})`;
  }

  return `${baseUrl}?query=${queryParams}`;
};