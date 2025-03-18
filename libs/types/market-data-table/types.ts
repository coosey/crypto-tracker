import { SortFieldEnum, SortFieldEnumById } from './enums';

export type SortDirection = 'ASC' | 'DESC';

export type BaseDataType = Record<string, any>;

export type SortFieldById =
  'market_cap_rank' |
  'name' |
  'pair' |
  'price' |
  'spread' |
  'twenty_four_hour_volume' |
  'trust_score';

export type SortField =
  'market_cap_rank' |
  'name' |
  'current_price' |
  'price_change_percentage_1h_in_currency' |
  'price_change_percentage_24h_in_currency' |
  'price_change_percentage_7d_in_currency' |
  'total_volume' |
  'market_cap';

export type THSortFieldType = SortFieldById | SortField;

export type THSortType = SortFieldEnum | SortFieldEnumById;