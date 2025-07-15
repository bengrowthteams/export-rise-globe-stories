
import React from 'react';
import { TrendingUp, Globe, Zap, Search } from 'lucide-react';

const WhyExportsSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Main heading with visual enhancement */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Exports?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        {/* Products to prosperity section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900">Products to Prosperity</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-lg text-gray-700 leading-relaxed">
              <p>
                Structural change happens when countries produce new things with new technologies, shifting workers into more sophisticated sectors and jobs. A clear signal is an export boom. Garments in Bangladesh, IT services in India, electronics in Vietnam–each sector contributed to transforming an economy and increasing incomes, often within decades.
              </p>
            </div>
          </div>
        </section>

        {/* The export edge section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
              <Globe className="text-blue-600" size={24} />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900">The Export Edge</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-lg text-gray-700 leading-relaxed">
              <p>
                Global markets dwarf domestic demand–particularly in developing nations–enabling economies of scale, which fosters global competitiveness. Competing abroad drives firms to learn, innovate, and climb the productivity ladder. Workers benefit from the creation of more and more productive jobs. Export earnings shore up foreign currency reserves and build resilience against external shocks.
              </p>
            </div>
          </div>
        </section>

        {/* What sparks a boom section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
              <Zap className="text-purple-600" size={24} />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900">What Sparks a Boom</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-lg text-gray-700 leading-relaxed">
              <p>
                Big export jumps don't happen by accident. Pioneering firms and anchor investors bring know-how, governments set strategic direction and clear hurdles with public inputs and policy, and global shifts open the door. When these pieces click, sectors take off, jobs multiply, and exports surge.
              </p>
            </div>
          </div>
        </section>

        {/* Explore the breakthroughs section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
              <Search className="text-orange-600" size={24} />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900">Explore the Breakthroughs</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-lg text-gray-700 leading-relaxed">
              <p>
                Scan the globe, pick a country/sector, see the story. Our interactive tool showcases 82 export take-offs since 1995, spotlighting the key firms, leaders, and policies behind each breakthrough. Use it to learn what worked, where, and how. It's a living map of how transformation happens–one country, one sector, one story at a time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyExportsSection;
