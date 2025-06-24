
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
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Vietnam opened its economy to FDI, liberalized trade relations, and encouraged the privatization of SOEs.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Textile manufacturers benefited from significant export incentives introduced in the 1990s, including duty rebates and suspensions, government-supported technology investments, and textile-focused industrial zones with streamlined administrative procedures and subsidized infrastructure.</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Sources:</p>
              <p className="text-sm text-blue-700 mt-1">
                World Bank (2020). Vietnam's Manufacturing Miracle: Lessons for Developing Countries
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
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Multinational Investments</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Nike:</strong> Established major footwear manufacturing operations, bringing advanced production techniques and quality standards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Japanese Investors:</strong> Invested in textile factories with technology transfer programs, upgrading local manufacturing capabilities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Local Suppliers:</strong> Developed extensive supplier networks, creating industrial clusters and knowledge spillovers</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">Sources:</p>
                <p className="text-sm text-purple-700 mt-1">
                  UNCTAD (2019). Foreign Direct Investment and Industrial Upgrading in Vietnam's Textile Sector
                </p>
              </div>
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
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Trade Agreements & Market Access</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>US-Vietnam Trade Agreement (2001):</strong> Provided preferential access to the US market, Vietnam's largest textile export destination</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>WTO Membership (2007):</strong> Reduced trade barriers and increased integration with global supply chains</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>EU Trade Partnership:</strong> Opened European markets for Vietnamese textile exports with competitive tariff rates</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium text-sm">
                  Key Markets: {story.marketDestinations.join(', ')}
                </span>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Sources:</p>
                <p className="text-sm text-green-700 mt-1">
                  WTO (2018). Trade Policy Review: Vietnam - Textile and Apparel Sector Analysis
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Users className="mx-auto mb-2 text-orange-600" size={32} />
                <p className="text-2xl font-bold text-orange-600">{story.impact.jobs}</p>
                <p className="text-sm text-orange-700">Direct Employment</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="mx-auto mb-2 text-green-600" size={32} />
                <p className="text-2xl font-bold text-green-600">{story.impact.economicContribution}</p>
                <p className="text-sm text-green-700">of Total Export Revenue</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="text-2xl font-bold text-blue-600">#{story.globalRanking2022}</p>
                <p className="text-sm text-blue-700">Global Ranking (2022)</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Current Challenges</h3>
              <ul className="space-y-2">
                {story.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
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
