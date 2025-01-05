import { Pagination } from "@mantine/core";
import { SetStateAction } from "react";
import styles from './index.module.scss';
import { handleScrollToDiv } from "libs/helpers/handleScrollToDiv";

interface Props {
  className?: string;
  pageTotal: number;
  currentPage: number;
  setCurrentPage: (value: SetStateAction<number>) => void;
  scrollTop?: boolean;
  scrollToDiv?: boolean;
  scrollId?: string;
  block?: 'start' | 'center' | 'end' | 'nearest' | 'header-top';
}

export const PaginateComponent = (props: Props) => {

  const handlePageChange = (pageNum: number) => {
    props?.setCurrentPage(pageNum);
    props?.scrollTop && window.scrollTo(0, 0);
    props?.scrollToDiv && handleScrollToDiv(props?.scrollId, props?.block);
  };

  return (
    <div className={styles?.['pagination']}>
      <Pagination
          total={props?.pageTotal}
          value={props?.currentPage}
          onChange={handlePageChange}
        />
    </div>
  )
}