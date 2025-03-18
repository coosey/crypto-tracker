import styles from './index.module.scss';
import { CarrotPriceChange } from '@components/carrot-price-change';

interface Props {
  imgSrc: string;
  imgAlt: string;
  name: string;
  marketPrice: string;
  percentageChange: number;
}

export const TrendingCardItem = ({
  imgSrc,
  imgAlt,
  name,
  marketPrice,
  percentageChange,
}: Props) => {
  return (
    <div key={imgAlt} className={styles?.['card-item']}>
      <div className={styles?.['card-item_side']}>
        <img className={styles?.['card-item_image']} src={imgSrc} alt={imgAlt} />
        <p>{name}</p>
      </div>
      <div className={styles?.['card-item_side']}>
        <div>${marketPrice}</div>
        <CarrotPriceChange price={percentageChange} />
      </div>
    </div>
  );
};
