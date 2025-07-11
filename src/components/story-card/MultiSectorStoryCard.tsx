
import React, { useState, useEffect } from 'react';
import { X, TrendingUp, ArrowRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CountrySuccessStories, SectorStory } from '../../types/CountrySuccessStories';
import { SuccessStory } from '../../types/SuccessStory';
import { Button } from '@/components/ui/button';
import ReturnStateService from '../../services/returnStateService';
import { hasEnhancedCaseStudy, preloadEnhancedCaseStudyIds } from '../../services/enhancedCaseStudyService';

interface MultiSectorStoryCardProps {
  countryStories: CountrySuccessStories;
  selectedSector: SectorStory;
  selectedSectors: string[];
  onClose: () => void;
  onReadMore: (story: SuccessStory) => void;
  onSectorChange?: (sector: SectorStory) => void;
}

const MultiSectorStoryCard: React.FC<MultiSectorStoryCardProps> = ({ 
  countryStories, 
  selectedSector, 
  selectedSectors, 
  onClose, 
  onReadMore, 
  onSectorChange 
}) => {
  const navigate = useNavigate();

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount.replace(/[\$,]/g, ''));
    if (numAmount >= 1000000000) {
      return `$${(numAmount / 1000000000).toFixed(1)}B`;
    } else if (numAmount >= 1000000) {
      return `$${(numAmount / 1000000).toFixed(1)}M`;
    }
    return amount;
  };

  const calculateRankingGain = (rank1995: number, rank2022: number): number => {
    return rank1995 - rank2022;
  };

  const convertToLegacyStory = (): SuccessStory => ({
    id: `${countryStories.id}-${selectedSector.sector}`,
    primaryKey: selectedSector.primaryKey,
    country: countryStories.country,
    sector: selectedSector.sector,
    product: selectedSector.product,
    description: selectedSector.description,
    growthRate: selectedSector.growthRate,
    timeframe: countryStories.timeframe,
    exportValue: selectedSector.exportValue,
    keyFactors: selectedSector.keyFactors,
    coordinates: countryStories.coordinates,
    flag: countryStories.flag,
    marketDestinations: selectedSector.marketDestinations,
    challenges: selectedSector.challenges,
    impact: selectedSector.impact,
    globalRanking1995: selectedSector.globalRanking1995,
    globalRanking2022: selectedSector.globalRanking2022,
    initialExports1995: selectedSector.initialExports1995,
    initialExports2022: selectedSector.initialExports2022,
    successfulProduct: selectedSector.successfulProduct,
    successStorySummary: selectedSector.successStorySummary
  });

  const handleViewCaseStudy = () => {
    console.log('Multi-Sector Story Card - handleViewCaseStudy called for Primary key:', selectedSector.primaryKey);
    
    ReturnStateService.saveReturnState({
      selectedSectors,
      countryStories,
      selectedSector,
      country: countryStories.country,
      sector: selectedSector.sector
    });
    
    if (selectedSector.primaryKey && hasEnhancedCaseStudy(selectedSector.primaryKey)) {
      console.log('Multi-Sector Story Card - Navigating to enhanced case study:', selectedSector.primaryKey);
      navigate(`/enhanced-case-study/${selectedSector.primaryKey}`);
    } else {
      console.log('Multi-Sector Story Card - No enhanced case study, using onReadMore');
      onReadMore(convertToLegacyStory());
    }
  };

  const rankingGain = calculateRankingGain(selectedSector.globalRanking1995, selectedSector.globalRanking2022);
  const gainColor = rankingGain > 0 ? 'text-green-600' : rankingGain < 0 ? 'text-red-600' : 'text-gray-600';
  const gainPrefix = rankingGain > 0 ? '+' : '';

  // Show button for all sectors with primaryKey (simplified approach)
  const showEnhancedButton = selectedSector.primaryKey != null;

  return (
    <div className="h-full w-full bg-white shadow-2xl overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{countryStories.flag}</span>
            <div>
              <h2 className="text-xl font-bold">{countryStories.country}</h2>
              <p className="text-gray-600 text-sm">{selectedSector.sector}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sector Navigation */}
        {countryStories.sectors.length > 1 && onSectorChange && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Building2 size={16} className="mr-2" />
              Other Sectors ({countryStories.sectors.length - 1} more)
            </h3>
            <div className="flex flex-wrap gap-2">
              {countryStories.sectors
                .filter(sector => sector.sector !== selectedSector.sector)
                .map((sector, index) => (
                  <button
                    key={index}
                    onClick={() => onSectorChange(sector)}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition-colors"
                  >
                    {sector.sector}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Global Ranking Gain - Updated header text and emphasis on ranking gain */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Global Ranking Gain</h3>
          <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">#{selectedSector.globalRanking1995}</p>
                <p className="text-sm text-red-700">1995</p>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className={rankingGain > 0 ? 'text-green-600' : 'text-gray-600'} size={20} />
                <span className={`text-lg font-bold ${gainColor}`}>
                  {gainPrefix}{rankingGain} positions
                </span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">#{selectedSector.globalRanking2022}</p>
                <p className="text-sm text-green-700">2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Value Comparison - Reduced spacing */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Export Value Growth</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-bold text-gray-700">{formatCurrency(selectedSector.initialExports1995)}</p>
              <p className="text-sm text-gray-600">1995</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-blue-600" size={16} />
                <p className="text-lg font-bold text-blue-600">{formatCurrency(selectedSector.initialExports2022)}</p>
              </div>
              <p className="text-sm text-blue-700">2022</p>
            </div>
          </div>
        </div>

        {/* Successful Product - Reduced spacing */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2">Successful Product</h3>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="font-medium text-purple-800 capitalize text-sm">{selectedSector.successfulProduct}</p>
          </div>
        </div>

        {/* View Full Success Story Button - Static positioning, no loading state */}
        <div className="min-h-[3rem] flex items-end">
          {showEnhancedButton && (
            <Button 
              onClick={handleViewCaseStudy}
              className="w-full text-white bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              View Full Success Story
              <ArrowRight className="ml-2" size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSectorStoryCard;
