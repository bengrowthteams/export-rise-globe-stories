import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = "https://jklxnevigyyjlprevfsm.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

interface StaticDataExport {
  version: string;
  lastUpdated: string;
  rawData: any[];
}

async function exportSupabaseData() {
  console.log('Starting Supabase data export...');

  if (!SUPABASE_SERVICE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY environment variable not set');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    // Fetch all data from Country Data table
    const { data, error } = await supabase
      .from('Country Data')
      .select('*')
      .order('Country');

    if (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned from Supabase');
    }

    // Create export structure
    const exportData: StaticDataExport = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      rawData: data,
    };

    // Write to file
    const outputPath = join(process.cwd(), 'src', 'data', 'staticCountryData.json');
    writeFileSync(outputPath, JSON.stringify(exportData, null, 2));

    console.log(`✅ Successfully exported ${data.length} records to ${outputPath}`);
    console.log(`Version: ${exportData.version}`);
    console.log(`Last Updated: ${exportData.lastUpdated}`);
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

exportSupabaseData();
