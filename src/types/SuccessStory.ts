
export interface SuccessStory {
  id: string;
  country: string;
  sector: string;
  product: string;
  description: string;
  growthRate: number;
  timeframe: string;
  exportValue: string;
  keyFactors: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  flag: string;
  marketDestinations: string[];
  challenges: string[];
  impact: {
    jobs: string;
    economicContribution: string;
  };
}
