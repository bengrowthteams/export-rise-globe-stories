
import { supabase } from '@/integrations/supabase/client';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { transformCountryData } from '../utils/dataTransformers';
import { testDatabaseAccess } from '../utils/databaseUtils';
import staticData from '../data/staticCountryData.json';

interface CountryDataRow {
  'Primary key': number;
  Country: string | null;
  Sector: string | null;
  'Successful product': string | null;
  'Rank (1995)': number | null;
  'Rank (2022)': number | null;
  'Initial Exports - 1995 (USD)': number | null;
  'Current Exports - 2022 (USD)': number | null;
  'Ranks Change (absolute)': number | null;
  'Success Story (1 sentence summary)': string | null;
}

// Cache for the transformed data
let cachedSuccessStories: SuccessStory[] | null = null;
let cachedCountryStories: CountrySuccessStories[] | null = null;

// Cache configuration
const CACHE_VERSION = '1.0.0';
const CACHE_KEY_STORIES = 'country-data-stories-v1';
const CACHE_KEY_COUNTRY_STORIES = 'country-data-country-stories-v1';
const CACHE_KEY_VERSION = 'country-data-version';
const CACHE_KEY_TIMESTAMP = 'country-data-timestamp';
const CACHE_EXPIRY_DAYS = 30;

// Helper functions for localStorage caching
const isCacheValid = (): boolean => {
  try {
    const version = localStorage.getItem(CACHE_KEY_VERSION);
    const timestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP);
    
    if (version !== CACHE_VERSION) {
      return false;
    }
    
    if (timestamp) {
      const cacheDate = new Date(timestamp);
      const now = new Date();
      const daysDiff = (now.getTime() - cacheDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysDiff > CACHE_EXPIRY_DAYS) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error checking cache validity:', error);
    return false;
  }
};

const getCachedData = (): { stories: SuccessStory[] | null; countryStories: CountrySuccessStories[] | null } => {
  try {
    if (!isCacheValid()) {
      return { stories: null, countryStories: null };
    }
    
    const storiesStr = localStorage.getItem(CACHE_KEY_STORIES);
    const countryStoriesStr = localStorage.getItem(CACHE_KEY_COUNTRY_STORIES);
    
    return {
      stories: storiesStr ? JSON.parse(storiesStr) : null,
      countryStories: countryStoriesStr ? JSON.parse(countryStoriesStr) : null,
    };
  } catch (error) {
    console.error('Error reading from cache:', error);
    return { stories: null, countryStories: null };
  }
};

const setCachedData = (stories: SuccessStory[], countryStories: CountrySuccessStories[]) => {
  try {
    localStorage.setItem(CACHE_KEY_STORIES, JSON.stringify(stories));
    localStorage.setItem(CACHE_KEY_COUNTRY_STORIES, JSON.stringify(countryStories));
    localStorage.setItem(CACHE_KEY_VERSION, CACHE_VERSION);
    localStorage.setItem(CACHE_KEY_TIMESTAMP, new Date().toISOString());
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};

const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY_STORIES);
    localStorage.removeItem(CACHE_KEY_COUNTRY_STORIES);
    localStorage.removeItem(CACHE_KEY_VERSION);
    localStorage.removeItem(CACHE_KEY_TIMESTAMP);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
  // Return in-memory cache if available
  if (cachedSuccessStories) {
    console.log('Returning in-memory cached success stories:', cachedSuccessStories.length);
    return cachedSuccessStories;
  }
  
  // Try localStorage cache
  const { stories, countryStories } = getCachedData();
  if (stories && countryStories) {
    console.log('Returning localStorage cached success stories:', stories.length);
    cachedSuccessStories = stories;
    cachedCountryStories = countryStories;
    return stories;
  }
  
  // Try static data
  if (staticData.rawData && staticData.rawData.length > 0) {
    console.log('Loading from static data:', staticData.rawData.length);
    const { legacyStories, countryStories: transformedCountryStories } = transformCountryData(staticData.rawData);
    cachedSuccessStories = legacyStories;
    cachedCountryStories = transformedCountryStories;
    setCachedData(legacyStories, transformedCountryStories);
    return legacyStories;
  }

  try {
    console.log('=== FETCHING SUCCESS STORIES ===');
    
    // Run database access tests first
    await testDatabaseAccess();
    
    console.log('Attempting main data fetch...');
    
    // Main query with Primary key included
    const { data, error, count, status, statusText } = await supabase
      .from('Country Data')
      .select('"Primary key", Country, Sector, "Successful product", "Rank (1995)", "Rank (2022)", "Initial Exports - 1995 (USD)", "Current Exports - 2022 (USD)", "Ranks Change (absolute)", "Success Story (1 sentence summary)"', { count: 'exact' })
      .order('Country');

    console.log('=== MAIN QUERY RESULTS ===');
    console.log('Status:', status);
    console.log('Status Text:', statusText);
    console.log('Error:', error);
    console.log('Data length:', data?.length || 0);
    console.log('Count:', count);
    console.log('Raw data preview:', data?.slice(0, 2));

    if (error) {
      console.error('=== SUPABASE ERROR DETAILS ===');
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
      console.error('Code:', error.code);
      throw new Error(`Supabase query failed: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.warn('=== NO DATA RETURNED ===');
      console.warn('This could be due to:');
      console.warn('1. Empty table');
      console.warn('2. Row Level Security blocking access');
      console.warn('3. Incorrect table name or permissions');
      console.warn('4. Database connectivity issues');
      
      return [];
    }

    const { legacyStories, countryStories } = transformCountryData(data);
    cachedSuccessStories = legacyStories;
    cachedCountryStories = countryStories;
    
    console.log(`=== SUCCESS ===`);
    console.log(`Successfully loaded ${legacyStories.length} single-sector and ${countryStories.length} multi-sector countries from Supabase`);
    return legacyStories;
    
  } catch (error) {
    console.error('=== FETCH FAILED ===');
    console.error('Error type:', typeof error);
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error object:', error);
    
    // Return empty array on error - components should handle this gracefully
    return [];
  }
};

export const fetchCountryStories = async (): Promise<CountrySuccessStories[]> => {
  // Trigger fetch if not cached
  if (!cachedCountryStories) {
    await fetchSuccessStories();
  }
  
  return cachedCountryStories || [];
};

// Clear cache function for future use
export const clearSuccessStoriesCache = () => {
  console.log('Clearing all success stories cache');
  cachedSuccessStories = null;
  cachedCountryStories = null;
  clearCache();
};

// Force refresh from Supabase
export const forceRefreshFromSupabase = async (): Promise<SuccessStory[]> => {
  clearSuccessStoriesCache();
  cachedSuccessStories = null;
  cachedCountryStories = null;
  
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .order('Country');

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const { legacyStories, countryStories } = transformCountryData(data);
    cachedSuccessStories = legacyStories;
    cachedCountryStories = countryStories;
    setCachedData(legacyStories, countryStories);
    
    return legacyStories;
  } catch (error) {
    console.error('Force refresh failed:', error);
    return [];
  }
};
