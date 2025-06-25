
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { fetchSuccessStories, fetchCountryStories } from '../services/countryDataService';

interface SearchBarProps {
  onCountrySelect: (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => void;
}

interface SearchResult {
  type: 'single' | 'multi';
  country: string;
  flag: string;
  sector?: string; // For single-sector countries
  sectorCount?: number; // For multi-sector countries
  story?: SuccessStory;
  countryStories?: CountrySuccessStories;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCountrySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [countryStories, setCountryStories] = useState<CountrySuccessStories[]>([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load success stories on component mount
  useEffect(() => {
    const loadSuccessStories = async () => {
      try {
        setLoading(true);
        const [stories, multiSectorStories] = await Promise.all([
          fetchSuccessStories(),
          fetchCountryStories()
        ]);
        setSuccessStories(stories);
        setCountryStories(multiSectorStories);
      } catch (error) {
        console.error('Failed to load success stories for search:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSuccessStories();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '' || loading || (successStories.length === 0 && countryStories.length === 0)) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchResults: SearchResult[] = [];

    // Search single-sector countries
    successStories.forEach(story => {
      if (story.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.sector.toLowerCase().includes(searchTerm.toLowerCase())) {
        searchResults.push({
          type: 'single',
          country: story.country,
          flag: story.flag,
          sector: story.sector,
          story
        });
      }
    });

    // Search multi-sector countries
    countryStories.forEach(countryStory => {
      const countryMatch = countryStory.country.toLowerCase().includes(searchTerm.toLowerCase());
      const sectorMatch = countryStory.sectors.some(sector => 
        sector.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (countryMatch || sectorMatch) {
        searchResults.push({
          type: 'multi',
          country: countryStory.country,
          flag: countryStory.flag,
          sectorCount: countryStory.sectors.length,
          countryStories: countryStory
        });
      }
    });
    
    setSuggestions(searchResults);
    setShowSuggestions(searchResults.length > 0);
    setSelectedIndex(-1);
  }, [searchTerm, successStories, countryStories, loading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (result: SearchResult) => {
    setSearchTerm(result.country);
    setShowSuggestions(false);
    
    if (result.type === 'single' && result.story) {
      onCountrySelect(result.story);
    } else if (result.type === 'multi' && result.countryStories) {
      // Create a primary story for the multi-sector country
      const primaryStory: SuccessStory = {
        id: `${result.countryStories.id}-${result.countryStories.primarySector.sector}`,
        country: result.countryStories.country,
        sector: result.countryStories.primarySector.sector,
        product: result.countryStories.primarySector.product,
        description: result.countryStories.primarySector.description,
        growthRate: result.countryStories.primarySector.growthRate,
        timeframe: result.countryStories.timeframe,
        exportValue: result.countryStories.primarySector.exportValue,
        keyFactors: result.countryStories.primarySector.keyFactors,
        coordinates: result.countryStories.coordinates,
        flag: result.countryStories.flag,
        marketDestinations: result.countryStories.primarySector.marketDestinations,
        challenges: result.countryStories.primarySector.challenges,
        impact: result.countryStories.primarySector.impact,
        globalRanking1995: result.countryStories.primarySector.globalRanking1995,
        globalRanking2022: result.countryStories.primarySector.globalRanking2022,
        initialExports1995: result.countryStories.primarySector.initialExports1995,
        initialExports2022: result.countryStories.primarySector.initialExports2022,
        successfulProduct: result.countryStories.primarySector.successfulProduct,
        successStorySummary: result.countryStories.primarySector.successStorySummary
      };
      onCountrySelect(primaryStory, result.countryStories);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (searchTerm && !loading) {
      const searchResults: SearchResult[] = [];

      // Search single-sector countries
      successStories.forEach(story => {
        if (story.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.sector.toLowerCase().includes(searchTerm.toLowerCase())) {
          searchResults.push({
            type: 'single',
            country: story.country,
            flag: story.flag,
            sector: story.sector,
            story
          });
        }
      });

      // Search multi-sector countries
      countryStories.forEach(countryStory => {
        const countryMatch = countryStory.country.toLowerCase().includes(searchTerm.toLowerCase());
        const sectorMatch = countryStory.sectors.some(sector => 
          sector.sector.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (countryMatch || sectorMatch) {
          searchResults.push({
            type: 'multi',
            country: countryStory.country,
            flag: countryStory.flag,
            sectorCount: countryStory.sectors.length,
            countryStories: countryStory
          });
        }
      });
      
      setSuggestions(searchResults);
      setShowSuggestions(searchResults.length > 0);
    }
  };

  const totalCountries = successStories.length + countryStories.length;

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={loading ? "Loading..." : `Search ${totalCountries} countries...`}
          disabled={loading}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm disabled:bg-gray-100"
        />
        {searchTerm && !loading && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((result, index) => (
            <div
              key={`${result.country}-${result.type}`}
              onClick={() => handleSuggestionClick(result)}
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
      )}
    </div>
  );
};

export default SearchBar;
