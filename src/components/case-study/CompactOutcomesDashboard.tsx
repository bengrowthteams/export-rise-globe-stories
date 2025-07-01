
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  const exportGrowthAnnual = (Math.pow(currentExports2022 / initialExports1995, 1/27) - 1) * 100;
  const shareChange = globalShare2022 - globalShare1995;
  const shareChangeAnnual = shareChange / 27;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Outcomes</h2>
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-base">
              {outcome}
            </p>
          </div>

          <div className="border-t pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-sm">Metric</TableHead>
                  <TableHead className="font-semibold text-sm">1995</TableHead>
                  <TableHead className="font-semibold text-sm">2022</TableHead>
                  <TableHead className="font-semibold text-sm">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-sm">Global Export Ranking</TableCell>
                  <TableCell className="text-sm">#{rank1995}</TableCell>
                  <TableCell className="text-sm">#{rank2022}</TableCell>
                  <TableCell className={`text-sm font-semibold ${rankChange > 0 ? "text-green-600" : "text-red-600"}`}>
                    {rankChange > 0 ? '+' : ''}{rankChange} positions
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-sm">Export Value</TableCell>
                  <TableCell className="text-sm">{formatCurrency(initialExports1995)}</TableCell>
                  <TableCell className="text-sm">{formatCurrency(currentExports2022)}</TableCell>
                  <TableCell className="text-green-600 font-semibold text-sm">
                    +{exportGrowthAnnual.toFixed(1)}% per year
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-sm">Global Market Share</TableCell>
                  <TableCell className="text-sm">{globalShare1995.toFixed(2)}%</TableCell>
                  <TableCell className="text-sm">{globalShare2022.toFixed(2)}%</TableCell>
                  <TableCell className={`text-sm font-semibold ${shareChangeAnnual > 0 ? "text-green-600" : "text-red-600"}`}>
                    {shareChangeAnnual > 0 ? '+' : ''}{shareChangeAnnual.toFixed(3)}pp per year
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
