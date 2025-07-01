
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getSectorColor } from '@/data/sectorColors';

interface EnhancedCaseStudyHeaderProps {
  flag: string;
  country: string;
  sector: string;
  successfulProduct: string;
}

const EnhancedCaseStudyHeader = ({ flag, country, sector, successfulProduct }: EnhancedCaseStudyHeaderProps) => {
  const navigate = useNavigate();
  const sectorColor = getSectorColor(sector);

  const handleReturnToMap = () => {
    // Get saved map state from multiple sources
    const savedMapState = sessionStorage.getItem('mapState');
    const savedScrollPosition = sessionStorage.getItem('mapScrollPosition');
    
    let mapParams = '';
    if (savedMapState) {
      try {
        const mapState = JSON.parse(savedMapState);
        // Add map state to URL parameters for immediate availability
        mapParams = `?lat=${mapState.center[1]}&lng=${mapState.center[0]}&zoom=${mapState.zoom}`;
      } catch (error) {
        console.error('Failed to parse saved map state:', error);
      }
    }

    // Navigate with both URL params and React Router state
    navigate(`/${mapParams}`, {
      state: {
        mapState: savedMapState ? JSON.parse(savedMapState) : null,
        scrollPosition: savedScrollPosition,
        returnedFromCaseStudy: true
      }
    });
  };

  return (
    <>
      {/* Sticky Return Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <Button 
            onClick={handleReturnToMap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
            size="lg"
          >
            <ArrowLeft className="mr-3" size={20} />
            Return to Map
          </Button>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="relative overflow-hidden pt-20" style={{ background: `linear-gradient(135deg, ${sectorColor}15 0%, ${sectorColor}25 100%)` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-start space-x-6">
            <div className="text-8xl drop-shadow-lg">{flag}</div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {country} <span className="text-gray-600">/</span> {sector}
              </h1>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                <p className="text-xl text-gray-700">
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
