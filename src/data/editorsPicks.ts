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
    successStory: 'Garment sector surged to represent nearly a third of GDP, employing over 900,000 workers with 80% women, now the country\'s top export'
  },
  {
    country: 'Morocco',
    sector: 'Vehicles',
    primaryKey: 63,
    exportValue1995: 0.029,
    exportValue2022: 7.36,
    successStory: 'Now the largest vehicle exporter to the EU and Africa\'s leading manufacturer, creating 200,000+ jobs and representing over a fifth of GDP'
  },
  {
    country: 'Vietnam',
    sector: 'Electronics',
    primaryKey: 77,
    exportValue1995: 0.029,
    exportValue2022: 138.44,
    successStory: 'As Samsung\'s leading producer, electronics grew 4,700-fold to become 6th largest tech manufacturer globally, employing 500,000+ workers'
  },
  {
    country: 'Costa Rica',
    sector: 'Machinery',
    primaryKey: 73,
    exportValue1995: 0.097,
    exportValue2022: 6.36,
    successStory: 'Medical devices now comprise 42% of exports, ranking 2nd in Latin America and 5th supplier to US, with 56,000 direct jobs'
  },
  {
    country: 'Poland',
    sector: 'Agriculture',
    primaryKey: 13,
    exportValue1995: 4.02,
    exportValue2022: 61.18,
    successStory: 'Now EU\'s largest chicken producer and 3rd largest poultry exporter globally, with agriculture providing 9.4% of employment and 15% of exports'
  },
  {
    country: 'Indonesia',
    sector: 'Metals',
    primaryKey: 39,
    exportValue1995: 2.14,
    exportValue2022: 41.22,
    successStory: 'Transformed from raw exports to nickel processing, now leads global ferroalloy exports as the world\'s 9th largest metal exporter'
  },
  {
    country: 'India',
    sector: 'Chemicals',
    primaryKey: 47,
    exportValue1995: 3.42,
    exportValue2022: 69.54,
    successStory: 'Pharmaceutical industry ranks 3rd globally by volume, employing 2.7M+ people and contributing 9% of exports and 1.72% to GDP'
  },
  {
    country: 'Egypt',
    sector: 'Agriculture',
    primaryKey: 21,
    exportValue1995: 0.44,
    exportValue2022: 7.82,
    successStory: 'Led by citrus exports exceeding $920M annually, agriculture now accounts for 20% of employment and 18% of total exports'
  },
  {
    country: 'Romania',
    sector: 'Services',
    primaryKey: 94,
    exportValue1995: 1.5,
    exportValue2022: 38.76,
    successStory: 'ICT services boomed from $1.6B to $7B, with sector now accounting for 14% of GDP and supporting 880,000+ direct and indirect jobs'
  }
];
