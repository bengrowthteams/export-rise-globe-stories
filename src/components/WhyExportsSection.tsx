
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Map } from 'lucide-react';
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
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Why Exports?
          </h2>
          
          {/* Products to prosperity */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Products to prosperity
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Structural change happens when countries produce new things with new technologies, 
                  shifting workers into more sophisticated sectors and jobs. A clear signal is an export boom. 
                  Garments in Bangladesh, IT services in India, electronics in Vietnam–each sector contributed 
                  to transforming an economy and increasing incomes, often within decades.
                </p>
              </div>
              <div className="lg:order-first">
                <img 
                  src="/lovable-uploads/7f7ef23d-aeab-43c4-aa15-85f7967835c5.png" 
                  alt="Modern food processing facility with workers on production lines"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* The export edge */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/lovable-uploads/c515d203-be93-46ac-9f21-8ef7def9a637.png" 
                  alt="Textile workers in a garment manufacturing facility"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  The export edge
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Global markets dwarf domestic demand–particularly in developing nations–enabling economies of scale, 
                  which fosters global competitiveness. Competing abroad drives firms to learn, innovate, and climb 
                  the productivity ladder. Workers benefit from the creation of more and more productive jobs. 
                  Export earnings shore up foreign currency reserves and build resilience against external shocks.
                </p>
              </div>
            </div>
          </div>

          {/* What sparks a boom */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  What sparks a boom
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Big export jumps don't happen by accident. Pioneering firms and anchor investors bring know-how, 
                  governments set strategic direction and clear hurdles with public inputs and policy, and global 
                  shifts open the door. When these pieces click, sectors take off, jobs multiply, and exports surge.
                </p>
              </div>
              <div className="lg:order-first">
                <img 
                  src="/lovable-uploads/05b38d20-8ee5-48fe-b170-df7a629e7a8f.png" 
                  alt="Industrial textile production facility with organized workflow"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Explore the breakthroughs */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Explore the breakthroughs
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto">
              Scan the globe, pick a country/sector, see the story. Our interactive tool showcases 82 export 
              take-offs since 1995, spotlighting the key firms, leaders, and policies behind each breakthrough. 
              Use it to learn what worked, where, and how. It's a living map of how transformation happens–one 
              country, one sector, one story at a time.
            </p>
            <Button 
              onClick={handleExploreMap}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Map className="mr-2" size={20} />
              Explore the Map
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExportsSection;
