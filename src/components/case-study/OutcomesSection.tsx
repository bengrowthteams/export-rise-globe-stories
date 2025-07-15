
import React from 'react';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OutcomesSectionProps {
  outcome: string;
}

const OutcomesSection = ({ outcome }: OutcomesSectionProps) => {
  // Parse key numbers from the outcome text if available
  const parseMetrics = (text: string) => {
    const jobMatch = text.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*(million|thousand)?\s*(?:direct\s+)?jobs?/i);
    const exportMatch = text.match(/(\d+(?:\.\d+)?)%.*?export/i);
    const gdpMatch = text.match(/\$(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:billion|B)/i);

    return {
      jobs: jobMatch ? `${jobMatch[1]}${jobMatch[2] ? jobMatch[2].charAt(0).toUpperCase() : ''}` : null,
      exportShare: exportMatch ? `${exportMatch[1]}%` : null,
      gdp: gdpMatch ? `$${gdpMatch[1]}B` : null
    };
  };

  const metrics = parseMetrics(outcome);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="text-orange-600" size={24} />
          <span>Outcomes & Impact</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {(metrics.jobs || metrics.exportShare || metrics.gdp) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {metrics.jobs && (
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Users className="mx-auto mb-2 text-orange-600" size={32} />
                <p className="text-2xl font-bold text-orange-600">{metrics.jobs}</p>
                <p className="text-sm text-orange-700">Jobs Created</p>
              </div>
            )}
            {metrics.exportShare && (
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="mx-auto mb-2 text-green-600" size={32} />
                <p className="text-2xl font-bold text-green-600">{metrics.exportShare}</p>
                <p className="text-sm text-green-700">of Total Exports</p>
              </div>
            )}
            {metrics.gdp && (
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="text-2xl font-bold text-blue-600">{metrics.gdp}</p>
                <p className="text-sm text-blue-700">Economic Impact</p>
              </div>
            )}
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            {outcome || 'Outcome information not available'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutcomesSection;
