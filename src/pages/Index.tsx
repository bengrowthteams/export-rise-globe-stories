
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

        {/* Map - always full width */}
        <div className="h-full w-full">
          <WorldMap onCountrySelect={handleCountrySelect} />
        </div>
        
        {/* Story Card Overlay */}
        {selectedStory && (
          <>
            {/* Semi-transparent backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-20 z-30"
              onClick={handleClosePanel}
            />
            
            {/* Story Card */}
            <div className={`absolute right-0 top-0 h-full w-96 z-40 transform transition-transform duration-300 ${selectedStory ? 'translate-x-0' : 'translate-x-full'}`}>
              <StoryCard 
                story={selectedStory} 
                onClose={handleClosePanel}
                onReadMore={handleReadMore}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
