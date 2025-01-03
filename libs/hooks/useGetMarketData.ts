import axios from "axios";
import { CoinsListResponse } from "libs/types/coins-list";
import { useState, useEffect } from "react";

export const useGetMarketData = (currentPage: number) => {
  const [coinsList, setCoinsList] = useState<CoinsListResponse[]>([]);
  const [pageTotal, setPageTotal] = useState(0);

  useEffect(() => {
    async function fetchMarketData() {
      const response = await axios.get('/api/coins-list', {
        params: { page: currentPage },
      });
      if (response?.data?.length) {
        setCoinsList(response?.data || []);
        setPageTotal(response?.data?.length);
      }
    }
    fetchMarketData();
  }, [currentPage]);

  return {coinsList, pageTotal}
}