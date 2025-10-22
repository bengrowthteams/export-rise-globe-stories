import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  try {
    const supabaseUrl = "https://jklxnevigyyjlprevfsm.supabase.co";
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all country data
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .order('Country');

    if (error) {
      throw error;
    }

    // Create the export structure
    const exportData = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      rawData: data || [],
    };

    return new Response(
      JSON.stringify(exportData, null, 2),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Export error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});
