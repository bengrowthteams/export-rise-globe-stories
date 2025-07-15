
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface KeyHighlightsSectionProps {
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
  rank1995: number;
  rank2022: number;
  ranksChange: number;
}

const KeyHighlightsSection = ({
  initialExports1995,
  currentExports2022,
  globalShare1995,
  globalShare2022,
  rank1995,
  rank2022,
  ranksChange
}: KeyHighlightsSectionProps) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const growthRate = initialExports1995 > 0 
    ? (((currentExports2022 - initialExports1995) / initialExports1995) * 100).toFixed(1)
    : '0';

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200 border-2">
          <CardContent className="p-4 text-center">
            <DollarSign className="mx-auto mb-2 text-blue-600" size={32} />
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(currentExports2022)}</p>
            <p className="text-sm text-blue-700">Current Exports (2022)</p>
            <p className="text-xs text-blue-600 mt-1">vs {formatCurrency(initialExports1995)} in 1995</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200 border-2">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto mb-2 text-green-600" size={32} />
            <p className="text-2xl font-bold text-green-600">+{growthRate}%</p>
            <p className="text-sm text-green-700">Export Growth</p>
            <p className="text-xs text-green-600 mt-1">1995-2022</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200 border-2">
          <CardContent className="p-4 text-center">
            <BarChart3 className="mx-auto mb-2 text-orange-600" size={32} />
            <p className="text-2xl font-bold text-orange-600">#{rank2022}</p>
            <p className="text-sm text-orange-700">Global Ranking (2022)</p>
            <p className="text-xs text-orange-600 mt-1">
              {ranksChange > 0 ? `+${ranksChange}` : ranksChange} from 1995
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KeyHighlightsSection;
