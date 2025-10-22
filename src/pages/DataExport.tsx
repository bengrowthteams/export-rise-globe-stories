import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DataExport = () => {
  const [status, setStatus] = useState<string>('Ready to export');
  const [data, setData] = useState<any>(null);

  const exportData = async () => {
    try {
      setStatus('Fetching data from Supabase...');
      
      const { data: countryData, error } = await supabase
        .from('Country Data')
        .select('*')
        .order('Country');

      if (error) {
        throw error;
      }

      const exportData = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        rawData: countryData || [],
      };

      setData(exportData);
      setStatus(`Successfully fetched ${countryData?.length || 0} records`);

      // Create downloadable file
      const jsonStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'staticCountryData.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus(`✅ Downloaded staticCountryData.json with ${countryData?.length} records`);
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Export error:', error);
    }
  };

  const copyToClipboard = () => {
    if (data) {
      const jsonStr = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(jsonStr);
      setStatus('✅ Copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Export Country Data to Static JSON</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This tool will fetch all data from the Supabase "Country Data" table and create
            a downloadable staticCountryData.json file that you can use to replace the empty one.
          </p>
          
          <div className="space-y-2">
            <Button onClick={exportData} size="lg">
              Export Data
            </Button>
            
            {data && (
              <Button onClick={copyToClipboard} variant="outline" className="ml-2">
                Copy to Clipboard
              </Button>
            )}
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm">{status}</p>
          </div>

          {data && (
            <div className="space-y-2">
              <h3 className="font-semibold">Preview:</h3>
              <pre className="p-4 bg-muted rounded-lg text-xs overflow-auto max-h-96">
                {JSON.stringify(data, null, 2).slice(0, 1000)}...
              </pre>
              <p className="text-sm text-muted-foreground">
                Total records: {data.rawData?.length || 0}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExport;
