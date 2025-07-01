
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Factory, Globe } from 'lucide-react';

interface DetailedAnalysisSectionProps {
  publicSectorPolicy: string;
  publicSectorActor: string;
  privateSectorPioneeringFirm: string;
  privateSectorIndustryGrowth: string;
  externalMarketFactors: string;
  externalActorContribution: string;
}

const DetailedAnalysisSection = ({
  publicSectorPolicy,
  publicSectorActor,
  privateSectorPioneeringFirm,
  privateSectorIndustryGrowth,
  externalMarketFactors,
  externalActorContribution
}: DetailedAnalysisSectionProps) => {
  
  // Helper function to format text into paragraphs and bullet points
  const formatContent = (text: string) => {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    return paragraphs.map((paragraph, index) => {
      if (paragraph.includes('•') || paragraph.includes('-')) {
        // Handle bullet points
        const bullets = paragraph.split(/[•-]/).filter(bullet => bullet.trim().length > 0);
        return (
          <ul key={index} className="space-y-3 text-gray-700 mb-6">
            {bullets.map((bullet, bulletIndex) => (
              <li key={bulletIndex} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{bullet.trim()}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        // Handle regular paragraphs
        return (
          <p key={index} className="text-gray-700 mb-4">
            {paragraph.trim()}
          </p>
        );
      }
    });
  };

  return (
    <div className="mb-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding the Story</h2>
      
      {/* Public Sector Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="text-blue-600" size={24} />
            <span>Public Sector Policy & Actors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Policy Framework</h3>
              {formatContent(publicSectorPolicy)}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Actors</h3>
              {formatContent(publicSectorActor)}
            </div>
          </div>
          
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

      {/* Private Sector Section */}
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
              <h3 className="text-xl font-semibold mb-4">Pioneering Firms</h3>
              {formatContent(privateSectorPioneeringFirm)}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Industry Growth</h3>
              {formatContent(privateSectorIndustryGrowth)}
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

      {/* External Factors Section */}
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
              <h3 className="text-xl font-semibold mb-4">Market Factors</h3>
              {formatContent(externalMarketFactors)}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">External Actor Contribution</h3>
              {formatContent(externalActorContribution)}
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
    </div>
  );
};

export default DetailedAnalysisSection;
