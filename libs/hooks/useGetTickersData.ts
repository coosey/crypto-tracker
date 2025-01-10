import axios from "axios";
import { handleScrollToDiv } from "libs/helpers/handleScrollToDiv";
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
          setPageTotal(pages);
          setTickersData({
            tickers: foundTickers,
            tickersBySize: foundTickers?.slice?.(0, rowItems)
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
    // limit table size by selected rowItems
    const itemsInTable = tickersData?.tickers?.slice?.(0, rowItems);
    setTickersData({ ...tickersData, tickersBySize: itemsInTable });
    handleScrollToDiv('ticker-market', 'header-top');
    setLoading(false);
  }, [rowItems]);

  return { tickersData, pageTotal, loading }
}