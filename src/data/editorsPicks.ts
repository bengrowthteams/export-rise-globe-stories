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
    primaryKey: 3,
    exportValue1995: 0.065,
    exportValue2022: 12.86,
    successStory: 'Garment sector now represents a third of GDP, employing 900,000 workers—80% women'
  },
  {
    country: 'Morocco',
    sector: 'Vehicles',
    primaryKey: 63,
    exportValue1995: 0.029,
    exportValue2022: 7.36,
    successStory: 'Largest vehicle exporter to EU, creating 200,000+ jobs and over a fifth of GDP'
  },
  {
    country: 'Vietnam',
    sector: 'Electronics',
    primaryKey: 77,
    exportValue1995: 0.029,
    exportValue2022: 138.44,
    successStory: 'Samsung\'s leading producer, now 6th largest tech manufacturer globally with 500,000+ workers'
  },
  {
    country: 'Costa Rica',
    sector: 'Machinery',
    primaryKey: 73,
    exportValue1995: 0.097,
    exportValue2022: 6.36,
    successStory: 'Medical devices comprise 42% of exports, 2nd in Latin America, 5th US supplier'
  },
  {
    country: 'Poland',
    sector: 'Agriculture',
    primaryKey: 13,
    exportValue1995: 4.02,
    exportValue2022: 61.18,
    successStory: 'EU\'s largest chicken producer and 3rd largest poultry exporter globally'
  },
  {
    country: 'Indonesia',
    sector: 'Metals',
    primaryKey: 39,
    exportValue1995: 2.14,
    exportValue2022: 41.22,
    successStory: 'Transformed to nickel processing, now leads global ferroalloy exports, 9th largest metal exporter'
  },
  {
    country: 'India',
    sector: 'Chemicals',
    primaryKey: 47,
    exportValue1995: 3.42,
    exportValue2022: 69.54,
    successStory: 'Pharmaceutical industry ranks 3rd globally, employing 2.7M+ people, contributing 9% of exports'
  },
  {
    country: 'Egypt',
    sector: 'Agriculture',
    primaryKey: 21,
    exportValue1995: 0.44,
    exportValue2022: 7.82,
    successStory: 'Citrus exports exceed $920M annually, agriculture accounts for 20% employment, 18% exports'
  },
  {
    country: 'Romania',
    sector: 'Services',
    primaryKey: 94,
    exportValue1995: 1.5,
    exportValue2022: 38.76,
    successStory: 'ICT services boomed to $7B, now 14% of GDP, supporting 880,000+ jobs'
  }
];
