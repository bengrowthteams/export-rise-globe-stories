
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { getCountryCoordinates } from '../data/countryCoordinates';
import { getCountryFlag } from '../data/countryFlags';

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

// Helper function to format currency for display
const formatCurrencyForDisplay = (amount: number): string => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toLocaleString()}`;
};

// Helper function to safely convert numeric export values to string format
const convertExportValueToString = (value: number | null): string => {
  if (value === null || value === undefined) return '$0';
  return `$${value.toLocaleString()}`;
};

export const transformCountryData = (data: CountryDataRow[]) => {
  console.log('=== TRANSFORMING COUNTRY DATA ===');
  console.log('Input data sample:', data.slice(0, 2));

  // Group by country
  const countryGroups = new Map<string, CountryDataRow[]>();
  
  data.forEach(row => {
    if (!row.Country) return;
    
    if (!countryGroups.has(row.Country)) {
      countryGroups.set(row.Country, []);
    }
    countryGroups.get(row.Country)!.push(row);
  });

  const legacyStories: SuccessStory[] = [];
  const countryStories: CountrySuccessStories[] = [];

  countryGroups.forEach((rows, country) => {
    const coordinates = getCountryCoordinates(country);
    const flag = getCountryFlag(country);

    if (rows.length === 1) {
      // Single sector country - create legacy story
      const row = rows[0];
      
      console.log(`Processing single-sector country: ${country}`, {
        sector: row.Sector,
        initialExports1995: row['Initial Exports - 1995 (USD)'],
        currentExports2022: row['Current Exports - 2022 (USD)'],
        primaryKey: row['Primary key']
      });

      const legacyStory: SuccessStory = {
        id: `legacy-${row['Primary key']}`,
        primaryKey: row['Primary key'],
        country: country,
        sector: row.Sector || 'Unknown',
        product: row['Successful product'] || 'Unknown',
        description: row['Success Story (1 sentence summary)'] || 'No description available',
        growthRate: Math.abs(row['Ranks Change (absolute)'] || 0),
        timeframe: '1995-2022',
        exportValue: formatCurrencyForDisplay(row['Current Exports - 2022 (USD)'] || 0),
        keyFactors: ['Data not available in legacy format'],
        coordinates,
        flag,
        marketDestinations: ['Data not available'],
        challenges: ['Data not available'],
        impact: {
          jobs: 'Data not available',
          economicContribution: 'Data not available'
        },
        globalRanking1995: row['Rank (1995)'] || 0,
        globalRanking2022: row['Rank (2022)'] || 0,
        // Store the raw numeric values consistently as strings for parsing
        initialExports1995: `${row['Initial Exports - 1995 (USD)'] || 0}`,
        initialExports2022: `${row['Current Exports - 2022 (USD)'] || 0}`,
        successfulProduct: row['Successful product'] || 'Unknown',
        successStorySummary: row['Success Story (1 sentence summary)'] || 'No summary available'
      };

      legacyStories.push(legacyStory);
    } else {
      // Multi-sector country - create country stories
      console.log(`Processing multi-sector country: ${country} with ${rows.length} sectors`);
      
      const sectors: SectorStory[] = rows.map(row => {
        console.log(`Processing sector: ${row.Sector}`, {
          initialExports1995: row['Initial Exports - 1995 (USD)'],
          currentExports2022: row['Current Exports - 2022 (USD)'],
          primaryKey: row['Primary key']
        });

        return {
          primaryKey: row['Primary key'],
          sector: row.Sector || 'Unknown',
          product: row['Successful product'] || 'Unknown',
          description: row['Success Story (1 sentence summary)'] || 'No description available',
          growthRate: Math.abs(row['Ranks Change (absolute)'] || 0),
          exportValue: formatCurrencyForDisplay(row['Current Exports - 2022 (USD)'] || 0),
          keyFactors: ['Data not available in this format'],
          marketDestinations: ['Data not available'],
          challenges: ['Data not available'],
          impact: {
            jobs: 'Data not available',
            economicContribution: 'Data not available'
          },
          globalRanking1995: row['Rank (1995)'] || 0,
          globalRanking2022: row['Rank (2022)'] || 0,
          // Store the raw numeric values consistently as strings for parsing
          initialExports1995: `${row['Initial Exports - 1995 (USD)'] || 0}`,
          initialExports2022: `${row['Current Exports - 2022 (USD)'] || 0}`,
          successfulProduct: row['Successful product'] || 'Unknown',
          successStorySummary: row['Success Story (1 sentence summary)'] || 'No summary available'
        };
      });

      // Find the primary sector (highest export value in 2022)
      const primarySector = sectors.reduce((max, current) => {
        const maxValue = parseFloat(`${max.initialExports2022}`.replace(/[^\d.]/g, '')) || 0;
        const currentValue = parseFloat(`${current.initialExports2022}`.replace(/[^\d.]/g, '')) || 0;
        return currentValue > maxValue ? current : max;
      }, sectors[0]);

      const countryStory: CountrySuccessStories = {
        id: `country-${country.toLowerCase().replace(/\s+/g, '-')}`,
        country,
        flag,
        coordinates,
        timeframe: '1995-2022',
        sectors,
        hasMutipleSectors: true,
        primarySector
      };

      countryStories.push(countryStory);
    }
  });

  console.log(`=== TRANSFORMATION COMPLETE ===`);
  console.log(`Legacy stories: ${legacyStories.length}`);
  console.log(`Country stories: ${countryStories.length}`);
  
  // Log a sample for debugging
  if (legacyStories.length > 0) {
    console.log('Sample legacy story export values:', {
      country: legacyStories[0].country,
      initialExports1995: legacyStories[0].initialExports1995,
      initialExports2022: legacyStories[0].initialExports2022
    });
  }

  return { legacyStories, countryStories };
};
