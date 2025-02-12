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
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CoinPage({ data }) {
  const router = useRouter();
  const { id } = router.query;
  // ticker symbol
  const symbol = data?.symbol?.toUpperCase?.();
  // Parse URL for website
  const parsedUrl = parseDomain(data?.links?.homepage?.[0]);
  // Retrieve all categories, get 1st item, then parse rest of items
  const categories = data?.categories;
  const firstCategory = categories?.[0];
  const restOfCategories = categories?.slice?.(1, categories?.length);

  // TODO: WIP for coin ID chart
  // useEffect(() => {
  //   async function getCoinPriceChart() {
  //     try {
  //       const response = await axios.get('/api/price-chart', {
  //         params: {id: data?.id}
  //       });
  //     } catch (error) {
  //       console.log('error fetching price chart: ', error)
  //     }
  //   }
  //   if (id) getCoinPriceChart();
  // }, [id]);

  return (
    <Layout>
      <BreadCrumbItems name={data?.name} />
      <div className={styles?.['coin']}>
        <div className={styles?.['coin_name']}>
          <img src={data?.image?.thumb} alt={data?.symbol} />
          <h1>{data?.name}</h1>
          <span className={styles?.['coin_name_symbol']}>
            {data?.symbol?.toUpperCase?.()} Price
          </span>
          <span className={styles?.['coin_name_rank']}>
            #{data?.market_cap_rank}
          </span>
        </div>
        <div>
          <div className={styles?.['coin_price']}>
            <span className={styles?.['coin_price_amount']}>
              $
              {data?.market_data?.current_price?.usd?.toLocaleString?.('en', {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className={styles?.['coin_price_24h']}>
              <CarrotPriceChange
                price={
                  data?.market_data?.price_change_percentage_24h_in_currency
                    ?.usd
                }
              />
            </span>
          </div>
        </div>
      </div>
      {/** Market Data Rows */}
      <div className={styles?.['table']}>
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
      </div>
      <div className={styles?.['table']}>
        <h3 className={styles?.['table_header']}>Info</h3>
        <div className={styles?.['table_info']}>
          {/** Website */}
          {data?.links?.homepage?.[0] && (
            <FormattedDataRow
              rowName="Website"
              rowValue={
                <Anchor href={`${data?.links?.homepage?.[0]}`} target="_blank">
                  <Pill radius="md" size="lg" className={styles?.['pill-text']}>
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
                  <Anchor
                    href={`${data?.links?.subreddit_url}`}
                    target="_blank"
                  >
                    <Pill
                      radius="md"
                      size="lg"
                      className={styles?.['pill-text']}
                    >
                      Reddit
                    </Pill>
                  </Anchor>
                )}
                {data?.links?.telegram_channel_identifier && (
                  <Anchor
                    href={`https://t.me/${data?.links?.telegram_channel_identifier}`}
                    target="_blank"
                  >
                    <Pill
                      radius="md"
                      size="lg"
                      className={styles?.['pill-text']}
                    >
                      Telegram
                    </Pill>
                  </Anchor>
                )}
                {data?.links?.twitter_screen_name && (
                  <Anchor
                    href={`https://x.com/${data?.links?.twitter_screen_name}`}
                    target="_blank"
                  >
                    <Pill
                      radius="md"
                      size="lg"
                      className={styles?.['pill-text']}
                    >
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
                <Anchor
                  href={`${data?.links?.repo_url?.github?.[0]}`}
                  target="_blank"
                >
                  <Pill radius="md" size="lg" className={styles?.['pill-text']}>
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
                  <div>
                    <Pill radius="md" size="lg">
                      {firstCategory}
                    </Pill>
                  </div>
                  <div className={styles?.['show-more']}>
                    <Popover
                      width={300}
                      position="bottom"
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <Pill
                          radius="md"
                          size="lg"
                          className={styles?.['pill-text']}
                        >
                          <span className={styles?.['show-more__icon']}>
                            Show {restOfCategories?.length}
                            <IconChevronDown stroke={1.5} />
                          </span>
                        </Pill>
                      </Popover.Target>
                      <Popover.Dropdown>
                        {restOfCategories?.map?.((category, idx) => (
                          <p
                            className={styles?.['pill-container-item']}
                            key={idx}
                          >
                            <Pill
                              radius="md"
                              size="lg"
                              className={styles?.['pill-text']}
                            >
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
      {/** Historical price */}
      <div className={styles?.['table']}>
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
            rowName="All-time High"
            rowPrice={data?.market_data?.ath?.usd}
            priceChange={data?.market_data?.ath_change_percentage?.usd}
          />
          {/** ATL */}
          <FormattedDataRow
            rowName="All-time Low"
            rowPrice={data?.market_data?.atl?.usd}
          />
        </div>
      </div>
      {/** About */}
      <div>
        <h3 className={styles?.['table_header']}>
          About {capitalize(data?.id)} ({symbol})
        </h3>
        <div>
          <p
            className={styles?.['description']}
            dangerouslySetInnerHTML={{ __html: data?.description?.en }}
          />
        </div>
      </div>
      <TickersList name={data?.name} symbol={data?.symbol} coinId={data?.id} />
    </Layout>
  );
}

// Fetch data server-side
export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    // get coins data by id
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
        },
      }
    );
    const data = response?.data;
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
