
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map, BookOpen } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const handleExploreMap = () => {
    navigate('/map');
  };

  const handleViewCaseStudies = () => {
    navigate('/map');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Structural Transformation Atlas
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore case studies of successful sector transformation and rapid export growth in developing countries
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleExploreMap}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold min-w-[200px]"
            >
              <Map className="mr-2" size={20} />
              Explore the Map
            </Button>
            
            <Button 
              onClick={handleViewCaseStudies}
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold min-w-[200px] backdrop-blur-sm"
            >
              <BookOpen className="mr-2" size={20} />
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
