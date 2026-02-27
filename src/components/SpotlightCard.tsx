import { TrendingUp, ArrowRight } from 'lucide-react';
import { getCountryFlag } from '@/data/countryFlags';
import { getSectorColor } from '@/data/sectorColors';
import { useNavigate } from 'react-router-dom';
import ReturnStateService from '@/services/returnStateService';

interface SpotlightCardProps {
  country: string;
  sector: string;
  primaryKey: number;
  exportValue1995: number;
  exportValue2022: number;
  successStory: string;
}

export const SpotlightCard = ({
  country,
  sector,
  primaryKey,
  exportValue1995,
  exportValue2022,
  successStory
}: SpotlightCardProps) => {
  const navigate = useNavigate();
  const growthMultiplier = Math.round(exportValue2022 / exportValue1995);
  const sectorColor = getSectorColor(sector);
  const countryFlag = getCountryFlag(country);

  const handleViewCaseStudy = () => {
    ReturnStateService.saveReturnState({
      selectedSectors: [],
      country,
      sector,
      returnToSection: 'spotlights'
    });
    navigate(`/enhanced-case-study/${primaryKey}`);
  };

  const formatValue = (value: number) => {
    if (value >= 1) {
      return `$${value.toFixed(1)}B`;
    }
    return `$${(value * 1000).toFixed(0)}M`;
  };

  return (
    <div
      className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-[360px] group card-shimmer cursor-pointer"
      onClick={handleViewCaseStudy}
    >
      {/* Sector color accent bar at top */}
      <div className="h-1 w-full" style={{ backgroundColor: sectorColor }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Country Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl leading-none">{countryFlag}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{country}</h3>
          </div>
        </div>

        {/* Sector Badge */}
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white tracking-wide"
            style={{ backgroundColor: sectorColor }}
          >
            {sector}
          </span>
        </div>

        {/* Export Value Growth */}
        <div className="flex items-center gap-2 mb-4 bg-gray-50 rounded-xl px-3 py-2.5">
          <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500">{formatValue(exportValue1995)}</span>
            <span className="text-gray-300 text-lg">→</span>
            <span className="text-base font-bold text-green-600">{formatValue(exportValue2022)}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 ml-auto">
              {growthMultiplier}×
            </span>
          </div>
        </div>

        {/* Success Story */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-grow leading-relaxed">
          {successStory}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-500 transition-colors">
          View Case Study
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
