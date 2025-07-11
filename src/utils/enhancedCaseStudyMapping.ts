
import { supabase } from '@/integrations/supabase/client';

// Cache for database mappings to avoid repeated queries
let cachedMappings: Record<string, number> | null = null;
let cachedAvailableIds: number[] | null = null;

// Static fallback mappings (only verified ones)
const VERIFIED_STATIC_MAPPINGS: Record<string, number> = {
  'Vietnam-Textile': 1,
  'Bangladesh-Textile': 2,
  'Cambodia-Textile': 3,
  'Myanmar-Textile': 5,
  'India-Textile': 6,
  'Turkey-Textile': 7,
  'Pakistan-Textile': 8,
  'Indonesia-Textile': 9,
  'Ethiopia-Textile': 10
};

// Sector name variations to handle different naming conventions
const SECTOR_VARIATIONS: Record<string, string[]> = {
  'Textile': ['Textiles', 'Textiles & Apparel', 'Garments', 'Apparel'],
  'Electronics': ['Electronic', 'Electronics & Electrical'],
  'Automotive': ['Automobile', 'Auto', 'Motor Vehicle'],
  'Agriculture': ['Agricultural', 'Agro', 'Farm Products']
};

// Function to normalize sector names
const normalizeSectorName = (sector: string): string[] => {
  const cleaned = sector.trim();
  const variations = [cleaned];
  
  // Check if this sector has known variations
  for (const [mainSector, variants] of Object.entries(SECTOR_VARIATIONS)) {
    if (variants.some(variant => cleaned.toLowerCase().includes(variant.toLowerCase()))) {
      variations.push(mainSector);
      variations.push(...variants);
    }
    if (cleaned.toLowerCase().includes(mainSector.toLowerCase())) {
      variations.push(mainSector);
      variations.push(...variants);
    }
  }
  
  return [...new Set(variations)]; // Remove duplicates
};

// Function to fetch mappings from database
export const fetchDatabaseMappings = async (): Promise<Record<string, number>> => {
  try {
    console.log('Fetching database mappings...');
    
    const { data, error } = await supabase
      .from('Country Data')
      .select('Primary key, Country, Sector')
      .not('Country', 'is', null)
      .not('Sector', 'is', null);

    if (error) {
      console.error('Error fetching database mappings:', error);
      return VERIFIED_STATIC_MAPPINGS;
    }

    if (!data || data.length === 0) {
      console.log('No data found in database, using static mappings');
      return VERIFIED_STATIC_MAPPINGS;
    }

    const mappings: Record<string, number> = {};
    
    data.forEach(row => {
      if (row.Country && row.Sector && row['Primary key']) {
        const country = row.Country.trim();
        const sector = row.Sector.trim();
        const primaryKey = row['Primary key'];
        
        // Create primary mapping
        const primaryKey_mapping = `${country}-${sector}`;
        mappings[primaryKey_mapping] = primaryKey;
        
        // Create variations for sector names
        const sectorVariations = normalizeSectorName(sector);
        sectorVariations.forEach(sectorVariant => {
          const variantKey = `${country}-${sectorVariant}`;
          if (variantKey !== primaryKey_mapping) {
            mappings[variantKey] = primaryKey;
          }
        });
        
        console.log(`Mapped: ${primaryKey_mapping} -> ${primaryKey}`);
      }
    });

    console.log('Database mappings created:', mappings);
    return mappings;

  } catch (error) {
    console.error('Failed to fetch database mappings:', error);
    return VERIFIED_STATIC_MAPPINGS;
  }
};

// Function to get all available enhanced case study IDs
export const fetchAvailableIds = async (): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('Primary key')
      .not('Primary key', 'is', null);

    if (error) {
      console.error('Error fetching available IDs:', error);
      return Object.values(VERIFIED_STATIC_MAPPINGS);
    }

    const ids = data?.map(row => row['Primary key']).filter(id => id != null) || [];
    console.log('Available enhanced case study IDs:', ids);
    return ids.sort((a, b) => a - b);

  } catch (error) {
    console.error('Failed to fetch available IDs:', error);
    return Object.values(VERIFIED_STATIC_MAPPINGS);
  }
};

