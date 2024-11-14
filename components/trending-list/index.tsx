import { Flex } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingCoinsResponse, TrendingListResponse } from "libs/types/trending-list";
import { TrendingCard } from "./trending-card";

export const TrendingList = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinsResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getTrendingList() {
      const response = await axios.get('/api/trending-list');
      const retrievedTrendingCoins = getTopTrendingCoins(response?.data);
      setTrendingCoins(retrievedTrendingCoins);
      setLoading(false);
    };
    getTrendingList();
  },[]);

  const getTopTrendingCoins = (data: TrendingListResponse) => {
    const trendingCoins = data?.['coins'];
    return trendingCoins?.slice?.(0,3);
  };

  return (
     <Flex direction="row">
      <TrendingCard trendingCoins={trendingCoins} isLoading={loading} />
    </Flex>
  )
};