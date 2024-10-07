import {
  SortFieldEnum,
  SortField,
  DataTableHeadersProps,
} from 'libs/types/market-data-table';

export const DataTableHeaders: DataTableHeadersProps[] = [
  {
    fieldHeaderText: '',
  },
  {
    fieldHeaderText: '#',
    fieldEnum: SortFieldEnum.MARKET_CAP_RANK,
    sortField: 'market_cap_rank' as SortField,
  },
  {
    fieldHeaderText: 'Name',
    fieldEnum: SortFieldEnum.NAME,
    sortField: 'name' as SortField,
  },
  {
    fieldHeaderText: 'Price',
    fieldEnum: SortFieldEnum.CURRENT_PRICE,
    sortField: 'current_price' as SortField,
  },
  {
    fieldHeaderText: '1h',
    fieldEnum: SortFieldEnum.PRICE_CHANGE_PERCENTAGE_1H_IN_CURRENCY,
    sortField: 'price_change_percentage_1h_in_currency' as SortField,
  },
  {
    fieldHeaderText: '24h',
    fieldEnum: SortFieldEnum.PRICE_CHANGE_PERCENTAGE_24H_IN_CURRENCY,
    sortField: 'price_change_percentage_24h_in_currency' as SortField,
  },
  {
    fieldHeaderText: '7d',
    fieldEnum: SortFieldEnum.PRICE_CHANGE_PERCENTAGE_7D_IN_CURRENCY,
    sortField: 'price_change_percentage_7d_in_currency' as SortField,
  },
  {
    fieldHeaderText: '24h Volume',
    fieldEnum: SortFieldEnum.TOTAL_VOLUME,
    sortField: 'total_volume' as SortField,
  },
  {
    fieldHeaderText: 'Market Cap',
    fieldEnum: SortFieldEnum.MARKET_CAP,
    sortField: 'market_cap' as SortField,
  },
];
