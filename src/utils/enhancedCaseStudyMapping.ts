
import { getAllAvailableEnhancedCaseStudies } from '../services/caseStudyService';

// Cache for dynamic mappings
let dynamicMappings: Record<string, number> | null = null;

// Static fallback mappings for backwards compatibility
const STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID: Record<string, number> = {
  'Vietnam-Textile': 1,
  'Bangladesh-Textile': 2, 
  'Cambodia-Textile': 3,
  'UAE-Textile': 4,
  'United Arab Emirates-Textile': 4, // Handle database name variation
  'Myanmar-Textile': 5
};

// Function to get dynamic mappings
const getDynamicMappings = async (): Promise<Record<string, number>> => {
  if (dynamicMappings === null) {
    dynamicMappings = await getAllAvailableEnhancedCaseStudies();
  }
  return dynamicMappings;
};

export const getEnhancedCaseStudyId = async (story: any): Promise<number | null> => {
  console.log('Getting enhanced case study ID for story:', story);
  
  // Get dynamic mappings
  const mappings = await getDynamicMappings();
  
  // Handle numeric IDs directly (if they exist in our mappings)
  if (typeof story.id === 'number') {
    const allIds = Object.values(mappings);
    if (allIds.includes(story.id)) {
      console.log('Found numeric ID:', story.id);
      return story.id;
    }
  }
  
  // Handle string numeric IDs
  if (typeof story.id === 'string') {
    const numericId = parseInt(story.id);
    if (!isNaN(numericId)) {
      const allIds = Object.values(mappings);
      if (allIds.includes(numericId)) {
        console.log('Found string numeric ID:', numericId);
        return numericId;
      }
    }
  }
  
  // Primary method: Match by country + sector combination
  if (story.country && story.sector) {
    const key = `${story.country}-${story.sector}`;
    if (mappings[key]) {
      console.log('Found country-sector mapping:', key, '→', mappings[key]);
      return mappings[key];
    }
    
    // Try alternative country name formats
    const alternativeKeys = [
      `${story.country.replace(/\s+/g, '')}-${story.sector}`, // Remove spaces
      `${story.country.toLowerCase()}-${story.sector}`, // Lowercase
      `${story.country.toUpperCase()}-${story.sector}` // Uppercase
    ];
    
    for (const altKey of alternativeKeys) {
      if (mappings[altKey]) {
        console.log('Found alternative country-sector mapping:', altKey, '→', mappings[altKey]);
        return mappings[altKey];
      }
    }
    
    // Fallback to static mappings
    if (STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key]) {
      console.log('Found static mapping:', key, '→', STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key]);
      return STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID[key];
    }
  }
  
  // Handle compound IDs (e.g., "vietnam-textile") - but only if sector matches
  if (typeof story.id === 'string' && story.id.includes('-')) {
    const parts = story.id.split('-');
    if (parts.length >= 2) {
      const countryPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      const sectorPart = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
      const key = `${countryPart}-${sectorPart}`;
      
      if (mappings[key]) {
        console.log('Found compound ID mapping:', key, '→', mappings[key]);
        return mappings[key];
      }
    }
  }
  
  console.log('No enhanced case study ID found for story:', story);
  return null;
};

export const hasEnhancedCaseStudy = async (story: any): Promise<boolean> => {
  const id = await getEnhancedCaseStudyId(story);
  return id !== null;
};

// Synchronous versions for backwards compatibility (will use cached data)
export const getEnhancedCaseStudyIdSync = (story: any): number | null => {
  console.log('Getting enhanced case study ID (sync) for story:', story);
  
  // Use cached mappings if available, otherwise fall back to static
  const mappings = dynamicMappings || STATIC_COUNTRY_SECTOR_TO_ENHANCED_ID;
  
  // Handle numeric IDs directly
  if (typeof story.id === 'number') {
    const allIds = Object.values(mappings);
    if (allIds.includes(story.id)) {
      console.log('Found numeric ID (sync):', story.id);
      return story.id;
    }
  }
  
  // Primary method: Match by country + sector combination
  if (story.country && story.sector) {
    const key = `${story.country}-${story.sector}`;
    if (mappings[key]) {
      console.log('Found country-sector mapping (sync):', key, '→', mappings[key]);
      return mappings[key];
    }
  }
  
  return null;
};

export const hasEnhancedCaseStudySync = (story: any): boolean => {
  return getEnhancedCaseStudyIdSync(story) !== null;
};

// Initialize mappings on module load
getDynamicMappings();
