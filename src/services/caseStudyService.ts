
import { supabase } from '@/integrations/supabase/client';
import { countryFlags } from '@/data/countryFlags';

export interface CaseStudyData {
  id: number;
  country: string;
  flag: string;
  sector: string;
  successfulProduct: string;
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

export const fetchCaseStudyData = async (primaryKey: number): Promise<CaseStudyData | null> => {
  try {
    console.log('Fetching case study data for primary key:', primaryKey);
    
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('Primary key', primaryKey)
      .single();

    if (error) {
      console.error('Error fetching case study data:', error);
      return null;
    }

    if (!data) {
      console.warn('No data found for primary key:', primaryKey);
      return null;
    }

    console.log('Raw case study data:', data);

    const country = data.Country || 'Unknown Country';
    const flag = countryFlags[country] || '🌍';

    return {
      id: data['Primary key'],
      country,
      flag,
      sector: data.Sector || 'Unknown Sector',
      successfulProduct: data['Successful product'] || 'Unknown Product',
      publicSectorSummary: data['Public Sector - One Bullet Summary'] || 'No public sector information available.',
      privateSectorSummary: data['Private Sector - One Bullet Summary'] || 'No private sector information available.',
      externalFactorsSummary: data['External Factors - One Bullet Summary'] || 'No external factors information available.',
      rank1995: data['Rank (1995)'] || 0,
      rank2022: data['Rank (2022)'] || 0,
      initialExports1995: data['Initial Exports - 1995 (USD)'] || 0,
      currentExports2022: data['Current Exports - 2022 (USD)'] || 0,
      globalShare1995: data['Global Share 1995 - %'] || 0,
      globalShare2022: data['Global Share 2022 - %'] || 0,
      outcome: data.Outcome || 'No outcome information available.',
      publicSectorPolicy: data['Public Sector Policy'] || 'No policy information available.',
      publicSectorActor: data['Public Sector Actor'] || 'No actor information available.',
      privateSectorPioneeringFirm: data['Private Sector Pioneering Firm'] || 'No pioneering firm information available.',
      privateSectorIndustryGrowth: data['Private Sector Industry Growth'] || 'No industry growth information available.',
      externalMarketFactors: data['External Market Factors'] || 'No external market factors information available.',
      externalActorContribution: data['External Actor Contribution'] || 'No external actor contribution information available.',
      sources: data.Sources || 'No sources available.'
    };
  } catch (error) {
    console.error('Failed to fetch case study data:', error);
    return null;
  }
};

// Get available case study IDs (first 5 rows)
export const getAvailableCaseStudyIds = (): number[] => {
  return [1, 2, 3, 4, 5];
};
