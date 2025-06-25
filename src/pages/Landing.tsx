
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map, HelpCircle } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import WorldMap from '../components/WorldMap';
import StoryCard from '../components/StoryCard';
import SearchBar from '../components/SearchBar';
import MapTutorial from '../components/MapTutorial';
import { SuccessStory } from '../types/SuccessStory';
import { useTutorial } from '../hooks/useTutorial';

const Landing = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [mapState, setMapState] = useState<{ center: [number, number]; zoom: number } | null>(null);
  const navigate = useNavigate();
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const worldMapRef = useRef<any>(null);
  
  const { showTutorial, hasSeenTutorial, triggerTutorialIfNeeded, startTutorial, closeTutorial } = useTutorial();

  // Restore map state on page load
  React.useEffect(() => {
    const savedMapState = sessionStorage.getItem('mapState');
    if (savedMapState) {
      try {
        const parsedState = JSON.parse(savedMapState);
        console.log('Restoring saved map state:', parsedState);
        setMapState(parsedState);
        sessionStorage.removeItem('mapState');
      } catch (error) {
        console.error('Failed to parse saved map state:', error);
      }
    }
  }, []);

  const handleExploreMap = () => {
    // First scroll to map section
    document.getElementById('map-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });

    // Then check if we should trigger tutorial for first-time users
    setTimeout(() => {
      triggerTutorialIfNeeded();
    }, 1000);
  };

  const handleCountrySelect = (story: SuccessStory | null) => {
    setSelectedStory(story);
  };

  const handleClosePanel = () => {
    setSelectedStory(null);
  };

  const handleReadMore = (story: SuccessStory) => {
    // Save current scroll position and map state before navigating
    sessionStorage.setItem('mapScrollPosition', window.scrollY.toString());
    if (mapState) {
      sessionStorage.setItem('mapState', JSON.stringify(mapState));
      console.log('Saving map state before navigation:', mapState);
    }
    navigate(`/case-study/${story.id}`);
  };

  const handleTutorialDemo = (story: SuccessStory | null) => {
    setSelectedStory(story);
  };

  const handleStartTutorial = () => {
    // First scroll to map section if not already there
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Then start the tutorial
    setTimeout(() => {
      startTutorial();
    }, 500);
  };

  const handleMapStateChange = (center: [number, number], zoom: number) => {
    const newMapState = { center, zoom };
    setMapState(newMapState);
    console.log('Map state changed:', newMapState);
  };

  const handleTutorialClose = () => {
    // Reset map to initial position when tutorial closes
    if (worldMapRef.current && worldMapRef.current.resetToInitialPosition) {
      worldMapRef.current.resetToInitialPosition();
    }
    // Clear any demo story
    setSelectedStory(null);
    closeTutorial();
  };

  return (
    <div className="min-h-screen">
      <NavigationBar />
      
      {/* Hero Section - add top padding for fixed nav */}
      <div className="min-h-screen relative overflow-hidden pt-14">
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
      <div id="map-section" ref={mapSectionRef} className="min-h-screen bg-gray-50">
        <div className="relative h-screen">
          {/* Search Bar - positioned below fixed navbar */}
          <div className="absolute top-20 left-4 z-20 tutorial-search-bar">
            <SearchBar onCountrySelect={handleCountrySelect} />
          </div>

          {/* Tutorial Help Button - positioned below fixed navbar */}
          <div className="absolute top-20 right-4 z-20">
            <Button
              onClick={handleStartTutorial}
              variant="outline"
              size="sm"
              className="bg-white/90 hover:bg-white"
            >
              <HelpCircle size={16} className="mr-1" />
              Tutorial
            </Button>
          </div>

          {/* Map - always full width */}
          <div className="h-full w-full">
            <WorldMap 
              ref={worldMapRef}
              onCountrySelect={handleCountrySelect} 
              selectedStory={selectedStory}
              onMapStateChange={handleMapStateChange}
              initialMapState={mapState}
            />
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
              <div className={`absolute right-0 top-0 h-full w-96 z-40 transform transition-transform duration-300 tutorial-story-card ${selectedStory ? 'translate-x-0' : 'translate-x-full'}`}>
                <StoryCard 
                  story={selectedStory} 
                  onClose={handleClosePanel}
                  onReadMore={handleReadMore}
                />
              </div>
            </>
          )}

          {/* Tutorial Overlay */}
          {showTutorial && (
            <MapTutorial
              onClose={handleTutorialClose}
              onDemoCountrySelect={handleTutorialDemo}
              demoStory={selectedStory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
