
// Mapping between country names and their enhanced case study IDs
const COUNTRY_TO_ENHANCED_ID: Record<string, number> = {
  'Vietnam': 1,
  'Bangladesh': 2,
  'Cambodia': 3,
  'UAE': 4,
  'Myanmar': 5
};

// Available enhanced case study IDs
const AVAILABLE_ENHANCED_IDS = [1, 2, 3, 4, 5];

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
  
  // Handle compound IDs (e.g., "vietnam-textile")
  if (typeof story.id === 'string' && story.id.includes('-')) {
    const countryPart = story.id.split('-')[0];
    const countryName = countryPart.charAt(0).toUpperCase() + countryPart.slice(1).toLowerCase();
    
    if (COUNTRY_TO_ENHANCED_ID[countryName]) {
      console.log('Found compound ID mapping:', countryName, '→', COUNTRY_TO_ENHANCED_ID[countryName]);
      return COUNTRY_TO_ENHANCED_ID[countryName];
    }
  }
  
  // Handle country name matching
  if (story.country && COUNTRY_TO_ENHANCED_ID[story.country]) {
    console.log('Found country name mapping:', story.country, '→', COUNTRY_TO_ENHANCED_ID[story.country]);
    return COUNTRY_TO_ENHANCED_ID[story.country];
  }
  
  console.log('No enhanced case study ID found for story:', story);
  return null;
};

export const hasEnhancedCaseStudy = (story: any): boolean => {
  return getEnhancedCaseStudyId(story) !== null;
};
