import { FavoriteButton } from 'components/buttons/favorite';
import styles from './index.module.scss';
import { memo } from 'react';

interface Props {
  id: string;
  thumb: string;
  name: string;
  symbol: string;
  handleClick?: (id: string) => void;
  handleFavoriteClick?: (id: string) => void;
}

export const CoinItem = memo(({ 
  id,
  thumb,
  name,
  symbol,
  handleClick,
  handleFavoriteClick,
}: Props) => {
  return (
    <div key={id} className={styles?.['coinItemWrapper']}>
      <div className={styles?.['coinItem']} onClick={() => handleClick && handleClick?.(id)}>
        <img className={styles?.['coinItem_image']} src={thumb} alt={name} />
        <div className={styles?.['coinItem_name']}>{name}</div>
        <div className={styles?.['coinItem_symbol']}>{symbol}</div>
      </div>
      <div>
        {/** TODO: implement favorite click */}
        <FavoriteButton 
          selected={false} 
          handleFavoriteClick={() => handleFavoriteClick && handleFavoriteClick?.(id)} 
        />
      </div>
    </div>
  );
});
