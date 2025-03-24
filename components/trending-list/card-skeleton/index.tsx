import { Skeleton } from '@mantine/core';
import styles from './index.module.scss';

export const TrendingCardSkeleton = () => {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <div className={styles?.['loading']} key={idx}>
            <div className={styles?.['loading_avatar']}>
              <Skeleton height={24} width={24} circle />
              <Skeleton height={15} mt={5} width="15%" />
            </div>
            <Skeleton height={15} mt={5} width="40%" />
          </div>
        ))}
    </>
  );
};
