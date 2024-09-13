import { observable } from "mobx";
import { persist } from "mobx-persist";
import { RootStore } from "./_RootStore";

export class PortfolioStore {
/**
** Purpose: Manages the state related to the user's crypto portfolio.
** Key State Properties:
    holdings: An array of objects representing the user’s crypto holdings (e.g., { id, name, amount, purchasePrice }).
    totalValue: The total value of the portfolio, calculated from current prices.
** Key Actions:
    addHolding(crypto, amount, purchasePrice): Adds a new cryptocurrency to the portfolio.
    removeHolding(id): Removes a cryptocurrency from the portfolio.
    updateHolding(id, amount, purchasePrice): Updates the amount or purchase price of an existing holding.
    fetchCurrentPrices(): Fetches and updates current prices for all cryptocurrencies in the portfolio.
*/
  rootStore: RootStore;
  constructor(rootStore?: RootStore) {
    this.rootStore = rootStore;
  }

  @observable
  @persist('list')
  portfolio = [];
};