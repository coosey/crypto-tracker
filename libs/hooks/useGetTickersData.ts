import axios from "axios";
import { TickersMarketObject } from "libs/types/tickers";
import { useState, useEffect } from "react";

/**
 * Custom Hook that fetches `/api/tickers` endpoint
 * @param currentPage - number 
 * @param id - string
 * @param rowItems - number
 * @returns tickers array by coin id, page total, and loading state
 */
export const useGetTickerData = (currentPage: number, id: string, rowItems: number) => {
  const [tickersData, setTickersData] = useState<{
    tickers: TickersMarketObject[],
    tickersBySize: TickersMarketObject[]
  }>({
    tickers: [],
    tickersBySize: [],
  });
  const [loading, setLoading] = useState(false);
  const [pageTotal, setPageTotal] = useState(0);

  useEffect(() => {
    async function fetchTickersData() {
      setLoading(true);
      try {
        const response = await axios.get('/api/tickers', {
          params: { page: currentPage, id: id },
        });
        const foundTickers = response?.data?.tickers;
        if (foundTickers?.length) {
          // max tickers is 100 per response - if there are 100, add 1 page
          const pages = foundTickers?.length > 99 ? currentPage + 1 : currentPage;
          // map thru foundTickers and add field "market_cap_rank"
          const mappedData = foundTickers?.map?.((coin, idx) => ({...coin, market_cap_rank: idx+1}));
          setPageTotal(pages);
          setTickersData({
            tickers: mappedData,
            tickersBySize: mappedData?.slice?.(0, rowItems)
          });
        }
      } catch (e) {
        throw new Error(`Error retrieving current tickers for ${id}!`);
      }
      setLoading(false);
    };
    fetchTickersData();
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    // map thru foundTickers and add field "market_cap_rank"
    const mappedData = tickersData?.tickers?.map?.((coin, idx) => ({...coin, market_cap_rank: idx+1}));
    // limit table size by selected rowItems
    const itemsInTable = mappedData?.slice?.(0, rowItems);
    setTickersData({ ...tickersData, tickersBySize: itemsInTable });
    setLoading(false);
  }, [rowItems]);

  return { tickersData, pageTotal, loading }
}