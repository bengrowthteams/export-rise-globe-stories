
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CompactOutcomesDashboardProps {
  outcome: string;
  rank1995: number;
  rank2022: number;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
}

const CompactOutcomesDashboard = ({
  outcome
}: CompactOutcomesDashboardProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Outcomes</h2>
      <Card>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {outcome}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactOutcomesDashboard;
