
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SuccessStory } from '../types/SuccessStory';
import { successStories } from '../data/successStories';

interface WorldMapProps {
  onCountrySelect: (story: SuccessStory | null) => void;
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

  // Initialize map only once when token is available
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    console.log('Initializing map...');
    
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

      successStories.forEach((story) => {
        if (!map.current) return;

        // Create custom marker element with fixed positioning
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.setAttribute('data-story-id', story.id);
        markerElement.style.cssText = `
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #10b981, #059669);
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        `;

        // Create marker with fixed positioning
        const marker = new mapboxgl.Marker({
          element: markerElement,
          anchor: 'center'
        })
          .setLngLat([story.coordinates.lng, story.coordinates.lat])
          .addTo(map.current);

        markers.current.push(marker);

        markerElement.addEventListener('click', () => {
          onCountrySelect(story);
        });

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(`
          <div class="p-3">
            <h3 class="font-semibold text-sm">${story.country}</h3>
            <p class="text-xs text-gray-600">${story.sector}</p>
            <p class="text-xs font-medium text-green-600">+${story.growthRate}% growth</p>
          </div>
        `);

        markerElement.addEventListener('mouseenter', () => {
          popup.setLngLat([story.coordinates.lng, story.coordinates.lat]).addTo(map.current!);
        });

        markerElement.addEventListener('mouseleave', () => {
          popup.remove();
        });
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
  }, [mapboxToken]);

  // Handle story selection flyTo
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
      isFlying.current = true;
      map.current.flyTo({
        center: [lastSelectedStory.current.coordinates.lng, lastSelectedStory.current.coordinates.lat],
        zoom: 2,
        duration: 1500
      });
      
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

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;
