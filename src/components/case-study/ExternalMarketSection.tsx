
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
          {externalFactors && (
            <div>
              <h3 className="text-lg font-semibold mb-3">External Factors</h3>
              <div className="whitespace-pre-line text-gray-700">
                {externalFactors}
              </div>
            </div>
          )}

          {externalMarketFactors && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Market Factors</h3>
              <div className="whitespace-pre-line text-gray-700">
                {externalMarketFactors}
              </div>
            </div>
          )}

          {externalActorContribution && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Actor Contributions</h3>
              <div className="whitespace-pre-line text-gray-700">
                {externalActorContribution}
              </div>
            </div>
          )}

          {!externalFactors && !externalMarketFactors && !externalActorContribution && (
            <div>
              <p className="text-gray-700">
                External market factors and international actor contributions played a significant role in the development of this export success story.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalMarketSection;
