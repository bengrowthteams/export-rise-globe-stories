
// Mapping between country+sector combinations and their enhanced case study IDs
const COUNTRY_SECTOR_TO_ENHANCED_ID: Record<string, number> = {
  'Vietnam-Textile': 1,
  'Bangladesh-Textile': 2, 
  'Cambodia-Textile': 3,
  'UAE-Textile': 4,
  'Myanmar-Textile': 5
};

// Available enhanced case study IDs
const AVAILABLE_ENHANCED_IDS = [1, 2, 3, 4, 5];

export const getEnhancedCaseStudyId = (story: any): number | null => {
  console.log('Getting enhanced case study ID for story:', story);
  
  // Handle numeric IDs directly (if they match available enhanced IDs)
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
    if (COUNTRY_SECTOR_TO_ENHANCED_ID[key]) {
      console.log('Found country-sector mapping:', key, '→', COUNTRY_SECTOR_TO_ENHANCED_ID[key]);
      return COUNTRY_SECTOR_TO_ENHANCED_ID[key];
    }
  }
  
  // Handle compound IDs (e.g., "vietnam-textile") - but only if sector matches
  if (typeof story.id === 'string' && story.id.includes('-')) {
    const parts = story.id.split('-');
    if (parts.length >= 2) {
      const countryPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      const sectorPart = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
      const key = `${countryPart}-${sectorPart}`;
      
      if (COUNTRY_SECTOR_TO_ENHANCED_ID[key]) {
        console.log('Found compound ID mapping:', key, '→', COUNTRY_SECTOR_TO_ENHANCED_ID[key]);
        return COUNTRY_SECTOR_TO_ENHANCED_ID[key];
      }
    }
  }
  
  console.log('No enhanced case study ID found for story:', story);
  return null;
};

export const hasEnhancedCaseStudy = (story: any): boolean => {
  return getEnhancedCaseStudyId(story) !== null;
};
