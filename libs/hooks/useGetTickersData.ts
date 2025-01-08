import axios from "axios";
import { TickersMarketObject } from "libs/types/tickers";
import { useState, useEffect } from "react";

export const useGetTickerData = (currentPage: number, id: string) => {
  const [tickers, setTickers] = useState<TickersMarketObject[]>([]);
  const [pageTotal, setPageTotal] = useState(0);

  useEffect(() => {
    async function fetchTickersData() {
      const response = await axios.get('/api/tickers', {
        params: { page: currentPage, id: id },
      });
      if (response?.data?.tickers?.length) {
        // limit table size to 50 tickers
        const maxTickers = response?.data?.tickers?.slice?.(0,50);
        // max tickers is 100 per response - if there are 100, add 1 page
        const pages = response?.data?.tickers?.length > 99 ? currentPage + 2 : currentPage;
        setTickers(maxTickers)
        setPageTotal(pages);
      }
    }
    fetchTickersData();
  }, [currentPage]);

  return {tickers, pageTotal}
}