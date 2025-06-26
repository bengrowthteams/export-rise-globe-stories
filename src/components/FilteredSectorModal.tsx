
import React from 'react';
import { X, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { getSectorColor } from '../data/sectorColors';

interface FilteredSectorModalProps {
  countryStories: CountrySuccessStories;
  selectedSectors: string[];
  onSectorSelect: (sector: SectorStory) => void;
  onClose: () => void;
}

const FilteredSectorModal: React.FC<FilteredSectorModalProps> = ({
  countryStories,
  selectedSectors,
  onSectorSelect,
  onClose
}) => {
  // Filter sectors to only show those that are in the selected sectors
  const filteredSectors = countryStories.sectors.filter(sector => 
    selectedSectors.includes(sector.sector)
  );

  const calculateRankingGain = (rank1995: number, rank2022: number): number => {
    return rank1995 - rank2022;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{countryStories.flag}</span>
              <div>
                <h2 className="text-2xl font-bold">{countryStories.country}</h2>
                <p className="text-gray-600">Select from filtered sectors</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Sectors Grid */}
          <div className="p-6">
            <div className="grid gap-4">
              {filteredSectors.map((sector, index) => {
                const rankingGain = calculateRankingGain(sector.globalRanking1995, sector.globalRanking2022);
                const gainColor = rankingGain > 0 ? 'text-green-600' : rankingGain < 0 ? 'text-red-600' : 'text-gray-600';
                const gainPrefix = rankingGain > 0 ? '+' : '';
                const sectorColor = getSectorColor(sector.sector);
                
                return (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onSectorSelect(sector)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div
                          className="w-4 h-4 rounded-full mt-1 border-2 border-white shadow-sm"
                          style={{ backgroundColor: sectorColor }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {sector.sector}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 capitalize">
                            <strong>Successful Product:</strong> {sector.successfulProduct}
                          </p>
                          
                          <div className="flex items-center space-x-2">
                            <TrendingUp size={16} className={rankingGain > 0 ? 'text-green-600' : 'text-gray-600'} />
                            <span className={`text-sm font-medium ${gainColor}`}>
                              Ranking Gain: {gainPrefix}{rankingGain}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSectorSelect(sector);
                        }}
                      >
                        Explore
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteredSectorModal;
