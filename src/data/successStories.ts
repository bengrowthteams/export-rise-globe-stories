import { SuccessStory } from '../types/SuccessStory';

export const successStories: SuccessStory[] = [
  {
    id: '1',
    country: 'Vietnam',
    sector: 'Textiles & Apparel',
    product: 'Garments and Footwear',
    description: 'Vietnam transformed from a primarily agricultural economy to become the world\'s second-largest garment exporter, leveraging low labor costs, strategic trade agreements, and foreign investment.',
    growthRate: 285,
    timeframe: '2000-2020',
    exportValue: '$39.2 billion (2020)',
    keyFactors: [
      'Strategic FDI attraction',
      'Trade liberalization',
      'Skilled workforce development',
      'Infrastructure investment'
    ],
    coordinates: { lat: 14.0583, lng: 108.2772 },
    flag: '🇻🇳',
    marketDestinations: ['United States', 'European Union', 'Japan', 'South Korea'],
    challenges: ['Rising labor costs', 'Environmental concerns', 'Competition from Bangladesh'],
    impact: {
      jobs: '2.5 million direct jobs',
      economicContribution: '15% of total export revenue'
    },
    globalRanking1995: 44,
    globalRanking2022: 2,
    initialExports1995: '$4,018,462,336',
    initialExports2022: '$61,180,082,835',
    successfulProduct: 'textile footwear',
    successStorySummary: 'In the late 1980s, privatization and liberalization reforms and targeted incentives attracted foreign investment in Vietnam\'s textile and footwear sectors. Multinational footwear companies like Nike and Japanese investors invested in textile factories and facilitated technology transfer, creating millions of jobs and driving export growth and industrial upgrading.'
  },
  {
    id: '2',
    country: 'Ethiopia',
    sector: 'Coffee',
    product: 'Specialty Coffee Beans',
    description: 'Ethiopia leveraged its heritage as the birthplace of coffee to develop premium specialty coffee exports, focusing on quality, traceability, and direct trade relationships.',
    growthRate: 180,
    timeframe: '2010-2020',
    exportValue: '$1.2 billion (2020)',
    keyFactors: [
      'Quality certification programs',
      'Direct trade relationships',
      'Cooperative development',
      'Brand building initiatives'
    ],
    coordinates: { lat: 9.1450, lng: 40.4897 },
    flag: '🇪🇹',
    marketDestinations: ['Germany', 'Saudi Arabia', 'United States', 'Belgium'],
    challenges: ['Climate change impact', 'Price volatility', 'Limited processing capacity'],
    impact: {
      jobs: '4 million farmers supported',
      economicContribution: '30% of export earnings'
    },
    globalRanking1995: 1,
    globalRanking2022: 1,
    initialExports1995: '$400 million',
    initialExports2022: '$1.2 billion',
    successfulProduct: 'specialty coffee beans',
    successStorySummary: 'Ethiopia leveraged its heritage as the birthplace of coffee to develop premium specialty coffee exports.'
  },
  {
    id: '3',
    country: 'Bangladesh',
    sector: 'Pharmaceuticals',
    product: 'Generic Medicines',
    description: 'Bangladesh built a thriving pharmaceutical industry by focusing on generic drug production, achieving WHO-GMP standards, and expanding to international markets.',
    growthRate: 220,
    timeframe: '2005-2020',
    exportValue: '$1.8 billion (2020)',
    keyFactors: [
      'Patent-friendly regulations',
      'Quality standard compliance',
      'R&D investment',
      'Cost-effective manufacturing'
    ],
    coordinates: { lat: 23.6850, lng: 90.3563 },
    flag: '🇧🇩',
    marketDestinations: ['Africa', 'Latin America', 'Southeast Asia', 'Middle East'],
    challenges: ['Regulatory compliance', 'Patent restrictions', 'Competition from India'],
    impact: {
      jobs: '500,000 direct and indirect jobs',
      economicContribution: '1.2% of GDP'
    },
    globalRanking1995: 45,
    globalRanking2022: 8,
    initialExports1995: '$50 million',
    initialExports2022: '$1.8 billion',
    successfulProduct: 'generic medicines',
    successStorySummary: 'Bangladesh built a thriving pharmaceutical industry by focusing on generic drug production and achieving international quality standards.'
  },
  {
    id: '4',
    country: 'Ghana',
    sector: 'Cocoa',
    product: 'Premium Cocoa Beans',
    description: 'Ghana maintained its position as the world\'s second-largest cocoa producer while adding value through quality premiums and sustainable farming practices.',
    growthRate: 95,
    timeframe: '2008-2020',
    exportValue: '$2.1 billion (2020)',
    keyFactors: [
      'Quality premium programs',
      'Sustainable farming certification',
      'Farmer support systems',
      'Processing capacity building'
    ],
    coordinates: { lat: 7.9465, lng: -1.0232 },
    flag: '🇬🇭',
    marketDestinations: ['Netherlands', 'Germany', 'United States', 'Belgium'],
    challenges: ['Climate variability', 'Aging farmer population', 'Price fluctuations'],
    impact: {
      jobs: '800,000 farming families',
      economicContribution: '20% of export revenue'
    },
    globalRanking1995: 2,
    globalRanking2022: 2,
    initialExports1995: '$800 million',
    initialExports2022: '$2.1 billion',
    successfulProduct: 'premium cocoa beans',
    successStorySummary: 'Ghana maintained its position as a leading cocoa producer while adding value through quality premiums and sustainable practices.'
  },
  {
    id: '5',
    country: 'India',
    sector: 'Information Technology',
    product: 'Software Services',
    description: 'India leveraged its English-speaking talent pool and cost advantages to become the world\'s leading IT services exporter, serving global markets.',
    growthRate: 450,
    timeframe: '1995-2020',
    exportValue: '$147 billion (2020)',
    keyFactors: [
      'English proficiency',
      'Technical education',
      'Time zone advantages',
      'Government support policies'
    ],
    coordinates: { lat: 20.5937, lng: 78.9629 },
    flag: '🇮🇳',
    marketDestinations: ['United States', 'United Kingdom', 'Europe', 'Australia'],
    challenges: ['Rising costs', 'Automation threats', 'Visa restrictions'],
    impact: {
      jobs: '4.5 million direct jobs',
      economicContribution: '8% of GDP'
    },
    globalRanking1995: 15,
    globalRanking2022: 1,
    initialExports1995: '$2 billion',
    initialExports2022: '$147 billion',
    successfulProduct: 'software services',
    successStorySummary: 'India leveraged its English-speaking talent pool and cost advantages to become the world\'s leading IT services exporter.'
  },
  {
    id: '6',
    country: 'Rwanda',
    sector: 'Tourism',
    product: 'Eco-Tourism Services',
    description: 'Rwanda transformed its tourism industry by focusing on high-value eco-tourism, gorilla trekking, and positioning itself as a safe, clean destination.',
    growthRate: 320,
    timeframe: '2005-2019',
    exportValue: '$498 million (2019)',
    keyFactors: [
      'Conservation focus',
      'Safety and security',
      'Infrastructure development',
      'Brand positioning'
    ],
    coordinates: { lat: -1.9403, lng: 29.8739 },
    flag: '🇷🇼',
    marketDestinations: ['East Africa', 'Europe', 'North America', 'Asia'],
    challenges: ['COVID-19 impact', 'Limited capacity', 'Regional instability'],
    impact: {
      jobs: '300,000 direct and indirect jobs',
      economicContribution: '14% of GDP'
    },
    globalRanking1995: 50,
    globalRanking2022: 12,
    initialExports1995: '$10 million',
    initialExports2022: '$498 million',
    successfulProduct: 'eco-tourism services',
    successStorySummary: 'Rwanda transformed its tourism industry by focusing on high-value eco-tourism and positioning itself as a safe destination.'
  }
];
