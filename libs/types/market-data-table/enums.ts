/** enum used by coin market */
export enum SortFieldEnum {
  MARKET_CAP_RANK = 'market_cap_rank',
  NAME = 'name',
  CURRENT_PRICE = 'current_price',
  PRICE_CHANGE_PERCENTAGE_1H_IN_CURRENCY = 'price_change_percentage_1h_in_currency',
  PRICE_CHANGE_PERCENTAGE_24H_IN_CURRENCY = 'price_change_percentage_24h_in_currency', 
  PRICE_CHANGE_PERCENTAGE_7D_IN_CURRENCY = 'price_change_percentage_7d_in_currency', 
  TOTAL_VOLUME = 'total_volume',
  MARKET_CAP = 'market_cap'
};

/** enum used by coin ID market */
export enum SortFieldEnumById {
  MARKET_CAP_RANK = 'market_cap_rank',
  NAME = 'name', // exchange
  PAIR = 'pair',
  PRICE = 'price',
  SPREAD = 'spread',
  TWENTY_FOUR_HOUR_VOLUME = 'twenty_four_hour_volume',
  TRUST_SCORE = 'trust_score'
}