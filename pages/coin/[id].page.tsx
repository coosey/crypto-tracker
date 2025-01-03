import axios from "axios";
import { Layout } from "components/layout";
import { useRouter } from "next/router";
import styles from './[id].module.scss';
import { CarrotPriceChange } from "components/carrot-price-change";
import { Anchor, Breadcrumbs, Pill, Popover } from "@mantine/core";
import { FormattedDataRow } from "components/formatted-data-row";
import { parseDomain } from "libs/helpers/parseDomain";
import { capitalize } from 'lodash';
import { IconChevronDown } from '@tabler/icons-react';

export default function CoinPage({ data }) {
  // const router = useRouter();
  // console.log('data', data)
  const breadCrumbItems = [
    { title: 'Crytocurrencies', href: '/' },
    { title: `${data?.name} Price`, href: null },
  ].map((item, index) => {
    if (item?.href) {
      return (
        <Anchor className={styles?.['breadcrumb_link']} href={item?.href} key={index}>
          {item?.title}
        </Anchor>
      );
    } else {
      return (
        <a className={styles?.['breadcrumb_nolink']} key={index}>
          {item?.title}
        </a>
      )
    }
  });

  // Parse URL for website
  const parsedUrl = parseDomain(data?.links?.homepage?.[0]);

  // Retrieve all categories, get 1st item, then parse rest of items
  const categories = data?.categories;
  const firstCategory = categories[0];
  const restOfCategories = categories?.slice?.(1, categories?.length)

  return (
    <Layout>
      <div className={styles?.['breadcrumb']}>
        <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
          {breadCrumbItems}
        </Breadcrumbs>
      </div>
      <div className={styles?.['coin']}>
        <div className={styles?.['coin_name']}>
          <img src={data?.image?.thumb} />
          <h1>{data?.name}</h1>
          <span className={styles?.['coin_name_symbol']}>{data?.symbol?.toUpperCase?.()} Price</span>
          <span>#{data?.market_cap_rank}</span>
        </div>
        <div>
          <div className={styles?.['coin_price']}>
            <span className={styles?.['coin_price_amount']}>
              ${data?.market_data?.current_price?.usd?.toLocaleString?.("en", { minimumFractionDigits: 2 })}
            </span>
            <span className={styles?.['coin_price_24h']}>
              <CarrotPriceChange price={data?.market_data?.price_change_percentage_24h_in_currency?.usd} />
            </span>
          </div>
        </div>
      </div>
      {/** Market Data Rows */}
      <div className={styles?.['table']}>
        <FormattedDataRow rowName="Market Cap" rowPrice={data?.market_data?.market_cap?.usd} />
        <FormattedDataRow rowName="Volume" rowPrice={data?.market_data?.total_volume?.usd} />
        <FormattedDataRow rowName="Fully Diluted Valuation" rowPrice={data?.market_data?.fully_diluted_valuation?.usd} />
        <FormattedDataRow rowName="Circulating Supply" rowPrice={data?.market_data?.circulating_supply} />
        <FormattedDataRow rowName="Total Supply" rowPrice={data?.market_data?.total_supply} />
        <FormattedDataRow rowName="Max Supply" rowValue={'∞'} />
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
                  <Pill size="sm">{parsedUrl}</Pill>
                </Anchor>
              }
            />
          )}
          {/** Communities */}
          <FormattedDataRow
            rowName="Communities"
            rowValue={
              <span className={styles?.['pill-container']}>
                {data?.links?.subreddit_url &&
                  <Anchor href={`${data?.links?.subreddit_url}`} target="_blank">
                    <Pill size="sm">Reddit</Pill>
                  </Anchor>
                }
                {data?.links?.telegram_channel_identifier &&
                  <Anchor href={`https://t.me/${data?.links?.telegram_channel_identifier}`} target="_blank">
                    <Pill size="sm">Telegram</Pill>
                  </Anchor>
                }
                {data?.links?.twitter_screen_name &&
                  <Anchor href={`https://x.com/${data?.links?.twitter_screen_name}`} target="_blank">
                    <Pill size="sm">Twitter</Pill>
                  </Anchor>
                }
              </span>
            }
          />
          {/** Source Code */}
          {data?.links?.repo_url?.github?.[0] && (
            <FormattedDataRow
              rowName="Source Code"
              rowValue={
                <Anchor href={`${data?.links?.repo_url?.github?.[0]}`} target="_blank">
                  <Pill size="sm">GitHub</Pill>
                </Anchor>
              }
            />
          )}
          {/** Categories */}
          {/** TODO: Update links */}
          {data?.categories && (
            <FormattedDataRow
              rowName="Categories"
              rowValue={
                <span className={styles?.['pill-container']}>
                  <div>
                    <Anchor href={`${data?.links?.repo_url?.github?.[0]}`} target="_blank">
                      <Pill size="sm">{firstCategory}</Pill>
                    </Anchor>
                  </div>
                  <div className={styles?.['show-more']}>
                    <Popover width={300} position="bottom" withArrow shadow="md">
                      <Popover.Target>
                        <Pill>
                          <span className={styles?.['show-more__icon']}>
                            Show {restOfCategories?.length}
                            <IconChevronDown stroke={1.5} />

                          </span>
                        </Pill>
                      </Popover.Target>
                      <Popover.Dropdown>
                        {restOfCategories?.map?.((category, idx) => (
                          <p className={styles?.['pill-container-item']}>
                            <Pill size="md" key={idx}>{category}</Pill>
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
      {/** About */}
      <div>
        <h3 className={styles?.['table_header']}>About {capitalize(data?.id)} ({data?.symbol?.toUpperCase?.()})</h3>
        <div>
          <span className={styles?.['description']} dangerouslySetInnerHTML={{ __html: data?.description?.en }} />
        </div>
      </div>
    </Layout>
  )
};

// Fetch data server-side
export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.NEXT_PRIVATE_COINGECKO_KEY,
      },
    });
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
  };
};