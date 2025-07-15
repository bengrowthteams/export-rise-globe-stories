
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface OutcomesSectionProps {
  outcome: string;
}

const OutcomesSection = ({ outcome }: OutcomesSectionProps) => {
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="text-green-600" size={24} />
            <span>Impact & Outcomes</span>
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

export default OutcomesSection;
