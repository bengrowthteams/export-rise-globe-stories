
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
    // Navigate to the landing page (which contains the map)
    navigate('/');
    
    // After navigation, scroll to the map section and restore both scroll position and map state
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
      }
    }, 100);
  };

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Button 
          variant="ghost" 
          onClick={handleReturnToMap}
          className="mb-4"
        >
          <ArrowLeft className="mr-2" size={16} />
          Return to Map
        </Button>
        
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
  );
};

export default CaseStudyHeader;
