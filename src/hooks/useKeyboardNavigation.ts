
import { SearchResult } from '../components/search-bar/SearchSuggestions';

interface UseKeyboardNavigationProps {
  showSuggestions: boolean;
  suggestions: SearchResult[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  setShowSuggestions: (show: boolean) => void;
  onSuggestionSelect: (result: SearchResult) => void;
}

export const useKeyboardNavigation = ({
  showSuggestions,
  suggestions,
  selectedIndex,
  setSelectedIndex,
  setShowSuggestions,
  onSuggestionSelect
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(selectedIndex < suggestions.length - 1 ? selectedIndex + 1 : selectedIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          onSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return { handleKeyDown };
};
