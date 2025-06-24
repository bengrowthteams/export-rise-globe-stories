
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Globe, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { successStories } from '../data/successStories';

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const story = successStories.find(s => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => navigate('/map')}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Map
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount.replace(/[\$,]/g, ''));
    if (numAmount >= 1000000000) {
      return `$${(numAmount / 1000000000).toFixed(1)} billion`;
    } else if (numAmount >= 1000000) {
      return `$${(numAmount / 1000000).toFixed(1)} million`;
    }
    return amount;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/map')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Map
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{story.flag}</span>
            <div>
              <h1 className="text-3xl font-bold">{story.country}</h1>
              <p className="text-xl text-gray-600">{story.sector} Transformation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-green-600" size={20} />
              <span className="text-sm font-medium text-green-800">Growth Rate</span>
            </div>
            <p className="text-2xl font-bold text-green-600">+{story.growthRate}%</p>
            <p className="text-xs text-green-700">{story.timeframe}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-blue-800">Ranking Change</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">#{story.globalRanking1995} → #{story.globalRanking2022}</p>
            <p className="text-xs text-blue-700">Global Export Ranking</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="text-purple-600" size={20} />
              <span className="text-sm font-medium text-purple-800">Export Growth</span>
            </div>
            <p className="text-lg font-bold text-purple-600">{formatCurrency(story.initialExports1995)}</p>
            <p className="text-lg font-bold text-purple-600">→ {formatCurrency(story.initialExports2022)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="text-orange-600" size={20} />
              <span className="text-sm font-medium text-orange-800">Employment</span>
            </div>
            <p className="text-lg font-bold text-orange-600">{story.impact.jobs}</p>
          </div>
        </div>

        {/* Success Story */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">Success Story</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{story.successStorySummary}</p>
          <p className="text-gray-700 leading-relaxed">{story.description}</p>
        </div>

        {/* Key Success Factors */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Success Factors</h2>
          <ul className="space-y-3">
            {story.keyFactors.map((factor, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Market Destinations */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Globe size={24} />
            <span>Key Markets</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {story.marketDestinations.map((market, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium"
              >
                {market}
              </span>
            ))}
          </div>
        </div>

        {/* Current Challenges */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Current Challenges</h2>
          <ul className="space-y-3">
            {story.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start space-x-3">
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

export default CaseStudy;
