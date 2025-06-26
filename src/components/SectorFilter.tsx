
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
}

const SectorFilter: React.FC<SectorFilterProps> = ({
  stories,
  countryStories,
  selectedSectors,
  onSectorToggle,
  onReset,
  onClose,
  isVisible
}) => {
  const allSectors = getAllSectors(stories, countryStories);

  if (!isVisible) return null;

  return (
    <div className="absolute left-4 top-32 z-30 w-80 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Filter by Sector</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
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

        <div className="space-y-2">
          {allSectors.map((sector) => {
            const isSelected = selectedSectors.includes(sector);
            const sectorColor = getSectorColor(sector);
            
            return (
              <button
                key={sector}
                onClick={() => onSectorToggle(sector)}
                className={`w-full flex items-center p-3 rounded-lg border transition-all text-left ${
                  isSelected 
                    ? 'bg-gray-50 border-gray-300 shadow-sm' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full mr-3 border-2 border-white shadow-sm`}
                  style={{ backgroundColor: sectorColor }}
                />
                <span className={`text-sm ${isSelected ? 'font-medium' : ''}`}>
                  {sector}
                </span>
                {isSelected && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
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
