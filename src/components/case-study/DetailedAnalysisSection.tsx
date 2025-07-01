
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Factory, Globe } from 'lucide-react';

interface DetailedAnalysisSectionProps {
  publicSectorPolicy: string;
  publicSectorActor: string;
  privateSectorPioneeringFirm: string;
  privateSectorIndustryGrowth: string;
  externalMarketFactors: string;
  externalActorContribution: string;
}

const DetailedAnalysisSection = ({
  publicSectorPolicy,
  publicSectorActor,
  privateSectorPioneeringFirm,
  privateSectorIndustryGrowth,
  externalMarketFactors,
  externalActorContribution
}: DetailedAnalysisSectionProps) => {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding the Story</h2>
      
      {/* Public Sector Role */}
      <Card className="bg-blue-50 border-blue-200 border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Building2 size={24} />
            <span className="text-2xl font-bold">Public Sector Role</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Policy & Strategy</h4>
            <p className="text-gray-700 leading-relaxed">{publicSectorPolicy}</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Key Actors</h4>
            <p className="text-gray-700 leading-relaxed">{publicSectorActor}</p>
          </div>
        </CardContent>
      </Card>

      {/* Private Sector Role */}
      <Card className="bg-orange-50 border-orange-200 border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <Factory size={24} />
            <span className="text-2xl font-bold">Private Sector Role</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">Pioneering Firms</h4>
            <p className="text-gray-700 leading-relaxed">{privateSectorPioneeringFirm}</p>
          </div>
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">Industry Growth</h4>
            <p className="text-gray-700 leading-relaxed">{privateSectorIndustryGrowth}</p>
          </div>
        </CardContent>
      </Card>

      {/* External Factors Role */}
      <Card className="bg-green-50 border-green-200 border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Globe size={24} />
            <span className="text-2xl font-bold">External Factors Role</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Market Factors</h4>
            <p className="text-gray-700 leading-relaxed">{externalMarketFactors}</p>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">External Actors</h4>
            <p className="text-gray-700 leading-relaxed">{externalActorContribution}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedAnalysisSection;
