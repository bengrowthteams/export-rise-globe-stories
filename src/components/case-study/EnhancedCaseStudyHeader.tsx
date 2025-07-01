
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSectorColor } from '@/data/sectorColors';

interface EnhancedCaseStudyHeaderProps {
  flag: string;
  country: string;
  sector: string;
  successfulProduct: string;
}

const EnhancedCaseStudyHeader = ({ flag, country, sector, successfulProduct }: EnhancedCaseStudyHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectorColor = getSectorColor(sector);

  const handleReturnToMap = () => {
    console.log('Enhanced Return to Map clicked - checking for saved state...');
    
    // Try to get map state from multiple sources
    let mapParams = '';
    let navigationState = {};
    
    // Priority 1: URL parameters (most reliable)
    const currentUrlParams = new URLSearchParams(location.search);
    const lat = currentUrlParams.get('lat');
    const lng = currentUrlParams.get('lng');
    const zoom = currentUrlParams.get('zoom');
    const scrollPos = currentUrlParams.get('scroll');
    
    if (lat && lng && zoom) {
      mapParams = `?lat=${lat}&lng=${lng}&zoom=${zoom}&from=case-study`;
      navigationState = {
        mapState: {
          center: [parseFloat(lng), parseFloat(lat)],
          zoom: parseFloat(zoom)
        },
        scrollPosition: scrollPos ? parseInt(scrollPos) : 0,
        returnedFromCaseStudy: true,
        timestamp: Date.now()
      };
      console.log('Enhanced: Using URL parameters for return navigation:', navigationState);
    }
    
    // Priority 2: React Router state
    else if (location.state?.mapState) {
      const mapState = location.state.mapState;
      mapParams = `?lat=${mapState.center[1]}&lng=${mapState.center[0]}&zoom=${mapState.zoom}&from=case-study`;
      navigationState = {
        mapState: mapState,
        scrollPosition: location.state.scrollPosition || 0,
        returnedFromCaseStudy: true,
        timestamp: Date.now()
      };
      console.log('Enhanced: Using router state for return navigation:', navigationState);
    }
    
    // Priority 3: Session storage fallback
    else {
      const savedMapState = sessionStorage.getItem('mapState');
      const savedScroll = sessionStorage.getItem('mapScrollPosition');
      
      if (savedMapState) {
        try {
          const parsedState = JSON.parse(savedMapState);
          mapParams = `?lat=${parsedState.center[1]}&lng=${parsedState.center[0]}&zoom=${parsedState.zoom}&from=case-study`;
          navigationState = {
            mapState: parsedState,
            scrollPosition: savedScroll ? parseInt(savedScroll) : 0,
            returnedFromCaseStudy: true,
            timestamp: Date.now()
          };
          console.log('Enhanced: Using session storage for return navigation:', navigationState);
        } catch (error) {
          console.error('Enhanced: Failed to parse saved map state:', error);
        }
      }
    }

    // Navigate back to map with preserved state
    navigate(`/${mapParams}`, {
      state: navigationState,
      replace: false
    });
  };

  return (
    <>
      {/* Sticky Return Button - Enhanced responsive design */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <Button 
            onClick={handleReturnToMap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium w-full sm:w-auto"
            size="lg"
          >
            <ArrowLeft className="mr-2 sm:mr-3" size={20} />
            Return to Map
          </Button>
        </div>
      </div>

      {/* Main Header Content - Enhanced responsive improvements */}
      <div className="relative overflow-hidden pt-20" style={{ background: `linear-gradient(135deg, ${sectorColor}15 0%, ${sectorColor}25 100%)` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="text-6xl sm:text-8xl drop-shadow-lg">{flag}</div>
            <div className="flex-1 w-full">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-left">
                {country} <span className="text-gray-600">/</span> {sector}
              </h1>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                <p className="text-lg sm:text-xl text-gray-700 text-left">
                  <span className="font-semibold" style={{ color: sectorColor }}>Successful Product:</span> {successfulProduct}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedCaseStudyHeader;
