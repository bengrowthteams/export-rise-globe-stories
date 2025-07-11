
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  loading: boolean;
  totalCountries: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  loading,
  totalCountries,
  onInputChange,
  onKeyDown,
  onFocus,
  onClear,
  inputRef
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={loading ? "Loading..." : `Search ${totalCountries} countries...`}
        disabled={loading}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm disabled:bg-gray-100"
      />
      {searchTerm && !loading && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
