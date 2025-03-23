<<<<<<< HEAD
import { Card } from '@mantine/core';
import cn from 'classnames';
import styles from './index.module.scss';
import React from 'react';

interface TrendingCardChildren {
  titleLink?: React.ReactNode;
  list?: React.ReactNode;
=======
import { Card, Group } from '@mantine/core';
import cn from 'classnames';
import styles from './index.module.scss';
import { IconChevronRight } from '@tabler/icons-react';

interface TrendingCardChildren {
  list: React.ReactNode;
>>>>>>> 5561e03 (added trending coins list on coin[id] page + styling)
};

interface Props {
  className?: string;
<<<<<<< HEAD
  children?: TrendingCardChildren;
  onClick?: () => void;
};

export const TrendingCard = React.memo(({
  className,
  children,
  onClick,
=======
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
>>>>>>> 5561e03 (added trending coins list on coin[id] page + styling)
}: Props) => {
  return (
    <Card
      className={cn(styles?.['card-component'], className)}
      withBorder
      shadow="lg"
      radius="md"
<<<<<<< HEAD
      onClick={onClick}
    >
      <Card.Section>
        {children?.titleLink }
=======
    >
      <Card.Section>
        {renderTitleLink && renderTitleLinkComponent()}
>>>>>>> 5561e03 (added trending coins list on coin[id] page + styling)
      </Card.Section>
      <>{children?.list}</>
    </Card>
  );
<<<<<<< HEAD
});
=======
};
>>>>>>> 5561e03 (added trending coins list on coin[id] page + styling)
