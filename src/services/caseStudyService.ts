
import { supabase } from '@/integrations/supabase/client';
import { countryFlags } from '@/data/countryFlags';
import { getAllEnhancedCaseStudyIds } from '../utils/enhancedCaseStudyMapping';

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
  // Use the new database-driven approach
  return await getAllEnhancedCaseStudyIds();
};

export const fetchCaseStudyData = async (primaryKey: number): Promise<CaseStudyData | null> => {
  try {
    console.log(`Fetching case study data for primary key: ${primaryKey}`);

    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('Primary key', primaryKey)
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
    const caseStudyData: CaseStudyData = {
      id: data['Primary key'],
      country: data.Country || 'Unknown Country',
      sector: data.Sector || 'Unknown Sector',
      successfulProduct: data['Successful product'] || 'Not specified',
      flag: countryFlags[data.Country || ''] || '🌍',
      publicSectorSummary: data['Public Sector - One Bullet Summary'] || 'Public sector information not available.',
      privateSectorSummary: data['Private Sector - One Bullet Summary'] || 'Private sector information not available.',
      externalFactorsSummary: data['External Factors - One Bullet Summary'] || 'External factors information not available.',
      rank1995: data['Rank (1995)'] || 0,
      rank2022: data['Rank (2022)'] || 0,
      initialExports1995: data['Initial Exports - 1995 (USD)'] || 0,
      currentExports2022: data['Current Exports - 2022 (USD)'] || 0,
      globalShare1995: data['Global Share 1995 - %'] || 0,
      globalShare2022: data['Global Share 2022 - %'] || 0,
      outcome: data.Outcome || 'Outcome information not available.',
      publicSectorPolicy: data['Public Sector Policy'] || 'Public sector policy information not available.',
      publicSectorActor: data['Public Sector Actor'] || 'Public sector actor information not available.',
      privateSectorPioneeringFirm: data['Private Sector Pioneering Firm'] || 'Private sector pioneering firm information not available.',
      privateSectorIndustryGrowth: data['Private Sector Industry Growth'] || 'Private sector industry growth information not available.',
      externalMarketFactors: data['External Market Factors'] || 'External market factors information not available.',
      externalActorContribution: data['External Actor Contribution'] || 'External actor contribution information not available.',
      sources: data.Sources || 'Sources not available.'
    };

    console.log('Transformed case study data:', caseStudyData);
    return caseStudyData;

  } catch (error) {
    console.error('Error fetching case study data:', error);
    return null;
  }
};

// Backward compatibility function
export const getAllAvailableEnhancedCaseStudies = async (): Promise<Record<string, number>> => {
  // This is now handled by the enhanced mapping utility
  const { getAllEnhancedCaseStudyMappings } = await import('../utils/enhancedCaseStudyMapping');
  return await getAllEnhancedCaseStudyMappings();
};
