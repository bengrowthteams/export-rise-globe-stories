
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen } from 'lucide-react';

interface FurtherReadingSectionProps {
  sources: string;
}

const FurtherReadingSection = ({ sources }: FurtherReadingSectionProps) => {
  // Parse sources into individual links
  const parseSourceLinks = (sourcesText: string) => {
    if (!sourcesText) return [];
    
    const urlRegex = /(https?:\/\/[^\s,;]+)/g;
    const urls = sourcesText.match(urlRegex) || [];
    
    return urls.map((url, index) => {
      // Extract domain for display
      const domain = url.replace(/^https?:\/\//, '').split('/')[0];
      return {
        url: url.trim(),
        displayText: domain,
        fullUrl: url.trim()
      };
    });
  };

  const sourceLinks = parseSourceLinks(sources);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="text-gray-700" size={24} />
          <span>Sources & References</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sourceLinks.length > 0 ? (
          <div className="space-y-3">
            <p className="text-gray-600 mb-4">Data and analysis based on the following sources:</p>
            <ul className="space-y-2">
              {sourceLinks.map((source, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <ExternalLink size={16} className="text-blue-600 flex-shrink-0" />
                  <a
                    href={source.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                  >
                    {source.displayText}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-600">
            <p className="mb-2">Source information:</p>
            <p className="text-sm bg-white p-3 rounded border italic">
              {sources || 'Sources not available'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FurtherReadingSection;
