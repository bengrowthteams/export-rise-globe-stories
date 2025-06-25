
import React from 'react';
import { X, Building2, TrendingUp } from 'lucide-react';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { Button } from '@/components/ui/button';

interface SectorSidebarProps {
  countryStories: CountrySuccessStories | null;
  selectedSector: SectorStory | null;
  onSectorSelect: (sector: SectorStory) => void;
  onClose: () => void;
}

const SectorSidebar: React.FC<SectorSidebarProps> = ({
  countryStories,
  selectedSector,
  onSectorSelect,
  onClose
}) => {
  if (!countryStories || !countryStories.hasMutipleSectors) return null;

  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{countryStories.flag}</span>
            <h2 className="text-lg font-bold">{countryStories.country}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-600">
          {countryStories.sectors.length} success stories across different sectors
        </p>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Building2 size={16} className="mr-2" />
          Select a Sector
        </h3>
        
        <div className="space-y-2">
          {countryStories.sectors.map((sector, index) => (
            <button
              key={index}
              onClick={() => onSectorSelect(sector)}
              className={`w-full p-3 rounded-lg border text-left transition-all ${
                selectedSector?.sector === sector.sector
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {sector.sector}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {sector.product}
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp size={12} className="mr-1" />
                    Rank #{sector.globalRanking2022} (2022)
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorSidebar;
