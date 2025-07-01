
import React from 'react';
import { ArrowLeft, Award, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    
    // Get stored return state
    const returnState = ReturnStateService.getReturnState();
    console.log('Enhanced Case Study Header - Retrieved return state:', returnState);
    
    // Navigate back with comprehensive state restoration
    if (returnState) {
      navigate('/', { 
        state: {
          ...returnState,
          shouldRestoreView: true,
          fromCaseStudy: true
        }
      });
    } else {
      // Fallback navigation
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
  const shareChange = globalShare2022 - globalShare1995;

  return (
    <>
      {/* Sticky Return Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <Button 
            onClick={handleReturnToMap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base font-medium w-full sm:w-auto"
            size="sm"
          >
            <ArrowLeft className="mr-2" size={16} />
            Return to Map
          </Button>
        </div>
      </div>

      {/* Compact Header Content */}
      <div className="relative overflow-hidden pt-16" style={{ background: `linear-gradient(135deg, ${sectorColor}15 0%, ${sectorColor}25 100%)` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="text-4xl sm:text-5xl drop-shadow-lg">{flag}</div>
            <div className="flex-1 w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-left">
                {country} <span className="text-gray-600">/</span> {sector}
              </h1>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/50 mb-4">
                <p className="text-sm sm:text-base text-gray-700 text-left">
                  <span className="font-semibold" style={{ color: sectorColor }}>Successful Product:</span> {successfulProduct}
                </p>
              </div>

              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-orange-600">2022 Global Rank</p>
                      <p className="text-lg font-bold text-orange-900">#{rank2022}</p>
                    </div>
                    <Award className="text-orange-600" size={20} />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-blue-600">Ranking Improvement</p>
                      <p className="text-lg font-bold text-blue-900">
                        {rankChange > 0 ? '+' : ''}{rankChange}
                      </p>
                    </div>
                    <TrendingUp className="text-blue-600" size={20} />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-purple-600">Current Exports</p>
                      <p className="text-lg font-bold text-purple-900">{formatCurrency(currentExports2022)}</p>
                    </div>
                    <DollarSign className="text-purple-600" size={20} />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-green-600">Export Growth</p>
                      <p className="text-lg font-bold text-green-900">{exportGrowthMultiple}x</p>
                    </div>
                    <TrendingUp className="text-green-600" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedCaseStudyHeader;
