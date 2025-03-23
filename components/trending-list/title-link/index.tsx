import { Group } from "@mantine/core";
import { IconChevronRight } from '@tabler/icons-react';
import styles from './index.module.scss';

export const TrendingCardTitleLink = () => {
  return (
    <Group justify="space-between" mt="md" mb="xs">
      <h3>Trending Coins</h3>
      <span>
        <a className={styles?.['cardAnchor']} href="/trending">
          View more
          <IconChevronRight />
        </a>
      </span>
    </Group>
  )
}