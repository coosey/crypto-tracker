
import { NewsArticleObj } from "libs/types/news";
import { NewsArticle } from "../news-article";
import { Carousel } from "@mantine/carousel";
import styles from './index.module.scss';
import useResponsive from 'libs/hooks/useResponsive';

interface Props {
  newsData: NewsArticleObj[];
}

export const NewsCarousel = ({newsData}: Props) => {
  const { isMobile } = useResponsive();

  const slides = newsData?.map?.((news, idx) => {
    const uniqueKey = `${news?.title}-${news?.publishedAt}`;
    const uniqueArticleKey = `${news?.title}-${idx}`;
    return (
      <Carousel.Slide key={uniqueKey}>
        <NewsArticle
          key={uniqueArticleKey}
          title={news?.title}
          url={news?.url}
          source={news?.source?.name}
          urlToImg={news?.urlToImage}
          publishedDate={''}
        />
      </Carousel.Slide>
    );
  });

  return (
    <Carousel
      className={styles?.['newsCarousel']}
      slideSize={{ base: '100%', xs: '50%', md: '25%' }}
      slideGap={{ base: 'xl', md: 'lg' }}
      align="start"
      slidesToScroll={isMobile ? 1 : 4}
    >
      {slides}
    </Carousel>
  )
}