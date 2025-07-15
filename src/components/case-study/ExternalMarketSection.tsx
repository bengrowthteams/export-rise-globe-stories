
import React from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExternalMarketSectionProps {
  externalFactors: string;
  externalMarketFactors: string;
  externalActorContribution: string;
}

const ExternalMarketSection = ({ externalFactors, externalMarketFactors, externalActorContribution }: ExternalMarketSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="text-green-600" size={24} />
          <span>External Market Dynamics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Market Factors</h3>
        <p className="text-gray-700 mb-6">
          {externalMarketFactors || externalFactors || 'External market factor information not available.'}
        </p>

        <h3 className="text-xl font-semibold mb-4">External Actor Contribution</h3>
        <p className="text-gray-700">
          {externalActorContribution || 'External actor contribution information not available.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default ExternalMarketSection;
