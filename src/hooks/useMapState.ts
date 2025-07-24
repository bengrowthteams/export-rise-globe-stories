
import { useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

export interface MapStateRef {
  resetToInitialPosition: () => void;
  smoothResetToInitialPosition: () => void;
  flyToPosition: (center: [number, number], zoom: number) => void;
  getCurrentMapState: () => { center: [number, number]; zoom: number } | null;
}

export const useMapState = (
  map: React.MutableRefObject<mapboxgl.Map | null>,
  mapInitialized: boolean,
  onMapStateChange?: (center: [number, number], zoom: number) => void
) => {
  const isFlying = useRef(false);

  const handleMapStateChange = useCallback(() => {
    if (map.current && onMapStateChange && !isFlying.current && mapInitialized) {
      const center = map.current.getCenter();
      const zoom = map.current.getZoom();
      onMapStateChange([center.lng, center.lat], zoom);
    }
  }, [map, onMapStateChange, mapInitialized]);

  const getCurrentMapState = useCallback(() => {
    if (map.current && mapInitialized) {
      const center = map.current.getCenter();
      const zoom = map.current.getZoom();
      return { center: [center.lng, center.lat] as [number, number], zoom };
    }
    return null;
  }, [map, mapInitialized]);

  const resetToInitialPosition = useCallback(() => {
    if (map.current && mapInitialized) {
      console.log('Resetting map to initial position');
      isFlying.current = true;
      
      map.current.flyTo({
        center: [20, 20],
        zoom: 1,
        duration: 1500
      });
      
      setTimeout(() => {
        isFlying.current = false;
      }, 1500);
    }
  }, [map, mapInitialized]);

  const smoothResetToInitialPosition = useCallback(() => {
    if (map.current && mapInitialized) {
      console.log('Smoothly resetting map to initial position');
      isFlying.current = true;
      
      map.current.easeTo({
        center: [20, 20],
        zoom: 1,
        duration: 500
      });
      
      setTimeout(() => {
        isFlying.current = false;
      }, 500);
    }
  }, [map, mapInitialized]);

  const flyToPosition = useCallback((center: [number, number], zoom: number) => {
    if (map.current && mapInitialized) {
      console.log('Flying to position:', center, 'zoom:', zoom);
      
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
  }, [map, mapInitialized]);

  return {
    isFlying,
    handleMapStateChange,
    getCurrentMapState,
    resetToInitialPosition,
    smoothResetToInitialPosition,
    flyToPosition
  };
};
