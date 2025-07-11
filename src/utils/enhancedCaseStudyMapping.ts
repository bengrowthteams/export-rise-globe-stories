
// Enhanced mapping system for case studies with expanded coverage
const STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID: Record<string, number> = {
  // Original mappings (1-10)
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
  'Ethiopia-Textile': 10,
  
  // Additional mappings (11-28)
  'China-Textile': 11,
  'Sri Lanka-Textile': 12,
  'Philippines-Textile': 13,
  'Thailand-Textile': 14,
  'Malaysia-Textile': 15,
  'Jordan-Textile': 16,
  'Morocco-Textile': 17,
  'Tunisia-Textile': 18,
  'Egypt-Textile': 19,
  'Kenya-Textile': 20,
  'Madagascar-Textile': 21,
  'Mauritius-Textile': 22,
  'Guatemala-Textile': 23,
  'Honduras-Textile': 24,
  'El Salvador-Textile': 25,
  'Nicaragua-Textile': 26,
  'Dominican Republic-Textile': 27,
  'Haiti-Textile': 28,
  
  // Additional mappings (47-63)
  'Vietnam-Electronics': 47,
  'China-Electronics': 48,
  'South Korea-Electronics': 49,
  'Taiwan-Electronics': 50,
  'Singapore-Electronics': 51,
  'Malaysia-Electronics': 52,
  'Thailand-Electronics': 53,
  'Philippines-Electronics': 54,
  'Indonesia-Electronics': 55,
  'India-Electronics': 56,
  'Bangladesh-Electronics': 57,
  'Sri Lanka-Electronics': 58,
  'Pakistan-Electronics': 59,
  'Turkey-Electronics': 60,
  'Morocco-Electronics': 61,
  'Tunisia-Electronics': 62,
  'Egypt-Electronics': 63,
  
  // Additional mappings (65-76)
  'Vietnam-Automotive': 65,
  'China-Automotive': 66,
  'India-Automotive': 67,
  'Thailand-Automotive': 68,
  'Indonesia-Automotive': 69,
  'Malaysia-Automotive': 70,
  'Turkey-Automotive': 71,
  'Morocco-Automotive': 72,
  'South Africa-Automotive': 73,
  'Mexico-Automotive': 74,
  'Brazil-Automotive': 75,
  'Argentina-Automotive': 76,
  
  // Additional mappings (78-82)
  'Vietnam-Agriculture': 78,
  'Thailand-Agriculture': 79,
  'India-Agriculture': 80,
  'Brazil-Agriculture': 81,
  'Argentina-Agriculture': 82
};

// All available enhanced case study IDs
const AVAILABLE_ENHANCED_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28,
  47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  57, 58, 59, 60, 61, 62, 63,
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
  78, 79, 80, 81, 82
];

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
