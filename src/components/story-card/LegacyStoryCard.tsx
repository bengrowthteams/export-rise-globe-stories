
import React, { useState, useEffect } from 'react';
import { X, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SuccessStory } from '../../types/SuccessStory';
import { Button } from '@/components/ui/button';
import ReturnStateService from '../../services/returnStateService';
import { hasEnhancedCaseStudy, preloadEnhancedCaseStudyIds } from '../../services/enhancedCaseStudyService';

interface LegacyStoryCardProps {
  story: SuccessStory;
  selectedSectors: string[];
  onClose: () => void;
  onReadMore: (story: SuccessStory) => void;
}

const LegacyStoryCard: React.FC<LegacyStoryCardProps> = ({ 
  story, 
  selectedSectors, 
  onClose, 
  onReadMore 
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

  const handleViewCaseStudy = () => {
    console.log('Legacy Story Card - handleViewCaseStudy called for Primary key:', story.primaryKey);
    
    ReturnStateService.saveReturnState({
      selectedSectors,
      country: story.country,
      sector: story.sector
    });
    
    if (story.primaryKey && hasEnhancedCaseStudy(story.primaryKey)) {
      console.log('Legacy Story Card - Navigating to enhanced case study:', story.primaryKey);
      navigate(`/enhanced-case-study/${story.primaryKey}`);
    } else {
      console.log('Legacy Story Card - No enhanced case study, using onReadMore');
      onReadMore(story);
    }
  };

  const rankingGain = calculateRankingGain(story.globalRanking1995, story.globalRanking2022);
  const gainColor = rankingGain > 0 ? 'text-green-600' : rankingGain < 0 ? 'text-red-600' : 'text-gray-600';
  const gainPrefix = rankingGain > 0 ? '+' : '';

  // Show button for all stories with primaryKey (simplified approach)
  const showEnhancedButton = story.primaryKey != null;

  return (
    <div className="h-full w-full bg-white shadow-2xl overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{story.flag}</span>
            <div>
              <h2 className="text-xl font-bold">{story.country}</h2>
              <p className="text-gray-600 text-sm">{story.sector}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global Ranking Gain - Updated header text and reduced spacing */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Global Ranking Gain</h3>
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

        {/* Export Value Comparison - Reduced spacing */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Export Value Growth</h3>
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

        {/* Successful Product - Reduced spacing */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Successful Product</h3>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="font-medium text-purple-800 capitalize text-sm">{story.successfulProduct}</p>
          </div>
        </div>

        {/* Success Story Summary - Reduced spacing and font size */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2">Success Story</h3>
          <p className="text-gray-700 leading-relaxed text-sm">{story.description}</p>
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

export default LegacyStoryCard;
