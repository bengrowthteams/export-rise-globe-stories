
import React from 'react';
import { X, TrendingUp, ArrowRight } from 'lucide-react';
import { SuccessStory } from '../types/SuccessStory';
import { Button } from '@/components/ui/button';

interface StoryCardProps {
  story: SuccessStory | null;
  onClose: () => void;
  onReadMore: (story: SuccessStory) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onClose, onReadMore }) => {
  if (!story) return null;

  const formatCurrency = (amount: string) => {
    // Remove the $ and convert to billions for display
    const numAmount = parseFloat(amount.replace(/[\$,]/g, ''));
    if (numAmount >= 1000000000) {
      return `$${(numAmount / 1000000000).toFixed(1)}B`;
    } else if (numAmount >= 1000000) {
      return `$${(numAmount / 1000000).toFixed(1)}M`;
    }
    return amount;
  };

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

        {/* Export Rankings Comparison */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Global Export Ranking</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-600">#{story.globalRanking1995}</p>
              <p className="text-sm text-red-700">1995</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">#{story.globalRanking2022}</p>
              <p className="text-sm text-green-700">2022</p>
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
          <h3 className="text-lg font-semibold mb-2">Example Product</h3>
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
          onClick={() => onReadMore(story)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          View Full Case Study
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default StoryCard;
