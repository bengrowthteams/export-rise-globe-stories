
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
