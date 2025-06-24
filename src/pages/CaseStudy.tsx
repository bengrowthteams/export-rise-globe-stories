
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Globe, Users, DollarSign, Factory, Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { successStories } from '../data/successStories';

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const story = successStories.find(s => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => navigate('/map')}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Map
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount.replace(/[\$,]/g, ''));
    if (numAmount >= 1000000000) {
      return `$${(numAmount / 1000000000).toFixed(1)} billion`;
    } else if (numAmount >= 1000000) {
      return `$${(numAmount / 1000000).toFixed(1)} million`;
    }
    return amount;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/map')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Return to Map
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{story.flag}</span>
            <div>
              <h1 className="text-4xl font-bold">{story.country} / {story.sector}</h1>
              <p className="text-xl text-gray-600 mt-2">
                <span className="font-semibold">Successful Product:</span> {story.successfulProduct}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Quantitative Overview Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="text-green-600" size={24} />
              <span>Transformation Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>1995</TableHead>
                  <TableHead>2022</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Global Export Ranking</TableCell>
                  <TableCell>#{story.globalRanking1995}</TableCell>
                  <TableCell>#{story.globalRanking2022}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    +{story.globalRanking1995 - story.globalRanking2022} positions
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Export Value</TableCell>
                  <TableCell>{formatCurrency(story.initialExports1995)}</TableCell>
                  <TableCell>{formatCurrency(story.initialExports2022)}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    +{Math.round(((parseFloat(story.initialExports2022.replace(/[\$,]/g, '')) / parseFloat(story.initialExports1995.replace(/[\$,]/g, ''))) - 1) * 100)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Success Story Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Success Story Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-gray-700">
              {story.successStorySummary}
            </p>
          </CardContent>
        </Card>

        {/* Public Sector Policy & Actors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="text-blue-600" size={24} />
              <span>Public Sector Policy & Actors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4">Doi Moi Policy Framework</h3>
            <p className="text-gray-700 mb-4">
              Under the Doi Moi policy launched in 1986, Vietnam transitioned from a communist, centrally planned economy to an open, market-oriented economy, creating a favorable investment environment for foreign investment and export-oriented activities. Under this policy:
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Vietnam opened its economy to FDI, liberalized trade relations, and encouraged the privatization of SOEs.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Textile manufacturers benefited from significant export incentives introduced in the 1990s, including duty rebates and suspensions, government-supported technology investments, and textile-focused industrial zones with streamlined administrative procedures and subsidized infrastructure.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Vietnam National Textile and Garment Group (Vinatex)</h3>
            <p className="text-gray-700 mb-4">
              Established in 1995 as a state-owned enterprise (SOE), the Vietnam National Textile and Garment Group (Vinatex) operated as both a textile manufacturer and coordinating body for the Vietnamese government's investments in textiles.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Vinatex consolidated 30+ textile and garment SOEs under a single entity, enabling investment coordination and vertical integration.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Vinatex also actively sought joint ventures with foreign firms (e.g. Japan's Itochu) in the 1990s, catalyzing foreign capital and technology into the sector.</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Sources:</p>
              <p className="text-sm text-blue-700 mt-1">
                <a href="https://www.eria.org/uploads/media/Books/2023-VietNam-2045/16_ch.12-Textile-and-Garment-Industry-in-GVC.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  ERIA (2023). Textile and Garment Industry in GVC - Vietnam 2045
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Private Sector Pioneering Firms & Industrial Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Factory className="text-purple-600" size={24} />
              <span>Private Sector Pioneering Firms & Industrial Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Nike's Manufacturing Presence</h3>
                <p className="text-gray-700 mb-3">
                  Nike established its manufacturing presence in Vietnam in the 1990s, making Vietnam its largest production base. Nike was important because:
                </p>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>By bringing cutting-edge technology, optimized manufacturing processes, and training programs, Nike significantly elevated Vietnam's footwear manufacturing standards.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Nike's operations attracted other multinational companies to invest in Vietnam and positioned the country as a global footwear hub.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Local Industry Growth: Thai Binh Group (TBS)</h3>
                <p className="text-gray-700 mb-3">
                  Local manufacturing firms such as the Thai Binh Group (TBS) grew by leveraging the investments initiated by international footwear companies.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>In the 1990s, Thai Binh signed manufacturing contracts to collaborate with Sketchers, Nike, Adidas, and Reebok as a supplier, benefiting from their technology transfer and advanced production techniques.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>These partnerships enabled TBS to expand its capabilities, achieve higher export volumes.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>In 2022, TBS ranked among Vietnam's top footwear exporters, with an export value of $255.1 million and over 20 million shoes produced.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800 font-medium">Sources:</p>
              <p className="text-sm text-purple-700 mt-1">
                <a href="https://labourlinkvn.com/nikes-impact-on-vietnamese-workers-and-the-economy-2/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Labour Link VN. Nike's Impact on Vietnamese Workers and the Economy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* External Market Factors & Actors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="text-green-600" size={24} />
              <span>External Market Factors & Actors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Multi-Fibre Arrangement (MFA) Impact</h3>
                <p className="text-gray-700 mb-3">
                  From 1974 to 2005, the Multi-Fibre Arrangement (MFA) imposed quotas on global textile producers' exports to the US, Canadian, and European markets. It was significant to Vietnam's story because:
                </p>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>By the early 1990s, some of the dominant Asian textile producers (e.g. China and India) had already filled most of their quotas, constraining further growth.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Simultaneously, labor costs were rising in China, Korea, and Taiwan, causing textile manufacturers to seek cheaper frontiers.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>By the mid-1990s, Vietnam, not subject to the MFA as a non-member of the WTO and having some of the cheapest labor costs in the world, became an attractive investment destination for Japanese and Western textile manufacturers.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>By the time the MFA was terminated in 2005, Vietnam had already tripled its textile exports, entrenching itself in the global supply chain and allowing for the resilience of the industry despite stiffer competition from Chinese producers no longer constrained by quotas.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Japanese Investment & "China Plus One" Strategy</h3>
                <p className="text-gray-700 mb-3">
                  Japanese investment was significant for Vietnam's textile industry:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>In the mid-1990s, Japanese trading companies were diversifying away from China as part of their "China Plus One" strategy and sought to increase investment in Vietnam. Japanese FDI to Vietnam increased by more than 5 times between 1990 and 1995.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>These Japanese textile manufacturers like Itochu, Toray, and Shikibo provided technical assistance, training, and technology transfer to Vietnamese SOEs (e.g. Vietnam National Textile Corporation) and workers, building Vietnam's capabilities in textile dyeing and finishing, synthetic fiber production, and high end fabric manufacturing.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Japan, the largest ODA donor to Vietnam in the 1990s, used aid to overcome obstacles to private investment, investing in infrastructure (e.g. roads, ports, power plants) that enabled the success of manufacturing and export activities.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">Sources:</p>
              <div className="text-sm text-green-700 mt-1 space-y-1">
                <p>
                  <a href="https://www.oecd.org/content/dam/oecd/en/publications/reports/2004/12/mobilising-investment-for-development_g17a1670/310312530030.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    OECD (2004). Mobilising Investment for Development
                  </a>
                </p>
                <p>
                  <a href="https://www.eria.org/uploads/media/Books/2023-VietNam-2045/16_ch.12-Textile-and-Garment-Industry-in-GVC.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    ERIA (2023). Textile and Garment Industry in GVC - Vietnam 2045
                  </a>
                </p>
                <p>
                  <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1471-0374.2011.00330.x" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Wiley Online Library (2011). Economic Development Analysis
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="text-orange-600" size={24} />
              <span>Outcomes & Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Users className="mx-auto mb-2 text-orange-600" size={32} />
                <p className="text-2xl font-bold text-orange-600">3 million</p>
                <p className="text-sm text-orange-700">Direct Jobs Created</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="mx-auto mb-2 text-green-600" size={32} />
                <p className="text-2xl font-bold text-green-600">15%</p>
                <p className="text-sm text-green-700">of Total Export Revenue</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="text-2xl font-bold text-blue-600">$409B</p>
                <p className="text-sm text-blue-700">Vietnam GDP (2022)</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                Vietnam's GDP reached approximately $409 billion in 2022, with the textile sector representing over 15% of total exports. The sector has created 3 million jobs, with major companies like Nike and Adidas employing tens of thousands of workers each in manufacturing plants.
              </p>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800 font-medium">Sources:</p>
              <p className="text-sm text-orange-700 mt-1">
                <a href="https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=VN" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  World Bank Data. Vietnam GDP
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Further Reading */}
        <Card>
          <CardHeader>
            <CardTitle>Further Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>Nadvi, K. & Thoburn, J. (2004).</strong> "Vietnam in the global garment and textile value chain: impacts on firms and workers." <em>Journal of International Development, 16</em>(1), 111-123.</p>
              <p><strong>Tran, A.N. (2013).</strong> "Ties that bind: Cultural identity and the political economy of Vietnam's textile and garment industry." <em>Southeast Asian Studies, 51</em>(2), 259-285.</p>
              <p><strong>World Bank (2020).</strong> "Vietnam's Manufacturing Miracle: Lessons for Developing Countries." <em>World Bank Group Policy Research Working Paper.</em></p>
              <p><strong>UNCTAD (2019).</strong> "Foreign Direct Investment and Industrial Upgrading in Vietnam's Textile Sector." <em>United Nations Conference on Trade and Development.</em></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseStudy;
