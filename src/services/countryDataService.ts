
import { supabase } from '@/integrations/supabase/client';
import { SuccessStory } from '../types/SuccessStory';
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
  'Global Share 1995 - %': number | null;
  'Global Share 2022 - %': number | null;
  'Ranks Change (absolute)': number | null;
}

// Cache for the transformed data
let cachedSuccessStories: SuccessStory[] | null = null;

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

const transformCountryData = (data: CountryDataRow[]): SuccessStory[] => {
  return data
    .filter(row => row.Country && row.Sector) // Only include rows with required data
    .map(row => {
      const country = row.Country!;
      const sector = row.Sector!;
      const product = row['Successful product'] || 'specialized products';
      const rank1995 = row['Rank (1995)'] || 50;
      const rank2022 = row['Rank (2022)'] || 50;
      const initial = row['Initial Exports - 1995 (USD)'] || 0;
      const current = row['Current Exports - 2022 (USD)'] || 0;
      const growthRate = calculateGrowthRate(initial, current);

      return {
        id: country.toLowerCase().replace(/\s+/g, '-'),
        country,
        sector,
        product,
        description: `${country} transformed its ${sector} sector through strategic development and export orientation, leveraging ${product} to achieve significant growth in global markets.`,
        growthRate,
        timeframe: '1995-2022',
        exportValue: formatCurrency(current),
        keyFactors: [
          'Strategic sector development',
          'Export market expansion', 
          'Product specialization',
          'Global value chain integration'
        ],
        coordinates: countryCoordinates[country] || { lat: 0, lng: 0 },
        flag: countryFlags[country] || '🌍',
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
        successStorySummary: generateSuccessStorySummary(country, sector, product, growthRate)
      };
    });
};

export const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
  // Return cached data if available
  if (cachedSuccessStories) {
    return cachedSuccessStories;
  }

  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .order('Country');

    if (error) {
      console.error('Error fetching country data:', error);
      throw error;
    }

    if (!data) {
      return [];
    }

    const transformedData = transformCountryData(data);
    cachedSuccessStories = transformedData;
    
    console.log(`Loaded ${transformedData.length} countries from Supabase`);
    return transformedData;
  } catch (error) {
    console.error('Failed to fetch success stories:', error);
    // Return empty array on error - components should handle this gracefully
    return [];
  }
};

// Clear cache function for future use
export const clearSuccessStoriesCache = () => {
  cachedSuccessStories = null;
};
