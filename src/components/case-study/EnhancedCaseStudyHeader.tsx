
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
          fromCaseStudy: true,
          shouldRestoreStoryCard: true,
          targetCountry: returnState.country,
          targetSector: returnState.sector
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

  return (
    <>
      {/* Sticky Return Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1">
          <Button 
            onClick={handleReturnToMap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm font-medium w-full sm:w-auto"
            size="sm"
          >
            <ArrowLeft className="mr-2" size={14} />
            Return to Map
          </Button>
        </div>
      </div>

      {/* Header Content with Navy Background */}
      <div className="relative overflow-hidden pt-12 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
            {/* Left Side - Country Info */}
            <div className="flex items-start space-x-3 flex-1">
              <div className="text-3xl drop-shadow-lg">{flag}</div>
              <div>
                <h1 className="text-xl font-bold text-white mb-1">
                  {country} <span className="text-gray-300">/</span> {sector}
                </h1>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                  <p className="text-sm text-white">
                    <span className="font-semibold" style={{ color: sectorColor }}>Successful Product:</span> {successfulProduct}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Performance Metrics 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2 lg:w-80">
              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-orange-200">2022 Global Rank</p>
                    <p className="text-lg font-bold text-white">#{rank2022}</p>
                  </div>
                  <Award className="text-orange-300" size={18} />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-200">Ranking Improvement</p>
                    <p className="text-xs font-medium text-blue-300">(1995-2022)</p>
                    <p className="text-lg font-bold text-white">
                      {rankChange > 0 ? '+' : ''}{rankChange}
                    </p>
                  </div>
                  <TrendingUp className="text-blue-300" size={18} />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-purple-200">Current Exports</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(currentExports2022)}</p>
                  </div>
                  <DollarSign className="text-purple-300" size={18} />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-green-200">Export Growth</p>
                    <p className="text-xs font-medium text-green-300">(1995-2022)</p>
                    <p className="text-lg font-bold text-white">{exportGrowthMultiple}x</p>
                  </div>
                  <TrendingUp className="text-green-300" size={18} />
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