// Main function to get enhanced case study ID
export const getEnhancedCaseStudyId = async (story: any): Promise<number | null> => {
  console.log('Getting enhanced case study ID for story:', story);
  
  // Handle numeric IDs directly
  if (typeof story.id === 'number') {
    if (!cachedAvailableIds) {
      cachedAvailableIds = await fetchAvailableIds();
    }
    if (cachedAvailableIds.includes(story.id)) {
      console.log('Found numeric ID:', story.id);
      return story.id;
    }
  }
  
  // Handle string numeric IDs
  if (typeof story.id === 'string') {
    const numericId = parseInt(story.id);
    if (!isNaN(numericId)) {
      if (!cachedAvailableIds) {
        cachedAvailableIds = await fetchAvailableIds();
      }
      if (cachedAvailableIds.includes(numericId)) {
        console.log('Found string numeric ID:', numericId);
        return numericId;
      }
    }
  }
  
  // Get database mappings if not cached
  if (!cachedMappings) {
    cachedMappings = await fetchDatabaseMappings();
  }
  
  // Primary method: Match by country + sector combination
  if (story.country && story.sector) {
    const primaryKey = `${story.country}-${story.sector}`;
    if (cachedMappings[primaryKey]) {
      console.log('Found country-sector mapping:', primaryKey, '→', cachedMappings[primaryKey]);
      return cachedMappings[primaryKey];
    }
    
    // Try sector variations
    const sectorVariations = normalizeSectorName(story.sector);
    for (const sectorVariant of sectorVariations) {
      const variantKey = `${story.country}-${sectorVariant}`;
      if (cachedMappings[variantKey]) {
        console.log('Found sector variant mapping:', variantKey, '→', cachedMappings[variantKey]);
        return cachedMappings[variantKey];
      }
    }
    
    // Try alternative country name formats
    const alternativeKeys = [
      `${story.country.replace(/\s+/g, '')}-${story.sector}`,
      `${story.country.toLowerCase()}-${story.sector}`,
      `${story.country.toUpperCase()}-${story.sector}`
    ];
    
    for (const altKey of alternativeKeys) {
      if (cachedMappings[altKey]) {
        console.log('Found alternative country-sector mapping:', altKey, '→', cachedMappings[altKey]);
        return cachedMappings[altKey];
      }
    }
  }
  
  // Handle compound IDs (e.g., "vietnam-textile")
  if (typeof story.id === 'string' && story.id.includes('-')) {
    const parts = story.id.split('-');
    if (parts.length >= 2) {
      const countryPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      const sectorPart = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
      const compoundKey = `${countryPart}-${sectorPart}`;
      
      if (cachedMappings[compoundKey]) {
        console.log('Found compound ID mapping:', compoundKey, '→', cachedMappings[compoundKey]);
        return cachedMappings[compoundKey];
      }
    }
  }
  
  console.log('No enhanced case study ID found for story:', story);
  return null;
};

// Async version of hasEnhancedCaseStudy
export const hasEnhancedCaseStudy = async (story: any): Promise<boolean> => {
  const id = await getEnhancedCaseStudyId(story);
  return id !== null;
};

// Synchronous version using cached data (for backwards compatibility)
export const hasEnhancedCaseStudySync = (story: any): boolean => {
  // Handle numeric IDs
  if (typeof story.id === 'number' && cachedAvailableIds) {
    return cachedAvailableIds.includes(story.id);
  }
  
  if (typeof story.id === 'string') {
    const numericId = parseInt(story.id);
    if (!isNaN(numericId) && cachedAvailableIds) {
      return cachedAvailableIds.includes(numericId);
    }
  }
  
  // Check cached mappings
  if (!cachedMappings) {
    // Use static mappings as fallback
    if (story.country && story.sector) {
      const key = `${story.country}-${story.sector}`;
      return VERIFIED_STATIC_MAPPINGS[key] !== undefined;
    }
    return false;
  }
  
  if (story.country && story.sector) {
    const primaryKey = `${story.country}-${story.sector}`;
    return cachedMappings[primaryKey] !== undefined;
  }
  
  return false;
};

// Get enhanced case study ID synchronously using cached data
export const getEnhancedCaseStudyIdSync = (story: any): number | null => {
  // Handle numeric IDs
  if (typeof story.id === 'number' && cachedAvailableIds) {
    return cachedAvailableIds.includes(story.id) ? story.id : null;
  }
  
  if (typeof story.id === 'string') {
    const numericId = parseInt(story.id);
    if (!isNaN(numericId) && cachedAvailableIds) {
      return cachedAvailableIds.includes(numericId) ? numericId : null;
    }
  }
  
  // Check cached mappings
  if (!cachedMappings && story.country && story.sector) {
    const key = `${story.country}-${story.sector}`;
    return VERIFIED_STATIC_MAPPINGS[key] || null;
  }
  
  if (cachedMappings && story.country && story.sector) {
    const primaryKey = `${story.country}-${story.sector}`;
    return cachedMappings[primaryKey] || null;
  }
  
  return null;
};

// Get all available enhanced case studies
export const getAllEnhancedCaseStudyIds = async (): Promise<number[]> => {
  if (!cachedAvailableIds) {
    cachedAvailableIds = await fetchAvailableIds();
  }
  return cachedAvailableIds;
};

// Get all country-sector mappings
export const getAllEnhancedCaseStudyMappings = async (): Promise<Record<string, number>> => {
  if (!cachedMappings) {
    cachedMappings = await fetchDatabaseMappings();
  }
  return cachedMappings;
};

// Initialize mappings on module load
export const initializeMappings = async (): Promise<void> => {
  console.log('Initializing enhanced case study mappings...');
  cachedMappings = await fetchDatabaseMappings();
  cachedAvailableIds = await fetchAvailableIds();
  console.log('Mappings initialized successfully');
};
