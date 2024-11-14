import { IconCaretUpFilled, IconCaretDownFilled } from "@tabler/icons-react";
import styles from './index.module.scss';

interface Props {
  price: number;
}

export const CarrotPriceChange = ({price}: Props) => {

  return (
    <>
      {price > 0 && (
        <div
          className={styles?.['price_green']}
          data-price-target="price"
        >
          <span className={styles?.['price_change']}>
            <IconCaretUpFilled stroke={1} />
            {price ? `${price?.toFixed(2)}%` : '-'}
          </span>
        </div>
      )}
      {price < 0 && (
        <div className={styles?.['price_red']} data-price-target="price">
          <span className={styles?.['price_change']}>
            <IconCaretDownFilled stroke={1} />
            {price ? `${price?.toFixed(2)}%` : '-'}
          </span>
        </div>
      )}
      {price == null && (
        <div className={styles?.['price']} data-price-target="price">
          {'-'}
        </div>
      )}
    </>
  )
};