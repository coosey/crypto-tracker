import { Carousel } from '@mantine/carousel';
import { NewsArticleObj } from '@libs/types/news';
import { NewsArticle } from '../news-article';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalize } from 'lodash';
import useResponsive from '@libs/hooks/useResponsive';
import styles from './index.module.scss';

interface Props {
  id: string;
}

export const CoinIdNews = ({ id }: Props) => {
  const [newsData, setNewsData] = useState<NewsArticleObj[]>([]);

  const { isMobile } = useResponsive();

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

  const slides = newsData?.map?.((news) => (
    <Carousel.Slide key={news?.title}>
      <NewsArticle
        key={news?.title}
        title={news?.title}
        url={news?.url}
        source={news?.source?.name}
        urlToImg={news?.urlToImage}
        publishedDate={''}
      />
    </Carousel.Slide>
  ));

  if (!newsData?.length) return null;

  return (
    <>
      <h2 className={styles?.['newsHeader']} id="news-header">
        Latest {capitalize(id)} News
      </h2>
      <Carousel
        className={styles?.['newsCarousel']}
        slideSize={{ base: '100%', xs: '50%', md: '25%' }}
        slideGap={{ base: 'xl', md: 'lg' }}
        align="start"
        slidesToScroll={isMobile ? 1 : 4}
      >
        {slides}
      </Carousel>
    </>
  );
};
