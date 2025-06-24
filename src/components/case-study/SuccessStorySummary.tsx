
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SuccessStorySummaryProps {
  summary: string;
}

const SuccessStorySummary = ({ summary }: SuccessStorySummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Success Story Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed text-gray-700">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
};

export default SuccessStorySummary;
