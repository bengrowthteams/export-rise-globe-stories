
import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSectorColor, getAllSectors } from '../data/sectorColors';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';

interface SectorFilterProps {
  stories: SuccessStory[];
  countryStories: CountrySuccessStories[];
  selectedSectors: string[];
  onSectorToggle: (sector: string) => void;
  onReset: () => void;
  onClose: () => void;
  isVisible: boolean;
  isCompact?: boolean;
}

const SectorFilter: React.FC<SectorFilterProps> = ({
  stories,
  countryStories,
  selectedSectors,
  onSectorToggle,
  onReset,
  onClose,
  isVisible,
  isCompact = false
}) => {
  if (!isVisible) return null;

  const allSectors = getAllSectors(stories, countryStories);

  // Show loading state only if no data is available
  if (stories.length === 0 && countryStories.length === 0) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4 ${isCompact ? 'w-full' : 'absolute left-4 top-32 z-30 w-72'}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading sectors...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg ${isCompact ? 'w-full' : 'absolute left-4 top-32 z-30 w-72'}`}>
      <div className={`flex items-center justify-between border-b border-gray-200 ${isCompact ? 'p-2' : 'p-3'}`}>
        <h3 className={`font-semibold ${isCompact ? 'text-sm' : 'text-base'}`}>Filter by Sector</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <div className={isCompact ? 'p-2' : 'p-3'}>
        <div className={`flex justify-between items-center ${isCompact ? 'mb-2' : 'mb-3'}`}>
          <span className="text-xs text-gray-600">
            {selectedSectors.length} of {allSectors.length} selected
          </span>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="text-xs px-2 py-1 h-auto"
          >
            <RotateCcw size={10} className="mr-1" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-1 max-h-none">
          {allSectors.map((sector) => {
            const isSelected = selectedSectors.includes(sector);
            const sectorColor = getSectorColor(sector);
            
            return (
              <button
                key={sector}
                onClick={() => onSectorToggle(sector)}
                className={`w-full flex items-center rounded-md border transition-all text-left p-2 ${
                  isSelected 
                    ? 'bg-gray-50 border-gray-300 shadow-sm' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full mr-2 border border-white shadow-sm"
                  style={{ backgroundColor: sectorColor }}
                />
                <span className={`text-xs ${isSelected ? 'font-medium' : ''}`}>
                  {sector}
                </span>
                {isSelected && (
                  <div className="ml-auto">
                    <div className="bg-blue-500 rounded-full w-1 h-1" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectorFilter;
