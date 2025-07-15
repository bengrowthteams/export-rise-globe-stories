
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
          <Factory className="text-purple-600" size={24} />
          <span>Private Sector Pioneering Firms & Industrial Growth</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Pioneering Firms</h3>
            <p className="text-gray-700 leading-relaxed">
              {privateSectorFirm}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Industry Growth</h3>
            <p className="text-gray-700 leading-relaxed">
              {privateSectorGrowth}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivateSectorSection;
