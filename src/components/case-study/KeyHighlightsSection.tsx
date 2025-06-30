
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Factory, Globe } from 'lucide-react';

interface KeyHighlightsSectionProps {
  publicSectorSummary: string;
  privateSectorSummary: string;
  externalFactorsSummary: string;
}

const KeyHighlightsSection = ({
  publicSectorSummary,
  privateSectorSummary,
  externalFactorsSummary
}: KeyHighlightsSectionProps) => {
  const highlights = [
    {
      icon: Building2,
      title: 'Public Sector Role',
      content: publicSectorSummary,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Factory,
      title: 'Private Sector Role',
      content: privateSectorSummary,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: Globe,
      title: 'External Factors',
      content: externalFactorsSummary,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <Card key={index} className={`${highlight.bgColor} ${highlight.borderColor} border-2`}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <highlight.icon className={`${highlight.color} mr-3`} size={24} />
                <h3 className={`text-lg font-semibold ${highlight.color}`}>
                  {highlight.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {highlight.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeyHighlightsSection;
