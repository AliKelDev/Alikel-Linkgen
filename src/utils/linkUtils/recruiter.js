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
 * Generates a LinkedIn search URL for developer profiles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateDevSearchLink = (company) => {
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
      'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Logiciel%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
      '%2522D%25C3%25A9veloppeur%2522%2520OR%2520%2522Entwickler%2522%2520OR%2520%2522Desarrollador%2522%2520OR%2520' +
      '%2522DevOps%2522%2520OR%2520%2522Cloud%2522%2520OR%2520%2522Engineer%2522%2520OR%2520%2522Ing%25C3%25A9nieur' +
      '%2522%2520OR%2520%2522Ingenieur%2522%2520OR%2520%2522Ingeniero%2522%2529%2520And%2520%2528NOT%2520%2522Marketing' +
      '%2522%2529)';

    return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for tech leaders and hiring managers
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateTechLeadersLink = (company) => {
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
      // Keywords for tech leadership roles
      'keywords%3A%2528%2522Engineering%2522%2520OR%2520%2522Software%2522%2520OR%2520%2522Development%2522%2520OR%2520' +
      '%2522Tech%2522%2520OR%2520%2522Technology%2522%2520OR%2520%2522R%2526D%2522%2520OR%2520%2522Product%2522%2520OR%2520' +
      '%2522Platform%2522%2520OR%2520%2522Architecture%2522%2529%2520AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520' +
      '%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2529)';

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
      dev: {
        title: "Tech Candidates",
        link: generateDevSearchLink(company),
        description: "LinkedIn Search for Development Team Members",
      },
      techLeaders: {
        title: "Tech Leaders",
        link: generateTechLeadersLink(company),
        description: "LinkedIn Search for Tech Leaders and Hiring Managers",
      }
    };
};