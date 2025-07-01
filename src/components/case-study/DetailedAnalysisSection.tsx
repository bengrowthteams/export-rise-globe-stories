
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, ArrowRight } from 'lucide-react';

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
  const sections = [
    {
      icon: FileText,
      title: 'Policy Framework',
      subtitle: 'Government Strategy & Implementation',
      content: publicSectorPolicy,
      actor: publicSectorActor,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Briefcase,
      title: 'Industry Growth',
      subtitle: 'Private Sector Development',
      content: privateSectorIndustryGrowth,
      actor: privateSectorPioneeringFirm,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: ArrowRight,
      title: 'Market Factors',
      subtitle: 'External Opportunities & Challenges',
      content: externalMarketFactors,
      actor: externalActorContribution,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the Story</h2>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index} className={`${section.bgColor} ${section.borderColor} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <section.icon className={section.color} size={24} />
                <div>
                  <h3 className={`text-xl font-bold ${section.color}`}>
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-normal">{section.subtitle}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
              
              <div className="bg-white/50 p-4 rounded-lg">
                <h4 className={`font-semibold ${section.color} mb-2`}>Key Actor/Implementation</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {section.actor}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetailedAnalysisSection;
