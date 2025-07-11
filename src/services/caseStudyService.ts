
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

// Expanded list of available enhanced case study IDs
const AVAILABLE_ENHANCED_CASE_STUDY_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28,
  47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  57, 58, 59, 60, 61, 62, 63,
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
  78, 79, 80, 81, 82
];

export const getAvailableCaseStudyIds = async (): Promise<number[]> => {
  // Return expanded static list for reliability
  console.log('Returning expanded enhanced case study IDs:', AVAILABLE_ENHANCED_CASE_STUDY_IDS);
  return AVAILABLE_ENHANCED_CASE_STUDY_IDS;
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

// Expanded static mapping for enhanced case studies
export const getAllAvailableEnhancedCaseStudies = async (): Promise<Record<string, number>> => {
  // Return expanded static mappings for reliability - no complex database queries
  const staticMappings: Record<string, number> = {
    // Original mappings (1-10)
    'Vietnam-Textile': 1,
    'Bangladesh-Textile': 2,
    'Cambodia-Textile': 3,
    'UAE-Textile': 4,
    'United Arab Emirates-Textile': 4,
    'Myanmar-Textile': 5,
    'India-Textile': 6,
    'Turkey-Textile': 7,
    'Pakistan-Textile': 8,
    'Indonesia-Textile': 9,
    'Ethiopia-Textile': 10,
    
    // Additional mappings (11-28)
    'China-Textile': 11,
    'Sri Lanka-Textile': 12,
    'Philippines-Textile': 13,
    'Thailand-Textile': 14,
    'Malaysia-Textile': 15,
    'Jordan-Textile': 16,
    'Morocco-Textile': 17,
    'Tunisia-Textile': 18,
    'Egypt-Textile': 19,
    'Kenya-Textile': 20,
    'Madagascar-Textile': 21,
    'Mauritius-Textile': 22,
    'Guatemala-Textile': 23,
    'Honduras-Textile': 24,
    'El Salvador-Textile': 25,
    'Nicaragua-Textile': 26,
    'Dominican Republic-Textile': 27,
    'Haiti-Textile': 28,
    
    // Additional mappings (47-63)
    'Vietnam-Electronics': 47,
    'China-Electronics': 48,
    'South Korea-Electronics': 49,
    'Taiwan-Electronics': 50,
    'Singapore-Electronics': 51,
    'Malaysia-Electronics': 52,
    'Thailand-Electronics': 53,
    'Philippines-Electronics': 54,
    'Indonesia-Electronics': 55,
    'India-Electronics': 56,
    'Bangladesh-Electronics': 57,
    'Sri Lanka-Electronics': 58,
    'Pakistan-Electronics': 59,
    'Turkey-Electronics': 60,
    'Morocco-Electronics': 61,
    'Tunisia-Electronics': 62,
    'Egypt-Electronics': 63,
    
    // Additional mappings (65-76)
    'Vietnam-Automotive': 65,
    'China-Automotive': 66,
    'India-Automotive': 67,
    'Thailand-Automotive': 68,
    'Indonesia-Automotive': 69,
    'Malaysia-Automotive': 70,
    'Turkey-Automotive': 71,
    'Morocco-Automotive': 72,
    'South Africa-Automotive': 73,
    'Mexico-Automotive': 74,
    'Brazil-Automotive': 75,
    'Argentina-Automotive': 76,
    
    // Additional mappings (78-82)
    'Vietnam-Agriculture': 78,
    'Thailand-Agriculture': 79,
    'India-Agriculture': 80,
    'Brazil-Agriculture': 81,
    'Argentina-Agriculture': 82
  };
  
  console.log('Returning expanded enhanced case study mappings:', staticMappings);
  return staticMappings;
};
