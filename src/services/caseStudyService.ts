
import { supabase } from '@/integrations/supabase/client';
import { countryFlags } from '@/data/countryFlags';

export interface CaseStudyData {
  id: number;
  country: string;
  sector: string;
  successfulProduct: string;
  flag: string;
  publicSectorSummary: string;
  privateSectorSummary: string;
  externalFactorsSummary: string;
  rank1995: number;
  rank2022: number;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
  outcome: string;
  publicSectorPolicy: string;
  publicSectorActor: string;
  privateSectorPioneeringFirm: string;
  privateSectorIndustryGrowth: string;
  externalMarketFactors: string;
  externalActorContribution: string;
  sources: string;
}

export const getAvailableCaseStudyIds = async (): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('"Primary key"')
      .not('"Primary key"', 'is', null)
      .order('"Primary key"');

    if (error) {
      console.error('Error fetching available case study IDs:', error);
      return [];
    }

    const ids = data?.map(row => row['Primary key']).filter(id => id != null) || [];
    console.log('Available case study IDs:', ids);
    return ids;
  } catch (error) {
    console.error('Failed to fetch available case study IDs:', error);
    return [];
  }
};

export const fetchCaseStudyData = async (primaryKey: number): Promise<CaseStudyData | null> => {
  try {
    console.log(`Fetching case study data for primary key: ${primaryKey}`);

    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('"Primary key"', primaryKey)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    if (!data) {
      console.log('No data found for primary key:', primaryKey);
      return null;
    }

    console.log('Raw data from Supabase:', data);

    // Transform the database row into our CaseStudyData interface
    // Using type assertion to avoid complex type inference
    const row = data as any;
    
    const caseStudyData: CaseStudyData = {
      id: row['Primary key'] || 0,
      country: row.Country || 'Unknown Country',
      sector: row.Sector || 'Unknown Sector',
      successfulProduct: row['Successful product'] || 'Not specified',
      flag: countryFlags[row.Country || ''] || '🌍',
      publicSectorSummary: row['Public Sector - One Bullet Summary'] || 'Public sector information not available.',
      privateSectorSummary: row['Private Sector - One Bullet Summary'] || 'Private sector information not available.',
      externalFactorsSummary: row['External Factors - One Bullet Summary'] || 'External factors information not available.',
      rank1995: row['Rank (1995)'] || 0,
      rank2022: row['Rank (2022)'] || 0,
      initialExports1995: row['Initial Exports - 1995 (USD)'] || 0,
      currentExports2022: row['Current Exports - 2022 (USD)'] || 0,
      globalShare1995: row['Global Share 1995 - %'] || 0,
      globalShare2022: row['Global Share 2022 - %'] || 0,
      outcome: row.Outcome || 'Outcome information not available.',
      publicSectorPolicy: row['Public Sector Policy'] || 'Public sector policy information not available.',
      publicSectorActor: row['Public Sector Actor'] || 'Public sector actor information not available.',
      privateSectorPioneeringFirm: row['Private Sector Pioneering Firm'] || 'Private sector pioneering firm information not available.',
      privateSectorIndustryGrowth: row['Private Sector Industry Growth'] || 'Private sector industry growth information not available.',
      externalMarketFactors: row['External Market Factors'] || 'External market factors information not available.',
      externalActorContribution: row['External Actor Contribution'] || 'External actor contribution information not available.',
      sources: row.Sources || 'Sources not available.'
    };

    console.log('Transformed case study data:', caseStudyData);
    return caseStudyData;

  } catch (error) {
    console.error('Error fetching case study data:', error);
    return null;
  }
};
