import { useEffect, useState } from 'react';
import { TrendingListResponse } from '@libs/types/trending-list';
import axios from 'axios';


/**
 * Custom Hook that fetches `/api/trending-list` endpoint
 * @returns TrendingListResponse, loading state
 */
const useTrendingList = () => {
  const [trendingList, setTrendingList] = useState<TrendingListResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getTrendingList() {
      try {
        const response = await axios.get('/api/trending-list');
        setTrendingList(response?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending list: ', error);
      } finally {
        setLoading(false);
      }
    }
    getTrendingList();
  }, []);

  return { trendingList, loading };
};

export default useTrendingList;