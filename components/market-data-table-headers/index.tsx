import { MarketDataTHProps, SortFieldEnum } from "libs/types/market-data-table";
import { MarketCapHoverCard } from "../market-data-table/market-cap-hovercard";
import { TableHeader } from "../market-data-table/table-header";
import styles from './index.module.scss';

export const MarketDataTableHeaders = ({
  sortField,
  sortDirection,
  handleSortChange,
  dataTableHeaders,
}: MarketDataTHProps) => {
  return (
    <>
      {dataTableHeaders?.map?.((header) => 
        header?.fieldEnum === SortFieldEnum.MARKET_CAP ? (
          <TableHeader
              key={header?.fieldEnum}
              tableKey={header?.fieldEnum}
              headerText={header?.fieldHeaderText}
              sorted={sortField === header?.fieldEnum}
              sortType={sortDirection}
              sortField={header?.sortField}
              onSort={() => handleSortChange(header?.fieldEnum)}
            >
              <MarketCapHoverCard
                groupStyle={styles?.['table_info-icon']}
              />
            </TableHeader>
        ): (
            <TableHeader
              key={header?.fieldEnum}
              tableKey={header?.fieldEnum}
              headerText={header?.fieldHeaderText}
              sorted={sortField === header?.fieldEnum}
              sortType={sortDirection}
              sortField={header?.sortField}
              onSort={() => handleSortChange(header?.sortField)}
            />
        )
      )}
    </>
  )
}