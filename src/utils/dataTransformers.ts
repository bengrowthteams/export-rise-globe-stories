import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { SuccessStory } from '../types/SuccessStory';
import { countryCoordinates } from '../data/countryCoordinates';
import { countryFlags } from '../data/countryFlags';
import { formatCurrency, calculateGrowthRate, generateSuccessStorySummary } from './formatUtils';

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

export const transformToSectorStory = (row: CountryDataRow & { 'Success Story (1 sentence summary)': string | null }): SectorStory => {
  const sector = row.Sector!;
  const product = row['Successful product'] || 'specialized products';
  const rank1995 = row['Rank (1995)'] || 50;
  const rank2022 = row['Rank (2022)'] || 50;
  const initial = row['Initial Exports - 1995 (USD)'] || 0;
  const current = row['Current Exports - 2022 (USD)'] || 0;
  const growthRate = calculateGrowthRate(initial, current);
  const successStory = row['Success Story (1 sentence summary)'] || `Strategic development in ${sector} through export-oriented growth and specialization in ${product}.`;

  return {
    sector,
    product,
    description: successStory,
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

export const transformCountryData = (data: (CountryDataRow & { 'Success Story (1 sentence summary)': string | null })[]): { 
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
  const countryGroups = new Map<string, (CountryDataRow & { 'Success Story (1 sentence summary)': string | null })[]>();
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
    const coordinates = getCountryCoordinates(country);
    
    if (sectors.length === 1) {
      // Single sector - create legacy story
      const sectorStory = sectors[0];
      const legacyStory: SuccessStory = {
        id: country.toLowerCase().replace(/\s+/g, '-'),
        country,
        sector: sectorStory.sector,
        product: sectorStory.product,
        description: sectorStory.description, // This now contains the success story summary
        growthRate: sectorStory.growthRate,
        timeframe: '1995-2022',
        exportValue: sectorStory.exportValue,
        keyFactors: sectorStory.keyFactors,
        coordinates,
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
        coordinates,
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

const getCountryCoordinates = (country: string): { lat: number; lng: number } => {
  // First try exact match
  if (countryCoordinates[country]) {
    return countryCoordinates[country];
  }
  
  // Try case-insensitive match
  const lowerCountry = country.toLowerCase();
  const matchingKey = Object.keys(countryCoordinates).find(
    key => key.toLowerCase() === lowerCountry
  );
  
  if (matchingKey) {
    console.log(`Found case-insensitive match for ${country}: ${matchingKey}`);
    return countryCoordinates[matchingKey];
  }
  
  // Try partial matches for common variations
  const partialMatch = Object.keys(countryCoordinates).find(key => {
    const keyLower = key.toLowerCase();
    return keyLower.includes(lowerCountry) || lowerCountry.includes(keyLower);
  });
  
  if (partialMatch) {
    console.log(`Found partial match for ${country}: ${partialMatch}`);
    return countryCoordinates[partialMatch];
  }
  
  // Log missing countries for debugging
  console.warn(`Missing coordinates for country: "${country}"`);
  console.warn('Available countries:', Object.keys(countryCoordinates).sort());
  
  // Return a default location (center of Africa for missing countries)
  return { lat: 0, lng: 20 };
};
