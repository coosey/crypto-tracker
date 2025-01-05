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
        setTickers(response?.data?.tickers || []);
        setPageTotal(response?.data?.tickers?.length);
      }
    }
    fetchTickersData();
  }, [currentPage]);

  return {tickers, pageTotal}
}