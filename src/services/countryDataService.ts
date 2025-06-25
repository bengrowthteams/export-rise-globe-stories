import { supabase } from '@/integrations/supabase/client';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { countryCoordinates } from '../data/countryCoordinates';
import { countryFlags } from '../data/countryFlags';

interface CountryDataRow {
  Country: string | null;
  Sector: string | null;
  'Successful product': string | null;
  'Rank (1995)': number | null;
  'Rank (2022)': number | null;
  'Initial Exports - 1995 (USD)': number | null;
  'Current Exports - 2022 (USD)': number | null;
  'Ranks Change (absolute)': number | null;
}

// Cache for the transformed data
let cachedSuccessStories: SuccessStory[] | null = null;
let cachedCountryStories: CountrySuccessStories[] | null = null;

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toLocaleString()}`;
};

const calculateGrowthRate = (initial: number, current: number): number => {
  if (initial <= 0) return 0;
  return Math.round(((current - initial) / initial) * 100);
};

const generateSuccessStorySummary = (country: string, sector: string, product: string, growthRate: number): string => {
  const templates = [
    `${country} achieved remarkable transformation in ${sector} through strategic development of ${product}, driving ${growthRate > 0 ? 'significant export growth' : 'structural economic changes'} and creating new opportunities in global markets.`,
    `Through focused investment in ${sector}, ${country} successfully developed ${product} exports, demonstrating how targeted industrial policy can drive economic transformation and global competitiveness.`,
    `${country}'s success in ${sector} showcases the power of specialization in ${product}, creating a compelling example of export-led growth and economic diversification.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

const transformToSectorStory = (row: CountryDataRow): SectorStory => {
  const sector = row.Sector!;
  const product = row['Successful product'] || 'specialized products';
  const rank1995 = row['Rank (1995)'] || 50;
  const rank2022 = row['Rank (2022)'] || 50;
  const initial = row['Initial Exports - 1995 (USD)'] || 0;
  const current = row['Current Exports - 2022 (USD)'] || 0;
  const growthRate = calculateGrowthRate(initial, current);

  return {
    sector,
    product,
    description: `Strategic development in ${sector} through export-oriented growth and specialization in ${product}.`,
    growthRate,
    exportValue: formatCurrency(current),
    keyFactors: [
      'Strategic sector development',
      'Export market expansion', 
      'Product specialization',
      'Global value chain integration'
    ],
    marketDestinations: ['Global Markets', 'Regional Partners', 'Emerging Economies'],
    challenges: ['Market competition', 'Economic volatility', 'Trade policy changes'],
    impact: {
      jobs: 'Significant employment creation',
      economicContribution: `${((current / 1000000000) * 0.1).toFixed(1)}% of export economy`
    },
    globalRanking1995: rank1995,
    globalRanking2022: rank2022,
    initialExports1995: formatCurrency(initial),
    initialExports2022: formatCurrency(current),
    successfulProduct: product.toLowerCase(),
    successStorySummary: generateSuccessStorySummary(row.Country!, sector, product, growthRate)
  };
};

const transformCountryData = (data: CountryDataRow[]): { 
  legacyStories: SuccessStory[], 
  countryStories: CountrySuccessStories[] 
} => {
  console.log('Transforming country data, received rows:', data.length);
  
  const filteredData = data.filter(row => {
    const hasRequiredData = row.Country && row.Sector;
    if (!hasRequiredData) {
      console.log('Filtering out row with missing required data:', row);
    }
    return hasRequiredData;
  });

  // Group by country
  const countryGroups = new Map<string, CountryDataRow[]>();
  filteredData.forEach(row => {
    const country = row.Country!;
    if (!countryGroups.has(country)) {
      countryGroups.set(country, []);
    }
    countryGroups.get(country)!.push(row);
  });

  const legacyStories: SuccessStory[] = [];
  const countryStories: CountrySuccessStories[] = [];

  countryGroups.forEach((rows, country) => {
    const sectors = rows.map(transformToSectorStory);
    const firstRow = rows[0];
    
    if (sectors.length === 1) {
      // Single sector - create legacy story
      const sectorStory = sectors[0];
      const legacyStory: SuccessStory = {
        id: country.toLowerCase().replace(/\s+/g, '-'),
        country,
        sector: sectorStory.sector,
        product: sectorStory.product,
        description: sectorStory.description,
        growthRate: sectorStory.growthRate,
        timeframe: '1995-2022',
        exportValue: sectorStory.exportValue,
        keyFactors: sectorStory.keyFactors,
        coordinates: countryCoordinates[country] || { lat: 0, lng: 0 },
        flag: countryFlags[country] || '🌍',
        marketDestinations: sectorStory.marketDestinations,
        challenges: sectorStory.challenges,
        impact: sectorStory.impact,
        globalRanking1995: sectorStory.globalRanking1995,
        globalRanking2022: sectorStory.globalRanking2022,
        initialExports1995: sectorStory.initialExports1995,
        initialExports2022: sectorStory.initialExports2022,
        successfulProduct: sectorStory.successfulProduct,
        successStorySummary: sectorStory.successStorySummary
      };
      legacyStories.push(legacyStory);
    } else {
      // Multiple sectors - create country story
      const primarySector = sectors.reduce((prev, current) => 
        (current.globalRanking2022 < prev.globalRanking2022) ? current : prev
      );

      const countryStory: CountrySuccessStories = {
        id: country.toLowerCase().replace(/\s+/g, '-'),
        country,
        flag: countryFlags[country] || '🌍',
        coordinates: countryCoordinates[country] || { lat: 0, lng: 0 },
        timeframe: '1995-2022',
        sectors: sectors.sort((a, b) => a.globalRanking2022 - b.globalRanking2022), // Sort by best ranking
        hasMutipleSectors: true,
        primarySector
      };
      countryStories.push(countryStory);
    }
  });

  return { legacyStories, countryStories };
};

// Test database connectivity and permissions
const testDatabaseAccess = async (): Promise<void> => {
  try {
    console.log('=== TESTING DATABASE ACCESS ===');
    
    // Test 1: Check if we can connect to Supabase at all
    const { data: testData, error: testError } = await supabase
      .from('Country Data')
      .select('Country', { count: 'exact', head: true });
    
    console.log('Basic connection test:', { 
      success: !testError, 
      error: testError?.message,
      count: testData?.length || 0
    });

    // Test 2: Try different query approaches
    const queries = [
      { name: 'Basic select *', query: supabase.from('Country Data').select('*').limit(1) },
      { name: 'Select Country only', query: supabase.from('Country Data').select('Country').limit(1) },
      { name: 'Count query', query: supabase.from('Country Data').select('*', { count: 'exact', head: true }) }
    ];

    for (const { name, query } of queries) {
      const { data, error, count } = await query;
      console.log(`${name}:`, { 
        success: !error, 
        error: error?.message, 
        dataLength: data?.length || 0,
        count 
      });
    }

  } catch (error) {
    console.error('Database access test failed:', error);
  }
};

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
    
    // Main query with extensive logging
    const { data, error, count, status, statusText } = await supabase
      .from('Country Data')
      .select('*', { count: 'exact' })
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
