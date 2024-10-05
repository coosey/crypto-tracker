export type Rate = {
  time: string;
  asset_id_quote?: string;
  rate: number;
};

export interface CurrentRatesResponse {
  asset_id_base?: string;
  rates?: Rate[];
};