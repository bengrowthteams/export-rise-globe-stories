
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen } from 'lucide-react';

interface SourcesBibliographyProps {
  sources: string;
}

const SourcesBibliography = ({ sources }: SourcesBibliographyProps) => {
  // Parse sources into individual links and extract page titles
  const parseSourceLinks = (sourcesText: string) => {
    const urlRegex = /(https?:\/\/[^\s,;]+)/g;
    const urls = sourcesText.match(urlRegex) || [];
    
    return urls.map((url, index) => {
      const urlObj = new URL(url.trim());
      const domain = urlObj.hostname.replace(/^www\./, '');
      const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
      
      let displayTitle = domain;
      
      // Extract meaningful title from URL structure
      if (pathParts.length > 0) {
        // Get the last meaningful part of the path
        const lastPart = pathParts[pathParts.length - 1];
        
        // Remove file extensions and clean up
        const cleanPath = lastPart
          .replace(/\.(html|htm|pdf|doc|docx)$/i, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        
        if (cleanPath.length > 3) {
          displayTitle = cleanPath;
        }
        
        // Add context from earlier path parts if helpful
        if (pathParts.length > 1) {
          const contextPart = pathParts[pathParts.length - 2];
          const cleanContext = contextPart
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
          
          if (cleanContext.length > 2 && !displayTitle.includes(cleanContext)) {
            displayTitle = `${cleanContext}: ${displayTitle}`;
          }
        }
      }
      
      // Add domain context for better identification
      if (domain.includes('worldbank.org')) {
        displayTitle = `${displayTitle} - World Bank`;
      } else if (domain.includes('unctad.org')) {
        displayTitle = `${displayTitle} - UNCTAD`;
      } else if (domain.includes('imf.org')) {
        displayTitle = `${displayTitle} - IMF`;
      } else if (domain.includes('wto.org')) {
        displayTitle = `${displayTitle} - WTO`;
      } else if (domain.includes('oecd.org')) {
        displayTitle = `${displayTitle} - OECD`;
      } else {
        // Add domain for less known sources
        const domainName = domain
          .replace(/\.(com|org|net|gov|edu)$/, '')
          .split('.')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
        
        if (!displayTitle.toLowerCase().includes(domainName.toLowerCase())) {
          displayTitle = `${displayTitle} - ${domainName}`;
        }
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
