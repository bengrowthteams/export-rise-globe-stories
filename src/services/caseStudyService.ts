
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { SuccessStory } from '@/types/SuccessStory';
import { CountrySuccessStories } from '@/types/CountrySuccessStories';
import { getCountryCoordinates } from '@/data/countryCoordinates';
import { getCountryFlag } from '@/data/countryFlags';
import { formatExportValue } from '@/utils/formatUtils';

type CountryDataRow = Database['public']['Tables']['Country Data']['Row'];

export interface CaseStudyData {
  id: number;
  country: string;
  sector: string;
  successfulProduct: string;
  successStorySummary: string;
  publicSectorActor: string;
  publicSectorPolicy: string;
  publicSectorSummary: string;
  privateSectorFirm: string;
  privateSectorGrowth: string;
  privateSectorSummary: string;
  externalActor: string;
  externalFactors: string;
  externalSummary: string;
  outcome: string;
  sources: string;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
  rank1995: number;
  rank2022: number;
  ranksChange: number;
}

export const fetchCaseStudyData = async (id: string): Promise<CaseStudyData | null> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('Primary key', parseInt(id))
      .single();

    if (error) {
      console.error('Error fetching case study:', error);
      return null;
    }

    if (!data) return null;

    return {
      id: data['Primary key'] || 0,
      country: data.Country || '',
      sector: data.Sector || '',
      successfulProduct: data['Successful product'] || '',
      successStorySummary: data['Success Story (1 sentence summary)'] || '',
      publicSectorActor: data['Public Sector Actor'] || '',
      publicSectorPolicy: data['Public Sector Policy'] || '',
      publicSectorSummary: data['Public Sector - One Bullet Summary'] || '',
      privateSectorFirm: data['Private Sector Pioneering Firm'] || '',
      privateSectorGrowth: data['Private Sector Industry Growth'] || '',
      privateSectorSummary: data['Private Sector - One Bullet Summary'] || '',
      externalActor: data['External Actor Contribution'] || '',
      externalFactors: data['External Market Factors'] || '',
      externalSummary: data['External Factors - One Bullet Summary'] || '',
      outcome: data.Outcome || '',
      sources: data.Sources || '',
      initialExports1995: data['Initial Exports - 1995 (USD)'] || 0,
      currentExports2022: data['Current Exports - 2022 (USD)'] || 0,
      globalShare1995: data['Global Share 1995 - %'] || 0,
      globalShare2022: data['Global Share 2022 - %'] || 0,
      rank1995: data['Rank (1995)'] || 0,
      rank2022: data['Rank (2022)'] || 0,
      ranksChange: data['Ranks Change (absolute)'] || 0,
    };
  } catch (error) {
    console.error('Error in fetchCaseStudyData:', error);
    return null;
  }
};

export const getAllCaseStudies = async (): Promise<SuccessStory[]> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*');

    if (error) {
      console.error('Error fetching all case studies:', error);
      return [];
    }

    if (!data) return [];

    return data.map((row: CountryDataRow) => ({
      id: `${row.Country}-${row.Sector}`.replace(/\s+/g, '-').toLowerCase(),
      primaryKey: row['Primary key'] || 0,
      country: row.Country || '',
      sector: row.Sector || '',
      product: row['Successful product'] || '',
      description: row['Success Story (1 sentence summary)'] || '',
      growthRate: `${row['Ranks Change (absolute)'] || 0} places`,
      timeframe: '1995-2022',
      exportValue: row['Current Exports - 2022 (USD)'] ? formatExportValue(row['Current Exports - 2022 (USD)']) : '$0',
      keyFactors: [
        row['Public Sector - One Bullet Summary'] || '',
        row['Private Sector - One Bullet Summary'] || '',
        row['External Factors - One Bullet Summary'] || ''
      ].filter(factor => factor.length > 0),
      coordinates: getCountryCoordinates(row.Country || ''),
      flag: getCountryFlag(row.Country || ''),
      marketDestinations: [],
      challenges: [],
      impact: row.Outcome || '',
      globalRanking1995: row['Rank (1995)'] || 0,
      globalRanking2022: row['Rank (2022)'] || 0,
      initialExports1995: row['Initial Exports - 1995 (USD)'] ? formatExportValue(row['Initial Exports - 1995 (USD)']) : '$0',
      initialExports2022: row['Current Exports - 2022 (USD)'] ? formatExportValue(row['Current Exports - 2022 (USD)']) : '$0',
      successfulProduct: row['Successful product'] || '',
      successStorySummary: row['Success Story (1 sentence summary)'] || ''
    }));
  } catch (error) {
    console.error('Error in getAllCaseStudies:', error);
    return [];
  }
};

export const getAvailableCaseStudyIds = async (): Promise<string[]> => {
  try {
    const stories = await getAllCaseStudies();
    return stories.map(story => story.id);
  } catch (error) {
    console.error('Error getting available case study IDs:', error);
    return [];
  }
};
