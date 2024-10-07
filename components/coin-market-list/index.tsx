import {Pagination} from "@mantine/core";
import styles from './index.module.scss';
import axios from "axios";
import {MarketDataTable} from "components/market-data-table";
import {useEffect, useState} from "react";

export const CoinMarketList = () => {
  const [coinsList, setCoinsList] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    async function fetchMarketData() {
      const response = await axios.get('/api/coins-list', {params: {page: currentPage}});
      if (response?.data?.length) {
        setCoinsList(response?.data || []);
        setPageTotal(response?.data?.length);
      }
    };
    fetchMarketData();
  },[currentPage]);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo(0,0);
  };

  return (
    <>
      <MarketDataTable data={coinsList} />
      <div className={styles?.['pagination']}>
        <Pagination total={pageTotal} value={currentPage} onChange={handlePageChange} />
      </div>
    </>
  )
};