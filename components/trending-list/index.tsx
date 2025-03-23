import { Flex } from '@mantine/core';
import { TrendingCard } from './card';
import { TrendingCardList } from './card-list';
import { TrendingCardTitleLink } from './title-link';
import styles from './index.module.scss';

export const TrendingList = () => {
  return (
    <Flex direction="row" className={styles?.['trendingList']}>
      <TrendingCard>
        {{
          titleLink: <TrendingCardTitleLink />,
          list: <TrendingCardList limit={3} />,
        }}
      </TrendingCard>
    </Flex>
  );
};
