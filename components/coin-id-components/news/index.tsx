import { NewsArticleObj } from '@libs/types/news';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalize } from 'lodash';
import styles from './index.module.scss';
import { NewsCarousel } from './news-carousel';

interface Props {
  id: string;
  symbol: string;
}

export const CoinIdNews = ({ id, symbol }: Props) => {
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
            symbol: symbol,
          },
        });
        if (response?.status === 200) {
          const uniqueArticles = parseUniqueArticles(response?.data?.articles);
          setNewsData(uniqueArticles);
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

/**
 * Helper function to parse unique articles from NewsAPI
 * @param articles NewsArticleObj[]
 * @returns NewsArticleObj[]
 */
function parseUniqueArticles(articles: NewsArticleObj[]): NewsArticleObj[] {
  const uniqueArticles = articles?.reduce?.((acc, article) => {
    if (!acc?.[article?.title]) {
      acc[article.title] = article;
    }
    return acc;
  }, {});
  return Object.values(uniqueArticles);
}
