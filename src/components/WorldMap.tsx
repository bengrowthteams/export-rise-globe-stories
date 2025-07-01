import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { fetchSuccessStories, fetchCountryStories, clearSuccessStoriesCache } from '../services/countryDataService';
import { successStories as fallbackStories } from '../data/successStories';
import { getSectorColor } from '../data/sectorColors';
import { useMapState } from '../hooks/useMapState';
import { useMapMarkers } from '../hooks/useMapMarkers';

interface WorldMapProps {
  onCountrySelect: (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => void;
  selectedStory?: SuccessStory | null;
  onMapStateChange?: (center: [number, number], zoom: number) => void;
  initialMapState?: { center: [number, number]; zoom: number };
  selectedSectors?: string[];
  onStoriesLoaded?: (stories: SuccessStory[], countryStories: CountrySuccessStories[]) => void;
  onClearPopupsCallback?: (clearFn: () => void) => void;
}

export interface WorldMapRef {
  resetToInitialPosition: () => void;
  flyToPosition: (center: [number, number], zoom: number) => void;
  getCurrentMapState: () => { center: [number, number]; zoom: number } | null;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmVuYmFzZWJhbGwxIiwiYSI6ImNtYzlpN3FrczE1MW4ybW9lM3ZzY2lkbWkifQ.UTHfGBeNb7EyBbIEt99mqQ';

const WorldMap = forwardRef<WorldMapRef, WorldMapProps>(({ 
  onCountrySelect, 
  selectedStory,
  onMapStateChange,
  initialMapState,
  selectedSectors = [],
  onStoriesLoaded,
  onClearPopupsCallback
}, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [countryStories, setCountryStories] = useState<CountrySuccessStories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'fallback'>('supabase');
  const dataLoadingRef = useRef(false);

  const {
    isFlying,
    handleMapStateChange,
    getCurrentMapState,
    resetToInitialPosition,
    flyToPosition
  } = useMapState(map, mapInitialized, onMapStateChange);

  const { updateMarkers, clearAllPopups } = useMapMarkers(map, onCountrySelect);

  useImperativeHandle(ref, () => ({
    resetToInitialPosition,
    flyToPosition,
    getCurrentMapState
  }));

  // Pass clear popups function to parent
  useEffect(() => {
    if (onClearPopupsCallback && clearAllPopups) {
      onClearPopupsCallback(clearAllPopups);
    }
  }, [onClearPopupsCallback, clearAllPopups]);

  // Load success stories
  useEffect(() => {
    const loadSuccessStories = async () => {
      if (dataLoadingRef.current) {
        console.log('Data loading already in progress, skipping...');
        return;
      }

      try {
        dataLoadingRef.current = true;
        setLoading(true);
        setError(null);
        console.log('Starting to load success stories...');
        
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
          if (onStoriesLoaded) {
            onStoriesLoaded(fallbackStories, []);
          }
        } else {
          setSuccessStories(stories);
          setCountryStories(multiSectorStories);
          setDataSource('supabase');
          if (onStoriesLoaded) {
            onStoriesLoaded(stories, multiSectorStories);
          }
        }
        
      } catch (error) {
        console.error('Failed to load success stories:', error);
        console.log('Error occurred, falling back to hardcoded data');
        setSuccessStories(fallbackStories);
        setCountryStories([]);
        setDataSource('fallback');
        setError(`Supabase error (using fallback data): ${error instanceof Error ? error.message : 'Unknown error'}`);
        if (onStoriesLoaded) {
          onStoriesLoaded(fallbackStories, []);
        }
      } finally {
        setLoading(false);
        dataLoadingRef.current = false;
      }
    };

    loadSuccessStories();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current || loading || (successStories.length === 0 && countryStories.length === 0)) return;

    console.log('Initializing map with', successStories.length, 'single-sector and', countryStories.length, 'multi-sector countries from', dataSource);
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    let initialCenter: [number, number];
    let initialZoom: number;
    
    if (initialMapState && initialMapState.center && initialMapState.zoom) {
      const validLng = Math.max(-180, Math.min(180, initialMapState.center[0]));
      const validLat = Math.max(-85, Math.min(85, initialMapState.center[1]));
      const validZoom = Math.max(1, Math.min(20, initialMapState.zoom));
      
      initialCenter = [validLng, validLat];
      initialZoom = validZoom;
      console.log('Using provided initial map state:', { center: initialCenter, zoom: initialZoom });
    } else {
      initialCenter = [20, 20];
      initialZoom = 2;
      console.log('Using default initial map state:', { center: initialCenter, zoom: initialZoom });
    }
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: { name: 'mercator' },
      zoom: initialZoom,
      center: initialCenter,
      pitch: 0,
      bearing: 0,
      maxBounds: [[-180, -85], [180, 85]],
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
      updateMarkers(successStories, countryStories, selectedSectors);
      setMapInitialized(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        setMapInitialized(false);
      }
    };
  }, [successStories, countryStories, loading, initialMapState]);

  // Update markers when filters change
  useEffect(() => {
    if (mapInitialized) {
      updateMarkers(successStories, countryStories, selectedSectors);
    }
  }, [selectedSectors, mapInitialized, updateMarkers, successStories, countryStories]);

  // Handle selected story changes
  useEffect(() => {
    if (!map.current || !mapInitialized || !selectedStory) return;

    isFlying.current = true;
    map.current.flyTo({
      center: [selectedStory.coordinates.lng, selectedStory.coordinates.lat],
      zoom: 5,
      duration: 2000
    });
    
    setTimeout(() => {
      isFlying.current = false;
    }, 2000);
  }, [selectedStory, mapInitialized]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading country data...</p>
        <p className="text-xs text-gray-500 mt-2">Attempting to connect to Supabase</p>
      </div>
    );
  }

  const getFilteredStories = () => {
    if (selectedSectors.length === 0) {
      return { filteredSingleStories: successStories, filteredCountryStories: countryStories };
    }

    const filteredSingleStories = successStories.filter(story => 
      selectedSectors.includes(story.sector)
    );

    const filteredCountryStories = countryStories.map(countryStory => {
      const matchingSectors = countryStory.sectors.filter(sector => 
        selectedSectors.includes(sector.sector)
      );
      
      if (matchingSectors.length === 0) return null;
      
      return {
        ...countryStory,
        sectors: matchingSectors,
        primarySector: matchingSectors[0],
        hasMutipleSectors: matchingSectors.length > 1
      };
    }).filter(Boolean) as CountrySuccessStories[];

    return { filteredSingleStories, filteredCountryStories };
  };

  const { filteredSingleStories, filteredCountryStories } = getFilteredStories();
  const totalCountries = filteredSingleStories.length + filteredCountryStories.length;
  const originalTotal = successStories.length + countryStories.length;

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 rounded-lg shadow-lg" 
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
      
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
            {selectedSectors.length > 0 
              ? `Filtered: ${totalCountries} of ${originalTotal} countries` 
              : `2D Map - Live data (${totalCountries} countries)`
            }
          </div>
        </div>
      )}

      {(filteredCountryStories.length > 0 || selectedSectors.length > 0) && (
        <div className="absolute bottom-4 left-4 z-10 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs shadow-sm">
          <div className="flex items-center gap-4">
            {selectedSectors.length === 0 ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span>Filtered by:</span>
                {selectedSectors.slice(0, 3).map(sector => (
                  <div key={sector} className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: getSectorColor(sector) }}
                    />
                    <span className="text-xs">{sector}</span>
                  </div>
                ))}
                {selectedSectors.length > 3 && (
                  <span className="text-gray-500">+{selectedSectors.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;
