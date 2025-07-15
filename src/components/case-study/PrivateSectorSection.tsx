
import React from 'react';
import { Factory } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivateSectorSection = () => {
  return (
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
  );
};

export default PrivateSectorSection;
