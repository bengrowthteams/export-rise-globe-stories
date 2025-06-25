
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import WorldMap from '../components/WorldMap';
import StoryCard from '../components/StoryCard';
import SearchBar from '../components/SearchBar';
import { SuccessStory } from '../types/SuccessStory';

const Index = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const navigate = useNavigate();

  const handleCountrySelect = (story: SuccessStory | null) => {
    setSelectedStory(story);
  };

  const handleClosePanel = () => {
    setSelectedStory(null);
  };

  const handleReadMore = (story: SuccessStory) => {
    navigate(`/case-study/${story.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="relative h-[calc(100vh-56px)]">
        {/* Search Bar */}
        <div className="absolute top-4 left-4 z-20">
          <SearchBar onCountrySelect={handleCountrySelect} />
        </div>

        <div className={`transition-all duration-300 h-full ${selectedStory ? 'mr-96' : 'mr-0'}`}>
          <WorldMap onCountrySelect={handleCountrySelect} />
        </div>
        
        {selectedStory && (
          <StoryCard 
            story={selectedStory} 
            onClose={handleClosePanel}
            onReadMore={handleReadMore}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
