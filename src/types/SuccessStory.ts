
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
  // New fields for the redesigned cards
  globalRanking1995: number;
  globalRanking2022: number;
  initialExports1995: string;
  initialExports2022: string;
  successfulProduct: string;
  successStorySummary: string;
  globalShare1995?: number;
  globalShare2022?: number;
}
