/** ENUMS */
export enum TrendingListType {
  CATEGORIES = 'categories',
  COINS = 'coins',
  NFTS = 'nfts'
};

/** INTERFACES */
export interface PriceChangePercentage {
  btc: number;
  usd: number;
};

export interface TrendingCoinsResponse {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: number,
      price_btc: number,
      price_change_percentage_24h: PriceChangePercentage,
      market_cap: string,
      market_cap_btc: string,
      total_volume: string,
      total_volume_btc: string,
      sparkline: string,
      content: string,
    };
  }
};

export interface TrendingNftsResponse {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
  data: {
    floor_price: string,
    floor_price_in_usd_24h_percentage_change: string,
    h24_volume: string,
    h24_average_sale_price: string,
    sparkline: string,
    content: string,
  };
};

export interface TrendingCategoriesResponse {
  id: number;
  name: string;
  market_cap_1h_change: number;
  slug: string;
  coins_count: number;
  data: {
    market_cap: number,
    market_cap_btc: number,
    total_volume: number,
    total_volume_btc: number,
    market_cap_change_percentage_24h: PriceChangePercentage,
    sparkline: string,
  };
};

export interface TrendingListResponse {
  categories: TrendingCategoriesResponse[];
  coins: TrendingCoinsResponse[];
  nfts: TrendingNftsResponse[];
};

export interface TrendingCoinsObject {
  price_change_percentage_1h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
};

export interface AllTrendingCoinsResponse {
  [ids: string]: TrendingCoinsObject;
};

export type TrendListVariant = 'category' | 'coin' | 'nft';

export interface NormalizedTrendList {
  id: string;
  key: string | number;
  name: string;
  imgAlt: string;
  imgSrc?: string | null;
  marketPrice?: string | null;
  percentageChange: number;
}