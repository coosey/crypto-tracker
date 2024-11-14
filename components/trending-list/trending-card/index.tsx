import { Card, Group } from "@mantine/core";
import { TrendingCardItem } from "../trending-card-item";
import styles from './index.module.scss';
import { TrendingCoinsResponse } from "libs/types/trending-list";
import { IconChevronRight } from '@tabler/icons-react';
import { TrendingCardSkeleton } from "../trending-card-skeleton";

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
            name={item?.name}
            imgAlt={item?.name}
            imgSrc={item?.thumb}
            price={item?.data?.price}
            percentage={formatNumberWithSubscriptZeros(item.data.price.toString())}
          />
        )
      })}
    </Card>
  )
};

/**
 * CREDITS TO @HAQQ
 * GITHUB REPO: https://github.com/haqq-network/format-number-with-subscript-zeros/blob/master/src/formatNumberWithSubscriptZeros.ts
 */
export function formatNumberWithSubscriptZeros(numberStr: string, presiction = 3, min = 0.00001): string {
  const number = parseFloat(numberStr);
  if (number >= min) {
      const [part0, part1] = numberStr.split('.')
      if(part1) {
          const leadingZeros = part1?.match?.(/^0+/)?.[0] || '';
          return `${part0}.${leadingZeros}${part1.replace(leadingZeros, '').slice(0, presiction)}`
      }
      return part1 ? [part0, part1.slice(0, presiction)].join('.') : part0;
  }

  const leadingZerosMatch = numberStr.match(/^0\.(0+)/);
  if (!leadingZerosMatch) return numberStr;

  const leadingZerosCount = leadingZerosMatch[1].length;
  const remainingDigits = numberStr.slice(leadingZerosMatch[0].length);

  const smallCount = String(leadingZerosCount).split('').map(digit => String.fromCharCode(8320 + parseInt(digit))).join('');

  return `0.0${smallCount}${remainingDigits.slice(0, presiction)}`;
};