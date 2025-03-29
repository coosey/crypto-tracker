import { Card } from '@mantine/core';
import cn from 'classnames';
import styles from './index.module.scss';
import React from 'react';

interface TrendingCardChildren {
  titleLink?: React.ReactNode;
  body?: React.ReactNode;
}

interface Props {
  className?: string;
  children?: TrendingCardChildren;
  onClick?: () => void;
}

export const TrendingCard = React.memo(({ className, children, onClick }: Props) => {
  return (
    <Card
      className={cn(styles?.['card-component'], className)}
      withBorder
      shadow="lg"
      radius="md"
      onClick={onClick}
    >
      <>{children?.titleLink}</>
      <>{children?.body}</>
    </Card>
  );
});
