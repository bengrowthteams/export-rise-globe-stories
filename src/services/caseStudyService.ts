import { supabase } from '@/integrations/supabase/client';
import { countryFlags } from '../data/countryFlags';
import { safelyExtractRowData } from '../utils/supabaseTypeHelpers';

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

export interface EnhancedCaseStudyData {
    id: number;
    country: string;
    sector: string;
    product: string;
    description: string;
    growthRate: number;
    timeframe: string;
    exportValue: number;
    keyFactors: string[];
    coordinates: { lat: number; lng: number };
    flag: string;
    marketDestinations: string[];
    challenges: string[];
    impact: string;
    globalRanking1995: number;
    globalRanking2022: number;
    initialExports1995: number;
    initialExports2022: number;
    successfulProduct: string;
    successStorySummary: string;
}

export type CaseStudy = {
    "Primary key": number;
    Country: string;
    Sector: string;
    "Successful product": string;
    "Public Sector - One Bullet Summary": string;
    "Private Sector - One Bullet Summary": string;
    "External Factors - One Bullet Summary": string;
    "Rank (1995)": number;
    "Rank (2022)": number;
    "Initial Exports - 1995 (USD)": number;
    "Current Exports - 2022 (USD)": number;
    "Global Share 1995 - %": number;
    "Global Share 2022 - %": number;
    Outcome: string;
    "Public Sector Policy": string;
    "Public Sector Actor": string;
    "Private Sector Pioneering Firm": string;
    "Private Sector Industry Growth": string;
    "External Market Factors": string;
    "External Actor Contribution": string;
    Sources: string;
};

export const fetchCaseStudyById = async (id: string): Promise<CaseStudyData | null> => {
  try {
    console.log('Fetching case study with ID:', id);
    
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .eq('Primary key', parseInt(id))
      .single();

    if (error) {
      console.error('Error fetching case study:', error);
      return null;
    }

    if (!data) {
      console.log('No case study found with ID:', id);
      return null;
    }

    console.log('Raw data from Supabase:', data);

    // Use utility function to safely extract row data
    const row = safelyExtractRowData(data);
    
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
    console.error('Unexpected error fetching case study:', error);
    return null;
  }
};

export const fetchEnhancedCaseStudyById = async (id: string): Promise<EnhancedCaseStudyData | null> => {
    try {
        const { data, error } = await supabase
            .from('success_stories')
            .select('*')
            .eq('id', parseInt(id))
            .single();

        if (error) {
            console.error('Error fetching enhanced case study:', error);
            return null;
        }

        if (!data) {
            console.log('No enhanced case study found with ID:', id);
            return null;
        }

        // Ensure data properties match the expected types
        const enhancedCaseStudyData: EnhancedCaseStudyData = {
            id: data.id || 0,
            country: data.country || 'Unknown Country',
            sector: data.sector || 'Unknown Sector',
            product: data.product || 'Not specified',
            description: data.description || 'No description available.',
            growthRate: data.growth_rate || 0,
            timeframe: data.timeframe || 'Not specified',
            exportValue: data.export_value || 0,
            keyFactors: data.key_factors || [],
            coordinates: data.coordinates || { lat: 0, lng: 0 },
            flag: data.flag || '🌍',
            marketDestinations: data.market_destinations || [],
            challenges: data.challenges || [],
            impact: data.impact || 'No impact data available',
            globalRanking1995: data.global_ranking_1995 || 0,
            globalRanking2022: data.global_ranking_2022 || 0,
            initialExports1995: data.initial_exports_1995 || 0,
            initialExports2022: data.initial_exports_2022 || 0,
            successfulProduct: data.successful_product || 'Not specified',
            successStorySummary: data.success_story_summary || 'No summary available'
        };

        return enhancedCaseStudyData;
    } catch (error) {
        console.error('Unexpected error fetching enhanced case study:', error);
        return null;
    }
};
