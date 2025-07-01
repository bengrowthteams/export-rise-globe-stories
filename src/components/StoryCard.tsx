import React from 'react';
import { X, TrendingUp, ArrowRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { SuccessStory } from '../types/SuccessStory';
import { Button } from '@/components/ui/button';
import { getAvailableCaseStudyIds } from '@/services/caseStudyService';

interface StoryCardProps {
  story: SuccessStory | null;
  countryStories?: CountrySuccessStories | null;
  selectedSector?: SectorStory | null;
  onClose: () => void;
  onReadMore: (story: SuccessStory) => void;
  onSectorChange?: (sector: SectorStory) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ 
  story, 
  countryStories,
  selectedSector,
  onClose, 
  onReadMore,
  onSectorChange
}) => {
  // Handle legacy single-sector stories
  if (story && !countryStories) {
    return <LegacyStoryCard story={story} onClose={onClose} onReadMore={onReadMore} />;
  }

  // Handle multi-sector country stories
  if (countryStories && selectedSector) {
    return (
      <MultiSectorStoryCard 
        countryStories={countryStories}
        selectedSector={selectedSector}
        onClose={onClose}
        onReadMore={onReadMore}
        onSectorChange={onSectorChange}
      />
    );
  }

  return null;
};

// Legacy component for backwards compatibility
const LegacyStoryCard: React.FC<{
  story: SuccessStory;
  onClose: () => void;
  onReadMore: (story: SuccessStory) => void;
}> = ({ story, onClose, onReadMore }) => {
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

  // Check if this story has enhanced case study data
  const hasEnhancedCaseStudy = () => {
    const availableIds = getAvailableCaseStudyIds();
    // Handle both string and numeric IDs - convert story.id to number for comparison
    const storyId = typeof story.id === 'string' ? parseInt(story.id) : story.id;
    return availableIds.includes(storyId);
  };

  const handleViewCaseStudy = () => {
    if (hasEnhancedCaseStudy()) {
      // Convert string ID to number for navigation
      const numericId = typeof story.id === 'string' ? parseInt(story.id) : story.id;
      navigate(`/enhanced-case-study/${numericId}`);
    } else {
      onReadMore(story);
    }
  };

  const rankingGain = calculateRankingGain(story.globalRanking1995, story.globalRanking2022);
  const gainColor = rankingGain > 0 ? 'text-green-600' : rankingGain < 0 ? 'text-red-600' : 'text-gray-600';
  const gainPrefix = rankingGain > 0 ? '+' : '';

  return (
    <div className="h-full w-full bg-white shadow-2xl overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{story.flag}</span>
            <div>
              <h2 className="text-xl font-bold">{story.country}</h2>
              <p className="text-gray-600">{story.sector}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Enhanced Case Study Badge */}
        {hasEnhancedCaseStudy() && (
          <div className="mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800">Enhanced Case Study Available</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">Detailed analysis with professional insights</p>
            </div>
          </div>
        )}

        {/* Global Ranking Gain */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Global Ranking Gain 1995-2022</h3>
          <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">#{story.globalRanking1995}</p>
                <p className="text-sm text-red-700">1995</p>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className={rankingGain > 0 ? 'text-green-600' : 'text-gray-600'} size={20} />
                <span className={`text-lg font-bold ${gainColor}`}>
                  {gainPrefix}{rankingGain} positions
                </span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">#{story.globalRanking2022}</p>
                <p className="text-sm text-green-700">2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Value Comparison */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Export Value Growth</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-bold text-gray-700">{formatCurrency(story.initialExports1995)}</p>
              <p className="text-sm text-gray-600">1995</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-blue-600" size={16} />
                <p className="text-lg font-bold text-blue-600">{formatCurrency(story.initialExports2022)}</p>
              </div>
              <p className="text-sm text-blue-700">2022</p>
            </div>
          </div>
        </div>

        {/* Successful Product */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Successful Product</h3>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="font-medium text-purple-800 capitalize">{story.successfulProduct}</p>
          </div>
        </div>

        {/* Success Story Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Success Story</h3>
          <p className="text-gray-700 leading-relaxed">{story.successStorySummary}</p>
        </div>

        {/* Read More Button */}
        <Button 
          onClick={handleViewCaseStudy}
          className={`w-full text-white ${hasEnhancedCaseStudy() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          size="lg"
        >
          {hasEnhancedCaseStudy() ? 'View Enhanced Case Study' : 'View Full Case Study'}
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
};

// New multi-sector story card
const MultiSectorStoryCard: React.FC<{
  countryStories: CountrySuccessStories;
  selectedSector: SectorStory;
  onClose: () => void;
  onReadMore: (story: SuccessStory) => void;
  onSectorChange?: (sector: SectorStory) => void;
}> = ({ countryStories, selectedSector, onClose, onReadMore, onSectorChange }) => {
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

  // Convert to legacy format for onReadMore
  const convertToLegacyStory = (): SuccessStory => ({
    id: `${countryStories.id}-${selectedSector.sector}`,
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

  // Check if this story has enhanced case study data
  const hasEnhancedCaseStudy = () => {
    const availableIds = getAvailableCaseStudyIds();
    // Handle both string and numeric IDs
    const storyId = typeof countryStories.id === 'string' ? parseInt(countryStories.id) : parseInt(countryStories.id);
    return availableIds.includes(storyId);
  };

  const handleViewCaseStudy = () => {
    if (hasEnhancedCaseStudy()) {
      // Ensure numeric ID for navigation
      const numericId = typeof countryStories.id === 'string' ? parseInt(countryStories.id) : countryStories.id;
      navigate(`/enhanced-case-study/${numericId}`);
    } else {
      onReadMore(convertToLegacyStory());
    }
  };

  const rankingGain = calculateRankingGain(selectedSector.globalRanking1995, selectedSector.globalRanking2022);
  const gainColor = rankingGain > 0 ? 'text-green-600' : rankingGain < 0 ? 'text-red-600' : 'text-gray-600';
  const gainPrefix = rankingGain > 0 ? '+' : '';

  return (
    <div className="h-full w-full bg-white shadow-2xl overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{countryStories.flag}</span>
            <div>
              <h2 className="text-xl font-bold">{countryStories.country}</h2>
              <p className="text-gray-600">{selectedSector.sector}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Enhanced Case Study Badge */}
        {hasEnhancedCaseStudy() && (
          <div className="mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800">Enhanced Case Study Available</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">Detailed analysis with professional insights</p>
            </div>
          </div>
        )}

        {/* Sector Navigation */}
        {countryStories.sectors.length > 1 && onSectorChange && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
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
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {sector.sector}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Global Ranking Gain */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Global Ranking Gain 1995-2022</h3>
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

        {/* Export Value Comparison */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Export Value Growth</h3>
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

        {/* Successful Product */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Successful Product</h3>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="font-medium text-purple-800 capitalize">{selectedSector.successfulProduct}</p>
          </div>
        </div>

        {/* Success Story Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Success Story</h3>
          <p className="text-gray-700 leading-relaxed">{selectedSector.successStorySummary}</p>
        </div>

        {/* Read More Button */}
        <Button 
          onClick={handleViewCaseStudy}
          className={`w-full text-white ${hasEnhancedCaseStudy() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          size="lg"
        >
          {hasEnhancedCaseStudy() ? 'View Enhanced Case Study' : 'View Full Case Study'}
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default StoryCard;
