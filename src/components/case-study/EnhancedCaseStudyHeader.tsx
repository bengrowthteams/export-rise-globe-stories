
import React from 'react';
import { ArrowLeft, Award, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
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
    <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${sectorColor}15 0%, ${sectorColor}25 100%)` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent"></div>
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={handleReturnToMap}
          className="mb-6 hover:bg-white/20"
        >
          <ArrowLeft className="mr-2" size={16} />
          Return to Map
        </Button>
        
        <div className="flex items-start space-x-6">
          <div className="text-8xl drop-shadow-lg">{flag}</div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {country} <span className="text-gray-600">/</span> {sector}
            </h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50 mb-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold" style={{ color: sectorColor }}>Successful Product:</span> {successfulProduct}
              </p>
            </div>
            
            {/* Performance Stats - Inline */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2">
                <Award className="text-orange-600" size={16} />
                <div>
                  <span className="font-medium text-orange-700">2022 Rank:</span>
                  <span className="ml-1 font-bold text-orange-900">#{rank2022}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2">
                <TrendingUp className="text-green-600" size={16} />
                <div>
                  <span className="font-medium text-green-700">Rank Change:</span>
                  <span className="ml-1 font-bold text-green-900">
                    {rankChange > 0 ? '+' : ''}{rankChange}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2">
                <DollarSign className="text-purple-600" size={16} />
                <div>
                  <span className="font-medium text-purple-700">Current Exports:</span>
                  <span className="ml-1 font-bold text-purple-900">{formatCurrency(currentExports2022)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2">
                <BarChart3 className="text-blue-600" size={16} />
                <div>
                  <span className="font-medium text-blue-700">Growth:</span>
                  <span className="ml-1 font-bold text-blue-900">{exportGrowthMultiple}x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCaseStudyHeader;
