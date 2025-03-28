import styles from './index.module.scss';
import cn from 'classnames';
import { SignInComponent } from './sign-in';
import { GlobalTrendPrice } from './global-trend-price';

interface Props {
  className?: string;
}

export const HeaderComponent = ({ className }: Props) => {
  return (
    <div className={cn(styles['header'], { className: className })}>
      <div className={styles?.['logo']}>Crypto Tracker</div>
      <div className={styles?.['trendPrice']}>
        <GlobalTrendPrice />
      </div>
      <div className={styles?.['sign-in-wrapper']}>
        <SignInComponent />
      </div>
    </div>
  );
};
