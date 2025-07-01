
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, TrendingUp, Factory } from 'lucide-react';

interface OutcomesAnalysisProps {
  outcome: string;
}

const OutcomesAnalysis = ({ outcome }: OutcomesAnalysisProps) => {
  // Parse key numbers from the outcome text
  const parseOutcomeMetrics = (text: string) => {
    const metrics = [];
    
    // Look for job numbers - improved regex to handle "3 million jobs" format
    const jobMatch = text.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*(million|thousand)?\s*(?:direct\s+)?jobs?/i);
    if (jobMatch) {
      let jobValue = jobMatch[1];
      const multiplier = jobMatch[2];
      
      // Format the job value properly
      if (multiplier && multiplier.toLowerCase() === 'million') {
        jobValue = `${jobMatch[1]}M`;
      } else if (multiplier && multiplier.toLowerCase() === 'thousand') {
        jobValue = `${jobMatch[1]}K`;
      } else if (jobMatch[1].includes(',')) {
        // Handle comma-separated numbers
        jobValue = jobMatch[1];
      }
      
      metrics.push({
        icon: Users,
        title: 'Jobs Created',
        value: jobValue,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      });
    }

    // Look for export percentages
    const exportMatch = text.match(/(\d+(?:\.\d+)?)%.*?export/i);
    if (exportMatch) {
      metrics.push({
        icon: TrendingUp,
        title: 'Export Contribution',
        value: `${exportMatch[1]}%`,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      });
    }

    // Look for GDP figures
    const gdpMatch = text.match(/\$(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:billion|B)/i);
    if (gdpMatch) {
      metrics.push({
        icon: BarChart3,
        title: 'GDP Impact',
        value: `$${gdpMatch[1]}B`,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      });
    }

    // Look for company mentions
    const companyMatch = text.match(/(Nike|Adidas|major companies)/i);
    if (companyMatch) {
      metrics.push({
        icon: Factory,
        title: 'Key Players',
        value: companyMatch[1],
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      });
    }

    return metrics;
  };

  const metrics = parseOutcomeMetrics(outcome);

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact & Outcomes</h2>
      
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <Card key={index} className={`${metric.bgColor} border-2`}>
              <CardContent className="p-4 text-center">
                <metric.icon className={`${metric.color} mx-auto mb-2`} size={32} />
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="text-green-600" size={24} />
            <span>Comprehensive Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {outcome}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutcomesAnalysis;
