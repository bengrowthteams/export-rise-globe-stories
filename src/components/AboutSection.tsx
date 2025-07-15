
import React from 'react';
import { ExternalLink, Users, Search, Database, BookOpen, Award, ArrowRight, Globe, Target, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  return (
    <div id="about-section" className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero section with enhanced visual appeal */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-lg mb-6">
            <Globe className="text-white" size={32} />
          </div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">About</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-green-600 mx-auto rounded-full shadow-sm"></div>
          <p className="text-xl text-gray-600 mt-8 max-w-3xl mx-auto leading-relaxed">
            Discover the stories behind 82 export transformations that reshaped emerging economies worldwide
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Target className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">82</h3>
                <p className="text-gray-600">Export Booms</p>
              </div>
            </div>
            <p className="text-gray-700">Documented success stories since 1995</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">9</h3>
                <p className="text-gray-600">Sectors</p>
              </div>
            </div>
            <p className="text-gray-700">From agriculture to high-tech industries</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">27</h3>
                <p className="text-gray-600">Years</p>
              </div>
            </div>
            <p className="text-gray-700">Of transformation data (1995-2022)</p>
          </div>
        </div>
        
        {/* About this map section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl border border-green-200">
              <Database className="text-green-600" size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">About This Map</h3>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-800 font-medium">
                The <span className="font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">Sector Transformation Atlas</span> documents and maps 82 export booms since 1995 that have reshaped emerging economies around the world.
              </p>
              <p>
                As economies have transformed over the past decades, lifting millions of people out of poverty, many countries have experienced episodes of rapid export growth in specific sectors. Often these cases and the stories behind them are not commonly known, even by international development experts.
              </p>
              <p>
                We created the Sector Transformation Atlas to document these export booms–what happened and the key factors that spurred growth. The map is designed for both policymakers and funders of economic development, to inspire by showing what is possible and to inform by distilling lessons from successes.
              </p>
              <div className="flex items-center gap-3 pt-4">
                <ArrowRight className="text-green-600" size={20} />
                <span className="text-green-700 font-medium">Explore the interactive map above to discover these transformation stories</span>
              </div>
            </div>
          </div>
        </section>

        {/* Who we are section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl border border-blue-200">
              <Users className="text-blue-600" size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">Who We Are</h3>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-800 font-medium">
                The Sector Transformation Atlas is a project of <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Growth Teams</span>.
              </p>
              <p>
                <a 
                  href="https://www.growth-teams.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline inline-flex items-center gap-2 font-semibold transition-colors group"
                >
                 Growth Teams 
                  <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a> helps government reformers in developing countries to spot and remove barriers to economic growth. Our mission is to create formal jobs in high-growth industries, providing a pathway to prosperity.
              </p>
              <p>
                We bridge the gap between analysis and action by combining evidence and expertise on growth and structural transformation, and modern management practices and implementation support.
              </p>
              <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                <p>
                  Established as a non-profit organization in 2022, we have launched engagements in Rwanda, Tanzania, Malawi, and India. Our team brings extensive experience advising governments in Africa and India on investment, job creation, and economic transformation.
                </p>
              </div>
              <p>
                Learn more at <a 
                  href="https://www.growth-teams.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline font-semibold transition-colors"
                >
                  www.growth-teams.org
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology section with enhanced visual hierarchy */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl border border-purple-200">
              <Search className="text-purple-600" size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">Methodology</h3>
          </div>
          
          <div className="grid gap-10">
            {/* Inclusion Criteria */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h4 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                Inclusion Criteria
              </h4>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  We identified export success stories in low- and middle-income countries (LMICs) through a systematic approach using global trade data accessed from the Atlas of Economic Complexity.
                </p>
                <p className="font-semibold text-gray-800">Cases were included if they met both criteria:</p>
                <div className="bg-gradient-to-r from-purple-50 to-purple-50/50 p-8 rounded-2xl border-l-4 border-purple-500 shadow-sm">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span><span className="font-bold text-purple-700">An improvement of at least 15 places</span> in global export ranking from 1995 to 2022</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span><span className="font-bold text-purple-700">A final ranking of 60th or better</span> in 2022</span>
                    </li>
                  </ul>
                </div>
                <p>
                  This criteria emphasizes cases with both significant export growth and international competitiveness. We use data from 1995 to 2022 given data availability and consistent product categories over this time period.
                </p>
              </div>
            </div>

            {/* Research Approach */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h4 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                Research Approach
              </h4>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  After filtering the trade data, we conducted detailed desk research based on available secondary sources to identify the policy choices, private investments, and external influences that shaped each success.
                </p>
                <p>
                  We prioritized official government sources, international reports, industry reports, and academic studies. We then produced concise, accessible case narratives focused on highlighting specific individuals, firms, and their catalytic actions.
                </p>
              </div>
            </div>

            {/* Use of AI */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h4 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                Use of AI
              </h4>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  AI-powered tools were used across the project lifecycle for research assistance, formatting, and summarization. The "Key Highlights" and "Success Story" sentences were generated by GPT-powered tools from human-written information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage, Citation, and Credits section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl border border-orange-200">
              <BookOpen className="text-orange-600" size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">Usage & Citation</h3>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-800 font-medium">
                The Sector Transformation Atlas is a freely available public resource designed to advance understanding of economic growth through structural transformation.
              </p>
              <p>
                We encourage use of the tool and database for research, analysis, and collaboration, with proper attribution crediting the Sector Transformation Atlas and Growth Teams.
              </p>
              <div className="bg-gradient-to-r from-gray-50 to-gray-50/50 p-8 rounded-2xl border-l-4 border-green-500 shadow-sm">
                <p className="font-mono text-gray-800 text-base bg-white p-4 rounded-lg border">
                  Growth Teams. (2025). Sector Transformation Atlas. [www.Sector Transformation Atlas.com]
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credits section with enhanced layout */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-2xl border border-yellow-200">
              <Award className="text-yellow-600" size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">Credits</h3>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-700 leading-relaxed">
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <p className="font-bold text-gray-900 mb-2">Lead creators</p>
                  <p>Kartik Akileswaran, Jonathan Mazumdar, Chema Triki</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <p className="font-bold text-gray-900 mb-2">Web development, writing, and case research</p>
                  <p>Benjamin Oestericher</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <p className="font-bold text-gray-900 mb-2">Data analysis and case research</p>
                  <p>Adriana Maria Gonzalez, Yosumin Qurbonbekova, Zhengfei Jiao, Yuwei Liu</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <p className="font-bold text-gray-900 mb-2">Data analysis</p>
                  <p>Navya Sahay, Kara Wong</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;
