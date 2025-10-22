// Editor's Picks - Featured case studies for the carousel
export interface EditorsPick {
  country: string;
  sector: string;
  primaryKey: number;
  exportValue1995: number;
  exportValue2022: number;
  successStory: string;
}

export const editorsPicks: EditorsPick[] = [
  {
    country: 'Cambodia',
    sector: 'Textiles',
    primaryKey: 7,
    exportValue1995: 0.39,
    exportValue2022: 4.4,
    successStory: 'Textile sector now represents over 20% of GDP, creating 300,000+ jobs primarily for women in garment manufacturing'
  },
  {
    country: 'Morocco',
    sector: 'Vehicles',
    primaryKey: 63,
    exportValue1995: 0.029,
    exportValue2022: 7.36,
    successStory: 'Automotive sector transformed to represent 22% of GDP and a third of total exports, creating over 200,000 jobs'
  },
  {
    country: 'Vietnam',
    sector: 'Electronics',
    primaryKey: 94,
    exportValue1995: 1.5,
    exportValue2022: 38.76,
    successStory: 'Services sector expanded 26-fold, becoming a major driver of economic growth and employment'
  },
  {
    country: 'Costa Rica',
    sector: 'Machinery',
    primaryKey: 73,
    exportValue1995: 0.097,
    exportValue2022: 6.36,
    successStory: 'Medical device sector grew to 42% of total exports, employing 56,000 workers and becoming 5th largest supplier to US'
  },
  {
    country: 'Poland',
    sector: 'Agriculture',
    primaryKey: 13,
    exportValue1995: 4.02,
    exportValue2022: 61.18,
    successStory: 'Became 3rd largest poultry exporter and EU\'s largest chicken producer, accounting for 9.4% of total employment'
  },
  {
    country: 'Indonesia',
    sector: 'Metals',
    primaryKey: 39,
    exportValue1995: 2.14,
    exportValue2022: 41.22,
    successStory: 'Metal exports surged 19-fold, establishing Indonesia as a leading global ferroalloy exporter'
  },
  {
    country: 'India',
    sector: 'Chemicals',
    primaryKey: 47,
    exportValue1995: 3.42,
    exportValue2022: 69.54,
    successStory: 'Pharmaceutical industry grew 20-fold to rank 3rd globally by volume, employing 2.7M+ people and contributing 9% of exports'
  },
  {
    country: 'Egypt',
    sector: 'Agriculture',
    primaryKey: 21,
    exportValue1995: 0.44,
    exportValue2022: 7.82,
    successStory: 'Agricultural exports grew 18-fold, now representing 20% of employment and 18% of total exports led by citrus'
  },
  {
    country: 'Romania',
    sector: 'Services',
    primaryKey: 94,
    exportValue1995: 1.5,
    exportValue2022: 38.76,
    successStory: 'Services sector expanded 26-fold, becoming a major driver of economic growth and employment'
  }
];
