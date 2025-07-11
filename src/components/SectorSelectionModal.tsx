
import React from 'react';
import { X } from 'lucide-react';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { Button } from '@/components/ui/button';

interface SectorSelectionModalProps {
  countryStories: CountrySuccessStories;
  onSectorSelect: (sector: SectorStory) => void;
  onClose: () => void;
}

const SectorSelectionModal: React.FC<SectorSelectionModalProps> = ({
  countryStories,
  onSectorSelect,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{countryStories.flag}</span>
            <div>
              <h2 className="text-xl font-bold">{countryStories.country}</h2>
              <p className="text-gray-600">Select a Sector to Explore</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {countryStories.sectors.map((sector, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{sector.sector}</h3>
                    <p className="text-gray-600 text-sm capitalize mb-2">{sector.successfulProduct}</p>
                    <p className="text-gray-700 text-sm line-clamp-2">{sector.description}</p>
                  </div>
                  <Button
                    onClick={() => onSectorSelect(sector)}
                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorSelectionModal;
