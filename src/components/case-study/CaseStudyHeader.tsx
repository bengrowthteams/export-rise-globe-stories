
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
    console.log('Regular Case Study Header - Return to Map clicked');
    
    // Get the stored return state (similar to enhanced case study)
    const storedReturnState = sessionStorage.getItem('comprehensiveState');
    
    if (storedReturnState) {
      try {
        const returnState = JSON.parse(storedReturnState);
        console.log('Regular Case Study Header - Found stored return state:', returnState);
        
        // Navigate back with the preserved state
        navigate('/', { 
          state: {
            ...returnState,
            returnedFromCaseStudy: true,
            instantPositioning: true
          }
        });
        
        // Clean up session storage
        sessionStorage.removeItem('comprehensiveState');
        return;
      } catch (error) {
        console.error('Regular Case Study Header - Failed to parse stored return state:', error);
      }
    }
    
    // Fallback: Navigate back to country location
    console.log('Regular Case Study Header - No stored state, using fallback');
    navigate('/', { 
      state: {
        returnedFromCaseStudy: true,
        instantPositioning: true,
        countryToFocus: country,
        sectorToFocus: sector
      }
    });
  };

  return (
    <>
      {/* Sticky Return Button */}
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

      {/* Main Header Content */}
      <div className="bg-white shadow-sm border-b pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-4xl">{flag}</span>
            <div className="w-full sm:w-auto">
              <h1 className="text-3xl sm:text-4xl font-bold text-left">{country} / {sector}</h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-2 text-left">
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
