import { Card, Group } from '@mantine/core';
import cn from 'classnames';
import styles from './index.module.scss';
import { IconChevronRight } from '@tabler/icons-react';

interface TrendingCardChildren {
  list: React.ReactNode;
};

interface Props {
  className?: string;
  renderTitleLink?: boolean;
  children?: TrendingCardChildren;
}

const renderTitleLinkComponent = () => {
  return (
    <Group justify="space-between" mt="md" mb="xs">
      <h3>Trending Coins</h3>
      <span>
        <a className={styles?.['card-component-anchor']} href="/trending">
          View more
          <IconChevronRight />
        </a>
      </span>
    </Group>
  );
};

export const TrendingCard = ({
  className, 
  renderTitleLink,
  children
}: Props) => {
  return (
    <Card
      className={cn(styles?.['card-component'], className)}
      withBorder
      shadow="lg"
      radius="md"
    >
      <Card.Section>
        {renderTitleLink && renderTitleLinkComponent()}
      </Card.Section>
      <>{children?.list}</>
    </Card>
  );
};
