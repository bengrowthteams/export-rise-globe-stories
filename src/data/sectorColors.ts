// Color mapping for different sectors
export const sectorColors: Record<string, string> = {
  'Services': '#A5456C', // rgb(165, 69, 108)
  'Agriculture': '#94D8A6', // rgb(148, 216, 166)
  'Textiles': '#385F7A', // rgb(56, 95, 122)
  'Stone': '#D4B684', // rgb(212, 182, 132)
  'Stones': '#D4B684', // rgb(212, 182, 132)
  'Minerals': '#B7836E', // Earthy brown
  'Metals': '#CD807E', // rgb(205, 128, 126)
  'Chemicals': '#BB7FD4', // rgb(187, 127, 212)
  'Vehicles': '#8A7CD2', // rgb(138, 124, 210)
  'Machinery': '#83A1D5', // rgb(131, 161, 213)
  'Electronics': '#94D8D9', // rgb(148, 216, 217)
  // Keep existing colors for other sectors
  'Manufacturing': '#f97316', // orange-500
  'Automotive': '#06b6d4', // cyan-500
  'Food Processing': '#84cc16', // lime-500
  'Mining': '#a855f7', // purple-500
  'Energy': '#dc2626', // red-600
  'Tourism': '#14b8a6', // teal-500
  'Technology': '#6366f1', // indigo-500
  'Pharmaceuticals': '#0891b2', // sky-600
  'Construction': '#f472b6', // pink-400
  'Transportation': '#64748b', // slate-500
  'Forestry': '#059669', // emerald-600
  'Fishing': '#0ea5e9', // sky-500
  'Steel': '#374151', // gray-700
  'Petroleum': '#b91c1c', // red-700
  'Plastics': '#be185d', // pink-700
  'Rubber': '#166534', // green-700
  'Paper': '#7c2d12', // orange-800
  'Glass': '#1e40af', // blue-700
  'Wood': '#365314', // green-800
  'Leather': '#7c2d12', // orange-800
  'Ceramics': '#581c87', // purple-800
  'Gems': '#701a75', // fuchsia-800
  'Spices': '#b45309', // amber-700
  'Cotton': '#1e3a8a', // blue-800
  'Silk': '#9333ea', // purple-600
  'Tea': '#166534', // green-700
  'Coffee': '#451a03', // amber-950
};

// Function to get color for a sector
export const getSectorColor = (sector: string): string => {
  return sectorColors[sector] || '#6b7280'; // default gray-500
};

// Function to get all unique sectors from stories
export const getAllSectors = (stories: any[], countryStories: any[]): string[] => {
  const sectors = new Set<string>();
  
  // Add sectors from single-sector stories
  stories.forEach(story => {
    if (story.sector) {
      sectors.add(story.sector);
    }
  });
  
  // Add sectors from multi-sector stories
  countryStories.forEach(country => {
    country.sectors.forEach((sector: any) => {
      if (sector.sector) {
        sectors.add(sector.sector);
      }
    });
  });
  
  return Array.from(sectors).sort();
};
