import axios from 'axios';
import { Layout } from 'components/layout';
import styles from './[id].module.scss';
import { CarrotPriceChange } from 'components/carrot-price-change';
import { Anchor, Pill, Popover } from '@mantine/core';
import { FormattedDataRow } from 'components/formatted-data-row';
import { parseDomain } from 'libs/helpers/parseDomain';
import { capitalize } from 'lodash';
import { IconChevronDown } from '@tabler/icons-react';
import { TickersList } from 'components/coin-id-components';
import { BreadCrumbItems } from 'components/coin-id-components/breadcrumb-items';
import { STATISTIC_INFO } from 'components/coin-id-components/statistics-info';
import { useEffect, useState } from 'react';
import { CoinIdNews } from 'components/coin-id-components/news';
import { TradingViewChart } from '@/components/trading-view-chart';
import { PriceChart } from '@/libs/types/price-chart';
import { TrendingCoins } from '@/components/coin-id-components/trending-coins';
import { CoinDataResponse } from '@/libs/types/coin-id';

interface Props {
  data: CoinDataResponse;
}

export default function CoinPage({ data }: Props) {
  const [priceChart, setPriceChart] = useState<PriceChart>();
  const { firstCategory, restOfCategories } = retrieveCategories(data);
  // ticker symbol
  const symbol = data?.symbol?.toUpperCase?.();
  // Parse URL for website
  const parsedUrl = parseDomain(data?.links?.homepage?.[0]);

  async function getCoinPriceChart() {
    try {
      const response = await axios.get('/api/price-chart', {
        params: { id: data?.id },
      });
      setPriceChart(response?.data || {});
    } catch (error) {
      console.log('error fetching price chart: ', error);
    }
  };

  useEffect(() => {
    getCoinPriceChart();
  }, [data?.id]);

  return (
    <Layout className={styles?.['coinPage']}>
      <BreadCrumbItems name={data?.name} />
      <div className={styles?.['coin']}>
        {/** Coin[id] Details */}
        <div className={styles?.['coin_name']}>
          <img src={data?.image?.thumb} alt={data?.symbol} width={25} height={25} />
          <h1>{data?.name}</h1>
          <span className={styles?.['coin_name_symbol']}>{symbol} Price</span>
          <span className={styles?.['coin_name_rank']}>#{data?.market_cap_rank}</span>
        </div>
        {/** Coin[id] Price Details */}
        <div className={styles?.['coin_price']}>
          <span className={styles?.['coin_price_amount']}>
            $
            {data?.market_data?.current_price?.usd?.toLocaleString?.('en', {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className={styles?.['coin_price_24h']}>
            <CarrotPriceChange
              value={data?.market_data?.price_change_percentage_24h_in_currency?.usd}
            />
          </span>
        </div>
      </div>
      {/** Left-hand side of coin[id] page, contains: statistics, info, & historical prices */}
      <div className={styles?.['chartDetails']}>
        <div className={styles?.['chartDetails__data']}>
          {/** Info */}
          <div className={styles?.['table']}>
            <h3 className={styles?.['table_header']}>Info</h3>
            <div className={styles?.['table_info']}>
              {/** Website */}
              {data?.links?.homepage?.[0] && (
                <FormattedDataRow
                  rowName="Website"
                  rowValue={
                    <Anchor href={`${data?.links?.homepage?.[0]}`} target="_blank">
                      <Pill radius="md" className={styles?.['pill-text']}>
                        {parsedUrl}
                      </Pill>
                    </Anchor>
                  }
                />
              )}
              {/** Communities */}
              <FormattedDataRow
                rowName="Communities"
                rowValue={
                  <span className={styles?.['pill-container']}>
                    {data?.links?.subreddit_url && (
                      <Anchor href={`${data?.links?.subreddit_url}`} target="_blank">
                        <Pill radius="md" className={styles?.['pill-text']}>
                          Reddit
                        </Pill>
                      </Anchor>
                    )}
                    {data?.links?.telegram_channel_identifier && (
                      <Anchor
                        href={`https://t.me/${data?.links?.telegram_channel_identifier}`}
                        target="_blank"
                      >
                        <Pill radius="md" className={styles?.['pill-text']}>
                          Telegram
                        </Pill>
                      </Anchor>
                    )}
                    {data?.links?.twitter_screen_name && (
                      <Anchor
                        href={`https://x.com/${data?.links?.twitter_screen_name}`}
                        target="_blank"
                      >
                        <Pill radius="md" className={styles?.['pill-text']}>
                          Twitter
                        </Pill>
                      </Anchor>
                    )}
                  </span>
                }
              />
              {/** Source Code */}
              {data?.links?.repos_url?.github?.[0] && (
                <FormattedDataRow
                  rowName="Source Code"
                  rowValue={
                    <Anchor href={`${data?.links?.repos_url?.github?.[0]}`} target="_blank">
                      <Pill radius="md" className={styles?.['pill-text']}>
                        GitHub
                      </Pill>
                    </Anchor>
                  }
                />
              )}
              {/** Categories */}
              {data?.categories && (
                <FormattedDataRow
                  rowName="Categories"
                  rowValue={
                    <span className={styles?.['pill-container']}>
                      <Pill radius="md" className={styles?.['pill-text']}>
                        {firstCategory}
                      </Pill>
                      <div className={styles?.['show-more']}>
                        <Popover width={300} position="bottom" withArrow shadow="md">
                          <Popover.Target>
                            <Pill radius="md" className={styles?.['pill-text']}>
                              <span className={styles?.['show-more__icon']}>
                                Show {restOfCategories?.length}
                                <IconChevronDown stroke={1.5} />
                              </span>
                            </Pill>
                          </Popover.Target>
                          <Popover.Dropdown>
                            {restOfCategories?.map?.((category, idx) => (
                              <p className={styles?.['pill-container-item']} key={idx}>
                                <Pill radius="md" className={styles?.['pill-text']}>
                                  {category}
                                </Pill>
                              </p>
                            ))}
                          </Popover.Dropdown>
                        </Popover>
                      </div>
                    </span>
                  }
                />
              )}
            </div>
          </div>
          {/** Market Data Rows */}
          <h2 className={styles?.['table_header']}>{data?.name} Statistics</h2>
          <FormattedDataRow
            rowName="Market Cap"
            rowPrice={data?.market_data?.market_cap?.usd}
            hoverCard
            hoverCardName={STATISTIC_INFO.market_cap_name}
            hoverCardDescription={STATISTIC_INFO.market_cap_description}
          />
          <FormattedDataRow
            rowName="Volume"
            rowPrice={data?.market_data?.total_volume?.usd}
            hoverCard
            hoverCardName={STATISTIC_INFO.volume}
          />
          <FormattedDataRow
            rowName="Fully Diluted Valuation"
            rowPrice={data?.market_data?.fully_diluted_valuation?.usd}
            hoverCard
            hoverCardName={STATISTIC_INFO.fdv_name}
            hoverCardDescription={STATISTIC_INFO.fdv_desc}
          />
          <FormattedDataRow
            rowName="Circulating Supply"
            rowPrice={data?.market_data?.circulating_supply}
            hoverCard
            hoverCardName={STATISTIC_INFO.circulating_supply}
          />
          <FormattedDataRow
            rowName="Total Supply"
            rowPrice={data?.market_data?.total_supply}
            hoverCard
            hoverCardName={STATISTIC_INFO.total_supply_desc}
            hoverCardDescription={STATISTIC_INFO.total_supply_name}
          />
          <FormattedDataRow
            rowName="Max Supply"
            rowValue={'∞'}
            hoverCard
            hoverCardName={STATISTIC_INFO.max_supply_desc}
            hoverCardDescription={STATISTIC_INFO.max_supply_name}
          />
          <h2 className={styles?.['table_header']}>{symbol} Historical Price</h2>
          <div className={styles?.['table']}>
            {/** 24H range */}
            <FormattedDataRow
              rowName="24H Range"
              priceDiff24Low={data?.market_data?.low_24h?.usd}
              priceDiff24High={data?.market_data?.high_24h?.usd}
            />
            {/** 7D range */}
            {/* <FormattedDataRow rowName="7D Range" priceDiff7Low={data?.market_data?.low_7h?.usd} priceDiff7High={data?.market_data?.high_7h?.usd} /> */}
            {/** ATH */}
            <FormattedDataRow
              rowName="All-Time High"
              rowPrice={data?.market_data?.ath?.usd}
              priceChange={data?.market_data?.ath_change_percentage?.usd}
            />
            {/** ATL */}
            <FormattedDataRow
              rowName="All-Time Low"
              rowPrice={data?.market_data?.atl?.usd}
              priceChange={data?.market_data?.atl_change_percentage?.usd}
            />
          </div>
        </div>
        {/** Right-hand side of coin[id] page, contains: about section & chart details */}
        <div className={styles?.['chartDetails__about']}>
          {/** About */}
          <h3 className={styles?.['table_header']}>
            About {capitalize(data?.id)} ({symbol})
          </h3>
          <p
            className={styles?.['description']}
            dangerouslySetInnerHTML={{ __html: data?.description?.en }}
          />
          {priceChart?.prices && (
            <div className={styles?.['chart']}>
              <TradingViewChart
                prices={priceChart?.prices}
                total_volumes={priceChart?.total_volumes}
              />
            </div>
          )}
        </div>
      </div>
      {/** Related Market List */}
      <div className={styles?.['table_tickersList']}>
        <TickersList name={data?.name} symbol={data?.symbol} coinId={data?.id} />
      </div>
      {/** News List */}
      <div className={styles?.['table_news']}>
        <CoinIdNews id={data?.id} symbol={symbol} />
      </div>
      {/** Trending Coins List */}
      <div>
        <h2 className={styles?.['trendingCoinHeader']}>Trending Coins</h2>
        <TrendingCoins />
      </div>
    </Layout>
  );
}

/**
 * Helper to parse CoinDataResponse categories
 * @param response CoinDataResponse
 * @returns 1st category and the rest of the categories
 */
function retrieveCategories(response: CoinDataResponse) {
  const categories = response?.categories;
  const firstCategory = categories?.[0];
  const restOfCategories = categories?.slice?.(1, categories?.length);
  return { firstCategory, restOfCategories };
}

// Fetch data server-side
export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    // get coin's data by id
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      headers: {
        'content-type': 'application/json',
        'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
      },
    });
    const data: CoinDataResponse = await response.json();
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    return {
      data: [],
    };
  }
}
