import { ReactNode } from "react";
import { SortDirection, THSortFieldType, THSortType } from "./types";

export interface ThProps<T = string> {
  tableKey: THSortType;
  headerText: string;
  sortField: T;
  sorted: boolean;
  sortType?: SortDirection;
  onSort?: (field: T) => void;
  children?: ReactNode;
  className?: string;
};

export interface DataTHProps {
  fieldHeaderText: string;
  fieldEnum?: THSortType;
  sortField?: THSortFieldType;
};

export interface MarketDataTableProps {
  data: TableData[];
};

export interface TableData {
  id: string | null;
  name: string | null;
  symbol?: string | null;
  image?: string | null;
  current_price?: number | null;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  total_volume?: number | null;
  market_cap?: number | null;
  market_cap_rank?: number | null;
}

export interface MarketDataTHProps {
  sortField: THSortFieldType;
  sortDirection: SortDirection;
  handleSortChange: (sortType: THSortFieldType) => void;
  dataTableHeaders: DataTHProps[];
};

export interface MARKET_LIST_HEADER_CONFIG {
  headerText: string,
  sorted: boolean,
  sortType: SortDirection,
};