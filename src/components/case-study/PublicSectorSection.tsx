
import React from 'react';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PublicSectorSection = () => {
  return (
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
  );
};

export default PublicSectorSection;
