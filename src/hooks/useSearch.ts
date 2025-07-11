
import { useState, useEffect } from 'react';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { fetchSuccessStories, fetchCountryStories } from '../services/countryDataService';
import { SearchResult } from '../components/search-bar/SearchSuggestions';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [countryStories, setCountryStories] = useState<CountrySuccessStories[]>([]);
  const [loading, setLoading] = useState(true);

  // Load success stories on hook initialization
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

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '' || loading || (successStories.length === 0 && countryStories.length === 0)) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchResults: SearchResult[] = [];

    // Search single-sector countries by country name only
    successStories.forEach(story => {
      if (story.country.toLowerCase().includes(searchTerm.toLowerCase())) {
        searchResults.push({
          type: 'single',
          country: story.country,
          flag: story.flag,
          sector: story.sector,
          story
        });
      }
    });

    // Search multi-sector countries by country name only
    countryStories.forEach(countryStory => {
      if (countryStory.country.toLowerCase().includes(searchTerm.toLowerCase())) {
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

  const generateSearchResults = (term: string): SearchResult[] => {
    if (!term || loading) return [];

    const searchResults: SearchResult[] = [];

    // Search single-sector countries
    successStories.forEach(story => {
      if (story.country.toLowerCase().includes(term.toLowerCase())) {
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
      if (countryStory.country.toLowerCase().includes(term.toLowerCase())) {
        searchResults.push({
          type: 'multi',
          country: countryStory.country,
          flag: countryStory.flag,
          sectorCount: countryStory.sectors.length,
          countryStories: countryStory
        });
      }
    });

    return searchResults;
  };

  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    setSelectedIndex,
    loading,
    totalCountries: successStories.length + countryStories.length,
    generateSearchResults
  };
};
