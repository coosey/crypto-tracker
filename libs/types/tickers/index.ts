export interface TickersResponse {
  name: string;
  tickers: TickersMarketObject[];
}

export interface TickersMarketObject {
  base: string;
  target: string;
  market_cap_rank?: number;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
    logo: string;
  };
  last: number;
  volume: number;
  cost_to_move_up_usd: number;
  cost_to_move_down_usd: number;
  converted_last: {
    btc: number;
    eth: number;
    usd: number;
  };
  converted_volume: {
    btc: number;
    eth: number;
    usd: number;
  };
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string | null;
  coin_id: string;
  target_coin_id: string;
};