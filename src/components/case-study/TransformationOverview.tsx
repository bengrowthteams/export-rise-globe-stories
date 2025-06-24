
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TransformationOverviewProps {
  globalRanking1995: number;
  globalRanking2022: number;
  initialExports1995: string;
  initialExports2022: string;
}

const TransformationOverview = ({ 
  globalRanking1995, 
  globalRanking2022, 
  initialExports1995, 
  initialExports2022 
}: TransformationOverviewProps) => {
  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount.replace(/[\$,]/g, ''));
    if (numAmount >= 1000000000) {
      return `$${(numAmount / 1000000000).toFixed(1)} billion`;
    } else if (numAmount >= 1000000) {
      return `$${(numAmount / 1000000).toFixed(1)} million`;
    }
    return amount;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="text-green-600" size={24} />
          <span>Transformation Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>1995</TableHead>
              <TableHead>2022</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Global Export Ranking</TableCell>
              <TableCell>#{globalRanking1995}</TableCell>
              <TableCell>#{globalRanking2022}</TableCell>
              <TableCell className="text-green-600 font-semibold">
                +{globalRanking1995 - globalRanking2022} positions
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Export Value</TableCell>
              <TableCell>{formatCurrency(initialExports1995)}</TableCell>
              <TableCell>{formatCurrency(initialExports2022)}</TableCell>
              <TableCell className="text-green-600 font-semibold">
                +{Math.round(((parseFloat(initialExports2022.replace(/[\$,]/g, '')) / parseFloat(initialExports1995.replace(/[\$,]/g, ''))) - 1) * 100)}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransformationOverview;
