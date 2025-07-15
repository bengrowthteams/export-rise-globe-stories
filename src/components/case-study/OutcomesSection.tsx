
import React from 'react';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OutcomesSectionProps {
  outcome: string;
}

const OutcomesSection = ({ outcome }: OutcomesSectionProps) => {
  return (
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
            {outcome}
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
  );
};

export default OutcomesSection;
