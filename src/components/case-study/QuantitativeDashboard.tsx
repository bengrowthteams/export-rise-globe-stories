
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, DollarSign, Award } from 'lucide-react';

interface QuantitativeDashboardProps {
  rank1995: number;
  rank2022: number;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
}

const QuantitativeDashboard = ({
  rank1995,
  rank2022,
  initialExports1995,
  currentExports2022,
  globalShare1995,
  globalShare2022
}: QuantitativeDashboardProps) => {
  
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

  const rankChange = rank1995 - rank2022;
  const exportGrowth = ((currentExports2022 - initialExports1995) / initialExports1995) * 100;
  const shareChange = globalShare2022 - globalShare1995;

  return (
    <div className="mb-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Ranking Improvement</p>
                <p className="text-2xl font-bold text-blue-900">
                  {rankChange > 0 ? '+' : ''}{rankChange}
                </p>
              </div>
              {rankChange > 0 ? (
                <TrendingUp className="text-green-600" size={24} />
              ) : (
                <TrendingDown className="text-red-600" size={24} />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Export Growth</p>
                <p className="text-2xl font-bold text-green-900">
                  {exportGrowth.toFixed(0)}%
                </p>
              </div>
              <DollarSign className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Current Exports</p>
                <p className="text-2xl font-bold text-purple-900">
                  {formatCurrency(currentExports2022)}
                </p>
              </div>
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">2022 Global Rank</p>
                <p className="text-2xl font-bold text-orange-900">
                  #{rank2022}
                </p>
              </div>
              <Award className="text-orange-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="text-blue-600" size={24} />
            <span>Detailed Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Metric</TableHead>
                <TableHead className="font-semibold">1995</TableHead>
                <TableHead className="font-semibold">2022</TableHead>
                <TableHead className="font-semibold">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Global Export Ranking</TableCell>
                <TableCell>#{rank1995}</TableCell>
                <TableCell>#{rank2022}</TableCell>
                <TableCell className={rankChange > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {rankChange > 0 ? '+' : ''}{rankChange} positions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Export Value</TableCell>
                <TableCell>{formatCurrency(initialExports1995)}</TableCell>
                <TableCell>{formatCurrency(currentExports2022)}</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  +{exportGrowth.toFixed(0)}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Global Market Share</TableCell>
                <TableCell>{globalShare1995.toFixed(2)}%</TableCell>
                <TableCell>{globalShare2022.toFixed(2)}%</TableCell>
                <TableCell className={shareChange > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {shareChange > 0 ? '+' : ''}{shareChange.toFixed(2)}pp
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuantitativeDashboard;
