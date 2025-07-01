
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
  
  const formatTextWithBullets = (text: string): JSX.Element[] => {
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    return sentences.map((sentence, index) => (
      <div key={index} className="flex items-start space-x-2 mb-2">
        <span className="text-gray-600 mt-1">●</span>
        <span className="text-gray-700 text-sm leading-relaxed">{sentence.trim()}.</span>
      </div>
    ));
  };

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
      icon: Globe,
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
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Story</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {sections.map((section, index) => (
          <Card key={index} className={`${section.bgColor} ${section.borderColor} border-2 h-full`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <section.icon className={section.color} size={20} />
                <div>
                  <h3 className={`text-sm font-bold ${section.color}`}>
                    {section.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-normal">{section.subtitle}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div>
                {formatTextWithBullets(section.content)}
              </div>
              
              <div className="bg-white/50 p-3 rounded-lg">
                <h4 className={`font-semibold ${section.color} mb-1 text-sm`}>Key Actor/Implementation</h4>
                {formatTextWithBullets(section.actor)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetailedAnalysisSection;
