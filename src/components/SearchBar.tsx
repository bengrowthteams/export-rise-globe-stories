
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SuccessStory } from '../types/SuccessStory';
import { fetchSuccessStories } from '../services/countryDataService';

interface SearchBarProps {
  onCountrySelect: (story: SuccessStory) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCountrySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SuccessStory[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load success stories on component mount
  useEffect(() => {
    const loadSuccessStories = async () => {
      try {
        setLoading(true);
        const stories = await fetchSuccessStories();
        setSuccessStories(stories);
      } catch (error) {
        console.error('Failed to load success stories for search:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSuccessStories();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '' || loading || successStories.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = successStories.filter(story =>
      story.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(-1);
  }, [searchTerm, successStories, loading]);

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

  const handleSuggestionClick = (story: SuccessStory) => {
    setSearchTerm(story.country);
    setShowSuggestions(false);
    onCountrySelect(story);
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
      const filtered = successStories.filter(story =>
        story.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
  };

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
          placeholder={loading ? "Loading..." : `Search ${successStories.length} countries...`}
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
          {suggestions.map((story, index) => (
            <div
              key={story.id}
              onClick={() => handleSuggestionClick(story)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{story.flag}</span>
                <div>
                  <div className="font-medium text-gray-900">{story.country}</div>
                  <div className="text-sm text-gray-600">{story.sector}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
