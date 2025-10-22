// Editor's Picks - Featured case studies for the carousel
export interface EditorsPick {
  country: string;
  sector: string;
  primaryKey: number;
  rank1995: number;
  rank2022: number;
  successStory: string;
}

export const editorsPicks: EditorsPick[] = [
  {
    country: 'Cambodia',
    sector: 'Textiles',
    primaryKey: 3,
    rank1995: 111,
    rank2022: 19,
    successStory: 'Garment sector grew to represent nearly a third of GDP, employing over 900,000 people'
  },
  {
    country: 'Morocco',
    sector: 'Vehicles',
    primaryKey: 63,
    rank1995: 75,
    rank2022: 31,
    successStory: 'Grew from $29M to $7B, now largest vehicle exporter to EU'
  },
  {
    country: 'Vietnam',
    sector: 'Electronics',
    primaryKey: 76,
    rank1995: 57,
    rank2022: 14,
    successStory: 'Electronics now represent 34% of total exports and employ over 1.8 million'
  },
  {
    country: 'Costa Rica',
    sector: 'Machinery',
    primaryKey: 73,
    rank1995: 63,
    rank2022: 41,
    successStory: 'Medical device sector grew to $6B+, making up 42% of total exports'
  },
  {
    country: 'Poland',
    sector: 'Agriculture',
    primaryKey: 13,
    rank1995: 36,
    rank2022: 11,
    successStory: 'Growing 15-fold since 1995'
  },
  {
    country: 'Indonesia',
    sector: 'Metals',
    primaryKey: 39,
    rank1995: 32,
    rank2022: 9,
    successStory: 'Leads global ferroalloy exports, 9th largest metal exporter'
  },
  {
    country: 'India',
    sector: 'Chemicals',
    primaryKey: 47,
    rank1995: 29,
    rank2022: 14,
    successStory: 'Pharmaceutical industry grew nearly 20-fold, employs 2.7M people'
  },
  {
    country: 'Egypt',
    sector: 'Agriculture',
    primaryKey: 21,
    rank1995: 87,
    rank2022: 54,
    successStory: 'Growing over 15-fold, accounts for a fifth of employment'
  },
  {
    country: 'Romania',
    sector: 'Services',
    primaryKey: 87,
    rank1995: 42,
    rank2022: 17,
    successStory: 'Grew from $800M to nearly $55B'
  }
];
