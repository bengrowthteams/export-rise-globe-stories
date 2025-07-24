
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen } from 'lucide-react';

interface SourcesBibliographyProps {
  sources: string;
}

const SourcesBibliography = ({ sources }: SourcesBibliographyProps) => {
  // Parse sources into individual links and fetch titles
  const parseSourceLinks = (sourcesText: string) => {
    const urlRegex = /(https?:\/\/[^\s,;]+)/g;
    const urls = sourcesText.match(urlRegex) || [];
    
    return urls.map((url, index) => {
      // Extract domain for display as fallback
      const domain = url.replace(/^https?:\/\//, '').split('/')[0];
      
      // Generate a more readable title based on the URL structure
      let displayTitle = domain;
      
      // Common patterns for better titles
      if (domain.includes('worldbank.org')) {
        displayTitle = 'World Bank Group';
      } else if (domain.includes('unctad.org')) {
        displayTitle = 'UNCTAD - United Nations Conference on Trade and Development';
      } else if (domain.includes('imf.org')) {
        displayTitle = 'International Monetary Fund';
      } else if (domain.includes('wto.org')) {
        displayTitle = 'World Trade Organization';
      } else if (domain.includes('oecd.org')) {
        displayTitle = 'Organisation for Economic Co-operation and Development';
      } else {
        // Capitalize and format domain names
        displayTitle = domain
          .replace(/\.(com|org|net|gov|edu)$/, '')
          .split('.')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
      }
      
      return {
        url: url.trim(),
        displayText: displayTitle,
        fullUrl: url.trim()
      };
    });
  };

  const sourceLinks = parseSourceLinks(sources);

  return (
    <div className="mb-8">
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-700">
            <BookOpen size={24} />
            <span>Dive in Deeper</span>
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
                      className="text-blue-600 hover:text-blue-800 hover:underline break-words"
                    >
                      {source.displayText}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-gray-600">
              <p className="mb-2">Raw source information:</p>
              <p className="text-sm bg-white p-3 rounded border italic">
                {sources}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SourcesBibliography;
