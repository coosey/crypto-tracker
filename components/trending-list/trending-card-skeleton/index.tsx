import { Skeleton } from "@mantine/core";
import styles from './index.module.scss';

interface Props {
  isLoading: boolean;
}

export const TrendingCardSkeleton = ({
  isLoading
}: Props) => {
  return (
    <>
      {isLoading && Array(3).fill(null).map((_, idx) => (
        <div className={styles?.["loading"]} key={idx}>
          <div className={styles?.['loading_avatar']}>
            <Skeleton height={30} circle />
            <Skeleton height={15} mt={5} width="15%" />
          </div>
          <Skeleton height={15} mt={5} width="40%" />
        </div>
      ))}
    </>
  );
};