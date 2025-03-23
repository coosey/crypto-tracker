import styles from './index.module.scss';
import cn from 'classnames';
import { CarrotPriceChange } from 'components/carrot-price-change';

interface Props {
  imgSrc: string;
  imgAlt: string;
  name: string;
  marketPrice: string;
  percentageChange: number;
  className?: string;
}

export const TrendingCardItem = ({
  imgSrc,
  imgAlt,
  name,
  marketPrice,
  percentageChange,
  className,
}: Props) => {
  return (
    <div
      key={imgAlt}
      className={cn({
        [`${className}`]: className,
        [styles?.['card-item']]: !className,
      })}
    >
      <div className={styles?.['card-item_side']}>
        <img className={styles?.['card-item_image']} src={imgSrc} alt={imgAlt} />
        <p>{name}</p>
      </div>
      <div className={styles?.['card-item_side']}>
        <div>${marketPrice}</div>
        <CarrotPriceChange value={percentageChange} />
      </div>
    </div>
  );
};
