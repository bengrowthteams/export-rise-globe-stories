
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SuccessStorySummaryProps {
  summary: string;
}

const SuccessStorySummary = ({ summary }: SuccessStorySummaryProps) => {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-2xl">Success Story Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
};

export default SuccessStorySummary;
