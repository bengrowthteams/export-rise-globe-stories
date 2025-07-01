
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Award, DollarSign, BarChart3 } from 'lucide-react';

interface CompactOutcomesDashboardProps {
  outcome: string;
  rank1995: number;
  rank2022: number;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
}

const CompactOutcomesDashboard = ({
  outcome,
  rank1995,
  rank2022,
  initialExports1995,
  currentExports2022,
  globalShare1995,
  globalShare2022
}: CompactOutcomesDashboardProps) => {
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const rankChange = rank1995 - rank2022;
  const exportGrowthMultiple = (currentExports2022 / initialExports1995);
  const globalShareChange = globalShare2022 - globalShare1995;
  const globalSharePercentIncrease = ((globalShare2022 - globalShare1995) / globalShare1995) * 100;

  const metrics = [
    {
      title: 'Global Rank',
      value: `#${rank2022}`,
      change: rankChange > 0 ? `+${rankChange}` : `${rankChange}`,
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      isPositive: rankChange > 0,
      suffix: ''
    },
    {
      title: 'Export Value',
      value: formatCurrency(currentExports2022),
      change: `${exportGrowthMultiple.toFixed(1)}x`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      isPositive: exportGrowthMultiple > 1,
      suffix: ''
    },
    {
      title: 'Global Market Share',
      value: formatPercentage(globalShare2022),
      change: `${globalSharePercentIncrease.toFixed(1)}%`,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      isPositive: globalShareChange > 0,
      suffix: ''
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Outcomes</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700 leading-relaxed">
          {outcome}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className={`${metric.bgColor} border-2 border-gray-200`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <metric.icon className={`${metric.color} mr-2`} size={20} />
                  <h3 className="text-sm font-medium text-gray-700">{metric.title}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center">
                  {metric.isPositive ? (
                    <TrendingUp className="text-green-600 mr-1" size={16} />
                  ) : (
                    <TrendingDown className="text-red-600 mr-1" size={16} />
                  )}
                  <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}{metric.suffix}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompactOutcomesDashboard;
