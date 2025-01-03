import styles from './index.module.scss';
import { CarrotPriceChange } from 'components/carrot-price-change';

interface Props {
  imgSrc: string;
  imgAlt: string;
  name: string;
  price: number;
  percentage: string;
};

export const TrendingCardItem = ({
  imgSrc,
  imgAlt,
  name,
  price,
  percentage,
}: Props) => {
  return (
    <div key={imgAlt} className={styles?.["card-item"]}>
      <div className={styles?.["card-item_side"]}>
        <img className={styles?.["card-item_image"]} src={imgSrc} alt={imgAlt} />
        <p>{name}</p>
      </div>
      <div className={styles?.["card-item_side"]}>
        <div>${percentage}</div>
        <CarrotPriceChange price={price} />
      </div>
    </div>
  )
}