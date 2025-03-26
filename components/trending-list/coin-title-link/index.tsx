import { Group } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import styles from './index.module.scss';

interface Props {
  title: string;
  hasViewMore?: boolean;
}

export const TrendingCoinTitleLink = ({ title, hasViewMore = false }: Props) => {
  return (
    <Group justify="space-between" mt="md" mb="xs">
      <h3>{title}</h3>
      {hasViewMore && (
        <span>
          <a className={styles?.['cardAnchor']} href="/trending">
            View more
            <IconChevronRight />
          </a>
        </span>
      )}
    </Group>
  );
};
