
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
    navigate('/');
    setTimeout(() => {
      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        const savedPosition = sessionStorage.getItem('mapScrollPosition');
        const savedMapState = sessionStorage.getItem('mapState');
        
        console.log('Restoring scroll position:', savedPosition);
        console.log('Map state available:', !!savedMapState);
        
        if (savedPosition) {
          window.scrollTo(0, parseInt(savedPosition));
          sessionStorage.removeItem('mapScrollPosition');
        } else {
          mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Restore map state if available
        if (savedMapState) {
          try {
            const mapState = JSON.parse(savedMapState);
            // Trigger map state restoration via a custom event
            window.dispatchEvent(new CustomEvent('restoreMapState', { detail: mapState }));
            sessionStorage.removeItem('mapState');
          } catch (error) {
            console.error('Failed to restore map state:', error);
          }
        }
      }
    }, 100);
  };

  return (
    <>
      {/* Sticky Return Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <Button 
            onClick={handleReturnToMap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-base font-medium"
            size="lg"
          >
            <ArrowLeft className="mr-2" size={18} />
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
