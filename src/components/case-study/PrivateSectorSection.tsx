
import React from 'react';
import { Factory } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PrivateSectorSectionProps {
  privateSectorGrowth: string;
  privateSectorFirm: string;
}

const PrivateSectorSection = ({ privateSectorGrowth, privateSectorFirm }: PrivateSectorSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Factory className="text-orange-600" size={24} />
          <span>Private Sector Growth & Innovation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Industry Growth Dynamics</h3>
        <p className="text-gray-700 mb-6">
          {privateSectorGrowth || 'Private sector growth information not available.'}
        </p>

        <h3 className="text-xl font-semibold mb-4">Pioneering Firms & Innovation</h3>
        <p className="text-gray-700">
          {privateSectorFirm || 'Pioneering firm information not available.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default PrivateSectorSection;
