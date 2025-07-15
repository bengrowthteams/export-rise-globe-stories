
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Factory, Globe } from 'lucide-react';

interface DetailedAnalysisSectionProps {
  externalFactors: string;
  privateSectorGrowth: string;
  privateSectorFirm: string;
  publicSectorActor: string;
  publicSectorPolicy: string;
}

const DetailedAnalysisSection = ({
  externalFactors,
  privateSectorGrowth,
  privateSectorFirm,
  publicSectorActor,
  publicSectorPolicy
}: DetailedAnalysisSectionProps) => {
  
  const formatText = (text: string) => {
    if (!text) return 'Information not available';
    return text;
  };

  const sections = [
    {
      title: 'Public Sector Role',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Building2,
      content: [
        { label: 'Key Actors', text: formatText(publicSectorActor) },
        { label: 'Policy Framework', text: formatText(publicSectorPolicy) }
      ]
    },
    {
      title: 'Private Sector Role',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: Factory,
      content: [
        { label: 'Industry Growth', text: formatText(privateSectorGrowth) },
        { label: 'Pioneering Firms', text: formatText(privateSectorFirm) }
      ]
    },
    {
      title: 'External Factors',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: Globe,
      content: [
        { label: 'Key Factors', text: formatText(externalFactors) }
      ]
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detailed Analysis</h2>
      
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className={`${section.bgColor} ${section.borderColor} border-2`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-3 text-xl ${section.color}`}>
                <section.icon size={24} />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.content.map((item, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                    <h4 className={`text-base font-semibold mb-2 ${section.color}`}>
                      {item.label}
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {item.text}
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
