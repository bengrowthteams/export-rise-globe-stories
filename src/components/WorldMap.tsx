import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { fetchSuccessStories, fetchCountryStories, clearSuccessStoriesCache } from '../services/countryDataService';
import { successStories as fallbackStories } from '../data/successStories';
import { getSectorColor } from '../data/sectorColors';
import { countryFlags, getCountryFlag } from '../data/countryFlags';

interface WorldMapProps {
  onCountrySelect: (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => void;
  selectedStory?: SuccessStory | null;
  onMapStateChange?: (center: [number, number], zoom: number) => void;
  initialMapState?: { center: [number, number]; zoom: number };
  selectedSectors?: string[];
  onStoriesLoaded?: (stories: SuccessStory[], countryStories: CountrySuccessStories[]) => void;
  is3DView?: boolean;
}

export interface WorldMapRef {
  resetToInitialPosition: () => void;
  flyToPosition: (center: [number, number], zoom: number) => void;
  getCurrentMapState: () => { center: [number, number]; zoom: number } | null;
}

// Store the Mapbox token as a constant
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmVuYmFzZWJhbGwxIiwiYSI6ImNtYzlpN3FrczE1MW4ybW9lM3ZzY2lkbWkifQ.UTHfGBeNb7EyBbIEt99mqQ';

const WorldMap = forwardRef<WorldMapRef, WorldMapProps>(({ 
  onCountrySelect, 
  selectedStory,
  onMapStateChange,
  initialMapState,
  selectedSectors = [],
  onStoriesLoaded,
  is3DView = false
}, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [countryStories, setCountryStories] = useState<CountrySuccessStories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'fallback'>('supabase');
  const lastSelectedStory = useRef<SuccessStory | null>(null);
  const isFlying = useRef(false);
  const dataLoadingRef = useRef(false);
  const preservedMapState = useRef<{ center: [number, number]; zoom: number } | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      
    }
  }, []);

  useEffect(() => {
    const loadSuccessStories = async () => {
      // Prevent multiple simultaneous loading attempts
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
          // Notify parent component only once
          if (onStoriesLoaded) {
            onStoriesLoaded(fallbackStories, []);
          }
        } else {
          setSuccessStories(stories);
          setCountryStories(multiSectorStories);
          setDataSource('supabase');
          // Notify parent component only once
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
        // Notify parent component only once
        if (onStoriesLoaded) {
          onStoriesLoaded(fallbackStories, []);
        }
      } finally {
        setLoading(false);
        dataLoadingRef.current = false;
      }
    };

    // Load data only once on mount
    loadSuccessStories();
  }, []); // Remove onStoriesLoaded from dependencies to prevent infinite loop

  // Simplified map state change handler - no debouncing to eliminate flash effect
  const handleMapStateChange = () => {
    if (map.current && onMapStateChange && !isFlying.current && mapInitialized) {
      const center = map.current.getCenter();
      const zoom = map.current.getZoom();
      onMapStateChange([center.lng, center.lat], zoom);
    }
  };

  const getCurrentMapState = () => {
    if (map.current && mapInitialized) {
      const center = map.current.getCenter();
      const zoom = map.current.getZoom();
      return { center: [center.lng, center.lat] as [number, number], zoom };
    }
    return null;
  };

  const resetToInitialPosition = () => {
    if (map.current && mapInitialized) {
      console.log('Resetting map to initial position');
      isFlying.current = true;
      
      if (is3DView) {
        // Reset to centered globe position
        map.current.flyTo({
          center: [0, 0],
          zoom: 1.5,
          duration: 1500
        });
      } else {
        // Reset to 2D map position
        map.current.flyTo({
          center: [20, 20],
          zoom: 2,
          duration: 1500
        });
      }
      
      setTimeout(() => {
        isFlying.current = false;
      }, 1500);
    }
  };

  const flyToPosition = (center: [number, number], zoom: number) => {
    if (map.current && mapInitialized) {
      console.log('Flying to position:', center, 'zoom:', zoom);
      
      // Validate coordinates before flying
      const validLng = Math.max(-180, Math.min(180, center[0]));
      const validLat = Math.max(-85, Math.min(85, center[1]));
      const validZoom = Math.max(1, Math.min(20, zoom));
      
      isFlying.current = true;
      map.current.flyTo({
        center: [validLng, validLat],
        zoom: validZoom,
        duration: 1500
      });
      
      setTimeout(() => {
        isFlying.current = false;
      }, 1500);
    }
  };

  useImperativeHandle(ref, () => ({
    resetToInitialPosition,
    flyToPosition,
    getCurrentMapState
  }));

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

  // Handle 3D/2D view toggle with improved location preservation
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    console.log('Switching to', is3DView ? '3D' : '2D', 'view');
    
    const currentCenter = map.current.getCenter();
    const currentZoom = map.current.getZoom();
    preservedMapState.current = { 
      center: [currentCenter.lng, currentCenter.lat], 
      zoom: currentZoom 
    };
    
    console.log('Preserving map state:', preservedMapState.current);
    
    if (is3DView) {
      map.current.setProjection('globe');
      map.current.setPitch(0);
      
      map.current.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
      
      map.current.setMaxBounds(undefined);
      
      const constrainedLng = ((currentCenter.lng % 360) + 360) % 360;
      const finalLng = constrainedLng > 180 ? constrainedLng - 360 : constrainedLng;
      
      map.current.setCenter([finalLng, currentCenter.lat]);
      map.current.setZoom(Math.max(1.5, Math.min(currentZoom, 8)));
    } else {
      map.current.setProjection('mercator');
      map.current.setPitch(0);
      
      map.current.setFog({});
      
      map.current.setMaxBounds([
        [-180, -85],
        [180, 85]
      ]);
      
      const constrainedLng = Math.max(-180, Math.min(180, preservedMapState.current?.center[0] || currentCenter.lng));
      const constrainedLat = Math.max(-85, Math.min(85, preservedMapState.current?.center[1] || currentCenter.lat));
      
      map.current.setCenter([constrainedLng, constrainedLat]);
      map.current.setZoom(preservedMapState.current?.zoom || currentZoom);
    }
    
  }, [is3DView, mapInitialized]);

  // Enhanced map initialization
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
      initialCenter = is3DView ? [0, 0] : [20, 20];
      initialZoom = is3DView ? 1.5 : 2;
      console.log('Using default initial map state:', { center: initialCenter, zoom: initialZoom });
    }
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: is3DView ? 'globe' : 'mercator',
      zoom: initialZoom,
      center: initialCenter,
      pitch: 0,
      bearing: 0,
      maxBounds: is3DView ? undefined : [[-180, -85], [180, 85]],
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
      
      if (is3DView) {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      }
      
      updateMarkers();
      setMapInitialized(true);
    });

    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
        map.current.remove();
        map.current = null;
        setMapInitialized(false);
      }
    };
  }, [successStories, countryStories, loading, is3DView, initialMapState]);

  useEffect(() => {
    if (mapInitialized) {
      updateMarkers();
    }
  }, [selectedSectors, mapInitialized]);

  const updateMarkers = () => {
    if (!map.current) return;

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const { filteredSingleStories, filteredCountryStories } = getFilteredStories();

    filteredSingleStories.forEach((story) => {
      if (!map.current || !story.coordinates || (story.coordinates.lat === 0 && story.coordinates.lng === 0)) return;
      
      const markerColor = selectedSectors.length > 0 ? getSectorColor(story.sector) : '#10b981';
      addMarker(story, null, false, markerColor);
    });

    filteredCountryStories.forEach((countryStory) => {
      if (!map.current || !countryStory.coordinates || (countryStory.coordinates.lat === 0 && countryStory.coordinates.lng === 0)) return;
      
      const hasMultipleFilteredSectors = countryStory.hasMutipleSectors;
      let markerColor;
      
      if (selectedSectors.length > 0) {
        markerColor = hasMultipleFilteredSectors ? '#10b981' : getSectorColor(countryStory.sectors[0].sector);
      } else {
        markerColor = '#10b981';
      }
      
      console.log(`Adding filtered marker for ${countryStory.country}: hasMultiple=${hasMultipleFilteredSectors}, sectors=${countryStory.sectors.length}, color=${markerColor}`);
      addMarker(null, countryStory, hasMultipleFilteredSectors, markerColor);
    });
  };

  const addMarker = (story: SuccessStory | null, countryStory: CountrySuccessStories | null, isMultiSector: boolean, color: string = '#10b981') => {
    if (!map.current) return;

    const coordinates = story?.coordinates || countryStory?.coordinates;
    const country = story?.country || countryStory?.country;
    const flag = getCountryFlag(country || '');
    
    if (!coordinates || !country) {
      console.warn(`Missing coordinates or country for marker:`, { country, coordinates });
      return;
    }

    if (coordinates.lat === 0 && coordinates.lng === 0) {
      console.warn(`Invalid coordinates (0,0) for country: ${country} - skipping marker`);
      return;
    }

    console.log(`Adding marker for ${country} at:`, coordinates, 'with color:', color, 'isMultiSector:', isMultiSector, 'flag:', flag);

    const markerElement = document.createElement('div');
    markerElement.className = 'mapbox-marker';
    markerElement.setAttribute('data-story-id', story?.id || countryStory?.id || '');
    
    markerElement.style.width = isMultiSector ? '24px' : '20px';
    markerElement.style.height = isMultiSector ? '24px' : '20px';
    markerElement.style.backgroundColor = color;
    markerElement.style.border = isMultiSector ? '3px solid white' : '2px solid white';
    markerElement.style.borderRadius = '50%';
    markerElement.style.cursor = 'pointer';
    markerElement.style.boxShadow = isMultiSector 
      ? `0 3px 10px ${color}80` 
      : `0 2px 8px ${color}66`;
    markerElement.style.transition = 'all 0.2s ease';

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

    markerElement.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Marker clicked for:', country, 'isMultiSector:', isMultiSector, 'Filtering active:', selectedSectors.length > 0);
      
      if (story) {
        console.log('Calling onCountrySelect with single story:', story.country);
        onCountrySelect(story, null);
      } else if (countryStory) {
        console.log('Calling onCountrySelect with country story:', countryStory.country, 'sectors:', countryStory.sectors.length, 'hasMutipleSectors:', countryStory.hasMutipleSectors);
        
        const sectorToUse = countryStory.sectors[0];
        console.log('Using sector for primaryStory:', sectorToUse.sector);
        
        const primaryStory: SuccessStory = {
          id: `${countryStory.id}-${sectorToUse.sector}`,
          country: countryStory.country,
          sector: sectorToUse.sector,
          product: sectorToUse.product,
          description: sectorToUse.description,
          growthRate: sectorToUse.growthRate,
          timeframe: countryStory.timeframe,
          exportValue: sectorToUse.exportValue,
          keyFactors: sectorToUse.keyFactors,
          coordinates: countryStory.coordinates,
          flag: countryStory.flag,
          marketDestinations: sectorToUse.marketDestinations,
          challenges: sectorToUse.challenges,
          impact: sectorToUse.impact,
          globalRanking1995: sectorToUse.globalRanking1995,
          globalRanking2022: sectorToUse.globalRanking2022,
          initialExports1995: sectorToUse.initialExports1995,
          initialExports2022: sectorToUse.initialExports2022,
          successfulProduct: sectorToUse.successfulProduct,
          successStorySummary: sectorToUse.successStorySummary
        };
        onCountrySelect(primaryStory, countryStory);
      }
    });

    markerElement.addEventListener('mouseenter', () => {
      const darkerColor = color === '#10b981' ? '#059669' : color;
      markerElement.style.backgroundColor = darkerColor;
      markerElement.style.boxShadow = isMultiSector 
        ? `0 4px 12px ${darkerColor}99` 
        : `0 4px 12px ${darkerColor}80`;
      markerElement.style.width = isMultiSector ? '28px' : '24px';
      markerElement.style.height = isMultiSector ? '28px' : '24px';
    });

    markerElement.addEventListener('mouseleave', () => {
      markerElement.style.backgroundColor = color;
      markerElement.style.boxShadow = isMultiSector 
        ? `0 3px 10px ${color}80` 
        : `0 2px 8px ${color}66`;
      markerElement.style.width = isMultiSector ? '24px' : '20px';
      markerElement.style.height = isMultiSector ? '24px' : '20px';
    });

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false
    });

    if (isMultiSector && countryStory && countryStory.sectors.length > 1) {
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
    } else {
      let sectorData, rankingGain, gainText, gainColor;
      
      if (story) {
        sectorData = story;
      } else if (countryStory && countryStory.sectors.length === 1) {
        const sector = countryStory.sectors[0];
        sectorData = {
          sector: sector.sector,
          globalRanking1995: sector.globalRanking1995,
          globalRanking2022: sector.globalRanking2022
        };
      }
      
      if (sectorData) {
        rankingGain = sectorData.globalRanking1995 - sectorData.globalRanking2022;
        gainText = rankingGain > 0 ? `+${rankingGain}` : `${rankingGain}`;
        gainColor = rankingGain > 0 ? 'text-green-600' : rankingGain < 0 ? 'text-red-600' : 'text-gray-600';
        
        popup.setHTML(`
          <div class="p-3">
            <div class="flex items-center mb-1">
              <span class="text-lg mr-2">${flag}</span>
              <h3 class="font-semibold text-sm">${country}</h3>
            </div>
            <p class="text-xs text-gray-600">${sectorData.sector}</p>
            <p class="text-xs font-medium ${gainColor}">Ranking gain: ${gainText}</p>
          </div>
        `);
      } else {
        popup.setHTML(`
          <div class="p-3">
            <div class="flex items-center mb-1">
              <span class="text-lg mr-2">${flag}</span>
              <h3 class="font-semibold text-sm">${country}</h3>
            </div>
          </div>
        `);
      }
    }

    markerElement.addEventListener('mouseenter', () => {
      popup.setLngLat([coordinates.lng, coordinates.lat]).addTo(map.current!);
    });

    markerElement.addEventListener('mouseleave', () => {
      popup.remove();
    });
  };

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
    }
  }, [selectedStory, mapInitialized, is3DView]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading country data...</p>
        <p className="text-xs text-gray-500 mt-2">Attempting to connect to Supabase</p>
      </div>
    );
  }

  const { filteredSingleStories, filteredCountryStories } = getFilteredStories();
  const totalCountries = filteredSingleStories.length + filteredCountryStories.length;
  const originalTotal = successStories.length + countryStories.length;

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
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
              : `${is3DView ? '3D Globe' : '2D Map'} - Live data (${totalCountries} countries)`
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
