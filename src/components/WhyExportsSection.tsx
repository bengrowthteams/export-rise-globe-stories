import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Map, TrendingUp, Globe, Zap } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import tomatoWorkers from '@/assets/tomato-workers.jpg';
import electronicsCircuitBoards from '@/assets/electronics-circuit-boards.jpg';

const WhyExportsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollTrigger(sectionRef, 0.2);

  const handleExploreMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      window.scrollTo({ top: mapSection.offsetTop - 56, behavior: 'smooth' });
    }
  };

  return (
    <section id="why-exports-section" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Section Header */}
          <div className="text-center mb-14 sm:mb-20">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950 border border-emerald-900 rounded-full px-4 py-1.5 mb-4">
              The Big Picture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Exports?
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Products to prosperity */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    Products to prosperity
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Structural change happens when countries produce new things with new technologies,
                  shifting workers into more sophisticated sectors and jobs. A clear signal is an export boom.
                  Garments in Bangladesh, IT services in India, electronics in Vietnam–each sector contributed
                  to transforming an economy and increasing incomes, often within decades.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl opacity-15 blur-xl"></div>
                <img src={tomatoWorkers} alt="Workers sorting tomatoes in food processing facility" className="relative w-full h-48 sm:h-64 lg:h-80 object-cover rounded-2xl shadow-2xl border border-white/10" />
              </div>
            </div>
          </div>

          {/* The export edge */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="relative lg:order-first order-last">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl opacity-15 blur-xl"></div>
                <img src="/lovable-uploads/c515d203-be93-46ac-9f21-8ef7def9a637.png" alt="Textile workers in a garment manufacturing facility" className="relative w-full h-48 sm:h-64 lg:h-80 object-cover rounded-2xl shadow-2xl border border-white/10" />
              </div>
              <div className="space-y-4 sm:space-y-6 order-first lg:order-last">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                    <Globe className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    The export edge
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Global markets dwarf domestic demand–particularly in developing nations–enabling economies of scale, which fosters global competitiveness. Competing abroad drives firms to learn, innovate, and climb the productivity ladder. Workers benefit from the creation of more and more productive jobs. Export earnings bolster foreign currency reserves and build resilience against external shocks.
                </p>
              </div>
            </div>
          </div>

          {/* What sparks a boom */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/40">
                    <Zap className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    What sparks a boom
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Big export jumps don't happen by accident. Pioneering firms and anchor investors bring know-how,
                  governments set strategic direction and clear hurdles with public inputs and policy, and global
                  shifts open the door. When these pieces click, sectors take off, jobs multiply, and exports surge.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-15 blur-xl"></div>
                <img src={electronicsCircuitBoards} alt="Electronic circuit boards showing advanced technology components" className="relative w-full h-48 sm:h-64 lg:h-80 object-cover rounded-2xl shadow-2xl border border-white/10" />
              </div>
            </div>
          </div>

          {/* Explore the breakthroughs */}
          <div className="relative text-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/8">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-gray-900 to-blue-900" />
            <div className="absolute inset-0 opacity-8" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative p-8 sm:p-14">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
                  Explore the breakthroughs
                </h3>
                <p className="text-sm sm:text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
                  Scan the globe, pick a country/sector, see the story. Growth Teams' interactive tool showcases 82 export
                  take-offs since 1995, spotlighting the key firms, leaders, and policies behind each breakthrough.
                  Use it to learn what worked, where, and how. It's a living map of how transformation happens–one
                  country, one sector, one story at a time.
                </p>
                <Button onClick={handleExploreMap} size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-xl transition-all duration-200 hover:-translate-y-0.5 border border-emerald-500/30">
                  <Map className="mr-2 sm:mr-3" size={20} />
                  Explore the Map
                </Button>
                <a href="https://www.growth-teams.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center mt-6 text-gray-500 text-sm sm:text-base hover:text-gray-300 transition-colors duration-200 cursor-pointer">
                  <span className="mr-2">A Project of</span>
                  <img src="/lovable-uploads/6660cc2f-78f5-40c9-9279-abe45f6d3098.png" alt="Growth Teams" className="h-5 w-auto opacity-50 brightness-0 invert" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyExportsSection;
