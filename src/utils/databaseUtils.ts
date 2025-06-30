
import { supabase } from '@/integrations/supabase/client';

// Test database connectivity and permissions
export const testDatabaseAccess = async (): Promise<void> => {
  try {
    console.log('=== TESTING DATABASE ACCESS ===');
    
    // Test 1: Check if we can connect to Supabase at all
    const { data: testData, error: testError } = await supabase
      .from('Country Data')
      .select('Country', { count: 'exact', head: true });
    
    console.log('Basic connection test:', { 
      success: !testError, 
      error: testError?.message,
      count: testData?.length || 0
    });

    // Test 2: Try different query approaches
    const queries = [
      { name: 'Basic select *', query: supabase.from('Country Data').select('*').limit(1) },
      { name: 'Select Country only', query: supabase.from('Country Data').select('Country').limit(1) },
      { name: 'Count query', query: supabase.from('Country Data').select('*', { count: 'exact', head: true }) }
    ];

    for (const { name, query } of queries) {
      const { data, error, count } = await query;
      console.log(`${name}:`, { 
        success: !error, 
        error: error?.message, 
        dataLength: data?.length || 0,
        count 
      });
    }

  } catch (error) {
    console.error('Database access test failed:', error);
  }
};
