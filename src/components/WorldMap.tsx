
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { fetchSuccessStories, fetchCountryStories, clearSuccessStoriesCache } from '../services/countryDataService';
import { successStories as fallbackStories } from '../data/successStories';

interface WorldMapProps {
  onCountrySelect: (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => void;
  selectedStory?: SuccessStory | null;
  onMapStateChange?: (center: [number, number], zoom: number) => void;
  initialMapState?: { center: [number, number]; zoom: number };
}

export interface WorldMapRef {
  resetToInitialPosition: () => void;
}

const WorldMap = forwardRef<WorldMapRef, WorldMapProps>(({ 
  onCountrySelect, 
  selectedStory,
  onMapStateChange,
  initialMapState
}, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [countryStories, setCountryStories] = useState<CountrySuccessStories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'fallback'>('supabase');
  const lastSelectedStory = useRef<SuccessStory | null>(null);
  const isFlying = useRef(false);
  const stateChangeTimeout = useRef<NodeJS.Timeout | null>(null);
  const mapStateInitialized = useRef(false);
  const initialMapStateApplied = useRef(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  // Fetch success stories on component mount
  useEffect(() => {
    const loadSuccessStories = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to load success stories...');
        
        // Clear cache to ensure fresh data
        clearSuccessStoriesCache();
        
        const [stories, multiSectorStories] = await Promise.all([
          fetchSuccessStories(),
          fetchCountryStories()
        ]);
        
        console.log('Received stories from Supabase:', stories.length, 'single-sector and', multiSectorStories.length, 'multi-sector');
        
        if (stories.length === 0 && multiSectorStories.length === 0) {
          console.log('No stories from Supabase, falling back to hardcoded data');
          setSuccessStories(fallbackStories);
          setCountryStories([]);
          setDataSource('fallback');
          setError('Using fallback data - Supabase connection issue detected');
        } else {
          setSuccessStories(stories);
          setCountryStories(multiSectorStories);
          setDataSource('supabase');
        }
        
      } catch (error) {
        console.error('Failed to load success stories:', error);
        console.log('Error occurred, falling back to hardcoded data');
        setSuccessStories(fallbackStories);
        setCountryStories([]);
        setDataSource('fallback');
        setError(`Supabase error (using fallback data): ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    loadSuccessStories();
  }, []);

  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('mapboxToken', token);
    setMapboxToken(token);
  };

  const handleMapStateChange = () => {
    if (stateChangeTimeout.current) {
      clearTimeout(stateChangeTimeout.current);
    }
    
    stateChangeTimeout.current = setTimeout(() => {
      if (map.current && onMapStateChange && !isFlying.current && mapStateInitialized.current) {
        const center = map.current.getCenter();
        const zoom = map.current.getZoom();
        onMapStateChange([center.lng, center.lat], zoom);
      }
    }, 200);
  };

  const resetToInitialPosition = () => {
    if (map.current && mapInitialized) {
      console.log('Resetting map to initial position');
      isFlying.current = true;
      map.current.flyTo({
        center: [20, 20],
        zoom: 2,
        duration: 1500
      });
      setTimeout(() => {
        isFlying.current = false;
      }, 1500);
    }
  };

  useImperativeHandle(ref, () => ({
    resetToInitialPosition
  }));

  // Initialize map only once when token is available and stories are loaded
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current || loading || (successStories.length === 0 && countryStories.length === 0)) return;

    console.log('Initializing map with', successStories.length, 'single-sector and', countryStories.length, 'multi-sector countries from', dataSource);
    
    mapboxgl.accessToken = mapboxToken;
    
    const initialCenter = [20, 20] as [number, number];
    const initialZoom = 2;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: initialZoom,
      center: initialCenter,
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('movestart', () => {
      isFlying.current = true;
    });

    map.current.on('moveend', () => {
      isFlying.current = false;
      handleMapStateChange();
    });

    map.current.on('style.load', () => {
      console.log('Map style loaded, adding markers...');
      
      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Add markers for single-sector countries
      successStories.forEach((story) => {
        if (!map.current || !story.coordinates || story.coordinates.lat === 0 && story.coordinates.lng === 0) return;
        
        addMarker(story, null, false);
      });

      // Add markers for multi-sector countries
      countryStories.forEach((countryStory) => {
        if (!map.current || !countryStory.coordinates || countryStory.coordinates.lat === 0 && countryStory.coordinates.lng === 0) return;
        
        addMarker(null, countryStory, true);
      });
      
      setMapInitialized(true);
      
      // Apply initial map state only once after a delay
      if (initialMapState && !initialMapStateApplied.current) {
        setTimeout(() => {
          if (map.current) {
            console.log('Applying initial map state:', initialMapState);
            map.current.setCenter(initialMapState.center);
            map.current.setZoom(initialMapState.zoom);
            initialMapStateApplied.current = true;
          }
          mapStateInitialized.current = true;
        }, 500);
      } else {
        setTimeout(() => {
          mapStateInitialized.current = true;
        }, 500);
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
        map.current.remove();
        map.current = null;
        setMapInitialized(false);
        mapStateInitialized.current = false;
        initialMapStateApplied.current = false;
      }
    };
  }, [mapboxToken, successStories, countryStories, loading]);

  const addMarker = (story: SuccessStory | null, countryStory: CountrySuccessStories | null, isMultiSector: boolean) => {
    if (!map.current) return;

    const coordinates = story?.coordinates || countryStory?.coordinates;
    const country = story?.country || countryStory?.country;
    const flag = story?.flag || countryStory?.flag;
    
    if (!coordinates || !country) return;

    // Create marker element - now both single and multi-sector are green
    const markerElement = document.createElement('div');
    markerElement.className = 'mapbox-marker';
    markerElement.setAttribute('data-story-id', story?.id || countryStory?.id || '');
    
    // Apply styles directly to avoid CSS conflicts - both green now
    markerElement.style.width = isMultiSector ? '24px' : '20px';
    markerElement.style.height = isMultiSector ? '24px' : '20px';
    markerElement.style.backgroundColor = '#10b981'; // Both are now green
    markerElement.style.border = isMultiSector ? '3px solid white' : '2px solid white';
    markerElement.style.borderRadius = '50%';
    markerElement.style.cursor = 'pointer';
    markerElement.style.boxShadow = isMultiSector 
      ? '0 3px 10px rgba(16, 185, 129, 0.5)' 
      : '0 2px 8px rgba(16, 185, 129, 0.4)';
    markerElement.style.transition = 'all 0.2s ease';

    // Add multi-sector indicator - keep the orange dot
    if (isMultiSector) {
      const indicator = document.createElement('div');
      indicator.style.position = 'absolute';
      indicator.style.top = '-2px';
      indicator.style.right = '-2px';
      indicator.style.width = '8px';
      indicator.style.height = '8px';
      indicator.style.backgroundColor = '#f59e0b';
      indicator.style.border = '1px solid white';
      indicator.style.borderRadius = '50%';
      markerElement.appendChild(indicator);
    }

    const marker = new mapboxgl.Marker({
      element: markerElement,
      anchor: 'center'
    })
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map.current);

    markers.current.push(marker);

    // Add click handler
    markerElement.addEventListener('click', (e) => {
      e.stopPropagation();
      if (story) {
        onCountrySelect(story, null);
      } else if (countryStory) {
        // For multi-sector, pass the primary sector as a legacy story
        const primaryStory: SuccessStory = {
          id: `${countryStory.id}-${countryStory.primarySector.sector}`,
          country: countryStory.country,
          sector: countryStory.primarySector.sector,
          product: countryStory.primarySector.product,
          description: countryStory.primarySector.description,
          growthRate: countryStory.primarySector.growthRate,
          timeframe: countryStory.timeframe,
          exportValue: countryStory.primarySector.exportValue,
          keyFactors: countryStory.primarySector.keyFactors,
          coordinates: countryStory.coordinates,
          flag: countryStory.flag,
          marketDestinations: countryStory.primarySector.marketDestinations,
          challenges: countryStory.primarySector.challenges,
          impact: countryStory.primarySector.impact,
          globalRanking1995: countryStory.primarySector.globalRanking1995,
          globalRanking2022: countryStory.primarySector.globalRanking2022,
          initialExports1995: countryStory.primarySector.initialExports1995,
          initialExports2022: countryStory.primarySector.initialExports2022,
          successfulProduct: countryStory.primarySector.successfulProduct,
          successStorySummary: countryStory.primarySector.successStorySummary
        };
        onCountrySelect(primaryStory, countryStory);
      }
    });

    // Add hover effects - both green now
    markerElement.addEventListener('mouseenter', () => {
      markerElement.style.backgroundColor = '#059669'; // Darker green for both
      markerElement.style.boxShadow = isMultiSector 
        ? '0 4px 12px rgba(16, 185, 129, 0.7)' 
        : '0 4px 12px rgba(16, 185, 129, 0.6)';
      markerElement.style.width = isMultiSector ? '28px' : '24px';
      markerElement.style.height = isMultiSector ? '28px' : '24px';
    });

    markerElement.addEventListener('mouseleave', () => {
      markerElement.style.backgroundColor = '#10b981'; // Back to green for both
      markerElement.style.boxShadow = isMultiSector 
        ? '0 3px 10px rgba(16, 185, 129, 0.5)' 
        : '0 2px 8px rgba(16, 185, 129, 0.4)';
      markerElement.style.width = isMultiSector ? '24px' : '20px';
      markerElement.style.height = isMultiSector ? '24px' : '20px';
    });

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false
    });

    if (isMultiSector && countryStory) {
      popup.setHTML(`
        <div class="p-3 max-w-xs">
          <div class="flex items-center mb-2">
            <span class="text-lg mr-2">${flag}</span>
            <h3 class="font-semibold text-sm">${country}</h3>
          </div>
          <p class="text-xs text-purple-600 font-medium mb-2">${countryStory.sectors.length} Success Stories</p>
          <div class="space-y-1">
            ${countryStory.sectors.slice(0, 3).map(sector => 
              `<div class="text-xs text-gray-600">• ${sector.sector}</div>`
            ).join('')}
            ${countryStory.sectors.length > 3 ? 
              `<div class="text-xs text-gray-500">+${countryStory.sectors.length - 3} more</div>` : 
              ''
            }
          </div>
        </div>
      `);
    } else if (story) {
      // Calculate ranking gain for single-sector countries
      const rankingGain = story.globalRanking1995 - story.globalRanking2022;
      const gainText = rankingGain > 0 ? `+${rankingGain}` : `${rankingGain}`;
      const gainColor = rankingGain > 0 ? 'text-green-600' : rankingGain < 0 ? 'text-red-600' : 'text-gray-600';
      
      popup.setHTML(`
        <div class="p-3">
          <h3 class="font-semibold text-sm">${country}</h3>
          <p class="text-xs text-gray-600">${story.sector}</p>
          <p class="text-xs font-medium ${gainColor}">Ranking gain: ${gainText}</p>
        </div>
      `);
    }

    markerElement.addEventListener('mouseenter', () => {
      popup.setLngLat([coordinates.lng, coordinates.lat]).addTo(map.current!);
    });

    markerElement.addEventListener('mouseleave', () => {
      popup.remove();
    });
  };

  // Handle story selection flyTo - now handles both single and multi-sector
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    if (selectedStory) {
      isFlying.current = true;
      map.current.flyTo({
        center: [selectedStory.coordinates.lng, selectedStory.coordinates.lat],
        zoom: 5,
        duration: 2000
      });
      lastSelectedStory.current = selectedStory;
      
      setTimeout(() => {
        isFlying.current = false;
      }, 2000);
    } else if (lastSelectedStory.current) {
      // When closing (selectedStory becomes null), zoom out
      isFlying.current = true;
      map.current.flyTo({
        center: [20, 20], // Return to world view
        zoom: 2,
        duration: 1500
      });
      lastSelectedStory.current = null;
      
      setTimeout(() => {
        isFlying.current = false;
      }, 1500);
    }
  }, [selectedStory, mapInitialized]);

  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
        <div className="max-w-md text-center">
          <h3 className="text-lg font-semibold mb-4">Mapbox Token Required</h3>
          <p className="text-gray-600 mb-4">
            Please enter your Mapbox public token to view the interactive map. 
            You can get one for free at{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              mapbox.com
            </a>
          </p>
          <input
            type="text"
            placeholder="Enter your Mapbox public token"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleTokenSubmit(e.currentTarget.value);
              }
            }}
          />
          <button
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              if (input.value) {
                handleTokenSubmit(input.value);
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Token
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Your token will be saved locally for future visits
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading country data...</p>
        <p className="text-xs text-gray-500 mt-2">Attempting to connect to Supabase</p>
      </div>
    );
  }

  const totalCountries = successStories.length + countryStories.length;

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
      
      {/* Data source indicator */}
      {dataSource === 'fallback' && (
        <div className="absolute top-4 left-4 z-10 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Using sample data - Database connection issue
          </div>
        </div>
      )}
      
      {dataSource === 'supabase' && (
        <div className="absolute top-4 left-4 z-10 bg-green-100 border border-green-400 text-green-800 px-3 py-2 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Live data from Supabase ({totalCountries} countries)
          </div>
        </div>
      )}

      {/* Legend for multi-sector countries */}
      {countryStories.length > 0 && (
        <div className="absolute bottom-4 left-4 z-10 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
              <span>Single Sector</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full border border-white"></div>
              </div>
              <span>Multiple Sectors</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;
