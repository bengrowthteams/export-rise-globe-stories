
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CaseStudyHeaderProps {
  flag: string;
  country: string;
  sector: string;
  successfulProduct: string;
  onNavigateBack: () => void;
}

const CaseStudyHeader = ({ flag, country, sector, successfulProduct, onNavigateBack }: CaseStudyHeaderProps) => {
  const navigate = useNavigate();

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
      <div className="bg-white shadow-sm border-b pt-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{flag}</span>
            <div>
              <h1 className="text-4xl font-bold">{country} / {sector}</h1>
              <p className="text-xl text-gray-600 mt-2">
                <span className="font-semibold">Successful Product:</span> {successfulProduct}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyHeader;
