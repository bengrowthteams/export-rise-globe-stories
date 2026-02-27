
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
      // Check if we should return to spotlights section
      if (returnState.returnToSection === 'spotlights') {
        navigate('/', { replace: true });
        // Scroll to spotlights section after navigation
        setTimeout(() => {
          const spotlightsSection = document.getElementById('case-spotlights');
          if (spotlightsSection) {
            spotlightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Return to map view with filters
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
      }
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
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-white/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-2">
          <Button
            onClick={handleReturnToMap}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-sm font-medium border border-emerald-500/30"
            size="sm"
          >
            <ArrowLeft className="mr-2" size={16} />
            Return to Map
          </Button>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="relative overflow-hidden pt-16" style={{ background: `linear-gradient(135deg, ${sectorColor}18 0%, ${sectorColor}08 100%)` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-950/60"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-start space-x-6">
            <div className="text-8xl drop-shadow-lg">{flag}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-4">
                {country} <span className="text-gray-500">/</span> {sector}
              </h1>
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-4">
                <p className="text-base text-gray-300">
                  <span className="font-semibold" style={{ color: sectorColor }}>Successful Product:</span> {successfulProduct}
                </p>
              </div>

              {/* Performance Stats - Inline */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/8">
                  <Award className="text-orange-400" size={16} />
                  <div>
                    <span className="font-medium text-orange-300">2022 Rank:</span>
                    <span className="ml-1 font-bold text-orange-200">#{rank2022}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/8">
                  <TrendingUp className="text-emerald-400" size={16} />
                  <div>
                    <span className="font-medium text-emerald-300">Rank Change ('95-'22):</span>
                    <span className="ml-1 font-bold text-emerald-200">
                      {rankChange > 0 ? '+' : ''}{rankChange}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/8">
                  <DollarSign className="text-purple-400" size={16} />
                  <div>
                    <span className="font-medium text-purple-300">Current Exports:</span>
                    <span className="ml-1 font-bold text-purple-200">{formatCurrency(currentExports2022)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/8">
                  <BarChart3 className="text-blue-400" size={16} />
                  <div>
                    <span className="font-medium text-blue-300">Growth ('95-'22):</span>
                    <span className="ml-1 font-bold text-blue-200">{exportGrowthMultiple}x</span>
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
