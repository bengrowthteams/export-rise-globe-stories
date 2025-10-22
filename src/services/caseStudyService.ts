
import { supabase } from '@/integrations/supabase/client';
import { countryFlags } from '../data/countryFlags';
import { safelyExtractRowData } from '../utils/supabaseTypeHelpers';
import staticData from '../data/staticCountryData.json';

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
  sectorExportsGDP1995: number;
  sectorExportsGDP2022: number;
  outcome: string;
  publicSectorPolicy: string;
  publicSectorActor: string;
  privateSectorPioneeringFirm: string;
  privateSectorIndustryGrowth: string;
  externalMarketFactors: string;
  externalActorContribution: string;
  sources: string;
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

// In-memory cache for case studies
const caseStudyCache = new Map<number, CaseStudyData>();

// Initialize cache from static data
const initializeCaseStudyCache = () => {
  if (caseStudyCache.size > 0) return; // Already initialized
  
  if (staticData.rawData && staticData.rawData.length > 0) {
    staticData.rawData.forEach((row: any) => {
      const primaryKey = row['Primary key'];
      if (primaryKey) {
        const transformed: CaseStudyData = {
          id: primaryKey,
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
          sectorExportsGDP1995: row['Sector Exports as % of GDP (1995)'] || 0,
          sectorExportsGDP2022: row['Sector Exports as % of GDP (2022)'] || 0,
          outcome: row.Outcome || 'Outcome information not available.',
          publicSectorPolicy: row['Public Sector Policy'] || 'Public sector policy information not available.',
          publicSectorActor: row['Public Sector Actor'] || 'Public sector actor information not available.',
          privateSectorPioneeringFirm: row['Private Sector Pioneering Firm'] || 'Private sector pioneering firm information not available.',
          privateSectorIndustryGrowth: row['Private Sector Industry Growth'] || 'Private sector industry growth information not available.',
          externalMarketFactors: row['External Market Factors'] || 'External market factors information not available.',
          externalActorContribution: row['External Actor Contribution'] || 'External actor contribution information not available.',
          sources: row.Sources || 'Sources not available.'
        };
        caseStudyCache.set(primaryKey, transformed);
      }
    });
    console.log(`Initialized case study cache with ${caseStudyCache.size} entries`);
  }
};


export const fetchCaseStudyById = async (id: string): Promise<CaseStudyData | null> => {
  try {
    console.log('Fetching case study with ID:', id);
    const numericId = parseInt(id, 10);
    
    // Initialize cache if needed
    initializeCaseStudyCache();
    
    // Check in-memory cache first
    if (caseStudyCache.has(numericId)) {
      console.log('Returning cached case study');
      return caseStudyCache.get(numericId)!;
    }
    
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
      sectorExportsGDP1995: row['Sector Exports as % of GDP (1995)'] || 0,
      sectorExportsGDP2022: row['Sector Exports as % of GDP (2022)'] || 0,
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
    
    // Cache for future use
    caseStudyCache.set(row['Primary key'] || 0, caseStudyData);
    
    return caseStudyData;
  } catch (error) {
    console.error('Unexpected error fetching case study:', error);
    return null;
  }
};

// Add the missing export functions that are being imported
export const fetchCaseStudyData = fetchCaseStudyById;

export const getAvailableCaseStudyIds = async (): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('"Primary key"')
      .not('"Primary key"', 'is', null)
      .order('"Primary key"');

    if (error) {
      console.error('Error fetching case study IDs:', error);
      return [];
    }

    const ids = data?.map(row => row['Primary key']).filter(id => id != null) || [];
    console.log('Available case study IDs:', ids);
    return ids;
  } catch (error) {
    console.error('Failed to fetch case study IDs:', error);
    return [];
  }
};
