
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Globe } from 'lucide-react';

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
  
  const formatText = (text: string): string[] => {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding the Story</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Public Sector Section */}
        <Card className="bg-blue-50 border-blue-200 border-2 h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="text-blue-600" size={20} />
              <div>
                <h3 className="text-sm font-bold text-blue-600">Public Sector Role</h3>
                <p className="text-xs text-gray-600 font-normal">Government Strategy & Implementation</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2 text-sm">Policy Framework</h4>
              <div className="space-y-2">
                {formatText(publicSectorPolicy).map((sentence, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-600 mb-2 text-sm">Key Actor</h4>
              <div className="space-y-2">
                {formatText(publicSectorActor).map((sentence, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Private Sector Section */}
        <Card className="bg-orange-50 border-orange-200 border-2 h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="text-orange-600" size={20} />
              <div>
                <h3 className="text-sm font-bold text-orange-600">Private Sector Role</h3>
                <p className="text-xs text-gray-600 font-normal">Industry Development</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <h4 className="font-semibold text-orange-600 mb-2 text-sm">Pioneering Firm</h4>
              <div className="space-y-2">
                {formatText(privateSectorPioneeringFirm).map((sentence, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-600 mb-2 text-sm">Industry Growth</h4>
              <div className="space-y-2">
                {formatText(privateSectorIndustryGrowth).map((sentence, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Factors Section */}
        <Card className="bg-green-50 border-green-200 border-2 h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="text-green-600" size={20} />
              <div>
                <h3 className="text-sm font-bold text-green-600">External Factors</h3>
                <p className="text-xs text-gray-600 font-normal">Market Opportunities & Challenges</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <h4 className="font-semibold text-green-600 mb-2 text-sm">Market Factors</h4>
              <div className="space-y-2">
                {formatText(externalMarketFactors).map((sentence, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-600 mb-2 text-sm">External Actor Contribution</h4>
              <div className="space-y-2">
                {formatText(externalActorContribution).map((sentence, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailedAnalysisSection;
