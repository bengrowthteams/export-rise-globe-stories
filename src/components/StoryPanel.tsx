
import React from 'react';
import { X, TrendingUp, Globe, Users, DollarSign } from 'lucide-react';
import { SuccessStory } from '../types/SuccessStory';

interface StoryPanelProps {
  story: SuccessStory | null;
  onClose: () => void;
}

const StoryPanel: React.FC<StoryPanelProps> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-[95vw] sm:w-96 bg-white shadow-2xl z-10 overflow-y-auto overscroll-y-contain rounded-l-2xl sm:rounded-l-none">
      <div className="p-4 sm:p-6">
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

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-green-600" size={20} />
              <span className="text-sm font-medium text-green-800">Growth Rate</span>
            </div>
            <p className="text-2xl font-bold text-green-600">+{story.growthRate}%</p>
            <p className="text-xs text-green-700">{story.timeframe}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="text-blue-600" size={20} />
              <span className="text-sm font-medium text-blue-800">Export Value</span>
            </div>
            <p className="text-lg font-bold text-blue-600">{story.exportValue}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Success Story</h3>
          <p className="text-gray-700 leading-relaxed">{story.description}</p>
        </div>

        {/* Key Factors */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Key Success Factors</h3>
          <ul className="space-y-2">
            {story.keyFactors.map((factor, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Market Destinations */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
            <Globe size={20} />
            <span>Key Markets</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {story.marketDestinations.map((market, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {market}
              </span>
            ))}
          </div>
        </div>

        {/* Economic Impact */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
            <Users size={20} />
            <span>Economic Impact</span>
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Employment</p>
              <p className="font-semibold">{story.impact.jobs}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Economic Contribution</p>
              <p className="font-semibold">{story.impact.economicContribution}</p>
            </div>
          </div>
        </div>

        {/* Challenges */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Current Challenges</h3>
          <ul className="space-y-2">
            {story.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoryPanel;
