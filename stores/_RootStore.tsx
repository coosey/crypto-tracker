import { create } from "mobx-persist";
import { CryptoDataStore } from "./CryptoDataStore";
import { PortfolioStore } from "./PortfolioStore";
import { UserStore } from "./UserStore";

export interface StoreProps {
  cryptoDataStore?: CryptoDataStore;
  portfolioStore?: PortfolioStore;
  userStore?: UserStore;
}

const hydrate = create({
  jsonify: true,
});

export class RootStore {
  cryptoDataStore: CryptoDataStore = new CryptoDataStore(this);
  portfolioStore: PortfolioStore = new PortfolioStore(this);
  userStore: UserStore = new UserStore(this);

  constructor() {
    if (typeof window !== 'undefined') {
      Promise.all([
        hydrate('cryptoDataStore', this.cryptoDataStore),
        hydrate('portfolioStore', this.portfolioStore),
        hydrate('userStore', this.userStore),
      ]).then(() => {});
    }
  }
}

export default new RootStore();