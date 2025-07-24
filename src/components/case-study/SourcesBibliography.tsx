import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen, Loader2 } from 'lucide-react';
import { FirecrawlService } from '@/utils/FirecrawlService';

interface SourcesBibliographyProps {
  sources: string;
}

interface SourceLink {
  url: string;
  displayText: string;
  fullUrl: string;
  loading?: boolean;
}

const SourcesBibliography = ({ sources }: SourcesBibliographyProps) => {
  const [sourceLinks, setSourceLinks] = useState<SourceLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Parse sources into individual links
  const parseSourceLinks = (sourcesText: string): SourceLink[] => {
    const urlRegex = /(https?:\/\/[^\s,;]+)/g;
    const urls = sourcesText.match(urlRegex) || [];
    
    return urls.map((url) => ({
      url: url.trim(),
      displayText: 'Loading title...',
      fullUrl: url.trim(),
      loading: true
    }));
  };

  useEffect(() => {
    const fetchTitles = async () => {
      if (!sources) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const initialLinks = parseSourceLinks(sources);
      setSourceLinks(initialLinks);

      // Fetch titles for each URL with timeout
      const updatedLinks = await Promise.allSettled(
        initialLinks.map(async (link) => {
          try {
            const title = await Promise.race([
              FirecrawlService.fetchPageTitle(link.fullUrl),
              new Promise<string>((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 10000)
              )
            ]);
            return {
              ...link,
              displayText: title,
              loading: false
            };
          } catch (error) {
            console.error('Error fetching title for', link.fullUrl, error);
            // Generate fallback title immediately
            const domain = link.fullUrl.replace(/^https?:\/\//, '').split('/')[0];
            return {
              ...link,
              displayText: domain.replace(/^www\./, ''),
              loading: false
            };
          }
        })
      );

      const finalLinks = updatedLinks.map(result => 
        result.status === 'fulfilled' ? result.value : {
          url: '',
          displayText: 'Failed to load',
          fullUrl: '',
          loading: false
        }
      );

      setSourceLinks(finalLinks);
      setIsLoading(false);
    };

    fetchTitles();
  }, [sources]);

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
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading page titles...</span>
            </div>
          ) : sourceLinks.length > 0 ? (
            <div className="space-y-3">
              <p className="text-gray-600 mb-4">Data and analysis based on the following sources:</p>
              <ul className="space-y-2">
                {sourceLinks.map((source, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <ExternalLink size={16} className="text-blue-600 flex-shrink-0" />
                    {source.loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 size={12} className="animate-spin text-gray-400" />
                        <span className="text-gray-500">Loading...</span>
                      </div>
                    ) : (
                      <a
                        href={source.fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline break-words"
                      >
                        {source.displayText}
                      </a>
                    )}
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