
import React from 'react';

export interface SearchResult {
  type: 'single' | 'multi';
  country: string;
  flag: string;
  sector?: string;
  sectorCount?: number;
  story?: any;
  countryStories?: any;
}

interface SearchSuggestionsProps {
  suggestions: SearchResult[];
  selectedIndex: number;
  onSuggestionClick: (result: SearchResult) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSuggestionClick
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
      {suggestions.map((result, index) => (
        <div
          key={`${result.country}-${result.type}`}
          onClick={() => onSuggestionClick(result)}
          className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
            index === selectedIndex ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">{result.flag}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{result.country}</div>
              {result.type === 'single' ? (
                <div className="text-sm text-gray-600">{result.sector}</div>
              ) : (
                <div className="text-sm text-purple-600 font-medium">
                  {result.sectorCount} Success Stories
                </div>
              )}
            </div>
            {result.type === 'multi' && (
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
