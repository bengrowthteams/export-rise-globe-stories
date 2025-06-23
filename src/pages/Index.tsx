
import React, { useState } from 'react';
import Header from '../components/Header';
import StatsOverview from '../components/StatsOverview';
import WorldMap from '../components/WorldMap';
import StoryPanel from '../components/StoryPanel';
import { SuccessStory } from '../types/SuccessStory';

const Index = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  const handleCountrySelect = (story: SuccessStory | null) => {
    setSelectedStory(story);
  };

  const handleClosePanel = () => {
    setSelectedStory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <StatsOverview />
      
      <div className="relative h-[calc(100vh-180px)]">
        <div className={`transition-all duration-300 ${selectedStory ? 'mr-96' : 'mr-0'} h-full`}>
          <WorldMap onCountrySelect={handleCountrySelect} />
        </div>
        
        <StoryPanel story={selectedStory} onClose={handleClosePanel} />
        
        {!selectedStory && (
          <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <h3 className="font-semibold mb-2">🌍 Explore Success Stories</h3>
            <p className="text-sm text-gray-600">
              Click on the green markers to discover how developing countries achieved remarkable export growth in various sectors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
