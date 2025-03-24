import { Group } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import styles from './index.module.scss';

interface Props {
  title: string;
}

export const TrendingCoinTitleLink = ({ title }: Props) => {
  return (
    <Group justify="space-between" mt="md" mb="xs">
      <h3>{title}</h3>
      <span>
        <a className={styles?.['cardAnchor']} href="/trending">
          View more
          <IconChevronRight />
        </a>
      </span>
    </Group>
  );
};
