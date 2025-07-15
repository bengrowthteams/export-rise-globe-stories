
import React from 'react';
import { ExternalLink } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">About</h2>
        
        {/* About this map */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">About this map</h3>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              The <b>Sector Transformation Atlas</b> documents and maps 82 export booms since 1995 that have reshaped emerging economies around the world.
            </p>
            <p>
              As economies have transformed over the past decades, lifting millions of people out of poverty, many countries have experienced episodes of rapid export growth in specific sectors. Often these cases and the stories behind them are not commonly known, even by international development experts.
            </p>
            <p>
              We created the Sector Transformation Atlas to document these export booms–what happened and the key factors that spurred growth. The map is designed for both policymakers and funders of economic development, to inspire by showing what is possible and to inform by distilling lessons from successes.
            </p>
          </div>
        </section>

        {/* Who we are */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Who we are</h3>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              The Sector Transformation Atlas is a project of <b>Growth Teams</b>.
            </p>
            <p>
              <a 
                href="https://www.growth-teams.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 underline inline-flex items-center gap-1"
              >
               Growth Teams 
                <ExternalLink size={14} />
              </a> helps government reformers in developing countries to spot and remove barriers to economic growth. Our mission is to create formal jobs in high-growth industries, providing a pathway to prosperity. We bridge the gap between analysis and action by combining evidence and expertise on growth and structural transformation, and modern management practices and implementation support.
            </p>
            <p>
              Established as a non-profit organization in 2022, we have launched engagements in Rwanda, Tanzania, Malawi, and India. Our team brings extensive experience advising governments in Africa and India on investment, job creation, and economic transformation, and our advisory board includes experts such as Stefan Dercon, Lant Pritchett, Kunal Sen, Pallavi Roy, and Lindsay Whitfield. Learn more at <a 
                href="https://www.growth-teams.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 underline"
              >
                www.growth-teams.org
              </a>.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Methodology</h3>
          
          <div className="mb-8">
            <h4 className="text-xl font-medium text-gray-900 mb-4">Inclusion Criteria</h4>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                We identified export success stories in low- and middle-income countries (LMICs) through a systematic approach using global trade data accessed from the Atlas of Economic Complexity (which is itself based on data from UN Comtrade). For each country in each sector, we ranked export performance globally and compared the rankings across two benchmark years: 1995 and 2022.
              </p>
              <p>Cases were included if they met both of the following criteria:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>An improvement of at least 15 places</b> in global export ranking from 1995 to 2022</li>
                <li><b>A final ranking of 60th or better</b> in 2022</li>
              </ul>
              <p>
                This criteria emphasizes cases with both significant export growth (improvement over the time period) and international competitiveness (final ranking). We use data from 1995 to 2022 given data availability and consistent product categories over this time period. This approach yielded 100 cases across 9 sectors: Agriculture (9), Chemicals (10), Electronics (10), Machinery (7), Metals (8), Stones (17), Services (14), Textiles (12), and Vehicles (13). Each case consists of a country-sector pair. We used the Harmonized System (HS) 1992 for sector classification.
              </p>
              <p>
                For the final map visualization we excluded countries that the World Bank defined as high-income in 1995 in order to focus our data set exclusively on development in low- and middle income economies.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-medium text-gray-900 mb-4">Research Approach</h4>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                After filtering the trade data based on the aforementioned criteria, we conducted detailed desk research based on available secondary sources (e.g. academic papers, industry reports, case studies) to identify the policy choices, private investments, and external influences that shaped each success. In our research, we prioritized official government sources, international reports (UN, WTO, and World Bank), industry reports, and academic studies over news articles and commentary pieces.
              </p>
              <p>
                We then produced concise, accessible case narratives, focused on highlighting specific individuals and firms, and their catalytic actions, rather than exhaustive histories. The methodology for case research is detailed in the project codebook, and allows others to produce cases in the same format. After compiling case narratives, we reviewed, fact-checked, and revised all cases for accuracy and consistency.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-medium text-gray-900 mb-4">Use of AI</h4>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                AI-powered tools were used across the project lifecycle. In the research phase, AI search engines were used as a starting point to understand the possible policies and actors that influenced a country's sectoral export boom. These ideas were supplemented by academic journal and policy document searches that provided corroboration and additional detail. When writing up the case studies, AI was not used directly, but prompts were used for formatting and summarization. The "Key Highlights" and "Success Story" sentences in the case studies, which summarize human-written information, were generated by GPT-powered tools. For web development, all coding was done by no-code AI tools (notably Lovable), directed by human prompting and refinement.
              </p>
            </div>
          </div>
        </section>

        {/* Usage, Citation, and Credits */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Usage, Citation, and Credits</h3>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              The Sector Transformation Atlas is a freely available public resource designed to advance the understanding of economic growth through structural transformation. We actively encourage use of the tool and database for research, analysis, and collaboration, with the simple request of proper attribution, crediting the Sector Transformation Atlas and Growth Teams.
            </p>
            <p>
              <strong>Citation Guidelines.</strong> When incorporating Sector Transformation Atlas content in your work, please use this citation format for the Sector Transformation Atlas tool:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500 my-4">
              <p className="font-mono text-gray-800">
                Growth Teams. (2025). Sector Transformation Atlas. [www.Sector Transformation Atlas.com]
              </p>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Credits</h3>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p><strong>Lead creators:</strong> Kartik Akileswaran, Jonathan Mazumdar, Chema Triki</p>
            <p><strong>Web development, writing, and case research:</strong> Benjamin Oestericher</p>
            <p><strong>Data analysis and case research:</strong> Adriana Maria Gonzalez, Yosumin Qurbonbekova, Zhengfei Jiao, Yuwei Liu</p>
            <p><strong>Data analysis:</strong> Navya Sahay, Kara Wong</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;
