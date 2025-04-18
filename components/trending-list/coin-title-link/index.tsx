import { Group, Card } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  title: string;
  hasViewMore?: boolean;
}

export const TrendingCoinTitleLink = ({ title, hasViewMore = false }: Props) => {
  const router = useRouter();
  return (
    <Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <h3>{title}</h3>
        {hasViewMore && (
          <Link href="/trending" passHref className={styles?.['cardAnchor']}>
            View more
            <IconChevronRight />
          </Link>
        )}
      </Group>
    </Card.Section>
  );
};
