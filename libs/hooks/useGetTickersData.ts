import axios from "axios";
import { TickersMarketObject } from "@libs/types/tickers";
import { useState, useEffect, useCallback } from "react";

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

  // Calculate the starting rank for the current page
  const calculateStartingRank = useCallback((page: number, itemsPerPage: number) => {
    return (page - 1) * itemsPerPage + 1;
  }, []);

  const mapTickersWithRank = useCallback((
    tickers: TickersMarketObject[],
    startRank: number,
  ) => {
    return tickers?.map?.((coin, idx) => ({
      ...coin,
      market_cap_rank: startRank + idx,
    }));
  }, []);

  const fetchTickersData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/tickers', {
        params: { page: currentPage, id: id },
      });
      const foundTickers = response?.data?.tickers || [];
      if (foundTickers?.length) {
        const pages = foundTickers?.length > 99 ? currentPage + 1 : currentPage;

        // Calculate the starting rank for this page
        const startingRank = calculateStartingRank(currentPage, rowItems);

        // Map the data with continuous ranking
        const mappedData = mapTickersWithRank(foundTickers, startingRank);

        setPageTotal(pages);
        setTickersData({
          tickers: mappedData,
          tickersBySize: mappedData?.slice?.(0, rowItems)
        });
      }
    } catch (error) {
      console.error(`Error retrieving tickers for ${id}:`, error);
      throw new Error(`Error retrieving current tickers for ${id}!`);
    } finally {
      setLoading(false);
    }
  }, [currentPage, id, rowItems, mapTickersWithRank]);

  // fetch API endpoint
  useEffect(() => {
    fetchTickersData();
  }, [fetchTickersData]);

  // updates table data 
  useEffect(() => {
    setLoading(true);
    const startingRank = calculateStartingRank(currentPage, rowItems);
    const mappedData = mapTickersWithRank(tickersData.tickers, startingRank);
    const itemsInTable = mappedData?.slice?.(0, rowItems);
    
    setTickersData({ ...tickersData, tickersBySize: itemsInTable });
    setLoading(false);
  }, [rowItems, currentPage]);


  return { tickersData, pageTotal, loading }
}