import { ReactNode } from "react";
import { CoinsListResponse } from "../coins-list";

export type SortDirection = 'ASC' | 'DESC';

export enum SortFieldEnum {
  MARKET_CAP_RANK = 'market_cap_rank',
  NAME = 'name',
  CURRENT_PRICE = 'current_price',
  PRICE_CHANGE_PERCENTAGE_1H_IN_CURRENCY = 'price_change_percentage_1h_in_currency',
  PRICE_CHANGE_PERCENTAGE_24H_IN_CURRENCY = 'price_change_percentage_24h_in_currency', 
  PRICE_CHANGE_PERCENTAGE_7D_IN_CURRENCY = 'price_change_percentage_7d_in_currency', 
  TOTAL_VOLUME = 'total_volume',
  MARKET_CAP = 'market_cap'
};

export type SortField =
  'market_cap_rank' |
  'name' |
  'current_price' |
  'price_change_percentage_1h_in_currency' |
  'price_change_percentage_24h_in_currency' |
  'price_change_percentage_7d_in_currency' |
  'total_volume' |
  'market_cap';

export interface MARKET_LIST_HEADER_CONFIG {
  headerText: string,
  sorted: boolean,
  sortType: SortDirection,
};

export interface ThProps {
  headerText: string;
  sortField: SortField;
  sorted: boolean;
  sortType?: SortDirection;
  onSort?: (field: SortField) => void;
  children?: ReactNode;
  className?: string;
};

export interface DataTableHeadersProps {
  fieldHeaderText: string;
  fieldEnum: SortFieldEnum;
  sortField: SortField;
};

export interface MarketDataTableProps {
  data: CoinsListResponse[];
};