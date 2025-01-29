import { ReactNode } from "react";
import { CoinsListResponse } from "../coins-list";
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
  data: CoinsListResponse[];
};

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