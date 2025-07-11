
export interface SectorStory {
  primaryKey?: number; // Made optional for backwards compatibility
  sector: string;
  product: string;
  description: string;
  growthRate: number;
  exportValue: string;
  keyFactors: string[];
  marketDestinations: string[];
  challenges: string[];
  impact: {
    jobs: string;
    economicContribution: string;
  };
  globalRanking1995: number;
  globalRanking2022: number;
  initialExports1995: string;
  initialExports2022: string;
  successfulProduct: string;
  successStorySummary: string;
}

export interface CountrySuccessStories {
  id: string;
  country: string;
  flag: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timeframe: string;
  sectors: SectorStory[];
  // Helper properties for backwards compatibility
  hasMutipleSectors: boolean;
  primarySector: SectorStory; // The most significant sector
}
