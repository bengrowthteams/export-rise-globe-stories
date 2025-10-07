import { useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { SuccessStory } from '../types/SuccessStory';
import { CountrySuccessStories } from '../types/CountrySuccessStories';
import { getSectorColor } from '../data/sectorColors';
import { getCountryFlag } from '../data/countryFlags';

export const useMapMarkers = (
  map: React.MutableRefObject<mapboxgl.Map | null>,
  onCountrySelect: (story: SuccessStory | null, countryStories?: CountrySuccessStories | null) => void
) => {
  const markers = useRef<mapboxgl.Marker[]>([]);
  const activePopups = useRef<mapboxgl.Popup[]>([]);

  const clearMarkers = useCallback(() => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    // Clear all active popups
    activePopups.current.forEach(popup => popup.remove());
    activePopups.current = [];
  }, []);

  const clearAllPopups = useCallback(() => {
    activePopups.current.forEach(popup => popup.remove());
    activePopups.current = [];
  }, []);

  const addMarker = useCallback((
    story: SuccessStory | null, 
    countryStory: CountrySuccessStories | null, 
    isMultiSector: boolean, 
    color: string = '#000000'
  ) => {
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
      console.log('Marker clicked for:', country, 'isMultiSector:', isMultiSector);
      
      if (story) {
        console.log('Calling onCountrySelect with single story:', story.country);
        onCountrySelect(story, null);
      } else if (countryStory) {
        console.log('Calling onCountrySelect with country story:', countryStory.country, 'sectors:', countryStory.sectors.length);
        
        const sectorToUse = countryStory.sectors[0];
        console.log('Using sector for primaryStory:', sectorToUse.sector, 'primaryKey:', sectorToUse.primaryKey);
        
        const primaryStory: SuccessStory = {
          id: `${countryStory.id}-${sectorToUse.sector}`,
          primaryKey: sectorToUse.primaryKey,
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
        
        console.log('Created primaryStory with primaryKey:', primaryStory.primaryKey);
        onCountrySelect(primaryStory, countryStory);
      }
    });

    // Add hover effects and popup
    markerElement.addEventListener('mouseenter', () => {
      const darkerColor = color === '#000000' ? '#333333' : color;
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
      activePopups.current.push(popup);
    });

    markerElement.addEventListener('mouseleave', () => {
      popup.remove();
      activePopups.current = activePopups.current.filter(p => p !== popup);
    });
  }, [map, onCountrySelect]);

  const updateMarkers = useCallback((
    successStories: SuccessStory[],
    countryStories: CountrySuccessStories[],
    selectedSectors: string[]
  ) => {
    if (!map.current) return;

    clearMarkers();

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

    filteredSingleStories.forEach((story) => {
      if (!story.coordinates || (story.coordinates.lat === 0 && story.coordinates.lng === 0)) return;
      
      const markerColor = selectedSectors.length > 0 ? getSectorColor(story.sector) : '#000000';
      addMarker(story, null, false, markerColor);
    });

    filteredCountryStories.forEach((countryStory) => {
      if (!countryStory.coordinates || (countryStory.coordinates.lat === 0 && countryStory.coordinates.lng === 0)) return;
      
      const hasMultipleFilteredSectors = countryStory.hasMutipleSectors;
      let markerColor;
      
      if (selectedSectors.length > 0) {
        markerColor = hasMultipleFilteredSectors ? '#000000' : getSectorColor(countryStory.sectors[0].sector);
      } else {
        markerColor = '#000000';
      }
      
      console.log(`Adding filtered marker for ${countryStory.country}: hasMultiple=${hasMultipleFilteredSectors}, sectors=${countryStory.sectors.length}, color=${markerColor}`);
      addMarker(null, countryStory, hasMultipleFilteredSectors, markerColor);
    });
  }, [map, addMarker, clearMarkers]);

  return {
    markers: markers.current,
    clearMarkers,
    addMarker,
    updateMarkers,
    clearAllPopups
  };
};
