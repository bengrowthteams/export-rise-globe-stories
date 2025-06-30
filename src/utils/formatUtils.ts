
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toLocaleString()}`;
};

export const calculateGrowthRate = (initial: number, current: number): number => {
  if (initial <= 0) return 0;
  return Math.round(((current - initial) / initial) * 100);
};

export const generateSuccessStorySummary = (country: string, sector: string, product: string, growthRate: number): string => {
  const templates = [
    `${country} achieved remarkable transformation in ${sector} through strategic development of ${product}, driving ${growthRate > 0 ? 'significant export growth' : 'structural economic changes'} and creating new opportunities in global markets.`,
    `Through focused investment in ${sector}, ${country} successfully developed ${product} exports, demonstrating how targeted industrial policy can drive economic transformation and global competitiveness.`,
    `${country}'s success in ${sector} showcases the power of specialization in ${product}, creating a compelling example of export-led growth and economic diversification.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};
