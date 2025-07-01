
import React from 'react';
import { ArrowLeft, Award, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getSectorColor } from '@/data/sectorColors';
import ReturnStateService from '@/services/returnStateService';

interface EnhancedCaseStudyHeaderProps {
  flag: string;
  country: string;
  sector: string;
  successfulProduct: string;
  rank1995: number;
  rank2022: number;
  initialExports1995: number;
  currentExports2022: number;
  globalShare1995: number;
  globalShare2022: number;
}

const EnhancedCaseStudyHeader = ({ 
  flag, 
  country, 
  sector, 
  successfulProduct,
  rank1995,
  rank2022,
  initialExports1995,
  currentExports2022,
  globalShare1995,
  globalShare2022
}: EnhancedCaseStudyHeaderProps) => {
  const navigate = useNavigate();
  const sectorColor = getSectorColor(sector);

  const handleReturnToMap = () => {
    console.log('Enhanced Case Study Header - Return to Map clicked');
    
    const returnState = ReturnStateService.getReturnState();
    console.log('Enhanced Case Study Header - Retrieved return state:', returnState);
    
    if (returnState) {
      navigate('/', { 
        state: {
          ...returnState,
          shouldRestoreView: true,
          fromCaseStudy: true,
          shouldRestoreStoryCard: true,
          targetCountry: returnState.country,
          targetSector: returnState.sector
        }
      });
    } else {
      navigate('/');
    }
  };

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
  const exportGrowthMultiple = (currentExports2022 / initialExports1995).toFixed(1);

  return (
    <>
      {/* Sticky Return Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <Button 
            onClick={handleReturnToMap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
            size="sm"
          >
            <ArrowLeft className="mr-2" size={16} />
            Return to Map
          </Button>
        </div>
      </div>

      {/* New Clean Header Design */}
      <div className="bg-white pt-16 pb-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-6xl">{flag}</span>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {country}
                </h1>
                <p className="text-xl text-gray-600">{sector}</p>
              </div>
            </div>
            
            {/* Successful Product Card */}
            <Card className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-blue-700 mb-1">Success Story</p>
                <p className="text-lg font-semibold text-gray-900">{successfulProduct}</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Award className="text-orange-600" size={24} />
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-700">2022 Global Rank</p>
                    <p className="text-3xl font-bold text-orange-900">#{rank2022}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="text-green-600" size={24} />
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-700">Ranking Improvement (1995-2022)</p>
                    <p className="text-3xl font-bold text-green-900">
                      {rankChange > 0 ? '+' : ''}{rankChange}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="text-purple-600" size={24} />
                  <div className="text-right">
                    <p className="text-sm font-medium text-purple-700">Current Exports</p>
                    <p className="text-3xl font-bold text-purple-900">{formatCurrency(currentExports2022)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <BarChart3 className="text-blue-600" size={24} />
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-700">Export Growth (1995-2022)</p>
                    <p className="text-3xl font-bold text-blue-900">{exportGrowthMultiple}x</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedCaseStudyHeader;
