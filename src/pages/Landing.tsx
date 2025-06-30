import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map, HelpCircle, X, Filter } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import WorldMap, { WorldMapRef } from '../components/WorldMap';
import StoryCard from '../components/StoryCard';
import SectorSelectionModal from '../components/SectorSelectionModal';
import FilteredSectorModal from '../components/FilteredSectorModal';
import SectorFilter from '../components/SectorFilter';
import SearchBar from '../components/SearchBar';
import MapTutorial from '../components/MapTutorial';
import MapViewToggle from '../components/MapViewToggle';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { useTutorial } from '../hooks/useTutorial';

const Landing = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [selectedCountryStories, setSelectedCountryStories] = useState<CountrySuccessStories | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorStory | null>(null);
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [showFilteredSectorModal, setShowFilteredSectorModal] = useState(false);
  const [showSectorFilter, setShowSectorFilter] = useState(true);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [countryStories, setCountryStories] = useState<CountrySuccessStories[]>([]);
  const [mapState, setMapState] = useState<{ center: [number, number]; zoom: number } | null>(null);
  const [is3DView, setIs3DView] = useState(false);
  const [storedMapState, setStoredMapState] = useState<{ center: [number, number]; zoom: number } | null>(null);
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

  // Add callback to receive stories from WorldMap - wrapped in useCallback to prevent infinite loops
  const handleStoriesLoaded = useCallback((stories: SuccessStory[], countryStories: CountrySuccessStories[]) => {
    console.log('Stories loaded in Landing component:', stories.length, 'single-sector,', countryStories.length, 'multi-sector');
    setSuccessStories(stories);
    setCountryStories(countryStories);
  }, []);

  const handleExploreMap = () => {
    // Scroll to show the search bar and controls at the top
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      // Get the height of the fixed navigation bar (14 = 3.5rem = 56px)
      const navHeight = 56; // 14 * 4 = 56px for h-14 class
      const elementPosition = mapSection.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    // If user hasn't seen tutorial, start it after scrolling
    if (!hasSeenTutorial) {
      setTimeout(() => {
        console.log('Auto-starting tutorial for first-time user');
        startTutorial();
      }, 1000);
    }
  };

  const handleCountrySelect = (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => {
    console.log('handleCountrySelect called with:', {
      country: story?.country,
      hasCountryStories: !!countryStories,
      hasMutipleSectors: countryStories?.hasMutipleSectors,
      filterActive: selectedSectors.length > 0,
      selectedSectors
    });

    // Store current map state BEFORE any modal opens or map changes
    if (worldMapRef.current && worldMapRef.current.getCurrentMapState) {
      const currentState = worldMapRef.current.getCurrentMapState();
      setStoredMapState(currentState);
      console.log('Stored current map state:', currentState);
    }

    if (countryStories && countryStories.hasMutipleSectors) {
      // Multi-sector country - show modal for sector selection
      setSelectedCountryStories(countryStories);
      
      // Check if we're in filtered mode
      if (selectedSectors.length > 0) {
        // Filter the country's sectors to only show selected ones
        const filteredCountryStories = {
          ...countryStories,
          sectors: countryStories.sectors.filter(sector => selectedSectors.includes(sector.sector))
        };
        
        console.log('Filtered sectors for', countryStories.country, ':', filteredCountryStories.sectors.length);
        
        if (filteredCountryStories.sectors.length > 1) {
          // Multiple filtered sectors - show filtered modal
          console.log('Showing filtered sector modal');
          setShowFilteredSectorModal(true);
          setSelectedStory(story); // This triggers the zoom
        } else if (filteredCountryStories.sectors.length === 1) {
          // Only one matching sector - show it directly
          console.log('Only one filtered sector, showing directly');
          setSelectedSector(filteredCountryStories.sectors[0]);
          setSelectedStory(story);
          setShowFilteredSectorModal(false);
          setShowSectorModal(false);
        } else {
          // No matching sectors - this shouldn't happen but handle gracefully
          console.log('No matching sectors found');
          setSelectedStory(null);
          setSelectedCountryStories(null);
          setSelectedSector(null);
          setShowFilteredSectorModal(false);
          setShowSectorModal(false);
        }
      } else {
        // No filter - show regular modal with all sectors
        console.log('No filter active, showing regular sector modal');
        setShowSectorModal(true);
        setSelectedStory(story); // This triggers the zoom
        setShowFilteredSectorModal(false);
      }
      
      setSelectedSector(null);
    } else {
      // Single-sector country - show story card directly
      console.log('Single-sector country, showing story card directly');
      setSelectedStory(story);
      setSelectedCountryStories(null);
      setSelectedSector(null);
      setShowSectorModal(false);
      setShowFilteredSectorModal(false);
    }
  };

  const handleSectorSelectFromModal = (sector: SectorStory) => {
    setSelectedSector(sector);
    setShowSectorModal(false);
  };

  const handleFilteredSectorSelectFromModal = (sector: SectorStory) => {
    setSelectedSector(sector);
    setShowFilteredSectorModal(false);
  };

  const handleSectorSelect = (sector: SectorStory) => {
    setSelectedSector(sector);
  };

  const handleClosePanel = () => {
    // Restore stored map state when closing panel
    if (storedMapState && worldMapRef.current && worldMapRef.current.flyToPosition) {
      console.log('Restoring stored map state:', storedMapState);
      worldMapRef.current.flyToPosition(storedMapState.center, storedMapState.zoom);
    }
    
    setSelectedStory(null);
    setSelectedCountryStories(null);
    setSelectedSector(null);
    setShowSectorModal(false);
    setShowFilteredSectorModal(false);
    setStoredMapState(null);
  };

  const handleCloseSectorModal = () => {
    // Restore stored map state when closing sector modal without selection
    if (storedMapState && worldMapRef.current && worldMapRef.current.flyToPosition) {
      console.log('Restoring stored map state from sector modal close:', storedMapState);
      worldMapRef.current.flyToPosition(storedMapState.center, storedMapState.zoom);
    }
    
    setShowSectorModal(false);
    setSelectedCountryStories(null);
    setSelectedStory(null);
    setStoredMapState(null);
  };

  const handleCloseFilteredSectorModal = () => {
    // Restore stored map state when closing filtered sector modal without selection
    if (storedMapState && worldMapRef.current && worldMapRef.current.flyToPosition) {
      console.log('Restoring stored map state from filtered sector modal close:', storedMapState);
      worldMapRef.current.flyToPosition(storedMapState.center, storedMapState.zoom);
    }
    
    setShowFilteredSectorModal(false);
    setSelectedCountryStories(null);
    setSelectedStory(null);
    setStoredMapState(null);
  };

  // Sector filter handlers
  const handleSectorToggle = (sector: string) => {
    setSelectedSectors(prev => {
      if (prev.includes(sector)) {
        return prev.filter(s => s !== sector);
      } else {
        return [...prev, sector];
      }
    });
  };

  const handleResetFilter = () => {
    setSelectedSectors([]);
  };

  const handleCloseSectorFilter = () => {
    setShowSectorFilter(false);
  };

  const handleShowSectorFilter = () => {
    setShowSectorFilter(true);
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

  const handleMapViewToggle = (is3D: boolean) => {
    setIs3DView(is3D);
  };

  return (
    <div className="min-h-screen">
      <NavigationBar onExploreClick={handleExploreMap} />
      
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
              Sector Transformation Atlas
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

      {/* Map Section - Fixed height to account for navigation bar */}
      <div id="map-section" ref={mapSectionRef} className="h-[calc(100vh-3.5rem)] bg-gray-50">
        <div className="relative h-full">
          {/* Search Bar and Filter - moved to left column */}
          <div className="absolute top-4 left-4 z-20 space-y-2">
            <div className="tutorial-search-bar">
              <SearchBar onCountrySelect={handleCountrySelect} />
            </div>
            
            {/* Show filter toggle button when filter is closed */}
            {!showSectorFilter && (
              <Button
                onClick={handleShowSectorFilter}
                variant="outline"
                size="sm"
                className="bg-white/90 hover:bg-white flex items-center gap-2"
              >
                <Filter size={16} />
                Show Filters
              </Button>
            )}
            
            {/* Sector Filter - always open when visible, narrower design */}
            {showSectorFilter && (
              <div className="w-72">
                <SectorFilter
                  stories={successStories}
                  countryStories={countryStories}
                  selectedSectors={selectedSectors}
                  onSectorToggle={handleSectorToggle}
                  onReset={handleResetFilter}
                  onClose={handleCloseSectorFilter}
                  isVisible={showSectorFilter}
                  isCompact={true}
                />
              </div>
            )}
          </div>

          {/* Map View Toggle and Tutorial Button - moved further right to avoid zoom controls overlap */}
          <div className="absolute top-4 right-20 z-20 flex items-center gap-2">
            <div className="tutorial-3d-toggle">
              <MapViewToggle is3D={is3DView} onToggle={handleMapViewToggle} />
            </div>
            <div className="tutorial-help-button">
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
          </div>

          {/* Map - full width and height */}
          <div className="h-full w-full">
            <WorldMap 
              ref={worldMapRef}
              onCountrySelect={handleCountrySelect} 
              selectedStory={selectedStory}
              onMapStateChange={handleMapStateChange}
              initialMapState={mapState}
              selectedSectors={selectedSectors}
              onStoriesLoaded={handleStoriesLoaded}
              is3DView={is3DView}
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

          {/* Regular Sector Selection Modal */}
          {showSectorModal && selectedCountryStories && (
            <SectorSelectionModal
              countryStories={selectedCountryStories}
              onSectorSelect={handleSectorSelectFromModal}
              onClose={handleCloseSectorModal}
            />
          )}

          {/* Filtered Sector Selection Modal */}
          {showFilteredSectorModal && selectedCountryStories && (
            <FilteredSectorModal
              countryStories={selectedCountryStories}
              selectedSectors={selectedSectors}
              onSectorSelect={handleFilteredSectorSelectFromModal}
              onClose={handleCloseFilteredSectorModal}
            />
          )}

          {/* Tutorial Overlay */}
          {showTutorial && (
            <MapTutorial
              onClose={handleTutorialClose}
              onDemoCountrySelect={handleTutorialDemo}
              demoStory={selectedStory}
              selectedSectors={selectedSectors}
              onSectorToggle={handleSectorToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
