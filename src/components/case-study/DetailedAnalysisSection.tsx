
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Factory, Globe, Users, Briefcase } from 'lucide-react';

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
  
  const formatBulletPoints = (text: string) => {
    // Only format if text contains bullets (●) - don't add bullets where they don't exist
    if (text.includes('●')) {
      const parts = text.split('●');
      const firstPart = parts[0].trim();
      const bulletParts = parts.slice(1);
      
      return (
        <div>
          {/* First part without bullet if it exists */}
          {firstPart && <p className="mb-3">{firstPart}</p>}
          {/* Bullet points */}
          {bulletParts.map((point, index) => {
            if (!point.trim()) return null;
            return (
              <div key={index} className="flex items-start mb-2">
                <span className="text-gray-400 mr-2 mt-1">●</span>
                <span className="flex-1">{point.trim()}</span>
              </div>
            );
          }).filter(Boolean)}
        </div>
      );
    }
    // If no bullets, return as regular paragraph
    return <p>{text}</p>;
  };

  const sections = [
    {
      title: 'Public Sector Role',
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/40',
      borderColor: 'border-blue-800/50',
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
      title: 'Private Sector Role',
      color: 'text-orange-400',
      bgColor: 'bg-orange-950/40',
      borderColor: 'border-orange-800/50',
      icon: Factory,
      subsections: [
        {
          title: 'Pioneering Firms',
          icon: Factory,
          content: privateSectorPioneeringFirm
        },
        {
          title: 'Industry Growth',
          icon: Briefcase,
          content: privateSectorIndustryGrowth
        }
      ]
    },
    {
      title: 'External Factors Role',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-800/50',
      icon: Globe,
      subsections: [
        {
          title: 'Market Factors',
          icon: Globe,
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
      <h2 className="text-2xl font-semibold text-white mb-6">Understanding the Story</h2>

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
                  <div key={subIndex} className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className={`flex items-center mb-3 ${section.color}`}>
                      <subsection.icon size={20} className="mr-2" />
                      <h4 className="text-lg font-semibold">{subsection.title}</h4>
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      {formatBulletPoints(subsection.content)}
                    </div>
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
