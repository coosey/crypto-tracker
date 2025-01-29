import { CoinsListResponse } from "libs/types/coins-list";
import { SortDirection, SortField } from "libs/types/market-data-table/types";
import { useState } from "react";

export const useSortTable = (data: CoinsListResponse[]) => {
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(
    'ASC'
  );
  const [sortField, setSortField] = useState<SortField | null>(
    'market_cap_rank'
  );

  const handleSortChange = (sortType: SortField) => {
    if (sortField !== sortType) {
      setSortField(sortType);
      setSortDirection('ASC');
    } else {
      setSortField(sortType);
      setSortDirection((prevDirection) => (prevDirection === 'ASC' ? 'DESC' : 'ASC'));
    }
    handleSortData(data, sortField, sortDirection);
  };


  const handleSortData = (
    dataList: CoinsListResponse[],
    field: SortField,
    direction: SortDirection
  ) => {
    if (!dataList?.length) return [];

    const dataClone = [...dataList];

    switch (field) {
      case 'market_cap_rank': {
        return dataClone?.sort?.((a, b) =>
          direction === 'ASC' ? a?.[field] - b?.[field] : b?.[field] - a?.[field]
        );
      }
      case 'current_price':
      case 'price_change_percentage_1h_in_currency':
      case 'price_change_percentage_24h_in_currency':
      case 'price_change_percentage_7d_in_currency':
      case 'total_volume':
      case 'market_cap': {
        return dataClone?.sort?.((a, b) =>
          direction === 'ASC' ? b?.[field] - a?.[field] : a?.[field] - b?.[field]
        );
      }
      case 'name': {
        return dataClone?.sort?.((a, b) =>
          direction === 'ASC'
            ? a?.[field].localeCompare(b?.[field])
            : b?.[field].localeCompare(a?.[field])
        );
      }
    }
  };

  const sortedData = handleSortData(data, sortField, sortDirection);

  return {
    sortField,
    sortDirection,
    handleSortChange,
    sortedData
  }
}