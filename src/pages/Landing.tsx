import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map, HelpCircle } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import WorldMap, { WorldMapRef } from '../components/WorldMap';
import StoryCard from '../components/StoryCard';
import SectorSelectionModal from '../components/SectorSelectionModal';
import SearchBar from '../components/SearchBar';
import MapTutorial from '../components/MapTutorial';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { useTutorial } from '../hooks/useTutorial';

const Landing = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [selectedCountryStories, setSelectedCountryStories] = useState<CountrySuccessStories | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorStory | null>(null);
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [mapState, setMapState] = useState<{ center: [number, number]; zoom: number } | null>(null);
  const navigate = useNavigate();
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const worldMapRef = useRef<WorldMapRef>(null);
  
  const { showTutorial, hasSeenTutorial, startTutorial, closeTutorial } = useTutorial();

  // Restore map state on page load
  React.useEffect(() => {
    const savedMapState = sessionStorage.getItem('mapState');
    if (savedMapState) {
      try {
        const parsedState = JSON.parse(savedMapState);
        console.log('Restoring saved map state:', parsedState);
        // Adjust zoom to be more zoomed out for better return view
        if (parsedState.zoom > 4) {
          parsedState.zoom = 4; // Set to a more reasonable zoom level
        }
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

    // If user hasn't seen tutorial, start it after scrolling
    if (!hasSeenTutorial) {
      setTimeout(() => {
        console.log('Auto-starting tutorial for first-time user');
        startTutorial();
      }, 1000);
    }
  };

  const handleCountrySelect = (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => {
    if (countryStories && countryStories.hasMutipleSectors) {
      // Multi-sector country - show modal for sector selection
      setSelectedCountryStories(countryStories);
      setShowSectorModal(true);
      setSelectedStory(null);
      setSelectedSector(null);
      
      // Set a temporary story for zoom purposes (using primary sector)
      const tempStory: SuccessStory = {
        id: `${countryStories.id}-${countryStories.primarySector.sector}`,
        country: countryStories.country,
        sector: countryStories.primarySector.sector,
        product: countryStories.primarySector.product,
        description: countryStories.primarySector.description,
        growthRate: countryStories.primarySector.growthRate,
        timeframe: countryStories.timeframe,
        exportValue: countryStories.primarySector.exportValue,
        keyFactors: countryStories.primarySector.keyFactors,
        coordinates: countryStories.coordinates,
        flag: countryStories.flag,
        marketDestinations: countryStories.primarySector.marketDestinations,
        challenges: countryStories.primarySector.challenges,
        impact: countryStories.primarySector.impact,
        globalRanking1995: countryStories.primarySector.globalRanking1995,
        globalRanking2022: countryStories.primarySector.globalRanking2022,
        initialExports1995: countryStories.primarySector.initialExports1995,
        initialExports2022: countryStories.primarySector.initialExports2022,
        successfulProduct: countryStories.primarySector.successfulProduct,
        successStorySummary: countryStories.primarySector.successStorySummary
      };
      setSelectedStory(tempStory); // This will trigger the zoom
    } else {
      // Single-sector country - show story card directly
      setSelectedStory(story);
      setSelectedCountryStories(null);
      setSelectedSector(null);
      setShowSectorModal(false);
    }
  };

  const handleSectorSelectFromModal = (sector: SectorStory) => {
    setSelectedSector(sector);
    setShowSectorModal(false);
    // Keep the country stories for the "other sectors" functionality
    // Keep the selectedStory for zoom (it's already set from handleCountrySelect)
  };

  const handleSectorSelect = (sector: SectorStory) => {
    setSelectedSector(sector);
  };

  const handleClosePanel = () => {
    setSelectedStory(null);
    setSelectedCountryStories(null);
    setSelectedSector(null);
    setShowSectorModal(false);
  };

  const handleCloseSectorModal = () => {
    setShowSectorModal(false);
    setSelectedCountryStories(null);
    // Clear the temporary story to zoom out
    setSelectedStory(null);
  };

  const handleReadMore = (story: SuccessStory) => {
    // Save current scroll position and map state before navigating
    sessionStorage.setItem('mapScrollPosition', window.scrollY.toString());
    if (mapState) {
      // Save map state with adjusted zoom for better return experience
      const adjustedMapState = {
        ...mapState,
        zoom: Math.min(mapState.zoom, 4) // Ensure zoom doesn't exceed 4 for return
      };
      sessionStorage.setItem('mapState', JSON.stringify(adjustedMapState));
      console.log('Saving adjusted map state before navigation:', adjustedMapState);
    } else if (selectedStory) {
      // If no current map state, create one based on selected story with moderate zoom
      const fallbackMapState = {
        center: [selectedStory.coordinates.lng, selectedStory.coordinates.lat] as [number, number],
        zoom: 4
      };
      sessionStorage.setItem('mapState', JSON.stringify(fallbackMapState));
      console.log('Saving fallback map state based on selected story:', fallbackMapState);
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
    if (worldMapRef.current) {
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

          {/* Map - full width now since no sidebar */}
          <div className="h-full w-full">
            <WorldMap 
              ref={worldMapRef}
              onCountrySelect={handleCountrySelect} 
              selectedStory={selectedStory}
              onMapStateChange={handleMapStateChange}
              initialMapState={mapState}
            />
          </div>
          
          {/* Story Card Overlay - for single sector and selected multi-sector */}
          {(selectedStory || (selectedCountryStories && selectedSector)) && (
            <>
              {/* Semi-transparent backdrop */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-20 z-30"
                onClick={handleClosePanel}
              />
              
              {/* Story Card */}
              <div className={`absolute right-0 top-0 h-full w-96 z-40 transform transition-transform duration-300 tutorial-story-card ${
                (selectedStory || selectedSector) ? 'translate-x-0' : 'translate-x-full'
              }`}>
                <StoryCard 
                  story={selectedStory} 
                  countryStories={selectedCountryStories}
                  selectedSector={selectedSector}
                  onClose={handleClosePanel}
                  onReadMore={handleReadMore}
                  onSectorChange={handleSectorSelect}
                />
              </div>
            </>
          )}

          {/* Sector Selection Modal */}
          {showSectorModal && selectedCountryStories && (
            <SectorSelectionModal
              countryStories={selectedCountryStories}
              onSectorSelect={handleSectorSelectFromModal}
              onClose={handleCloseSectorModal}
            />
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
