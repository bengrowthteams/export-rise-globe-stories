import { forceRefreshFromSupabase } from '@/services/countryDataService';
import { toast } from 'sonner';

/**
 * Utility to force refresh data from Supabase
 * This clears all caches and fetches fresh data
 */
export const refreshDataFromSupabase = async () => {
  try {
    toast.info('Refreshing data from Supabase...');
    const stories = await forceRefreshFromSupabase();
    
    if (stories.length > 0) {
      toast.success(`Successfully refreshed ${stories.length} stories from Supabase`);
      // Reload the page to ensure all components use the new data
      window.location.reload();
    } else {
      toast.warning('No data received from Supabase');
    }
  } catch (error) {
    console.error('Failed to refresh data:', error);
    toast.error('Failed to refresh data from Supabase');
  }
};

/**
 * Get cache information
 */
export const getCacheInfo = () => {
  try {
    const version = localStorage.getItem('country-data-version');
    const timestamp = localStorage.getItem('country-data-timestamp');
    
    return {
      version: version || 'No cache',
      lastUpdated: timestamp ? new Date(timestamp).toLocaleString() : 'Never',
      hasCachedData: !!version
    };
  } catch (error) {
    return {
      version: 'Error',
      lastUpdated: 'Unknown',
      hasCachedData: false
    };
  }
};
