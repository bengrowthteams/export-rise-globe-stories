import React from 'react';
import { ExternalLink, Database, Users, Search, BookOpen, Award, FileText, Lightbulb, Quote } from 'lucide-react';
const AboutSection = () => {
  return <div id="about-section" className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main About Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6">About</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* About this map section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm mr-4">
              <Database className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">About This Map</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                The <b className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Sector Transformation Atlas</b> documents and maps about 100 export booms since 1995 that have reshaped economies around the world.
              </p>
              <p>
                As economies have transformed over the past decades, lifting millions of people out of poverty, many countries have experienced episodes of rapid export growth in specific sectors. Often these cases and the stories behind them are not commonly known, even by international development experts.
              </p>
              <p>
                We created the Sector Transformation Atlas to document these export booms–what happened and the key factors that spurred growth. The map is designed for both policymakers and funders of economic development, to inspire by showing what is possible and to inform by distilling lessons from successes.
              </p>
            </div>
          </div>
        </section>

        {/* Who we are section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm mr-4">
              <Users className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Who We Are</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                The Sector Transformation Atlas is a project of <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-semibold">Growth Teams</span>.
              </p>
              <p>
                <a href="https://www.growth-teams.org" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:from-green-700 hover:to-blue-700 underline inline-flex items-center gap-1 transition-all font-semibold">
                  Growth Teams
                  <ExternalLink size={16} />
                </a>{' '}helps government reformers in developing countries to spot and remove barriers to economic growth. Our mission is to create formal jobs in high-growth industries, providing a pathway to prosperity. We bridge the gap between analysis and action by combining evidence and expertise on growth and structural transformation, and modern management practices and implementation support.
              </p>
              <p>
                Established as a non-profit organization in 2022, we have launched engagements in Rwanda, Tanzania, Malawi, and India. Our team brings extensive experience advising governments in Africa and India on investment, job creation, and economic transformation, and our advisory board includes experts such as Stefan Dercon, Lant Pritchett, Kunal Sen, Pallavi Roy, and Lindsay Whitfield. Learn more at{' '}
                <a href="https://www.growth-teams.org" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:from-green-700 hover:to-blue-700 underline transition-all">
                  www.growth-teams.org
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-sm mr-4">
              <Search className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">Methodology</h3>
          </div>
          
          <div className="space-y-8">
            {/* Inclusion Criteria */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Inclusion Criteria</h4>
              </div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  We identified export success stories in low- and middle-income countries (LMICs) through a systematic approach using global trade data accessed from the Atlas of Economic Complexity (which is itself based on data from UN Comtrade). For each country in each sector, we ranked export performance globally and compared the rankings across two benchmark years: 1995 and 2022.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 shadow-sm">
                  <p className="font-medium text-gray-900 mb-3">Cases were included if they met both of the following criteria:</p>
                  <ul className="ml-6 space-y-2 text-gray-800">
                    <li className="list-disc">An improvement of at least 15 places in global export ranking from 1995 to 2022</li>
                    <li className="list-disc">A final ranking of 60th or better in 2022</li>
                  </ul>
                </div>
                <p>
                  This criteria emphasizes cases with both significant export growth (improvement over the time period) and international competitiveness (final ranking). We use data from 1995 to 2022 given data availability and consistent product categories over this time period. This approach yielded 100 cases across 9 sectors: Agriculture (9), Chemicals (10), Electronics (10), Machinery (7), Metals (8), Stones (17), Services (14), Textiles (12), and Vehicles (13). Each case consists of a country-sector pair. We used the Harmonized System (HS) 1992 for sector classification.
                </p>
                <p>For the final map, visualization we excluded countries that the World Bank defined as high-income in 1995 in order to focus our data set exclusively on development in low and middle income economies.</p>
              </div>
            </div>

            {/* Research Approach */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Research Approach</h4>
              </div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  After filtering the trade data based on the aforementioned criteria, we conducted detailed desk research based on available secondary sources (e.g. academic papers, industry reports, case studies) to identify the policy choices, private investments, and external influences that shaped each success. In our research, we prioritized official government sources, international reports (UN, WTO, and World Bank), industry reports, and academic studies over news articles and commentary pieces.
                </p>
                <p>
                  We then produced concise, accessible case narratives, focused on highlighting specific individuals and firms, and their catalytic actions, rather than exhaustive histories. The methodology for case research is detailed in the project codebook, and allows others to produce cases in the same format. After compiling case narratives, we reviewed, fact-checked, and revised all cases for accuracy and consistency.
                </p>
              </div>
            </div>

            {/* Use of AI */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Use of AI</h4>
              </div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  AI-powered tools were used across the project lifecycle. In the research phase, AI search engines were used as a starting point to understand the possible policies and actors that influenced a country's sectoral export boom. These ideas were supplemented by academic journal and policy document searches that provided corroboration and additional detail. When writing up the case studies, AI was not used directly, but prompts were used for formatting and summarization. The "Key Highlights" and "Success Story" sentences in the case studies, which summarize human-written information, were generated by GPT-powered tools. For web development, all coding was done by no-code AI tools (notably <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">Lovable</span>), directed by human prompting and refinement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage, Citation, and Credits section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-sm mr-4">
              <BookOpen className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Usage, Citation, and Credits</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                The Sector Transformation Atlas is a freely available public resource designed to advance the understanding of economic growth through structural transformation. We actively encourage use of the tool and database for research, analysis, and collaboration, with the simple request of proper attribution, crediting the Sector Transformation Atlas and Growth Teams.
              </p>
              <p>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-semibold">Citation Guidelines.</span> When incorporating Sector Transformation Atlas content in your work, please use this citation format for the Sector Transformation Atlas tool:
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200 shadow-sm">
                <div className="flex items-start space-x-3">
                  <Quote className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                  <p className="font-mono text-gray-800 text-base leading-relaxed">
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-semibold">Growth Teams. (2025). Sector Transformation Atlas. [www.Sector Transformation Atlas.com]</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credits section */}
        <section className="mb-24">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-sm mr-4">
              <Award className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Credits</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Lead creators</h4>
              </div>
              <p className="text-lg text-gray-700">Kartik Akileswaran, Jonathan Mazumdar, Chema Triki</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Web development, writing, and case research</h4>
              </div>
              <p className="text-lg text-gray-700">Benjamin Oestericher</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Data analysis and case research</h4>
              </div>
              <p className="text-lg text-gray-700">Adriana Maria Gonzalez, Yosumin Qurbonbekova, Zhengfei Jiao, Yuwei Liu</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Data analysis</h4>
              </div>
              <p className="text-lg text-gray-700">Navya Sahay, Kara Wong</p>
            </div>
          </div>
        </section>

        {/* Further Reading section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-sm mr-4">
              <FileText className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Further Reading</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p className="mb-6 font-medium text-gray-900">For additional insights into export-led growth, sector development, economic complexity, and structural transformation:</p>
              
              <div className="space-y-4">
                <p>
                  Andrews, Matt, Lant Pritchett and Michael Woolcock (2017). <em>Building State Capability: Evidence, Analysis, Action</em>.<br />
                  <a href="https://bsc.hks.harvard.edu/publications/building-state-capability-evidence-analysis-action/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://bsc.hks.harvard.edu/publications/building-state-capability-evidence-analysis-action/
                  </a>
                </p>

                <p>
                  Dercon, Stefan (2022). <em>Gambling on Development: Why Some Countries Win and Others Lose</em>.<br />
                  <a href="https://www.hurstpublishers.com/book/gambling-on-development/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://www.hurstpublishers.com/book/gambling-on-development/
                  </a>
                </p>

                <p>
                  Hallward-Driemeier, Mary and Gaurav Nayyar (2017). <em>The Future of Manufacturing Led Development</em>.<br />
                  <a href="https://openknowledge.worldbank.org/handle/10986/27946" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://openknowledge.worldbank.org/handle/10986/27946
                  </a>
                </p>

                <p>
                  Haussman, Ricardo (2024). <em>Export-led Growth</em>.<br />
                  <a href="https://growthlab.hks.harvard.edu/sites/projects.iq.harvard.edu/files/2024-07-glwp-231-export-led-growth.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://growthlab.hks.harvard.edu/sites/projects.iq.harvard.edu/files/2024-07-glwp-231-export-led-growth.pdf
                  </a>
                </p>

                <p>
                  Hausmann, Ricardo and Dani Rodrik (2003). <em>Economic Development as Self-Discovery</em>.<br />
                  <a href="https://www.sciencedirect.com/science/article/abs/pii/S030438780300124X" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://www.sciencedirect.com/science/article/abs/pii/S030438780300124X
                  </a>
                </p>

                <p>
                  Hausmann, Ricardo, Jason Hwang, Dani Rodrik (2006). <em>What You Export Matters</em>.<br />
                  <a href="https://drodrik.scholar.harvard.edu/files/dani-rodrik/files/what-you-export-matters.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://drodrik.scholar.harvard.edu/files/dani-rodrik/files/what-you-export-matters.pdf
                  </a>
                </p>

                <p>
                  Hidalgo, Caesar and Ricardo Hausmann (2009). <em>The Building Blocks of Economic Complexity</em>.<br />
                  <a href="http://www.pnas.org/content/106/26/10570.full.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    http://www.pnas.org/content/106/26/10570.full.pdf
                  </a>
                </p>

                <p>
                  Hummels, David and Peter J. Klenow (2005). <em>The Variety and Quality of a Nation's Exports. American Economic Review</em>.<br />
                  <a href="http://klenow.com/Hummels&Klenow.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    http://klenow.com/Hummels&Klenow.pdf
                  </a>
                </p>

                <p>
                  Mostafa, Romel and Steven Klepper (2009). <em>Industrial Development through Tacit Knowledge Seeding: Evidence from the Bangladesh Garment Industry</em>.<br />
                  <a href="http://www.columbia.edu/~ev2124/igc/spring_2010/papers/mostafa.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    http://www.columbia.edu/~ev2124/igc/spring_2010/papers/mostafa.pdf
                  </a>
                </p>

                <p>
                  Opalo, Ken (2025). <em>Why Growth Must Be at the Center of Africa's Future. Energy for Growth Hub</em>.<br />
                  <a href="https://energyforgrowth.org/article/episode-32-ken-opalo-why-growth-must-be-at-the-center-of-africas-future/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://energyforgrowth.org/article/episode-32-ken-opalo-why-growth-must-be-at-the-center-of-africas-future/
                  </a>
                </p>

                <p>
                  Pritchett, Lant (2024). <em>The Case for Economic Growth as the Path to Better Human Wellbeing</em>.<br />
                  <a href="https://lantpritchett.org/the-case-for-sustained-rapid-inclusive-enough-economic-growth-as-a-focus-of-development/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://lantpritchett.org/the-case-for-sustained-rapid-inclusive-enough-economic-growth-as-a-focus-of-development/
                  </a>
                </p>

                <p>
                  The Commission on Growth and Development (2008). <em>The Growth Report: Strategies for Sustained Growth and Inclusive Development</em>.<br />
                  <a href="https://openknowledge.worldbank.org/handle/10986/6507" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                    https://openknowledge.worldbank.org/handle/10986/6507
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export default AboutSection;