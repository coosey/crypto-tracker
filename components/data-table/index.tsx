import { Table } from '@mantine/core';
import cn from 'classnames';
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  dataTableChildren: React.ReactNode;
  verticalSpacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  highlightOnHover?: boolean;
  className?: string;
  minWidth?: number;
}

export const DataTable = ({
  children,
  verticalSpacing = 'sm',
  highlightOnHover = false,
  className,
  minWidth = 700,
  dataTableChildren,
}: Props) => {
  return (
    <Table.ScrollContainer minWidth={minWidth} type="native">
      <Table
        verticalSpacing={verticalSpacing}
        highlightOnHover={highlightOnHover}
        className={cn(styles?.['table'], className)}
      >
        <Table.Thead>
          <Table.Tr>{children}</Table.Tr>
        </Table.Thead>
        <Table.Tbody>{dataTableChildren}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
