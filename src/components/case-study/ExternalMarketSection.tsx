
import React from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExternalMarketSectionProps {
  externalFactors: string;
  externalMarketFactors: string;
  externalActorContribution: string;
}

const ExternalMarketSection = ({ 
  externalFactors, 
  externalMarketFactors, 
  externalActorContribution 
}: ExternalMarketSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="text-green-600" size={24} />
          <span>External Market Factors & Actor Contributions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">External Factors Summary</h3>
            <p className="text-gray-700 leading-relaxed">
              {externalFactors}
            </p>
          </div>

          {externalMarketFactors && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Market Factors</h3>
              <p className="text-gray-700 leading-relaxed">
                {externalMarketFactors}
              </p>
            </div>
          )}

          {externalActorContribution && (
            <div>
              <h3 className="text-lg font-semibold mb-3">External Actor Contribution</h3>
              <p className="text-gray-700 leading-relaxed">
                {externalActorContribution}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalMarketSection;
