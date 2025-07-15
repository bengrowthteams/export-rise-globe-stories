
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { SuccessStory } from '@/types/SuccessStory';
import { CountrySuccessStories, SectorStory } from '@/types/CountrySuccessStories';
import { countryCoordinates } from '@/data/countryCoordinates';
import { countryFlags } from '@/data/countryFlags';

export interface CaseStudyData {
  id: number;
  country: string;
  sector: string;
  product: string;
  currentExports2022: number;
  initialExports1995: number;
  globalShare1995: number;
  globalShare2022: number;
  rank1995: number;
  rank2022: number;
  ranksChange: number;
  externalFactors: string;
  privateSectorGrowth: string;
  privateSectorFirm: string;
  publicSectorActor: string;
  publicSectorPolicy: string;
  outcome: string;
  sources: string;
  successStory: string;
  successfulProduct: string;
}

const formatExportValue = (value: number): string => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
};

const getCountryCoordinates = (country: string) => {
  return countryCoordinates[country] || { lat: 0, lng: 0 };
};

export const fetchCaseStudyData = async (id: string): Promise<CaseStudyData | null> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('Primary key', parseInt(id))
      .maybeSingle();

    if (error) {
      console.error('Error fetching case study:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      id: data['Primary key'] || 0,
      country: data.Country || '',
      sector: data.Sector || '',
      product: data['Successful product'] || '',
      currentExports2022: data['Current Exports - 2022 (USD)'] || 0,
      initialExports1995: data['Initial Exports - 1995 (USD)'] || 0,
      globalShare1995: data['Global Share 1995 - %'] || 0,
      globalShare2022: data['Global Share 2022 - %'] || 0,
      rank1995: data['Rank (1995)'] || 0,
      rank2022: data['Rank (2022)'] || 0,
      ranksChange: data['Ranks Change (absolute)'] || 0,
      externalFactors: data['External Factors - One Bullet Summary'] || '',
      privateSectorGrowth: data['Private Sector Industry Growth'] || '',
      privateSectorFirm: data['Private Sector Pioneering Firm'] || '',
      publicSectorActor: data['Public Sector Actor'] || '',
      publicSectorPolicy: data['Public Sector Policy'] || '',
      outcome: data.Outcome || '',
      sources: data.Sources || '',
      successStory: data['Success Story (1 sentence summary)'] || '',
      successfulProduct: data['Successful product'] || ''
    };
  } catch (error) {
    console.error('Error in fetchCaseStudyData:', error);
    return null;
  }
};

export const fetchAllSuccessStories = async (): Promise<{ stories: SuccessStory[], countryStories: CountrySuccessStories[] }> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .order('Country');

    if (error) {
      console.error('Error fetching success stories:', error);
      return { stories: [], countryStories: [] };
    }

    if (!data) {
      return { stories: [], countryStories: [] };
    }

    const storiesMap = new Map<string, SuccessStory[]>();

    data.forEach((row) => {
      if (!row.Country || !row.Sector) return;

      const coordinates = getCountryCoordinates(row.Country);
      const flag = countryFlags[row.Country] || '🏳️';
      
      const growthRate = row['Global Share 2022 - %'] && row['Global Share 1995 - %'] 
        ? ((row['Global Share 2022 - %'] - row['Global Share 1995 - %']) / row['Global Share 1995 - %'] * 100)
        : 0;

      const story: SuccessStory = {
        id: `${row.Country}-${row.Sector}`,
        primaryKey: row['Primary key'] || 0,
        country: row.Country,
        sector: row.Sector,
        product: row['Successful product'] || '',
        description: row['Success Story (1 sentence summary)'] || '',
        growthRate: growthRate,
        timeframe: '1995-2022',
        exportValue: formatExportValue(row['Current Exports - 2022 (USD)'] || 0),
        keyFactors: [
          row['Private Sector - One Bullet Summary'] || '',
          row['Public Sector - One Bullet Summary'] || '',
          row['External Factors - One Bullet Summary'] || ''
        ].filter(Boolean),
        coordinates,
        flag,
        marketDestinations: [],
        challenges: [],
        impact: {
          jobs: '',
          economicContribution: ''
        },
        globalRanking1995: row['Rank (1995)'] || 0,
        globalRanking2022: row['Rank (2022)'] || 0,
        initialExports1995: formatExportValue(row['Initial Exports - 1995 (USD)'] || 0),
        initialExports2022: formatExportValue(row['Current Exports - 2022 (USD)'] || 0),
        successfulProduct: row['Successful product'] || '',
        successStorySummary: row['Success Story (1 sentence summary)'] || ''
      };

      if (!storiesMap.has(row.Country)) {
        storiesMap.set(row.Country, []);
      }
      storiesMap.get(row.Country)!.push(story);
    });

    const stories: SuccessStory[] = [];
    const countryStories: CountrySuccessStories[] = [];

    storiesMap.forEach((countryStoriesList, country) => {
      if (countryStoriesList.length === 1) {
        stories.push(countryStoriesList[0]);
      } else if (countryStoriesList.length > 1) {
        const sectors: SectorStory[] = countryStoriesList.map(story => ({
          sector: story.sector,
          product: story.product,
          description: story.description,
          primaryKey: story.primaryKey,
          growthRate: story.growthRate,
          exportValue: story.exportValue,
          keyFactors: story.keyFactors,
          marketDestinations: story.marketDestinations,
          challenges: story.challenges,
          impact: story.impact,
          globalRanking1995: story.globalRanking1995,
          globalRanking2022: story.globalRanking2022,
          initialExports1995: story.initialExports1995,
          initialExports2022: story.initialExports2022,
          successfulProduct: story.successfulProduct,
          successStorySummary: story.successStorySummary
        }));

        // Get the primary sector (first one for simplicity)
        const primarySector = sectors[0];

        const countryStoryData: CountrySuccessStories = {
          id: country,
          country,
          timeframe: '1995-2022',
          coordinates: countryStoriesList[0].coordinates,
          flag: countryStoriesList[0].flag,
          hasMutipleSectors: true,
          primarySector,
          sectors
        };

        countryStories.push(countryStoryData);
      }
    });

    return { stories, countryStories };
  } catch (error) {
    console.error('Error in fetchAllSuccessStories:', error);
    return { stories: [], countryStories: [] };
  }
};
