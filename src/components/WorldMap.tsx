import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SuccessStory } from '../types/SuccessStory';
import { successStories } from '../data/successStories';

interface WorldMapProps {
  onCountrySelect: (story: SuccessStory | null) => void;
  selectedStory?: SuccessStory | null;
}

const WorldMap: React.FC<WorldMapProps> = ({ onCountrySelect, selectedStory }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    // Try to load token from localStorage on component mount
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  const handleTokenSubmit = (token: string) => {
    // Save token to localStorage when user enters it
    localStorage.setItem('mapboxToken', token);
    setMapboxToken(token);
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 2,
      center: [20, 20],
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for success stories
    map.current.on('style.load', () => {
      successStories.forEach((story) => {
        if (!map.current) return;

        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.cssText = `
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #10b981, #059669);
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        `;

        // Create marker
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([story.coordinates.lng, story.coordinates.lat])
          .addTo(map.current);

        // Add click handler
        markerElement.addEventListener('click', () => {
          onCountrySelect(story);
          map.current?.flyTo({
            center: [story.coordinates.lng, story.coordinates.lat],
            zoom: 5,
            duration: 2000
          });
        });

        // Add popup on hover
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
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, onCountrySelect]);

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
};

export default WorldMap;
