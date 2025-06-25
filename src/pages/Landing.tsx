
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import WorldMap from '../components/WorldMap';
import StoryCard from '../components/StoryCard';
import SearchBar from '../components/SearchBar';
import { SuccessStory } from '../types/SuccessStory';

const Landing = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const navigate = useNavigate();

  const handleExploreMap = () => {
    document.getElementById('map-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

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
    <div className="min-h-screen">
      <NavigationBar />
      
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/38f2e418-48dc-4da2-b98f-237902a9bcfa.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Structural Transformation Atlas
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore case studies of successful sector transformation and rapid export growth in developing countries
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleExploreMap}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold min-w-[200px]"
              >
                <Map className="mr-2" size={20} />
                Explore the Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div id="map-section" className="min-h-screen bg-gray-50">
        <div className="relative h-screen">
          {/* Search Bar */}
          <div className="absolute top-4 left-4 z-20">
            <SearchBar onCountrySelect={handleCountrySelect} />
          </div>

          {/* Map - always full width */}
          <div className="h-full w-full">
            <WorldMap onCountrySelect={handleCountrySelect} selectedStory={selectedStory} />
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
    </div>
  );
};

export default Landing;
