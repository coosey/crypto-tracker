import { Center, Group, Table, Text, UnstyledButton } from '@mantine/core';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import { ThProps } from 'libs/types/market-data-table';
import styles from './index.module.scss';

export const TableHeader = ({
  tableKey,
  headerText,
  sortField,
  sorted,
  sortType,
  onSort,
  children,
  className,
}: ThProps) => {
  const Icon = sortType === 'ASC' ? IconCaretUpFilled : IconCaretDownFilled;
  return (
    <Table.Th className={className} key={tableKey}>
      <UnstyledButton onClick={() => onSort(sortField)}>
        <Group>
          <Center className={styles?.['header_group']}>
            {sorted && <Icon className={styles?.['header_icon']} stroke={1} />}
            <Text className={styles?.['header_text']} fz="h5">
              {headerText}
            </Text>
            {children}
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
};
