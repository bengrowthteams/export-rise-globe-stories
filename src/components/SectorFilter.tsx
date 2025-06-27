
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
      <div className={`bg-white border border-gray-200 rounded-lg shadow-lg p-6 ${isCompact ? 'w-full' : 'absolute left-4 top-32 z-30 w-80'}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading sectors...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto ${isCompact ? 'w-full' : 'absolute left-4 top-32 z-30 w-80'}`}>
      <div className={`flex items-center justify-between border-b border-gray-200 ${isCompact ? 'p-3' : 'p-4'}`}>
        <h3 className={`font-semibold ${isCompact ? 'text-base' : 'text-lg'}`}>Filter by Sector</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className={isCompact ? 'p-3' : 'p-4'}>
        <div className={`flex justify-between items-center ${isCompact ? 'mb-3' : 'mb-4'}`}>
          <span className="text-sm text-gray-600">
            {selectedSectors.length} of {allSectors.length} selected
          </span>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <RotateCcw size={12} className="mr-1" />
            Reset
          </Button>
        </div>

        <div className={`space-y-${isCompact ? '1' : '2'}`}>
          {allSectors.map((sector) => {
            const isSelected = selectedSectors.includes(sector);
            const sectorColor = getSectorColor(sector);
            
            return (
              <button
                key={sector}
                onClick={() => onSectorToggle(sector)}
                className={`w-full flex items-center rounded-lg border transition-all text-left ${
                  isCompact ? 'p-2' : 'p-3'
                } ${
                  isSelected 
                    ? 'bg-gray-50 border-gray-300 shadow-sm' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div
                  className={`rounded-full mr-3 border-2 border-white shadow-sm ${
                    isCompact ? 'w-3 h-3' : 'w-4 h-4'
                  }`}
                  style={{ backgroundColor: sectorColor }}
                />
                <span className={`${isCompact ? 'text-xs' : 'text-sm'} ${isSelected ? 'font-medium' : ''}`}>
                  {sector}
                </span>
                {isSelected && (
                  <div className="ml-auto">
                    <div className={`bg-blue-500 rounded-full ${isCompact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
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
