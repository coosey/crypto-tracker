import { observable } from "mobx";
import { persist } from "mobx-persist";
import { RootStore } from "./_RootStore";

export class CryptoDataStore {
/**
** Purpose: Manages real-time data related to cryptocurrencies.
** Key State Properties:
    cryptoPrices: A dictionary of current prices for various cryptocurrencies (e.g., { id: price }).
    priceHistory: Historical price data for charting.
** Key Actions:
    fetchPrices(): Fetches current prices from a crypto API.
    fetchPriceHistory(id): Fetches historical price data for a specific cryptocurrency.
    updatePrice(id, price): Updates the price of a specific cryptocurrency in the store.
*/
  rootStore: RootStore;
  constructor(rootStore?: RootStore) {
    this.rootStore = rootStore;
  }
  @observable
  @persist('list')
  cryptoData = [];
};