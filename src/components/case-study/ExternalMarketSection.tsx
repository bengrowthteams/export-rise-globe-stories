
import React from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExternalMarketSection = () => {
  return (
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
  );
};

export default ExternalMarketSection;
