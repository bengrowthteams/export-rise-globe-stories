import { Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCountryFlag } from '@/data/countryFlags';
import { getSectorColor } from '@/data/sectorColors';
import { useNavigate } from 'react-router-dom';

interface SpotlightCardProps {
  country: string;
  sector: string;
  primaryKey: number;
  rank1995: number;
  rank2022: number;
  successStory: string;
}

export const SpotlightCard = ({
  country,
  sector,
  primaryKey,
  rank1995,
  rank2022,
  successStory
}: SpotlightCardProps) => {
  const navigate = useNavigate();
  const rankingGain = rank1995 - rank2022;
  const sectorColor = getSectorColor(sector);
  const countryFlag = getCountryFlag(country);

  const handleViewCaseStudy = () => {
    navigate(`/enhanced-case-study/${primaryKey}`);
  };

  return (
    <div className="relative bg-card border border-border rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-[280px] group">
      {/* Editor's Pick Badge */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-2 shadow-lg animate-pulse">
        <Star className="w-4 h-4 text-white fill-white" />
      </div>

      {/* Country Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-3xl">{countryFlag}</span>
        <h3 className="text-xl font-bold text-foreground">{country}</h3>
      </div>

      {/* Sector Badge */}
      <div className="mb-3">
        <span 
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: sectorColor }}
        >
          {sector}
        </span>
      </div>

      {/* Ranking Gain */}
      <div className="flex items-center gap-2 mb-3 text-emerald-600">
        <TrendingUp className="w-5 h-5" />
        <div className="font-bold">
          <span className="text-muted-foreground">#{rank1995}</span>
          <span className="mx-1">→</span>
          <span className="text-lg">#{rank2022}</span>
          <span className="ml-2 text-sm">+{rankingGain}</span>
        </div>
      </div>

      {/* Success Story */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
        {successStory}
      </p>

      {/* CTA Button */}
      <Button 
        onClick={handleViewCaseStudy}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all duration-300"
        size="sm"
      >
        View Case Study
      </Button>
    </div>
  );
};
