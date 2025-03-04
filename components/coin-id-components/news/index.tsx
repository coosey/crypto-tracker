import { SimpleGrid } from "@mantine/core";
import { NewsArticleObj } from "libs/types/news"
import { NewsArticle } from "../news-article";
import { useEffect, useState } from "react";
import axios from "axios";
import { capitalize } from "lodash";
import styles from './index.module.scss';
import { PaginateComponent } from "@/components/pagination";


export const CoinIdNews = ({ id }) => {
  const [newsData, setNewsData] = useState<NewsArticleObj[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);

  useEffect(() => {
    // retrieve news based on coin's id
    async function getNewsData() {
      try {
        const response = await axios.get('/api/news', {
          params: {
            id: id,
            page: currentPage
          }
        });
        if (response?.status === 200) {
          setNewsData(response?.data?.articles);
          setPageTotal(response?.data?.totalResults/5);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    getNewsData();
  }, [id, currentPage]);

  return (
    <>
      <h2 className={styles?.['newsHeader']} id="news-header">
        Latest {capitalize(id)} News
      </h2>
      <SimpleGrid
        className={styles?.['newsWrapper']}
        spacing={{ base: "md", sm: "md", lg: "lg" }}
        verticalSpacing={{ base: 'md', sm: 'lg' }}
        cols={{ base: 1, sm: 2, lg: 4 }}
      >
        {newsData?.map?.((news) => {
          return (
            <NewsArticle
              key={news?.title}
              title={news?.title}
              url={news?.url}
              source={news?.source?.name}
              urlToImg={news?.urlToImage}
              publishedDate={""}
            />
          )
        })}
      </SimpleGrid>
      <PaginateComponent
        className={styles?.['paginate']}
        pageTotal={pageTotal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollToDiv
        scrollId="news-header"
        block="header-top"
      />
    </>
  )
}