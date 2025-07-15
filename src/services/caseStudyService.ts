
import { supabase } from '@/integrations/supabase/client';
import { mapCountryDataRow } from '@/utils/supabaseTypeHelpers';

export interface CaseStudyData {
  id: number;
  country: string;
  sector: string;
  successfulProduct: string;
  successStorySummary: string;
  outcome: string;
  rank1995: number;
  rank2022: number;
  ranksChange: number;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
  publicSectorActor: string;
  publicSectorPolicy: string;
  publicSectorSummary: string;
  privateSectorPioneeringFirm: string;
  privateSectorGrowth: string;
  privateSectorSummary: string;
  externalMarketFactors: string;
  externalActorContribution: string;
  externalFactorsSummary: string;
  sources: string;
}

export const getCaseStudyById = async (id: string): Promise<CaseStudyData | null> => {
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

    if (!data) {
      return null;
    }

    return mapCountryDataRow(data);
  } catch (error) {
    console.error('Error in getCaseStudyById:', error);
    return null;
  }
};

export const getAllCaseStudies = async (): Promise<CaseStudyData[]> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .order('Primary key', { ascending: true });

    if (error) {
      console.error('Error fetching case studies:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map(mapCountryDataRow);
  } catch (error) {
    console.error('Error in getAllCaseStudies:', error);
    return [];
  }
};
