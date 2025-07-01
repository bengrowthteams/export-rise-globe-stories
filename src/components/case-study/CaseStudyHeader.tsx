
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface CaseStudyHeaderProps {
  flag: string;
  country: string;
  sector: string;
  successfulProduct: string;
  onNavigateBack: () => void;
}

const CaseStudyHeader = ({ flag, country, sector, successfulProduct, onNavigateBack }: CaseStudyHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReturnToMap = () => {
    console.log('Regular Return to Map - preserving comprehensive state');
    console.log('Current location state:', location.state);
    
    // Preserve all existing state and ensure comprehensive restoration
    if (location.state) {
      console.log('Found comprehensive state, navigating back with full preservation');
      navigate('/', { 
        state: {
          ...location.state,
          returnedFromCaseStudy: true,
          scrollToMap: true,
          // Ensure all state is preserved for seamless restoration
          preserveFilters: true,
          seamlessReturn: true
        }
      });
    } else {
      // Enhanced fallback - try session storage restoration
      const savedState = sessionStorage.getItem('comprehensiveState');
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          console.log('Using session storage comprehensive state');
          navigate('/', { 
            state: {
              ...parsedState,
              returnedFromCaseStudy: true,
              scrollToMap: true,
              seamlessReturn: true
            }
          });
          sessionStorage.removeItem('comprehensiveState');
        } catch (error) {
          console.error('Failed to parse session storage state:', error);
        }
      } else {
        // Final fallback: navigate to country location
        console.log('No saved state, using country location fallback');
        navigate('/', { 
          state: {
            returnedFromCaseStudy: true,
            scrollToMap: true,
            countryToFocus: country,
            sectorToFocus: sector,
            seamlessReturn: true
          }
        });
      }
    }
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
