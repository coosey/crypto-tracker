import { Table } from '@mantine/core';
import cn from 'classnames';
import styles from './index.module.scss';
import React from 'react';

interface DataTableChildren {
  header: React.ReactNode;
  body: React.ReactNode;
}

interface Props {
  children: DataTableChildren;
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
}: Props) => {
  return (
    <Table.ScrollContainer minWidth={minWidth} type="native">
      <Table
        verticalSpacing={verticalSpacing}
        highlightOnHover={highlightOnHover}
        className={cn(styles?.['table'], className)}
      >
        <Table.Thead>
          <Table.Tr>{children.header}</Table.Tr>
        </Table.Thead>
        <Table.Tbody>{children.body}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
