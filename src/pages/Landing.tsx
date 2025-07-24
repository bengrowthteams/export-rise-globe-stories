import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map, HelpCircle, X, Filter } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import WorldMap, { WorldMapRef } from '../components/WorldMap';
import StoryCard from '../components/StoryCard';
import SectorSelectionModal from '../components/SectorSelectionModal';
import FilteredSectorModal from '../components/FilteredSectorModal';
import SectorFilter from '../components/SectorFilter';
import SearchBar from '../components/SearchBar';
import MapTutorial from '../components/MapTutorial';
import AboutSection from '../components/AboutSection';
import WhyExportsSection from '../components/WhyExportsSection';
import GetInTouchSection from '../components/GetInTouchSection';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { useTutorial } from '../hooks/useTutorial';
import { useIsMobile } from '../hooks/use-mobile';
import ReturnStateService from '../services/returnStateService';
const Landing = () => {
  const isMobile = useIsMobile();
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [selectedCountryStories, setSelectedCountryStories] = useState<CountrySuccessStories | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorStory | null>(null);
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [showFilteredSectorModal, setShowFilteredSectorModal] = useState(false);
  const [showSectorFilter, setShowSectorFilter] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [countryStories, setCountryStories] = useState<CountrySuccessStories[]>([]);
  const [mapState, setMapState] = useState<{
    center: [number, number];
    zoom: number;
  } | null>(null);
  const [storedMapState, setStoredMapState] = useState<{
    center: [number, number];
    zoom: number;
  } | null>(null);
  const [showMobileWelcome, setShowMobileWelcome] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const worldMapRef = useRef<WorldMapRef>(null);
  const [clearPopups, setClearPopups] = useState<(() => void) | null>(null);
  const {
    showTutorial,
    startTutorial,
    closeTutorial,
    triggerTutorialIfNeeded
  } = useTutorial();

  // Set initial filter state based on device type
  React.useEffect(() => {
    if (!isMobile) {
      setShowSectorFilter(true);
    }
  }, [isMobile]);

  // Show mobile welcome popup
  React.useEffect(() => {
    if (isMobile && !localStorage.getItem('mobile-welcome-seen')) {
      setShowMobileWelcome(true);
    }
  }, [isMobile]);
  React.useEffect(() => {
    const handleReturnFromCaseStudy = () => {
      console.log('Landing - Checking for return state');
      if (ReturnStateService.hasReturnState()) {
        const returnState = ReturnStateService.getReturnState();
        if (returnState) {
          console.log('Landing - Found return state, restoring with filter context:', {
            country: returnState.country,
            sector: returnState.sector,
            hasActiveFilters: returnState.hasActiveFilters,
            filterCount: returnState.selectedSectors?.length || 0
          });

          // Immediately scroll to map section without any delay
          const mapSection = document.getElementById('map-section');
          if (mapSection) {
            window.scrollTo({
              top: mapSection.offsetTop - 56,
              behavior: 'instant'
            });
          }

          // Restore filters immediately
          setSelectedSectors(returnState.selectedSectors);

          // Clear the return state immediately to prevent re-triggering
          ReturnStateService.clearReturnState();

          // Store return state in session storage for story card restoration
          sessionStorage.setItem('caseStudyReturnState', JSON.stringify(returnState));
        }
      }
    };
    handleReturnFromCaseStudy();
  }, []);
  React.useEffect(() => {
    const restoreStoryCard = () => {
      if (successStories.length === 0 && countryStories.length === 0) {
        return;
      }
      const storedState = sessionStorage.getItem('caseStudyReturnState');
      if (!storedState) return;
      try {
        const returnState = JSON.parse(storedState);
        console.log('Landing - Restoring story card with filter context:', {
          country: returnState.country,
          sector: returnState.sector,
          hasActiveFilters: returnState.hasActiveFilters,
          hasCountryStories: !!returnState.countryStories,
          hasSelectedSector: !!returnState.selectedSector
        });
        if (returnState.countryStories && returnState.selectedSector) {
          console.log('Landing - Restoring multi-sector country with filters');
          if (returnState.hasActiveFilters && returnState.selectedSectors.length > 0) {
            const filteredCountryStories = {
              ...returnState.countryStories,
              sectors: returnState.countryStories.sectors.filter(sector => returnState.selectedSectors.includes(sector.sector))
            };
            if (filteredCountryStories.sectors.some(s => s.sector === returnState.selectedSector.sector)) {
              setSelectedCountryStories(filteredCountryStories);
              setSelectedSector(returnState.selectedSector);

              // Create primary story with preserved primaryKey
              const primaryStory: SuccessStory = {
                id: `${returnState.countryStories.id}-${returnState.selectedSector.sector}`,
                primaryKey: returnState.selectedSector.primaryKey,
                // Preserve primaryKey
                country: returnState.countryStories.country,
                sector: returnState.selectedSector.sector,
                product: returnState.selectedSector.product,
                description: returnState.selectedSector.description,
                growthRate: returnState.selectedSector.growthRate,
                timeframe: returnState.countryStories.timeframe,
                exportValue: returnState.selectedSector.exportValue,
                keyFactors: returnState.selectedSector.keyFactors,
                coordinates: returnState.countryStories.coordinates,
                flag: returnState.countryStories.flag,
                marketDestinations: returnState.selectedSector.marketDestinations,
                challenges: returnState.selectedSector.challenges,
                impact: returnState.selectedSector.impact,
                globalRanking1995: returnState.selectedSector.globalRanking1995,
                globalRanking2022: returnState.selectedSector.globalRanking2022,
                initialExports1995: returnState.selectedSector.initialExports1995,
                initialExports2022: returnState.selectedSector.initialExports2022,
                successfulProduct: returnState.selectedSector.successfulProduct,
                successStorySummary: returnState.selectedSector.successStorySummary
              };
              setSelectedStory(primaryStory);
              if (worldMapRef.current && worldMapRef.current.flyToPosition && returnState.countryStories.coordinates) {
                console.log('Landing - Centering map on filtered multi-sector country');
                worldMapRef.current.flyToPosition([returnState.countryStories.coordinates.lng, returnState.countryStories.coordinates.lat], 5);
              }
            } else {
              console.log('Landing - Selected sector not in filtered results, skipping restoration');
            }
          } else {
            setSelectedCountryStories(returnState.countryStories);
            setSelectedSector(returnState.selectedSector);

            // Create primary story with preserved primaryKey  
            const primaryStory: SuccessStory = {
              id: `${returnState.countryStories.id}-${returnState.selectedSector.sector}`,
              primaryKey: returnState.selectedSector.primaryKey,
              // Preserve primaryKey
              country: returnState.countryStories.country,
              sector: returnState.selectedSector.sector,
              product: returnState.selectedSector.product,
              description: returnState.selectedSector.description,
              growthRate: returnState.selectedSector.growthRate,
              timeframe: returnState.countryStories.timeframe,
              exportValue: returnState.selectedSector.exportValue,
              keyFactors: returnState.selectedSector.keyFactors,
              coordinates: returnState.countryStories.coordinates,
              flag: returnState.countryStories.flag,
              marketDestinations: returnState.selectedSector.marketDestinations,
              challenges: returnState.selectedSector.challenges,
              impact: returnState.selectedSector.impact,
              globalRanking1995: returnState.selectedSector.globalRanking1995,
              globalRanking2022: returnState.selectedSector.globalRanking2022,
              initialExports1995: returnState.selectedSector.initialExports1995,
              initialExports2022: returnState.selectedSector.initialExports2022,
              successfulProduct: returnState.selectedSector.successfulProduct,
              successStorySummary: returnState.selectedSector.successStorySummary
            };
            setSelectedStory(primaryStory);
            if (worldMapRef.current && worldMapRef.current.flyToPosition && returnState.countryStories.coordinates) {
              console.log('Landing - Centering map on unfiltered multi-sector country');
              worldMapRef.current.flyToPosition([returnState.countryStories.coordinates.lng, returnState.countryStories.coordinates.lat], 5);
            }
          }
        } else {
          console.log('Landing - Restoring single-sector country');
          const targetStory = successStories.find(s => s.country === returnState.country && s.sector === returnState.sector);
          if (targetStory) {
            if (returnState.hasActiveFilters && returnState.selectedSectors.length > 0) {
              if (returnState.selectedSectors.includes(targetStory.sector)) {
                setSelectedStory(targetStory);
                if (worldMapRef.current && worldMapRef.current.flyToPosition && targetStory.coordinates) {
                  console.log('Landing - Centering map on filtered single-sector country');
                  worldMapRef.current.flyToPosition([targetStory.coordinates.lng, targetStory.coordinates.lat], 5);
                }
              } else {
                console.log('Landing - Single-sector story not in filtered results, skipping restoration');
              }
            } else {
              setSelectedStory(targetStory);
              if (worldMapRef.current && worldMapRef.current.flyToPosition && targetStory.coordinates) {
                console.log('Landing - Centering map on unfiltered single-sector country');
                worldMapRef.current.flyToPosition([targetStory.coordinates.lng, targetStory.coordinates.lat], 5);
              }
            }
          }
        }
        sessionStorage.removeItem('caseStudyReturnState');
      } catch (error) {
        console.error('Landing - Failed to restore story card:', error);
      }
    };
    restoreStoryCard();
  }, [successStories, countryStories]);
  React.useEffect(() => {
    const shouldScrollToMap = location.state?.returnedFromCaseStudy || location.state?.scrollToMap || sessionStorage.getItem('filtersToRestore') || window.location.hash === '#map' || new URLSearchParams(window.location.search).has('returnToMap');
    if (shouldScrollToMap) {
      setTimeout(() => {
        const mapSection = document.getElementById('map-section');
        if (mapSection) {
          const navHeight = 56;
          const elementPosition = mapSection.offsetTop;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          console.log('Auto-scrolled to map section on component mount');
        }
      }, 500);
    }
  }, []);
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

    // Tutorial will auto-trigger based on useTutorial hook logic
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

          // Create story with preserved primaryKey when filtering results in single sector
          const filteredStory: SuccessStory = {
            id: `${countryStories.id}-${filteredCountryStories.sectors[0].sector}`,
            primaryKey: filteredCountryStories.sectors[0].primaryKey,
            // Ensure primaryKey is preserved
            country: countryStories.country,
            sector: filteredCountryStories.sectors[0].sector,
            product: filteredCountryStories.sectors[0].product,
            description: filteredCountryStories.sectors[0].description,
            growthRate: filteredCountryStories.sectors[0].growthRate,
            timeframe: countryStories.timeframe,
            exportValue: filteredCountryStories.sectors[0].exportValue,
            keyFactors: filteredCountryStories.sectors[0].keyFactors,
            coordinates: countryStories.coordinates,
            flag: countryStories.flag,
            marketDestinations: filteredCountryStories.sectors[0].marketDestinations,
            challenges: filteredCountryStories.sectors[0].challenges,
            impact: filteredCountryStories.sectors[0].impact,
            globalRanking1995: filteredCountryStories.sectors[0].globalRanking1995,
            globalRanking2022: filteredCountryStories.sectors[0].globalRanking2022,
            initialExports1995: filteredCountryStories.sectors[0].initialExports1995,
            initialExports2022: filteredCountryStories.sectors[0].initialExports2022,
            successfulProduct: filteredCountryStories.sectors[0].successfulProduct,
            successStorySummary: filteredCountryStories.sectors[0].successStorySummary
          };
          console.log('Created filtered story with primaryKey:', filteredStory.primaryKey);
          setSelectedStory(filteredStory);
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
    console.log('handleClosePanel called - centering on selected country');
    let countryCoordinates: [number, number] = [30, 15];
    if (selectedStory?.coordinates) {
      countryCoordinates = [selectedStory.coordinates.lng, selectedStory.coordinates.lat];
    } else if (selectedCountryStories?.coordinates) {
      countryCoordinates = [selectedCountryStories.coordinates.lng, selectedCountryStories.coordinates.lat];
    }
    if (worldMapRef.current && worldMapRef.current.flyToPosition) {
      console.log('Centering map on country coordinates:', countryCoordinates);
      worldMapRef.current.flyToPosition(countryCoordinates, 3);
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
  const handleReadMore = (story: SuccessStory) => {
    console.log('Landing - handleReadMore called for story:', story);
    ReturnStateService.saveReturnState({
      selectedSectors,
      countryStories: selectedCountryStories,
      selectedSector: selectedSector,
      country: story.country,
      sector: story.sector
    });
    if (story.id && story.id.toString().match(/^\d+$/)) {
      navigate(`/enhanced-case-study/${story.id}`);
    } else {
      navigate(`/case-study/${story.id}`);
    }
  };
  const handleTutorialDemo = (story: SuccessStory | null) => {
    setSelectedStory(story);
  };
  const handleStartTutorial = () => {
    startTutorial();
    // Prevent scroll when tutorial starts
    setTimeout(() => {
      window.scrollTo({
        top: window.scrollY,
        behavior: 'auto'
      });
    }, 0);
  };
  const handleMapStateChange = (center: [number, number], zoom: number) => {
    const newMapState = {
      center,
      zoom
    };
    setMapState(newMapState);
  };
  const handleTutorialClose = () => {
    if (worldMapRef.current) {
      worldMapRef.current.resetToInitialPosition();
    }
    setSelectedStory(null);
    closeTutorial();
  };
  const handleClearPopupsCallback = useCallback((clearFn: () => void) => {
    setClearPopups(() => clearFn);
  }, []);
  const handleCloseMobileWelcome = () => {
    setShowMobileWelcome(false);
    localStorage.setItem('mobile-welcome-seen', 'true');
  };
  return <div className="min-h-screen">
      <NavigationBar onExploreClick={handleExploreMap} />
      
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden pt-14">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('/lovable-uploads/38f2e418-48dc-4da2-b98f-237902a9bcfa.png')`
      }}>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight text-left sm:text-center">
              Sector Transformation Atlas
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-left sm:text-center">Explore the playbooks behind 82 export booms in emerging economies since 1995</p>
            
            <div className="flex flex-col items-start sm:items-center">
              <Button onClick={handleExploreMap} size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold min-w-[200px]">
                <Map className="mr-2" size={20} />
                Explore the Map
              </Button>
              <div className="flex items-center mt-4 text-gray-700 text-sm sm:text-base bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                <span className="mr-2">A Project of</span>
                <img 
                  src="/lovable-uploads/6660cc2f-78f5-40c9-9279-abe45f6d3098.png" 
                  alt="Growth Teams" 
                  className="h-6 w-auto opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Exports Section */}
      <WhyExportsSection />

      {/* Map Section */}
      <div id="map-section" ref={mapSectionRef} className="h-[calc(100vh-3.5rem)] bg-gray-50">
        <div className="relative h-full">
          {/* Search Bar and Filter */}
          <div className="absolute top-4 left-2 sm:left-4 z-20 space-y-2 w-[calc(100vw-1rem)] sm:w-auto max-w-[280px] sm:max-w-none">
            <div className="tutorial-search-bar">
              <SearchBar onCountrySelect={handleCountrySelect} />
            </div>
            
            {!showSectorFilter && <Button onClick={handleShowSectorFilter} variant="outline" size="sm" className="bg-white/90 hover:bg-white flex items-center gap-2">
                <Filter size={16} />
                Show Filters
              </Button>}
            
            {showSectorFilter && <div className="w-full sm:w-72">
                <SectorFilter stories={successStories} countryStories={countryStories} selectedSectors={selectedSectors} onSectorToggle={handleSectorToggle} onReset={handleResetFilter} onClose={handleCloseSectorFilter} isVisible={showSectorFilter} isCompact={true} />
              </div>}
          </div>

          {/* Tutorial Button - positioned to avoid overlap with search bar on mobile */}
          <div className={`absolute z-20 ${isMobile ? 'bottom-20 right-4' : 'top-4 right-20'}`}>
            <div className="tutorial-help-button">
              <Button onClick={handleStartTutorial} variant="outline" size="sm" className="bg-white/90 hover:bg-white">
                <HelpCircle size={16} className="mr-1" />
                Tutorial
              </Button>
            </div>
          </div>

          <div className="h-full w-full">
            <WorldMap ref={worldMapRef} onCountrySelect={handleCountrySelect} selectedStory={selectedStory} onMapStateChange={handleMapStateChange} initialMapState={mapState} selectedSectors={selectedSectors} onStoriesLoaded={handleStoriesLoaded} onClearPopupsCallback={handleClearPopupsCallback} />
          </div>
          
          {/* Story Card Overlay - reduced width to ~500px */}
          {(selectedStory || selectedCountryStories && selectedSector) && <>
              <div className="absolute inset-0 bg-black bg-opacity-20 z-30" onClick={handleClosePanel} />
              
              <div className={`absolute right-0 top-0 h-full w-full sm:w-[32rem] z-40 transform transition-transform duration-300 tutorial-story-card ${selectedStory || selectedSector ? 'translate-x-0' : 'translate-x-full'}`}>
                <StoryCard story={selectedStory} countryStories={selectedCountryStories} selectedSector={selectedSector} selectedSectors={selectedSectors} onClose={handleClosePanel} onReadMore={handleReadMore} onSectorChange={handleSectorSelect} onClearPopups={clearPopups || undefined} />
              </div>
            </>}

          {/* Modals */}
          {showSectorModal && selectedCountryStories && <SectorSelectionModal countryStories={selectedCountryStories} onSectorSelect={handleSectorSelectFromModal} onClose={handleCloseSectorModal} />}

          {showFilteredSectorModal && selectedCountryStories && <FilteredSectorModal countryStories={selectedCountryStories} selectedSectors={selectedSectors} onSectorSelect={handleFilteredSectorSelectFromModal} onClose={handleCloseFilteredSectorModal} />}

          {showTutorial && <MapTutorial onClose={handleTutorialClose} onDemoCountrySelect={handleTutorialDemo} demoStory={selectedStory} selectedSectors={selectedSectors} onSectorToggle={handleSectorToggle} />}

          {/* Mobile Welcome Popup */}
          {showMobileWelcome && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Welcome!</h3>
                  <button onClick={handleCloseMobileWelcome} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Welcome to the Sector Transformation Atlas. This website is better viewed on a computer or tablet, but we welcome you to explore on your mobile device.
                </p>
                
                <Button onClick={handleCloseMobileWelcome} className="w-full bg-green-600 hover:bg-green-700">
                  Start Exploring
                </Button>
              </div>
            </div>}
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Get In Touch Section - reduced top padding to decrease space from About */}
      <div id="get-in-touch-section" className="pt-8">
        <GetInTouchSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>;
};
export default Landing;