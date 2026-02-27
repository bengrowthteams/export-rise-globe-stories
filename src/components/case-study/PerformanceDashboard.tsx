
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PerformanceDashboardProps {
  rank1995: number;
  rank2022: number;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
  sectorExportsGDP1995: number;
  sectorExportsGDP2022: number;
}

const PerformanceDashboard = ({
  rank1995,
  rank2022,
  initialExports1995,
  currentExports2022,
  globalShare1995,
  globalShare2022,
  sectorExportsGDP1995,
  sectorExportsGDP2022
}: PerformanceDashboardProps) => {
  
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
  const exportGrowthAnnual = (Math.pow(currentExports2022 / initialExports1995, 1/27) - 1) * 100;
  const shareChange = globalShare2022 - globalShare1995;
  const gdpChange = sectorExportsGDP2022 - sectorExportsGDP1995;

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Performance Dashboard</h2>
      <Card className="bg-gray-900 border-white/10">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="font-semibold text-sm text-gray-400">Metric</TableHead>
                <TableHead className="font-semibold text-sm text-gray-400">1995</TableHead>
                <TableHead className="font-semibold text-sm text-gray-400">2022</TableHead>
                <TableHead className="font-semibold text-sm text-gray-400">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-white/10">
                <TableCell className="font-medium text-sm text-gray-300">Global Export Ranking</TableCell>
                <TableCell className="text-sm text-gray-400">#{rank1995}</TableCell>
                <TableCell className="text-sm text-gray-400">#{rank2022}</TableCell>
                <TableCell className={`text-sm font-semibold ${rankChange > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {rankChange > 0 ? '+' : ''}{rankChange} positions
                </TableCell>
              </TableRow>
              <TableRow className="border-white/10">
                <TableCell className="font-medium text-sm text-gray-300">Export Value</TableCell>
                <TableCell className="text-sm text-gray-400">{formatCurrency(initialExports1995)}</TableCell>
                <TableCell className="text-sm text-gray-400">{formatCurrency(currentExports2022)}</TableCell>
                <TableCell className="text-emerald-400 font-semibold text-sm">
                  +{exportGrowthAnnual.toFixed(1)}% per year
                </TableCell>
              </TableRow>
              <TableRow className="border-white/10">
                <TableCell className="font-medium text-sm text-gray-300">Global Market Share</TableCell>
                <TableCell className="text-sm text-gray-400">{globalShare1995.toFixed(2)}%</TableCell>
                <TableCell className="text-sm text-gray-400">{globalShare2022.toFixed(2)}%</TableCell>
                <TableCell className={`text-sm font-semibold ${shareChange > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {shareChange > 0 ? '+' : ''}{shareChange.toFixed(2)}pp
                </TableCell>
              </TableRow>
              <TableRow className="border-white/10">
                <TableCell className="font-medium text-sm text-gray-300">Sector Exports as % of GDP</TableCell>
                <TableCell className="text-sm text-gray-400">{sectorExportsGDP1995.toFixed(2)}%</TableCell>
                <TableCell className="text-sm text-gray-400">{sectorExportsGDP2022.toFixed(2)}%</TableCell>
                <TableCell className={`text-sm font-semibold ${gdpChange > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {gdpChange > 0 ? '+' : ''}{gdpChange.toFixed(2)}pp
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;
