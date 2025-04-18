import { FavoriteButton } from 'components/buttons/favorite';
import styles from './index.module.scss';

interface Props {
  id: string;
  thumb: string;
  name: string;
  symbol: string;
}

export const CoinItem = ({ id, thumb, name, symbol }: Props) => {
  return (
    <div key={id} className={styles?.['coinItemWrapper']}>
      <div className={styles?.['coinItem']}>
        <img className={styles?.['coinItem--image']} src={thumb} alt={name} />
        <div className={styles?.['coinItem--name']}>{name}</div>
        <div className={styles?.['coinItem--symbol']}>{symbol}</div>
      </div>
      <div>
        {/** TODO: implement favorite click */}
        <FavoriteButton selected={false} />
      </div>
    </div>
  );
};
