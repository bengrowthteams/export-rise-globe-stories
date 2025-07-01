
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3 } from 'lucide-react';

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

  const rankChange = rank1995 - rank2022;
  const exportGrowthAnnual = (Math.pow(currentExports2022 / initialExports1995, 1/27) - 1) * 100; // 1995 to 2022 = 27 years
  const shareChange = globalShare2022 - globalShare1995;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Impact & Outcomes with Performance Metrics</h2>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <BarChart3 className="text-green-600" size={20} />
            <span>Comprehensive Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-sm">
              {outcome}
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Detailed Performance Metrics</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-xs">Metric</TableHead>
                  <TableHead className="font-semibold text-xs">1995</TableHead>
                  <TableHead className="font-semibold text-xs">2022</TableHead>
                  <TableHead className="font-semibold text-xs">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-xs">Global Export Ranking</TableCell>
                  <TableCell className="text-xs">#{rank1995}</TableCell>
                  <TableCell className="text-xs">#{rank2022}</TableCell>
                  <TableCell className={`text-xs font-semibold ${rankChange > 0 ? "text-green-600" : "text-red-600"}`}>
                    {rankChange > 0 ? '+' : ''}{rankChange} positions
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">Export Value</TableCell>
                  <TableCell className="text-xs">{formatCurrency(initialExports1995)}</TableCell>
                  <TableCell className="text-xs">{formatCurrency(currentExports2022)}</TableCell>
                  <TableCell className="text-green-600 font-semibold text-xs">
                    +{exportGrowthAnnual.toFixed(1)}% per year
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">Global Market Share</TableCell>
                  <TableCell className="text-xs">{globalShare1995.toFixed(2)}%</TableCell>
                  <TableCell className="text-xs">{globalShare2022.toFixed(2)}%</TableCell>
                  <TableCell className={`text-xs font-semibold ${shareChange > 0 ? "text-green-600" : "text-red-600"}`}>
                    {shareChange > 0 ? '+' : ''}{shareChange.toFixed(2)}pp
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactOutcomesDashboard;
