
import { supabase } from '../integrations/supabase/client';
import { Tables } from '../integrations/supabase/types';

export interface EnhancedCaseStudyData {
  id: string;
  country: string;
  sector: string;
  product: string;
  description: string;
  growthRate: number;
  timeframe: string;
  exportValue: string;
  keyFactors: string[];
  coordinates: { lat: number; lng: number };
  flag: string;
  marketDestinations: string[];
  challenges: string[];
  impact: string[];
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

export const fetchEnhancedCaseStudyData = async (id: string): Promise<EnhancedCaseStudyData | null> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('Primary key', parseInt(id))
      .maybeSingle();

    if (error) {
      console.error('Error fetching enhanced case study data:', error);
      return null;
    }

    if (!data) {
      console.log('No enhanced case study data found for id:', id);
      return null;
    }

    return transformSupabaseData(data);
  } catch (error) {
    console.error('Error in fetchEnhancedCaseStudyData:', error);
    return null;
  }
};

const transformSupabaseData = (data: Tables<'Country Data'>): EnhancedCaseStudyData => {
  return {
    id: data['Primary key']?.toString() || '',
    country: data.Country || '',
    sector: data.Sector || '',
    product: data['Successful product'] || '',
    description: data['Success Story (1 sentence summary)'] || '',
    growthRate: data['Ranks Change (absolute)'] || 0,
    timeframe: '1995-2022',
    exportValue: data['Current Exports - 2022 (USD)']?.toString() || '0',
    keyFactors: [],
    coordinates: { lat: 0, lng: 0 },
    flag: '',
    marketDestinations: [],
    challenges: [],
    impact: [],
    globalRanking1995: data['Rank (1995)'] || 0,
    globalRanking2022: data['Rank (2022)'] || 0,
    initialExports1995: data['Initial Exports - 1995 (USD)']?.toString() || '0',
    initialExports2022: data['Current Exports - 2022 (USD)']?.toString() || '0',
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
};
