
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Map, TrendingUp, Globe, Zap } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

const WhyExportsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollTrigger(sectionRef, 0.2);

  const handleExploreMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      const navHeight = 56;
      const elementPosition = mapSection.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="why-exports-section"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Why Exports?
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Products to prosperity */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    Products to prosperity
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Structural change happens when countries produce new things with new technologies, 
                  shifting workers into more sophisticated sectors and jobs. A clear signal is an export boom. 
                  Garments in Bangladesh, IT services in India, electronics in Vietnam–each sector contributed 
                  to transforming an economy and increasing incomes, often within decades.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl opacity-20 blur-xl"></div>
                <img 
                  src="/lovable-uploads/7f7ef23d-aeab-43c4-aa15-85f7967835c5.png" 
                  alt="Modern food processing facility with workers on production lines"
                  className="relative w-full h-48 sm:h-64 lg:h-80 object-cover rounded-2xl shadow-2xl border-2 sm:border-4 border-white"
                />
              </div>
            </div>
          </div>

          {/* The export edge */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="relative lg:order-first">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl opacity-20 blur-xl"></div>
                <img 
                  src="/lovable-uploads/c515d203-be93-46ac-9f21-8ef7def9a637.png" 
                  alt="Textile workers in a garment manufacturing facility"
                  className="relative w-full h-48 sm:h-64 lg:h-80 object-cover rounded-2xl shadow-2xl border-2 sm:border-4 border-white"
                />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Globe className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    The export edge
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Global markets dwarf domestic demand–particularly in developing nations–enabling economies of scale, 
                  which fosters global competitiveness. Competing abroad drives firms to learn, innovate, and climb 
                  the productivity ladder. Workers benefit from the creation of more and more productive jobs. 
                  Export earnings shore up foreign currency reserves and build resilience against external shocks.
                </p>
              </div>
            </div>
          </div>

          {/* What sparks a boom */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    What sparks a boom
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Big export jumps don't happen by accident. Pioneering firms and anchor investors bring know-how, 
                  governments set strategic direction and clear hurdles with public inputs and policy, and global 
                  shifts open the door. When these pieces click, sectors take off, jobs multiply, and exports surge.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-xl"></div>
                <img 
                  src="/lovable-uploads/05b38d20-8ee5-48fe-b170-df7a629e7a8f.png" 
                  alt="Industrial textile production facility with organized workflow"
                  className="relative w-full h-48 sm:h-64 lg:h-80 object-cover rounded-2xl shadow-2xl border-2 sm:border-4 border-white"
                />
              </div>
            </div>
          </div>

          {/* Explore the breakthroughs */}
          <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Explore the breakthroughs
              </h3>
              <p className="text-sm sm:text-lg lg:text-xl text-green-50 leading-relaxed mb-6 sm:mb-10">
                Scan the globe, pick a country/sector, see the story. Growth Teams' interactive tool showcases 82 export 
                take-offs since 1995, spotlighting the key firms, leaders, and policies behind each breakthrough. 
                Use it to learn what worked, where, and how. It's a living map of how transformation happens–one 
                country, one sector, one story at a time.
              </p>
              <Button 
                onClick={handleExploreMap}
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Map className="mr-2 sm:mr-3" size={20} />
                Explore the Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExportsSection;
