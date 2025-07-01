
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
    console.log('Enhanced Return to Map clicked - using simple working approach');
    
    // Save current filter state before navigating
    const currentFilters = sessionStorage.getItem('selectedSectors');
    if (currentFilters) {
      sessionStorage.setItem('filtersToRestore', currentFilters);
    }
    
    // Use the same simple approach that works for the 404 page
    navigate('/');
    
    // Ensure we scroll to map section after navigation
    setTimeout(() => {
      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        const navHeight = 56;
        const elementPosition = mapSection.offsetTop;
        const offsetPosition = elementPosition - navHeight;
        
        window.scrollTo({ 
          top: offsetPosition, 
          behavior: 'smooth' 
        });
        console.log('Scrolled to map section from enhanced case study');
      }
    }, 100);
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
