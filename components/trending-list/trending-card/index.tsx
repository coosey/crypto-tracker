import { Card, Group } from "@mantine/core";
import { TrendingCardItem } from "../trending-card-item";
import styles from './index.module.scss';
import { TrendingCoinsResponse } from "libs/types/trending-list";
import { IconChevronRight } from '@tabler/icons-react';
import { TrendingCardSkeleton } from "../trending-card-skeleton";
import { formatNumberWithSubscriptZeros } from "libs/helpers/format-numbers-with-subscript";

export interface TrendingCardProps {
  trendingCoins: TrendingCoinsResponse[];
  isLoading: boolean;
};

export const TrendingCard = ({trendingCoins, isLoading}: TrendingCardProps) => {
  return (
    <Card
      className={styles?.["card-component"]}
      withBorder
      shadow="lg"
      radius="md"
    >
      <Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <h3>Trending Coins</h3>
          <span>
            <a className={styles?.["card-component-anchor"]} href="/trending">
              View more
              <IconChevronRight />
            </a>
          </span>
        </Group>
      </Card.Section>
      <TrendingCardSkeleton isLoading={isLoading} />
      {!isLoading && trendingCoins?.map?.((coin) => {
        const item = coin?.item;
        return (
          <TrendingCardItem
            key={item?.coin_id}
            name={item?.name}
            imgAlt={item?.name}
            imgSrc={item?.thumb}
            marketPrice={Number(formatNumberWithSubscriptZeros(item?.data?.price?.toString?.()))}
            percentageChange={item?.data?.price_change_percentage_24h?.usd}
          />
        )
      })}
    </Card>
  )
};