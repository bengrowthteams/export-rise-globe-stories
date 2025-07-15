
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
          {successStory && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Success Story</h3>
              <p className="text-gray-700">{successStory}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {publicSectorPolicy && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Public Sector</h4>
                <p className="text-sm text-blue-700">{publicSectorPolicy}</p>
              </div>
            )}

            {privateSectorGrowth && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Private Sector</h4>
                <p className="text-sm text-purple-700">{privateSectorGrowth}</p>
              </div>
            )}

            {externalFactors && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">External Factors</h4>
                <p className="text-sm text-green-700">{externalFactors}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformationOverview;
