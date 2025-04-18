
export interface SearchCoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export interface SearchExchange {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
};

export interface SearchNft {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

export interface SearchQuery {
  coins: SearchCoin[];
  exchanges: SearchExchange[];
  icos: string[];
  categories: { id: string; name: string }[];
  nfts: SearchNft[];
}