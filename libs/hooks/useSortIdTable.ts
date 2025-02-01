import { sortNumeric, sortLocalCompare, sortTrustScore } from "libs/helpers/sort-id-helpers";
import { SortDirection, BaseDataType, SortFieldById } from "libs/types/market-data-table/types";
import { useState } from "react";

export const useSortIdTable = <T>(data: T[]) => {
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(
    'ASC'
  );
  const [sortField, setSortField] = useState<SortFieldById | null>(
    'market_cap_rank'
  );

  const handleSortChange = (sortType: SortFieldById) => {
    if (sortField !== sortType) {
      setSortField(sortType);
      setSortDirection('ASC');
    } else {
      setSortField(sortType);
      setSortDirection((prevDirection) => (prevDirection === 'ASC' ? 'DESC' : 'ASC'));
    }
    handleSortData(data, sortField, sortDirection);
  };

  const handleSortData = <T extends BaseDataType>(
    dataList: T[],
    field: SortFieldById,
    direction: SortDirection
  ) => {
    if (!dataList?.length) return [];

    const dataClone = [...dataList];

    return dataClone?.sort?.((a, b) => {
      switch (field) {
        case 'market_cap_rank':
          return sortNumeric(direction, a?.market_cap_rank, b?.market_cap_rank);
        case 'name':
          return sortLocalCompare(direction, a?.market?.name, b?.market?.name);
        case 'pair':
          return sortLocalCompare(direction, a?.target, b?.target);
        case 'trust_score':
          return sortTrustScore(direction, a?.trust_score, b?.trust_score);
        case 'price':
          return sortNumeric(direction, a?.converted_last?.usd, b?.converted_last?.usd);
        case 'spread':
          return sortNumeric(direction, a?.bid_ask_spread_percentage, b?.bid_ask_spread_percentage);
        case 'twenty_four_hour_volume':
          return sortNumeric(direction, a?.converted_volume?.usd, b?.converted_volume?.usd);
      };
    });
  };

  const sortedData = handleSortData(data, sortField, sortDirection);

  return {
    sortField,
    sortDirection,
    handleSortChange,
    sortedData
  }
}