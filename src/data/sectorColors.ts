
// Color mapping for different sectors
export const sectorColors: Record<string, string> = {
  'Agriculture': '#22c55e', // green-500
  'Textiles': '#3b82f6', // blue-500
  'Manufacturing': '#f59e0b', // amber-500
  'Electronics': '#8b5cf6', // violet-500
  'Chemicals': '#ef4444', // red-500
  'Automotive': '#06b6d4', // cyan-500
  'Food Processing': '#84cc16', // lime-500
  'Mining': '#a855f7', // purple-500
  'Energy': '#f97316', // orange-500
  'Services': '#ec4899', // pink-500
  'Tourism': '#10b981', // emerald-500
  'Technology': '#6366f1', // indigo-500
  'Pharmaceuticals': '#14b8a6', // teal-500
  'Construction': '#f472b6', // pink-400
  'Transportation': '#64748b', // slate-500
  'Forestry': '#059669', // emerald-600
  'Fishing': '#0891b2', // sky-600
  'Steel': '#374151', // gray-700
  'Petroleum': '#dc2626', // red-600
  'Machinery': '#7c3aed', // violet-600
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
