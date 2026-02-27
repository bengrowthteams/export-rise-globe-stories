
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
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/40',
      borderColor: 'border-blue-800/50'
    },
    {
      icon: Factory,
      title: 'Private Sector Role',
      content: privateSectorSummary,
      color: 'text-orange-400',
      bgColor: 'bg-orange-950/40',
      borderColor: 'border-orange-800/50'
    },
    {
      icon: Globe,
      title: 'External Factors',
      content: externalFactorsSummary,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-800/50'
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Key Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {highlights.map((highlight, index) => (
          <Card key={index} className={`${highlight.bgColor} ${highlight.borderColor} border-2`}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center mb-3">
                <highlight.icon className={`${highlight.color} mr-2`} size={18} />
                <h3 className={`text-xs sm:text-sm font-semibold ${highlight.color}`}>
                  {highlight.title}
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
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
