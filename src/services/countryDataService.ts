
import { supabase } from '@/integrations/supabase/client';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { transformCountryData } from '../utils/dataTransformers';
import { testDatabaseAccess } from '../utils/databaseUtils';

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

export const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
  // Clear cache for fresh data
  cachedSuccessStories = null;
  cachedCountryStories = null;
  
  // Return cached data if available
  if (cachedSuccessStories) {
    console.log('Returning cached success stories:', cachedSuccessStories.length);
    return cachedSuccessStories;
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
  console.log('Clearing success stories cache');
  cachedSuccessStories = null;
  cachedCountryStories = null;
};
