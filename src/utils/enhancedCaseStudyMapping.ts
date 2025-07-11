
// Simplified static mapping system for enhanced case studies
const STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID: Record<string, number> = {
  'Vietnam-Textile': 1,
  'Bangladesh-Textile': 2, 
  'Cambodia-Textile': 3,
  'UAE-Textile': 4,
  'United Arab Emirates-Textile': 4,
  'Myanmar-Textile': 5,
  'India-Textile': 6,
  'Turkey-Textile': 7,
  'Pakistan-Textile': 8,
  'Indonesia-Textile': 9,
  'Ethiopia-Textile': 10
};

// Available enhanced case study IDs
const AVAILABLE_ENHANCED_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const getEnhancedCaseStudyId = (story: any): number | null => {
  console.log('Getting enhanced case study ID for story:', story);
  
  // Handle numeric IDs directly
  if (typeof story.id === 'number' && AVAILABLE_ENHANCED_IDS.includes(story.id)) {
    console.log('Found numeric ID:', story.id);
    return story.id;
  }
  
  // Handle string numeric IDs
  if (typeof story.id === 'string') {
    const numericId = parseInt(story.id);
    if (!isNaN(numericId) && AVAILABLE_ENHANCED_IDS.includes(numericId)) {
      console.log('Found string numeric ID:', numericId);
      return numericId;
    }
  }
  
  // Primary method: Match by country + sector combination
  if (story.country && story.sector) {
    const key = `${story.country}-${story.sector}`;
    if (STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key]) {
      console.log('Found country-sector mapping:', key, '→', STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key]);
      return STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key];
    }
    
    // Try alternative country name formats
    const alternativeKeys = [
      `${story.country.replace(/\s+/g, '')}-${story.sector}`,
      `${story.country.toLowerCase()}-${story.sector}`,
      `${story.country.toUpperCase()}-${story.sector}`
    ];
    
    for (const altKey of alternativeKeys) {
      if (STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[altKey]) {
        console.log('Found alternative country-sector mapping:', altKey, '→', STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[altKey]);
        return STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[altKey];
      }
    }
  }
  
  // Handle compound IDs (e.g., "vietnam-textile")
  if (typeof story.id === 'string' && story.id.includes('-')) {
    const parts = story.id.split('-');
    if (parts.length >= 2) {
      const countryPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      const sectorPart = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
      const key = `${countryPart}-${sectorPart}`;
      
      if (STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key]) {
        console.log('Found compound ID mapping:', key, '→', STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key]);
        return STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key];
      }
    }
  }
  
  console.log('No enhanced case study ID found for story:', story);
  return null;
};

export const hasEnhancedCaseStudy = (story: any): boolean => {
  const id = getEnhancedCaseStudyId(story);
  return id !== null;
};

// Get all available enhanced case studies
export const getAllEnhancedCaseStudyIds = (): number[] => {
  return AVAILABLE_ENHANCED_IDS;
};

// Get all country-sector mappings
export const getAllEnhancedCaseStudyMappings = (): Record<string, number> => {
  return STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID;
};
