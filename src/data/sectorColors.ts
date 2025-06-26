
// Color mapping for different sectors - no green colors for individual sectors
export const sectorColors: Record<string, string> = {
  'Agriculture': '#f59e0b', // amber-500 (changed from green)
  'Textiles': '#3b82f6', // blue-500
  'Manufacturing': '#f97316', // orange-500
  'Electronics': '#8b5cf6', // violet-500
  'Chemicals': '#ef4444', // red-500
  'Automotive': '#06b6d4', // cyan-500
  'Food Processing': '#84cc16', // lime-500
  'Mining': '#a855f7', // purple-500
  'Energy': '#dc2626', // red-600
  'Services': '#ec4899', // pink-500
  'Tourism': '#14b8a6', // teal-500
  'Technology': '#6366f1', // indigo-500
  'Pharmaceuticals': '#0891b2', // sky-600
  'Construction': '#f472b6', // pink-400
  'Transportation': '#64748b', // slate-500
  'Forestry': '#059669', // emerald-600
  'Fishing': '#0ea5e9', // sky-500
  'Steel': '#374151', // gray-700
  'Petroleum': '#b91c1c', // red-700
  'Machinery': '#7c3aed', // violet-600
  'Metals': '#92400e', // amber-700
  'Plastics': '#be185d', // pink-700
  'Rubber': '#166534', // green-700
  'Paper': '#7c2d12', // orange-800
  'Glass': '#1e40af', // blue-700
  // Added distinct colors for potentially conflicting sectors
  'Stones': '#78350f', // amber-900 - distinct from other materials
  'Vehicles': '#1f2937', // gray-800 - distinct from automotive and transportation
  'Wood': '#365314', // green-800 - distinct from forestry
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
