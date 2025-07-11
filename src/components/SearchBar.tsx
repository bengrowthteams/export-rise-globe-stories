
import React, { useRef, useEffect } from 'react';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import SearchInput from './search-bar/SearchInput';
import SearchSuggestions, { SearchResult } from './search-bar/SearchSuggestions';
import { useSearch } from '../hooks/useSearch';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface SearchBarProps {
  onCountrySelect: (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCountrySelect }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    setSelectedIndex,
    loading,
    totalCountries,
    generateSearchResults
  } = useSearch();

  const handleSuggestionClick = (result: SearchResult) => {
    setSearchTerm(result.country);
    setShowSuggestions(false);
    
    if (result.type === 'single' && result.story) {
      onCountrySelect(result.story);
    } else if (result.type === 'multi' && result.countryStories) {
      // Create a primary story for the multi-sector country
      const primaryStory: SuccessStory = {
        id: `${result.countryStories.id}-${result.countryStories.primarySector.sector}`,
        primaryKey: result.countryStories.primarySector.primaryKey,
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

  const { handleKeyDown } = useKeyboardNavigation({
    showSuggestions,
    suggestions,
    selectedIndex,
    setSelectedIndex,
    setShowSuggestions,
    onSuggestionSelect: handleSuggestionClick
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    if (searchTerm && !loading) {
      const searchResults = generateSearchResults(searchTerm);
      setShowSuggestions(searchResults.length > 0);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      <SearchInput
        searchTerm={searchTerm}
        loading={loading}
        totalCountries={totalCountries}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onClear={clearSearch}
        inputRef={inputRef}
      />

      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
