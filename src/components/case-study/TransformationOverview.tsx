
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TransformationOverviewProps {
  successStory: string;
  externalFactors: string;
  privateSectorGrowth: string;
  publicSectorPolicy: string;
}

const TransformationOverview = ({ 
  successStory,
  externalFactors,
  privateSectorGrowth,
  publicSectorPolicy
}: TransformationOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="text-green-600" size={24} />
          <span>Transformation Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Success Story</h3>
            <p className="text-gray-700 leading-relaxed">
              {successStory}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Public Sector</h4>
              <p className="text-sm text-gray-700">
                {publicSectorPolicy}
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Private Sector</h4>
              <p className="text-sm text-gray-700">
                {privateSectorGrowth}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">External Factors</h4>
              <p className="text-sm text-gray-700">
                {externalFactors}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformationOverview;
