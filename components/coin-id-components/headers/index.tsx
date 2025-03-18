import { DataTHProps } from '@libs/types/market-data-table';
import { SortFieldEnumById } from '@libs/types/market-data-table/enums';
import { SortFieldById } from '@libs/types/market-data-table/types';

export const CoinIdTableHeaders: DataTHProps[] = [
  {
    fieldHeaderText: '#',
    fieldEnum: SortFieldEnumById.MARKET_CAP_RANK,
    sortField: 'market_cap_rank' as SortFieldById,
  },
  {
    fieldHeaderText: 'Name',
    fieldEnum: SortFieldEnumById.NAME,
    sortField: 'name' as SortFieldById,
  },
  {
    fieldHeaderText: 'Pair',
    fieldEnum: SortFieldEnumById.PAIR,
    sortField: 'pair' as SortFieldById,
  },
  {
    fieldHeaderText: 'Price',
    fieldEnum: SortFieldEnumById.PRICE,
    sortField: 'price' as SortFieldById,
  },
  {
    fieldHeaderText: 'Spread',
    fieldEnum: SortFieldEnumById.SPREAD,
    sortField: 'spread' as SortFieldById,
  },
  {
    fieldHeaderText: '24H Volume',
    fieldEnum: SortFieldEnumById.TWENTY_FOUR_HOUR_VOLUME,
    sortField: 'twenty_four_hour_volume' as SortFieldById,
  },
  {
    fieldHeaderText: 'Trust Score',
    fieldEnum: SortFieldEnumById.TRUST_SCORE,
    sortField: 'trust_score' as SortFieldById,
  },
];
