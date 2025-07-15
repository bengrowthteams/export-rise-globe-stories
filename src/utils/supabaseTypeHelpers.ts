
import { Database } from '@/integrations/supabase/types';

export type CountryDataRow = Database['public']['Tables']['Country Data']['Row'];

export function mapCountryDataRow(row: any): any {
  return {
    id: row['Primary key'],
    country: row['Country'],
    sector: row['Sector'],
    successfulProduct: row['Successful product'],
    successStorySummary: row['Success Story (1 sentence summary)'],
    outcome: row['Outcome'],
    rank1995: row['Rank (1995)'],
    rank2022: row['Rank (2022)'],
    ranksChange: row['Ranks Change (absolute)'],
    initialExports1995: row['Initial Exports - 1995 (USD)'],
    currentExports2022: row['Current Exports - 2022 (USD)'],
    globalShare1995: row['Global Share 1995 - %'],
    globalShare2022: row['Global Share 2022 - %'],
    publicSectorActor: row['Public Sector Actor'],
    publicSectorPolicy: row['Public Sector Policy'],
    publicSectorSummary: row['Public Sector - One Bullet Summary'],
    privateSectorPioneeringFirm: row['Private Sector Pioneering Firm'],
    privateSectorGrowth: row['Private Sector Industry Growth'],
    privateSectorSummary: row['Private Sector - One Bullet Summary'],
    externalMarketFactors: row['External Market Factors'],
    externalActorContribution: row['External Actor Contribution'],
    externalFactorsSummary: row['External Factors - One Bullet Summary'],
    sources: row['Sources']
  };
}
