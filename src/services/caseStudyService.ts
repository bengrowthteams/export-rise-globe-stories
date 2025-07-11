
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
      .select('Primary key')
      .not('Country', 'is', null)
      .not('Sector', 'is', null);

    if (error) {
      console.error('Error fetching available case study IDs:', error);
      return [];
    }

    return data?.map(row => row['Primary key']) || [];
  } catch (error) {
    console.error('Error in getAvailableCaseStudyIds:', error);
    return [];
  }
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

// Get all available country-sector mappings for enhanced case studies
export const getAllAvailableEnhancedCaseStudies = async (): Promise<Record<string, number>> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('Primary key, Country, Sector')
      .not('Country', 'is', null)
      .not('Sector', 'is', null);

    if (error) {
      console.error('Error fetching enhanced case study mappings:', error);
      return {};
    }

    if (!data || !Array.isArray(data)) {
      console.log('No data returned from enhanced case study mappings query');
      return {};
    }

    const mappings: Record<string, number> = {};
    data.forEach(row => {
      // Add proper type checking for the row data and null checking
      if (row && 
          typeof row === 'object' && 
          row !== null &&
          'Country' in row && 
          'Sector' in row && 
          'Primary key' in row) {
        
        // Extract values with additional null checks
        const country = row.Country;
        const sector = row.Sector;
        const primaryKey = row['Primary key'];
        
        // Ensure all required values exist and are valid
        if (country && 
            sector && 
            typeof country === 'string' && 
            typeof sector === 'string' && 
            typeof primaryKey === 'number') {
          const key = `${country}-${sector}`;
          mappings[key] = primaryKey;
        }
      }
    });

    console.log('Available enhanced case study mappings:', mappings);
    return mappings;
  } catch (error) {
    console.error('Error in getAllAvailableEnhancedCaseStudies:', error);
    return {};
  }
};
