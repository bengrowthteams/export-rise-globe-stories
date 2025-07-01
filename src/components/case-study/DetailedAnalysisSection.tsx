
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Factory, Globe, Users, Briefcase, TrendingUp } from 'lucide-react';

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
      title: 'Public Sector Analysis',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Building2,
      subsections: [
        {
          title: 'Policy Framework',
          icon: Briefcase,
          content: publicSectorPolicy
        },
        {
          title: 'Key Actors',
          icon: Users,
          content: publicSectorActor
        }
      ]
    },
    {
      title: 'Private Sector Analysis',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: Factory,
      subsections: [
        {
          title: 'Pioneering Firms',
          icon: Factory,
          content: privateSectorPioneeringFirm
        },
        {
          title: 'Industry Growth',
          icon: TrendingUp,
          content: privateSectorIndustryGrowth
        }
      ]
    },
    {
      title: 'External Factors Analysis',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: Globe,
      subsections: [
        {
          title: 'Market Factors',
          icon: TrendingUp,
          content: externalMarketFactors
        },
        {
          title: 'External Actor Contribution',
          icon: Users,
          content: externalActorContribution
        }
      ]
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the Story</h2>
      
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className={`${section.bgColor} ${section.borderColor} border-2`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-3 text-2xl ${section.color}`}>
                <section.icon size={28} />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/50">
                    <div className={`flex items-center mb-3 ${section.color}`}>
                      <subsection.icon size={20} className="mr-2" />
                      <h4 className="text-lg font-semibold">{subsection.title}</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {subsection.content}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetailedAnalysisSection;
