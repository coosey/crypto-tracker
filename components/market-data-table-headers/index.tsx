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
      {dataTableHeaders?.map?.((header) => {
        if (header.fieldEnum === SortFieldEnum.MARKET_CAP) {
          return (
            <TableHeader
              tableKey={header?.fieldEnum}
              headerText={header?.fieldHeaderText}
              sorted={sortField === header?.fieldEnum}
              sortType={sortDirection}
              sortField={header?.sortField}
              onSort={() => handleSortChange(header?.fieldEnum)}
            >
              <MarketCapHoverCard
                infoStyle={styles?.['table_info-group']}
                groupStyle={styles?.['table_info-icon']}
              />
            </TableHeader>
          );
        }
        return (
          <TableHeader
            tableKey={header?.fieldEnum}
            headerText={header?.fieldHeaderText}
            sorted={sortField === header?.fieldEnum}
            sortType={sortDirection}
            sortField={header?.sortField}
            onSort={() => handleSortChange(header?.sortField)}
          />
        );
      })}
    </>
  )
}