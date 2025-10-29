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
    successStory: 'Garment industry now generates one-third of GDP and employs over 900,000 workers, 80% of them women'
  },
  {
    country: 'Morocco',
    sector: 'Vehicles',
    primaryKey: 63,
    exportValue1995: 0.029,
    exportValue2022: 7.36,
    successStory: 'Now the largest vehicle exporter to the EU, the automotive sector employs 200,000+ people and contributes over one-fifth of GDP'
  },
  {
    country: 'Vietnam',
    sector: 'Electronics',
    primaryKey: 77,
    exportValue1995: 0.029,
    exportValue2022: 138.44,
    successStory: 'Now the 6th-largest electronics exporter, with annual exports topping $130 billion and over half-a-million workers employed'
  },
  {
    country: 'Costa Rica',
    sector: 'Machinery',
    primaryKey: 73,
    exportValue1995: 0.097,
    exportValue2022: 6.36,
    successStory: 'The 5th-largest supplier of medical devices to the US, accounting for 42% of exports and employing 56,000 people'
  },
  {
    country: 'Poland',
    sector: 'Agriculture',
    primaryKey: 13,
    exportValue1995: 4.02,
    exportValue2022: 61.18,
    successStory: 'The EU\'s top chicken producer and 3rd-largest poultry exporter worldwide, fueling major agro-industrial growth'
  },
  {
    country: 'Indonesia',
    sector: 'Metals',
    primaryKey: 39,
    exportValue1995: 2.14,
    exportValue2022: 41.22,
    successStory: 'Produces nearly half of the world\'s processed nickel, a key input for batteries and stainless steel, employing 120,000 people'
  },
  {
    country: 'India',
    sector: 'Chemicals',
    primaryKey: 47,
    exportValue1995: 3.42,
    exportValue2022: 69.54,
    successStory: 'The world\'s 3rd-largest pharmaceutical producer (by volume), contributing 9% of exports and 2.7M+ jobs'
  },
  {
    country: 'Egypt',
    sector: 'Agriculture',
    primaryKey: 21,
    exportValue1995: 0.44,
    exportValue2022: 7.82,
    successStory: 'Now the 2nd-largest global exporter of oranges, with agriculture providing 18% of exports and 20% of employment'
  },
  {
    country: 'Romania',
    sector: 'Services',
    primaryKey: 94,
    exportValue1995: 1.5,
    exportValue2022: 38.76,
    successStory: 'ICT services expanded to $7B, now half of exports and supporting 880,000+ jobs'
  }
];
