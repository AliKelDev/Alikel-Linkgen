/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
    return companyName
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '');
};

/**
 * Generates domain variants for a company based on given extensions
 * @param {string} companyName - The company name
 * @param {string[]} extensions - Array of domain extensions
 * @returns {string[]} - Array of complete domain names
 */
export const generateDomainVariants = (companyName, extensions) => {
    const cleanName = cleanCompanyName(companyName);
    return extensions.map(ext => `${cleanName}${ext}`);
};

/**
 * Generates a LinkedIn search URL for peers in your role
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generatePeerSearchLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
      // Function exclusions
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
      '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords
      'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
      '%2522Engineer%2522%2520OR%2520%2522Development%2522%2520OR%2520%2522Programming%2522%2520OR%2520' +
      '%2522Full%2520Stack%2522%2520OR%2520%2522Backend%2522%2520OR%2520%2522Frontend%2522%2529)';

    return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for HR and recruiting contacts
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateHRContactLink = (company) => {
    const baseUrl = 'https://www.linkedin.com/sales/search/people';
    const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
      // Function inclusions for HR
      '(type%3AFUNCTION%2Cvalues%3AList(' +
      '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AINCLUDED)))%2C' +
      // Company filter
      `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
      // Keywords for HR and recruiting
      'keywords%3A%2528%2522Recruiter%2522%2520OR%2520%2522Recruiting%2522%2520OR%2520%2522Talent%2522%2520OR%2520' +
      '%2522HR%2522%2520OR%2520%2522Human%2520Resources%2522%2520OR%2520%2522Talent%2520Acquisition%2522%2529)';

    return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates all search links for a company
 * @param {string} company - The company name
 * @param {string} domain - The company's domain
 * @returns {Object} - Object containing all generated links with their metadata
 */
export const generateLinks = (company, domain) => {
    return {
      peers: {
        title: "Find Peers",
        link: generatePeerSearchLink(company),
        description: "LinkedIn Search for People in Similar Roles",
      },
      hrContacts: {
        title: "HR Contacts",
        link: generateHRContactLink(company),
        description: "LinkedIn Search for HR and Recruiting Team Members",
      }
    };
};