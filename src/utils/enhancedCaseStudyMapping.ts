
// Simple utility for enhanced case study mapping
// This file is kept for backwards compatibility but the logic is now simplified

import { supabase } from '@/integrations/supabase/client';

// Get all available enhanced case study IDs directly from the database
export const getAllEnhancedCaseStudyIds = async (): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('"Primary key"')
      .not('"Primary key"', 'is', null)
      .order('"Primary key"');

    if (error) {
      console.error('Error fetching enhanced case study IDs:', error);
      return [];
    }

    const ids: number[] = data?.map((row: any) => row['Primary key']).filter((id: any) => id != null) || [];
    console.log('Available enhanced case study IDs:', ids);
    return ids;
  } catch (error) {
    console.error('Failed to fetch enhanced case study IDs:', error);
    return [];
  }
};

// Simple check if a story has an enhanced case study based on its primaryKey
export const hasEnhancedCaseStudy = async (story: { primaryKey?: number | null }): Promise<boolean> => {
  if (!story.primaryKey) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('"Primary key"')
      .eq('"Primary key"', story.primaryKey)
      .single();

    if (error) {
      console.log('No enhanced case study found for Primary key:', story.primaryKey);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error('Error checking enhanced case study:', error);
    return false;
  }
};

// Get the enhanced case study ID (which is just the primaryKey)
export const getEnhancedCaseStudyId = (story: { primaryKey?: number | null }): number | null => {
  return story.primaryKey || null;
};

// Legacy compatibility functions (simplified)
export const hasEnhancedCaseStudySync = (story: { primaryKey?: number | null }): boolean => {
  // For sync version, we can only check if primaryKey exists
  return Boolean(story.primaryKey);
};

export const getEnhancedCaseStudyIdSync = (story: { primaryKey?: number | null }): number | null => {
  return story.primaryKey || null;
};

// Initialize mappings (no-op now since we use direct primary keys)
export const initializeMappings = async (): Promise<void> => {
  console.log('Enhanced case study mapping initialized (using direct primary keys)');
};

// Get all mappings (legacy compatibility)
export const getAllEnhancedCaseStudyMappings = async (): Promise<Record<string, number>> => {
  // Return empty object since we no longer use string-based mappings
  return {};
};
