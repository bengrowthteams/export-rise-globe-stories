
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export interface CaseStudyData {
  id: string;
  country: string;
  sector: string;
  product: string;
  description: string;
  growthRate: string;
  timeframe: string;
  exportValue: string;
  keyFactors: string;
  coordinates: { lat: number; lng: number };
  flag: string;
  marketDestinations: string;
  challenges: string;
  impact: string;
  globalRanking1995: number;
  globalRanking2022: number;
  initialExports1995: string;
  initialExports2022: string;
  successfulProduct: string;
  successStorySummary: string;
  publicSectorActor: string;
  publicSectorPolicy: string;
  publicSectorSummary: string;
  privateSectorFirm: string;
  privateSectorGrowth: string;
  privateSectorSummary: string;
  externalActorContribution: string;
  externalMarketFactors: string;
  externalFactorsSummary: string;
  outcome: string;
  sources: string;
}

export const fetchCaseStudyData = async (id: string): Promise<CaseStudyData | null> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('Primary key', parseInt(id))
      .single();

    if (error) {
      console.error('Error fetching case study data:', error);
      return null;
    }

    if (!data) {
      console.log('No data found for ID:', id);
      return null;
    }

    // Transform the data to match our interface
    const transformedData: CaseStudyData = {
      id: data['Primary key']?.toString() || '',
      country: data.Country || '',
      sector: data.Sector || '',
      product: data['Successful product'] || '',
      description: data['Success Story (1 sentence summary)'] || '',
      growthRate: '', // Not available in current schema
      timeframe: '1995-2022', // Default timeframe
      exportValue: data['Current Exports - 2022 (USD)']?.toString() || '',
      keyFactors: [
        data['Public Sector Policy'],
        data['Private Sector Industry Growth'],
        data['External Market Factors']
      ].filter(Boolean).join('; '),
      coordinates: { lat: 0, lng: 0 }, // Would need to be mapped from country
      flag: '', // Would need to be mapped from country
      marketDestinations: data['External Market Factors'] || '',
      challenges: '', // Not available in current schema
      impact: data.Outcome || '',
      globalRanking1995: data['Rank (1995)'] || 0,
      globalRanking2022: data['Rank (2022)'] || 0,
      initialExports1995: data['Initial Exports - 1995 (USD)']?.toString() || '',
      initialExports2022: data['Current Exports - 2022 (USD)']?.toString() || '',
      successfulProduct: data['Successful product'] || '',
      successStorySummary: data['Success Story (1 sentence summary)'] || '',
      publicSectorActor: data['Public Sector Actor'] || '',
      publicSectorPolicy: data['Public Sector Policy'] || '',
      publicSectorSummary: data['Public Sector - One Bullet Summary'] || '',
      privateSectorFirm: data['Private Sector Pioneering Firm'] || '',
      privateSectorGrowth: data['Private Sector Industry Growth'] || '',
      privateSectorSummary: data['Private Sector - One Bullet Summary'] || '',
      externalActorContribution: data['External Actor Contribution'] || '',
      externalMarketFactors: data['External Market Factors'] || '',
      externalFactorsSummary: data['External Factors - One Bullet Summary'] || '',
      outcome: data.Outcome || '',
      sources: data.Sources || ''
    };

    return transformedData;
  } catch (error) {
    console.error('Error in fetchCaseStudyData:', error);
    return null;
  }
};

export const getAvailableCaseStudyIds = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('Primary key');

    if (error) {
      console.error('Error fetching case study IDs:', error);
      return [];
    }

    return data?.map(item => item['Primary key']?.toString()).filter(Boolean) || [];
  } catch (error) {
    console.error('Error in getAvailableCaseStudyIds:', error);
    return [];
  }
};
