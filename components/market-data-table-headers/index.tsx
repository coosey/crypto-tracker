import { MarketDataTHProps } from 'lib/types/market-data-table';
import { SortFieldEnum } from 'lib/types/market-data-table/enums';
import { MarketCapHoverCard } from '../market-data-table/market-cap-hovercard';
import { TableHeader } from '../market-data-table/table-header';
import styles from './index.module.scss';

export const MarketDataTableHeaders = ({
  sortField,
  sortDirection,
  handleSortChange,
  dataTableHeaders,
}: MarketDataTHProps) => {
  if (!dataTableHeaders?.length) {
    return null;
  }

  return (
    <>
      {dataTableHeaders?.map?.((header, index) => {
        const uniqueKey = `${header?.fieldEnum}-${header?.sortField}-${index}`;
        if (header?.fieldEnum === SortFieldEnum.MARKET_CAP) {
          return (
            <TableHeader
              key={uniqueKey}
              tableKey={header?.fieldEnum}
              headerText={header?.fieldHeaderText}
              sorted={sortField === header?.fieldEnum}
              sortType={sortDirection}
              sortField={header?.sortField}
              onSort={() => handleSortChange(header?.fieldEnum)}
            >
              <MarketCapHoverCard groupStyle={styles?.['table_info-icon']} />
            </TableHeader>
          );
        }
        return (
          <TableHeader
            key={uniqueKey}
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
  );
};
