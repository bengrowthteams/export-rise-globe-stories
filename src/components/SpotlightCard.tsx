import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCountryFlag } from '@/data/countryFlags';
import { getSectorColor } from '@/data/sectorColors';
import { useNavigate } from 'react-router-dom';

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
    navigate(`/enhanced-case-study/${primaryKey}`);
  };

  const formatValue = (value: number) => {
    if (value >= 1) {
      return `$${value.toFixed(1)}B`;
    }
    return `$${(value * 1000).toFixed(0)}M`;
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[320px] group">
      {/* Country Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{countryFlag}</span>
        <h3 className="text-2xl font-bold text-gray-900">{country}</h3>
      </div>

      {/* Sector Badge */}
      <div className="mb-4">
        <span 
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: sectorColor }}
        >
          {sector}
        </span>
      </div>

      {/* Export Value Growth */}
      <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-100">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-gray-700">Export Value Growth</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-600">{formatValue(exportValue1995)}</span>
          <span className="text-gray-400">→</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{formatValue(exportValue2022)}</span>
        </div>
        <div className="mt-1 text-sm font-semibold text-green-600">
          {growthMultiplier}x growth
        </div>
      </div>

      {/* Success Story */}
      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow leading-relaxed">
        {successStory}
      </p>

      {/* CTA Button */}
      <Button 
        onClick={handleViewCaseStudy}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
        size="default"
      >
        View Case Study
      </Button>
    </div>
  );
};
