import { NewsArticleObj } from 'libs/types/news';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalize } from 'lodash';
import styles from './index.module.scss';
import { NewsCarousel } from './news-carousel';

interface Props {
  id: string;
}

export const CoinIdNews = ({ id }: Props) => {
  const [newsData, setNewsData] = useState<NewsArticleObj[]>([]);

  useEffect(() => {
    /**
     * Fetch news data from News API
     */
    async function getNewsData() {
      try {
        const response = await axios.get('/api/news', {
          params: {
            id: id,
          },
        });
        if (response?.status === 200) {
          setNewsData(response?.data?.articles || []);
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
    getNewsData();
  }, [id]);

  if (!newsData?.length) return null;

  return (
    <>
      <h2 className={styles?.['newsHeader']} id="news-header">
        Latest {capitalize(id)} News
      </h2>
      <NewsCarousel newsData={newsData} />
    </>
  );
};
