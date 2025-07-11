
import { supabase } from '@/integrations/supabase/client';

// Cache for enhanced case study IDs
let enhancedCaseStudyIds: Set<number> | null = null;
let isLoading = false;

export const preloadEnhancedCaseStudyIds = async (): Promise<Set<number>> => {
  if (enhancedCaseStudyIds) {
    return enhancedCaseStudyIds;
  }

  if (isLoading) {
    // Wait for the current loading to complete
    while (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return enhancedCaseStudyIds || new Set();
  }

  isLoading = true;
  
  try {
    const { data, error } = await supabase
      .from('Country Data')
      .select('Primary key')
      .not('Primary key', 'is', null);

    if (error) {
      console.error('Error preloading enhanced case study IDs:', error);
      enhancedCaseStudyIds = new Set();
    } else {
      const ids = data?.map(row => row['Primary key']).filter(id => id != null) || [];
      enhancedCaseStudyIds = new Set(ids);
      console.log('Preloaded enhanced case study IDs:', Array.from(enhancedCaseStudyIds));
    }
  } catch (error) {
    console.error('Failed to preload enhanced case study IDs:', error);
    enhancedCaseStudyIds = new Set();
  } finally {
    isLoading = false;
  }

  return enhancedCaseStudyIds;
};

export const hasEnhancedCaseStudy = (primaryKey?: number): boolean => {
  if (!primaryKey || !enhancedCaseStudyIds) {
    return false;
  }
  return enhancedCaseStudyIds.has(primaryKey);
};

export const clearCache = () => {
  enhancedCaseStudyIds = null;
  isLoading = false;
};
