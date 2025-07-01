import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [isRestoringFromCaseStudy, setIsRestoringFromCaseStudy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const worldMapRef = useRef<WorldMapRef>(null);
  
  const { showTutorial, hasSeenTutorial, startTutorial, closeTutorial } = useTutorial();

  // Enhanced map state restoration with better handling of return from case study
  React.useEffect(() => {
    const restoreMapState = async () => {
      let restoredState = null;
      let shouldScrollToMap = false;
      
      // Priority 1: URL parameters (from case study return)
      const urlParams = new URLSearchParams(location.search);
      const lat = urlParams.get('lat');
      const lng = urlParams.get('lng');
      const zoom = urlParams.get('zoom');
      const fromCaseStudy = urlParams.get('from') === 'case-study';
      
      if (lat && lng && zoom) {
        restoredState = {
          center: [parseFloat(lng), parseFloat(lat)] as [number, number],
          zoom: parseFloat(zoom)
        };
        shouldScrollToMap = fromCaseStudy;
        console.log('Restored map state from URL params:', restoredState);
        
        // Clean up URL but preserve necessary state
        const cleanUrl = window.location.pathname;
        window.history.replaceState({ fromCaseStudy }, '', cleanUrl);
      }
      
      // Priority 2: React Router state
      else if (location.state?.mapState) {
        restoredState = location.state.mapState;
        shouldScrollToMap = location.state?.returnedFromCaseStudy || false;
        console.log('Restored map state from router state:', restoredState);
      }
      
      // Priority 3: Session storage fallback
      else {
        const savedMapState = sessionStorage.getItem('mapState');
        const savedScrollPos = sessionStorage.getItem('mapScrollPosition');
        if (savedMapState) {
          try {
            const parsed = JSON.parse(savedMapState);
            restoredState = parsed;
            shouldScrollToMap = !!savedScrollPos;
            console.log('Restored map state from session storage:', restoredState);
          } catch (error) {
            console.error('Failed to parse saved map state:', error);
          }
        }
      }

      // Apply restored state
      if (restoredState && 
          restoredState.center && restoredState.zoom && 
          restoredState.center[0] >= -180 && restoredState.center[0] <= 180 &&
          restoredState.center[1] >= -85 && restoredState.center[1] <= 85 &&
          restoredState.zoom >= 1 && restoredState.zoom <= 20) {
        
        setIsRestoringFromCaseStudy(true);
        setMapState(restoredState);
        
        // Handle scroll restoration for seamless return
        if (shouldScrollToMap) {
          // Wait for map to be ready then scroll to it
          setTimeout(() => {
            const mapSection = document.getElementById('map-section');
            if (mapSection) {
              const navHeight = 56; // Navigation bar height
              const elementPosition = mapSection.offsetTop;
              const offsetPosition = elementPosition - navHeight;
              
              window.scrollTo({ 
                top: offsetPosition, 
                behavior: 'smooth' 
              });
              console.log('Scrolled to map section after case study return');
            }
            
            // Clear restoration flag
            setTimeout(() => {
              setIsRestoringFromCaseStudy(false);
            }, 1000);
          }, 200);
        }
        
        // Clean up session storage
        sessionStorage.removeItem('mapScrollPosition');
        sessionStorage.removeItem('mapState');
      }
    };

    restoreMapState();
  }, [location]);

  const handleStoriesLoaded = useCallback((stories: SuccessStory[], countryStories: CountrySuccessStories[]) => {
    console.log('Stories loaded in Landing component:', stories.length, 'single-sector,', countryStories.length, 'multi-sector');
    setSuccessStories(stories);
    setCountryStories(countryStories);
  }, []);

  const handleExploreMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      const navHeight = 56;
      const elementPosition = mapSection.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

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

    if (worldMapRef.current && worldMapRef.current.getCurrentMapState) {
      const currentState = worldMapRef.current.getCurrentMapState();
      setStoredMapState(currentState);
      console.log('Stored current map state:', currentState);
    }

    if (countryStories && countryStories.hasMutipleSectors) {
      setSelectedCountryStories(countryStories);
      
      if (selectedSectors.length > 0) {
        const filteredCountryStories = {
          ...countryStories,
          sectors: countryStories.sectors.filter(sector => selectedSectors.includes(sector.sector))
        };
        
        console.log('Filtered sectors for', countryStories.country, ':', filteredCountryStories.sectors.length);
        
        if (filteredCountryStories.sectors.length > 1) {
          console.log('Showing filtered sector modal');
          setShowFilteredSectorModal(true);
          setSelectedStory(story);
        } else if (filteredCountryStories.sectors.length === 1) {
          console.log('Only one filtered sector, showing directly');
          setSelectedSector(filteredCountryStories.sectors[0]);
          setSelectedStory(story);
          setShowFilteredSectorModal(false);
          setShowSectorModal(false);
        } else {
          console.log('No matching sectors found');
          setSelectedStory(null);
          setSelectedCountryStories(null);
          setSelectedSector(null);
          setShowFilteredSectorModal(false);
          setShowSectorModal(false);
        }
      } else {
        console.log('No filter active, showing regular sector modal');
        setShowSectorModal(true);
        setSelectedStory(story);
        setShowFilteredSectorModal(false);
      }
      
      setSelectedSector(null);
    } else {
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
    if (storedMapState && worldMapRef.current && worldMapRef.current.flyToPosition) {
      console.log('Restoring stored map state from filtered sector modal close:', storedMapState);
      worldMapRef.current.flyToPosition(storedMapState.center, storedMapState.zoom);
    }
    
    setShowFilteredSectorModal(false);
    setSelectedCountryStories(null);
    setSelectedStory(null);
    setStoredMapState(null);
  };

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

  // Enhanced handleReadMore with comprehensive state preservation
  const handleReadMore = (story: SuccessStory) => {
    // Save current scroll position
    const currentScrollY = window.scrollY;
    sessionStorage.setItem('mapScrollPosition', currentScrollY.toString());
    console.log('Saving scroll position:', currentScrollY);
    
    // Get and save current map state with enhanced data
    if (worldMapRef.current && worldMapRef.current.getCurrentMapState) {
      const currentMapState = worldMapRef.current.getCurrentMapState();
      if (currentMapState) {
        const enhancedState = {
          ...currentMapState,
          timestamp: Date.now(),
          fromStoryId: story.id,
          scrollPosition: currentScrollY
        };
        
        // Save to multiple sources for reliability
        sessionStorage.setItem('mapState', JSON.stringify(enhancedState));
        localStorage.setItem('lastMapState', JSON.stringify(enhancedState));
        
        console.log('Saving comprehensive map state before case study navigation:', enhancedState);
        
        // Navigate with enhanced URL parameters
        const urlParams = new URLSearchParams({
          lat: currentMapState.center[1].toString(),
          lng: currentMapState.center[0].toString(),
          zoom: currentMapState.zoom.toString(),
          from: 'map',
          scroll: currentScrollY.toString()
        });
        
        navigate(`/case-study/${story.id}?${urlParams.toString()}`, {
          state: {
            mapState: currentMapState,
            scrollPosition: currentScrollY,
            returnPath: '/',
            timestamp: Date.now()
          }
        });
      }
    } else if (mapState) {
      // Fallback to stored map state
      const enhancedState = {
        ...mapState,
        timestamp: Date.now(),
        fromStoryId: story.id,
        scrollPosition: currentScrollY
      };
      
      sessionStorage.setItem('mapState', JSON.stringify(enhancedState));
      localStorage.setItem('lastMapState', JSON.stringify(enhancedState));
      
      console.log('Saving fallback map state before case study navigation:', enhancedState);
      
      navigate(`/case-study/${story.id}`, {
        state: {
          mapState: mapState,
          scrollPosition: currentScrollY,
          returnPath: '/',
          timestamp: Date.now()
        }
      });
    } else {
      // Last resort - navigate without state
      navigate(`/case-study/${story.id}`);
    }
  };

  const handleTutorialDemo = (story: SuccessStory | null) => {
    setSelectedStory(story);
  };

  const handleStartTutorial = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setTimeout(() => {
      startTutorial();
    }, 500);
  };

  const handleMapStateChange = (center: [number, number], zoom: number) => {
    // Only update state if not in restoration mode
    if (!isRestoringFromCaseStudy) {
      const newMapState = { center, zoom };
      setMapState(newMapState);
      console.log('Map state changed:', newMapState);
    }
  };

  const handleTutorialClose = () => {
    if (worldMapRef.current) {
      worldMapRef.current.resetToInitialPosition();
    }
    setSelectedStory(null);
    closeTutorial();
  };

  const handleMapViewToggle = (is3D: boolean) => {
    setIs3DView(is3D);
  };

  return (
    <div className="min-h-screen">
      <NavigationBar onExploreClick={handleExploreMap} />
      
      {/* Hero Section - Responsive positioning fixes */}
      <div className="min-h-screen relative overflow-hidden pt-14">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/38f2e418-48dc-4da2-b98f-237902a9bcfa.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight text-left sm:text-center">
              Sector Transformation Atlas
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-left sm:text-center">
              Explore case studies of successful sector transformation and rapid export growth in developing countries
            </p>
            
            <div className="flex justify-start sm:justify-center">
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

      {/* Map Section - Responsive improvements */}
      <div id="map-section" ref={mapSectionRef} className="h-[calc(100vh-3.5rem)] bg-gray-50">
        <div className="relative h-full">
          {/* Search Bar and Filter - Responsive positioning */}
          <div className="absolute top-4 left-2 sm:left-4 z-20 space-y-2 w-[calc(100vw-1rem)] sm:w-auto max-w-[280px] sm:max-w-none">
            <div className="tutorial-search-bar">
              <SearchBar onCountrySelect={handleCountrySelect} />
            </div>
            
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
            
            {showSectorFilter && (
              <div className="w-full sm:w-72">
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

          {/* Map View Toggle and Tutorial Button - Responsive positioning */}
          <div className="absolute top-4 right-2 sm:right-20 z-20 flex items-center gap-2">
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
          
          {/* Story Card Overlay - Responsive improvements */}
          {(selectedStory || (selectedCountryStories && selectedSector)) && (
            <>
              <div 
                className="absolute inset-0 bg-black bg-opacity-20 z-30"
                onClick={handleClosePanel}
              />
              
              <div className={`absolute right-0 top-0 h-full w-full sm:w-96 z-40 transform transition-transform duration-300 tutorial-story-card ${
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

          {/* Modals */}
          {showSectorModal && selectedCountryStories && (
            <SectorSelectionModal
              countryStories={selectedCountryStories}
              onSectorSelect={handleSectorSelectFromModal}
              onClose={handleCloseSectorModal}
            />
          )}

          {showFilteredSectorModal && selectedCountryStories && (
            <FilteredSectorModal
              countryStories={selectedCountryStories}
              selectedSectors={selectedSectors}
              onSectorSelect={handleFilteredSectorSelectFromModal}
              onClose={handleCloseFilteredSectorModal}
            />
          )}

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
